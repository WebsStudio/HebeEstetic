/**
 * HEBE ESTETIC · NEREIDA GALLARDO
 * Editorial Haute Beauté Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initMasterHeader();
  initDrawer();
  initTechStudio();
  initPlansViewToggle();
  initBodySimulator();
  initGalleryLightbox();
  initFaqAccordion();
  initConciergeForm();
  initCookieConsent();
});

/* ==========================================================================
   1. MASTER HEADER SCROLL
   ========================================================================== */
function initMasterHeader() {
  const header = document.getElementById('masterHeader');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   2. MOBILE DRAWER
   ========================================================================== */
function initDrawer() {
  const burgerBtn = document.getElementById('burgerBtn');
  const closeBtn = document.getElementById('drawerCloseBtn');
  const overlay = document.getElementById('drawerOverlay');
  const links = document.querySelectorAll('.drawer-link');

  if (!burgerBtn || !overlay) return;

  const openDrawer = () => {
    overlay.classList.add('open');
    burgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    overlay.classList.remove('open');
    burgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  burgerBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeDrawer();
  });

  links.forEach(l => l.addEventListener('click', closeDrawer));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   3. TECH STUDIO TABS CONTROLLER
   ========================================================================== */
function initTechStudio() {
  const tabBtns = document.querySelectorAll('.tech-tab-btn');
  const panels = document.querySelectorAll('.tech-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const techKey = btn.getAttribute('data-tech');

      tabBtns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(`tech-${techKey}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   4. PLANS VIEW TOGGLE (CARDS VS TABLE)
   ========================================================================== */
function initPlansViewToggle() {
  const btnCards = document.getElementById('btnViewCards');
  const btnTable = document.getElementById('btnViewTable');
  const cardsView = document.getElementById('plansCardsView');
  const tableView = document.getElementById('plansTableView');

  if (!btnCards || !btnTable || !cardsView || !tableView) return;

  btnCards.addEventListener('click', () => {
    btnCards.classList.add('active');
    btnTable.classList.remove('active');
    cardsView.style.display = 'grid';
    tableView.style.display = 'none';
  });

  btnTable.addEventListener('click', () => {
    btnTable.classList.add('active');
    btnCards.classList.remove('active');
    cardsView.style.display = 'none';
    tableView.style.display = 'block';
  });
}

/* ==========================================================================
   5. SIMULADOR CORPORAL DE PROTOCOLO
   ========================================================================== */
function initBodySimulator() {
  const sim = document.getElementById('comparador');
  if (!sim) return;

  const titleElem = document.getElementById('simResultTitle');
  const summaryElem = document.getElementById('simResultSummary');
  const waBtn = document.getElementById('simWhatsappBtn');

  const state = {
    goal: 'grasa',
    zone: 'abdomen',
    intensity: 'alta'
  };

  const setupChips = (groupId, stateKey) => {
    const group = document.getElementById(groupId);
    if (!group) return;

    const chips = group.querySelectorAll('.sim-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        state[stateKey] = chip.getAttribute(`data-${stateKey}`);
        recalculate();
      });
    });
  };

  setupChips('simGoalGroup', 'goal');
  setupChips('simZoneGroup', 'zone');
  setupChips('simIntensityGroup', 'intensity');

  const recalculate = () => {
    let plan = 'Plan Premium (550 €)';
    let text = 'Para grasa localizada y flacidez en abdomen o flancos, la combinación estrella es Criolipólisis 360° para destruir la célula grasa y sesiones alternas de Indiba Deep Beauty y aparatología combinada.';
    let waMsg = 'Hola Nereida, en el simulador de la web me recomienda el Plan Premium (550€). Deseo agendar mi valoración gratuita.';

    if (state.intensity === 'alta' && (state.goal === 'integral' || state.zone === 'completo')) {
      plan = 'Plan Estrella (750 €)';
      text = 'Para una transformación integral de choque en cuerpo completo, se recomiendan 4 zonas de Criolipólisis con 8 sesiones de Indiba/Rollaction y electroestimulación activa Space Shape.';
      waMsg = 'Hola Nereida, he configurado el simulador para cambio integral y me propone el Plan Estrella (750€). ¿Cuándo podríamos hacer la valoración?';
    } else if (state.goal === 'flacidez' || state.intensity === 'media') {
      plan = 'Plan Avanzado (450 €)';
      text = 'Para recuperar la firmeza y activar la producción de colágeno, 8 sesiones completas de Indiba Deep Beauty combinadas con aparatología de cabina y menú semanal son la opción idónea.';
      waMsg = 'Hola Nereida, he usado el simulador corporal y me indica el Plan Avanzado (450€) para flacidez. Quisiera concertar mi cita.';
    } else if (state.goal === 'celulitis' && state.intensity !== 'alta') {
      plan = 'Plan Esencial (350 €)';
      text = 'Para eliminar retención de líquidos, reactivar la circulación y tonificar tejido con electroestimulación i-Shape y aparatología combinada.';
      waMsg = 'Hola Nereida, consulto el Plan Esencial (350€) que me ha sugerido el simulador para celulitis y drenaje.';
    }

    titleElem.textContent = plan;
    summaryElem.textContent = text;
    waBtn.href = `https://wa.me/34691240470?text=${encodeURIComponent(waMsg)}`;
  };
}

/* ==========================================================================
   6. CLINICAL GALLERY LIGHTBOX
   ========================================================================== */
function initGalleryLightbox() {
  const lightbox = document.getElementById('atelierLightbox');
  const activeImg = document.getElementById('lightboxActiveImg');
  const activeCaption = document.getElementById('lightboxActiveCaption');
  const closeBtn = document.getElementById('lightboxCloseBtn');
  const cards = document.querySelectorAll('.gallery-case-card');

  if (!lightbox || !activeImg) return;

  const openBox = (src, caption) => {
    activeImg.src = src;
    activeCaption.textContent = caption || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeBox = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const childImg = card.querySelector('img');
      const src = (childImg && childImg.currentSrc) ? childImg.currentSrc : (childImg?.src || card.getAttribute('data-img'));
      const caption = card.getAttribute('data-caption');
      openBox(src, caption);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeBox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeBox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
      closeBox();
    }
  });
}

