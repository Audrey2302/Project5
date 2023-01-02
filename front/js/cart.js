
 
 ///// Recupération du panier via le localstorage //////////

function getCanap() {
  let canap = JSON.parse(localStorage.getItem("canap"))
  console.log( (canap));
  if ( !canap ) { 
    return []; //un tableau vide
  } 
  return canap;
} 

let panier = getCanap ();




 //// Création des elements dans la page panier ! pour voir le panier des canap,  ////
 ////  Lien entre l'API et le LS /////

const api = " http://localhost:3000/api/products"; 

fetch(api) // recupère les données du service web    //type de requete GET 

  .then(function(res) {                    // recupérer la requete au format JSON
  if (res.ok) { 
      return res.json();  
      }
  })
  .then(function(value) {  // value c'est les valeurs qu'il y a dans mon api
        //console.log(value);                   //affiche le tableau sur la console
        
        //mettre la boucle FOR pour les canapés ici !
    
    let positionCart = document.getElementById("cart__items") // j'ai recuperé la liste items et je la met dans product.

          for (let i = 0; i < panier.length; i++) {  //longueur du tableau (debut, a la fin, à chaque boucle on augmente i une fois)

            let id = panier[i].id;
            let color = panier[i].color; //.color = une clé
            
            let indexApi = value.findIndex(p => ((p._id === panier[i].id) )); //_id c'est la clé dans mon api et colors aussi  //variable que j'ai definie dans scriptjs
            console.log (value);
            console.log("++" + indexApi)

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
                    //fonction pour la quantité totale
                    totalQuantity();
                    //fonction pour le prix total 
                    totalPrice();
                    
                    
                    ;}
                else {

                }
            }
          //action du bouton supprimer 
          removeFromId(); 
          //Action pour le changement de quantité 
          modifQuantity();
          })


//--------------------------------------------------//
//Avoir la quantité totale des articles//

function totalQuantity(){ // 1412 actualiser avec le LS
  let quantity = document.querySelectorAll('.itemQuantity');  //on prend la class ou il y a les quantités   // le point veut dire que c'est une class  
  let totalQuantity = document.getElementById('totalQuantity');  //on prend la lass ou on veut afficher les quantités totales 
  totalQuant = 0;                                                //Au debut le totalQuant =0 
  for (let i = 0; i < quantity.length; ++i) {                    // on fait une boucle pour toute les parties du tableau 
      totalQuant += quantity[i].valueAsNumber;  // ValueAsNumber :Une valeur numérique double qui renvoie la valeur de l'élément interprété dans l'ordre comme : une valeur temporelle, un nombre, ou NaN si la conversion est impossible
  }
  totalQuantity.innerText = totalQuant;
}
//--------------------------------------------------//
// fonction de  qui affiche le prix total // 

function totalPrice(){  //1412 Actualiser en fonction du localstorage 

  let quantity = document.querySelectorAll('.itemQuantity');
  //let price = panier[i].quantity*value[indexApi].price
  let price = document.querySelectorAll('.cart__item__content__description p:last-child'); //COMMENT PRENDRE JUSTE LE P AVEC LE PRIX QU'IL Y A DANS LE HTML??????
  //productItemContentTitlePrice.appendChild(productPrice);
  let totPrice = document.querySelector('#totalPrice');  //Pour l'affichage 
  totalPrices = 0;
  for (let i = 0; i < quantity.length; ++i) {
    totalPrices += (parseInt(quantity[i].value) * parseInt(price[i].innerText)); }
  totPrice.innerText = totalPrices;
}
//--------------------------------------------------------------//
//Supprimer dans le panier//

function removeFromId (){ //1412 supprimer l'element close sans le roload 
  console.log(panier);
  let supprimerItem = document.getElementsByClassName("deleteItem");
  
  for (let i = 0; i < supprimerItem.length; i++) {
    supprimerItem[i].addEventListener("click", function(){
      let close = this.closest("article")
      let id = close.getAttribute("data-id")
      let color = close.getAttribute("data-color")
      //close.remove();
      panier = panier.filter(p => p.id != id || p.color != color ); //ON CRée un nouveau tableau avec tout les id et les color different de celui on a cliqué 
       // mise à jour du localstorage
      localStorage.setItem("canap", JSON.stringify(panier));

      close.remove(); //supprime le close selectionné !!

      totalPrice();
      totalQuantity();

});
 }}
//--------------------------------------------------------------//
//Pour changer la quantité//


function modifQuantity () {

  let modifItem = document.getElementsByClassName("itemQuantity");
  console.log(modifItem)
  for (let i = 0; i < modifItem.length; i++) {
    modifItem[i].addEventListener("change" , function(){
      let close = this.closest("article")
      let id = close.getAttribute("data-id")
      let color = close.getAttribute("data-color")

      let foundItem = panier.findIndex(p => p.id == id && p.color == color)


      panier[foundItem].quantity = this.valueAsNumber;
      console.log(this.valueAsNumber)

      localStorage.setItem("canap", JSON.stringify(panier));

      totalPrice();
      totalQuantity();
      
    })
  }
}
//--------------------------------------------------------------//
//Les Regex //

