const wrapper = document.getElementById("wrapper");
const totalDiv = document.getElementById("totalDiv");

let clients = [];
let total = clients.length;

const titles = `        
<div class="titles">
    <div class="id">
        <img src="../img/square.svg" alt="" />
        <p>ID</p>
    </div>

    <div class="name">
        <p>Nome</p>
    </div>

    <div class="cpf">
        <p>CPF</p>
    </div>

    <div class="idPedido">
        <p>ID Pedido</p>
    </div>

    <div class="data">
        <p>Data</p>
    </div>
</div>
`;

function generateRow() {
  wrapper.innerHTML = "";
  wrapper.innerHTML += titles;

  clients.map((item) => {
    let div = document.createElement("div");

    const date = new Date(item.createdAt);

    const dateFormated = `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;

    div.innerHTML += `
    <div class="info">

    <div class="info02">
        <div class="id">
            <img src="../img/square.svg" alt="">
            <p>#${item.id}</p>
        </div>

        <div class="nameInfo">
            <p>${item.name}</p>
        </div>

        <div class="funcaoInfo">
            <p>${item.cpf}</p>
        </div>

        <div class="salarioInfo">
            <p>${item.orders.id ?? 'Não possui'}</p>
        </div>

        <div class="dataInfo">
            <p>${dateFormated}</p>
        </div>

    </div>
    <div class="icons">
        <a href="#"><img src="../img/pen.svg" alt=""></a>
        <a href="#" onclick={deleteByItem(${item.id})}><img src="../img/lixo.svg" alt=""></a>
    </div>
    
</div>
    `;

    wrapper.appendChild(div);
  });
}

async function deleteByItem(id) {
  await fetch(`http://localhost:3000/client/${id}`, { method: "DELETE" }).then(
    () => {
      fetchData();
    }
  );
}

async function fetchData() {
  await fetch("http://localhost:3000/client")
    .then((response) => response.json())
    .then((data) => {
      clients = data;
      generateRow();
      total = clients.length;
      totalDiv.innerText = total;
    });
}

window.addEventListener("DOMContentLoaded", fetchData);
