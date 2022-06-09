//*Etape 4 : faire le lien entre un produit de la page d'accueil et la page produit

//Recupération des paramètres URL avec la propriété window.location.href

//Utiliser searchParams: pour passer l’id d’une page à une autre)
const idProduct = new URL(window.location.href).searchParams.get('id');


//Etape 6: Insérer un produit et ses détails dans la page produit
//Create a function displayProduct to display the product onthe page
function displayProduct(myProduct) {
    const productImg = document.createElement('img');
    const title = document.querySelector('#title');
    const price = document.querySelector('#price');
    const description = document.querySelector('#description');
    const colors = document.querySelector('#colors');

//Affichage du produit
  document.querySelector('.item__img').appendChild(productImg);
  productImg.setAttribute('src', `${myProduct.imageUrl}`);
  productImg.setAttribute('alt', `${myProduct.altTxt}`);

  title.textContent = myProduct.name;
  price.textContent = myProduct.price;
  description.textContent = myProduct.description;

//Affichage des couleurs using for in
  for (let i in myProduct.colors) {
    colors.insertAdjacentHTML(
      'beforeend',
      `<option value="${myProduct.colors[i]}">${myProduct.colors[i]}</option>`
    );
  }
}

  //Requête de l'API avec fetch
  fetch('http://localhost:3000/api/products/' + idProduct)
    .then((response) => response.json())
    .then((data) => displayProduct(data))
    .catch(function (error) {
      console.log(error);
    });

    /* Etape 7 : Ajouter des produits dans le panier */
    // create a function 'saveBasket' qui récupère le panier et l'envoie dans le localStorage
    function saveBasket(basket) {
        localStorage.setItem('product', JSON.stringify(basket));
    }
    //Alors la je dois cree une fonction pour récupèrer le panier dans le localStorage.
    //if it is empty, on retourne un array, and if there are elements we gonna return in the basket
    function getBasket() {
        let basket = localStorage.getItem('product');
        if (basket == null) {
          return [];
        } else {
          return JSON.parse(basket);
        }
      }
    // To add a product in the basket 
    function addBasket(product) {
        //put the contents of the basket in the basket variable
        let basket = getBasket();
          // On regarde si le produit ajouté au panier existe dans la même couleur ou pas
  let foundProduct = basket.find(
    (element) => element.id == product.id && element.color == product.color
  );


    //If yes, we update the quantity
    if (foundProduct != undefined) {
        let newQuantity =
        parseInt(foundProduct.quantity) + parseInt(product.quantity);
        foundProduct.quantity = newQuantity;
        location.reload();
        window.confirm(                                                   
        `Votre panier a été mis à jour de ${quantity} ${title.textContent} ${color}`
        );
    }
    // If no, we add the product in basket
    else {
        product.quantity = quantity;
        //to add the product at the end of our basket
        basket.push(product); 
        location.reload();
        window.confirm(
        `Félicitations! Votre commande de ${quantity} ${title.textContent} ${color} est ajoutée au panier`
        );
    }
    saveBasket(basket); // save
    }
    
// Ce que l'on veut dans notre tableau grace au clic de "ajouter au panier":
function addToCart(){
  // recover the quantity chosen by the user
  document.getElementById('quantity').addEventListener('change', (event) => {
    quantity = event.target.value;
  });

  // recover the color chosen by the user
  document.getElementById('colors').addEventListener('change', (event) => {
    color = event.target.value;
  });
  // We listen to the click of the addToCart button
  document.getElementById('addToCart').addEventListener('click', (result) => {
// we check that the color is chosen and that the quantity is between 0 and 100
    if (color != '' && quantity <= 100 && quantity != 0) {
      const product = {
        id: idProduct,
        color: color,
        quantity: quantity,
      };
      getBasket();
      addBasket(product);
    }
    // If the user has not chosen a color, so he is told to do
    else {
      window.confirm(
        'Veuillez sélectionner une quantité comprise entre 1 et 100 :)'
      );
    }
  });
}
addToCart();