/*
 * Highlight-only comments.
 *
 * Markdown syntax:   some text[\comment, the hidden remark]
 *                    [a link](https://example.com)[\comment, the hidden remark]
 *
 * The bracketed remark is removed from the reading flow and attached to the
 * element (or word) immediately before it. The remark appears while the
 * pointer hovers (or keyboard focus rests on) that anchor, or while the
 * reader's text selection (highlight) touches it.
 */
(function () {
  var PATTERN = /\[\\comment,\s*([\s\S]*?)\]/g;
  var BLOCKS = "p, li, blockquote, td, th, h1, h2, h3, h4, h5, h6";

  function anchorFor(marker) {
    var prev = marker.previousSibling;
    if (prev && prev.nodeType === Node.ELEMENT_NODE) return prev;
    if (prev && prev.nodeType === Node.TEXT_NODE) {
      var match = prev.nodeValue.match(/(\S+)$/);
      if (!match) return null;
      var word = document.createElement("span");
      word.textContent = match[1];
      prev.nodeValue = prev.nodeValue.slice(0, -match[1].length);
      prev.parentNode.insertBefore(word, marker);
      return word;
    }
    return null;
  }

  function init() {
    var root = document.querySelector(".page__content") || document.body;
    var pairs = [];

    root.querySelectorAll(BLOCKS).forEach(function (block) {
      if (block.innerHTML.indexOf("[\\comment,") === -1) return;
      block.innerHTML = block.innerHTML.replace(PATTERN, function (_, body) {
        return '<span class="hl-comment-marker" hidden>' + body.trim() + "</span>";
      });
      block.querySelectorAll(".hl-comment-marker").forEach(function (marker) {
        var anchor = anchorFor(marker);
        if (!anchor) return;
        anchor.classList.add("hl-comment-anchor");
        var note = document.createElement("aside");
        note.className = "hl-comment";
        note.setAttribute("role", "note");
        note.innerHTML = marker.innerHTML;
        document.body.appendChild(note);
        marker.remove();
        pairs.push({ anchor: anchor, note: note });
      });
    });

    if (!pairs.length) return;

    function place(anchor, note) {
      var rect = anchor.getBoundingClientRect();
      var width = Math.min(360, document.documentElement.clientWidth - 32);
      var left = rect.left + window.scrollX;
      var maxLeft = window.scrollX + document.documentElement.clientWidth - width - 16;
      note.style.width = width + "px";
      note.style.left = Math.max(16 + window.scrollX, Math.min(left, maxLeft)) + "px";
      note.style.top = rect.bottom + window.scrollY + 8 + "px";
    }

    function update() {
      var sel = window.getSelection();
      var active = sel && !sel.isCollapsed && sel.rangeCount > 0;
      pairs.forEach(function (pair) {
        var selected = active && sel.containsNode(pair.anchor, true);
        var show = selected || pair.hovered;
        if (show) place(pair.anchor, pair.note);
        pair.note.classList.toggle("is-visible", show);
      });
    }

    pairs.forEach(function (pair) {
      function on() { pair.hovered = true; update(); }
      function off() { pair.hovered = false; update(); }
      pair.anchor.addEventListener("mouseenter", on);
      pair.anchor.addEventListener("mouseleave", off);
      pair.anchor.addEventListener("focus", on);
      pair.anchor.addEventListener("blur", off);
    });

    document.addEventListener("selectionchange", update);
    window.addEventListener("resize", update);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
