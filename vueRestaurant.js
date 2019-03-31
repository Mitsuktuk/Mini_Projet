var app = new Vue({
    el: '#restaurant',
    data: {
        restaurant: null,
        getRestaurants: 'http://localhost:8080/api/restaurants',
        idRestaurant:"",
        grade:'',
    },
    mounted() {
        this.getDataFromServer("get", this.getRestaurants + "/" + this.idRestaurant);
    },
    created: function(){
        var urlFichier = document.URL;
        var id_recup = urlFichier.substring(urlFichier.lastIndexOf("=")+1);
        console.log(urlFichier);
        console.log(id_recup)
        this.idRestaurant = id_recup;
    },
    methods: {
        moyGrade: function() {
          var total = 0;
          this.restaurant.grades.forEach(function(element) {
            total = total + element.score;
          });
          var moy = total / this.restaurant.grades.length;
          if (moy < 14) {
            this.grade = 'A';
          } else if (moy < 28) {
            this.grade = 'B';
          } else {
            this.grade = 'C';
          }
        },

        addGrade: function(grade) {
          var score = 0;
          switch (grade) {
            case 'A':
              score = 0;
              break;
            case 'B':
              score = 14;
              break;
            case 'C':
              score = 28;
              break;
          }
          this.restaurant.grades.push({score: score, grade: grade});
          //this.getDataFromServer("put", this.getRestaurants + "/" + this.idRestaurant + this.restaurant);
        },

        getDataFromServer: function(cas, url) {
            //var loader = document.querySelector("#loader");
            //loader.style.display = 'block';

            console.log("--- GETTING DATA ---");
            fetch(url)
                .then(response => {
                    return response.json(); // transforme le json texte en objet js
                })
                .then(data => { // data c'est l'objet ci-dessus (json devenu obj)
                  switch (cas) {
                      case "get":
                          this.restaurant = data.restaurant;
                          this.moyGrade();
                          break;
                      case "put":
                          console.log("ok");
                          break;
                  }
                }).catch(err => {
                console.log("erreur dans le get : " + err)
            });
        }
    }

});
