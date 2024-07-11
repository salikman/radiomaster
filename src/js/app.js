import * as flsFunctions from "./modules/functions.js";
import * as lazyLoad from "./modules/lazyload.js";

flsFunctions.isWebp();
lazyLoad.lazyLoad();

$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        992:{
            items:3
        }
    }
})

/* ******************************************************************** */
/* ********************************counter***************************** */
window.addEventListener("load", function () {
    if (document.querySelector('.numbers__list')) {
        counter();
    }
});
function counter() {
    function digitsCountersInit(digitsCountersItems) {
        let digitsCounters = digitsCountersItems ? digitsCountersItems : document.querySelectorAll('[data-digits-counter]');

        if (digitsCounters) {
            digitsCounters.forEach(digitsCounter => {
                digitsCountersAnimate(digitsCounter);
            })
        }
    }

    function digitsCountersAnimate(digitsCounter) {
        let startTimestamp = null;
        const duration = parseInt(digitsCounter.dataset.digitsCounter) ? parseInt(digitsCounter.dataset.digitsCounter) : 1000;
        const startValue = parseInt(digitsCounter.innerHTML);
        const startPosition = 0;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            digitsCounter.innerHTML = Math.floor(progress * (startPosition + startValue));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        }
        window.requestAnimationFrame(step)
    }

    // digitsCountersInit();

    let options = {threshold : 0.3}
    let observer = new IntersectionObserver((entries, observe) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetElement = entry.target;
                const digitsCountersItems = targetElement.querySelectorAll('[data-digits-counter]');
                if (digitsCountersItems.length) {
                    digitsCountersInit(digitsCountersItems);
                }
            }
        })
    }, options);

    let section = document.querySelector('.numbers__list');
    observer.observe(section)

}

///////////////////////////
// Scrollspy
$(document).ready(function(){

    var sectionIds = $('a.nav-link');

    $(document).scroll(function(){
        sectionIds.each(function(){

            var container = $(this).attr('href');
            var containerOffset = $(container).offset().top;
            var containerHeight = $(container).outerHeight();
            var containerBottom = containerOffset + containerHeight;
            var scrollPosition = $(document).scrollTop();

            if(scrollPosition < containerBottom - 20 && scrollPosition >= containerOffset - 20){
                $(this).addClass('active');
            } else{
                $(this).removeClass('active');
            }


        });
    });



});
///////////////////////////
// Smooth scroll
$(".header__menu > ul > li > a[href^='#']").on('click', function(e) {
    e.preventDefault();
    var hash = this.hash;
    var offset = $(window).width() >= 992 ? 165 : 66;

    $('html, body').animate({
        scrollTop: $(this.hash).offset().top - offset
    }, 600);
});
$(".footer__menu nav a[href^='#']").on('click', function(e) {
    e.preventDefault();
    var hash = this.hash;
    var offset = $(window).width() >= 992 ? 165 : 66;

    $('html, body').animate({
        scrollTop: $(this.hash).offset().top - offset
    }, 600);
});

$('#back-to-top').on('click', function(){
    $('body,html').animate({
        scrollTop: 0
    }, 600);
});

///////////////////////////
// Btn nav collapse
$('.header__collapse').on('click', function() {
    $('.header').toggleClass('open-menu');
});
$('.has-dropdown a').on('click', function() {
    $(this).parent().toggleClass('open-drop');
});
///////////////////////////
// On Scroll
$(window).on('scroll', function() {
    var wScroll = $(this).scrollTop();

    // Fixed nav
    wScroll > 70 ? $('.header').addClass('fixed-nav') : $('.header').removeClass('fixed-nav');

    // Back To Top Appear
    wScroll > 700 ? $('#back-to-top').fadeIn() : $('#back-to-top').fadeOut();
});

///////////////////////////
// reviews more
const reviewElements = document.querySelectorAll('.review__text');

reviewElements.forEach(element => {
    const text = element.textContent.trim();
    let originalText = text;

    if (text.length > 100) {
        const shortenedText = text.slice(0, 100) + '...';
        element.textContent = shortenedText;

        const moreButton = element.nextElementSibling;

        const toggleButtonText = () => {
            if (moreButton.textContent === 'MORE') {
                moreButton.textContent = 'HIDE';
            } else {
                moreButton.textContent = 'MORE';
            }
        };

        moreButton.addEventListener('click', () => {
            if (element.textContent === shortenedText) {
                element.textContent = originalText;
                toggleButtonText();
            } else {
                element.textContent = shortenedText;
                toggleButtonText();
            }
        });
    }
});