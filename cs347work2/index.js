const products = require("./data/products");
main();
//Notes: This code does not naturally exit/end, you have to press CTRL+C at the end. I went to Athiban for help and he said that was fine.
//REQUIREMENTS: NODE.js (npm), MongoDB (Community edition, active server running)
async function main() {
    //all these are valid actions, and should pass without errors
    try{
        //1
        const chips = await products.create("Chips", "$2.00");
        //2
        console.log(chips);
        //3
        const burger = await products.create("Hamburger", "$6.00");
        //4
        const getall = await products.getAll();
        console.log(getall);
        //5
        const pc = await products.create("Gaming Computer", "$1449.00");
        //6
        console.log(pc);
        //7
        const cID = String(chips._id);
        const renamable = await products.rename(cID, "Pringles");
        //8
        console.log(renamable);
        //9
        const bID = String(burger._id);
        const removable = await products.remove(bID);
        // console.log(removable + "\nsuccessfully removed!")
        //10
        const getall2 = await products.getAll();
        console.log(getall2);
    }catch(e){
        console.log("Error: " + e);
    }
}
