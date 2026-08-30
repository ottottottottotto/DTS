const ICONS = {
  earbuds: `<svg viewBox="0 0 24 24" fill="none" stroke="#1A1D21" stroke-width="1.4"><path d="M6 10a3 3 0 0 1 6 0v6a2 2 0 1 1-4 0v-5"/><path d="M18 10a3 3 0 0 0-6 0v6a2 2 0 1 0 4 0v-5"/></svg>`,
  keyboard: `<svg viewBox="0 0 24 24" fill="none" stroke="#1A1D21" stroke-width="1.4"><rect x="2" y="6" width="20" height="12" rx="1.5"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h12"/></svg>`,
  watch: `<svg viewBox="0 0 24 24" fill="none" stroke="#1A1D21" stroke-width="1.4"><rect x="7" y="7" width="10" height="10" rx="2"/><path d="M9 3h6M9 21h6M12 10v2l1.5 1.5"/></svg>`,
  ssd: `<svg viewBox="0 0 24 24" fill="none" stroke="#1A1D21" stroke-width="1.4"><rect x="3" y="7" width="18" height="10" rx="1.5"/><path d="M7 12h.01M11 12h.01"/><path d="M15 10v4M18 10v4"/></svg>`,
  webcam: `<svg viewBox="0 0 24 24" fill="none" stroke="#1A1D21" stroke-width="1.4"><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.6"/><path d="M4 6l2 2M20 6l-2 2"/></svg>`,
  bank: `<svg viewBox="0 0 24 24" fill="none" stroke="#1A1D21" stroke-width="1.4"><rect x="5" y="4" width="10" height="16" rx="2"/><path d="M17 9l3 2-3 2"/></svg>`
};

const PRODUCTS = [
  { id:'p1', sku:'DTS-EB-220', name:'Loop Earbuds 220', icon:'earbuds', price:79.00, stock:'in stock',
    desc:'Everyday earbuds with active noise cancelling and a case that tops up on the go. Built for commutes, calls, and the gym without needing a charger nearby.',
    specs:[['Driver','10mm dyn.'],['Battery','7h + 24h case'],['ANC','Yes, -32dB'],['Weight','4.4g / ear']] },
  { id:'p2', sku:'DTS-KB-75', name:'Compact 75 Keyboard', icon:'keyboard', price:129.00, stock:'in stock',
    desc:'A 75% layout that keeps the arrow keys without the bulk of a full board. Hot-swappable switches mean you can change the feel without a soldering iron.',
    specs:[['Layout','75%, hot-swap'],['Switches','Linear, 45g'],['Connect','BT 5.0 / USB-C'],['Battery','4000mAh']] },
  { id:'p3', sku:'DTS-WT-04', name:'Pulse Watch 04', icon:'watch', price:189.00, stock:'low stock',
    desc:'Tracks heart rate, blood oxygen, and workouts with GPS, then goes over a week without needing the charger again.',
    specs:[['Display','1.4" AMOLED'],['Battery','9 days'],['Water','5 ATM'],['Sensors','HR, SpO2, GPS']] },
  { id:'p4', sku:'DTS-SD-1T', name:'Portable SSD 1TB', icon:'ssd', price:99.00, stock:'in stock',
    desc:'A pocket-sized drive fast enough for video editing on the move, rated to survive drops that would kill a spinning disk.',
    specs:[['Capacity','1 TB'],['Read speed','1050 MB/s'],['Interface','USB-C 3.2'],['Rated','Shock-resist.']] },
  { id:'p5', sku:'DTS-WC-2K', name:'Frame Webcam 2K', icon:'webcam', price:69.00, stock:'in stock',
    desc:'Sharp 2K video with a wide field of view and a dual-mic setup that cuts background noise on calls.',
    specs:[['Resolution','2K / 30fps'],['FOV','82°'],['Mic','Dual, noise-red.'],['Mount','Clip + tripod']] },
  { id:'p6', sku:'DTS-PB-20K', name:'Cell Bank 20K', icon:'bank', price:54.00, stock:'low stock',
    desc:'Enough capacity for a couple of full phone charges plus a laptop top-up, with fast enough output to not slow you down.',
    specs:[['Capacity','20,000mAh'],['Output','65W PD'],['Ports','2x USB-C'],['Weight','390g']] },
];

let cart = {}; // id -> qty

function money(n){ return '$' + n.toFixed(2); }

