/*

Nevo Slider JS
Version 1.0
Made by ThemeVillain

*/

;(function($) {

    $.fn.nevoslider = function( options ) {
  
      var slider        = this,
      $window           = $(window),
      $body             = $('body'),
      slides            = slider.find('.slides'),
      slide             = slider.find('.slide'),
      sliderWidth       = slider.outerWidth(),
      curPos            = 0,
      curSlide          = 1,
      slideCount        = slide.length,
      activeSlide       = slide.first().addClass('active');

    if(activeSlide.hasClass('light-text') && slider.is(':first-child'))
      $body.addClass('header-inverted');

    var s = 0;

    slide.each(function(){
      $(this).attr('data-slide', s);
      s++;
    });
  
    slider.on('mousemove', function(e){

      setCursor(e);
      
    });

    slider.swipe({

      swipe:function(e, direction){

        slideTo(direction);

      },

      tap:function(){
        
        slideTo(slider.attr('data-direction'));

      }

    });

    function setCursor(e){
      var sOffset = slider.offset();
    
      if(e.pageX - sOffset.left > slider.width()/2)
        slider.attr('data-direction','left');
      else
        slider.attr('data-direction','right');
    }
    
    function slideTo(direction){

      if(direction == 'left'){
        curSlide++;
        if(curSlide > slideCount){
          curSlide = 1; 
        }
      }

      if(direction == 'right'){
        curSlide--;
        if(curSlide == 0){
          curSlide = slideCount; 
        }
      }

      slideAnimation();

      if(activeSlide.has('video'))
        activeSlide.find('video').trigger('pause'); // Pause of previous
      
      // Define new active slide
      activeSlide = slide.filter('[data-slide="'+(curSlide-1)+'"]');
      activeSlide.addClass('active').siblings().removeClass('active');

      if(activeSlide.has('video'))
        activeSlide.find('video').trigger('play'); // Play on new

      if(activeSlide.hasClass('light-text') && slider.is(':first-child'))
        $body.addClass('header-inverted');
      else
        $body.removeClass('header-inverted');

    }      

    function slideAnimation(){

      curPos = -(curSlide-1)*sliderWidth;
      TweenMax.to(slides, 1, {x : curPos, ease: Power4.easeInOut, onComplete: animateText } );

    }

    $window.on('resize', function(){

      sliderWidth = slider.outerWidth();
      slideAnimation();

    });

    return this;

  }

})(jQuery);
