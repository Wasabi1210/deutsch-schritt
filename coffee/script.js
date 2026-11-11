// Данные меню
const MENU = {
  coffee: [
    { name: 'Эспрессо', desc: '30 мл, насыщенный и плотный', price: 150 },
    { name: 'Американо', desc: '250 мл', price: 180 },
    { name: 'Капучино', desc: '300 мл, нежная молочная пенка', price: 230 },
    { name: 'Латте', desc: '350 мл', price: 250 },
    { name: 'Флэт уайт', desc: '200 мл, двойной эспрессо', price: 260 },
    { name: 'Раф ванильный', desc: '300 мл, сливки и ваниль', price: 290 },
  ],
  tea: [
    { name: 'Чай чёрный / зелёный', desc: 'чайник 500 мл', price: 220 },
    { name: 'Облепиховый чай', desc: '400 мл, с мёдом', price: 260 },
    { name: 'Какао', desc: '300 мл, с маршмеллоу', price: 240 },
    { name: 'Матча латте', desc: '300 мл', price: 280 },
  ],
  desserts: [
    { name: 'Круассан', desc: 'сливочный, свежая выпечка', price: 160 },
    { name: 'Чизкейк', desc: 'классический Нью-Йорк', price: 290 },
    { name: 'Морковный торт', desc: 'с крем-чизом', price: 270 },
    { name: 'Синнабон', desc: 'с корицей и глазурью', price: 210 },
  ],
};

// Рендер меню
const menuList = document.getElementById('menu-list');
const tabs = document.querySelectorAll('.tab');

function renderMenu(category) {
  menuList.innerHTML = MENU[category].map(item => `
    <li class="menu-item">
      <span class="name">${item.name}<span class="desc">${item.desc}</span></span>
      <span class="dots"></span>
      <span class="price">${item.price} ₽</span>
    </li>`).join('');
}

tabs.forEach(tab => tab.addEventListener('click', () => {
  tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
  tab.classList.add('active');
  tab.setAttribute('aria-selected', 'true');
  renderMenu(tab.dataset.category);
}));
renderMenu('coffee');

// Мобильное меню
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.getElementById('nav-links');
toggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

// Часы работы: подсветка сегодняшнего дня и статус «открыто/закрыто»
const HOURS = { 0: [10, 20], 1: [8, 21], 2: [8, 21], 3: [8, 21], 4: [8, 21], 5: [8, 21], 6: [9, 22] };
(function updateStatus() {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours() + now.getMinutes() / 60;
  const [from, to] = HOURS[day];

  document.querySelectorAll('.hours tr').forEach(row => {
    row.classList.toggle('today', row.dataset.days.split(',').map(Number).includes(day));
  });

  const status = document.getElementById('open-status');
  const isOpen = hour >= from && hour < to;
  status.textContent = isOpen ? `Сейчас открыто — до ${to}:00` : `Сейчас закрыто — откроемся в ${from}:00`;
  status.className = 'status ' + (isOpen ? 'open' : 'closed');
  if (!isOpen && hour >= to) {
    const next = HOURS[(day + 1) % 7][0];
    status.textContent = `Сейчас закрыто — откроемся завтра в ${String(next).padStart(2, '0')}:00`;
  }
})();

// Форма обратной связи
const form = document.getElementById('feedback-form');
const success = document.getElementById('form-success');
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateField(field) {
  const value = field.value.trim();
  let msg = '';
  if (!value) msg = 'Заполните это поле';
  else if (field.name === 'email' && !EMAIL_RE.test(value)) msg = 'Введите корректный email';
  else if (field.name === 'message' && value.length < 10) msg = 'Сообщение должно быть не короче 10 символов';
  field.classList.toggle('invalid', Boolean(msg));
  field.nextElementSibling.textContent = msg;
  return !msg;
}

form.querySelectorAll('input, textarea').forEach(f =>
  f.addEventListener('input', () => f.classList.contains('invalid') && validateField(f)));

form.addEventListener('submit', e => {
  e.preventDefault();
  const fields = [...form.querySelectorAll('input, textarea')];
  const valid = fields.map(validateField).every(Boolean);
  if (!valid) return;
  // Здесь можно отправить данные на сервер, например через fetch('/api/feedback', ...)
  form.reset();
  success.hidden = false;
  setTimeout(() => { success.hidden = true; }, 5000);
});

document.getElementById('year').textContent = new Date().getFullYear();
