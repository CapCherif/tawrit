

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

function SearchServices(){
    var value = document.querySelector('select').value
    document.querySelector('#container_serv').innerHTML = ""
    document.querySelector('.container_ring').style.display = "block"
    setTimeout(() => {
        CreateTemplate(serv[value])
        document.querySelector('.container_ring').style.display = "none"
    }, 1000);
}


function CreateTemplate(data){
    var template = ""
    if(data.length != 0){

    
        data.forEach(element => {
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
                            ${element.desc}
                        </p>
                        <a href="/detail?id=${element.id}">Inbox</a>
                    </div>
                </div>
            </div>
            
            `
        });

    }
    else {
        template = "<p>No yet services.</p>"
    }
    
    document.querySelector('#container_serv').innerHTML = template

}

const searchParams = new URLSearchParams(window.location.search);
const cat = searchParams.get('categorie');

if(cat != null){
    console.log(cat);
    CreateTemplate(serv[cat])
}

else{
    CreateTemplate(serv['doctors'])
}


// CreateTemplate(serv.doctors)



