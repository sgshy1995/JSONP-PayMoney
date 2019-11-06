button.addEventListener('click', () => {
    $.ajax({
        url: "http://jack.com:8003/pay",
        dataType: "jsonp",
        success: function( response ) {
            if(response === 'success'){
            amount.innerText = amount.innerText - 1
            }
        }
        })
})