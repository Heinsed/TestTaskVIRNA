$(document).on('click', '#toggle_menu', function() {
    $('.main-menu').toggleClass('toggled');
});

$(document).ready(function() {
    $('.header-block').css('background-image', 'url(' + $('.slide-active').data('bg') + ')');
    let slides = 1;
    let i = 1;
    $('.middle-bar__slider .slide').each(function() {
        $(this).attr('id', 'slide-' + slides);
        slides++;
    })
    $('.header__slider-buttons h4').each(function() {
        $(this).attr('id', 'slide-' + i);
        i++;
    })
});

$('.header__slider-buttons h4').click(function() {
    $('.middle-bar__slider .slide').removeClass('slide-active');
    $('.middle-bar__slider .slide#' + $(this).attr('id')).addClass('slide-active');
    $('.header-block').css('background-image', 'url(' + $('.slide-active').data('bg') + ')');
    $('.header__slider-buttons h4').removeClass('active');
    $(this).addClass('active');

});

new WOW().init();