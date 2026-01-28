const scriptURL = 'https://script.google.com/macros/s/AKfycbzs6P12BcSAufuc4FxLEMRg-tRAfmzY5gfjmKlp_lSPCeN1BfyYFfEGkyCXF82Ix9Yj/exec';
const form = document.forms['contact-form'];

let productDivs = [];

/* ======================
   共用工具函式（全域）
====================== */

function updateTotalAndProduct() {
  let total = 0;
  let details = [];

  productDivs.forEach(product => {
    const name = product.dataset.name;
    const price = parseInt(product.dataset.price);
    const count = parseInt(product.querySelector('.count').textContent);
    if (count > 0) {
      total += price * count;
      details.push(`${name} x${count}`);
    }
  });

  document.getElementById('total').value = total;
  document.getElementById('product').value = details.join(', ');
  document.getElementById('totalDisplay').textContent = `$${total}`;
}
function setFee(value) {
  document.getElementById('fee').value = value;
  document.getElementById('feeDisplay').textContent = `$${value}`;
}

function bindProductButtons() {
  productDivs.forEach(product => {
    const plus = product.querySelector('.plus');
    const minus = product.querySelector('.minus');
    const count = product.querySelector('.count');

    plus.onclick = () => {
      const stock = parseInt(product.dataset.stock || '0');
      let current = parseInt(count.textContent);
      if (current < stock && !plus.disabled) {
        count.textContent = current + 1;
        updateTotalAndProduct();
      }
    };

    minus.onclick = () => {
      let current = parseInt(count.textContent);
      if (current > 0 && !minus.disabled) {
        count.textContent = current - 1;
        updateTotalAndProduct();
      }
    };
  });
}

function updateRestrictions() {
  const method = document.getElementById('targetSheet').value;

  productDivs.forEach(product => {
    const only = product.dataset.only;
    const plus = product.querySelector('.plus');
    const minus = product.querySelector('.minus');
    const count = product.querySelector('.count');

    if (only && only !== method) {
      plus.disabled = true;
      minus.disabled = true;
      count.textContent = '0';
    } else {
      plus.disabled = false;
      minus.disabled = false;
    }
  });

  updateTotalAndProduct();
}

function resetFailedProduct(productName, remain) {
  productDivs.forEach(product => {
    if (product.dataset.name === productName) {
      product.querySelector('.count').textContent = '0';
      product.dataset.stock = remain;

      const stockInfo = product.querySelector('.stock-info');
      stockInfo.textContent = `（剩 ${remain} 件）`;

      if (remain <= 0) {
        product.querySelector('.plus').disabled = true;
        product.querySelector('.minus').disabled = true;
      }
    }
  });

  updateTotalAndProduct();
}

function showError(msg) {
  alert(msg);
  const submitBtn = document.getElementById('submit-button');
  const loadingIndicator = document.getElementById('loading-indicator');
  submitBtn.disabled = false;
  submitBtn.textContent = 'Submit';
  loadingIndicator.style.display = 'none';
}

/* ======================
   初始化
====================== */

document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('targetSheet');
  const storeCodeField = document.getElementById('storeCodeField');
  const bankCodeField = document.getElementById('bankCodeField');
  const storeCodeInput = storeCodeField.querySelector('input');
  const bankCodeInput = bankCodeField.querySelector('input');
  const feeInput = document.getElementById('fee');
  const productList = document.getElementById('product-list');

  function updateFieldVisibility() {
  const method = select.value;

  if (method === '711店取') {
    storeCodeField.style.display = 'block';
    bankCodeField.style.display = 'none';
    setFee(38);
  } 
  else if (method === '匯款自取') {
    storeCodeField.style.display = 'none';
    bankCodeField.style.display = 'block';
    setFee(0);
  } 
  else if (method === '現金自取') {
    storeCodeField.style.display = 'none';
    bankCodeField.style.display = 'none';
    setFee(0);
  }
}
const storeSearchBtn = document.querySelector('.store-search-btn');
const storeCodeInput2 = document.getElementById('storeCode');

if (storeSearchBtn && storeCodeInput) {
  storeSearchBtn.addEventListener('click', () => {
    // 使用者點查詢門市後
    setTimeout(() => {
      storeCodeInput2.focus();
    }, 500);
  });
}

const loadingText = document.getElementById('loadingProducts');
  fetch(scriptURL)
    .then(res => res.json())
    .then(data => {
      productList.innerHTML = '';

      data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'product';
        div.dataset.name = item.name;
        div.dataset.price = item.price;
        div.dataset.stock = item.stock;

        if (item.name.includes('商品C')) {
          div.dataset.only = '匯款自取';
        }

        div.innerHTML = `
          <span>${item.name} $${item.price}</span>
          <button type="button" class="minus">-</button>
          <span class="count">0</span>
          <button type="button" class="plus">+</button>
          <span class="stock-info">（剩 ${item.stock} 件）</span>
        `;
        productList.appendChild(div);
      });

      productDivs = document.querySelectorAll('.product');
      bindProductButtons();
      updateRestrictions();
      loadingText.style.display = 'none'; // ✅ 載入完成隱藏
    });

  select.addEventListener('change', () => {
    updateFieldVisibility();
    updateRestrictions();
  });

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
  loadingIndicator.style.display = 'inline';

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const storeCode = document.getElementById('storeCode').value.trim();
  const bankCode = document.getElementById('bankCode').value.trim();
  const gmail = document.getElementById('gmail').value.trim();
  const targetSheet = document.getElementById('targetSheet').value;
  const total = parseInt(document.getElementById('total').value || "0");

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
    return res.text(); // 不管內容
  })
  .then(() => {
    if (hasSubmitted) return;
    hasSubmitted = true;
const selectedMethod = document.getElementById('targetSheet').value;

    alert('✅ 訂單已送出');

    form.reset();

    const select = document.getElementById('targetSheet');

select.value = selectedMethod; // ✅ 設回送出時的取貨方式

    updateFieldVisibility();
    updateRestrictions();   
    setFee(select.value === '匯款自取' ? 0 : 38);
    document.querySelectorAll('.count').forEach(el => el.textContent = '0');
    updateTotalAndProduct();
  })
  .catch(err => {
    if (!hasSubmitted) {
      console.error(err);
      alert('❌ 無法送出訂單，請稍後再試');
    }
  })
  .finally(() => {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit';
    loadingIndicator.style.display = 'none';
  });

});
