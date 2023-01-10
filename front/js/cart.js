
//--------------------------------------------------//
//Fonction pour récuperer les canapés enregistrés// 
function getCanap() {
  let canap = JSON.parse(localStorage.getItem("canap"))
  if ( !canap ) { 
    return []; 
  } 
  return canap;
} 
let panier = getCanap (); //lecture du local storage

//-------------------------------------------------//
//récupération des données du back end 
const api = " http://localhost:3000/api/products"; 
fetch(api)                                   //type de requete GET 
  .then(function(res) {                    // recupérer la requete au format JSON
  if (res.ok) { 
      return res.json();  
      }})
  .then(function(value) {  
    let positionCart = document.getElementById("cart__items") 

          for (let i = 0; i < panier.length; i++) {  
            let id = panier[i].id;
            let color = panier[i].color; 
            
            let indexApi = value.findIndex(p => ((p._id === panier[i].id) )); 

                if ( indexApi != -1) {
                  positionCart.innerHTML  +=  `  
                  <article class="cart__item" data-id="${id}" data-color="${color}">
                  <div class="cart__item__img">
                    <img src="${value[indexApi].imageUrl}" alt="${value[indexApi].altTxt}">
                  </div>
                  <div class="cart__item__content">
                    <div class="cart__item__content__description">
                      <h2>${value[indexApi].name}</h2>
                      <p>${panier[i].color}</p>
                      <p id="price">${value[indexApi].price}</p>  
                    </div>
                    <div class="cart__item__content__settings">
                      <div class="cart__item__content__settings__quantity">
                        <p>Qté : ${panier[i].quantity} </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${panier[i].quantity}">
                      </div>
                      <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                      </div>
                    </div>
                  </div>
                </article>
                      `; 
                    totalQuantity();
                    totalPrice();
                    ;}
                else {
                }}
          removeFromId(); 
          modifQuantity();
          })

//--------------------------------------------------//
//Avoir la quantité totale des articles//
function totalQuantity(){ 
  let quantity = document.querySelectorAll('.itemQuantity');    
  let totalQuantity = document.getElementById('totalQuantity');  
  totalQuant = 0;                                                
  for (let i = 0; i < quantity.length; ++i) {                    
      totalQuant += quantity[i].valueAsNumber;  
  }
  totalQuantity.innerText = totalQuant;
}

//--------------------------------------------------//
// fonction de  qui affiche le prix total // 
function totalPrice(){  
  let quantity = document.querySelectorAll('.itemQuantity');
  let price = document.querySelectorAll('.cart__item__content__description p:last-child'); 
  let totPrice = document.querySelector('#totalPrice');  
  totalPrices = 0;
  for (let i = 0; i < quantity.length; ++i) {
    totalPrices += (parseInt(quantity[i].value) * parseInt(price[i].innerText)); }
  totPrice.innerText = totalPrices;
}

//--------------------------------------------------------------//
//Supprimer dans le panier//
function removeFromId (){ 
  let supprimerItem = document.getElementsByClassName("deleteItem");
  
  for (let i = 0; i < supprimerItem.length; i++) {
    supprimerItem[i].addEventListener("click", function(){
      let close = this.closest("article")
      let id = close.getAttribute("data-id")
      let color = close.getAttribute("data-color")
      
      panier = panier.filter(p => p.id != id || p.color != color ); //Selection de l'element à supprimer en fonction de son id et sa couleur
       
      localStorage.setItem("canap", JSON.stringify(panier));     // mise à jour du localstorage

      close.remove(); 

      totalPrice();
      totalQuantity();
});}}

//--------------------------------------------------------------//
//Modification de la quantité//
function modifQuantity () {
  let modifItem = document.getElementsByClassName("itemQuantity");

  for (let i = 0; i < modifItem.length; i++) {
    modifItem[i].addEventListener("change" , function(){
      let close = this.closest("article")
      let id = close.getAttribute("data-id")
      let color = close.getAttribute("data-color")

      let foundItem = panier.findIndex(p => p.id == id && p.color == color)

      panier[foundItem].quantity = this.valueAsNumber;

      localStorage.setItem("canap", JSON.stringify(panier));     // mise à jour du localstorage

      totalPrice();
      totalQuantity();
    })
  }}

//--------------------------------------------------------------//
//Les Regex //
let nameRegex = new RegExp("^[A-Za-zàâäéèêëïîôöùûüç'-]+$"); 
let emailRegex = new RegExp('^[A-Za-z0-9.-_]+[@]{1}[A-Za-z0-9.-_]+[.]{1}[a-z]{2,}$');
let cityRegex = new RegExp("^[A-Za-zàâäéèêëïîôöùûüç '-]+$");
let addressRegex = new RegExp ("^[0-9]{1,3}(?:(?:[,. ]){1}[-A-Za-zàâäéèêëïîôöùûüç]+)+");

