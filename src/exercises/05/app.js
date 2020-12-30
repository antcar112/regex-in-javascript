/*
Iterate through the data provided. Use a regular expression to store the names in a new array but change the order of the name so first name is listed first and last name is last. 
*/

const names = [
  'Jensen, Dale',
  'Smith, Andrea',
  'Jorgensen, Michael',
  'Vasefi, Annika',
  'Lopez, Monica',
  'Crockett, Steven',
]

const nameRegex = /(\w+), (\w+)/

const firstLast = names
  .map((name) => {
    const nameArray = nameRegex.exec(name)
    if (!nameArray) {
      return null
    }
    const [, last, first] = nameArray
    return `${first} ${last}`
  })
  .filter((name) => name !== null)

const namesToHTML = (names) => names.reduce((acc, name) => (acc += `<li>${name}</li>`), '')

const addNamesToHTML = (id, names) =>
  (document.querySelector(`#${id}`).innerHTML = namesToHTML(names))

addNamesToHTML('last', names)
addNamesToHTML('first', firstLast)
