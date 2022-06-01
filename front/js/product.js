//*Etape 4 : faire le lien entre un produit de la page d'accueil et la page produit

//Recupération des paramètres URL avec la propriété window.location.href

//Utiliser searchParams: pour passer l’id d’une page à une autre)
const idProduct = new URL(window.location.href).searchParams.get('id');

