

var app = {

  // fonction d'initialisation, lancée au chargement de la page
  init: function () {
    console.log('app.init !');
    app.addListenerToActions();
    app.getFridgesFromAPI();
  },

  addListenerToActions: function(){
  
  
    const addFridgeButton = document.getElementById('addFridgeButton');
    addFridgeButton.addEventListener('click', fridgeModule.showAddFridgeModal);

   
    const closeModalButtons = document.querySelectorAll(".close");
    for(const button of closeModalButtons){
      button.addEventListener('click', utilModule.hideModals);
    }

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