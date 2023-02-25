const utilModule = {

    base_url: "http://localhost:3000",

    hideModals: function(){
        const modals = document.querySelectorAll(".modal");
        const table = document.querySelector(".table");
        for (const modal of modals) {
            modal.classList.remove("is-active");
            table.remove();
            
        }
      
    },
}

