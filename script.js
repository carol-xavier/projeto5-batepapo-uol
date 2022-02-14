function abrirMenu() {
  const menubar = document.querySelectorAll('.escondido2');
  for (i = 0; i < menubar.length; i++) {
    menubar[i].classList.remove('escondido2');
  }
}

function fecharMenu() {
  const menubar = document.querySelectorAll('.desaparecerMenu');
  for (i = 0; i < menubar.length; i++) {
    menubar[i].classList.add('escondido2');
  }
}


let inputMensagem = document.querySelector(".msgChat");
inputMensagem.addEventListener("keyup", function (KeyboardEvent) {
  // Number 13 is the "Enter" key on the keyboard
  if (KeyboardEvent.keyCode === 13) {
    event.preventDefault();
    document.querySelector(".caixa-texto").click();
  }
});


let botaoEntrar = document.querySelector(".nomeUsuario");
botaoEntrar.addEventListener("keyup", function (KeyboardEvent) {
  if (KeyboardEvent.keyCode === 13) {
    event.preventDefault();
    document.querySelector(".botaoEntrar").click();
  }
});

/*--------------------Requisitos-------------------------*/
let chat = [];
let name = "";
const elementoNovoBottom = [];

function cadastrarUsuario() {
  name = document.querySelector(".nomeUsuario").value;

  let objeto = { name: name };
  const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", objeto);

  promise.then(cadastrarSucesso);
  promise.catch(nomeJaCadastrado);
}

function nomeJaCadastrado(erro) {
  let deuErro = alert("Nome de usuário já existente. Tente com um nome diferente.");
  console.log(erro.response);

  let statusCode = parseInt(erro.response.status);
  if (statusCode === 400) {
    setTimeout(nomeJaCadastrado(),5000);
  }
}

function cadastrarSucesso() {
  alert("Cadastro realizado com sucesso!");

  const usuarioCadastrado = document.querySelector(".tela-inicial");
  usuarioCadastrado.classList.add("escondido");

  iniciarChecarStatus()
  iniciarBuscarMensagens()
}

function buscarMensagens() {
  const promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
  promise.then(mostrarMensagem);
}

function mostrarMensagem(resposta) {
  chat = resposta.data;
  renderizarMensagem();
}


function scrollAutomatico() {
  const todasMensagens = document.querySelectorAll("article div")
  const ultimaMensagem = todasMensagens[todasMensagens.length - 1];
  ultimaMensagem.scrollIntoView();
}

function renderizarMensagem() {
  const data = new Date();
  const time = `${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`;

  const mensagem = document.querySelector("article");
  mensagem.innerHTML = "";

  for (let i = 0; i < chat.length; i++) {
    if (chat[i].type == "message") {
      mensagem.innerHTML += `    
            <div  class="notificationMensagem messagebox data-identifier="message"">
                <div class="time">(${chat[i].time})</div>
                <div class="msgContent"><strong>${chat[i].from}</strong> para <strong>${chat[i].to}</strong>: ${chat[i].text}</div>
            </div>`
    } 
    if(chat[i].type == "status"){
      mensagem.innerHTML += `
              <div  class="notificationStatus messagebox data-identifier="message"">
                  <div class="time">(${chat[i].time})</div>
                  <div class="msgContent"><strong>${chat[i].from}</strong> ${chat[i].text}</div>
              </div>`
    }
    if (chat[i].type == "private_message" && (chat[i].to == name || chat[i].from == name)){
      mensagem.innerHTML += `  
            <div  class="notificationMsgReservada messagebox data-identifier="message"">
                <div class="time">(${chat[i].time})</div>
                <div class="msgContent"><strong>${chat[i].from}</strong> para <strong>${chat[i].to}</strong>: ${chat[i].text}</div>
            </div>
            `
    }
  }
  scrollAutomatico();
}


function adicionarMensagem() {
  const objeto = {
    text: document.querySelector(".msgChat").value,
    from: name,
    to: "Todos", //como colocar duas opções de "to", todos e pessoa específica (reservadamente)
    type: "message"
  };

  console.log(objeto);
  const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", objeto);
  promise.then(buscarMensagens);
  promise.catch(barrarUsuarioOff);
}


function barrarUsuarioOff() {
  window.location.reload();
}


function iniciarChecarStatus() {
  window.setInterval(function () {           //usando função anônima
    let objeto = { name: name };
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/status", objeto);
  }, 4000);
}

function iniciarBuscarMensagens() {
  window.setInterval(buscarMensagens, 3000);
}

