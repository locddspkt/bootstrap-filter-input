$.fn.bootstrapFilter = function (options) {
    //supported input: input, select
    var $inputItems = $(this);

    $.each($inputItems, function (index,input) {
        var $input = $(input);
        var validSelector = false;
        if ($input.is('input')) validSelector = true;
        if ($input.is('select')) validSelector = true;
        if (!validSelector) {
            console.log('invalid', $input);
            return false;
        }

        var wrapperSelector = $input.attr('data-wrapper-selector');
        var textSelector = $input.attr('data-text-selector');
        if ($input.is('select')) {
            $input.on('change', function (event) {
                var $select = $(this);
                var value = $select.val();

                filter(wrapperSelector, textSelector, value);
            });
        }

        if ($input.is('input')) {
            console.log('keyup add event');
            $input.on('keyup', function (event) {
                console.log('keyup in input');
                var $input = $(this);
                var value = $input.val();

                filter(wrapperSelector, textSelector, value);
            });
        }
    });

    function showAll(wrapperSelector) {
        $(wrapperSelector).removeAttr('hidden');
    }

    function filter(wrapperSelector, textSelector, value) {
        if (value === '') {
            showAll(wrapperSelector);
            return;
        }

        var wrapperControls = $(wrapperSelector);
        $.each(wrapperControls,function(index,wrapperControl) {
            var $textControls = $(textSelector,$(wrapperControl));
            var found = false;
            $.each($textControls, function(index,textControl) {
                var $textControl = $(textControl);
                var text = $textControl[0].innerText;
                if (text.indexOf(value) >= 0) {
                    //only need one match
                    found = true;
                    return false;
                }
            });

            if (found) {
                $(wrapperControl).removeAttr('hidden');
            }
            else {
                $(wrapperControl).attr('hidden','hidden');
            }
        });
    }

};