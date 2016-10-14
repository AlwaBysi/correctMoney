function correctmoney (e, params) {
    let value,
        position,
        resultForCurrency,
        resultForSave;

    params = $.extend({
        forDisplay: true, // для отображения в дивах
        classOfDomElement: '',// классы DOM елементов через запятую без пробелов
        idOfDomElement: '',// id DOM елементов через запятую без пробелов
        //forInput: false,
        forSave: false, // function forSave - возвращает только цыфры с точкой
        negative: false,
        afterPoint: 2, // количество цифр после точки
        showPoint: true, // показывать точку до ввода копеек
        currency: 'руб.' // валюта
    }, params);

    if (!params.forSave) {
        position = doGetCaretPosition(e.currentTarget);
        value = $(e.currentTarget).val();
    } else {
        value = e;

    }

    if (params.negative) {
        if (value.indexOf('-') != -1) {
            result = value.split("-").length - 1;

            if (result > 1) {
                value = value.replace( /^([^\-]*\-)|\-/g, '$1' );
            }
        }
    }

    value = value.replace(/[^0-9.-]/, function (x) {
        --position;
        return '';
    });



    if (params.forDisplay) {

        if (!params.showPoint) {
            value = hidePoint (value);
        }

        if (params.afterPoint) {
            value = deleteAfterPoint(value, params.afterPoint);
        }

        resultForCurrency = addCurrency(value, params.currency);

        if (params.classOfDomElement != '') {
            forDisplay (params.classOfDomElement, 'class', resultForCurrency);
        }

        if (params.idOfDomElement != '') {
            forDisplay (params.idOfDomElement, 'id', resultForCurrency);
        }

    }

    if (params.forSave) {
        resultForSave = forSave(value);
        return resultForSave;
    }

    if (value.indexOf(',') + 1){
        value = (value.toString()).replace(',', '.');
    }

    if (!params.forSave) {
        setCaretPosition(e.currentTarget, position);
        $(e.currentTarget).val(value);
    }
    //$(e.currentTarget).val(value);
    //$('#resOne').text(value);
}

function addCurrency (value, paramCurrency) {
    value = value + ' ' + paramCurrency;

    return value;
}

function forSave (value, currency) {
    var result;

    if (value.indexOf(',')) {
        value = value.replace(',', '.');
    }

    if (value.indexOf(' ')) {
        value = value.replace(' ', '');
    }

    if (value.indexOf(/[^0-9.-]/)) {
        value = value.replace(/[^-0-9.]/gim,'');
    }

    return value;
}

function forDisplay($el, element, value) {

    if ($el.indexOf(',')) {
        $el = $el.split(',');

        if (element == 'class') {
            $el.forEach(function(item){
                $('body').find('.' + item).text(value);
            })
        } else {
            $el.forEach(function(item){
                $('body').find('#' + item).text(value);
            })
        }
    }
}

function hidePoint (value) {
    let cent, mainSum;

    if (value.indexOf('.') != -1 || value.indexOf(',') != -1) {
        if (value.indexOf('.') != -1 && !value.split('.')[1].length) {
            cent = value.split('.')[1];
            mainSum = value.split('.')[0];
            value = mainSum + cent;
        } else if (value.indexOf(',') != -1 && !value.split(',')[1].length) {
            cent = value.split(',')[1];
            mainSum = value.split(',')[0];
            value = mainSum + cent;
        }
    }

    return value;
}

function deleteAfterPoint (value, afterPoint) {
    let cent;

    if (value.split('.')[1] && value.split('.')[1].length) {
        cent = (value.split('.')[1]).substr(0, afterPoint);
        value = cent.substr(cent, afterPoint);
    } else if (value.split(',')[1] && value.split(',')[1].length) {
        cent = (value.split(',')[1]).substr(0, afterPoint);
        value = cent.substr(cent, afterPoint);
    }

    return value;
}

function doGetCaretPosition(ctrl) {
    var CaretPos = 0;

    if (ctrl.selectionStart || ctrl.selectionStart == 0) {// Standard.
        CaretPos = ctrl.selectionStart;
    } else if (document.selection) {// Legacy IE
        ctrl.focus ();
        var Sel = document.selection.createRange ();
        Sel.moveStart ('character', -ctrl.value.length);
        CaretPos = Sel.text.length;
    }

    return (CaretPos);
}

function setCaretPosition (ctrl,pos) {
    if (ctrl.setSelectionRange) {
        ctrl.focus();
        ctrl.setSelectionRange(pos,pos);
    } else if (ctrl.createTextRange) {
        var range = ctrl.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
}