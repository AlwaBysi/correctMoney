# correctMoney

 At now script ready to use only for div or span element.
 If you won't to use script you need to add link in your file to your file 
 and add event to input like: <input type="text" class="correctMoney" onkeyup="correctmoney()">
 in function correctMoney you need to transfer to event object and params like 
 correctmoney(event, {forDisplay: true, classOfDomElement: 'resOne,resTwo', showPoint: false})

 function correctMoney have default params 
        forDisplay: true, // use it to display result of function in div or span 
        classOfDomElement: '',// DOM classes of elements separated by commas without spaces
        idOfDomElement: '',// id DOM of elements separated by commas without spaces
        //forInput: false, // coming soon
        forSave: false, // function forSave - return only numbers with point
        negative: false, // enable or disable the negative view of the front of the number
        afterPoint: 2, // the number of digits after the decimal point
        showPoint: true, // show the entry point to cents
        currency: 'руб.' // currency
