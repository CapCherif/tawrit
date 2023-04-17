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
            "img":"img/doc1.jpg"
        },
        {
            "stars":4,
            "id":"doc_2",
            "name":"Doctor's B name",
            "profil":"img/profilpic2.png",
            "spec":"Kinesitherapy",
            "desc":'Description....',
            "img":"img/doc2.jpg"
        },
        {
            "stars":3,
            "id":"doc_3",
            "name":"Doctor's C name",
            "profil":"img/profilpic.png",
            "spec":"Denstist",
            "desc":'Description....',
            "img":"img/doc3.jpg"
        }

    ]
    ,
    "house":[],
    "software":[
        {
            "stars":2,
            'id':"software_1",
            "name":"Software's name",
            "profil":"img/profilpic.png",
            "spec":"Frontend web developer",
            "desc":'Description....',
            "img":"img/soft1.jpg"
        },
        {
            "stars":4,
            'id':"software_2",
            "name":"Software's name",
            "profil":"img/profilpic.png",
            "spec":"Backend web developer",
            "desc":'Description....',
            "img":"img/soft2.jpg"
        }
    ],
    "tourism":[]
}


var keys = ["doctors", "software"]
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
document.querySelector('.detail img').setAttribute('src', detail["profil"]) 
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
