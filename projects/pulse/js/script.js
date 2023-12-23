$(document).ready(function() {
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active')
            })
        });
    };
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //Modal windows
    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');

    })
    //Script for close modal window
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    })

    $('.button_mini').on('click', function() {
        $('.overlay, #order').fadeIn('slow');
    })
    
    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true, 
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                },
            }
        });
    };

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");


    $('form').submit(function(e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize(),
        }).done(function() {
            $(this).find('input').val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');

        });
        return false;
    });


    //Smoth scroll and pageup;

    $("a[href^='#up'").click(function() {
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });


    new WOW().init();
});

const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    dots: false,
    nav: false,
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.slider-btn').forEach(item => {
        
        item.addEventListener('click', (e) => {
            
            const target = e.currentTarget.dataset['side'];
            if(target === 'left') {
                slider.goTo('prev');
            }else {
                slider.goTo('next');
            }
        })
    })

    

    const catalogsTabs = document.querySelectorAll('.catalog__content');
    catalogsTabs.forEach(catalog => {
        catalog.addEventListener('click',(e) => {
            const target = e.target;
            if(target.closest('.button_mini')) {
                const currentGoodName = target.parentElement.parentElement.querySelector('.catalog-item__subtitle').textContent;
                document.querySelector('#order > .modal__descr').textContent = currentGoodName;
            }
        })
    })



    window.addEventListener('scroll', (e) => {
        const {top} = document.body.getBoundingClientRect();
        const pageUp = document.querySelector('.pageup');
        if(top <= -1600) {
            pageUp.style.display = 'block';
        }else {
            pageUp.style.display = 'none';
        }
    })

})





