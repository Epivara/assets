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

// --- Collapsible submenus (open/closed state applied pre-paint in <head>) ---
// Each parent's caret carries data-submenu="<key>"; state lives on <html> as
// data-<key> and persists in localStorage['cbg-<key>']. One handler per caret,
// so any number of collapsible parents (Plugins, Desktop App, ...) work.
(function () {
  var d = document.documentElement;
  var carets = document.querySelectorAll(".nav-caret");
  for (var i = 0; i < carets.length; i++) {
    (function (btn) {
      var key = btn.getAttribute("data-submenu");
      if (!key) return;
      var attr = "data-" + key;
      var store = "cbg-" + key;
      function sync() {
        btn.setAttribute("aria-expanded", d.getAttribute(attr) === "closed" ? "false" : "true");
      }
      sync();
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        if (d.getAttribute(attr) === "closed") {
          d.removeAttribute(attr);
          try { localStorage.setItem(store, "open"); } catch (e) {}
        } else {
          d.setAttribute(attr, "closed");
          try { localStorage.setItem(store, "closed"); } catch (e) {}
        }
        sync();
      });
    })(carets[i]);
  }
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
