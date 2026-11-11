// Тексты на английском и немецком
const I18N = {
  en: {
    eyebrow: 'Specialty coffee · Berlin',
    title: 'Good coffee.<br>Slow mornings.',
    lead: 'A small neighbourhood café with beans roasted in-house, pastries baked every morning and a table that is always yours.',
    ctaVisit: 'Visit us', ctaContact: 'Get in touch',
    menuTitle: 'Menu', menuNote: 'Oat, soy and lactose-free milk at no extra charge. Prices incl. VAT.',
    visitTitle: 'Visit', hoursTitle: 'Opening hours',
    weekdays: 'Mon – Fri', saturday: 'Saturday', sunday: 'Sunday',
    open: t => `Open now · until ${t}`, closed: t => `Closed · opens ${t}`, tomorrow: 'tomorrow at', today: 'at',
    contactTitle: 'Contact', contactLead: 'Questions, catering or a table for a group — write to us.',
    name: 'Name', message: 'Message', send: 'Send message',
    consent: 'I agree that my data will be used to answer my request (see Privacy Policy).',
    thanks: 'Thank you! We will reply within one business day.',
    errRequired: 'Please fill in this field.', errEmail: 'Please enter a valid email.', errConsent: 'Please confirm to continue.',
    imprint: 'Imprint', privacy: 'Privacy Policy',
  },
  de: {
    eyebrow: 'Specialty Coffee · Berlin',
    title: 'Guter Kaffee.<br>Ruhige Morgen.',
    lead: 'Ein kleines Café im Kiez – Bohnen aus eigener Röstung, jeden Morgen frisch gebackenes Gebäck und immer ein Platz für dich.',
    ctaVisit: 'Besuch uns', ctaContact: 'Kontakt',
    menuTitle: 'Karte', menuNote: 'Hafer-, Soja- und laktosefreie Milch ohne Aufpreis. Preise inkl. MwSt.',
    visitTitle: 'Adresse', hoursTitle: 'Öffnungszeiten',
    weekdays: 'Mo – Fr', saturday: 'Samstag', sunday: 'Sonntag',
    open: t => `Jetzt geöffnet · bis ${t} Uhr`, closed: t => `Geschlossen · öffnet ${t} Uhr`, tomorrow: 'morgen um', today: 'um',
    contactTitle: 'Kontakt', contactLead: 'Fragen, Catering oder ein Tisch für eine Gruppe – schreib uns.',
    name: 'Name', message: 'Nachricht', send: 'Nachricht senden',
    consent: 'Ich bin einverstanden, dass meine Daten zur Beantwortung meiner Anfrage verwendet werden (siehe Datenschutzerklärung).',
    thanks: 'Danke! Wir antworten innerhalb eines Werktags.',
    errRequired: 'Bitte fülle dieses Feld aus.', errEmail: 'Bitte gib eine gültige E-Mail-Adresse ein.', errConsent: 'Bitte bestätige, um fortzufahren.',
    imprint: 'Impressum', privacy: 'Datenschutz',
  },
};

const MENU = [
  { en: 'Espresso', de: 'Espresso', price: 2.4 },
  { en: 'Americano', de: 'Americano', price: 2.9 },
  { en: 'Cappuccino', de: 'Cappuccino', price: 3.6 },
  { en: 'Flat White', de: 'Flat White', price: 3.9 },
  { en: 'Filter coffee', de: 'Filterkaffee', price: 3.2 },
  { en: 'Matcha latte', de: 'Matcha Latte', price: 4.2 },
  { en: 'Butter croissant', de: 'Buttercroissant', price: 2.8 },
  { en: 'Carrot cake', de: 'Karottenkuchen', price: 4.5 },
];

// Часы работы: день недели (0 = вс) → [открытие, закрытие]
const HOURS = { 0: [10, 16], 1: [8, 19], 2: [8, 19], 3: [8, 19], 4: [8, 19], 5: [8, 19], 6: [9, 18] };

let lang = 'en';
const $ = s => document.querySelector(s);
const pad = h => `${String(h).padStart(2, '0')}:00`;

function setLang(next) {
  lang = I18N[next] ? next : 'en';
  const t = I18N[lang];
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = t[el.dataset.i18n];
    if (typeof v === 'string') el.innerHTML = v;
  });
  document.querySelectorAll('[data-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
  renderMenu();
  renderStatus();
  document.querySelectorAll('.invalid').forEach(validate);
  try { localStorage.setItem('lang', lang); } catch (e) { /* хранилище недоступно */ }
}

function renderMenu() {
  const fmt = new Intl.NumberFormat(lang === 'de' ? 'de-DE' : 'en-IE', { style: 'currency', currency: 'EUR' });
  $('#menu-list').innerHTML = MENU.map(i =>
    `<li><span class="name">${i[lang]}</span><span class="price">${fmt.format(i.price)}</span></li>`).join('');
}

function renderStatus() {
  const t = I18N[lang];
  const now = new Date();
  const day = now.getDay();
  const h = now.getHours() + now.getMinutes() / 60;
  const [from, to] = HOURS[day];
  document.querySelectorAll('.hours [data-days]').forEach(r =>
    r.classList.toggle('today', r.dataset.days.split(',').map(Number).includes(day)));

  const el = $('#status');
  if (h >= from && h < to) {
    el.textContent = t.open(pad(to));
    el.className = 'status open';
  } else {
    const when = h < from ? `${t.today} ${pad(from)}` : `${t.tomorrow} ${pad(HOURS[(day + 1) % 7][0])}`;
    el.textContent = t.closed(when);
    el.className = 'status closed';
  }
}

// Валидация формы
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function validate(f) {
  const t = I18N[lang];
  let msg = '';
  if (f.type === 'checkbox') msg = f.checked ? '' : t.errConsent;
  else if (!f.value.trim()) msg = t.errRequired;
  else if (f.type === 'email' && !EMAIL.test(f.value.trim())) msg = t.errEmail;
  f.classList.toggle('invalid', !!msg);
  f.parentElement.querySelector('.err').textContent = msg;
  return !msg;
}

const form = $('#form');
const fields = [...form.querySelectorAll('input, textarea')];
fields.forEach(f => f.addEventListener(f.type === 'checkbox' ? 'change' : 'input', () => f.classList.contains('invalid') && validate(f)));

form.addEventListener('submit', e => {
  e.preventDefault();
  if (!fields.map(validate).every(Boolean)) return;
  // Здесь подключается отправка: fetch на свой сервер или сервис форм
  form.reset();
  $('#ok').hidden = false;
  setTimeout(() => { $('#ok').hidden = true; }, 6000);
});

// Старт: сохранённый язык → язык браузера → английский
document.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
$('#year').textContent = new Date().getFullYear();
let saved = null;
try { saved = localStorage.getItem('lang'); } catch (e) { /* хранилище недоступно */ }
setLang(saved || (navigator.language || 'en').slice(0, 2));
