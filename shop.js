const scriptURL = 'https://script.google.com/macros/s/AKfycbwU7h8NU3HfUlh9OslX-XFSOjtzMb05_BVhq8lTZI6ygSTg1uoIY-Blh6s-mVDW81hB/exec';
const form = document.forms['contact-form'];

let productDivs = [];
let comboDivs = [];
let stockMap = {};
let priceMap = {};

/* ======================
   組合設定
====================== */
const cart = {};
const products = [
  { id: "sock", name: "刺繡中筒襪" },
  { id: "cup", name: "杯套" },
  { id: "hook", name: "壓克力登山扣" },
  { id: "poster", name: "典藏款燙銀海報" },
  { id: "card", name: "可伸縮卡套" }
];

const combos = [
  {
    id: "comboA",
    name: "在那出現之後(襪子+登山扣+杯套+卡套)",
    price: 550,
    items: [
      { id: "sock", qty: 1 },
      { id: "cup", qty: 1 },
      { id: "hook", qty: 1 },
      { id: "card", qty: 1 }
    ]
  },
  {
    id: "comboB",
    name: "逛街之前(杯套+卡套)",
    price: 270,
    items: [
      { id: "cup", qty: 1 },
      { id: "card", qty: 1 }
    ]
  },
  {
    id: "comboD",
    name: "登山露營之前(襪子+登山扣)",
    price: 290,
    items: [
      { id: "sock", qty: 1 },
      { id: "hook", qty: 1 }
    ]
  }

];
function updateOrder() {
  let displayList = [];
  let codeList = [];
  let total = 0;

  for (let id in cart) {
    const qty = cart[id];
    if (qty <= 0) continue;

    const product = products.find(p => p.id === id);
    const combo = combos.find(c => c.id === id);

    if (product) {
      displayList.push(`${product.name} x${qty}`);
      codeList.push(`${product.id} x${qty}`);
      total += product.price * qty;
    }

    if (combo) {
      displayList.push(`${combo.name} x${qty}`);
      codeList.push(`${combo.id} x${qty}`);
      total += combo.price * qty;
    }
  }

  document.getElementById("product").value = displayList.join(", ");
  document.getElementById("productCode").value = codeList.join(", ");
  document.getElementById("total").value = total;
  document.getElementById("totalDisplay").innerText = `$${total}`;
}
/* ======================
   共用工具函式
====================== */
function getStockLabel(stock, initial = stock) {
  if (stock <= 0) return "無庫存";
  const ratio = initial > 0 ? stock / initial : 0;
  if (ratio > 0.5) return "庫存充足";
  return "庫存少量";
}

function setFee(value) {
  document.getElementById('fee').value = value;
  document.getElementById('feeDisplay').textContent = `$${value}`;
}

function showError(msg) {
  alert(msg);
  const submitBtn = document.getElementById('submit-button');
  const loadingIndicator = document.getElementById('loading-indicator');
  submitBtn.disabled = false;
  submitBtn.textContent = 'Submit';
  loadingIndicator.style.display = 'none';
}

function getComboStock(combo) {
  let max = Infinity;

  combo.items.forEach(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) {
      max = 0;
      return;
    }

    const remain = Number(stockMap[product.name] || 0);
    const possible = Math.floor(remain / item.qty);
    max = Math.min(max, possible);
  });

  return max === Infinity ? 0 : max;
}

