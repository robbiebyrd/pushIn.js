$(document).ready(function () {
    
    // GLOBAL VARIABLES
    
    // Get initial screen height, page height, and scroll position
    var scrollPos = window.pageYOffset,
        viewHeight = $(window).height(),
        pageHeight = $('body').height(),
        scrollValue = scrollPos / (pageHeight - viewHeight),
        startTouchY = 0,
        touchScroll = scrollPos;
    
    $('.dot:nth-child(2) .content h4').html(Math.round(scrollValue * 100) / 100);

    // On scroll...
    /*$(window).scroll(function () {

        // Scroll position is updated
        scrollPos = window.pageYOffset;

        // Convert scroll position to a percentage of overall page size
        scrollValue = scrollPos / (pageHeight - viewHeight);

    });*/
    
    // For touch-screens, use event listeners for touch events
    
    $('body').bind({
        
        touchstart: function () {
            
            // Don't use the default browser actions for touches
            event.preventDefault();
            
            // Detect all touches
            var t = event.touches;
            
            //Get the initial location of the first touch on screen
            startTouchY = t[0].pageY;
            
            $('.dot:nth-child(2) .content h4').html(t.length);
        },
        touchmove: function () {
            
            // Don't use the default browser actions for touches
            event.preventDefault();
            
            var t = event.touches,
                currentTouchY = t[0].pageY;
            
            // Scroll position is updated, only if it's over value of 0
            if (scrollPos < 0) {
                scrollPos = 0;
            } else {
                scrollPos += (startTouchY - currentTouchY) * 0.01;
            }

            // Convert scroll position to a percentage of overall page size
            scrollValue = scrollPos / (pageHeight - viewHeight);
            
            $('.dot:nth-child(3) .content h4').html(Math.round(scrollValue * 100) / 100);
            
        },
        touchend: function () {
            if (scrollPos < 0) {
                scrollPos = 0;
            }
        }
        
    });
    
    // Begin JQuery plugin
    (function ($) {
        
        $.fn.extend({
            pushIn: function (options) {
                
                // Plugin option defaults
                var defaults = {
                    start: 0,
                    stop: 1,
                    speed: 0.75
                };
                
                options = $.extend(defaults, options);
                
                
                // Amount of growth after specified start point
                // Multiplied by desired speed
                var scaleValue = 1 + (
                        (scrollValue - defaults.start) * defaults.speed
                    );
                
                // Prevent negative scaleValue before start point
                if (scaleValue < 0) {
                    scaleValue = 0;
                }
                
                // For each item within JQuery object...
                this.each(function () {
                    
                    // Scale object to current scaleValue using CSS transform
                    $(this).css({
                        '-webkit-transform':
                            'scale(' + scaleValue + ')',
                        '-moz-transform':
                            'scale(' + scaleValue + ')',
                        '-ms-transform':
                            'scale(' + scaleValue + ')',
                        '-o-transform':
                            'scale(' + scaleValue + ')',
                        'transform':
                            'scale(' + scaleValue + ')'
                    });
                        
                });
                
                // If we've reached the start point and have not reached the stop point...
                if (defaults.start <= scrollValue && defaults.stop >= scrollValue) {
                    this.each(function () {
                        
                        // Make this object visible by fading in
                        $(this).stop().animate({ opacity: 1 }, 100);
                        
                    });
                
                } else {
                    
                    this.each(function () {
                        
                        // If not, make this object invisible by fading out
                        $(this).stop().animate({ opacity: 0 }, 100);
                        
                    });
                    
                }
                
            }
        });
        
    }(jQuery));

    
});