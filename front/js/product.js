 
var url = new URL(window.location);
var urlparams = new URLSearchParams(url.search);
var productId = urlparams.get("id")
console.log(productId);

let newurl = "http://localhost:3000/api/products/" + productId ; 




fetch(newurl)


  .then(function(res) {                        // recupérer la requeté au format JSON
    if (res.ok) {
      return res.json();
    }
  })

  .then(function(value) {                      //La valeur 

     //Event pour ajouter un canap
    let addToCart = document.getElementById("addToCart");
    //On rajoute l'évent click au bouton addToCart, et ça va call la fonction addCanap
    addToCart.addEventListener("click", addCanap);
    //Pour récup le canap dans la fonction addCanap
    addToCart.item = productId;


    console.log(value);


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
               
            `;

        }
    
  })


  .catch(function(err) {
    console.log(err) ;
    // Une erreur est survenue
  });







  //création de la fonction pour sauvegarder le produit dans un panier ! 
function saveCanap (canap ) {  //on enregistre le tableau dans le local storage
  localStorage.setItem("canap", JSON.stringify(canap)) ;   // transforme en chaine de caractère
}


//création de la fonction pour supprimer le panier 
function removeCanap (){
  localStorage.removeItem("canap") ; 
}


//fonction pour récuperer les canapés enregistrés
function getCanap() {
  let canap = JSON.parse(localStorage.getItem("canap"))
  console.log("hola" + canap);
  if ( !canap ) { 
    return []; //un tableau vide
  } 
  return canap;
}


  //ajout dans le panier

function addCanap (product, color, quantity) {
//Ici on crée une interface, se sera l'ajout de la quantité ou de la couleur par l'utilisateur 
  let itemCanap = {};
    //On récup le canap en question
  itemCanap.productId = product.currentTarget.item; //currentTarget Identifie la cible actuelle de l'évènement, lorsque l'évènement traverse le DOM
    //On récup le nom du canap  
  itemCanap.title = document.getElementById("title").innerHTML;
    //On récup la quantité (transformé en nombre)
  itemCanap.quantity = parseInt(document.getElementById("quantity").value);
  //On recup le prix du canap
  //itemCanap.price = parseInt(document.getElementById("price").innerHTML);
    //On récup la liste de couleur

  let colorItem = document.getElementById("colors");
    //On récup la couleur sélectionnée
  itemCanap.color = colorItem.options[colorItem.selectedIndex].value;

  console.log('Save : Product : ' + JSON.stringify(itemCanap.productId));
  console.log ('name          : ' + itemCanap.title) ;
  console.log('QTÉ            : ' + itemCanap.quantity);
  console.log('COLOR          : ' + itemCanap.color);

  console.log(itemCanap);


    
  let canapList = getCanap() ; // CanapList c'est ce qu'il y a deja de rentrer dans mon local storage 
  console.log(canapList);
  let foundProduct = canapList.findIndex(p => ((p.id === itemCanap.productId) && (p.color === itemCanap.color))); //je cherche dans mon panier si il y a un id qui =  l'id du product et = color // trouver l'index ! attention find
  
  console.log("bonjour" + JSON.stringify(canapList)) ; // BUG 
  console.log(foundProduct) ;
  console.log(itemCanap.quantity);
    if (foundProduct != -1 )  {   //donc il y a des produit avec le meme ID et meme color
      canapList[foundProduct].quantity += itemCanap.quantity ;  
    }

    else {
      
     // itemCanap.quantity === quantity ; 
      // color === itemCanap.color ;  
      
      console.log ("hola" + itemCanap.quantity);


      canapList.push( {
        'id' : itemCanap.productId, 
        'color' : itemCanap.color , 
        'quantity' : itemCanap.quantity, 
      });
    }
    console.log(canapList);
  saveCanap(canapList) ;

}






 