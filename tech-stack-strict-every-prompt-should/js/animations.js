/* Scroll reveal and interactive accordions */
(function () {
  var revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("visible");
    });
  }

  document.querySelectorAll(".faq-question").forEach(function (button) {
    button.addEventListener("click", function () {
      var item = button.closest(".faq-item");
      var isOpen = item.classList.toggle("open");
      button.setAttribute("aria-expanded", String(isOpen));
    });
  });

  document.querySelectorAll(".product-expand button").forEach(function (button) {
    button.addEventListener("click", function () {
      var card = button.closest(".product-expand");
      var symbol = card.querySelector(".toggle-symbol");
      var isOpen = card.classList.toggle("open");
      button.setAttribute("aria-expanded", String(isOpen));
      if (symbol) {
        symbol.textContent = isOpen ? "-" : "+";
      }
    });
  });
})();
