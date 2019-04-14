//I pledge my honor that I have abided by the Stevens Honor System - Daniel Kramer
const peeps = require('./people.js');
const sky = require('./weather.js');
const jobs = require('./work.js');
main();
async function main(){
    //Tests getPersonByID
    try{
        console.log(await peeps.lexIndex(2));
        //Should Pass: Returns: 'Storm Gouly'
    }catch(e){
        console.log(e);
    }
    //Tests getPersonByID #2
    try{
        console.log(await peeps.getPersonById("42"));
        //Should Fail
    }catch(e){
        console.log(e);
    } 
    try{
        console.log(await sky.shouldTheyGoOutside("Robert", "Herley"));
        //Should Pass: Returns: 'Storm Gouly'
    }catch(e){
        console.log(e);
    }
    try{
        console.log(await jobs.findTheHacker("79.2222.167.180"));
        //Should Pass: Returns: 'Storm Gouly'
    }catch(e){
        console.log(e);
    }
    try{
        console.log(await jobs.whereDoTheyWork("Hank"));
        //Should Pass: Returns: 'Storm Gouly'
    }catch(e){
        console.log(e);
    }
    try{
        console.log(await peeps.firstNameMetrics());
        //Should Pass: Returns: 'Storm Gouly'
    }catch(e){
        console.log(e);
    }
}