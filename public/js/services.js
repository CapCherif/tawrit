

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
            "area":'Constantine, Algeria'
            
        }
    ],
    "tourism":[]
}

function SearchServices(){
    var domaine = document.querySelector('#domaine').value
    var area = document.querySelector('#area').value
    document.querySelector('#container_serv').innerHTML = ""
    document.querySelector('.container_ring').style.display = "block"
    setTimeout(() => {
        CreateTemplate(serv[domaine], area)
        document.querySelector('.container_ring').style.display = "none"
    }, 1000);
}


function CreateTemplate(data, area){
    var template = ""
    if(data.length != 0){

    
        data.forEach(element => {
            if(element.area.toLowerCase().indexOf(area.toLowerCase()) != -1 ){
                var stars = ''
                for(var i = 1; i <= element.stars; i++){
                    stars += `<i class="fa-solid fa-star gold" ></i>`
                } 
                for(var i = element.stars; i < 6; i++){
                    stars += `<i class="fa-solid fa-star"></i>`
                } 
                stars = '<div>'+stars+'</div>'
                template += `
                <div class="serv">
                    <img src="${element.profil}" alt="" class="profil">
                    <div>
                        <img src="${element.img}" alt="">
                        <div style="padding:10px">

                            <div>${element.name}</div>
                            <small class="spec">${element.spec}</small>
                            `
                            + stars+
                            `
                            
                            <p class="desc">
                                ${element.area}
                            </p>
                            <a href="/detail?id=${element.id}">Inbox</a>
                        </div>
                    </div>
                </div>
                
                `
            }

        });

    }
    else {
        template = "<p>No yet services.</p>"
    }
    
    document.querySelector('#container_serv').innerHTML = template
    if(template == ""){
        template = "<p>No yet services.</p>"
        document.querySelector('#container_serv').innerHTML = template
    }
}

const searchParams = new URLSearchParams(window.location.search);
const cat = searchParams.get('categorie');

if(cat != null){
    console.log(cat);
    CreateTemplate(serv[cat], "")
}

else{
    CreateTemplate(serv['doctors'], "")
}


// CreateTemplate(serv.doctors)



