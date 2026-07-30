/* ChatGPT Business Guide — theme toggle, active nav, search */

// --- Theme toggle (preference persisted per-origin, only read by this guide) ---
(function () {
  var KEY = "cbg-theme";
  var btn = document.querySelector(".theme-toggle");
  if (btn) {
    btn.addEventListener("click", function () {
      var dark = document.documentElement.getAttribute("data-theme") === "dark";
      if (dark) {
        document.documentElement.removeAttribute("data-theme");
        try { localStorage.setItem(KEY, "light"); } catch (e) {}
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
        try { localStorage.setItem(KEY, "dark"); } catch (e) {}
      }
    });
  }
})();

// --- Plugins submenu collapse (open/closed state applied pre-paint in <head>) ---
(function () {
  var KEY = "cbg-plugins";
  var d = document.documentElement;
  var btn = document.querySelector(".nav-caret");
  if (!btn) return;
  function sync() {
    btn.setAttribute("aria-expanded", d.getAttribute("data-plugins") === "closed" ? "false" : "true");
  }
  sync();
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    if (d.getAttribute("data-plugins") === "closed") {
      d.removeAttribute("data-plugins");
      try { localStorage.setItem(KEY, "open"); } catch (e) {}
    } else {
      d.setAttribute("data-plugins", "closed");
      try { localStorage.setItem(KEY, "closed"); } catch (e) {}
    }
    sync();
  });
})();

// --- Highlight the current page in the sidebar ---
(function () {
  var here = location.pathname.split("/").pop() || "index.html";
  var links = document.querySelectorAll(".sidebar nav a");
  for (var i = 0; i < links.length; i++) {
    var href = links[i].getAttribute("href");
    if (href === here) links[i].classList.add("current");
  }
})();

// --- Keep the sidebar's scroll position across page loads ---
// Each page is a full document, so the sidebar re-renders scrolled to top on every
// nav. The RESTORE runs inline right after the sidebar markup (pre-paint, no flash);
// here we just persist the position as the user scrolls. sessionStorage (not
// localStorage) so a fresh visit still starts at the top.
(function () {
  var KEY = "cbg-sidebar-scroll";
  var el = document.querySelector(".sidebar");
  if (!el) return;
  el.addEventListener("scroll", function () {
    try { sessionStorage.setItem(KEY, el.scrollTop); } catch (e) {}
  }, { passive: true });
})();

// --- Pagefind search (index generated at deploy time; inert until then) ---
window.addEventListener("DOMContentLoaded", function () {
  if (typeof PagefindUI !== "undefined") {
    new PagefindUI({ element: "#search", showSubResults: true, showImages: false });
  }
});
