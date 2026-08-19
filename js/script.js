/*
 * CONFIGURAÇÃO PRINCIPAL
 * Substitua apenas o valor de WHATSAPP_NUMBER pelo número da Alice.
 * Use o formato internacional, somente números.
 * Exemplo: 5585999999999
 */
const WHATSAPP_NUMBER = "85992728273";

const WHATSAPP_MESSAGE =
  "Olá! Gostaria de saber mais sobre o acompanhamento psicológico.";

function buildWhatsAppUrl(message = WHATSAPP_MESSAGE) {
  if (!WHATSAPP_NUMBER || WHATSAPP_NUMBER.includes("INSERIR")) {
    return "#";
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function setupWhatsApp() {
  document.querySelectorAll("[data-whatsapp]").forEach((link) => {
    link.href = buildWhatsAppUrl();

    link.addEventListener("click", (event) => {
      if (link.href.endsWith("#")) {
        event.preventDefault();
        alert("O número do WhatsApp ainda não foi configurado. Edite WHATSAPP_NUMBER em js/script.js.");
      }
    });
  });
}

function setupMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");

  if (!toggle || !nav) return;

  const closeMenu = () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 850) closeMenu();
  });
}

function setupTopics() {
  const root = document.querySelector("[data-topics]");
  if (!root) return;

  const tabs = [...root.querySelectorAll(".topic-button")];
  const panels = [...root.querySelectorAll(".topic-panel")];

  function activate(index) {
    tabs.forEach((tab, tabIndex) => {
      const active = tabIndex === index;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });

    panels.forEach((panel, panelIndex) => {
      const active = panelIndex === index;
      panel.hidden = !active;
      panel.classList.toggle("active", active);
    });
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activate(index));

    tab.addEventListener("keydown", (event) => {
      if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;

      event.preventDefault();

      let next = index;
      if (event.key === "ArrowDown") next = (index + 1) % tabs.length;
      if (event.key === "ArrowUp") next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabs.length - 1;

      activate(next);
      tabs[next].focus();
    });
  });

  activate(0);
}

function setupTestimonials() {
  const root = document.querySelector("[data-testimonial]");
  const text = document.querySelector("#testimonial-text");
  const author = document.querySelector("#testimonial-author");
  const dots = document.querySelector(".testimonial-dots");
  const prev = document.querySelector(".testimonial-arrow.prev");
  const next = document.querySelector(".testimonial-arrow.next");

  if (!root || !text || !author || !dots || !prev || !next) return;

  /*
   * Substitua/adicione os depoimentos reais aqui.
   * Não invente nomes ou informações de pacientes.
   */
  const testimonials = [
    {
      text: "[INSERIR FEEDBACK 1 DO ROTEIRO]",
      author: "[INSERIR IDENTIFICAÇÃO, SE HOUVER]"
    },
    {
      text: "[INSERIR FEEDBACK 2 DO ROTEIRO]",
      author: "[INSERIR IDENTIFICAÇÃO, SE HOUVER]"
    },
    {
      text: "[INSERIR FEEDBACK 3 DO ROTEIRO]",
      author: "[INSERIR IDENTIFICAÇÃO, SE HOUVER]"
    }
  ];

  let current = 0;

  testimonials.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Mostrar depoimento ${index + 1}`);
    dot.addEventListener("click", () => show(index));
    dots.appendChild(dot);
  });

  function show(index) {
    current = (index + testimonials.length) % testimonials.length;
    text.textContent = testimonials[current].text;
    author.textContent = testimonials[current].author;

    [...dots.children].forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === current);
    });
  }

  prev.addEventListener("click", () => show(current - 1));
  next.addEventListener("click", () => show(current + 1));

  show(0);
}

function setupRevealObserver() {
  const elements = document.querySelectorAll(".section:not(.hero) .section-heading, .quote-list, .cycle, .topics, .treatment-grid, .about-grid, .testimonial, .faq-list");

  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("reveal");
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.08 }
  );

  elements.forEach((element) => observer.observe(element));
}

setupWhatsApp();
setupMobileMenu();
setupTopics();
setupTestimonials();
setupRevealObserver();
