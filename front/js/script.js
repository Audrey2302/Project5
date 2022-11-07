
//Apparition de l'API sur la console 
const api = " http://localhost:3000/api/products";

console.log(api);

//récupération du résultat de la requete, 

fetch(" http://localhost:3000/api/products") // Dans le cours, récuperer des données d'un service web !! 

    .then(function(res) {
    if (res.ok) {
        return res.json();
        }
    })
    .then(function(value) {
        console.log(value); 
        
        //mettre la boucle FOR pour les canapés ici !
        
        let product = document.getElementById("items")

            for (let i = 0; i < value.length; i++) {

                const productCard = `
                    <a href="./product.html?id=${value[i]._id}">
                        <article>
                            <img src="${value[i].imageUrl}" alt="${value[i].altTxt}" />
                            <h3 class="productName">${value[i].name}</h3>
                            <p class="productDescription"> ${value[i].description} </p>
                        </article>
                    </a>
                `;

        product.innerHTML += productCard;

        
       // <a href="./product.html?id=42">
        //<article>
        //  <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
        //  <h3 class="productName">Kanap name1</h3>
        //  <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
       // </article>
     // </a> -->
                

            


            console.log("Passager embarqué !");
        }





    })
    .catch(function(err) {
        // Une erreur est survenue
    });




