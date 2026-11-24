---
layout: null
permalink: /sw.js
sitemap: false
---
/* Offline cache for e-10.net, regenerated on every build.
   - On install, every page, font and image is saved, so a later visit works
     with no connection at all.
   - Pages are served from the cache instantly and refreshed in the
     background (stale-while-revalidate); each deploy also re-saves them.
   - Fonts, images and scripts are served from the cache first.
   - Files from the CDNs the tools use are cached the first time they load.
   - /tools/brush/ has its own worker and is left alone. */
'use strict';

const VERSION = '{{ site.time | date: "%Y%m%d%H%M%S" }}';
const CORE = 'e10-core-' + VERSION;
const RUNTIME = 'e10-runtime-v1';
const OFFLINE = '/offline/';
const CDN_HOSTS = ['cdn.jsdelivr.net', 'cdnjs.cloudflare.com', 'unpkg.com'];

const PRECACHE = [
{%- for p in site.html_pages %}
  {%- unless p.sitemap == false or p.url contains '404' or p.url contains '/tools/brush/' or p.url contains '/assets/' %}
  '{{ p.url }}',
  {%- endunless %}
{%- endfor %}
  OFFLINE,
{%- for f in site.static_files %}
  {%- if f.path contains '/assets/fonts/' and f.extname == '.woff2' %}
  '{{ f.path }}',
  {%- endif %}
  {%- if f.path contains '/assets/img/' %}{% unless f.name contains 'og-' or f.name contains '512' %}
  '{{ f.path }}',
  {%- endunless %}{% endif %}
{%- endfor %}
  '/assets/js/highlight-comments.js',
  '/favicon.svg',
  '/site.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CORE);
    await Promise.all([...new Set(PRECACHE)].map((url) =>
      cache.add(new Request(url, { cache: 'reload' })).catch(() => undefined)));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter((key) => key.startsWith('e10-core-') && key !== CORE)
      .map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

// A cached response that followed a redirect cannot answer a navigation.
function clean(response) {
  if (!response || !response.redirected) return response;
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}

function cacheable(response) {
  return response && (response.ok || response.type === 'opaque');
}

async function page(event) {
  const cache = await caches.open(CORE);
  const cached = await cache.match(event.request, { ignoreSearch: true });
  const network = fetch(event.request).then((response) => {
    if (response.ok && response.type === 'basic') {
      const copy = response.clone();
      event.waitUntil(cache.put(event.request, copy));
    }
    return response;
  });
  if (cached) {
    event.waitUntil(network.catch(() => undefined));
    return clean(cached);
  }
  try {
    return await network;
  } catch (error) {
    return clean(await cache.match(OFFLINE)) || Response.error();
  }
}

async function asset(event) {
  const cache = await caches.open(CORE);
  const cached = await cache.match(event.request);
  if (cached) return cached;
  try {
    const response = await fetch(event.request);
    if (response.ok) {
      const copy = response.clone();
      event.waitUntil(cache.put(event.request, copy));
    }
    return response;
  } catch (error) {
    return Response.error();
  }
}

async function cdn(event) {
  const cache = await caches.open(RUNTIME);
  const cached = await cache.match(event.request);
  const network = fetch(event.request).then((response) => {
    if (cacheable(response)) {
      const copy = response.clone();
      event.waitUntil(cache.put(event.request, copy));
    }
    return response;
  });
  if (cached) {
    event.waitUntil(network.catch(() => undefined));
    return cached;
  }
  return network;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  if (url.origin === self.location.origin) {
    if (url.pathname.startsWith('/tools/brush/') || url.pathname === '/sw.js') return;
    event.respondWith(request.mode === 'navigate' ? page(event) : asset(event));
    return;
  }
  if (CDN_HOSTS.includes(url.hostname)) {
    event.respondWith(cdn(event));
  }
});
