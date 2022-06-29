//*Etape 8 : Afficher un tableau récapitulatif des achats dans la page Panier

const itemsHtml = document.getElementById('cart__items');

let product = [];


if (localStorage.getItem('product') === null) {
  // Check if there is something in the localStorage
  window.confirm('Votre panier est vide');
} else {
  // Management the cart
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

    //recover product ID to put in an array to pass the POST request to the API
    product.push(productLS.id);
  }

  //Étape 9 : Gérer la modification et la suppression de produits dans la page Panier
  //create function to modify the products in the cart:
  function changeBasket() {
    let inputsQuantity = document.querySelectorAll('.itemQuantity');

    inputsQuantity.forEach((input) => {
      input.addEventListener('change', (e) => {
        let articleHMTL = e.target.closest('article');
        let articleHTMLId = articleHMTL.dataset.id;
        let articleHTMLcolor = articleHMTL.dataset.color;

        //le premier article dans le local storage qui respecte la condition
        let articleChanged = localStorageCart.find(
        (e) => e.id === articleHTMLId && e.color === articleHTMLcolor
       );

        if (articleChanged !== undefined) {
          articleChanged.quantity = parseInt(e.target.value);

          if (articleChanged.quantity > 100) {
            alert('Attention, la quantité à été limitée à 100');
            e.target.value = 100;
            articleChanged.quantity = parseInt(e.target.value);
            localStorage.setItem(
              'product',
              JSON.stringify(localStorageCart)
            );
          } else if (articleChanged.quantity <= 0) {
            localStorageCart = localStorageCart.filter((e) => !(e.id === articleHTMLId && e.color === articleHTMLcolor));
            articleHMTL.remove();
            localStorage.setItem('product', JSON.stringify(localStorageCart));

            if (localStorageCart.length < 1) {
              localStorage.clear('product');
            }
          } else {
            localStorage.setItem('product', JSON.stringify(localStorageCart));
          }
        } else {
          localStorage.clear('product');
          alert("Désolé, une erreur s'est produite, nous n'avons pas pu finalier votre commande, veuillez réessayer plus tard");
        }
        location.reload();
      });
    });
  }
    //create a function to delete the products in the cart
    function deleteBasket() {
    let inputsDelete = document.querySelectorAll('.deleteItem');

    inputsDelete.forEach((input) => {
      input.addEventListener('click', (e) => {
        let articleHMTL = e.target.closest('article');
        let articleHTMLId = articleHMTL.dataset.id;
        let articleHTMLcolor = articleHMTL.dataset.color;

        localStorageCart = localStorageCart.filter((e) => !(e.id === articleHTMLId && e.color === articleHTMLcolor));

        if (localStorageCart.find((e) => e.id === articleHTMLId && e.color === articleHTMLcolor)) {
          localStorage.clear('product');
          alert("désolé une erreur s'est produite, nous n'avons pas pu finaliser votre commande, veuillez réessayer plus tard");
        } else {
          articleHMTL.remove();
          localStorage.setItem('product', JSON.stringify(localStorageCart));

          if (localStorageCart.length < 1) {
            localStorage.clear('product');
          }
        }
        location.reload();
      });
    });
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
        //display the cart
        showBasket(productAPI, productLS);
        calcBasket(productAPI, productLS);
        changeBasket();
        deleteBasket();
      });
  }); 
}

//Étape 10 : Passer la commande
//Selection du bouton Commander
const btnOrder = document.querySelector('#order');

//Selection des inputs du formulaire
let firstNameInput = document.getElementById('firstName');
let lastNameInput = document.getElementById('lastName');
let addressInput = document.getElementById('address');
let cityInput = document.getElementById('city');
let emailInput = document.getElementById('email');

firstNameInput.addEventListener('keyup', (e) =>{ checkFirstName(); });


// crée fonctions de Validation the inputs
function RegexAlpha(value) {
  return /^[A-Za-z\s]+$/.test(value);
  

}
function RegexAlphaNum(value) {
  return /^[a-zA-Z0-9,]/+$.test(value);
  //^[a-zA-Z0-9,]+$
  //^[1-9]+[0-9]*$
  
}
function RegexEmail(value) {
  return /^[a-zA-Z0-9.!#$%&'*]+@[a-zA-Z0-9-]+.[a-zA-Z0-9]+$/.test(value);
}

// crée une fonction de Vérification firstName
function checkFirstName() {
  if (RegexAlpha(firstNameInput.value)){
    firstNameInput.nextElementSibling.textContent = "";
  return true;
}else{
  firstNameInput.nextElementSibling.textContent = "Erreur : merci d'entrer un prénom conforme, Ex: Charles, Jean Charles, Sarah, Adnan";
  return false;
}
}
// crée une fonction de Vérification du lastName
function checkLastName(){
  if(RegexAlpha(lastNameInput.value)){
    lastNameInput.nextElementSibling.textContent = "";
    return true;
  }else{
    lastNameInput.nextElementSibling.textContent ="Erreur : merci d'entrer un nom conforme, Ex: Daoud, Boyer, Poutou";
  return false;
}
}
// crée une fonction de Vérification de la ville
function checkCity(){
  if(RegexAlpha(lastNameInput.value)){
    cityInput.nextElementSibling.textContent = "";
    return true;
  } else {
    cityInput.nextElementSibling.textContent =
      "Erreur : merci d'entrer une ville conforme, Ex: Paris, Paris 12ème";
    return false;
  }
}
// crée une fonction de Vérification de l'adresse
function checkAddress(){
  if (RegexAlphaNum(addressInput.value)){
    addressInput.nextElementSibling.textContent ="";
    return true;
  } else {
    addressInput.nextElementSibling.textContent =
      "Erreur : merci d'entrer une adresse conforme, Ex: 254 rue du faubourg St-Antoine, Rue Jean-Jaures ";
    return false;
  }
}
// crée une fonction Vérification de l'email
//Afficher un message d’erreur si besoin (par exemple lorsqu’un utilisateur renseigne “bonjour” dans le champ “e-mail”).
function checkEmail() {
  if (RegexEmail(emailInput.value)) {
    emailInput.nextElementSibling.textContent ="";
    return true;
  } else {
    emailInput.nextElementSibling.textContent =
    "Erreur : merci d'entrer un courriel conforme. Ex : support@name.com";
    return false;
  }
}  
//Create the user
 btnOrder.addEventListener('click', (e) => {
  e.preventDefault();

  if (
    checkFirstName() &&
    checkLastName() &&
    checkAddress() &&
    checkEmail()
  ) {
    const contact = {
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      address: addressInput.value,
      city: cityInput.value,
      email: emailInput.value,
    };


  if (localStorage.product === undefined) {
    alert(
      "Votre panier est vide, retrouvez nos produits sur la page d'Accueil"
    );
    location.href = './index.html';
  } else {
    PostAPI(contact, product);
  }
} else {
  alert("Vérifiez la saisie du formulaire s'il vous plait");
}
});

// Envoi à l'API du client et des produits + récupération du numéro de commande
function PostAPI(contact, products) {
fetch(
  `http://localhost:3000/api/products/order`,

  {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ contact, products }),
  }
)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })

  .then(function (api) {
    location.href = `./confirmation.html?id=${api.orderId}`;
  })

  .catch(function (err) {
    alert(
      "Désolé une erreur s'est produite, nous n'avons pas pu finaliser votre commande, veuillez réessayer plus tard"
    );
    location.href = './index.html';
  });
}





