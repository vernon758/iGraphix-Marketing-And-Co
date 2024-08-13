// Animate! By ThemeVillain

var $body = $('body'),
    // Animated variables
    animatedEl = $body.find('.animated, .grid-item'),
    animatedText = $body.find('.animated-text'),
    $anchorSection = $body.find('.anchor-section'),
    $anchorLink = $body.find('.anchor-link');
        
function animateText(){

    // Text
    animatedText.each(function(){
        var el = $(this);
        var tl = new TimelineLite;
        var splitText = new SplitText(el, {type:"words,chars"}),
        chars = splitText.chars;

        el.inViewport(function(pos){
            if(pos > 0 && !el.hasClass('done-animating')){
                el.css('opacity', 1);
                el.addClass('done-animating');
                TweenMax.set(chars, {y: 0, opacity: 1});
                tl.staggerFrom(chars, 1, {delay: .3, y:80, opacity: 0, ease:Power3.easeOut}, 0.02, "+=0");
            }
        });
        
    });
}

function animateItems(){
    
    // Other elements
    animatedEl.each(function(){
        var el = $(this);
        el.inViewport(function(pos){
            if(pos > 0 && !el.hasClass('has-animated')){
                el.addClass('has-animated');
            }
        });
    });

}

function anchorSections(){

    // Change anchor links according to visible sections
    $anchorSection.inViewport(function(pos){
        var el = $(this);
        var hash = el.attr('id');
        var link = $anchorLink.filter('a[href="#'+hash+'"]');
        if(pos > 0 && pos > window.innerHeight/2 && !link.hasClass('active')){
            $anchorLink.removeClass('active');
            link.addClass('active');
        }
    });

}