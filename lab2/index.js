const aU = require('./arrayUtils.js');
const sU = require('./stringUtils.js');
const oU = require('./objUtils.js');

//All module functions imported, 4 used for purposes of assignment
//8 Test cases, testing head, remove, capitalize, and mapValues

//Array Head Tests
try {
    // TEST#1 Should Pass
    const headOne = aU.head(["10102", 3, {4: 5}]);
    console.log('head passed successfully');
    
 } catch (e) {
    console.error('head failed test case' + e);
 }
 try {
    // TEST#2 Should Fail
    const headTwo = aU.head({1234: 342});
    console.error('head did not error: ' + headTwo);
 } catch (e) {
    console.log('head failed successfully');
 }

 //Array Remove Tests
 try {
    // TEST#3 Should Pass
    const rmOne = aU.remove(["10102", 3, {4: 5}], 1);
    console.log('remove passed successfully');
    
 } catch (e) {
    console.error('remove failed test case' + e);
 }
 try {
    // TEST#4 Should Fail
    const rmTwo = aU.remove(["10102", 3, {4: 5}], 5);
    console.error('remove did not error: ' + rmTwo);
 } catch (e) {
    console.log('remove failed successfully');
 }


 //String Capitalize Tests
 try {
    // TEST#5 Should Pass
    const capOne = sU.capitalize("sPonGEbOB SqUArePaNTs");
    console.log('capitalize passed successfully');
 } catch (e) {
    console.error('capitalize failed test case' + e);
 }
 try {
    // TEST#6 Should Fail
    const capTwo = sU.capitalize(1234);
    console.error('capitalize did not error: ' + capTwo);
 } catch (e) {
    console.log('capitalize failed successfully');
 }


 //Object MapValues Tests
 try {
    // TEST#7 Should Pass
    const objOne = oU.extend({ a: 1, b: "Two", c: "3" }, { a: 1, b: "Two", c: "3" });
    console.log('extend passed successfully');
    
 } catch (e) {
    console.error('extend failed test case' + e);
 }
 try {
    // TEST#8 Should Fail
    const objTwo = oU.extend({ a: 1, b: "Two", c: "3" });
    console.error('extend did not error: ' + objTwo);
 } catch (e) {
    console.log('extend failed successfully');
 }