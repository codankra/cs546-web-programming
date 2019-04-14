const animals = require("./data/animals");
//This is my test file
main();
async function main() {
    const mortimer = await animals.create("Sasha", "Dog");
    console.log("Success in creating mortimer!!!!!!!!!!!");
    const refid = String(mortimer._id);
    console.log(refid);
    try{
        console.log("testing GET");
        const moartimer = await animals.get("5c70d6a632c7db230e8af853");
        console.log(moartimer);
        console.log("Success!!!!!!!!!!!");
        //Should Pass
    }catch(e){
        console.log(e);
    }
    try{
        console.log("testing RENAME");
        const whodis = await animals.rename("5c70d6a632c7db230e8af853", "wasd");
        console.log(whodis);
        console.log("Success!!!!!!!!!!!");
        //Should Pass
    }catch(e){
        console.log(e);
    }
    try{
        console.log("testing REMOVE");
        const removable = await animals.remove(refid);
        console.log(removable);
        console.log("Success!!!!!!!!!!!");
        //Should Pass
    }catch(e){
        console.log(e);
    }
    try{
        console.log("testing GETALL");
        const getall = await animals.getAll();
        console.log(getall);
        console.log("Success!!!!!!!!!!!");
        //Should Pass: Returns: 'Storm Gouly'
    }catch(e){
        console.log(e);
    }

}
