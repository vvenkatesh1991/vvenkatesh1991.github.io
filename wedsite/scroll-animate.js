/* Check Which Section Visible on screen*/
$(document).ready(function() {
    var $animation_elements = $('.animate-box');
    var $window = $(window);    
    function check_if_in_view() {
        var window_height = $window.height();
        var window_top_position = $window.scrollTop();
        var window_bottom_position = (window_top_position + window_height);

        $.each($animation_elements, function() {
            var $element = $(this);
            var element_height = $element.outerHeight();
            var element_top_position = $element.offset().top;
            var element_bottom_position = (element_top_position + element_height);

            //check to see if this current container is within viewport
            if ((element_bottom_position > window_top_position) &&
                (element_top_position < window_bottom_position)) {
                $element.addClass('in-view');                
                var cls = ".in-view .animated";
                $(cls).each(function() {
                    var animationName = $(this).attr("data-animate");                    
                    if (animationName !== undefined) {
                        /* Chrome & Safari */
						//$(this).css('-webkit-animation-duration', $(this).attr("data-duration"));
						/*Mozila*/
						//$(this).css('-moz-animation-duration', $(this).attr("data-duration"));
						/*Opera*/
						//$(this).css('-o-animation-duration', $(this).attr("data-duration"));
						/* Chrome & Safari */
                                                $(this).css('-webkit-animation-duration','2s');
						/*Mozila*/
						$(this).css('-moz-animation-duration','2s');
						/*Opera*/
						$(this).css('-o-animation-duration','2s');
						/* Chrome & Safari */
                                                $(this).css('-webkit-animation-delay', $(this).attr("data-delay"));
						/*Mozila*/
						$(this).css('-moz-animation-delay', $(this).attr("data-delay"));
						/*Opera*/
						$(this).css('-o-animation-delay', $(this).attr("data-delay"));
                        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                        $(this).addClass(animationName).one(animationEnd, function() {
                            $(this).removeClass('animated ' + animationName)
                        });
                    }
                });
            } else {
                $element.removeClass('in-view');
            }
        });
    }
    $window.on('scroll resize', check_if_in_view);
    $window.trigger('scroll');
});