/* ==========================================================================
   7. FAQ ACCORDION (+ / -)
   ========================================================================== */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-card-item');

  items.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const drawer = item.querySelector('.faq-drawer');

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      items.forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
          other.querySelector('.faq-drawer').style.maxHeight = null;
        }
      });

      if (!isOpen) {
        item.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
        drawer.style.maxHeight = drawer.scrollHeight + 'px';
      } else {
        item.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
        drawer.style.maxHeight = null;
      }
    });
  });
}

/* ==========================================================================
   8. CONCIERGE BOOKING FORM TO WHATSAPP
   ========================================================================== */
function initConciergeForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.userName.value.trim();
    const phone = form.userPhone.value.trim();
    const plan = form.userPlan.value;
    const message = form.userMessage.value.trim();

    let text = `Hola Nereida, me pongo en contacto desde la web de Hebe Estetic:\n\n`;
    text += `👤 *Nombre:* ${name}\n`;
    text += `📞 *Teléfono:* ${phone}\n`;
    text += `✨ *Interés:* ${plan}\n`;
    if (message) {
      text += `💬 *Consulta u objetivo:* ${message}\n`;
    }
    text += `\nQuisiera concertar una cita para mi valoración gratuita en Marratxí. ¡Muchas gracias!`;

    const encoded = encodeURIComponent(text);
    const waUrl = `https://wa.me/34691240470?text=${encoded}`;

    window.open(waUrl, '_blank', 'noopener,noreferrer');
  });
}

/* ==========================================================================
   9. COOKIE SHEET
   ========================================================================== */
function initCookieConsent() {
  const sheet = document.getElementById('cookieSheet');
  const acceptBtn = document.getElementById('btnCookieAccept');
  const essentialBtn = document.getElementById('btnCookieEssential');
  const prefBtn = document.getElementById('btnCookiePref');

  if (!sheet) return;

  const getChoice = () => {
    try {
      return localStorage.getItem('hebe_editorial_cookies');
    } catch {
      return null;
    }
  };

  const saveChoice = (val) => {
    try {
      localStorage.setItem('hebe_editorial_cookies', val);
    } catch {}
    sheet.hidden = true;
  };

  if (!getChoice()) {
    sheet.hidden = false;
  }

  if (acceptBtn) acceptBtn.addEventListener('click', () => saveChoice('all'));
  if (essentialBtn) essentialBtn.addEventListener('click', () => saveChoice('essential'));
  if (prefBtn) prefBtn.addEventListener('click', () => { sheet.hidden = false; });
}
