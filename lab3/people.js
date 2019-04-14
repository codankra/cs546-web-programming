const axios = require('axios');

function exists(input){
    if (typeof input == 'undefined'){
        throw "An input was expected but your input " 
        + input + " was empty or you need an extra parameter";
    }
    return true;
}
function isIndex(number){
    if (typeof(number) !== 'number' ||
    !isFinite(number) ||
    Math.round(number) != number){
        throw "Your input " + number + " was not an integer index";
    }
    return true;
}

async function getPersonById(id){
    //I am getting a person by id instead of index as described by Rob in his announcement
    exists(id);
    isIndex(id);
    const { data } = await axios.get('https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json');
    console.log(data.length);
    if (id > 0 && id<=data.length) {
        return data[id-1];
        //Due to uncertainty I am doing exactly what the description in the lab says:
        //"This will return the person at for the specified id within the people.json array." - as of 2/18/2019.
        //So, I am returning the PERSON object for the specified ID if the id is within the people.json array.
    }
    else{
        throw "Your id " + id + " is out of bounds/is not a valid present id."
    }
}
async function lexIndex(index){
    //make array then
    exists(index);
    isIndex(index);
    const { data } = await axios.get('https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json');
    let byLastName = data.slice(0);
    byLastName.sort(function(a,b) {
        a = a.lastName.toLowerCase();
        b = b.lastName.toLowerCase();
        if (a<b) {
            return -1;
        }else if (a>b) {
            return 1;
        } else {
            return 0;
        }
        //sorts list by last name in lexographical order
    });
    if (index > -1 && index<byLastName.length) {
        return byLastName[index].firstName + " " + byLastName[index].lastName;
    }
    else{
        throw "Your id " + index + " is out of bounds/is not a valid present id."
    }
    
}
async function firstNameMetrics(){
    const { data } = await axios.get('https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json');
    let totalLetters = 0;
    let totalVowels = 0;
    let totalConsonants = 0; //letterSum - vowelSum
    let maxNameLength = 0;
    let longestName = "";
    let shortestName = "";
    let minNameLength = 10000; //large number > expectations
    const vowelArr = "aeiouAEIOU";

    for (let i = 0; i < data.length; i++) {
        const name = data[i].firstName;
        //Metric 1: total Letters
        totalLetters += name.length;
        //Metric 2: total vowels
        for (let k = name.length - 1; k >= 0; k--) {
            for (let j = vowelArr.length - 1; j >= 0; j--) {
                if (vowelArr[j] == name[k]) //vowel match
                    totalVowels++;
            }
        }
        //Metric 4: longest name
        if (maxNameLength < name.length) {
            maxNameLength = name.length;
            longestName = name;     
        }
        //Metric 5: shortest name
        if (minNameLength > name.length) {
            minNameLength = name.length;
            shortestName = name;
        }
    }
    totalLetters -= 1; //Searching through all names, one space was found.
    //Metrix 3: consonantSum
    totalConsonants = totalLetters - totalVowels;
    return {
        totalLetters, 
        totalVowels, 
        totalConsonants, 
        longestName,
        shortestName
    };
}

module.exports = {
    getPersonById,
    lexIndex,
    firstNameMetrics
};