function renderGrid(){
  const grid = document.getElementById('grid');
  grid.innerHTML = PRODUCTS.map(p => `
    <div class="card">
      <div class="card-head" data-id="${p.id}" style="cursor:pointer;">
        <span class="sku">${p.sku}</span>
        <span class="stock ${p.stock==='low stock'?'low':''}">${p.stock}</span>
      </div>
      <div class="art" data-id="${p.id}" style="cursor:pointer;">${ICONS[p.icon]}</div>
      <div class="card-body">
        <h3 data-id="${p.id}" style="cursor:pointer;">${p.name}</h3>
        <ul class="specs">
          ${p.specs.map(s => `<li><span>${s[0]}</span><span>${s[1]}</span></li>`).join('')}
        </ul>
        <div class="card-foot">
          <span class="price">${money(p.price)}<sup> USD</sup></span>
          <button class="add-btn" data-id="${p.id}">ADD TO CART</button>
        </div>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      cart[id] = (cart[id] || 0) + 1;
      renderCart();
      btn.textContent = 'ADDED ✓';
      btn.classList.add('added');
      setTimeout(() => { btn.textContent = 'ADD TO CART'; btn.classList.remove('added'); }, 900);
    });
  });

  grid.querySelectorAll('[data-id]:not(.add-btn)').forEach(el => {
    el.addEventListener('click', () => openDetails(el.dataset.id));
  });
}

function openDetails(id){
  const p = PRODUCTS.find(x => x.id === id);
  document.getElementById('dtsSku').textContent = p.sku;
  document.getElementById('dtsArt').innerHTML = ICONS[p.icon];
  document.getElementById('dtsName').textContent = p.name;
  document.getElementById('dtsDesc').textContent = p.desc;
  document.getElementById('dtsPrice').innerHTML = money(p.price) + '<sup> USD</sup>';
  document.getElementById('dtsSpecs').innerHTML = p.specs.map(s => `<li><span>${s[0]}</span><span>${s[1]}</span></li>`).join('');
  document.getElementById('dtsAddBtn').dataset.id = id;
  document.getElementById('dtsPanel').classList.add('open');
  document.getElementById('dtsOverlay').classList.add('open');
}
function closeDetails(){
  document.getElementById('dtsPanel').classList.remove('open');
  document.getElementById('dtsOverlay').classList.remove('open');
}
document.getElementById('dtsClose').addEventListener('click', closeDetails);
document.getElementById('dtsOverlay').addEventListener('click', closeDetails);
document.getElementById('dtsAddBtn').addEventListener('click', (e) => {
  const id = e.target.dataset.id;
  cart[id] = (cart[id] || 0) + 1;
  renderCart();
  e.target.textContent = 'ADDED ✓';
  setTimeout(() => { e.target.textContent = 'ADD TO CART'; }, 900);
});

function cartCount(){ return Object.values(cart).reduce((a,b)=>a+b, 0); }

function renderCart(){
  const items = Object.entries(cart).filter(([_,qty]) => qty > 0);
  document.getElementById('cartCount').textContent = cartCount();

  const container = document.getElementById('drawerItems');
  if(items.length === 0){
    container.innerHTML = `<div class="empty-msg">CART EMPTY<br>— add components to begin —</div>`;
  } else {
    container.innerHTML = items.map(([id, qty]) => {
      const p = PRODUCTS.find(x => x.id === id);
      return `
        <div class="line-item">
          <div class="mini-art">${ICONS[p.icon]}</div>
          <div class="line-info">
            <div class="name">${p.name}</div>
            <div class="meta">${p.sku} · ${money(p.price)}</div>
            <div class="qty-row">
              <button class="qty-btn" data-id="${id}" data-dir="-1">−</button>
              <span class="qty-val">${qty}</span>
              <button class="qty-btn" data-id="${id}" data-dir="1">+</button>
              <span class="remove-link" data-id="${id}">remove</span>
            </div>
          </div>
          <div class="line-total">${money(p.price * qty)}</div>
        </div>
      `;
    }).join('');
  }

  const subtotal = items.reduce((sum, [id, qty]) => sum + PRODUCTS.find(p=>p.id===id).price * qty, 0);
  const tax = subtotal * 0.07;
  document.getElementById('subtotal').textContent = money(subtotal);
  document.getElementById('tax').textContent = money(tax);
  document.getElementById('grandTotal').textContent = money(subtotal + tax);
  document.getElementById('checkoutBtn').disabled = items.length === 0;

  container.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const dir = parseInt(btn.dataset.dir);
      cart[id] = Math.max(0, (cart[id]||0) + dir);
      if(cart[id] === 0) delete cart[id];
      renderCart();
    });
  });
  container.querySelectorAll('.remove-link').forEach(link => {
    link.addEventListener('click', () => {
      delete cart[link.dataset.id];
      renderCart();
    });
  });
}

document.getElementById('cartBtn').addEventListener('click', () => {
  document.getElementById('drawer').classList.add('open');
  document.getElementById('overlay').classList.add('open');
});
function closeDrawer(){
  document.getElementById('drawer').classList.remove('open');
  document.getElementById('overlay').classList.remove('open');
}
document.getElementById('closeDrawer').addEventListener('click', closeDrawer);
document.getElementById('overlay').addEventListener('click', closeDrawer);

document.getElementById('checkoutBtn').addEventListener('click', () => {
  const orderNum = 'DTS-' + Math.floor(10000 + Math.random()*89999);
  document.getElementById('orderId').textContent = 'ORDER #' + orderNum;
  document.getElementById('confirm').classList.add('open');
});
document.getElementById('confirmClose').addEventListener('click', () => {
  document.getElementById('confirm').classList.remove('open');
  cart = {};
  renderCart();
  closeDrawer();
});

renderGrid();
renderCart();

function enterStore(){
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('storeApp').style.display = 'block';
}
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  enterStore();
});
document.getElementById('guestBtn').addEventListener('click', enterStore);
