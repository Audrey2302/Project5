 
var url = new URL(window.location);
var urlparams = new URLSearchParams(url.search);
var productId = urlparams.get("id")
console.log(productId);


//https://www.youtube.com/watch?v=li7Fmtk4RCo
//let params = new URLSearchParams(window.location.search);

//URL de base 


//fetch(" http://localhost:3000/api/products")   //type de requete GET 

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