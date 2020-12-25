const txt = 'Programming courses alwayS starts with a hello world example.'

const regex1 = new RegExp('hello')
const regex2 = /world/

// RegExp object methods

/**
 * .test()
 * Returns true if the pattern is found in passed string, false if not
 */
const test1 = regex1.test(txt)
const test2 = regex2.test(txt)
// console.log(test1, test2)

/**
 * .exec()
 * Returns an array of matchs from passed in string.
 * Also provides additional info:
 * - index - shows where match occured
 * - input - the passed in string
 */
const exec = regex1.exec(txt)
// console.log(exec)

// String object wrapper methods

/**
 * .match()
 * Returns the exact same array as the .exec() method above
 */
const match = txt.match(regex1)
// console.log(match)

/**
 * .search()
 * Returns the index of the matched string
 */
const search = txt.search(regex1)
// console.log(search)

/**
 * .replace()
 * Returns a string that has replaced a match of the regex expression with the passed in string
 */
const replace = txt.replace(regex1, 'hi')
// console.log(replace)

/**
 * .split()
 * Returns an array of strings split on regex matches.
 */
const split1 = txt.split(regex1)
// splits on spaces
const split2 = txt.split(/\s/)
// console.log(split1, split2)

// Flags
const regex3 = /s\s/gi // represents: 's '
console.log(txt.match(regex3))
console.log(regex3.exec(txt))
console.log(regex3.exec(txt))
