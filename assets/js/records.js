

const recordModule = {

    showRecordsModal: function(event){
        const fridgeId = event.target.closest(".column").dataset.fridgeId
        console.log(fridgeId)
        const modal = document.getElementById("showAllRecords");
        modal.classList.add('is-active');
        recordModule.getAllRecordsFromAFridge(fridgeId);
     

    },

    getAllRecordsFromAFridge: async function(fridgeId){
        const response = await fetch(`${utilModule.base_url}/fridges/${fridgeId}/records`);
        console.log(response)
        const jsonData = await response.json();
        console.log(jsonData)
        if(!response.ok) { throw new Error("Un problème est survenu sur la requête HTTP !")};
        recordModule.makeTableInDOM(jsonData)
    },  

    makeTableInDOM: async function(records) {
        const template = document.getElementById("temperature-template");
        const newTable = document.importNode(template.content, true);
      
        const tbody = newTable.querySelector("tbody");
      
        for (const record of records) {
          const newRow = document.createElement("tr");
          newRow.classList.add("temperature-row");
      
          const temperatureControl = document.createElement("td");
          temperatureControl.classList.add("temperature-control");
          temperatureControl.textContent = record.value;
      
          const idControl = document.createElement("td");
          idControl.classList.add("id-control");
          idControl.textContent = record.id;
      
          const dateControl = document.createElement("td");
          dateControl.classList.add("date-control");
          dateControl.textContent = record.created_at;
      
          newRow.appendChild(temperatureControl);
          newRow.appendChild(idControl);
          newRow.appendChild(dateControl);
      
          tbody.appendChild(newRow);
        }
      
        const tableContainer = document.querySelector(".modal-card-body");
        tableContainer.appendChild(newTable);
    }
     /*handleAddListForm: async function(event) {
        /**Une fois le formulaire soumit, je veux effectuer le traitement nécessaire
         * Plan d'action :
         * 1. On coupe le comportement par défaut de l'évenement (ici le refresh de la page)
         * 2. Récupérer les infos des inputs du formulaire
         * 3. On veut ajouter cette nouvelle liste dans notre BDD
         * 4. on appelle la méthode de création (ajout dans le DOM) en lui passant le formData
         * 5. Fermer la modale
         * 6. On reset le contenu du formulaire
         */
        /*event.preventDefault();
        const formData = new FormData(event.target);
        try {
          const response = await fetch(`${utilModule.base_url}/lists`, {
            method: 'POST',
            body: formData
          });
          const jsonData = await response.json();
          if(!response.ok) { throw new Error("Impossible de créer la liste !")}
          listModule.makeListInDOM(jsonData);
    
        } catch (error) {
          alert(error);
          console.log(error);
        }
        utilModule.hideModals();
        event.target.reset();
      },*/

    /*makeListInDOM: function(list){
        // Récupérer le template
        const template = document.getElementById("list-template");
        // Cloner le template
        const newList = document.importNode(template.content, true);
        //console.log(newList);
        //Je veux ajouter un titre dans le h2 à ma liste
        newList.querySelector("h2").textContent = list.name; // list {id: 1, name: "premiere liste"}
    
        newList.querySelector('.panel').dataset.listId = list.id;
        // => Utiliser ce console log pour bien comprendre l'histoire du dataset
        //console.log(newList.querySelector('.panel').dataset);
    
        // On rajoute l'id dans le deuxième endroit : le input hidden
        newList.querySelector("form input[name='list-id']").value = list.id;
        // On rajoute un eventListener au bouton "+" de chaque liste nouvellement créée
        newList.querySelector(".button--add-card").addEventListener('click', cardModule.showAddCardModal)
        // On rajoute un eventListener au titre de chaque liste pour afficher le formulaire "edit List"
        newList.querySelector("h2").addEventListener("dblclick", listModule.showEditListForm);
        newList.querySelector('.edit-list-form').addEventListener("submit", listModule.handleEditListForm);
        newList.querySelector('.button--delete-list').addEventListener("click", listModule.deleteList);
        
        // Drag n Drop des cartes au sein de la liste
        // on récupère d'abord le container qui contient les cartes
        const cardContainer = newList.querySelector(".panel-block");

        // On créé l'instance de Sortable :
        Sortable.create(cardContainer, {
          group: "list",
          draggable: ".box",
          onEnd: cardModule.handleDragCard
        })

        //Insérer la nouvelle liste en premiere position
        const listContainer = document.querySelector("#listContainer");
        const firstList = listContainer.querySelector(".panel"); //Désigne la premiere liste dans listContainer
        listContainer.appendChild(newList);
      },

      showEditListForm: function(event) {
        // Je veux cacher le titre de la liste
        event.target.classList.add('is-hidden');
        // Je veux afficher le formulaire
        event.target.nextElementSibling.classList.remove('is-hidden');
      },

      handleEditListForm: async function(event) {
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
      },

      deleteList: async function(event){
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

      },

      handleDragList: function(event) {
        // On veut récupérer les listes dans le DOM
        const listsDOM = document.querySelectorAll(".panel");
        

        listsDOM.forEach(async(listDOM, index) => {
          const formData = new FormData();

          formData.set("position", index);
          try {
            const response = await fetch(`${utilModule.base_url}/lists/${listDOM.dataset.listId}`, {
              method: "PUT",
              body: formData
            })
            const jsonData = await response.json();

            if(!response.ok) { throw jsonData }
          } catch (error) {
            console.log(jsonData);
            alert("Impossible de mettre à jour la liste !")
          }
        })



      }*/
}


