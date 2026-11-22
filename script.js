(function () {
  "use strict";

  const root = document.documentElement;
  const themeButtons = document.querySelectorAll("[data-theme-toggle]");
  themeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const darkIsActive = root.getAttribute("data-theme") === "dark";
      if (darkIsActive) {
        root.removeAttribute("data-theme");
        button.setAttribute("aria-pressed", "false");
      } else {
        root.setAttribute("data-theme", "dark");
        button.setAttribute("aria-pressed", "true");
      }
    });
  });

  const menuButton = document.getElementById("menu-toggle");
  const nav = document.getElementById("site-nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", function () {
      const isOpen = nav.getAttribute("data-open") === "true";
      nav.setAttribute("data-open", String(!isOpen));
      menuButton.setAttribute("aria-expanded", String(!isOpen));
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.setAttribute("data-open", "false");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.getAttribute("data-open") === "true") {
        nav.setAttribute("data-open", "false");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.focus();
      }
    });
  }

  const searchInput = document.getElementById("project-search");
  const typeSelect = document.getElementById("project-type");
  const cards = Array.from(document.querySelectorAll("[data-project-card]"));
  const count = document.getElementById("project-count");
  const emptyState = document.getElementById("no-projects");
  if (searchInput && typeSelect && cards.length && count && emptyState) {
    function filterProjects() {
      const query = searchInput.value.trim().toLocaleLowerCase("tr-TR");
      const selectedType = typeSelect.value;
      let visibleCount = 0;
      cards.forEach(function (card) {
        const text = (card.dataset.search || "").toLocaleLowerCase("tr-TR");
        const typeMatches = selectedType === "all" || card.dataset.category === selectedType;
        const textMatches = text.includes(query);
        const visible = typeMatches && textMatches;
        card.hidden = !visible;
        if (visible) visibleCount += 1;
      });
      count.textContent = visibleCount + " proje gösteriliyor.";
      emptyState.hidden = visibleCount !== 0;
    }
    searchInput.addEventListener("input", filterProjects);
    typeSelect.addEventListener("change", filterProjects);
    filterProjects();
  }

  const form = document.getElementById("contact-form");
  if (form) {
    const topic = document.getElementById("contact-topic");
    const message = document.getElementById("contact-message");
    const count = document.getElementById("message-count");
    const status = document.getElementById("form-status");
    function updateCharacterCount() {
      count.textContent = message.value.length + " / 500 karakter";
      message.setCustomValidity("");
    }
    message.addEventListener("input", updateCharacterCount);
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      status.textContent = "";
      const trimmedMessage = message.value.trim();
      if (!topic.value) {
        topic.setCustomValidity("Lütfen bir konu seçin.");
        topic.reportValidity();
        return;
      }
      topic.setCustomValidity("");
      if (message.value.length > 500) {
        message.setCustomValidity("Örnek mesaj en fazla 500 karakter olabilir.");
        message.reportValidity();
        return;
      }
      if (trimmedMessage.length < 20) {
        message.setCustomValidity("Lütfen en az 20 karakterlik örnek bir mesaj yazın.");
        message.reportValidity();
        return;
      }
      message.setCustomValidity("");
      status.textContent = "Alanlar tarayıcıda doğrulandı. Mesaj gönderilmedi ve hiçbir yere kaydedilmedi.";
      form.reset();
      updateCharacterCount();
    });
    topic.addEventListener("change", function () {
      topic.setCustomValidity("");
    });
    updateCharacterCount();
  }
}());
