


$('#burger').on('click', function(){
    $('#vertnav').slideToggle(300)
})





// $('#list').on('click', function(){
//     if($('#cat_a_vert').css('margin-left') == "-240px"){
//         $('#cat_a_vert').animate({"margin-left":"0px"}, 300)
//         $('#voile').show()
//     }
//     else{
//         $('#cat_a_vert').animate({"margin-left":"-240px"}, 300)
//         $('#voile').hide()
//     }
// })

window.addEventListener("resize", function(event) {
    if(document.body.clientWidth >= 800){

        // $('#voile').fadeOut(50)
        $('#vertnav').slideUp()
    }
})





// $(window).on('beforeunload', function() {
//     localStorage.setItem('ids', JSON.stringify([]))
// });