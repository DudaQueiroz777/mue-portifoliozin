// ==========================================================
// PORTFÓLIO - MARIA EDUARDA (SCRIPTS)
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inicializar Ícones Lucide
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Alternância entre Modo Escuro e Modo Claro (Dark/Light Mode)
  const themeToggle = document.getElementById('themeToggle');
  const htmlElement = document.documentElement;

  // Carregar preferência salva ou padrão Dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  htmlElement.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Atualiza ícones após alternar
    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

  // 3. Menu Mobile Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const menuIcon = document.getElementById('menuIcon');

  mobileToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    if (isOpen) {
      menuIcon.setAttribute('data-lucide', 'x');
    } else {
      menuIcon.setAttribute('data-lucide', 'menu');
    }
    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

  // Fechar o menu mobile ao clicar em um link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuIcon.setAttribute('data-lucide', 'menu');
      if (window.lucide) {
        window.lucide.createIcons();
      }
    });
  });

  // 4. Efeito de Scroll no Menu (Navbar Sticky & Links Ativos)
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });

  // 5. Animações Suaves ao Rolar (Scroll Reveal via Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Uma vez visível, não precisa observar novamente para melhor performance
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.12, // Aciona quando 12% do elemento entra na tela
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 5.1 Modal de Detalhes dos Projetos
  const projectsData = {
    1: {
      title: "RPG - Personagens",
      desc: "Aplicação focada em criação, customização e gerenciamento de fichas de personagens de RPG. O projeto conta com cálculo dinâmico de atributos, inventário interativo e interface amigável para jogadores e mestres.",
      image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=900&q=80",
      tags: ["Game Dev", "JavaScript", "RPG", "Frontend"],
      year: "2026",
      category: "Jogos & Interatividade",
      live: "https://github.com/DudaQueiroz777/RPG-personagens",
      github: "https://github.com/DudaQueiroz777/RPG-personagens"
    },
    2: {
      title: "Enva",
      desc: "Projeto voltado para conscientização ambiental e práticas sustentáveis. Com design intuitivo e informações visuais impactantes, busca aproximar temas ecológicos da rotina diária das pessoas de forma leve e descomplicada.",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=900&q=80",
      tags: ["Web Design", "Sustentabilidade", "HTML & CSS", "JavaScript"],
      year: "2026",
      category: "Design & Meio Ambiente",
      live: "https://github.com/DudaQueiroz777/enva",
      github: "https://github.com/DudaQueiroz777/enva"
    },
    3: {
      title: "Mano Se Vira",
      desc: "Solução criativa e descontraída desenvolvida para auxiliar na resolução de dúvidas e tarefas cotidianas de forma autônoma e rápida. Pensada com foco em experiência do usuário, humor e praticidade.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
      tags: ["Aplicação Web", "Utilidades", "Interatividade", "UI/UX"],
      year: "2026",
      category: "Web App & Utilidades",
      live: "https://github.com/DudaQueiroz777/manosevira",
      github: "https://github.com/DudaQueiroz777/manosevira"
    }
  };

  const projectModal = document.getElementById('projectModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalTags = document.getElementById('modalTags');
  const modalYear = document.getElementById('modalYear');
  const modalCategory = document.getElementById('modalCategory');
  const modalLinkLive = document.getElementById('modalLinkLive');
  const modalLinkGithub = document.getElementById('modalLinkGithub');

  function openProjectModal(id) {
    const data = projectsData[id];
    if (!data) return;

    modalImg.src = data.image;
    modalImg.alt = data.title;
    modalTitle.textContent = data.title;
    modalDescription.textContent = data.desc;
    modalYear.textContent = data.year;
    modalCategory.textContent = data.category;
    modalLinkLive.href = data.live;
    modalLinkGithub.href = data.github;

    // Tags
    modalTags.innerHTML = data.tags.map(t => `<span class="tag">${t}</span>`).join('');

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // impede scroll de fundo

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function closeProjectModal() {
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.open-modal-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-project-id');
      openProjectModal(id);
    });
  });

  modalCloseBtn.addEventListener('click', closeProjectModal);
  modalBackdrop.addEventListener('click', closeProjectModal);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
      closeProjectModal();
    }
  });

  // 6. Validação e Envio do Formulário de Contato
  const contactForm = document.getElementById('contactForm');
  const nomeInput = document.getElementById('nome');
  const emailInput = document.getElementById('email');
  const mensagemInput = document.getElementById('mensagem');
  const formSuccess = document.getElementById('formSuccess');

  function setError(input, message, errorId) {
    const parent = input.closest('.form-group');
    const errorEl = document.getElementById(errorId);
    parent.classList.add('has-error');
    if (errorEl) {
      errorEl.textContent = message;
    }
  }

  function clearError(input, errorId) {
    const parent = input.closest('.form-group');
    const errorEl = document.getElementById(errorId);
    parent.classList.remove('has-error');
    if (errorEl) {
      errorEl.textContent = '';
    }
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  // Validação em tempo real ao digitar
  nomeInput.addEventListener('input', () => {
    if (nomeInput.value.trim().length >= 2) {
      clearError(nomeInput, 'nomeError');
    }
  });

  emailInput.addEventListener('input', () => {
    if (validateEmail(emailInput.value.trim())) {
      clearError(emailInput, 'emailError');
    }
  });

  mensagemInput.addEventListener('input', () => {
    if (mensagemInput.value.trim().length >= 8) {
      clearError(mensagemInput, 'mensagemError');
    }
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Validação do Nome
    if (nomeInput.value.trim().length < 2) {
      setError(nomeInput, 'Por favor, informe seu nome (mínimo 2 letras).', 'nomeError');
      isValid = false;
    } else {
      clearError(nomeInput, 'nomeError');
    }

    // Validação do E-mail
    if (!validateEmail(emailInput.value.trim())) {
      setError(emailInput, 'Informe um endereço de e-mail válido.', 'emailError');
      isValid = false;
    } else {
      clearError(emailInput, 'emailError');
    }

    // Validação da Mensagem
    if (mensagemInput.value.trim().length < 8) {
      setError(mensagemInput, 'Por favor, escreva uma mensagem com ao menos 8 caracteres.', 'mensagemError');
      isValid = false;
    } else {
      clearError(mensagemInput, 'mensagemError');
    }

    if (isValid) {
      const submitBtn = document.getElementById('submitBtn');
      const originalText = submitBtn.innerHTML;
      
      // Feedback de envio
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Enviando mensagem...</span>';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        formSuccess.style.display = 'flex';
        contactForm.reset();

        // Rolar suavemente até o alerta de sucesso
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        if (window.lucide) {
          window.lucide.createIcons();
        }

        // Esconder o alerta após 6 segundos
        setTimeout(() => {
          formSuccess.style.display = 'none';
        }, 6000);
      }, 1000);
    }
  });
});

