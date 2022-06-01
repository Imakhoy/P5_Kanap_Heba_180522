//Etape 3 Insérer les produits dans la page d’accueil
//create a function to insert the products
function displayProducts(dataProduct) {
    if (dataProduct) {
      for (let i = 0; i < dataProduct.length; i += 1) {
        //Déclaration des variables + affectation + création des éléments (L52 à L58 index.HTML)
        let product = document.createElement('article');
        let link = document.createElement('a');
        let image = document.createElement('img');
        let title = document.createElement('h3');
        let description = document.createElement('p');

        document.getElementById('items').appendChild(link);
    

      //Ajout des éléments (enfants) : Image, Title et Description qui ont pour parent: Product (article)
      product.appendChild(image);
      image.src = dataProduct[i].imageUrl;
      image.alt = dataProduct[i].altTxt;

      product.appendChild(title);
      title.classList.add('title');
      title.textContent = dataProduct[i].name;

      product.appendChild(description);
      description.classList.add('description');
      description.textContent = dataProduct[i].description;
    }
  }
}


