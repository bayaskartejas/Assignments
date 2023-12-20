/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/
let str='race car';
console.log(isPalindrome(str));
function isPalindrome(str) {
  let regex = /[/., ?!]/g;
  let stringy= str.replace(regex,'');
  let string1 = stringy.trim();
  let str1 = string1.toLowerCase();
  let string2 = '';
  for(let i=str1.length-1; i>=0; i--){
    string2 = string2+str1.charAt(i);
  }
  console.log(string2);
  if(str1==string2){
  return true;
  }
  return false;
}

module.exports = isPalindrome;
