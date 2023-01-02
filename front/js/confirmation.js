 
var url = new URL(window.location.href);

var urlparams = new URLSearchParams(url.search);

var id = urlparams.get("id");

var orderId = document.getElementById("orderId");

orderId.innerHTML = id ; 

let newurl = "http://localhost:3000/api/products/order"

console.log(newurl)


  
  
  