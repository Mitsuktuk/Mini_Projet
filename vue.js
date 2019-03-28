var app = new Vue({
    el: '#restaurants',
    data: {
        restaurants: [],
        totalRestaurants: 0,
        totalPages: 1,
        page: 0,
        pagesize: 10,
        name: "",
        getRestaurants: 'http://localhost:8080/api/restaurants',
    },
    mounted() {
        this.getDataFromServer("total", this.getRestaurants + '/count');
        this.getDataFromServer("restaurants", this.getRestaurants + '?pagesize=' + this.pagesize.toString() + '&page=' + this.page.toString());
    },
    methods: {
        keyword: function() {
            var inputVal = document.querySelector("#input").value;
            this.name = '"' + inputVal + '"';
            if (!inputVal == "") {
                this.page = 0;
                this.getDataFromServer("total", this.getRestaurants + '/count?nom=' + inputVal);
                this.getDataFromServer("restaurants",this.getRestaurants + 'Nom?nom=' + inputVal + '&pagesize=' + this.pagesize.toString() + '&page=' + this.page.toString());
            } else {
                this.page = 0;
                this.getDataFromServer("total", this.getRestaurants + '/count');
                this.getDataFromServer("restaurants", this.getRestaurants + '?pagesize=' + this.pagesize.toString() + '&page=' + this.page.toString());
                this.name = "";
            }
        },

        selectPageSize: function() {
            var inputVal = document.querySelector("#input").value;
            if (!inputVal == "") {
                this.page = 0;
                this.getDataFromServer("total", this.getRestaurants + '/count?nom=' + inputVal);
                this.getDataFromServer("restaurants",this.getRestaurants + 'Nom?nom=' + inputVal + '&pagesize=' + this.pagesize.toString() + '&page=' + this.page.toString());
            } else {
                this.page = 0;
                this.getDataFromServer("total", this.getRestaurants + '/count');
                this.getDataFromServer("restaurants", this.getRestaurants + '?pagesize=' + this.pagesize.toString() + '&page=' + this.page.toString());
            }
        },

        goPage: function(num) {
            this.page = num;
            var inputVal = document.querySelector("#input").value;
            if (!inputVal == "") {
                this.getDataFromServer("restaurants", this.getRestaurants + 'Nom?nom=' + inputVal + '&pagesize=' + this.pagesize.toString() + '&page=' + this.page.toString());
            } else {
                this.getDataFromServer("restaurants", this.getRestaurants + '?pagesize=' + this.pagesize.toString() + '&page=' + this.page.toString());
            }
        },

        displayRestaurant : function() {
            location.replace("restaurant.html")
        },

        getDataFromServer: function(cas, url) {
            var loader = document.querySelector("#loader");
            loader.style.display = 'block';

            console.log("--- GETTING DATA ---");
            fetch(url)
                .then(response => {
                    return response.json(); // transforme le json texte en objet js
                })
                .then(data => { // data c'est l'objet ci-dessus (json devenu obj)
                    switch (cas) {
                        case "restaurants":
                            this.restaurants = data.data;
                            break;
                        case "total":
                            this.totalRestaurants = data.data;
                            this.totalPages = Math.ceil(this.totalRestaurants / this.pagesize);
                            break;
                    }
                    loader.style.display = 'none';
                    pagination.style.display = 'block';
                }).catch(err => {
                console.log("erreur dans le get : " + err)
            });
        }
    }

});
