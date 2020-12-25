const txt = 'Programming courses always starts with a hello world example.'

const regex1 = new RegExp('hello')
const regex2 = /world/

// .test() returns if the pattern is in the passed in string
console.log(regex1.test(txt))
console.log(regex2.test(txt))
