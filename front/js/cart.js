
 
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
console.log ( (panier)); 



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
            console.log("croute" + indexApi)

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
                      <p>${panier[i].quantity*value[indexApi].price}</p>  
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
                
                      `; }
                else {

                }
            }})



//////retirer un produit du panier ///// 
 
function removeCanap (product){
  let panier = getCanap (); // on recupere
  let suppressionParId = panier.filter (p => p.id =! product.id); 
  if (suppressionParId =! undefined) {

    localStorage.removeItem(suppressionParId) ;

  }
  saveCanap(canap) ;
}

//////création de la fonction pour sauvegarder le produit dans un panier ! //////

function saveCanap (canap ) {  //on enregistre le tableau dans le local storage
  localStorage.setItem("canap", JSON.stringify(canap)) ;   // transforme en chaine de caractère
}

//////création de la fonction pour supprimer le panier //////

function removeCanap (){
  localStorage.removeItem(panier) ; 
  
}




  //Event pour ajouter un canap
let supprimerItems = document.getElementsByClassName("deleteItem");
  //On rajoute l'évent click au bouton addToCart, et ça va call la fonction addCanap
supprimerItems.addEventListener("on click", removeCanap);

console.log ("titi" + supprimerItems)




















  
  //retirer de la quantité
  
  function changeQuantity (product,quantity) {
    let canap = getCanap () ; 
    let foundProduct = canap.find(p => p.id == product.id);  //je cherche dans mon panier si il y a un id qui = a l'id du product
      if (foundProduct != undefined) {
        foundProduct.quantity += quantity ;
        if(foundProduct.quantity <=0 ){   //pour pas avoir une quantité negative
          removeCanap (foundProduct);
        } else{
          saveCanap(canap);
        }
      }
      
    }
  //pour calcul de la quantité 
  
  //function getNumberProduct {
    //let canap = getCanap () ;  // on recupere le panier 
  
  //}
  //pour le prix
  
  //function getTotalPrice