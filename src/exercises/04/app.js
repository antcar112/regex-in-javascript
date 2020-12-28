/*
The content.js file contains a string of text stored in a variable text. This string of text is a statement that contains a day of the week as a part of the statement. Write a regular expression that will match any day of the week and then replace that day of the week in the string with Monday. Display the results to the console. 
*/

import { text } from './content.js'

const regex = /\b[mtwfs][a-z]{1,4}[nsir]day\b/gi

const original = document.querySelector('#original')
const monday = document.querySelector('#monday')

original.innerText = text
monday.innerText = text.replace(regex, 'Monday')
