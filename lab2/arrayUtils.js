function exists(input){
    if (typeof input == 'undefined'){
        throw "An input was expected but your input " 
        + input + " was empty";
    }
    return true;
}
function isArray(array){
    if (!(array instanceof Array)){
        throw "Your input " 
        + array + " is not an instance of an array";
    }
    return true;
}
function isNotEmpty(array){
    if (array.length == 0){
        throw "An inputted array was unexpectedly empty";
    }
    return true;
}
function posInt(number){
    if (typeof(number) != 'number' ||
    !isFinite(number) ||
    Math.round(number) != number){
        throw "Your input " + number + " was not an integer";
    }
    if (number < 1){
        throw "Your integer" + number + " was not greater than 0";
    }
    return true;
}

function head(array) {
    exists(array);
    isArray(array);
    isNotEmpty(array);
    return array[0];
}
function last(array) {
    exists(array);
    isArray(array);
    isNotEmpty(array);
    return array[array.length - 1];
}
function remove(array, index) {
    exists(array);
    exists(index);
    isArray(array);
    isNotEmpty(array);
    if(index>(array.length-1) || index < 0){
        throw "Index " + index + " is out of bounds!";
    }
    array.splice(index, 1);
    return array;
}
function range(end, value) {
    exists(end);
    posInt(end);
    const foo = [];
    //check for value
    if (typeof value != 'undefined'){
        for (let index = 0; index < end; index++) {
            foo[index] = value;
        }
    } else {
        for (let index = 0; index < end; index++) {
            foo[index] = index;
        }
    }
    return foo;
}
function countElements(array) {
    exists(array);
    isArray(array);
    //Initialize object
    const foo = { };
    for (let index = 0; index < array.length; index++) {
        let element = array[index];
        //Initialize foo[element]
        if (foo[element] == undefined){
            foo[element] = 1;
        }
        else{
            foo[element] += 1;
        }
    }
    return foo;
}
function isEqual(arrayOne, arrayTwo) {
    exists(arrayOne);
    isArray(arrayOne);
    exists(arrayTwo);
    isArray(arrayTwo);
    if (arrayOne.length != arrayTwo.length){
        return false;
    }
    for (let index = 0; index < arrayOne.length; index++) {
        if (arrayOne[index] !== arrayTwo[index]) {
            return false;
        }
    }
    return true;
}

module.exports = {
    firstName: "Daniel", 
    lastName: "Kramer",
    studentId: "10426217",
    remove,
    last,
    head,
    range,
    countElements,
    isEqual,
    exists
};