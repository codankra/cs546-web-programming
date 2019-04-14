function isDefined(object){
    if (object == undefined) {
        throw "Your input " + object + " is undefined."
    }
    return true;
}
function isObj(object) {
    if(object && typeof object === 'object' && !(object instanceof Array)){
        return true;
    }
    else{
        throw "Your input " + object + " is an array or non-object argument";
    }
    
}
function isFunc(func){
    if (typeof func === "function") {
        return true;
    }
    else{
        throw "Your input " + func + " is not of type function";
    }
}
function extend(...args) {
    foo = { };
    if (args.length < 2) {
        throw "extend takes at least two arguments. You gave " + args.length;
    }
    for (let i = 0; i < args.length; i++) {
        let currentObj = args[i];
        isDefined(currentObj);
        isObj(currentObj);
        for (var j in currentObj) {
            if (currentObj.hasOwnProperty(j)) {
                //check for preserving previous key-values
                if (foo[j] == undefined) {
                    foo[j] = currentObj[j];
                }
            }
        }
    }
    return foo;
}
function smush(...args) {
    foo = { };
    if (args.length < 2) {
        throw "smush takes at least two arguments. You gave " + args.length;
    }
    for (let i = 0; i < args.length; i++) {
        let currentObj = args[i];
        isDefined(currentObj);
        isObj(currentObj);
        for (var j in currentObj) {
            if (currentObj.hasOwnProperty(j)) {
                //do not check for preserving previous key-values
                foo[j] = currentObj[j];
            }
        }
    }
    return foo;
    
}
function mapValues(object, func) {
    isDefined(object);
    isObj(object);
    isFunc(func);
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            object[key] = func(object[key]);
            /* if ("function cannot be applied to this object") {
            throw "function cannot be applied in mapValues"
            } */
        }
    }
    return object;
    
}
module.exports = {
    extend,
    smush,
    mapValues
};