

$('#addgigs').submit((e)=>{
    e.preventDefault()
    console.log('running')

    $('#upload').text('chargement...')
    setTimeout(() => {
        $('input').val("")
        $('textarea').val("")
        $('.success').slideDown()
        $('#upload').text('Upload')

        
    }, 3000);
})