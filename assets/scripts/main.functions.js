
$(function () {

    'use strict';

    var $html = $('html'),
        $body = $('body'),
        $wrapper = $('.wrapper'),
        $masonryGrid = $('.masonry'),
        $window = $(window),
        $typed = $('.typed'),
        $content = $body.find('.content'),
        $topNav = $('<a href="#" id="to-top" class="anchor-link"><hr/><hr/></a>'),
        headerHeight = $body.find('header.header').height(),
        $anchorLink = $body.find('.anchor-link'),
        $anchorSection = $body.find('.anchor-section');

    setTimeout(function () {
        $html.addClass('loaded');
    }, 200);

    $body.append($topNav);

    $('a:not(.lightbox):not(.filter):not(.anchor-link):not([target=_blank]):not([href^="#"])').addClass('smooth');

    $body.on('click touch', '.smooth', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var href = $(this).attr('href');
        $html.removeClass('loaded');
        setTimeout(function () {
            window.location = href;
        }, 500);
    });

    $('.burger').on('click touch', function () {
        $body.toggleClass('menu-opened');
    });

    $('.menu-link').on('click touch', function () {
        $body.removeClass('menu-opened');
    });
    // The Masonry Grid

    // Used for ID's so multiple grids don't interfere by filtering
    var gridCount = 0;

    // Loop through grids
    $masonryGrid.each(function () {

        var grid = $(this);

        // Set the isotope
        grid.isotope({
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer'
        });

    });

    // Add filter functionality
    $body.on('click touch', '.grid-filters .filter', function (e) {

        e.preventDefault();
        e.stopImmediatePropagation();

        var el = $(this);
        var filters = el.attr('data-filter');
        var targetGrid = el.parents('.grid-filters').attr('data-target');
        var offset = el.offset().top;

        el.addClass('active').parent().siblings().find('.filter').removeClass('active');

        $masonryGrid.filter('#' + targetGrid).isotope({
            filter: filters
        });

        TweenMax.to('html,body', 1.5, {
            scrollTo: { y: offset, autoKill: false }, ease: Quint.easeInOut, onComplete: function () {

                var scrollmem = $window.scrollTop(); // Fix for scrolling to anchor issue
                $window.scrollTop(scrollmem);
                $body.removeClass('scrolled-up');

            }
        });

    });

    // Lets make filters mobile-friendly
    $body.on('click touch', '.grid-filters', function (e) {
        $(this).toggleClass('open');
    });

    $masonryGrid.on('arrangeComplete', animateItems);

    $html.find('header.header .has-dropdown').on('mouseover', function () {
        $wrapper.addClass('dropdown-hovered');
        $(this).addClass('hover');
    }).on('mouseout', function () {
        $wrapper.removeClass('dropdown-hovered');
        $(this).removeClass('hover');
    });

    $body.on('click touch', '.anchor-link', function (e) {

        e.preventDefault();
        e.stopImmediatePropagation();

        var anchor = $(this).attr('href');
        var offset = 0;

        $content.removeClass('faded');

        if (anchor == '#')
            offset = 0;
        else
            offset = $(anchor).offset().top;

        TweenMax.to(window, 1.5, {
            scrollTo: { y: offset, autoKill: false }, ease: Quint.easeInOut, onComplete: function () {

                var scrollmem = $window.scrollTop(); // Fix for scrolling to anchor issue
                window.location.hash = anchor;
                $window.scrollTop(scrollmem);
                $body.removeClass('scrolled-up');

            }
        });

    });

    // Transitions 

    $body.on('click touch', 'a', function (e) {

        $body.removeClass('menu-opened');

    });

    function setAnchors() {

        $anchorLink.each(function () {

            var href = $(this).attr('href');

            if (href !== '#') {
                var $anchorSection = $($(this).attr('href'));
                $anchorSection.addClass('anchor-section');
                $anchorSection.attr('data-pos', $anchorSection.offset().top);
            }

        });

        $anchorSection = $body.find('.anchor-section');

    }

    setAnchors();

    var lastScrollTop = 0;
    var scrollTop = 0;

    // On scroll
    $window.on('scroll', function () {

        scrollTop = $window.scrollTop();

        if (scrollTop > 0)
            $body.addClass('scrolled');
        else
            $body.removeClass('scrolled');

        if (scrollTop < lastScrollTop)
            $body.addClass('scrolled-up');
        else
            $body.removeClass('scrolled-up');

        lastScrollTop = scrollTop;
        animateItems();

    });

    $body.imagesLoaded(function () {
        window.requestAnimationFrame(function () {
            animateItems();
            animateText();
            nevoLightbox();
            $masonryGrid.isotope('layout');
        });
    });

    $window.bind("pageshow", function (event) {
        if (event.originalEvent.persisted)
            window.location.reload()
    });

    $window.bind("unload", function () {
        // FF Fix, nothing else needed
    });

    $('.nevo-slider').each(function () {
        $(this).nevoslider();
    });

    if ($typed.length) {

        var typeAnimation = new Typed('.typed', {
            stringsElement: '.typed-content',
            typeSpeed: 100,
            startDelay: 1200,
            showCursor: false
        });

    }


});
window.onload = function() {
    const bubble = document.querySelector('.bubble');
    
    // Set a timeout to hide the bubble after 5 seconds
    setTimeout(() => {
        bubble.classList.add('bubble-hidden');
    }, 10000); // 5000 milliseconds = 5 seconds
};

document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".fade", {
        opacity: 0,  // Start by setting the target opacity to 0
        ease: "none",
        scrollTrigger: {
            trigger: ".fade",
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
            onUpdate: (self) => {
                // When scrolling down, decrease opacity
                // When scrolling up, increase opacity
                self.progress = self.direction === 1 ? self.progress : 1 - self.progress;
            },
        }
    });
});
document.getElementById("contact-form quoteform").addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent the default form submission
    
    var form = e.target;
    var data = new FormData(form);

    fetch(form.action, {
        method: "POST",
        body: data
    })
    .then(function(response) {
        if (response.ok) {
            window.location.href = form.getAttribute("data-redirect");
        } else {
            alert("There was an issue with your submission. Please try again.");
        }
    })
    .catch(function(error) {
        console.error("Error:", error);
        alert("There was an error submitting the form. Please try again later.");
    });
});
    $(document).ready(function() {
        $('#phone').mask('0 (000) 000-0000', {
            translation: {
                '0': {pattern: /[0-9]/}
            },
            onKeyPress: function(phone, e, field, options) {
                // Update the mask if the user types a different country code
                var newMask = phone[0] === '1' ? '0 (000) 000-0000' : '000 (000) 000-0000';
                $(field).mask(newMask, options);
            }
        });
    });

    
    const phoneInputField = document.querySelector("#phone");
    const phoneInput = window.intlTelInput(phoneInputField, {
        initialCountry: "auto",
        geoIpLookup: function(success, failure) {
            fetch("https://ipinfo.io?token=YOUR_TOKEN_HERE") // Replace with your token
                .then(response => response.json())
                .then(data => success(data.country))
                .catch(() => success("US"));
        },
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    });

    // You can format the number on form submission like this:
    document.querySelector("#contact-form").addEventListener("submit", function() {
        const formattedNumber = phoneInput.getNumber();
        phoneInputField.value = formattedNumber;
    });
    document.querySelector("#phone").addEventListener("input", function(e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{1,4})(\d{1,4})?(\d{1,4})?/);
        e.target.value = x[1] + ' (' + (x[2] ? x[2] : '') + ') ' + (x[3] ? x[3] : '');
      });



