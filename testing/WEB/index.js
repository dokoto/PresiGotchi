$(document).ready(function() {
    $.ajax({
        'url': 'http://localhost/Users/malfaros/DEV/JAVASCRIPT/PresiGotchi/testing/SERV/randImgs.php?buscar=cats'
    }).done(function(response) {
        var images = response.filter(function(obj) {
            if (obj.indexOf('http') !== -1) return obj;
        }).slice(4);
        $('.slider-item-background').each(function(index, value) {
            $(value).css("background-image", "url(" + images[index] + ")");
        });
    });

    $('#container-region').click(function() {
        $('#t1').fadeOut(2000);
        $('#cc1').fadeIn(3000);
    });
});
