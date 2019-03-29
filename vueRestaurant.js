var app = new Vue({
    el: '#restaurant',
    data: {
        restaurant: null,
        getRestaurants: 'http://localhost:8080/api/restaurants/5c63cd58d17b648636e663cc',
    },
    mounted() {
        this.getDataFromServer(this.getRestaurants);
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
                  /*loader.style.display = 'none';
                  pagination.style.display = 'block';*/
                  console.log(this.restaurant);
                }).catch(err => {
                console.log("erreur dans le get : " + err)
            });
        }
    }

});
