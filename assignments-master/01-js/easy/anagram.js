/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  let string1 = str1.toLowerCase();
  let string2 = str2.toLowerCase();
  let count = 0;
  if (string1.length == string2.length) {
    for (let i = 0; i < string1.length; i++) {
      if (string2.indexOf(string1.charAt(i)) != -1) {
        count++;
      } else {
        return false;
      }
    }
    if (count == str1.length) {
      return true;
    }
  } else {
    return false;
  }
}


module.exports = isAnagram;
