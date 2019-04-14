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
function isString(input) {
    if (typeof input === 'string' || input instanceof String){
        return true;
    }
    else{
        throw "Your input " + input + " is not a string";
    }
}

async function getPersonById(id){
    //I am getting a person by id instead of index as described by Rob in his announcement
    exists(id);
    isIndex(id);
    const { data } = await axios.get('https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json');
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
async function getPeopleBySubname(subname){
    //I am getting a person by id instead of index as described by Rob in his announcement
    exists(subname);
    isString(subname);
    subname = subname.toLowerCase();

    const { data } = await axios.get('https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json');
    const retData = [];
    for (let i = 0; i<data.length; i++) {
        const str = data[i].firstName.toLowerCase() + " " + data[i].lastName.toLowerCase();
        if(str.includes(subname)){
            retData.push(data[i]);
        }
    }
    return retData.slice(0,20);
}

module.exports = {
    getPersonById,
    getPeopleBySubname
};