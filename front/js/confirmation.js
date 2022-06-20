 // Etape 11 : Afficher le numéro de commande

//Récuperer l'Url de la page affichée
const url = new URL(location.href);

//Rechercher dans l'URL le paramètre de l'orderId
const orderIdURL = url.searchParams.get('id');

//Cibler l'id dans le HTML ligne 51
const orderIdHTML = document.getElementById('orderId');

