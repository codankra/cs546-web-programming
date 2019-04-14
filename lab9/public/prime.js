let primeList = [];

function submitForm(){
    const isprime = getInputVal('isprime');
    if (isprime == "" || isprime == undefined){
        const err = document.createElement("p");
        err.className = "not-prime";
        const primenode = document.createTextNode("!!ERROR!!: Input cannot be empty! (refresh page to continue)");
        err.appendChild(primenode);
        //document.getElementById("removecheck").removeChild(document.getElementById("removecheck").childNodes[1]);
        document.getElementById("primeForm").parentNode.removeChild(document.getElementById("primeForm"));
        document.getElementById("attempts").appendChild(err);
        return false;
    }
    const classname = isPrimeQ(isprime) ? "is-prime" : "not-prime";
    document.getElementById("primeForm").reset();
    addPrimeList(isprime, classname);
    return false;
}

//Function to get user input 
function getInputVal(id){
    return document.getElementById(id).value; 
}
function isPrimeQ(num){
    for(let i = 2, s = Math.sqrt(num); i <= s; i++)
        if(num % i === 0) return false; 
    return num > 1;
}

function addPrimeList(isprime, classname){
    const pl = document.createElement("li");
    pl.className = classname;
    const addnot = (classname == "not-prime") ? "NOT " : "";
    const textadd = isprime + " is " + addnot + "a prime number";
    const primenode = document.createTextNode(textadd);
    pl.appendChild(primenode);
    document.getElementById("attempts").appendChild(pl);
}