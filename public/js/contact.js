document.querySelector('#validateForm').addEventListener('submit', function(e){
    e.preventDefault()
    $('input').val('')
    $('textarea').val('')
    document.querySelector(".success").style.display = "block"
    setTimeout(() => {
        document.querySelector(".success").style.display = "none"
    }, 3000);
})