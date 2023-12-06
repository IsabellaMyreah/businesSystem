const wrapper = document.getElementById("wrapper");
const totalEmployeeDiv = document.getElementById('totalDiv');

let employees = [];
let totalEmployees = employees.length;

const titles = `        
<div class="titles">
<div class="id">
  <img src="../img/square.svg" alt="" />
  <p>ID</p>
</div>

<div class="name">
  <p>Nome</p>
</div>

<div class="contat">
  <p>Função</p>
</div>

<div class="idPedido">
  <p>Salario</p>
</div>

<div class="data">
  <p>Data</p>
</div>
</div>
`;

function generateRow() {
  wrapper.innerHTML = "";
  wrapper.innerHTML += titles;


  employees.map((item) => {
    let div = document.createElement("div");

    const date = new Date(item.createdAt);

    const dateFormated = `${(date.getDate()).toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    

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
            <p>${item.role}</p>
        </div>

        <div class="salarioInfo">
            <p>R$ ${item.salary}</p>
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
  await fetch(`http://localhost:3000/employee/${id}`, { method: "DELETE" }).then(
    () => {
      fetchData();
    }
  );
}

async function fetchData() {
  await fetch("http://localhost:3000/employee")
    .then((response) => response.json())
    .then((data) => {
      employees = data;
      console.log(employees);
      generateRow();
      totalEmployees = employees.length;
      totalEmployeeDiv.innerText = totalEmployees;
    });
}

window.addEventListener("DOMContentLoaded", fetchData);
