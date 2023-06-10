

$('#loginform').submit(e=>{
    e.preventDefault()


    $.ajax({
        type:'POST',
        url:'/login',
        data:{email:$('#email').val(), psw:$('#psw').val()},
        success:(res)=>{
            if(res.done){
                $('.success').slideDown()
                setTimeout(() => {
                    window.location.href = "/espace"
                    
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