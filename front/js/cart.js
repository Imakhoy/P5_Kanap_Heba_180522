//*Etape 8 : Afficher un tableau récapitulatif des achats dans la page Panier

const itemsHtml = document.getElementById('cart__items');

let product = [];

if (localStorage.getItem('product') === null) {
  // Check if there is something in the localStorage
  window.confirm('Votre panier est vide');
} else {
  // management the cart
  let localStorageCart = JSON.parse(localStorage.getItem('product'));

  //create function to display the cart
  function showBasket(productAPI, productLS) {
    itemsHtml.innerHTML += `<article class="cart__item" data-id="${productLS.id}" data-color="${productLS.color}">
                <div class="cart__item__img">
                  <img src="${productAPI.imageUrl}" alt="${productAPI.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${productAPI.name}</h2>
                    <p>Couleur Selectionnée : ${productLS.color}</p>
                        <div class = "cart__item__content__titlePrice">
                            <p>Prix Unitaire : ${productAPI.price} €</p>
                            <p> Prix Total : ${productAPI.price * productLS.quantity} € </p>
                         </div>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productLS.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
  }

  //create function for shopping cart calculation
  function calcBasket(productAPI, productLS) {
    let totalQuantity = 0;
    let totalPrice = 0;
    //number of products ordered :
    totalQuantity += parseInt(productLS.quantity);
    document.getElementById('totalQuantity').textContent = `${totalQuantity}`;

    //price of products ordered
    totalPrice += productAPI.price * productLS.quantity;
    document.getElementById('totalPrice').textContent = `${totalPrice}`;

    //recover product ID to put in an array to pass the POST request to the API    product.push(productLS.id);
  }

  
  
  localStorageCart.forEach((productLS) => {
    // Pour chaque produit dans le local Storage récupérer son id

    fetch(`http://localhost:3000/api/products/${productLS.id}`) // Requete à l'API de l'ID récupéré dans le local Storage
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then((productAPI) => {
        // Affichage du panier
        showBasket(productAPI, productLS);
        calcBasket(productAPI, productLS);
        changeBasket();
        deleteBasket();
      });
  }); 
}