let nameRegex = new RegExp("^[A-Za-zàâäéèêëïîôöùûüç'-]+$"); 
let emailRegex = new RegExp('^[A-Za-z0-9.-_]+[@]{1}[A-Za-z0-9.-_]+[.]{1}[a-z]{2,}$');
let cityRegex = new RegExp("^[A-Za-zàâäéèêëïîôöùûüç '-]+$");
let addressRegex = new RegExp ("^[0-9]{1,3}(?:(?:[,. ]){1}[-A-Za-zàâäéèêëïîôöùûüç]+)+");
//--------------------------------------------------------------//
//validation du prenom 

function ValidationFirstname () {
  let messageErrorFirstname = document.getElementById("firstNameErrorMsg");
  let firstname = document.getElementById("firstName");
  
  if (nameRegex.test(firstname.value))  {//.test(input) //1412 le seul truc qui faut changer c'est dans la parenthese faire une recherche de l'id firstname 
    messageErrorFirstname.innerHTML = '';
    return true
  }
  else {
    messageErrorFirstname.innerHTML = 'Erreur';
    return false
  }
}
//--------------------------------------------------------------//
//validation du nom 

function validationLastName () {
  let messageErrorLastName = document.getElementById("lastNameErrorMsg");
  let lastName = document.getElementById("lastName");
  
  if (nameRegex.test(lastName.value))  {//.test(input) //1412 le seul truc qui faut changer c'est dans la parenthese faire une recherche de l'id firstname 
    messageErrorLastName.innerHTML = '';
    return true
  }
  else {
    messageErrorLastName.innerHTML = 'Erreur';
    return false
  }
}
//--------------------------------------------------------------//
//validation de l'adresse 

function validationAdress () {
  let messageErrorAdress = document.getElementById("addressErrorMsg");
  let adress = document.getElementById("address");
  
  if (addressRegex .test(adress.value))  {//.test(input) //1412 le seul truc qui faut changer c'est dans la parenthese faire une recherche de l'id firstname 
    messageErrorAdress.innerHTML = '';
    return true
  }
  else {
    messageErrorAdress.innerHTML = 'Erreur';
    return false
  }
}
//--------------------------------------------------------------//
//validation de l'adresse 

function validationCity () {
  let messageErrorCity = document.getElementById("cityErrorMsg");
  let city = document.getElementById("city");
  
  if (cityRegex .test(city.value))  {//.test(input) //1412 le seul truc qui faut changer c'est dans la parenthese faire une recherche de l'id firstname 
    messageErrorCity.innerHTML = '';
    return true
  }
  else {
    messageErrorCity.innerHTML = 'Erreur';
    return false
  }
}
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
  }
}
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








//--------------------------------------------------------------//
//Validé la commande//



//-----------------------------------------------------------------//
//L'objet contact (à partir des données formulaire et un tableau produit)


//La fonction envoieDeLaCommande() permet d'envoyer la commande de l'utilisateur en prenant en compte un paramètre important qui est l'idProduit. Cet idProduit permet l'envoi de la requête ainsi que le contact.

function envoiCommande(){

  let produitDansLocalStorage = JSON.parse(localStorage.getItem("canap"))
  let products = [] ; //<-- array of product _id
  for (let i = 0; i < produitDansLocalStorage.length; i++) {
    products.push(produitDansLocalStorage[i].id)
  }
  console.log(products);

  
  let mail = document.getElementById("email");
  let city = document.getElementById("city");
  let adress = document.getElementById("address");
  let firstname = document.getElementById("firstName");
  let lastName = document.getElementById("lastName");

  let contact = {  //ca c'est du javascript on veut le transformer en JSON avec la requete post
    firstName: firstname.value,
    lastName: lastName.value,
    address: adress.value,
    city: city.value ,
    email: mail.value,
  }

  const order = { contact, products } ; 

    //Creation de la requete POST pour envoyer 

  fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            body: JSON.stringify(order),
            headers: {
                'Content-type': 'application/json'
            },
        })
              //console.table(requete)
            .then((response) => response.json())
            .then((data) => {
                  //console.table(data);
                localStorage.setItem("orderId", data.orderId);
                document.location.href = `confirmation.html?id=${data.orderId}`;
              })
            .catch((erreur) => {
                alert(`Erreur: ${erreur}`);
            });
};

let btnCommander = document.getElementById("order"); 
btnCommander.addEventListener("click", function(event) {
  event.preventDefault();// Empêche le rechargement de la page
  envoiCommande();
});




















