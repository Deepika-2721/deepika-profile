(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector(".theme-toggle");
  const themeIcon = document.querySelector(".theme-icon");
  const savedTheme = localStorage.getItem("deepika-theme");
  if (savedTheme === "dark") root.dataset.theme = "dark";

  function updateThemeButton() {
    const dark = root.dataset.theme === "dark";
    themeIcon.textContent = dark ? "☀" : "☾";
    themeButton.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    document.querySelector('meta[name="theme-color"]').content = dark ? "#151922" : "#f5f1eb";
  }
  updateThemeButton();
  themeButton.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("deepika-theme", root.dataset.theme);
    updateThemeButton();
  });

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }));

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(item => revealObserver.observe(item));

  const familyCard = document.querySelector(".family-reveal-card");
  const familyNote = document.querySelector("#family-note");
  familyCard.addEventListener("click", event => {
    const chip = event.target.closest("[data-family]");
    if (chip) {
      familyNote.textContent = `${chip.dataset.family} — ${chip.dataset.description}`;
      return;
    }
    if (event.target.closest(".family-photo-side")) return;
    familyCard.classList.toggle("is-open");
  });
  familyCard.addEventListener("keydown", event => {
    if (event.target === familyCard && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      familyCard.classList.toggle("is-open");
    }
  });

  const lightbox = document.querySelector("#lightbox");
  const lightboxTitle = document.querySelector("#lightbox-title");
  const lightboxDescription = document.querySelector("#lightbox-description");
  const closeButton = document.querySelector(".lightbox-close");
  function closeLightbox() { lightbox.classList.remove("open"); }
  document.querySelectorAll(".hobby-card").forEach(card => card.addEventListener("click", () => {
    lightboxTitle.textContent = card.dataset.title;
    lightboxDescription.textContent = card.dataset.description;
    lightbox.classList.add("open");
    closeButton.focus();
  }));
  closeButton.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeLightbox(); });


  const petCard = document.querySelector(".pet-flip-card");
  petCard.addEventListener("click", () => {
    const flipped = petCard.classList.toggle("is-flipped");
    petCard.setAttribute("aria-pressed", String(flipped));
  });

  const backTop = document.querySelector(".back-top");
  window.addEventListener("scroll", () => backTop.classList.toggle("visible", window.scrollY > 500), { passive: true });
  backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  document.querySelector("#current-year").textContent = new Date().getFullYear();
})();