//--------------------------------------------------------------//
//validation du prenom //
function ValidationFirstname () {
  let messageErrorFirstname = document.getElementById("firstNameErrorMsg");
  let firstname = document.getElementById("firstName");
  
  if (nameRegex.test(firstname.value))  {
    messageErrorFirstname.innerHTML = '';
    return true
  }
  else {
    messageErrorFirstname.innerHTML = 'Erreur, le prenom ne doit pas contenir de chiffres ni de caractère de ponctuation';
    return false
  }}

//--------------------------------------------------------------//
//validation du nom 
function validationLastName () {
  let messageErrorLastName = document.getElementById("lastNameErrorMsg");
  let lastName = document.getElementById("lastName");
  
  if (nameRegex.test(lastName.value))  { 
    messageErrorLastName.innerHTML = '';
    return true
  }
  else {
    messageErrorLastName.innerHTML = 'Erreur, le nom ne doit pas contenir de chiffres ni de caractère de ponctuation';
    return false
  }}

//--------------------------------------------------------------//
//validation de l'adresse 
function validationAdress () {
  let messageErrorAdress = document.getElementById("addressErrorMsg");
  let adress = document.getElementById("address");
  
  if (addressRegex .test(adress.value))  {
    messageErrorAdress.innerHTML = '';
    return true
  }
  else {
    messageErrorAdress.innerHTML = 'Erreur, l adresse ne doit pas contenir de caractère de ponctuation';
    return false
  }}

//--------------------------------------------------------------//
//validation de l'adresse 
function validationCity () {
  let messageErrorCity = document.getElementById("cityErrorMsg");
  let city = document.getElementById("city");
  
  if (cityRegex .test(city.value))  {
    messageErrorCity.innerHTML = '';
    return true
  }
  else {
    messageErrorCity.innerHTML = 'Erreur, la ville ne doit pas contenir de chiffres ni de caractère de ponctuation';
    return false
  }}

//--------------------------------------------------------------//
//validation du mail 
function validationMail () {
  let messageErrorMail = document.getElementById("emailErrorMsg");
  let mail = document.getElementById("email");
  
  if (emailRegex.test(mail.value))  {
    messageErrorMail.innerHTML = '';
    return true
  }
  else {
    messageErrorMail.innerHTML = 'Erreur';
    return false
  }}

//------------------------------------------------------------//
//Faire marcher la validation 
let validationDuFormulaire = document.querySelector(".cart__order__form");

validationDuFormulaire.firstName.addEventListener("change", function () {
  ValidationFirstname();
});
validationDuFormulaire.lastName.addEventListener("change", function () {
  validationLastName();
});
validationDuFormulaire.address.addEventListener("change", function () {
  validationAdress();
});
validationDuFormulaire.city.addEventListener("change", function () {
  validationCity();
});
validationDuFormulaire.email.addEventListener("change", function () {
  validationMail();
});

//------------------------------------------------------------//
//Envoi des informations client après validation
function envoiCommande(){
  let produitDansLocalStorage = JSON.parse(localStorage.getItem("canap"))
  let products = [] ;  //construction d'un tableau depuis le LocalStorage
  for (let i = 0; i < produitDansLocalStorage.length; i++) {
    products.push(produitDansLocalStorage[i].id)
  }
  //recupération des données du formulaire
  let mail = document.getElementById("email");
  let city = document.getElementById("city");
  let adress = document.getElementById("address");
  let firstname = document.getElementById("firstName");
  let lastName = document.getElementById("lastName");

  let contact = {                  //création de l'objet que doit recevoir le back end 
    firstName: firstname.value,
    lastName: lastName.value,
    address: adress.value,
    city: city.value ,
    email: mail.value,
  }
  const informationPourCommande = { contact, products,} ; 
  const options = {           //Option de configuration de la requete POST
    method: "POST",
    body: JSON.stringify(informationPourCommande),
    headers: {
      'Content-type': 'application/json',
  } };
  fetch("http://localhost:3000/api/products/order", options )
    .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("orderId", data.orderId);
        document.location.href = `confirmation.html?id=${data.orderId}`;
      })
      .catch((erreur) => {
        alert(`Erreur: ${erreur}`);
         });};

//------------------------------------------------------------//
//actionner le bouton "commander"
let btnCommander = document.getElementById("form"); 
btnCommander.addEventListener("submit", function(event) {
  event.preventDefault();// Empêche le rechargement de la page
  envoiCommande();
});




















