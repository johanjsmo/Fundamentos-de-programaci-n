/**
 * LÓGICA PRINCIPAL - LA MONCHERÍA MX
 * Carrito interactivo, filtrado, constructor de antojos y pedidos por WhatsApp
 */

// Estado global de la aplicación
const AppState = {
  cart: [],
  orderType: 'delivery', // 'delivery' o 'pickup'
  activeCategory: 'todos',
  searchQuery: '',
  deliveryFee: 35,
  freeDeliveryThreshold: 250,
  storePhone: '5218123456789', // Número para pedidos WhatsApp
  
  // Estado para el modal de personalización
  activeModalItem: null,
  modalSelectedSalsa: '',
  modalSelectedDrink: '',
  modalSelectedExtras: [],
  modalNotes: '',
  modalQty: 1,

  // Estado para el constructor "Arma tu Antojo"
  builder: {
    base: null,
    spread: null,
    fruits: [],
    crunchies: [],
    toppingsFinales: []
  }
};

// Cargar carrito previo de localStorage si existe
function loadSavedCart() {
  try {
    const saved = localStorage.getItem('moncheria_cart');
    if (saved) {
      AppState.cart = JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error cargando carrito local', e);
  }
}

function saveCart() {
  try {
    localStorage.setItem('moncheria_cart', JSON.stringify(AppState.cart));
  } catch (e) {
    console.error('Error guardando carrito', e);
  }
}

// Inicialización cuando carga el DOM
document.addEventListener('DOMContentLoaded', () => {
  loadSavedCart();
  renderCategories();
  renderFeaturedCombos();
  renderMenu();
  initBuilder();
  updateCartUI();
  setupEventListeners();
  checkStoreHours();
});

// ================= RENDERIZADO DEL MENÚ =================

function renderCategories() {
  const container = document.getElementById('categoriesContainer');
  if (!container) return;

  container.innerHTML = CATEGORIES.map(cat => `
    <button class="category-pill ${cat.id === AppState.activeCategory ? 'active' : ''}" data-cat="${cat.id}">
      <span>${cat.icon}</span>
      <span>${cat.name}</span>
    </button>
  `).join('');

  container.querySelectorAll('.category-pill').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const catId = btn.getAttribute('data-cat');
      AppState.activeCategory = catId;
      document.querySelectorAll('.category-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMenu();
    });
  });
}

