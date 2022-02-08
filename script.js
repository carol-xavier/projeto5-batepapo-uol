function abrirMenu() {
   const menubar = document.querySelectorAll('.escondido');
   for (i = 0; i < menubar.length; i++){
   menubar[i].classList.remove('escondido');
   }
}
