 
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
    console.log(value);


    let image = document.getElementsByClassName("item__img") ;
    image[0].innerHTML = ` <img src="${value.imageUrl}" alt="${value.altTxt}"></img> ` ; 


    let name = document.getElementById("title") ;
    name.innerText = `${value.name}`;


    let price = document.getElementById("price")
    price.innerText =`${value.price}`

    let descrip = document.getElementById("description") ; 
    descrip.innerText = `${value.description}`


    let color = document.getElementById("colors")  

        for (let i = 0; i < value.colors.length; i++) {  

            color.innerHTML  +=  `  
              <option value="${value.colors[i]}"> ${value.colors[i]} </option>
               
            `;

            console.log("Couleur choisie !");
        }
    
  })


  .catch(function(err) {
    console.log(err) ;
    // Une erreur est survenue
  });






//const elementClick = document.getElementById("addToCard") ;
//elementClick.addEventListener ("click",function(event){

//})




  //création de la fonction pour sauvegarder le produit dans un panier ! 

  function saveCanap (canap ) {  //on enregistre le tableau dans le local storage
    localStorage.setItem("canap", JSON.stringify(canap)) ;   // transforme en chaine de caractère
  }

  function getCanap() {
    let canap = localStorage.getItem("canap")
    if (canap == null) {
      return []; //un tableau vide
    } else {
      return JSON.parse (canap);  //parse retransforme la chaine de caractère en objet 
    }
  }


  //ajout dans le panier

  function addCanap (product, quantity) {
        
    let canap = getCanap () ;
    //gerer la quantité
    let foundProduct = canap.find(p => p.id == product.id && color.value == p.color);  //je cherche dans mon panier si il y a un id qui =  l'id du product et = color
    if (foundProduct != undefined) {
      foundProduct.quantity += quantity ;
    }
    else {
      product.quantity = 1 ;
      canap.push(product);
    }
    
    saveCanap(canap) ;
  }


 //retirer un produit du panier 
 
 function removeCanap (product){
  let canap = getCanap (); // on recupere
  canap = canap.filter (p => p.id != product.id); 
  saveCanap(canap) ;
}


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