function renderFeaturedCombos() {
  const container = document.getElementById('featuredCombosContainer');
  if (!container) return;

  const combos = MENU_ITEMS.filter(item => item.isCombo);

  container.innerHTML = combos.map(item => `
    <div class="combo-card">
      <span class="card-badge" style="background:${item.tagColor}">${item.tag}</span>
      ${item.oldPrice ? `<span class="savings-pill">Ahorra $${item.oldPrice - item.price} MXN</span>` : ''}
      <div class="combo-img-wrap">
        <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=700&q=80'">
      </div>
      <div class="combo-content">
        <h3 class="combo-name">${item.name}</h3>
        <p class="combo-description">${item.description}</p>
        <div class="combo-footer">
          <div class="price-box">
            ${item.oldPrice ? `<span class="old-price">$${item.oldPrice} MXN</span>` : ''}
            <span class="current-price">$${item.price} <span>MXN</span></span>
          </div>
          <div class="combo-actions">
            <button class="btn-customize-link" onclick="openCustomizeModal('${item.id}')">⚙️ Personalizar</button>
            <button class="btn-card-action" onclick="quickAddToCart('${item.id}')">+ Agregar</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function renderMenu() {
  const container = document.getElementById('menuGridContainer');
  if (!container) return;

  let filtered = MENU_ITEMS;

  // Filtrado por categoría
  if (AppState.activeCategory !== 'todos') {
    filtered = filtered.filter(item => item.category === AppState.activeCategory);
  }

  // Filtrado por texto de búsqueda
  if (AppState.searchQuery.trim() !== '') {
    const q = AppState.searchQuery.toLowerCase();
    filtered = filtered.filter(item => 
      item.name.toLowerCase().includes(q) || 
      item.description.toLowerCase().includes(q)
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
        <div style="font-size: 3rem; margin-bottom: 12px;">🔍🌮</div>
        <h3 style="color:#fff; margin-bottom: 8px;">No encontramos ningún antojito con esa búsqueda</h3>
        <p>Intenta con otra palabra como "burro", "dogo", "waffle", "costra" o "combo".</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => `
    <div class="food-card">
      ${item.tag ? `<span class="card-badge" style="background:${item.tagColor || 'var(--primary)'}">${item.tag}</span>` : ''}
      <div class="food-img-wrap">
        <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=700&q=80'">
      </div>
      <div class="food-content">
        <h3 class="food-title">${item.name}</h3>
        <p class="food-desc">${item.description}</p>
        <div class="food-footer">
          <div class="food-price">
            $${item.price} <small>MXN</small>
          </div>
          <div class="food-card-btns">
            <button class="btn-detail" onclick="openCustomizeModal('${item.id}')">Personalizar</button>
            <button class="btn-quick-add" onclick="quickAddToCart('${item.id}')" title="Agregar rápido">+</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// ================= MODAL DE PERSONALIZACIÓN =================

window.openCustomizeModal = function(itemId) {
  const item = MENU_ITEMS.find(i => i.id === itemId);
  if (!item) return;

  AppState.activeModalItem = item;
  AppState.modalQty = 1;
  AppState.modalSelectedExtras = [];
  AppState.modalNotes = '';
  AppState.modalSelectedSalsa = EXTRAS_OPTIONS.salsas[0].name;
  AppState.modalSelectedDrink = item.includesDrink ? EXTRAS_OPTIONS.bebidasCombo[0].name : '';

  const modal = document.getElementById('customizeModal');
  const imgEl = document.getElementById('modalImage');
  const titleEl = document.getElementById('modalTitle');
  const descEl = document.getElementById('modalDesc');
  const dynamicSections = document.getElementById('modalDynamicSections');
  const qtyEl = document.getElementById('modalQtyDisplay');
  const notesEl = document.getElementById('modalNotes');

  imgEl.src = item.image;
  titleEl.textContent = item.name;
  descEl.textContent = item.description;
  qtyEl.textContent = '1';
  notesEl.value = '';

  let sectionsHtml = '';

  // Selector de Bebida si es Combo
  if (item.includesDrink) {
    sectionsHtml += `
      <div class="modal-section">
        <div class="modal-section-title">
          <span>🥤 Elige tu Bebida incluida</span>
          <span class="badge-opt">Obligatorio</span>
        </div>
        <div class="radio-list">
          ${EXTRAS_OPTIONS.bebidasCombo.map((d, index) => `
            <label class="choice-item">
              <div class="choice-left">
                <input type="radio" name="modalDrinkChoice" value="${d.name}" ${index === 0 ? 'checked' : ''} onchange="updateModalDrink(this.value)">
                <span>${d.name}</span>
              </div>
            </label>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Selector de Salsa (si es comida salada)
  if (item.type === 'comida') {
    sectionsHtml += `
      <div class="modal-section">
        <div class="modal-section-title">
          <span>🌶️ Elige tu Salsa / Nivel de Picante</span>
          <span class="badge-opt">Gratis</span>
        </div>
        <div class="radio-list">
          ${EXTRAS_OPTIONS.salsas.map((s, index) => `
            <label class="choice-item">
              <div class="choice-left">
                <input type="radio" name="modalSalsaChoice" value="${s.name}" ${index === 0 ? 'checked' : ''} onchange="updateModalSalsa(this.value)">
                <span>${s.name}</span>
              </div>
            </label>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Opciones de Extras con costo
  let relevantExtras = EXTRAS_OPTIONS.comida;
  if (item.type === 'postre') {
    relevantExtras = EXTRAS_OPTIONS.postre;
  } else if (item.type === 'bebida') {
    relevantExtras = EXTRAS_OPTIONS.bebida || [];
  }
  sectionsHtml += `
    <div class="modal-section">
      <div class="modal-section-title">
        <span>✨ Ingredientes Extras Monchosos</span>
        <span class="badge-opt">Opcional</span>
      </div>
      <div class="check-list">
        ${relevantExtras.map(extra => `
          <label class="choice-item">
            <div class="choice-left">
              <input type="checkbox" value="${extra.name}" data-price="${extra.price}" onchange="toggleModalExtra(this, '${extra.name}', ${extra.price})">
              <span>${extra.name}</span>
            </div>
            <span class="choice-price">+$${extra.price} MXN</span>
          </label>
        `).join('')}
      </div>
    </div>
  `;

  dynamicSections.innerHTML = sectionsHtml;
  updateModalTotalPrice();

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeCustomizeModal = function() {
  const modal = document.getElementById('customizeModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
  AppState.activeModalItem = null;
};

window.updateModalSalsa = function(val) {
  AppState.modalSelectedSalsa = val;
};

window.updateModalDrink = function(val) {
  AppState.modalSelectedDrink = val;
};

window.toggleModalExtra = function(checkbox, name, price) {
  if (checkbox.checked) {
    AppState.modalSelectedExtras.push({ name, price });
  } else {
    AppState.modalSelectedExtras = AppState.modalSelectedExtras.filter(e => e.name !== name);
  }
  updateModalTotalPrice();
};

window.changeModalQty = function(delta) {
  const newQty = AppState.modalQty + delta;
  if (newQty >= 1 && newQty <= 20) {
    AppState.modalQty = newQty;
    document.getElementById('modalQtyDisplay').textContent = newQty;
    updateModalTotalPrice();
  }
};

function updateModalTotalPrice() {
  if (!AppState.activeModalItem) return;

  const basePrice = AppState.activeModalItem.price;
  const extrasTotal = AppState.modalSelectedExtras.reduce((sum, e) => sum + e.price, 0);
  const singleItemTotal = basePrice + extrasTotal;
  const total = singleItemTotal * AppState.modalQty;

  const btnTotalEl = document.getElementById('modalBtnPrice');
  if (btnTotalEl) {
    btnTotalEl.textContent = `$${total} MXN`;
  }
}

window.submitModalAddToCart = function() {
  if (!AppState.activeModalItem) return;

  const notesInput = document.getElementById('modalNotes');
  const notes = notesInput ? notesInput.value.trim() : '';

  const extrasTotal = AppState.modalSelectedExtras.reduce((sum, e) => sum + e.price, 0);
  const unitPrice = AppState.activeModalItem.price + extrasTotal;

  const cartItem = {
    cartId: Date.now() + Math.random().toString(),
    productId: AppState.activeModalItem.id,
    name: AppState.activeModalItem.name,
    image: AppState.activeModalItem.image,
    unitPrice: unitPrice,
    basePrice: AppState.activeModalItem.price,
    quantity: AppState.modalQty,
    salsa: AppState.modalSelectedSalsa,
    drink: AppState.modalSelectedDrink,
    extras: [...AppState.modalSelectedExtras],
    notes: notes
  };

  AppState.cart.push(cartItem);
  saveCart();
  updateCartUI();
  closeCustomizeModal();
  showToast(`¡Agregado: ${cartItem.name}! 🌮`);
  openCartDrawer();
};

window.quickAddToCart = function(itemId) {
  const item = MENU_ITEMS.find(i => i.id === itemId);
  if (!item) return;

  // Si es un combo con bebida requerida, abrimos modal para que elija bebida
  if (item.includesDrink) {
    openCustomizeModal(itemId);
    return;
  }

  // Buscar si ya existe idéntico sin extras
  const existing = AppState.cart.find(ci => ci.productId === item.id && ci.extras.length === 0 && !ci.notes);
  if (existing) {
    existing.quantity += 1;
  } else {
    AppState.cart.push({
      cartId: Date.now() + Math.random().toString(),
      productId: item.id,
      name: item.name,
      image: item.image,
      unitPrice: item.price,
      basePrice: item.price,
      quantity: 1,
      salsa: item.type === 'comida' ? 'Salsa Verde Cremosa' : '',
      drink: '',
      extras: [],
      notes: ''
    });
  }

  saveCart();
  updateCartUI();
  showToast(`¡${item.name} agregado al carrito!`);
};

// ================= CONSTRUCTOR INTERACTIVO "ARMA TU ANTOJO" =================

function initBuilder() {
  // Base por defecto: Waffle
  AppState.builder.base = BUILDER_DATA.bases[0];
  AppState.builder.spread = BUILDER_DATA.spreads[0];

  renderBuilderOptions('builderBases', BUILDER_DATA.bases, 'radio', 'base', AppState.builder.base.id);
  renderBuilderOptions('builderSpreads', BUILDER_DATA.spreads, 'radio', 'spread', AppState.builder.spread.id);
  renderBuilderOptions('builderFruits', BUILDER_DATA.fruits, 'checkbox', 'fruits');
  renderBuilderOptions('builderCrunchies', BUILDER_DATA.crunchies, 'checkbox', 'crunchies');
  renderBuilderOptions('builderToppings', BUILDER_DATA.toppingsFinales, 'checkbox', 'toppingsFinales');

  updateBuilderSummary();
}

function renderBuilderOptions(containerId, list, type, categoryKey, defaultSelectedId = null) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = list.map(opt => {
    const isSelected = defaultSelectedId === opt.id;
    return `
      <div class="builder-chip ${isSelected ? 'selected' : ''}" data-id="${opt.id}" onclick="handleBuilderSelect('${categoryKey}', '${opt.id}', '${type}', this)">
        <div class="chip-top">
          <span>${opt.icon}</span>
          <span class="chip-title">${opt.name}</span>
        </div>
        <span class="chip-price">+$${opt.price} MXN</span>
      </div>
    `;
  }).join('');
}

window.handleBuilderSelect = function(categoryKey, optId, type, chipElement) {
  if (type === 'radio') {
    const pool = categoryKey === 'base' ? BUILDER_DATA.bases : BUILDER_DATA.spreads;
    const selected = pool.find(o => o.id === optId);
    AppState.builder[categoryKey] = selected;

    // Actualizar clases UI
    const siblings = chipElement.parentElement.querySelectorAll('.builder-chip');
    siblings.forEach(s => s.classList.remove('selected'));
    chipElement.classList.add('selected');
  } else {
    // Checkbox (multiselección)
    let pool;
    if (categoryKey === 'fruits') pool = BUILDER_DATA.fruits;
    else if (categoryKey === 'crunchies') pool = BUILDER_DATA.crunchies;
    else pool = BUILDER_DATA.toppingsFinales;

    const opt = pool.find(o => o.id === optId);
    const existingIndex = AppState.builder[categoryKey].findIndex(o => o.id === optId);

    if (existingIndex > -1) {
      AppState.builder[categoryKey].splice(existingIndex, 1);
      chipElement.classList.remove('selected');
    } else {
      AppState.builder[categoryKey].push(opt);
      chipElement.classList.add('selected');
    }
  }

  updateBuilderSummary();
};

function updateBuilderSummary() {
  const b = AppState.builder;
  if (!b.base) return;

  let total = b.base.price;
  let summaryParts = [b.base.name];

  if (b.spread) {
    total += b.spread.price;
    summaryParts.push(b.spread.name);
  }

  if (b.fruits.length > 0) {
    b.fruits.forEach(f => {
      total += f.price;
      summaryParts.push(f.name);
    });
  }

  if (b.crunchies.length > 0) {
    b.crunchies.forEach(c => {
      total += c.price;
      summaryParts.push(c.name);
    });
  }

  if (b.toppingsFinales.length > 0) {
    b.toppingsFinales.forEach(t => {
      total += t.price;
      summaryParts.push(t.name);
    });
  }

  const descEl = document.getElementById('builderSummaryText');
  const totalEl = document.getElementById('builderTotalPrice');

  if (descEl) descEl.textContent = summaryParts.join(' + ');
  if (totalEl) totalEl.textContent = `$${total} MXN`;
}

window.addCustomBuildToCart = function() {
  const b = AppState.builder;
  if (!b.base) return;

  let total = b.base.price + (b.spread ? b.spread.price : 0);
  const extraItems = [];

  if (b.spread) extraItems.push({ name: `Untable: ${b.spread.name}`, price: b.spread.price });
  b.fruits.forEach(f => { total += f.price; extraItems.push({ name: f.name, price: f.price }); });
  b.crunchies.forEach(c => { total += c.price; extraItems.push({ name: c.name, price: c.price }); });
  b.toppingsFinales.forEach(t => { total += t.price; extraItems.push({ name: t.name, price: t.price }); });

  const customItem = {
    cartId: 'custom-' + Date.now(),
    productId: 'custom-builder',
    name: `Creación Monchosa: ${b.base.name}`,
    image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=700&q=80',
    unitPrice: total,
    basePrice: b.base.price,
    quantity: 1,
    salsa: '',
    drink: '',
    extras: extraItems,
    notes: '¡Creación personalizada en "Arma tu Antojo"!'
  };

  AppState.cart.push(customItem);
  saveCart();
  updateCartUI();
  showToast(`¡Tu creación personalizada fue agregada! 🧇✨`);
  openCartDrawer();
};

// ================= CARRITO Y DRAWER =================

window.openCartDrawer = function() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('drawerOverlay');
  if (drawer && overlay) {
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
};

window.closeCartDrawer = function() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('drawerOverlay');
  if (drawer && overlay) {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = 'auto';
  }
};

window.setOrderType = function(type) {
  AppState.orderType = type;
  document.querySelectorAll('.type-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-type') === type);
  });
  updateCartUI();
};

window.updateCartItemQty = function(cartId, delta) {
  const item = AppState.cart.find(i => i.cartId === cartId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    AppState.cart = AppState.cart.filter(i => i.cartId !== cartId);
  }
  saveCart();
  updateCartUI();
};

window.removeCartItem = function(cartId) {
  AppState.cart = AppState.cart.filter(i => i.cartId !== cartId);
  saveCart();
  updateCartUI();
  showToast('Producto eliminado del carrito');
};

function updateCartUI() {
  const totalCount = AppState.cart.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = AppState.cart.reduce((sum, i) => sum + (i.unitPrice * i.quantity), 0);

  // Botones de cabecera y flotante
  document.querySelectorAll('.cart-counter').forEach(el => el.textContent = totalCount);
  document.querySelectorAll('.cart-quick-total').forEach(el => el.textContent = `$${subtotal} MXN`);

  // Lista de items dentro del Drawer
  const container = document.getElementById('cartItemsContainer');
  const emptyState = document.getElementById('cartEmptyState');
  const footerEl = document.getElementById('cartFooter');

  if (AppState.cart.length === 0) {
    if (emptyState) emptyState.style.display = 'flex';
    if (container) container.innerHTML = '';
    if (footerEl) footerEl.style.display = 'none';
  } else {
    if (emptyState) emptyState.style.display = 'none';
    if (footerEl) footerEl.style.display = 'flex';

    if (container) {
      container.innerHTML = AppState.cart.map(item => {
        let details = [];
        if (item.salsa) details.push(`🌶️ ${item.salsa}`);
        if (item.drink) details.push(`🥤 ${item.drink}`);
        if (item.extras && item.extras.length > 0) {
          details.push(`✨ ${item.extras.map(e => e.name).join(', ')}`);
        }
        if (item.notes) details.push(`📝 "${item.notes}"`);

        return `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=700&q=80'">
            <div class="cart-item-info">
              <h4 class="cart-item-title">${item.name}</h4>
              ${details.length > 0 ? `<div class="cart-item-customs">${details.join('<br>')}</div>` : ''}
              <div class="cart-item-price">$${item.unitPrice * item.quantity} MXN</div>
              <div class="cart-item-controls">
                <div class="qty-control" style="transform: scale(0.85); transform-origin: left center;">
                  <button class="qty-btn" onclick="updateCartItemQty('${item.cartId}', -1)">-</button>
                  <span class="qty-value">${item.quantity}</span>
                  <button class="qty-btn" onclick="updateCartItemQty('${item.cartId}', 1)">+</button>
                </div>
                <button class="btn-cart-remove" onclick="removeCartItem('${item.cartId}')">Eliminar</button>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  // Barra de progreso para Envío Gratis
  const isDelivery = AppState.orderType === 'delivery';
  const progressText = document.getElementById('deliveryProgressText');
  const progressBar = document.getElementById('deliveryProgressBar');
  const shippingCostEl = document.getElementById('cartShippingCost');
  const subtotalEl = document.getElementById('cartSubtotal');
  const totalEl = document.getElementById('cartTotal');

  let shippingFee = 0;
  if (isDelivery) {
    if (subtotal >= AppState.freeDeliveryThreshold || subtotal === 0) {
      shippingFee = 0;
      if (progressText) progressText.innerHTML = subtotal === 0 ? 'Agrega productos a tu carrito' : '¡Felicidades! 🎉 Tienes <strong>ENVÍO GRATIS</strong>';
      if (progressBar) progressBar.style.width = subtotal === 0 ? '0%' : '100%';
    } else {
      shippingFee = AppState.deliveryFee;
      const missing = AppState.freeDeliveryThreshold - subtotal;
      const pct = Math.min(100, Math.round((subtotal / AppState.freeDeliveryThreshold) * 100));
      if (progressText) progressText.innerHTML = `Faltan <strong>$${missing} MXN</strong> para ¡ENVÍO GRATIS! 🛵`;
      if (progressBar) progressBar.style.width = `${pct}%`;
    }
  } else {
    shippingFee = 0;
    if (progressText) progressText.innerHTML = '🛍️ Recogiendo en sucursal (Sin costo de envío)';
    if (progressBar) progressBar.style.width = '100%';
  }

  const finalTotal = subtotal + shippingFee;

  if (subtotalEl) subtotalEl.textContent = `$${subtotal} MXN`;
  if (shippingCostEl) shippingCostEl.textContent = shippingFee === 0 ? 'GRATIS' : `$${shippingFee} MXN`;
  if (totalEl) totalEl.textContent = `$${finalTotal} MXN`;
}

// ================= CHECKOUT MODAL Y PEDIDO POR WHATSAPP =================

window.openCheckoutModal = function() {
  if (AppState.cart.length === 0) {
    showToast('Tu carrito está vacío. ¡Elige tus antojitos favoritos!');
    return;
  }

  const modal = document.getElementById('checkoutModal');
  const addressGroup = document.getElementById('checkoutAddressGroup');
  
  if (AppState.orderType === 'pickup') {
    if (addressGroup) addressGroup.style.display = 'none';
  } else {
    if (addressGroup) addressGroup.style.display = 'flex';
  }

  modal.classList.add('active');
};

window.closeCheckoutModal = function() {
  const modal = document.getElementById('checkoutModal');
  modal.classList.remove('active');
};

window.selectPaymentMethod = function(method, cardElement) {
  document.querySelectorAll('.pay-card').forEach(c => c.classList.remove('selected'));
  cardElement.classList.add('selected');
  cardElement.querySelector('input').checked = true;

  const cashDetail = document.getElementById('cashChangeGroup');
  if (cashDetail) {
    cashDetail.style.display = method === 'efectivo' ? 'flex' : 'none';
  }
};

window.submitOrderToWhatsApp = function(event) {
  event.preventDefault();

  const name = document.getElementById('clientName').value.trim();
  const phone = document.getElementById('clientPhone').value.trim();
  const address = document.getElementById('clientAddress') ? document.getElementById('clientAddress').value.trim() : '';
  const notes = document.getElementById('orderSpecialNotes').value.trim();
  const paymentMethodInput = document.querySelector('input[name="payMethod"]:checked');
  const paymentMethod = paymentMethodInput ? paymentMethodInput.value : 'Efectivo';
  const cashBill = document.getElementById('cashBillAmount') ? document.getElementById('cashBillAmount').value.trim() : '';

  if (!name || !phone) {
    alert('Por favor escribe tu Nombre y Teléfono.');
    return;
  }

  if (AppState.orderType === 'delivery' && !address) {
    alert('Por favor ingresa tu Dirección de Entrega completa.');
    return;
  }

  const subtotal = AppState.cart.reduce((sum, i) => sum + (i.unitPrice * i.quantity), 0);
  const isDelivery = AppState.orderType === 'delivery';
  const shippingFee = (isDelivery && subtotal < AppState.freeDeliveryThreshold) ? AppState.deliveryFee : 0;
  const total = subtotal + shippingFee;

  // Armar texto con formato impecable para WhatsApp
  let msg = `🌮 *NUEVO PEDIDO - LA MONCHERÍA MX* 🌮\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `👤 *Cliente:* ${name}\n`;
  msg += `📞 *Teléfono:* ${phone}\n`;
  msg += `📍 *Tipo:* ${isDelivery ? '🛵 Entrega a Domicilio' : '🛍️ Recoger en Sucursal'}\n`;
  if (isDelivery) {
    msg += `🏠 *Dirección:* ${address}\n`;
  }
  msg += `💳 *Método de Pago:* ${paymentMethod.toUpperCase()}\n`;
  if (paymentMethod === 'Efectivo' && cashBill) {
    msg += `💵 *Paga con billete de:* $${cashBill} MXN\n`;
  }
  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `🛒 *DETALLE DEL PEDIDO:*\n\n`;

  AppState.cart.forEach((item, idx) => {
    msg += `*${idx + 1}. ${item.quantity}x ${item.name}* - $${item.unitPrice * item.quantity} MXN\n`;
    if (item.salsa) msg += `   ▫️ Salsa: ${item.salsa}\n`;
    if (item.drink) msg += `   ▫️ Bebida: ${item.drink}\n`;
    if (item.extras && item.extras.length > 0) {
      msg += `   ▫️ Extras: ${item.extras.map(e => e.name).join(', ')}\n`;
    }
    if (item.notes) msg += `   ▫️ Nota: "${item.notes}"\n`;
    msg += `\n`;
  });

  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `🧾 *Subtotal:* $${subtotal} MXN\n`;
  msg += `🛵 *Envío:* ${shippingFee === 0 ? 'GRATIS' : `$${shippingFee} MXN`}\n`;
  msg += `💰 *TOTAL A PAGAR:* $${total} MXN\n`;
  if (notes) {
    msg += `\n💬 *Instrucciones adicionales:* ${notes}\n`;
  }
  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `¡Muchas gracias por su preferencia! Quedo al pendiente de su confirmación y tiempo estimado. 🙌🔥`;

  const encodedMsg = encodeURIComponent(msg);
  const whatsappUrl = `https://wa.me/${AppState.storePhone}?text=${encodedMsg}`;

  // Limpiar carrito tras ordenar con éxito
  AppState.cart = [];
  saveCart();
  updateCartUI();
  closeCheckoutModal();
  closeCartDrawer();

  // Abrir WhatsApp
  window.open(whatsappUrl, '_blank');
};

// ================= TOAST NOTIFICATION =================

function showToast(message) {
  const toast = document.getElementById('appToast');
  const textEl = document.getElementById('toastText');
  if (!toast || !textEl) return;

  textEl.textContent = message;
  toast.classList.add('show');

  clearTimeout(toast.timeoutId);
  toast.timeoutId = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

// ================= DETECCIÓN DE HORARIO Y EVENTOS =================

function checkStoreHours() {
  const statusEl = document.getElementById('storeStatusBadge');
  if (!statusEl) return;

  const now = new Date();
  const hour = now.getHours();

  // Horario nocturno de antojos: 17:00 a 01:00 hrs
  const isOpen = (hour >= 17 || hour < 2);

  if (isOpen) {
    statusEl.innerHTML = `<span class="live-pulse"></span> 🟢 Abierto Ahora (5 PM - 1 AM)`;
    statusEl.style.borderColor = 'rgba(16, 185, 129, 0.4)';
    statusEl.style.color = '#34d399';
  } else {
    statusEl.innerHTML = `🟡 Abrimos hoy a las 5:00 PM (Aceptando pedidos previos)`;
    statusEl.style.borderColor = 'rgba(255, 179, 0, 0.4)';
    statusEl.style.color = '#ffb300';
  }
}

function setupEventListeners() {
  const searchInput = document.getElementById('menuSearch');
  const clearBtn = document.getElementById('clearSearchBtn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      AppState.searchQuery = e.target.value;
      if (clearBtn) clearBtn.style.display = e.target.value ? 'block' : 'none';
      renderMenu();
    });
  }

  if (clearBtn && searchInput) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      AppState.searchQuery = '';
      clearBtn.style.display = 'none';
      renderMenu();
    });
  }
}
