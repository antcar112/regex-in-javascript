/*
Using the provided array, create a second array that only includes the numbers with the 801 area code. (The area code is the first 3 numbers.)
*/

const phoneNums = [
  '801-766-9754',
  '801-545-5454',
  '435-666-1212',
  '801-796-8010',
  '435-555-9801',
  '801-009-0909',
  '435-222-8013',
  '801-777-6655',
]

const regex = /801-...-..../

const filterPhoneNums = phoneNums.filter((phoneNum) => phoneNum.match(regex))

const numsToHTML = (nums) => nums.reduce((acc, num) => (acc += `<li>${num}</li>`), '')

const addNumbersToHTML = (id, nums) => (document.querySelector(id).innerHTML = numsToHTML(nums))

addNumbersToHTML('#all-numbers', phoneNums)
addNumbersToHTML('#filtered-numbers', filterPhoneNums)
