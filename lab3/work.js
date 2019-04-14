const axios = require('axios');

function exists(input){
    if (typeof input == 'undefined'){
        throw "An input was expected but your input " 
        + input + " was empty or you need an extra parameter";
    }
    return true;
}
function isString(input) {
    if (typeof input === 'string' || input instanceof String){
        return true;
    }
    else{
        throw "Your input " + input + " is not a string";
    }
}
async function findPerson(firstName, lastName){
    //validate inputs beore passing to this function
    const { data } = await axios.get('https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json');
    for (let i = 0; i < data.length; i++) {
        if (data[i].firstName === firstName && data[i].lastName === lastName){
            return data[i];
        }
    }
    throw firstName + " " + lastName + " does not exist in the people.json file."

    
}
async function findSSNIfIpExists(ip) {
    //only pass validated ip string representations
    const { data } = await axios.get('https://gist.githubusercontent.com/robherley/61d560338443ba2a01cde3ad0cac6492/raw/8ea1be9d6adebd4bfd6cf4cc6b02ad8c5b1ca751/work.json');
    for (let i = 0; i < data.length; i++) {
        if (data[i].ip === ip){
            return data[i].ssn;
        }
    }
    throw "The ip " + ip + " was not found in the work.json file.";

}
async function whereDoTheyWork(firstName, lastName){
    exists(firstName);
    exists(lastName);
    isString(firstName);
    isString(lastName);
    const person = await findPerson(firstName, lastName);
    const pSSN = person.ssn;
    const { data } = await axios.get('https://gist.githubusercontent.com/robherley/61d560338443ba2a01cde3ad0cac6492/raw/8ea1be9d6adebd4bfd6cf4cc6b02ad8c5b1ca751/work.json');
    for (let i = 0; i < data.length; i++) {
        if (data[i].ssn == pSSN) {
            return firstName + " " + lastName + " - " 
            + data[i].jobTitle + " at " + data[i].company + ". They will "
            + (data[i].willBeFired ? "" : "not ") + "be fired.";
        }
    }
    throw "SSN of person not found in work.json";
}

async function findTheHacker(ip){
    exists(ip);
    isString(ip);
    const ipSSN = await findSSNIfIpExists(ip);
    const { data } = await axios.get('https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json');
    for (let i = 0; i < data.length; i++) {
        if (data[i].ssn == ipSSN) {
            return data[i].firstName + " " + data[i].lastName + " is the hacker!";
        }
    }
    throw "SSN of person with " + ip + "not found in people.json file.";

}

module.exports = {
    whereDoTheyWork,
    findTheHacker
};