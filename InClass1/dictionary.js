const words ={
    programming: "The action or process of writing computer programs.",
    charisma: "A personal magic of leadership arousing special popular loyalty or enthusiasm for a public figure (such as a political leader)",
    sleuth: "To act as a detective : search for information",
    foray: "A sudden or irregular invasion or attack for war or spoils : raid",
    adjudicate: "to make an official decision about who is right in (a dispute) : to settle judicially"
}

function checkInput(input) {
    if (typeof input === 'string' || input instanceof String){
        return input;
    }
    else{
        throw "input not string";
    }
}

function lookupDefinition(inputVal) {
    checkInput(inputVal);
    if (words[inputVal] != undefined)
        return words[inputVal];
    else throw "word not found";

}
function getWord(definitionW){
    checkInput(definitionW);
    let getWord = Object.keys(words).find(key => words[key] === definitionW);
    if (getWord == undefined){
        throw "Word not found";
    }
    return getWord;
}
module.exports = {
    firstName: "Daniel", 
    lastName: "Kramer", 
    studentId: "10426217",
    lookupDefinition,
    getWord
};