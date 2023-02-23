

var app = {

  // fonction d'initialisation, lancée au chargement de la page
  init: function () {
    console.log('app.init !');
    app.addListenerToActions();
    app.getFridgesFromAPI();
  },

  addListenerToActions: function(){
    /** On veut ajouter des écouteurs (eventListeners) sur chaque action (submit, click)
     * Plan d'action pour chaque évenement
     * 1. Sélectionner l'élément actionnable 
     * 2. Ajouter un écouteur selon le besoin, et lancer une action en retour
     */
    // Event sur le bouton "Ajouter une liste"
    const addFridgeButton = document.getElementById('addFridgeButton');
    addFridgeButton.addEventListener('click', fridgeModule.showAddFridgeModal);

    // Event sur les boutons "Fermer les modales"
    const closeModalButtons = document.querySelectorAll(".close");
    for(const button of closeModalButtons){
      button.addEventListener('click', utilModule.hideModals);
    }

    // Event sur le formulaire "ajouter une liste"
    const addFridgeForm = document.querySelector("#addFridgeModal form");
   // addFridgeForm.addEventListener('submit', listModule.handleAddFridgeForm);

    // boutons "ajouter une carte"
    //const addCardButtons = document.querySelectorAll('.button--add-card');
    //for (const button of addCardButtons) {
    //  button.addEventListener('click', cardModule.showAddCardModal);
    //}

    // formulaire "ajouter une carte"
    //const addCardForm = document.querySelector('#addCardModal form');
    //addCardForm.addEventListener('submit', cardModule.handleAddCardForm);
  },  

  

  getFridgesFromAPI: async function() {
    /**Je veux récupérer les listes disponibles sur mon API
     * Pour ensuite les afficher dans le DOM
     * Plan d'action :
     * 1. Appeler notre API sur la route /lists pour "GET" les listes
     * 2. On traite la response avec la méthode .json() pour extraire les données dans le response.body
     * 3. Si le code HTTP n'est pas un code succès, il faudra retourner une erreur
     * 4. Si on a un code succès, on créé les listes dans le DOM
     */
    const response = await fetch(`${utilModule.base_url}/fridges`);
    const jsonData = await response.json();
    if(!response.ok) { throw new Error("Un problème est survenu sur la requête HTTP !")};
    console.table(jsonData);
    for (const fridge of jsonData){
      fridgeModule.makeFridgeInDOM(fridge)
      /*for(const card of list.cards){
        cardModule.makeCardInDOM(card);
        for(const tag of card.tags) {
          tagModule.makeTagInDOM(tag);
        }
      }*/
    }
  }

};





// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', app.init );