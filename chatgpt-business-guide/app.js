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
