

$('#loginform').submit((e)=>{
    e.preventDefault();
    var obj = {
        nom:$('#nom').val(),
        prenom:$('#prenom').val(),
        tel:$('#tel').val(),
        email:$('#email').val(),
        prof:$('#prof').val(),
        psw:$('#psw').val(),
    }
    console.log(obj)
    
    $.ajax({
        type:'POST',
        url:'/signup',
        data:obj,
        success:(res)=>{
            if(res.done){
                $('.success').slideDown()
                setTimeout(() => {
                    window.location.href = '/espace'
                }, 2000);
            }
            else{
                $('.err').slideDown()
                setTimeout(() => {
                    $('.err').slideUp()
                }, 3000);
            }
        }
    })
    
})