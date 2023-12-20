/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

let str = 'Hello World';
let ans = countVowels(str);
console.log(ans);
function countVowels(str) {
  let count=0;  
  let string1 = str.toLowerCase();
  for(let i=0; i<string1.length; i++){
    if(string1.charAt(i) == 'a'||
       string1.charAt(i) == 'e'||
       string1.charAt(i) == 'i'||
       string1.charAt(i) == 'o'||
       string1.charAt(i) == 'u'){
      count++;
    }
  }
  return count;
}

module.exports = countVowels;