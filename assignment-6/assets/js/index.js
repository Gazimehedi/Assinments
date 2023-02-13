var nav_offset_top = $('header').height() + 50;
function navbarFixed() {
    if ($('header').length) {
        $(window).scroll(function () {
            var scroll = $(window).scrollTop();
            if (scroll >= nav_offset_top) {
                $('header').addClass('navbar_fixed');
            } else {
                $('header').removeClass('navbar_fixed');
            }
        });
    }
}
navbarFixed();
$('.testimonial-slider').owlCarousel({
    loop: false,
    margin: 30,
    items: 1,
    autoplay: false,
    smartSpeed: 2500,
    dots: true
});
$('.brand-carousel').owlCarousel({
    items: 1,
    autoplay: false,
    loop: true,
    nav: false,
    margin: 30,
    dots: false,
    responsive: {
        0: {
            items: 1,
        },
        420: {
            items: 1,
        },
        480: {
            items: 3,
        },
        768: {
            items: 3,
        },
        992: {
            items: 5,
        }
    }
});

$(window).on('load', function () {
    $('.portfolio-filter ul li').on('click', function () {
        $('.portfolio-filter ul li').removeClass('active');
        $(this).addClass('active');

        var data = $(this).attr('data-filter');
        $workGrid.isotope({
            filter: data
        });
    });

    if (document.getElementById('portfolio')) {
        var $workGrid = $('.portfolio-grid').isotope({
            itemSelector: '.all',
            percentPosition: true,
            masonry: {
                columnWidth: '.grid-sizer'
            }
        });
    }
});
