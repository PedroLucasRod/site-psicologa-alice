/*
 * CONFIGURAÇÃO PRINCIPAL
 */

const WHATSAPP_NUMBER = "5585992738273";

const WHATSAPP_MESSAGE =
  "Oii Alice! Vim pelo site e gostaria de agendar uma sessão contigo";


/* =========================================================
   WHATSAPP
========================================================= */

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

        alert(
          "O número do WhatsApp ainda não foi configurado. Edite WHATSAPP_NUMBER em js/script.js."
        );
      }
    });
  });
}


/* =========================================================
   MENU MOBILE
========================================================= */

function setupMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");

  if (!toggle || !nav) return;

  const closeMenu = () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
    document.body.classList.remove("menu-open");
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute(
      "aria-label",
      isOpen ? "Fechar menu" : "Abrir menu"
    );

    document.body.classList.toggle("menu-open", isOpen);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 850) {
      closeMenu();
    }
  });
}


/* =========================================================
   TÓPICOS
   Desktop:
   lista à esquerda + painel à direita.

   Mobile:
   painel aparece imediatamente abaixo
   do tópico selecionado.
========================================================= */

function setupTopics() {
  const root = document.querySelector("[data-topics]");

  if (!root) return;

  const topicList = root.querySelector(".topic-list");
  const panelsContainer = root.querySelector(".topic-panels");

  const tabs = [...root.querySelectorAll(".topic-button")];
  const panels = [...root.querySelectorAll(".topic-panel")];

  if (!topicList || !panelsContainer || !tabs.length || !panels.length) {
    return;
  }

  const originalPositions = new Map();

  panels.forEach((panel) => {
    originalPositions.set(panel.id, panel);
  });


  function isMobile() {
    return window.innerWidth < 850;
  }


  function restoreDesktopPanels() {
    panels.forEach((panel) => {
      panelsContainer.appendChild(panel);
    });
  }


  function activate(index) {
    const selectedTab = tabs[index];
    const selectedPanel = panels[index];

    if (!selectedTab || !selectedPanel) return;

    tabs.forEach((tab, tabIndex) => {
      const active = tabIndex === index;

      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", String(active));

      /*
       * Em desktop, somente a aba ativa recebe tabIndex 0.
       */
      tab.tabIndex = active ? 0 : -1;
    });


    if (isMobile()) {

      /*
       * Esconde todos os painéis primeiro.
       */
      panels.forEach((panel) => {
        panel.hidden = true;
        panel.classList.remove("active");
      });

      /*
       * Coloca o painel imediatamente depois
       * do botão que foi clicado.
       */
      selectedTab.insertAdjacentElement(
        "afterend",
        selectedPanel
      );

      selectedPanel.hidden = false;
      selectedPanel.classList.add("active");

    } else {

      /*
       * No desktop os painéis voltam
       * para o container original.
       */
      restoreDesktopPanels();

      panels.forEach((panel, panelIndex) => {
        const active = panelIndex === index;

        panel.hidden = !active;
        panel.classList.toggle("active", active);
      });
    }
  }


  tabs.forEach((tab, index) => {

    tab.addEventListener("click", () => {
      activate(index);
    });


    tab.addEventListener("keydown", (event) => {

      if (
        !["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)
      ) {
        return;
      }

      event.preventDefault();

      let next = index;

      if (event.key === "ArrowDown") {
        next = (index + 1) % tabs.length;
      }

      if (event.key === "ArrowUp") {
        next = (index - 1 + tabs.length) % tabs.length;
      }

      if (event.key === "Home") {
        next = 0;
      }

      if (event.key === "End") {
        next = tabs.length - 1;
      }

      activate(next);
      tabs[next].focus();
    });
  });


  /*
   * Se o usuário girar o celular ou redimensionar
   * a janela, reorganizamos o layout.
   */
  let wasMobile = isMobile();

  window.addEventListener("resize", () => {

    const currentlyMobile = isMobile();

    if (currentlyMobile !== wasMobile) {

      wasMobile = currentlyMobile;

      const activeIndex = tabs.findIndex((tab) =>
        tab.classList.contains("active")
      );

      restoreDesktopPanels();

      activate(
        activeIndex >= 0 ? activeIndex : 0
      );
    }
  });


  /*
   * Começa mostrando Ansiedade.
   */
  activate(0);
}


/* =========================================================
   DEPOIMENTOS
========================================================= */

function setupTestimonials() {
  const root = document.querySelector("[data-testimonial]");
  const text = document.querySelector("#testimonial-text");
  const dots = document.querySelector(".testimonial-dots");
  const prev = document.querySelector(".testimonial-arrow.prev");
  const next = document.querySelector(".testimonial-arrow.next");

  if (!root || !text || !dots || !prev || !next) {
    return;
  }


  const testimonials = [
    {
      text:
        "Não sou a mesma pessoa de antes e, na verdade, nem quero ser. Hoje tenho mais percepção dos meus limites, do que diz respeito à minha saúde e de que o trabalho é apenas uma das partes importantes da minha existência."
    },

    {
      text:
        "Foi difícil, mas ao mesmo tempo foi a virada de chave pra encontrar minha identidade, uma versão de mim que eu nem sabia que existia."
    },

    {
      text:
        "Achei que nunca mais iria voltar a viver com leveza. Minha vida voltou a ter sentido e prazer. Demorei muito tempo pra agir, mas foi a melhor decisão que tomei."
    }
  ];


  let current = 0;


  /*
   * Cria as bolinhas automaticamente.
   */
  testimonials.forEach((_, index) => {

    const dot = document.createElement("button");

    dot.type = "button";

    dot.setAttribute(
      "aria-label",
      `Mostrar depoimento ${index + 1}`
    );

    dot.addEventListener("click", () => {
      show(index);
    });

    dots.appendChild(dot);
  });


  function show(index) {

    current =
      (index + testimonials.length) %
      testimonials.length;

    text.textContent =
      testimonials[current].text;


    [...dots.children].forEach(
      (dot, dotIndex) => {
        dot.classList.toggle(
          "active",
          dotIndex === current
        );
      }
    );
  }


  prev.addEventListener("click", () => {
    show(current - 1);
  });


  next.addEventListener("click", () => {
    show(current + 1);
  });


  show(0);
}

/* =========================================================
   FAQ
========================================================= */

function setupFAQ() {

  const faqItems = document.querySelectorAll(".faq-item");

  if (!faqItems.length) {
    return;
  }

  faqItems.forEach((item) => {

    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!question || !answer) {
      return;
    }

    question.addEventListener("click", () => {

      const isOpen =
        question.getAttribute("aria-expanded") === "true";


      faqItems.forEach((otherItem) => {

        const otherQuestion =
          otherItem.querySelector(".faq-question");

        const otherAnswer =
          otherItem.querySelector(".faq-answer");

        const otherIcon =
          otherItem.querySelector(".faq-icon");

        if (!otherQuestion || !otherAnswer) {
          return;
        }

        otherQuestion.setAttribute(
          "aria-expanded",
          "false"
        );

        otherAnswer.hidden = true;

        if (otherIcon) {
          otherIcon.textContent = "+";
        }

      });


      if (!isOpen) {

        question.setAttribute(
          "aria-expanded",
          "true"
        );

        answer.hidden = false;

        const icon =
          item.querySelector(".faq-icon");

        if (icon) {
          icon.textContent = "−";
        }

      }

    });

  });

}

/* =========================================================
   ANIMAÇÕES DE ENTRADA
========================================================= */

function setupRevealObserver() {

  const elements = document.querySelectorAll(
    ".section:not(.hero) .section-heading, " +
    ".quote-list, " +
    ".cycle, " +
    ".topics, " +
    ".treatment-grid, " +
    ".about-grid, " +
    ".testimonial, " +
    ".faq-list"
  );


  if (!("IntersectionObserver" in window)) {
    return;
  }


  const observer = new IntersectionObserver(
    (entries, currentObserver) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("reveal");

        currentObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.08
    }
  );


  elements.forEach((element) => {
    observer.observe(element);
  });
}



/* =========================================================
   INICIALIZAÇÃO
========================================================= */

setupWhatsApp();
setupMobileMenu();
setupTopics();
setupTestimonials();
setupFAQ();
setupRevealObserver();