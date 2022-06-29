// Etape 11 : Afficher le numéro de commande
//Récuperer l'Url de la page affichée
const url = new URL(location.href);

//Rechercher dans l'URL le paramètre de l'orderId
const orderIdURL = url.searchParams.get('id');

//Cibler l'id dans le HTML ligne 51
const orderIdHTML = document.getElementById('orderId');
//Ajouter l'orderId trouvé dans l'URL et l'afficher sur la page
if (orderIdURL !== null) {
    orderIdHTML.innerText = orderIdURL;
    localStorage.clear();
  } else {
    let confirmation = document.querySelector('.confirmation>p');
    confirmation.textContent =
      "Désolé une erreur s'est produite, commande non finalisée, merci de réessayer plus tard";
  }

