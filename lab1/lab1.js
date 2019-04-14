const questionOne = function questionOne(arr) {
    //Sum of Squares
    let sum = 0;
    for (let i = arr.length - 1; i >= 0; i--) {
    	sum+=(arr[i]*arr[i]); //add square to sum
    }
    return sum;

}

const questionTwo = function questionTwo(num) {
	if (num<1)
		return 0;
	let count = 0;
	let fiba = 0; //fib of 0
	let fibb = 1; //fib of 1
	while (count < num){
		fibb = fibb+fiba; //next num in sequence
		fiba = fibb-fiba; //make fiba fibb
		count++;
	}
	return fiba;

}

const questionThree = function questionThree(text) {
    const vowelArr = "aeiouAEIOU";
    let vowelCount = 0;
    for (let i = text.length - 1; i >= 0; i--) {
    	for (let j = vowelArr.length - 1; j >= 0; j--) {
    		if (vowelArr[j] == text[i]) //vowel match
    			vowelCount++;
    	}
    }
    return vowelCount;
}

const questionFour = function questionFour(num) {
    if (num>0)
    	return num * questionFour(num-1);
    if(num<0) 
    	return NaN;
    return 1;
}

module.exports = {
    firstName: "Daniel", 
    lastName: "Kramer", 
    studentId: "10426217",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};