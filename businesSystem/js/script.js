function acao(){

  let modal = document.querySelector('.modalLogin');

  modal.style.display = 'block';
  document.body.style.overflow = "hidden";
}

function fechar(){

  let modal = document.querySelector('.modalLogin');

  modal.style.display = 'none';
  document.body.style.overflow = "auto";

}

function acaoTwo(){

  let modalCad = document.querySelector('.modalCadastro');

  modalCad.style.display = 'block';
  document.body.style.overflow = "hidden";
}

function fecharTwo(){

  let modalCad = document.querySelector('.modalCadastro');

  modalCad.style.display = 'none';
  document.body.style.overflow = "auto";

}
