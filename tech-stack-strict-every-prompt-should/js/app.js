/* Shared app helpers */
(function () {
  var themeToggle = document.querySelector(".theme-toggle");
  var themeIcon = document.querySelector(".theme-icon");
  var savedTheme = localStorage.getItem("nikit-theme");
  var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  var activeTheme = savedTheme || (prefersDark ? "dark" : "light");

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("nikit-theme", theme);
    if (themeToggle) {
      themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    }
    if (themeIcon) {
      themeIcon.textContent = theme === "dark" ? "☀" : "☾";
    }
  }

  setTheme(activeTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var currentTheme = document.documentElement.getAttribute("data-theme") || "light";
      setTheme(currentTheme === "dark" ? "light" : "dark");
    });
  }

  var year = document.querySelector("#year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  var searchInput = document.querySelector("#resourceSearch");
  var categoryFilter = document.querySelector("#categoryFilter");
  var articles = Array.prototype.slice.call(document.querySelectorAll(".resource-card"));
  var paginationButtons = document.querySelectorAll("[data-page]");
  var perPage = 4;
  var currentPage = 1;

  function applyResourceFilters() {
    if (!articles.length) {
      return;
    }

    var query = searchInput ? searchInput.value.toLowerCase() : "";
    var category = categoryFilter ? categoryFilter.value : "all";
    var visible = articles.filter(function (article) {
      var matchesQuery = article.textContent.toLowerCase().indexOf(query) !== -1;
      var matchesCategory = category === "all" || article.dataset.category === category;
      return matchesQuery && matchesCategory;
    });

    articles.forEach(function (article) {
      article.hidden = true;
    });

    visible.slice((currentPage - 1) * perPage, currentPage * perPage).forEach(function (article) {
      article.hidden = false;
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      currentPage = 1;
      applyResourceFilters();
    });
  }

  if (categoryFilter) {
    categoryFilter.addEventListener("change", function () {
      currentPage = 1;
      applyResourceFilters();
    });
  }

  paginationButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      currentPage = Number(button.dataset.page);
      applyResourceFilters();
    });
  });

  applyResourceFilters();

  document.querySelectorAll(".contact-form").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var status = form.querySelector(".form-status");
      if (status) {
        status.textContent = "Thanks. NIKIT will respond within one working day.";
      }
      form.reset();
    });
  });
})();