/* ======================
   計算購物車
====================== */
/*function updateTotalAndProduct() {
  let total = 0;

  const displayDetails = [];
  const expandedMap = {};

  // 單品
  productDivs.forEach(product => {
    const name = product.dataset.name;
    const price = parseInt(product.dataset.price, 10);
    const count = parseInt(product.querySelector('.count').textContent, 10) || 0;

    if (count > 0) {
      total += price * count;
      displayDetails.push(`${name} x${count}`);

      if (!expandedMap[name]) expandedMap[name] = 0;
      expandedMap[name] += count;
    }
  });

  // 組合
  comboDivs.forEach(comboDiv => {
    const comboName = comboDiv.dataset.name;
    const comboPrice = parseInt(comboDiv.dataset.price, 10);
    const count = parseInt(comboDiv.querySelector('.count').textContent, 10) || 0;

    if (count > 0) {
      total += comboPrice * count;
      displayDetails.push(`${comboName} x${count}`);

      const combo = combos.find(c => c.name === comboName);
      if (combo) {
        combo.items.forEach(item => {
          if (!expandedMap[item.name]) expandedMap[item.name] = 0;
          expandedMap[item.name] += item.qty * count;
        });
      }
    }
  });

  const expandedDetails = Object.entries(expandedMap).map(([name, qty]) => `${name} x${qty}`);

  document.getElementById('total').value = total;
  document.getElementById('product').value = expandedDetails.join(', ');
  document.getElementById('productDisplayField').value = displayDetails.join(', ');
  document.getElementById('totalDisplay').textContent = `$${total}`;

  const cartDisplay = document.getElementById('cartDisplay');
  cartDisplay.textContent = displayDetails.length > 0 ? displayDetails.join('，') : '尚未選購商品';
}*/
function cartHasPoster() {
  const posterProduct = Array.from(productDivs).find(
    product => product.dataset.code === 'poster'
  );

  if (!posterProduct) return false;

  const count = parseInt(posterProduct.querySelector('.count').textContent, 10) || 0;
  return count > 0;
}
function updateDeliveryOptions() {
  const select = document.getElementById('targetSheet');
  const hint = document.getElementById('deliveryHint');
  if (!select) return;

  const option711 = Array.from(select.options).find(opt => opt.value === '711店取');
  if (!option711) return;

  const hasPoster = cartHasPoster();

  if (hasPoster) {
    option711.disabled = true;
    option711.textContent = '711賣貨便（海報不可選）';

    if (hint) hint.style.display = 'block';

    // 如果使用者原本已經選了 711，強制切回可用選項
    if (select.value === '711店取') {
      select.value = '匯款自取';
    }
  } else {
    option711.disabled = false;
    option711.textContent = '711賣貨便';

    if (hint) hint.style.display = 'none';
  }
}
function updateTotalAndProduct() {
  let total = 0;
  const displayDetails = [];
  const codeDetails = [];

  // 單品
  productDivs.forEach(product => {
    const name = product.dataset.name;
    const code = product.dataset.code;
    const price = parseInt(product.dataset.price, 10) || 0;
    const count = parseInt(product.querySelector('.count').textContent, 10) || 0;

    if (count > 0) {
      total += price * count;
      displayDetails.push(`${name} x${count}`);
      codeDetails.push(`${code} x${count}`);
    }
  });

  // 組合
  comboDivs.forEach(comboDiv => {
    const comboName = comboDiv.dataset.name;
    const comboCode = comboDiv.dataset.code;
    const comboPrice = parseInt(comboDiv.dataset.price, 10) || 0;
    const count = parseInt(comboDiv.querySelector('.count').textContent, 10) || 0;

    if (count > 0) {
      total += comboPrice * count;
      displayDetails.push(`${comboName} x${count}`);
      codeDetails.push(`${comboCode} x${count}`);
    }
  });

  document.getElementById('total').value = total;
  document.getElementById('product').value = displayDetails.join(', ');
  document.getElementById('productCode').value = codeDetails.join(', ');
  document.getElementById('totalDisplay').textContent = `$${total}`;

  const cartDisplay = document.getElementById('cartDisplay');

  if (cartDisplay) {
    cartDisplay.innerHTML = displayDetails.length > 0
      ? displayDetails.join('<br>')
      : '尚未選購商品';
  }
}
/* ======================
   單品按鈕
====================== */
/*function bindProductButtons() {
  productDivs.forEach(product => {
    const plus = product.querySelector('.plus');
    const minus = product.querySelector('.minus');
    const count = product.querySelector('.count');

    plus.onclick = () => {
      const stock = parseInt(product.dataset.stock || '0', 10);
      let current = parseInt(count.textContent, 10) || 0;

      if (current < stock && !plus.disabled) {
        count.textContent = current + 1;
        updateTotalAndProduct();
        refreshComboStocks();
      }
    };

    minus.onclick = () => {
      let current = parseInt(count.textContent, 10) || 0;

      if (current > 0 && !minus.disabled) {
        count.textContent = current - 1;
        updateTotalAndProduct();
        refreshComboStocks();
      }
    };
  });
}*/
function bindProductButtons() {
  productDivs.forEach(product => {
    const plus = product.querySelector('.plus');
    const minus = product.querySelector('.minus');
    const count = product.querySelector('.count');

    plus.onclick = () => {
  if (plus.disabled) return;
  let current = parseInt(count.textContent, 10) || 0;
  count.textContent = current + 1;
  updateTotalAndProduct();
  updateDeliveryOptions();
  updateFieldVisibility();
  refreshAllStocks();
};

minus.onclick = () => {
  if (minus.disabled) return;
  let current = parseInt(count.textContent, 10) || 0;
  if (current > 0) {
    count.textContent = current - 1;
    updateTotalAndProduct();
    updateDeliveryOptions();
    updateFieldVisibility();
    refreshAllStocks();
  }
};
  });
}
/* ======================
   組合按鈕
====================== */
/*function bindComboButtons() {
  comboDivs.forEach(comboDiv => {
    const plus = comboDiv.querySelector('.plus');
    const minus = comboDiv.querySelector('.minus');
    const count = comboDiv.querySelector('.count');

    plus.onclick = () => {
      const stock = parseInt(comboDiv.dataset.stock || '0', 10);
      let current = parseInt(count.textContent, 10) || 0;

      if (current < stock && !plus.disabled) {
        count.textContent = current + 1;
        updateTotalAndProduct();
      }
    };

    minus.onclick = () => {
      let current = parseInt(count.textContent, 10) || 0;

      if (current > 0 && !minus.disabled) {
        count.textContent = current - 1;
        updateTotalAndProduct();
      }
    };
  });
}*/
function bindComboButtons() {
  comboDivs.forEach(comboDiv => {
    const plus = comboDiv.querySelector('.plus');
    const minus = comboDiv.querySelector('.minus');
    const count = comboDiv.querySelector('.count');

    plus.onclick = () => {
  if (plus.disabled) return;
  let current = parseInt(count.textContent, 10) || 0;
  count.textContent = current + 1;
  updateTotalAndProduct();
  updateDeliveryOptions();
  updateFieldVisibility();
  refreshAllStocks();
};

minus.onclick = () => {
  if (minus.disabled) return;
  let current = parseInt(count.textContent, 10) || 0;
  if (current > 0) {
    count.textContent = current - 1;
    updateTotalAndProduct();
    updateDeliveryOptions();
    updateFieldVisibility();
    refreshAllStocks();
  }
};
  });
}
/* ======================
   重新計算組合庫存
====================== */
/*function refreshComboStocks() {
  comboDivs.forEach(comboDiv => {
    const combo = combos.find(c => c.name === comboDiv.dataset.name);
    if (!combo) return;

    const plus = comboDiv.querySelector('.plus');
    const minus = comboDiv.querySelector('.minus');
    const countEl = comboDiv.querySelector('.count');
    const stockInfo = comboDiv.querySelector('.stock-info');

    const comboCount = parseInt(countEl.textContent, 10) || 0;

    let remain = Infinity;
    combo.items.forEach(item => {
      const singleDiv = Array.from(productDivs).find(p => p.dataset.name === item.name);
      const singleSelected = singleDiv ? parseInt(singleDiv.querySelector('.count').textContent, 10) || 0 : 0;
      const singleRemain = Number(stockMap[item.name] || 0) - singleSelected;
      const possible = Math.floor(singleRemain / item.qty);
      remain = Math.min(remain, possible);
    });

    remain = remain === Infinity ? 0 : Math.max(0, remain);
    comboDiv.dataset.stock = remain;

    stockInfo.textContent = `（${getStockLabel(remain, remain || 1)}）`;

    plus.disabled = remain <= comboCount;
    minus.disabled = comboCount <= 0;
  });
}*/
function getUsedStockMap() {
  const used = {};

  products.forEach(p => {
    used[p.name] = 0;
  });

  // 單品占用
  productDivs.forEach(product => {
    const name = product.dataset.name;
    const count = parseInt(product.querySelector('.count').textContent, 10) || 0;
    used[name] = (used[name] || 0) + count;
  });

  // 組合占用
  comboDivs.forEach(comboDiv => {
    const comboId = comboDiv.dataset.code;
    const comboCount = parseInt(comboDiv.querySelector('.count').textContent, 10) || 0;
    if (comboCount <= 0) return;

    const combo = combos.find(c => c.id === comboId);
    if (!combo) return;

    combo.items.forEach(item => {
      const product = products.find(p => p.id === item.id);
      if (!product) return;

      used[product.name] = (used[product.name] || 0) + item.qty * comboCount;
    });
  });

  return used;
} function refreshProductStocks() {
  const usedMap = getUsedStockMap();
  const method = document.getElementById('targetSheet').value;

  productDivs.forEach(product => {
    const name = product.dataset.name;
    const only = product.dataset.only;
    const plus = product.querySelector('.plus');
    const minus = product.querySelector('.minus');
    const countEl = product.querySelector('.count');
    const stockInfo = product.querySelector('.stock-info');

    const currentCount = parseInt(countEl.textContent, 10) || 0;
    const totalStock = Number(stockMap[name] || 0);
    const initialStock = Number(product.dataset.initial || totalStock);
    const usedTotal = Number(usedMap[name] || 0);

    const remainForThisProduct = totalStock - (usedTotal - currentCount);

    stockInfo.textContent = `（${getStockLabel(remainForThisProduct, initialStock)}）`;

    // ⭐ 先判斷取貨方式限制
    if (only && !only.split(',').includes(method)) {
      plus.disabled = true;
      minus.disabled = true;
      countEl.textContent = '0';
      stockInfo.textContent = '（僅供自取）';
      return;
    }

    // ⭐ 再判斷庫存
    plus.disabled = currentCount >= remainForThisProduct;
    minus.disabled = currentCount <= 0;
  });
}
function refreshComboStocks() {
  const usedMap = getUsedStockMap();
  const method = document.getElementById('targetSheet').value;

  comboDivs.forEach(comboDiv => {
    const comboId = comboDiv.dataset.code;
    const combo = combos.find(c => c.id === comboId);
    if (!combo) return;

    const only = comboDiv.dataset.only;
    const plus = comboDiv.querySelector('.plus');
    const minus = comboDiv.querySelector('.minus');
    const countEl = comboDiv.querySelector('.count');
    const stockInfo = comboDiv.querySelector('.stock-info');

    const comboCount = parseInt(countEl.textContent, 10) || 0;

    // ⭐ 先判斷取貨方式限制
    if (only && !only.split(',').includes(method)) {
      plus.disabled = true;
      minus.disabled = true;
      countEl.textContent = '0';
      stockInfo.textContent = '（僅供自取）';
      return;
    }

    let remain = Infinity;

    combo.items.forEach(item => {
      const product = products.find(p => p.id === item.id);
      if (!product) return;

      const productName = product.name;
      const totalStock = Number(stockMap[productName] || 0);
      const usedTotal = Number(usedMap[productName] || 0);

      const alreadyUsedByThisCombo = item.qty * comboCount;
      const availableForCombo = totalStock - (usedTotal - alreadyUsedByThisCombo);

      const possible = Math.floor(availableForCombo / item.qty);
      remain = Math.min(remain, possible);
    });

    remain = remain === Infinity ? 0 : Math.max(0, remain);

    stockInfo.textContent = `（${getStockLabel(remain, remain || 1)}）`;

    plus.disabled = comboCount >= remain;
    minus.disabled = comboCount <= 0;
  });
}
function refreshAllStocks() {
  refreshProductStocks();
  refreshComboStocks();
}
/* ======================
   限制條件
====================== */
function updateRestrictions() {
  const method = document.getElementById('targetSheet').value;

  productDivs.forEach(product => {
    const only = product.dataset.only;
    const plus = product.querySelector('.plus');
    const minus = product.querySelector('.minus');
    const count = product.querySelector('.count');
    const stock = parseInt(product.dataset.stock || '0', 10);

    if (only && !only.split(',').includes(method)) {
      plus.disabled = true;
      minus.disabled = true;
      count.textContent = '0';
    } else {
      plus.disabled = stock <= parseInt(count.textContent, 10);
      minus.disabled = parseInt(count.textContent, 10) <= 0;
    }
  });

  comboDivs.forEach(comboDiv => {
    const plus = comboDiv.querySelector('.plus');
    const minus = comboDiv.querySelector('.minus');

    const combo = combos.find(c => c.id === comboDiv.dataset.code);

    // 限定取貨方式才用
    // const only = combo.only;

    // if (only && only !== method) {
    //   plus.disabled = true;
    //   minus.disabled = true;
    // } else {
    //   plus.disabled = false;
    //   minus.disabled = false;
    // }
  });

  updateTotalAndProduct();
  refreshAllStocks();
}

