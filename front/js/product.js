//--------------------------------------------------//
//Faire le lien entre un produit de la page d’accueil et la page Produit// 
var url = new URL(window.location);
var urlparams = new URLSearchParams(url.search);
var productId = urlparams.get("id")

let newurl = "http://localhost:3000/api/products/" + productId ; 

//-------------------------------------------------//
//récupération des données du back end pour l'id du canapé selectionné et affichage de ces details
fetch(newurl)
  .then(function(res) {                        // recupérer la requeté au format JSON
    if (res.ok) {
      return res.json();
    }})
  .then(function(value) {                  
    let addToCart = document.getElementById("addToCart");   //Pour le bouton "ajouter au panier"
    addToCart.addEventListener("click", addCanap); 
    addToCart.item = productId;

    let image = document.getElementsByClassName("item__img") ;
    image[0].innerHTML = ` <img src="${value.imageUrl}" alt="${value.altTxt}"></img> ` ; 

    let name = document.getElementById("title") ;
    name.innerText = `${value.name}`;

    let price = document.getElementById("price")
    price.innerText =`${value.price}`

    let descrip = document.getElementById("description") ; 
    descrip.innerText = `${value.description}`

    let color = document.getElementById("colors") ;
        for (let i = 0; i < value.colors.length; i++) {  
            color.innerHTML  +=  `  
              <option value="${value.colors[i]}"> ${value.colors[i]} </option> 
            `; }})
  .catch(function(err) {
    console.log(err);
  });

//--------------------------------------------------//
//Fonction pour sauvegarder le produit dans un panier// 
function saveCanap (canap ) { 
  localStorage.setItem("canap", JSON.stringify(canap)) ;   // transforme en chaine de caractère
}
//--------------------------------------------------//
//Fonction pour récuperer les canapés enregistrés// 
function getCanap() {
  let canap = JSON.parse(localStorage.getItem("canap"))
  if ( !canap ) { 
    return []; //un tableau vide
  } 
  return canap;
}
//--------------------------------------------------//
//Ajout dans le panier avec la couleur et la quantité souhaité par l'utilisateur// 
function addCanap (product) {
  let itemCanap = {};
  itemCanap.productId = product.currentTarget.item; // Identifie la cible actuelle de l'évènement, lorsque l'évènement traverse le DOM
  itemCanap.title = document.getElementById("title").textContent; //recup du titre 
  itemCanap.quantity = parseInt(document.getElementById("quantity").value); // récup de la quantité
  let colorItem = document.getElementById("colors");
  itemCanap.color = colorItem.options[colorItem.selectedIndex].value; //récup de la couleur

  let canapList = getCanap() ;

  let foundProduct = canapList.findIndex(p => ((p.id === itemCanap.productId) && (p.color === itemCanap.color))); 
    if (foundProduct != -1 )  {   
      canapList[foundProduct].quantity += itemCanap.quantity ;  
    }
    else {
      canapList.push( {
        'id' : itemCanap.productId, 
        'color' : itemCanap.color , 
        'quantity' : itemCanap.quantity, 
      });}
  saveCanap(canapList) ;
}