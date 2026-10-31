'use strict';

/* ====== CONFIG (edit these) ====== */
const WHATSAPP_NUMBER = '2340000000001'; // FICTIONAL placeholder: replace with your real number (country code, no +)
const IMG = id => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=75`;

const CATEGORIES = ['Men', 'Women', 'Dresses & Outfits', 'Bags', 'Shoes', 'Jewelry & Watches', 'Sunglasses', 'Accessories'];

/* collections: new | trending | best (optional) */
const PRODUCTS = [
  { name: 'Charcoal Slim Blazer', cat: 'Men', price: 68000, img: '1507679799987-c73779587ccf', desc: 'Sharp, breathable tailoring for the office and beyond.', col: 'new' },
  { name: 'Classic Oxford Shirt', cat: 'Men', price: 24500, img: '1594938298603-c8148c4dae35', desc: 'Crisp cotton with a relaxed, modern collar.', col: 'best' },
  { name: 'Urban Bomber Jacket', cat: 'Men', price: 52000, img: '1591047139829-d91aecb6caea', desc: 'Lightweight layer with a clean street finish.', col: 'trending' },
  { name: 'Ivory Wrap Co-ord', cat: 'Women', price: 59000, img: '1509631179647-0177331693ae', desc: 'Soft two-piece set that moves with you.', col: 'trending' },
  { name: 'Tailored Wide-Leg Set', cat: 'Women', price: 63500, img: '1445205170230-053b83016050', desc: 'Polished power dressing in fluid fabric.', col: 'new' },
  { name: 'Emerald Satin Dress', cat: 'Dresses & Outfits', price: 78000, img: '1496747611176-843222e1e57c', desc: 'A showstopper for weddings and evening events.', col: 'best' },
  { name: 'Sunday Linen Outfit', cat: 'Dresses & Outfits', price: 46000, img: '1434389677669-e08b4cac3105', desc: 'Easy, elegant and made for warm days.', col: 'new' },
  { name: 'Sculpted Leather Tote', cat: 'Bags', price: 85000, img: '1584917865442-de89df76afd3', desc: 'Roomy structure with a refined gold clasp.', col: 'best' },
  { name: 'Everyday City Backpack', cat: 'Bags', price: 38000, img: '1553062407-98eeb64c6a62', desc: 'Durable, minimal and laptop-friendly.', col: 'trending' },
  { name: 'Street Runner Sneakers', cat: 'Shoes', price: 57000, img: '1542291026-7eec264c27ff', desc: 'Cushioned comfort with bold colour energy.', col: 'trending' },
  { name: 'Court White Sneakers', cat: 'Shoes', price: 42000, img: '1491553895911-0055eca6402d', desc: 'The versatile low-top that goes with everything.', col: 'best' },
  { name: 'Heritage Chrono Watch', cat: 'Jewelry & Watches', price: 120000, img: '1523275335684-37898b6baf30', desc: 'Stainless steel case with a timeless dial.', col: 'new' },
  { name: 'Gold Statement Necklace', cat: 'Jewelry & Watches', price: 31500, img: '1515562141207-7a88fb7ce338', desc: 'Layered gold-tone shine for any neckline.', col: 'trending' },
  { name: 'Aviator Gold Shades', cat: 'Sunglasses', price: 19500, img: '1572635196237-14b3f281503f', desc: 'UV-protective lenses in a classic frame.', col: 'new' },
  { name: 'Retro Round Sunglasses', cat: 'Sunglasses', price: 17500, img: '1511499767150-a48a237f0083', desc: 'Vintage charm with all-day comfort.' },
  { name: 'Woven Leather Belt', cat: 'Accessories', price: 14500, img: '1553062407-98eeb64c6a62', desc: 'Hand-finished detail to complete the look.' },
  { name: 'Silk Print Scarf', cat: 'Accessories', price: 12000, img: '1523381210434-271e8be1f52b', desc: 'Lightweight accent for hair, neck or bag.', col: 'best' },
  { name: 'Gold Stud Earrings', cat: 'Jewelry & Watches', price: 9500, img: '1605100804763-247f67b3557e', desc: 'Small, polished, endlessly wearable.' }
];

const COL_BADGE = { new: 'New', trending: 'Trending', best: 'Bestseller' };
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const naira = n => '₦' + n.toLocaleString('en-NG');
const waLink = msg => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

/* ====== Rendering ====== */
function productCard(p, i) {
  const badge = p.col ? `<span class="badge">${COL_BADGE[p.col]}</span>` : '';
  return `<article class="card-p" style="animation-delay:${Math.min(i, 8) * 60}ms">
    <div class="thumb"><img src="${IMG(p.img)}" alt="${p.name}: ${p.desc}" loading="lazy" width="600" height="750">${badge}</div>
    <div class="body">
      <span class="cat">${p.cat}</span>
      <h3>${p.name}</h3>
      <p class="desc">${p.desc}</p>
      <p class="price">${naira(p.price)}</p>
      <a class="btn btn-sm" href="${waLink(`Hello The Eddies Spot, I want to order: ${p.name} (${naira(p.price)}).`)}" target="_blank" rel="noopener">Order on WhatsApp</a>
    </div>
  </article>`;
}

function render(el, list) {
  el.innerHTML = list.length ? list.map(productCard).join('') : '<p>No products found.</p>';
  $$('img', el).forEach(img => img.addEventListener('error', () => { img.style.display = 'none'; }, { once: true }));
}

/* Shop filters */
function initShop() {
  const wrap = $('#filters'), grid = $('#productGrid'), count = $('#count');
  const cats = ['All', ...CATEGORIES];
  wrap.innerHTML = cats.map((c, i) => `<button class="chip${i ? '' : ' active'}" data-cat="${c}" aria-pressed="${!i}">${c}</button>`).join('');
  const apply = cat => {
    const list = cat === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat);
    render(grid, list);
    count.textContent = `Showing ${list.length} item${list.length === 1 ? '' : 's'}${cat === 'All' ? '' : ' in ' + cat}`;
  };
  wrap.addEventListener('click', e => {
    const b = e.target.closest('.chip'); if (!b) return;
    $$('.chip', wrap).forEach(c => { const on = c === b; c.classList.toggle('active', on); c.setAttribute('aria-pressed', on); });
    apply(b.dataset.cat);
  });
  apply('All');
}

/* Collections tabs */
function initCollections() {
  const grid = $('#collectionGrid'), tabs = $$('.tab');
  const show = key => render(grid, PRODUCTS.filter(p => p.col === key).slice(0, 4));
  tabs.forEach(t => t.addEventListener('click', () => {
    tabs.forEach(x => { x.classList.toggle('active', x === t); x.setAttribute('aria-pressed', x === t); });
    show(t.dataset.collection);
  }));
  show('new');
}

/* Mobile nav */
function initNav() {
  const btn = $('#navToggle'), nav = $('#nav');
  const set = open => { nav.classList.toggle('open', open); btn.setAttribute('aria-expanded', open); };
  btn.addEventListener('click', () => set(!nav.classList.contains('open')));
  $$('a', nav).forEach(a => a.addEventListener('click', () => set(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { set(false); btn.focus(); } });

  const links = $$('a', nav);
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) links.forEach(l => {
      const on = l.getAttribute('href') === '#' + en.target.id;
      l.classList.toggle('active', on); on ? l.setAttribute('aria-current', 'true') : l.removeAttribute('aria-current');
    });
  }), { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach(s => io.observe(s));
}

/* WhatsApp buttons and placeholders */
function initLinks() {
  $$('[data-wa]').forEach(a => { a.href = waLink(a.dataset.wa); a.target = '_blank'; a.rel = 'noopener'; });
  $$('[data-placeholder]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault(); toast('Placeholder social link: add your real profile URL.');
  }));
}

let toastTimer;
function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

/* Open / closed status (Africa/Lagos time) */
function initStatus() {
  const el = $('#openStatus');
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Africa/Lagos' }));
  const d = now.getDay(), h = now.getHours() + now.getMinutes() / 60;
  const hours = d === 0 ? [13, 18] : d === 6 ? [10, 20] : [9, 19];
  const open = h >= hours[0] && h < hours[1];
  el.textContent = open ? '● Open now' : '● Closed right now';
  el.className = 'open-status ' + (open ? 'open' : 'closed');
}

document.addEventListener('DOMContentLoaded', () => {
  initShop(); initCollections(); initNav(); initLinks(); initStatus();
  $('#year').textContent = new Date().getFullYear();
});