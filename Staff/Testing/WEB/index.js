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
        $('#slider-configurator-step').fadeIn(3000);
    });

    $('.slider-item ').click(function(ev) {
        var self = this;
        $(this).parent().find('.slider-item').each(function(index, value) {
            reset(this);
        }).promise().done(function() {
            toggle(self);
        });
    });
});

function reset(el) {
    $(el).find('.slider-item-response').css('color', 'black');
    $(el).find('.slider-item-response').css('background-color', 'white');
}

function toggle(el) {
    if ($(el).find('.slider-item-response').css('color') === 'rgb(0, 0, 0)') {
        $(el).find('.slider-item-response').css('color', 'white');
        $(el).find('.slider-item-response').css('background-color', 'black');
    } else {
        $(el).find('.slider-item-response').css('color', 'black');
        $(el).find('.slider-item-response').css('background-color', 'white');
    }
}
