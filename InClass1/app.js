//https://stackoverflow.com/questions/9907419/how-to-get-a-key-in-a-javascript-object-by-its-value
const dictionary = require('./dictionary.js');
try {
    console.log(dictionary.lookupDefinition("programming"))
}catch (error){
    console.log(error)
}
try{
    console.log(dictionary.getWord("The action or process of writing computer programs."))
}catch (error){
    console.log(error)
}
try {
    console.log(dictionary.lookupDefinition(5))
}catch (error){
    console.log(error)
}
try{
    console.log(dictionary.getWord("The asdasdasdputer programs."))
}catch (error){
    console.log(error)
}