// =====================
// DADOS INICIAIS (FICTÍCIOS)
// =====================

let products = [
  { name: "Notebook Gamer X15", stock: 25, sold: 10, returned: 1, preparing: 3 },
  { name: "Smartphone Ultra Z", stock: 40, sold: 20, returned: 2, preparing: 5 },
  { name: "Teclado Mecânico RGB", stock: 60, sold: 35, returned: 0, preparing: 7 },
  { name: "Mouse Sem Fio Pro", stock: 80, sold: 50, returned: 3, preparing: 6 },
  { name: "Monitor 27'' 4K", stock: 15, sold: 8, returned: 0, preparing: 2 },
  { name: "Cadeira Gamer Vortex", stock: 20, sold: 12, returned: 1, preparing: 4 },
  { name: "Headset Noise Cancelling", stock: 50, sold: 30, returned: 2, preparing: 5 },
  { name: "Webcam Full HD", stock: 30, sold: 15, returned: 1, preparing: 3 },
  { name: "SSD 1TB NVMe", stock: 45, sold: 25, returned: 0, preparing: 6 },
  { name: "Placa de Vídeo RTX 4070", stock: 10, sold: 5, returned: 0, preparing: 1 }
];

// Elementos DOM
const productForm = document.getElementById("productForm");
const productsTable = document.getElementById("productsTable").querySelector("tbody");
const searchInput = document.getElementById("searchInput");
const resetBtn = document.getElementById("resetBtn");

// Gráficos
let stockChart, soldChart, returnedChart, preparingChart;

// =====================
// FUNÇÕES DE MÉTRICAS
// =====================
function updateMetrics() {
  const totalProducts = products.length;
  const totalSold = products.reduce((acc, p) => acc + p.sold, 0);
  const totalReturned = products.reduce((acc, p) => acc + p.returned, 0);
  const totalPreparing = products.reduce((acc, p) => acc + p.preparing, 0);
  const totalStock = products.reduce((acc, p) => acc + p.stock, 0);

  document.getElementById("totalProducts").innerText = totalProducts;
  document.getElementById("totalStock").innerText = totalStock;
  document.getElementById("totalSold").innerText = totalSold;
  document.getElementById("totalReturned").innerText = totalReturned;
  document.getElementById("totalPreparing").innerText = totalPreparing;
}

// =====================
// RENDERIZAÇÃO DA TABELA
// =====================
function renderProducts() {
  productsTable.innerHTML = "";
  const search = searchInput.value.toLowerCase();

  products
    .filter(p => p.name.toLowerCase().includes(search))
    .forEach((product, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${product.name}</td>
        <td>${product.stock}</td>
        <td>${product.sold}</td>
        <td>${product.returned}</td>
        <td>${product.preparing}</td>
        <td>
          <button class="send-btn" onclick="simulateSale(${index})">💰 Vender</button>
          <button class="send-btn" onclick="simulateReturn(${index})">↩️ Devolver</button>
        </td>
      `;
      productsTable.appendChild(row);
    });

  renderCharts();
  updateMetrics();
}

// =====================
// AÇÕES SIMULADAS
// =====================
function simulateSale(index) {
  if(products[index].stock > 0){
    products[index].stock -= 1;
    products[index].sold += 1;
    products[index].preparing += 1;
    renderProducts();
    alert(`Venda simulada de 1 unidade de ${products[index].name}`);
  } else {
    alert("Estoque insuficiente!");
  }
}

function simulateReturn(index) {
  if(products[index].sold > 0){
    products[index].sold -= 1;
    products[index].returned += 1;
    products[index].stock += 1;
    renderProducts();
    alert(`Devolução simulada de 1 unidade de ${products[index].name}`);
  } else {
    alert("Nenhum produto vendido para devolver!");
  }
}

// =====================
// ADICIONAR NOVO PRODUTO
// =====================
productForm.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const stock = parseInt(document.getElementById("stock").value);
  if(!name || isNaN(stock) || stock < 0) return alert("Preencha corretamente os campos!");
  products.push({name, stock, sold:0, returned:0, preparing:0});
  productForm.reset();
  renderProducts();
});

// =====================
// RESET DEMO
// =====================
resetBtn.addEventListener("click", () => {
  products = [
    { name: "Notebook Gamer X15", stock: 25, sold: 10, returned: 1, preparing: 3 },
    { name: "Smartphone Ultra Z", stock: 40, sold: 20, returned: 2, preparing: 5 },
    { name: "Teclado Mecânico RGB", stock: 60, sold: 35, returned: 0, preparing: 7 },
    { name: "Mouse Sem Fio Pro", stock: 80, sold: 50, returned: 3, preparing: 6 },
    { name: "Monitor 27'' 4K", stock: 15, sold: 8, returned: 0, preparing: 2 },
    { name: "Cadeira Gamer Vortex", stock: 20, sold: 12, returned: 1, preparing: 4 },
    { name: "Headset Noise Cancelling", stock: 50, sold: 30, returned: 2, preparing: 5 },
    { name: "Webcam Full HD", stock: 30, sold: 15, returned: 1, preparing: 3 },
    { name: "SSD 1TB NVMe", stock: 45, sold: 25, returned: 0, preparing: 6 },
    { name: "Placa de Vídeo RTX 4070", stock: 10, sold: 5, returned: 0, preparing: 1 }
  ];
  renderProducts();
});

// =====================
// RENDER GRÁFICOS
// =====================
function renderCharts() {
  const productNames = products.map(p => p.name);
  const stockData = products.map(p => p.stock);
  const soldData = products.map(p => p.sold);
  const returnedData = products.map(p => p.returned);
  const preparingData = products.map(p => p.preparing);

  const ctxStock = document.getElementById("stockChart").getContext("2d");
  const ctxSold = document.getElementById("soldChart").getContext("2d");
  const ctxReturned = document.getElementById("returnedChart").getContext("2d");
  const ctxPreparing = document.getElementById("preparingChart").getContext("2d");

  if(stockChart) stockChart.destroy();
  if(soldChart) soldChart.destroy();
  if(returnedChart) returnedChart.destroy();
  if(preparingChart) preparingChart.destroy();

  stockChart = new Chart(ctxStock, {
    type: "bar",
    data: {
      labels: productNames,
      datasets: [{ label: "Estoque Atual", data: stockData, backgroundColor: "#3498db" }]
    },
    options: { responsive:true, plugins:{legend:{display:false}} }
  });

  soldChart = new Chart(ctxSold, {
    type: "bar",
    data: {
      labels: productNames,
      datasets: [{ label: "Vendidos", data: soldData, backgroundColor: "#2ecc71" }]
    },
    options: { responsive:true, plugins:{legend:{display:false}} }
  });

  returnedChart = new Chart(ctxReturned, {
    type: "bar",
    data: {
      labels: productNames,
      datasets: [{ label: "Devolvidos", data: returnedData, backgroundColor: "#e74c3c" }]
    },
    options: { responsive:true, plugins:{legend:{display:false}} }
  });

  preparingChart = new Chart(ctxPreparing, {
    type: "bar",
    data: {
      labels: productNames,
      datasets: [{ label: "Em Preparação", data: preparingData, backgroundColor: "#f39c12" }]
    },
    options: { responsive:true, plugins:{legend:{display:false}} }
  });
}

// =====================
// FILTROS
// =====================
searchInput.addEventListener("input", renderProducts);

// =====================
// INICIALIZAÇÃO
// =====================
renderProducts();
