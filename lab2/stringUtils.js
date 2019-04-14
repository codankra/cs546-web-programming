const aU = require('./arrayUtils.js');

function isString(input) {
    if (typeof input === 'string' || input instanceof String){
        return true;
    }
    else{
        throw "Your input " + input + " is not a string";
    }
}
function posNum(number){
    if (typeof(number) != 'number' || !isFinite(number)){
        throw "Your input " + number + " is not a number";
    }
    if (number < 0){
        throw "Your number " + number + " is not positive (or 0)";
    }
    return true;
}
function capitalize(string) {
    aU.exists(string);
    isString(string);
    let str2 = "";
    //Add all lower-case elements to string
    for (let i = 1; i < string.length; i++) {
        str2 = str2 + string[i];
    }
    str2 = str2.toLowerCase();
    let result = "";
    //add first char if exists
    if(string.length>0){
        result = string[0];
        result = result.toUpperCase();
    }
    //combine
    return result + str2;
}
function repeat(string, num) {
    aU.exists(string);
    isString(string);
    aU.exists(num);
    posNum(num);
    let result = "";
    //now add string to result i times
    for (let i = 0; i < Math.floor(num); i++) {
        result = result + string;
    }
    return result;
}
function countChars(string) {
    aU.exists(string);
    isString(string);
    return aU.countElements(Array.from(string));
    //Uses array element counting method
    //Chars are elements of strings when string -> array
}

module.exports = {
    capitalize,
    repeat,
    countChars
};