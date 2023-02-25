

const fridgeModule = {

    showAddFridgeModal: function(){
        const modal = document.getElementById("addFridgeModal");
        modal.classList.add('is-active');
      },
     /*handleAddFridgeForm: async function(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        try {
          const response = await fetch(`${utilModule.base_url}/fridges`, {
            method: 'POST',
            body: formData
          });
          const jsonData = await response.json();
          if(!response.ok) { throw new Error("Impossible de créer le frigo !")}
          fridgeModule.makeFridgeInDOM(jsonData);
    
        } catch (error) {
          alert(error);
          console.log(error);
        }
        utilModule.hideModals();
        event.target.reset();
      },*/
    makeFridgeInDOM: function(fridge){
        // Récupérer le template
        const template = document.getElementById("fridge-template");
        // Cloner le template
        const newFridge = document.importNode(template.content, true);
        //console.log(newList);
        //Je veux ajouter un titre dans le h2 à ma liste
        newFridge.querySelector("h2").textContent = fridge.name; // list {id: 1, name: "premiere liste"}
    
        newFridge.querySelector('.panel').dataset.fridgeId = fridge.id;
        // => Utiliser ce console log pour bien comprendre l'histoire du dataset
        //console.log(newList.querySelector('.panel').dataset);
    
        // On rajoute l'id dans le deuxième endroit : le input hidden
        newFridge.querySelector("form input[name='fridge-id']").value = fridge.id;
        // On rajoute un eventListener au bouton "+" de chaque liste nouvellement créée
        newFridge.querySelector("#showRecordsButton").addEventListener('click', recordModule.showRecordsModal)
        // On rajoute un eventListener au titre de chaque liste pour afficher le formulaire "edit List"
        //newFridge.querySelector("h2").addEventListener("dblclick", fridgeModule.showEditFridgeForm);
        //newFridge.querySelector('.edit-list-form').addEventListener("submit", listModule.handleEditListForm);
        //newFridge.querySelector('.button--delete-list').addEventListener("click", listModule.deleteList);
        
       

        //Insérer la nouvelle liste en premiere position
        const fridgeContainer = document.querySelector("#fridgeContainer");
        const firstFridge = fridgeContainer.querySelector(".panel"); //Désigne la premiere liste dans listContainer
        fridgeContainer.appendChild(newFridge);
      },

      /*showEditListForm: function(event) {
        // Je veux cacher le titre de la liste
        event.target.classList.add('is-hidden');
        // Je veux afficher le formulaire
        event.target.nextElementSibling.classList.remove('is-hidden');
      },*/

      /*handleEditListForm: async function(event) {
        // On coupe le rechargement de la page (comportement par défaut d'un form);
        event.preventDefault();
        // On extrait les données du formulaire grâce à la classe FormData
        const formData = new FormData(event.target);
        // On selectionne le titre h2 de la liste
        const h2 = event.target.previousElementSibling;

        try {
          // On appelle l'API via la route /lists/:id en mode PUT
          const response = await fetch(`${utilModule.base_url}/lists/${formData.get('list-id')}`, {
            method: 'PUT',
            body: formData
          });
          // On récupère la data (la liste modifiée ou l'erreur)
          const jsonData = await response.json();
          // Si la réponse n'est pas ok, on créé une nouvelle erreur, qui sera récupérée directement par le catch
          if(!response.ok) { throw new Error("Impossible d'éditer la liste !")}

          //Je veux modifiere le titre de la liste dans le DOM
          h2.textContent = jsonData.name;
          
        } catch (error) {
          console.log(error);
          alert(error);
        }
        // On cache le formulaire (quelque soit le résultat du traitement)
        event.target.classList.add('is-hidden');
        h2.classList.remove('is-hidden');


      },*/

      /*deleteList: async function(event){
        if(!confirm("Voulez-vous vraiment supprimer cette liste ?")) { return };

        //On veut récupérer la liste dans le DOM
        const listDOM = event.target.closest(".panel");

        //Call API pour supprimer une liste
        try {
          const response = await fetch(`${utilModule.base_url}/lists/${listDOM.dataset.listId}`, {
            method: 'DELETE'
          });
          // On récupère la réponse de l'API
          const jsonData = await response.json();

          if(!response.ok){ throw new Error('Impossible de supprimer la liste !')}
          listDOM.remove();
        } catch (error) {
          console.log(error);
          alert(error);
        }

      },*/

      
}


/**Lorsque je clique sur le titre h2 d'une liste, il disparait et laisse apparaître le formulaire caché sous le titre 
 * 1- Ajouter un eventListener de type "dblclick" sur notre élément h2
 * 2- Lorsque l'évenement est enregistré : On masque le titre (en ajoutant une classe), et on affiche le formulaire (en lui retirant une classe).
 * 3- Rajouter un eventListener de type "submit" sur notre formulaire 
 * 4- Lorsque l'évenement est activé, on enregistre le nouveau nom de la liste sur la db via l'API
 * 5- Si l'api nous retourne une erreur, on fait réapparaitre le titre h2, et disparaitre le form (grace à la classe "is-hidden")
 * 6- Si l'api nous retourne un succès, on modifie la valeur du h2, puis on l'affiche, en oubliant pas de faire disparaître le form
*/

