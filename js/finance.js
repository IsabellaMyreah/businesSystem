const wrapper = document.getElementById('wrapper');
const totalDiv = document.getElementById("totalDiv");
const lossTotalDiv = document.getElementById('lossTotal');
const gainTotalDiv = document.getElementById('gainTotalDiv');

let products = [];

function generateRow() {
  wrapper.innerHTML = "";

  let lossTotal = 0;
  let gainTotal = 0;
  let total = 0;

  wrapper.innerHTML += `
    <div class="titles">
      <div class="id">
        <img src="../img/square.svg" alt="" />
        <p>ID</p>
      </div>

      <div class="name">
        <p>Nome</p>
      </div>

      <div class="status">
        <p>Status</p>
      </div>

      <div class="valor">
        <p>Valor</p>
      </div>

      <div class="data">
        <p>Data</p>
      </div>
    </div>
  `;

  products.map((item) => {
    let div = document.createElement("div");

    const date = new Date(item.createdAt);
    const dateFormated = `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`;

    total += item.value;

    if (item.profit) {
      gainTotal += item.value;
    } else {
      lossTotal += item.value;
    }

    div.innerHTML += `
      <div class="info">
        <div class="info02">
          <div class="id">
            <img src="../img/square.svg" alt="" />
            <p>#${item.id}</p>
          </div>

          <div class="nameInfo">
            <p>${item.name}</p>
          </div>

          <div class="statusInfo">
            <p>${item.profit ? 'Entrada' : 'Saída'}</p>
          </div>

          <div class="valorInfo">
            <p>R$ ${item.value}</p>
          </div>

          <div class="dataInfo">
            <p>${dateFormated}</p>
          </div>
        </div>
        <div class="icons">
          <a href="#"><img src="../img/pen.svg" alt="" /></a>
          <a href="#" onclick='deleteByItem(${item.id})'><img src="../img/lixo.svg" alt="" /></a>
        </div>
      </div>
    `;

    wrapper.appendChild(div);
  });

  totalDiv.innerText = `R$ ${total.toFixed(2)}`;
  lossTotalDiv.innerText = `R$ ${lossTotal.toFixed(2)}`;
  gainTotalDiv.innerText = `R$ ${gainTotal.toFixed(2)}`;
}

async function deleteByItem(id) {
  await fetch(`http://localhost:3000/finance/${id}`, { method: "DELETE" }).then(
    () => {
      fetchData();
    }
  );
}

async function fetchData() {
  await fetch("http://localhost:3000/finance")
    .then((response) => response.json())
    .then((data) => {
      products = data;
      generateRow();
    });
}

window.addEventListener("DOMContentLoaded", fetchData);
