document.addEventListener("DOMContentLoaded", function () {
  var mainnav = document.getElementById("mainnav");
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");
  var backToTop = document.getElementById("back-to-top");

  // Shrink / shadow nav on scroll
  function onScroll() {
    var scrolled = window.scrollY > 20;
    mainnav.classList.toggle("scrolled", scrolled);
    backToTop.classList.toggle("visible", window.scrollY > 500);
  }
  window.addEventListener("scroll", onScroll);
  onScroll();

  // Mobile nav toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
      });
    });
  }

  // Back to top
  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Ajax form submission (Web3Forms)
  document.querySelectorAll("form.ajax-form").forEach(function (form) {
    var status = form.querySelector(".form-status");
    var btn = form.querySelector("button[type=submit]");
    var originalLabel = btn ? btn.textContent : "";

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Honeypot check
      var honeypot = form.querySelector('input[name="botcheck"]');
      if (honeypot && honeypot.checked) { return; }

      var formData = new FormData(form);
      var payload = Object.fromEntries(formData);

      if (btn) { btn.disabled = true; btn.textContent = "Sending..."; }
      if (status) { status.className = "form-status"; status.textContent = ""; }

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload)
      })
        .then(function (res) { return res.json(); })
        .then(function (result) {
          if (result.success) {
            if (status) {
              status.textContent = form.dataset.successMessage || "Thanks! Your message has been sent.";
              status.className = "form-status success";
            }
            form.reset();
          } else {
            throw new Error(result.message || "Something went wrong.");
          }
        })
        .catch(function () {
          if (status) {
            status.textContent = "Sorry, something went wrong sending this. Please try again, or reach us directly by phone or WhatsApp.";
            status.className = "form-status error";
          }
        })
        .finally(function () {
          if (btn) { btn.disabled = false; btn.textContent = originalLabel; }
        });
    });
  });

  // Gallery filter tabs
  var filterTabs = document.querySelectorAll(".filter-tabs button");
  if (filterTabs.length) {
    filterTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        filterTabs.forEach(function (t) { t.classList.remove("active"); });
        tab.classList.add("active");
        var filter = tab.dataset.filter;
        document.querySelectorAll(".gallery-item").forEach(function (item) {
          var show = filter === "all" || item.dataset.category === filter;
          item.classList.toggle("hidden", !show);
        });
      });
    });
  }

  // Scroll reveal
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }
});
