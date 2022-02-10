// function cadastrarNome(){
//    nomeUsuario = prompt("Por qual nome você gosta de ser chamado?");
// }

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

function buscarMensagens() {
  const promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
  promise.then(mostrarMensagem);
}

function mostrarMensagem(resposta) {
  chat = resposta.data;
  renderizarMensagem();
}

function renderizarMensagem() {
  const mensagem = document.querySelector("article");
  mensagem.innerHTML = "";

for (let i = 0; i < chat.length; i++){    
if(chat[i].type == "status"){
  mensagem.innerHTML += `
        <div class="notificationStatus">
            <div class="time">(${chat[i].time})</div>
            <div class="msgContent"><strong>${chat[i].from}</strong> ${chat[i].text}</div>
        </div>`
 }
 if(chat[i].type == "message"){
   mensagem.innerHTML +=   `    
         <div class="notificationMsgNormal">
            <div class="time">(${chat[i].time})</div>
            <div class="msgContent"><strong>${chat[i].from}</strong> para <strong>${chat[i].to}</strong>: ${chat[i].text}</div>
        </div>
   `}
  if(chat[i].to !== "todos"){`
        <div class="notificationMsgReservada">
             <div class="time">(${chat[i].time})</div>
             <div class="msgContent"><strong>${chat[i].from}</strong> para <strong>${chat[i].to}</strong>: ${chat[i].text}</div>
         </div>
        `}
   }
 }

 function adicionarMensagem() {
  const msgContent = document.querySelector(".msgChat").value;
  const data = new Date();
  const hora =`${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`;
  const from = "Carol";
  const to = "Todos";
  const type = "message";

     if(msgContent && hora && from && to && type){
     const novaMensagem = {
       text: msgContent, 
       time: hora,                    
       from:from, 
       to:to, 
       type:type};
     chat.push(novaMensagem);
     }
    
  // const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages");
  // console.log(chat);             
  // promise.then(renderizarMensagem);   //Bad request error 400!!!!!!!!!!!!!!!!!
}

buscarMensagens();
window.setInterval(buscarMensagens,3000);