/* ======================
   載入商品
====================== */
/*function loadProducts() {
  const loadingText = document.getElementById('loadingProducts');
  const productList = document.getElementById('product-list');
  const comboList = document.getElementById('combo-list');

  productList.style.display = 'none';
  comboList.style.display = 'none';
  loadingText.style.display = 'block';

  fetch(scriptURL)
    .then(res => res.json())
    .then(data => {
      productList.innerHTML = '';
      comboList.innerHTML = '';

      stockMap = {};
      priceMap = {};

      data.forEach(item => {
        stockMap[item.name] = Number(item.stock || 0);
        priceMap[item.name] = Number(item.price || 0);

        const div = document.createElement('div');
        div.className = 'product';
        const productInfo = products.find(p => p.name === item.name);

div.dataset.name = item.name;
div.dataset.code = productInfo ? productInfo.id : item.name;
div.dataset.price = item.price;
div.dataset.stock = item.stock;
div.dataset.initial = item.initial;
        div.innerHTML = `
          <span>${item.name} $${item.price}</span>
          <button type="button" class="minus">-</button>
          <span class="count">0</span>
          <button type="button" class="plus">+</button>
          <span class="stock-info">（${getStockLabel(item.stock, item.initial)}）</span>
        `;

        productList.appendChild(div);
      });

      combos.forEach(combo => {
  const comboStock = getComboStock(combo);

  const div = document.createElement('div');
  div.className = 'combo-product';
  div.dataset.name = combo.name;
  div.dataset.code = combo.id;
  div.dataset.price = combo.price;
  div.dataset.stock = comboStock;

  const comboDesc = combo.items.map(item => {
    const product = products.find(p => p.id === item.id);
    return `${product ? product.name : item.id} x${item.qty}`;
  }).join(' + ');

  div.innerHTML = `
    <span>${combo.name} $${combo.price}</span>
    <button type="button" class="minus">-</button>
    <span class="count">0</span>
    <button type="button" class="plus">+</button>
    <span class="stock-info">（${getStockLabel(comboStock, comboStock || 1)}）</span>
    <div style="font-size:12px; color:#ccc; margin-top:4px;">內含：${comboDesc}</div>
  `;

  comboList.appendChild(div);
});
      productDivs = document.querySelectorAll('.product');
      comboDivs = document.querySelectorAll('.combo-product');

      bindProductButtons();
bindComboButtons();
updateRestrictions();
updateTotalAndProduct();
refreshAllStocks();

      loadingText.style.display = 'none';
      productList.style.display = 'block';
      comboList.style.display = 'block';
    })
    .catch(err => {
      console.error("載入商品失敗：", err);
      loadingText.textContent = "❌ 商品載入失敗，請重新整理";
    });
}*/
function loadProducts() {
  const loadingText = document.getElementById('loadingProducts');
  const productList = document.getElementById('product-list');
  const comboList = document.getElementById('combo-list');

  loadingText.style.display = 'block';

  fetch(scriptURL)
    .then(res => res.json())
    .then(data => {
      stockMap = {};
      priceMap = {};

      // 建立試算表商品資料 map
      data.forEach(item => {
        stockMap[item.name] = Number(item.stock || 0);
        priceMap[item.name] = Number(item.price || 0);
      });

      // 直接抓 HTML 現有單品卡片
      productDivs = document.querySelectorAll('#product-list .product');

      productDivs.forEach(div => {
        const name = div.dataset.name;
        const code = div.dataset.code;
        const item = data.find(d => d.name === name);

        if (!item) {
          div.querySelector('.product-price').textContent = '暫無資料';
          div.querySelector('.stock-info').textContent = '（無庫存資料）';
          return;
        }

        div.dataset.price = item.price;
        div.dataset.stock = item.stock;
        div.dataset.initial = item.initial;
        div.dataset.code = code;

        div.querySelector('.product-price').textContent = `$${item.price}`;
        div.querySelector('.stock-info').textContent =
          `（${getStockLabel(item.stock, item.initial)}）`;
        div.querySelector('.stock-info').classList.remove('is-loading');
        div.querySelector('.product-qty').classList.remove('is-loading');
      });

      // 直接抓 HTML 現有組合卡片
      comboDivs = document.querySelectorAll('#combo-list .combo-product');

      comboDivs.forEach(div => {
        const comboId = div.dataset.code;
        const combo = combos.find(c => c.id === comboId);
        if (!combo) return;

        const comboStock = getComboStock(combo);

        div.dataset.price = combo.price;
        div.dataset.stock = comboStock;

        div.querySelector('.product-price').textContent = `$${combo.price}`;
        div.querySelector('.stock-info').textContent =
          `（${getStockLabel(comboStock, comboStock || 1)}）`;
        div.querySelector('.stock-info').classList.remove('is-loading');
        div.querySelector('.product-qty').classList.remove('is-loading');
      });

      bindProductButtons();
bindComboButtons();
updateRestrictions();
updateTotalAndProduct();
updateDeliveryOptions();
updateFieldVisibility();
refreshAllStocks();

      loadingText.style.display = 'none';
    })
    .catch(err => {
      console.error("載入商品失敗：", err);
      loadingText.textContent = "❌ 商品載入失敗，請重新整理";
    });
}
/* ======================
   初始化
====================== */
function updateFieldVisibility() {
  const select = document.getElementById('targetSheet');
  const storeCodeField = document.getElementById('storeCodeField');
  const bankCodeField = document.getElementById('bankCodeField');
  const transferNote = document.getElementById('transferNote');
  const pickupNote = document.getElementById('pickupNote');

  if (!select || !storeCodeField || !bankCodeField) return;

  const method = select.value;

  if (method === '711店取') {
    storeCodeField.style.display = 'block';
    bankCodeField.style.display = 'none';
    setFee(38);

    if (transferNote) transferNote.style.display = 'none';
    if (pickupNote) pickupNote.style.display = 'none';

  } else if (method === '匯款自取') {
    storeCodeField.style.display = 'none';
    bankCodeField.style.display = 'block';
    setFee(0);

    if (transferNote) transferNote.style.display = 'block';
    if (pickupNote) pickupNote.style.display = 'none';

  } else {
    storeCodeField.style.display = 'none';
    bankCodeField.style.display = 'none';
    setFee(0);

    if (transferNote) transferNote.style.display = 'none';
    if (pickupNote) pickupNote.style.display = 'block';
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('targetSheet');
  const storeCodeField = document.getElementById('storeCodeField');
  const storeCodeInput = storeCodeField.querySelector('input');

  const storeSearchBtn = document.querySelector('.store-search-btn');
  const storeCodeInput2 = document.getElementById('storeCode');

  if (storeSearchBtn && storeCodeInput) {
    storeSearchBtn.addEventListener('click', () => {
      setTimeout(() => {
        storeCodeInput2.focus();
      }, 500);
    });
  }

  loadProducts();

  select.addEventListener('change', () => {
    updateDeliveryOptions();
    updateFieldVisibility();
    updateRestrictions();
  });

  updateDeliveryOptions();
  updateFieldVisibility();
});

