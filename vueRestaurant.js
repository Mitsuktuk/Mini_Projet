var app = new Vue({
    el: '#restaurant',
    data: {
        restaurant: null,
        getRestaurants: 'http://localhost:8080/api/restaurants',
        idRestaurant:"",
    },
    mounted() {
        this.getDataFromServer(this.getRestaurants + "/" + this.idRestaurant);
    },
    created: function(){
        var urlFichier = document.URL;
        var id_recup = urlFichier.substring(urlFichier.lastIndexOf("=")+1);
        console.log(urlFichier);
        console.log(id_recup)
        this.idRestaurant = id_recup;
    },
    methods: {
        getDataFromServer: function(url) {
            //var loader = document.querySelector("#loader");
            //loader.style.display = 'block';

            console.log("--- GETTING DATA ---");
            fetch(url)
                .then(response => {
                    return response.json(); // transforme le json texte en objet js
                })
                .then(data => { // data c'est l'objet ci-dessus (json devenu obj)
                  this.restaurant = data.restaurant;
                }).catch(err => {
                console.log("erreur dans le get : " + err)
            });
        }
    }

});
