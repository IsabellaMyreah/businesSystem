const wrapper = document.getElementById("wrapper");

let products = [];

const titles = `        
  <div class="titles">
    <div class="id">
        <img src="../img/square.svg" alt="">
        <p>ID</p>
    </div>

    <div class="name">
        <p>Nome</p>
    </div>

    <div class="valor">
        <p>Valor</p>
    </div>

    <div class="data">
        <p>Data</p>
    </div>

  </div>
`;

function generateRow() {
  wrapper.innerHTML = "";
  wrapper.innerHTML += titles;
  products.map((item) => {
    let div = document.createElement("div");

    div.innerHTML += `
    <div class="info">
      <div class="info02">
          <div class="id">
              <img src="../img/square.svg" alt="">
              <p>#${item.id}</p>
          </div>

          <div class="nameInfo">
              <p>Kit Festa 01</p>
          </div>

          <div class="valorInfo">
              <p>R$ 100,00</p>
          </div>

          <div class="dataInfo">
              <p>24/11/2023</p>
          </div>
      </div>

      <div class="icons">
          <a href=""><img src="../img/pen.svg" alt=""></a>
          <a href="#" onclick="fetchDeleteByItem(${item.id})"><img src="../img/lixo.svg" alt=""></a>
      </div>
    </div>
    `;

    wrapper.appendChild(div);
  });
}

async function fetchDeleteByItem(id) {
  await fetch(`http://localhost:3000/product/${id}`, { method: "DELETE" }).then(
    () => {
      fetchData();
    }
  );
}

async function fetchData() {
  await fetch("http://localhost:3000/product")
    .then((response) => response.json())
    .then((data) => {
      products = data;
      console.log(products);
      generateRow();
    });
}

window.addEventListener("DOMContentLoaded", fetchData);
