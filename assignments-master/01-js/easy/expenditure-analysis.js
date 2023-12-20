/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  let result = [];
  for (let i = 0; i < transactions.length; i++) {
    if (searchResult(transactions[i]["category"], result) == -1) {
      result.push({
        category: transactions[i]["category"],
        totalSpent: transactions[i]["price"],
      });
    } else {
      result[searchResult(transactions[i]["category"], result)]["totalSpent"] +=
        transactions[i]["price"];
    }
  }
  return result;
}
function searchResult(category, result) {
  for (let i = 0; i < result.length; i++) {
    if (result[i]["category"] == category) {
      return i;
    }
  }
  return -1;
}

module.exports = calculateTotalSpentByCategory;
