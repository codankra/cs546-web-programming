const animals = require("./data/animals");
main();
//Notes: This code does not naturally exit/end, you have to press CTRL+C at the end. 

async function main() {
    //all these are valid actions, and should pass without errors
    try{
        //1
        const sasha = await animals.create("Sasha", "Dog");
        //2
        console.log(sasha);
        //3
        const lucy = await animals.create("Lucy", "Dog");
        //4
        const getall = await animals.getAll();
        console.log(getall);
        //5
        const duke = await animals.create("Duke", "Walrus");
        //6
        console.log(duke);
        //7
        const sashaID = String(sasha._id);
        const renamable = await animals.rename(sashaID, "Sashita");
        //8
        console.log(renamable);
        //9
        const lucyID = String(lucy._id);
        const removable = await animals.remove(lucyID);
        // console.log(removable + "\nsuccessfully removed!")
        //10
        const getall2 = await animals.getAll();
        console.log(getall2);
    }catch(e){
        console.log("Error: " + e);
    }
}