---
layout: single
title: "Pivotal Research — Demo"
permalink: /demo/pivotal-research/
author_profile: false
classes: wide
sitemap: false
---

<style>
  #page-title { display: none; }

  /* No sidebar on this page — reclaim the reserved gutter so content centers */
  #main .page {
    float: none;
    width: 100%;
    padding-right: 0;
  }

  .pivotal-demo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 60vh;
    padding: 3rem 1rem;
  }

  .pivotal-demo .logo-wrap {
    position: relative;
    width: 128px;
    height: 128px;
    margin-bottom: 1.5rem;
  }

  .pivotal-demo .logo-wrap img,
  .pivotal-demo .logo-fallback {
    width: 128px;
    height: 128px;
    border-radius: 24px;
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.15);
  }

  .pivotal-demo .logo-fallback {
    display: none;
    align-items: center;
    justify-content: center;
    background: #0f172a;
    color: #fff;
    font-size: 3.5rem;
    font-weight: 700;
    line-height: 1;
  }

  .pivotal-demo .org-name {
    margin: 0 0 0.5rem;
    font-size: 1.25rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: #475569;
  }

  .pivotal-demo h1.coming-soon {
    margin: 0 0 0.75rem;
    font-size: 2.5rem;
    line-height: 1.15;
  }

  .pivotal-demo .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.25rem;
    padding: 0.35rem 0.9rem;
    border: 1px solid #cbd5e1;
    border-radius: 999px;
    background: #f8fafc;
    color: #334155;
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .pivotal-demo .status-badge .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #f59e0b;
    animation: pivotal-pulse 1.6s ease-in-out infinite;
  }

  .pivotal-demo .lede {
    max-width: 34rem;
    margin: 0 auto 2rem;
    color: #64748b;
    font-size: 1.05rem;
  }

  .pivotal-demo .progress-track {
    width: min(320px, 80%);
    height: 6px;
    border-radius: 999px;
    background: #e2e8f0;
    overflow: hidden;
  }

  .pivotal-demo .progress-fill {
    width: 40%;
    height: 100%;
    border-radius: 999px;
    background: linear-gradient(90deg, #0f172a, #6366f1);
    animation: pivotal-slide 2.2s ease-in-out infinite;
  }

  .pivotal-demo .contact {
    margin-top: 2.5rem;
    font-size: 0.9rem;
    color: #94a3b8;
  }

  @keyframes pivotal-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.75); }
  }

  @keyframes pivotal-slide {
    0% { transform: translateX(-110%); }
    100% { transform: translateX(300%); }
  }

  @media (prefers-reduced-motion: reduce) {
    .pivotal-demo .status-badge .dot,
    .pivotal-demo .progress-fill {
      animation: none;
    }
  }
</style>

<div class="pivotal-demo">
  <div class="logo-wrap">
    <img src="https://media.licdn.com/dms/image/v2/D4E0BAQFtgVfJLMyXJQ/company-logo_200_200/B4EZpJSvRTIwAM-/0/1762166247442/pivotal_org_logo?e=2147483647&v=beta&t=Fg2jiNj6GB9r6q-gEf7vpgYMnuKhL3Z936TsN6m0GaU"
         alt="Pivotal Research logo"
         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
    <div class="logo-fallback" aria-hidden="true">P</div>
  </div>

  <p class="org-name">Pivotal Research</p>

  <div class="status-badge"><span class="dot"></span> Demo in progress</div>

  <h1 class="coming-soon">Coming Soon</h1>

  <p class="lede">This demo is currently under construction. Check back soon — something interesting is on the way.</p>

  <div class="progress-track" role="presentation">
    <div class="progress-fill"></div>
  </div>

  <p class="contact">Questions in the meantime? Reach out at <a href="mailto:ethan@e-10.net">ethan@e-10.net</a>.</p>
</div>
