# correctMoney

 At now script ready to use only for div or span element.<br>
 If you won't to use script you need to add link in your file to your file <br>
 and add event to input like: <input type="text" class="correctMoney" onkeyup="correctmoney()"><br>
 in function correctMoney you need to transfer to event object and params like <br>
 correctmoney(event, {forDisplay: true, classOfDomElement: 'resOne,resTwo', showPoint: false})<br>

 function correctMoney have default params <br>
        forDisplay: true, // use it to display result of function in div or span <br>
        classOfDomElement: '',// DOM classes of elements separated by commas without spaces<br>
        idOfDomElement: '',// id DOM of elements separated by commas without spaces<br>
        //forInput: false, // coming soon<br>
        forSave: false, // function forSave - return only numbers with point<br>
        negative: false, // enable or disable the negative view of the front of the number <br>
        afterPoint: 2, // the number of digits after the decimal point<br>
        showPoint: true, // show the entry point to cents<br>
        currency: 'руб.' // currency<br>
