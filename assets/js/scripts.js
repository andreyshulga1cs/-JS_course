$(window).scroll(function() {
    let header = $('header');
    let scrollHeight = document.body.scrollTop || document.documentElement.scrollTop;

    if (scrollHeight > 0) {
        header.addClass('fixed');
    } else {
        header.removeClass('fixed');
    }
});

$('.burger-btn').on('click', function() {
    $('header').toggleClass('open');
    $('body').toggleClass('no-scroll');
})
$('header .header-menu li.with-dropdown').on('click', function() {
    $('header .header-menu li.with-dropdown .dropdown').stop().slideUp(500);
    $(this).find('.dropdown').stop().slideToggle(500);
})