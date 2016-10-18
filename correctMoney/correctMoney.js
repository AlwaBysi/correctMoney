$(document).ready(function(color, width){
   let $el = $('#correctMoney'),
       elHead = $("head"),
       correctMoneyCss,
       borderColor = $el.data('borderColor'),
       inputWidth = $el.data('inputWidth'),
       focusColor = $el.data('focusColor');

    elHead.append("<link>");
    correctMoneyCss = elHead.children(":last");

    correctMoneyCss.attr({
        rel:  'stylesheet',
        href: 'correctMoney/correctMoney.css'
    });

    elHead.append('<style></style>');
    var new_stylesheet = elHead.children(':last');

    new_stylesheet.html('#correctMoney {' +
        (borderColor ? 'border-bottom: 2px solid '+ borderColor +';' : '') +
        (inputWidth ? 'width: '+ inputWidth +';' : '') +
        '}');

    focusColor ? new_stylesheet.append('#correctMoney:focus {' +
        'border-bottom: 2px solid '+ focusColor +';'+
        '}') : '';
});

function correctmoney (e, params) {
    let value,
        position,
        resultForCurrency,
        resultForSave,
        valueForInput;

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
                valueForInput = value.replace( /^([^\-]*\-)|\-/g, '$1' );
            }
        }
    }

    valueForInput = value.replace(/[^0-9.,-]/, function (x) {
        --position;
        return '';
    });

    value = valueForInput;

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
        $(e.currentTarget).val(valueForInput);
        setCaretPosition(e.currentTarget, position);

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
    let splitValue;

    if (value.indexOf('.') != -1){
        splitValue = '.'
    } else if (value.indexOf(',') != -1){
        splitValue = ','
    } else {
        return value;
    }

    return hidePointBodyFunction(value, splitValue);
}

function hidePointBodyFunction (value, splitValue){
    let cent, mainSum, result;

    if (value.indexOf(splitValue) != -1 && !value.split(splitValue)[1].length){
        cent = value.split(splitValue)[1];
        mainSum = value.split(splitValue)[0];
        result = mainSum + cent;
    } else {
        result = value;
    }

    return result;
}

function deleteAfterPoint (value, afterPoint) {
    let splitValue;

    if (value.indexOf('.') != -1){
        splitValue = '.'
    } else if (value.indexOf(',') != -1){
        splitValue = ','
    } else {
        return value;
    }

    return deleteAfterPointBodyFunction(value, afterPoint, splitValue);
}

function deleteAfterPointBodyFunction(value, afterPoint, splitValue){

    if (value.split(splitValue)[1] && value.split(splitValue)[1].length) {
        cent = (value.split(splitValue)[1]).substr(0, afterPoint);

        return value.split(splitValue)[0] + splitValue + cent;
    }
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