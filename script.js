function abrirMenu() {
  const menubar = document.querySelectorAll('.escondido');
  for (i = 0; i < menubar.length; i++){
  menubar[i].classList.remove('escondido');
  }
}

function fecharMenu(){
  const menubar = document.querySelectorAll('.desaparecerMenu');
  for (i = 0; i < menubar.length; i++){
  menubar[i].classList.add('escondido');
  }
}




/*--------------------Requisitos-------------------------*/
let chat = [];
let name = "";
cadastrarUsuario();
buscarMensagens();
window.setInterval(buscarMensagens,3000);

function cadastrarUsuario() {
  name = prompt("Como você gosta de ser chamado?");

  let objeto = {name:name};
  const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", objeto);

  promise.then(cadastrarSucesso);
  promise.catch(deuErro);
}

function deuErro(erro) {
  console.log(erro.response);
  let statusCode = parseInt(erro.response.status);
  if(statusCode === 400){
    name = prompt("Nome de usuário já existente. Tente com um nome diferente.");
    
    let objeto = {name:name};
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", objeto);

    promise.then(cadastrarSucesso);
    promise.catch(deuErro);
  }
}

function cadastrarSucesso() {
  alert("Cadastro realizado com sucesso!");
}


function buscarMensagens() {
  const promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
  promise.then(mostrarMensagem);
}

function mostrarMensagem(resposta) {
  chat = resposta.data;
  renderizarMensagem();
}


function renderizarMensagem() {
  const data = new Date();
  const time =`${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`;

  const mensagem = document.querySelector("article");
  mensagem.innerHTML = "";

    for (let i = 0; i < chat.length; i++){    
    if(chat[i].type == "message"){ 
      mensagem.innerHTML +=   `    
            <div  class="notificationMensagem mensagem">
                <div class="time">(${chat[i].time})</div>
                <div class="msgContent"><strong>${chat[i].from}</strong> para <strong>${chat[i].to}</strong>: ${chat[i].text}</div>
            </div>
      `} else{
        mensagem.innerHTML += `
              <div  class="notificationStatus mensagem">
                  <div class="time">(${chat[i].time})</div>
                  <div class="msgContent"><strong>${chat[i].from}</strong> ${chat[i].text}</div>
              </div>`
      }                              
      if(chat[i].to == name){`  
            <div  class="notificationMsgReservada mensagem">
                <div class="time">(${chat[i].time})</div>
                <div class="msgContent"><strong>${chat[i].from}</strong> para <strong>${chat[i].to}</strong>: ${chat[i].text}</div>
            </div>
            `} //perguntar se esse if de Reservada está correto
      scrollAutomatico();
      }
}

function scrollAutomatico(){
      //rever isso aqui do scrollIntoView, achar o querySelector correto
      const elementoNovoBottom = document.querySelector("body");
      elementoNovoBottom.scrollIntoView(false);
}


 function adicionarMensagem() {

     const objeto = {
       text: document.querySelector(".msgChat").value,                  
       from: name, 
       to: "Todos", 
       type: "message"};

       console.log(objeto);

  const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", objeto);           
  promise.then(buscarMensagens);  
  }
    
