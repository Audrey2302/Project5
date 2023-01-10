
const api = " http://localhost:3000/api/products"; 

//recupération des données du back end et affichage des canapés sur la page d'accueil
fetch(api)                              //type de requete GET 
    .then(function(res) {              // recupérer la requete au format JSON
    if (res.ok) { 
        return res.json();  
        }})
    .then(function(value) {              
        
        let product = document.getElementById("items") 

            for (let i = 0; i < value.length; i++) { 
                product.innerHTML  +=  `    
                    <a href="./product.html?id=${value[i]._id}">   
                        <article>
                            <img src="${value[i].imageUrl}" alt="${value[i].altTxt}" />
                            <h3 class="productName">${value[i].name}</h3>
                            <p class="productDescription"> ${value[i].description} </p>
                        </article>
                    </a>
                `;         
        }})
    .catch(function(err) {
        console.log(err)   
     });




