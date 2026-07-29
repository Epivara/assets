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

// --- Connectors submenu collapse (open/closed state applied pre-paint in <head>) ---
(function () {
  var KEY = "cbg-connectors";
  var d = document.documentElement;
  var btn = document.querySelector(".nav-caret");
  if (!btn) return;
  function sync() {
    btn.setAttribute("aria-expanded", d.getAttribute("data-connectors") === "closed" ? "false" : "true");
  }
  sync();
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    if (d.getAttribute("data-connectors") === "closed") {
      d.removeAttribute("data-connectors");
      try { localStorage.setItem(KEY, "open"); } catch (e) {}
    } else {
      d.setAttribute("data-connectors", "closed");
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

// --- Pagefind search (index generated at deploy time; inert until then) ---
window.addEventListener("DOMContentLoaded", function () {
  if (typeof PagefindUI !== "undefined") {
    new PagefindUI({ element: "#search", showSubResults: true, showImages: false });
  }
});
