const header = document.querySelector("[data-header]");
const contactForm = document.querySelector("[data-contact-form]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileNav = document.querySelector("[data-mobile-nav]");
const whatsappProductLinks = document.querySelectorAll("[data-product]");
const whatsappNumber = "212661589867";
const defaultWhatsappMessage = "Bonjour Khazayne Marbre, je souhaite vous contacter pour un projet quartz.";

const syncHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const message = [
      "Bonjour Khazayne Marbre, je souhaite un devis quartz.",
      `Nom: ${data.get("name") || ""}`,
      `Telephone: ${data.get("phone") || ""}`,
      `Projet: ${data.get("project") || "Projet quartz"}`,
      `Message: ${data.get("message") || ""}`
    ].join("\n");

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
    contactForm.reset();
  });
}

if (menuToggle && header && mobileNav) {
  const closeMenu = () => {
    header.classList.remove("is-menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-menu-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  document.addEventListener("click", (event) => {
    if (!header.classList.contains("is-menu-open")) return;
    if (header.contains(event.target)) return;
    closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

whatsappProductLinks.forEach((link) => {
  const product = link.dataset.product || "Produit quartz";
  const context = link.dataset.context || "ce modele du catalogue";
  const message = [
    "Bonjour Khazayne Marbre, je suis interesse par un produit du catalogue.",
    `Produit: ${product}`,
    `Besoin: ${context}`,
    "Pouvez-vous me conseiller sur la disponibilite, le prix et la pose ?"
  ].join("\n");

  link.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  link.target = "_blank";
  link.rel = "noopener";
  link.setAttribute("aria-label", `Demander ${product} sur WhatsApp`);
});

const floatingWhatsapp = document.createElement("a");
floatingWhatsapp.className = "floating-whatsapp";
floatingWhatsapp.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultWhatsappMessage)}`;
floatingWhatsapp.target = "_blank";
floatingWhatsapp.rel = "noopener";
floatingWhatsapp.setAttribute("aria-label", "Contacter Khazayne Marbre sur WhatsApp");
floatingWhatsapp.innerHTML = '<span aria-hidden="true">WA</span><strong>WhatsApp</strong>';
document.body.appendChild(floatingWhatsapp);

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });
