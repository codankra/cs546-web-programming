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

async function shouldTheyGoOutside(firstName, lastName){
    exists(firstName);
    exists(lastName);
    isString(firstName);
    isString(lastName);
    const person = await findPerson(firstName, lastName);
    const pZip = person.zip;
    const { data } = await axios.get('https://gist.githubusercontent.com/robherley/1b950dc4fbe9d5209de4a0be7d503801/raw/eee79bf85970b8b2b80771a66182aa488f1d7f29/weather.json')  
    for (let i = 0; i < data.length; i++) {
        if (data[i].zip == pZip) {
            if (data[i].temp >= 34) {
                return "Yes, " + firstName + " should go outside.";
            }else{
                return "No, " + firstName + " should not go outside.";
            }
        }
    }
    throw "Zip code not found in weather.json";
}

module.exports = {
    shouldTheyGoOutside
};