const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get('id');

console.log(id)

var serv = {
    "doctors":[
        {
            "id":"doc_1",
            "stars":3,
            "name":"Doctor's A name",
            "profil":"img/profilpic.png",
            "spec":"Généraliste",
            "desc":'Description....',
            "img":"img/doc1.jpg",
            "imp":"doc1.jpg",
            "area":'Constantine, Algeria',
            
        },
        {
            "stars":4,
            "id":"doc_2",
            "name":"Doctor's B name",
            "profil":"img/profilpic2.png",
            "spec":"Kinesitherapy",
            "desc":'Description....',
            "img":"img/doc2.jpg",
            "imp":"doc2.jpg",
            "area":'Setif, Algeria'

        },
        {
            "stars":3,
            "id":"doc_3",
            "name":"Doctor's C name",
            "profil":"img/profilpic.png",
            "spec":"Denstist",
            "desc":'Description....',
            "img":"img/doc3.jpg",
            "imp":"doc3.jpg",
            "area":'Sidi belabbes, Algeria'

        }

    ]
    ,
    "house":[
        {
            "stars":3,
            'id':"deco_1",
            "name":"Déco's name",
            "profil":"img/profilpic.png",
            "spec":"Service de Décoration",
            "desc":'Description....',
            "img":"img/deco1.jpg",
            "imp":"deco1.jpg",
            "area":'Constantine, Algeria'
            
        },
        {
            "stars":4,
            'id':"peintre_1",
            "name":"Peintre - name",
            "profil":"img/profilpic.png",
            "spec":"Peintre professionnel",
            "desc":'Description....',
            "img":"img/peintre.jpg",
            "imp":"peintre.jpg",
            "area":'Constantine, Algeria'
        }
    ],
    "software":[
        {
            "stars":2,
            'id':"software_1",
            "name":"Software's name",
            "profil":"img/profilpic.png",
            "spec":"Frontend web developer",
            "desc":'Description....',
            "img":"img/soft1.jpg",
            "imp":"soft1.jpg",
            "area":'Jijel, Algeria'

        },
        {
            "stars":4,
            'id':"software_2",
            "name":"Software's name",
            "profil":"img/profilpic.png",
            "spec":"Backend web developer",
            "desc":'Description....',
            "img":"img/soft2.jpg",
            "imp":"soft2.jpg",
            "area":'Constantine, Algeria'
            
        }
    ],
    "tourism":[]
}


var keys = ["doctors", "software", "house"]
var detail = ''

for(var i = 0; i < keys.length; i++){
    var data = serv[keys[i]]

    for(j = 0; j < data.length; j++){
        if(data[j].id == id){
            detail = data[j]
            break
        }
    }
}
console.log(detail)
document.querySelector('.detail h2').textContent = detail['name'];
document.querySelector('.detail #imd').setAttribute('src', detail["profil"]) 
document.querySelector('.detail #imp').setAttribute('src',"img/"+ detail["imp"]) 
var stars = ''
for(var i = 1; i <= detail.stars; i++){
    stars += `<i class="fa-solid fa-star gold" ></i>`
} 
for(var i = detail.stars; i < 6; i++){
    stars += `<i class="fa-solid fa-star"></i>`
} 

document.querySelector('.star').innerHTML = stars



document.querySelector('#validateForm').addEventListener('submit', function(e){
    e.preventDefault()
    $('input').val('')
    $('textarea').val('')
    document.querySelector(".success").style.display = "block"
    setTimeout(() => {
        document.querySelector(".success").style.display = "none"
    }, 3000);
})








// Région à rechercher
var region = detail.area;

// Construction de l'URL de requête
var url = "https://nominatim.openstreetmap.org/search?format=json&q=" + encodeURIComponent(region);

// Effectuer la requête HTTP
fetch(url)
  .then(response => response.json())
  .then(data => {
    // Extraire les coordonnées géographiques de la première réponse
    if (data.length > 0) {
      var latitude = data[0].lat;
      var longitude = data[0].lon;

      var map = L.map('map').setView([latitude, longitude], 14);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
            maxZoom: 18,
        }).addTo(map);
      console.log("Latitude: " + latitude + ", Longitude: " + longitude);
    } else {
      console.log("Aucun résultat trouvé");
    }
  })
  .catch(error => {
    console.log("Erreur lors de la requête : " + error);
  });