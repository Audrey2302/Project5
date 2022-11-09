
//Apparition de l'API sur la console 
const api = " http://localhost:3000/api/products";

console.log(api);




//récupération du résultat de la requete, 

fetch(api) // recupère les données du service web    //type de requete GET 

    .then(function(res) {                    // recupérer la requete au format JSON
    if (res.ok) { 
        return res.json();  
        }
    })
    .then(function(value) {
        //console.log(value);                   //affiche le tableau sur la console
        
                                            //mettre la boucle FOR pour les canapés ici !
        
        let product = document.getElementById("items") // j'ai recuperé la liste items et je la met dans product

            for (let i = 0; i < value.length; i++) {  //longueur du tableau (debut, a la fin, à chaque boucle on augmente i une fois)

                product.innerHTML  +=  `    
                    <a href="./product.html?id=${value[i]._id}">   
                        <article>
                            <img src="${value[i].imageUrl}" alt="${value[i].altTxt}" />
                            <h3 class="productName">${value[i].name}</h3>
                            <p class="productDescription"> ${value[i].description} </p>
                        </article>
                    </a>
                `;

    

        
       // <a href="./product.html?id=42">
        //<article>
        //  <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
        //  <h3 class="productName">Kanap name1</h3>
        //  <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
       // </article>
     // </a> -->
                
        }





    })
    .catch(function(err) {
        console.log(err)   
     });




