//--------------------------------------------------//
//Faire le lien entre le panier et la page confirmation// 
var url = new URL(window.location.href);

var urlparams = new URLSearchParams(url.search);

var id = urlparams.get("id");

var orderId = document.getElementById("orderId");

orderId.textContent = id ; 

localStorage.clear(); 
  
  
  