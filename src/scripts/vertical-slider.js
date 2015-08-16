jQuery(function($) {
  $.fn.verticalSlider = function() {
    var
        root = this,
        expanded = $('.sliderExpanded', root),
        height,
        verticalSlider = root,
        sliderPhantome = $('<div></div>')
                          .addClass('verticalSliderContent sliderPhantome')
                          .appendTo(verticalSlider),
        gimeDataHeight = function (el) {
            var height = sliderPhantome.html(el.html()).find('div').outerHeight(true);
            el.attr('data-height', height);
            return height;
        };
    expanded.attr('data-height', expanded.height());
    $('.verticalSliderHeader', root).click(

        function () {
            if ($(this).next().hasClass('sliderExpanded')) return;
            expanded.animate({
                'height': 0
            }).removeClass('sliderExpanded');
            expanded = $(this).next();
            height = expanded.attr('data-height') || gimeDataHeight(expanded);
            expanded.animate({
                'height': height
            }).addClass('sliderExpanded');
        }
    );
};
});