/* ======================
   表單送出
====================== */
form.addEventListener('submit', e => {
  e.preventDefault();

  const submitBtn = document.getElementById('submit-button');
  const loadingIndicator = document.getElementById('loading-indicator');
  submitBtn.disabled = true;
  submitBtn.textContent = '送出中...';

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const storeCode = document.getElementById('storeCode').value.trim();
  const bankCode = document.getElementById('bankCode').value.trim();
  const gmail = document.getElementById('gmail').value.trim();
  const targetSheet = document.getElementById('targetSheet').value;
  const total = parseInt(document.getElementById('total').value || "0", 10);

  const nameIsValid = /^[\u4e00-\u9fa5a-zA-Z0-9]{1,10}$/.test(name);
  const phoneIsValid = /^09\d{8}$/.test(phone);
  const storeCodeIsValid = targetSheet === '711店取' ? /^\d{6}$/.test(storeCode) : true;
  const bankCodeIsValid = targetSheet === '匯款自取' ? /^\d{5}$/.test(bankCode) : true;
  const gmailIsValid = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(gmail);

  if (!nameIsValid) return showError("❗ 取件人姓名最多 10 字，請勿包含特殊符號");
  if (!phoneIsValid) return showError("❗ 請輸入正確的手機號碼（例如 0912345678）");
  if (!storeCodeIsValid) return showError("❗ 請輸入 6 碼門市編號");
  if (!bankCodeIsValid) return showError("❗ 請輸入 5 碼匯款帳號後五碼");
  if (!gmailIsValid) return showError("❗ 請輸入有效 Gmail（例如 abc@gmail.com）");
  if (total <= 0) return showError("❗ 請至少選購一樣商品");

  let hasSubmitted = false;

  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
  .then(res => {
    if (!res.ok) throw new Error('Network error');
    return res.json();
  })
  .then(data => {
    if (hasSubmitted) return;

    if (data.result !== 'success') {
      if (data.errorType === 'OUT_OF_STOCK' && data.errorData) {
        const itemName = data.errorData.name || '商品';
        const remain = Number(data.errorData.remain || 0);
        throw new Error(`❌ ${itemName} 庫存不足，目前剩餘 ${remain} 件`);
      }

      throw new Error('❌ 訂單未成立，請重新確認商品庫存');
    }

    hasSubmitted = true;

    const selectedMethod = document.getElementById('targetSheet').value;

    alert('✅ 訂單已送出，請確認您的gmail信箱!');
    form.reset();

    productDivs.forEach(product => {
      product.querySelector('.count').textContent = '0';
    });

    comboDivs.forEach(combo => {
      combo.querySelector('.count').textContent = '0';
    });

    updateTotalAndProduct();
    refreshAllStocks();
    loadProducts();

    const select = document.getElementById('targetSheet');
    select.value = selectedMethod;

    updateFieldVisibility();
    updateRestrictions();
    setFee(select.value === '711店取' ? 38 : 0);
    updateTotalAndProduct();
    updateDeliveryOptions();
  })
  .catch(err => {
    console.error(err);
    alert(err.message || '❌ 無法送出訂單，請稍後再試');
    loadProducts();
  })
  .finally(() => {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit';
    loadingIndicator.style.display = 'none';
  });
/* ======================
   浮動購物車按鈕
====================== */
const floatingCartBtn = document.getElementById("floating-cart-btn");
const cartPanel = document.querySelector(".cart-panel");
const shopPage = document.getElementById("shop-page");

function isMobileOrTablet() {
  return window.innerWidth <= 1024;
}

function updateFloatingCartBtn() {
  if (!floatingCartBtn || !cartPanel || !shopPage) return;

  // 桌機不顯示
  if (!isMobileOrTablet()) {
    floatingCartBtn.style.display = "none";
    floatingCartBtn.classList.remove("is-docked");
    floatingCartBtn.style.top = "";
    return;
  }

  floatingCartBtn.style.display = "inline-flex";

  const cartRect = cartPanel.getBoundingClientRect();
  const shopRect = shopPage.getBoundingClientRect();


  const fixedBottom = 20;
  const btnHeight = floatingCartBtn.offsetHeight || 48;
  const viewportHeight = window.innerHeight;


  const fixedTopInViewport = viewportHeight - fixedBottom - btnHeight;


  if (cartRect.top <= fixedTopInViewport + btnHeight + 12) {
    floatingCartBtn.classList.add("is-docked");

    // 計算成 shopPage 內的 absolute top
    const topInsideShop =
      window.scrollY + cartRect.top - window.scrollY - shopRect.top - btnHeight - 12;

    floatingCartBtn.style.top = `${Math.max(topInsideShop, 0)}px`;
  } else {
    floatingCartBtn.classList.remove("is-docked");
    floatingCartBtn.style.top = "";
  }
}

if (floatingCartBtn && cartPanel) {
  floatingCartBtn.addEventListener("click", () => {
    cartPanel.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });

  window.addEventListener("scroll", updateFloatingCartBtn);
  window.addEventListener("resize", updateFloatingCartBtn);
  window.addEventListener("load", updateFloatingCartBtn);
}
const backToTopDivider = document.getElementById("back-to-top-divider");


if (backToTopDivider && shopPage) {
  backToTopDivider.addEventListener("click", () => {
    shopPage.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
}
function updateProductGridColumns() {
  const productList = document.getElementById("product-list");
  if (!productList) return;

  const items = Array.from(productList.querySelectorAll(".product"));
  if (items.length < 2) return;


  const firstTop = items[0].offsetTop;
  let columns = 0;

  for (const item of items) {
    if (item.offsetTop === firstTop) {
      columns++;
    } else {
      break;
    }
  }

  productList.classList.toggle("three-columns", columns === 3);
}
window.addEventListener("load", updateProductGridColumns);
window.addEventListener("resize", updateProductGridColumns);
/* ======================
   選單
====================== */
const menuIcon = document.querySelector(".menu-icon");
const sideMenu = document.querySelector(".side-menu");
const overlay = document.querySelector(".overlay");

menuIcon.addEventListener("mouseenter", () => {
  if (window.innerWidth > 768) {
    sideMenu.classList.add("active");
    overlay.classList.add("active");
  }
});

sideMenu.addEventListener("mouseleave", () => {
  if (window.innerWidth > 768) {
    sideMenu.classList.remove("active");
    overlay.classList.remove("active");
  }
});

menuIcon.addEventListener("mouseleave", () => {
  if (window.innerWidth > 768) {
    setTimeout(() => {
      if (!sideMenu.matches(":hover")) {
        sideMenu.classList.remove("active");
        overlay.classList.remove("active");
      }
    }, 100);
  }
});

menuIcon.addEventListener("click", () => {
  if (window.innerWidth <= 768) {
    sideMenu.classList.toggle("active");
    overlay.classList.toggle("active");
  }
});

overlay.addEventListener("click", () => {
  sideMenu.classList.remove("active");
  overlay.classList.remove("active");
});

document.querySelectorAll(".side-menu a").forEach(link => {
  link.addEventListener("click", () => {
    sideMenu.classList.remove("active");
    overlay.classList.remove("active");
  });
}); function updateSaleBanner() {
  const banner = document.querySelector(".sale-banner");
  const left = banner.querySelector(".sale-left");
  const right = banner.querySelector(".sale-right");
  const center = banner.querySelector(".sale-center");

  const pattern = "ONSALE";

  left.textContent = "";
  right.textContent = "";

  const bannerWidth = banner.offsetWidth;
  const centerWidth = center.offsetWidth;


  const sideWidth = (bannerWidth - centerWidth) / 2;


  const test = document.createElement("span");
  test.style.visibility = "hidden";
  test.style.position = "absolute";
  document.body.appendChild(test);

  let str = "";
  let width = 0;


  while (width < sideWidth) {
    str += pattern;
    test.textContent = str;
    width = test.offsetWidth;
  }


  while (width > sideWidth) {
    str = str.slice(0, -1);
    test.textContent = str;
    width = test.offsetWidth;
  }

  left.textContent = str;
  right.textContent = str;

  document.body.removeChild(test);
}

// 初始化
window.addEventListener("load", updateSaleBanner);

// 視窗改變時更新
window.addEventListener("resize", updateSaleBanner);

//響應載入影片切換
var load = document.getElementById('loadVideo');
var source = document.createElement('source');
if (window.innerWidth > 768) {
  source.setAttribute('src', 'video/loading/loading2.mp4');
}
else {
  source.setAttribute('src', 'video/loading/loading.mp4');
  //load.style.maxWidth = "100%";
}
source.setAttribute('type', 'video/mp4');
load.appendChild(source);
load.play();

//載入
var loader = document.getElementsByClassName("loader");

function fadeOut() {
  if (load.style.opacity  > 0) {
    setTimeout(function() {
      load.style.opacity  = load.style.opacity - 0.1;
      fadeOut()
    }, 23)
  }
};
window.addEventListener("load", fadeOut);