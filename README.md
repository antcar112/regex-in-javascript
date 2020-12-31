# Regular Expressions in JavaScript

This project is all about Regular Expressions and using them in JavaScript.

## 1. Getting Started

In JavaScript, Regular Expressions are Objects.

There are two ways to create RegEx Objects:

```js
const regex1 = new RegExp('hello')
const regex2 = /world/
```

### RegExp object methods

Once created, RegEx objects can be used with methods on both the RegEx Object and the String object wrapper.

```js
const txt = "Let's starts with a hello world example."
const regex = /hello/
```

#### .test()

Returns `true` if the pattern is found in passed string, `false` if it is not.

```js
regex.test(txt) // true
```

#### .exec()

Returns an array of matchs from passed in string. Will always only return first instance (even if `/g` flag is used). Also provides additional info:

- index - shows where match occured
- input - the passed in string

```js
regex.exec(txt)
// ["hello", index: 20, input: "Let's starts with a hello world example."]
```

### String object methods

#### .match()

Returns the same array as the `.exec()` method above when no `/g` flag is used. If `/g` is used, will return an array of all matches, but no additional info.

```js
txt.match(regex)
// ["hello", index: 20, input: "Let's starts with a hello world example."]

const greeting = 'hello, hello!'
greeting.match(/hello/g)
// ["hello", "hello"]
```

#### .search()

Returns the index of the matched string.

```js
txt.search(regex) // 20
```

#### .replace()

Returns a string that has replaced a match of the regex expression with the passed in string

```js
txt.replace(regex, 'hi')
// "Let's starts with a hi world example."
```

#### .split()

Returns an array of strings split on regex matches.

```js
txt.split(regex)
// ["Let's starts with a ", " world example."]

txt.split(/\s/)
// ["Let's", "starts", "with", "a", "hello", "world", "example."]
```

### Regular Expression Flags

Flags can be added to RegEx in two ways

```js
/pattern/flags
new RegExp("pattern", "flags)
```

Common flags:

- `/g` - global - match more than one occurance. Without global, only the first match is found
- `/i` - case insensitive match, case doesn't matter
- `/m` - multi-line match

Can combine multiple flags (`/gi`)

### Testing RegEx

[RegEx Pal](https://www.regexpal.com/) is a very useful for testing RegEx.

## 2. Specifying Characters in Regular Expressions

### Metacharacters

The following are metacharacters in RegEx.

```
^ $ . * + ? = ! : | \ / ( ) [ ] { }
```

#### `.` - Wildcard character

The wildcard metacharacter (`.`) can be used to represent most single characters, including the tab character.
It will not match the newline character.

```js
const txt = 'how is that so hot? h t. hoot.'
const re = /h.t/g

const match = txt.match(re)
// ['hat', 'hot', 'h t']
```

#### `\` - Esacape character

Escaping a metacharacter tells the RegEx engine we only want to match on the literal value of that character.

```js
const txt = 'This could be the final word.'

const notEscaped = /d./g
txt.match(notEscaped)
// ['d ', 'd.']

const escaped = /d\./g
txt.match(escaped)
// ['d.']
```

#### Control Characters

Control characters are used to match non-printed characters.

- `\t` - tab
- `\v` - vertical tab
- `\n` - newline
- `\r` - carriage return

## 3. Characters Sets

Character sets allow multiple characters to satisfy a RegEx expression. For example, if we want to account for both "grey" and "gray", we could use a character set.

```js
const regex = /gr[ae]y/

regex.test('gray') // returns true
regex.test('grey') // returns true
```

This character set says to only match one character in the set.

```js
regex.test('graey') // returns false
```

Multiple character sets can be used together.

```js
const multi = /[abcd][123][xyz]/g
```

Inside a character set, metacharacters don't act as metacharacters. Instead, they operate as their character. There are some exceptions to this rule [(see below)](#escaping-characters-in-a-set).

```js
const text = 'Make the outline for the square gray and the fill for the circle grey.'
const regex = /gr[ae]y[ .]/g

text.match(regex)
// returns ['gray ', 'grey.']
```

### Specifying a Range (`-`)

Ranges simplify consecutive characters in character sets. Ranges work with both digits and letters.

```js
/[1234]/ == /[1-4]/
/[abcde]/ == /[a-e]/
```

Note: the `-` acts as a metacharacter in a character set. This is an exception to the rule above. If we want to use a `-` in a character set, we can escape it.

```
/[\-.]/
```

How do we capture all numbers between 10 and 30?

```js
const text = '13 - 25'
const regex = /[10-30]/g
```

This character set will match 1, a range of 0-3, and 0, not 10 to 30 like we want.

### Excluding Characters (`^`)

The `^` is another metacharacter in character sets. If it appears at the start of a character set, it indicates to exclude all characters that follow.

For example, the below expression will match any character other than digits 0 to 9 or letters A to F.

```
/[^0-9A-F]/
```

If we want to use the literal `^` character in a character set, we can escape it. This is only necessary if it appears at the start of the character set.

```
/[\^a-z]/ // Escape required
/[a-z^]/  // Escape not required
```

### Escaping Metacharacters

Most metacharacters don't need to be escaped in a character set. There are four metacharacters that are exceptions to this rule and _may_ need be escaped (depending on their position in the character set). It's fine to always escape these characters.

| Char | Usage             | When to escape                         |
| ---- | ----------------- | -------------------------------------- |
| `-`  | Range             | If it is a valid range (ex. `/[a-z]/`) |
| `^`  | Negate            | If it's at the start of the set        |
| `\`  | Escape characters | Always need to escape                  |
| `]`  | End of set        | Always need to escape                  |

### Shorthand for Character Sets

Shorthands can be used to simplify common character sets.

#### Inclusive Shorthands

There are three inclusive shorthands.

The digit shorthand, which includes all digits.

```
\d == [0 - 9]
```

The word shorthand, which includes all letters (upper and lowercase), all digitis and the underscore.

```
\w == [a - zA - Z0 - 9_]
```

The whitespace shorthand, which includes blank space, tab, newline and carriage return.

```
\s == [ \t\n\r]
```

#### Negated Shorthands

There are also three negated shorthands. They are the same as the above inclusive shorthands, only negated. They use uppercase letters.

The negated digit shorthand.

```
\D == [^0-9]
```

The negated word shorthand.

```
\W == [^a-zA-Z0-9_]
```

The negated whitespace shorthand.

```
\S == [^ \t\r\n]
```

## 4. Using Repetition

RegEx has three metacharacters to indicate repition. These all apply to the left most previous item in the expression.

- `+` - Matches one or more occurrences
- `?` - Matches zero or one occurrences
- `*` - Matches zero or more occurrences

### Greediness and Laziness

By default, regular expressions will try to match as many characters as possible. This is also known as being greedy.

```js
const txt = 'hello hi hey'
const regex = /h[a-z]+/g

txt.match(regex) // ['hello', 'hi', 'hey']
```

This greedy behaviour can sometimes cause issues.

```js
const html = '<p>My first paragraph</p><p>Paragraph number 2.</p>'
const greedyRegex = /<p>.*<\/p>/

html.match(greedyRegex) // ['<p>My first paragraph</p><p>Paragraph number 2.</p>']
```

What if we only want the first `<p>` tag? In this example, you can see that both tags are selected. This happens because the RegEx engine is greedy and wants to match as many characters as possible.

We can fix this by making a RegEx expression lazy. This means that it grab as few characters as possible to satisfy an expression. We can do this using the `?` metacharacter.

```js
const lazyRegex = /<p>.*?<\/p>/

html.match(lazyRegex) // ['<p>My first paragraph</p>']
```

### Specifying Repitition Amount

We can use `{ }` to specify how many repittions we want.

- `{min, max}` - Matches min to max occurances
- `{min}` - Matches min occurances
- `{min,}` - Matches min or more occurances

```js
const txt = 'Hello there my wholesome dude'
const minMax = /\w{3,5}/g
const minMore = /\w{5,}/g

txt.match(minMax) // ['Hello', 'there', 'dude']
txt.match(minMore) // ['Hello', 'there', 'wholesome']
```

```js
const hex = 'Here are some hex numbers: #00ffff, #BA0EF2'
const min = /#[\dA-F]{6}/gi

hex.match(min) // ['#00ffff', '#BA0EF2']
```

## 5. Anchored Expressions

Using anchors in RegEx allows us to define the position of a match. For example, we can ensure that matches only occur at the start of a string.

### Matching at the Start and End

- `^` - Anchors the match to the start of the line.
- `$` - Anchors the match to the end of the line.

```js
const txt = 'The quick brown fox dog jumps over the lazy DOG'

const noAnchor = /the/gi
txt.match(noAnchor) // ['The', 'the']

const start = /^the/gi
txt.match(start) // ['The']

const end = /dog$/gi
txt.match(end) // ['DOG']
```

We can use both start and end metacharacters at the same time to ensure there are no other characters.

### Using the Multi-line Flag

When we use the multi-line flag (`\\m`) the start `^` and end `$` anchors will be applied to each line.

```js
const multiline = `The quick brown fox
                   jumps over
                   the lazy dog`

const regex = /^the/gim
multiline.match(regex) // ['The', 'the']
```

When using anchors and the multi-line flag, RegEx will look for matches either before (`$`) the new line character or after (`^`) the new line character.

### Working with Word Boundaries

- `\b` Word boundary - pattern bounded by a non-word character.
- `\B` Non-word boundary - pattern bounded by a word character.

These boundary characters reference position, not an actual character.

```js
const txt = 'Implant this idea: plan to plant multiple trees on this planet.'
const regex = /plan/g
txt.match(regex) // ['plan', 'plan', 'plan', 'plan']
```

What if we only want to match the word "plan" itself, and not words like "Implant" or "plant" that contain the characters plan? We can use the word boundary character.

```js
const boundryRegex = /\bplan\b/g
txt.match(boundryRegex) // ['plan']
```

### Tips for Accurate Regular Expressions

- When possible, define the quantity of repeated expressions (`{5}` rather than `*`)
- Narrow the scope to repeated expressions (`\d` rather than `.`)
- Provide clear starting and ending points (anchors)

## 6. Alternates and Groups

### Alternates

Sometimes, it may be better and/or easier to simply express all the possible expressions that should be matched. For example, what if we only want to match the seven days of the week.

```js
const daysOfWeek = /\b[mtwfs][a-z]{1,4}[nsir]day\b/gi
```

This expression can work, but it can also match other words, such as "somesday".

A safer expression would be to use alternates and the pipe `|` operator. The pipe operator behaves much like OR in other langagues.

```js
const daysOfWeek = /\bmonday\b|\btuesday\b|\bwednesday\b|\bthursday\b|\bfriday\b|\bsaturday\b|\bsunday\b/gi
```

This expression is more accurate and safer than the previous one.

### Grouping

Grouping uses parenthesis `( )`. Much like in other languages, using parenthesis tells the RegEx engine to evaluate that content first.

What if we want to match a 10 character id that follows a letter-digit-letter pattern. Each letter is between a and e, and each number is between 1 and 5. For example, `a5b4c3d2e1`.

```js
const validId = 'a5b4c3d2e1'
const invalidId = 'a12345'

const idPattern = /[a-e][1-5]{5}/g

idPattern.test(validId) // false
idPattern.test(invalidId) // true
```

The above expression doesn't work because the repeating group `{5}` is only applied to the left most character (`[1-5]`). We can solve this using grouping, so the repeating group now applies to both character sets.

```js
const idPattern = /([a-e][1-5]){5}/g

idPattern.test(validId) // true
idPattern.test(invalidId) // false
```

We can also use grouping to simplify the above days of the week example.

```js
const daysOfWeek = /\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/gi
// or
const daysOfWeek = /\b(mon|tues|wednes|thurs|fri|satur|sun)day\b/gi
```

### Grouping with JavaScript

Grouping captures data. This can simplify the process of evaluating and then splitting data.

For example, we are checking if a date from an input field is valid. The date follows a YYYY/MM/DD pattern. It can be seperated by "/", "-" or "." symbols. The MM and the DD can be either one or two digits. A valid RegEx expression for this would be:

```js
const dateExp = /^(\d{4})[-./](\d{1,2})[-./](\d{1,2})$/
```

Note the use of groups around the year, month and day portions. We can use these groups with the `.exec()` method the easily split our date into the year, month and day.

```js
const dateInput = '2018-3-26'
const dateArr = dateExp.exec(dateInput)
// ['2018-3-26', '2018', '3', '26', index: 0, input: '2018-3-26']
```

### Capturing Groups

Parenthesis `( )` in RegEx are commonly referred to as capturing groups. This is because these groups can be used and referred to later.

```js
const txt = yoyo
const regex = /(yo)\1/g

txt.match(regex) // ['yoyo']
```

In the example above, the `\1` is known as a Group Backreference. It refers to the first capturing group, or `(yo)`. **Note:** this capture group (`\1`) refers to the characters in the match, not the actual pattern. We can show this by adding a capture group our date expression above.

```js
const dateExp = /^(\d{4})[-./](\d{1,2})[-./]\2$/ // note the \2

const dateMatch = '2018-8-8'
dateMatch.test(dateExp) // true

const noDateMatch = '2018-8-20'
noDateMatch.test(dateExp) // false
```

We can also change our date expression like this:

```js
const dateExp = /^(\d{4})([-./])(\d{1,2})\2(\d{1,2})$/

const validDate = '2018/8/20'
validDate.test(dateExp) // true

const invalidDate = '2018-8/20'
invalidDate.test(dateExp) // false
```

There are two benefits to this new date expression.

1. It forces the user to use the same seperator character ('/', '-' or '.' )
2. It reduces duplication in the regular expression (`[-./]` was repeated)

#### Non-capturing Group

We can make a group non-capturing by adding a `?:` to the start of it.

```js
const dateExp = /^(?:\d{4})([-./])(?:\d{1,2})\1(?:\d{1,2})$/
```

Making a group non-capturing will remove it from the array that the `.exec()` method return.

### Group Backreferences

The backreference (ex. `/1`) does not refer to the pattern, it refers to the text that was captured.

```js
const backRef = /([abcd])\1/

const match = 'aa'
backRef.test(match) // true

const noMatch = 'ab'
backRef.test(noMatch) // false
```

### Positive Lookahead Groups

Lookahead groups (`?=`) allow us to use a particular pattern to determine a match, but everything in that group will not be part of the results.

How is this different from a non-capturing group? With a non-capture group, no index is created, but the non-capture group is still a part of the results (or what gets matched). With lookahead groups, the group is not part of the results.

Lets write a RegEx that matches URLs, but we only care about what comes before the .com.

```js
const regex = /\w+(?=\.com)/g

const url = 'ilovedogs.com'
regex.test(url) // true
url.match(regex) // ['ilovedogs']

const noUrl = 'ilovedogs.co'
regex.test(noUrl) // false
```

This expression only captures the url before .com, but it also forces a .com to be present.

Lookahead groups can be used together to contain a certain set of characters in any order. This can be very useful with validating passwords. The password in the example below must:

1. Be 8 or more characters
2. Must have at least one uppercase letter
3. Must have at least one lowercase letter
4. Must have at least one digit

```js
const pwReg = /^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/
pwReg.test('ValidP4ssword') // true
pwReg.test('invalid') // false
```

The lookahead groups are forcing the password the satisfy each lookahead group. However, the `.*` at the end is what the password is actually matching.

### Negative Lookahead Groups

Negative lookahead groups are identical to lookahead groups, only they force matches only when a certain pattern does not exist. Negative lookahead groups use `?!`.

```js
// Note the negative lookahead group with digits
const pwReg = /^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?!.*\d).*$/
pwReg.test('ValidPassword') // true
pwReg.test('InvalidP4ssword') // false
```

## 7. Unicode with RegEx

We may want to reference characters in RegEx expressions with unicode values. We can do this by escaping the unicode.

```js
const unicodeRegEx = /\u0065/
```

Unicode values can be used like any other character.

```js
const unicodeRegEx = /[\u0061-\u0067]/g
```

### 7.1. ES6 Unicode

Some unicode characters require more than 4 hexidecimal characters.

```
/\u1D11E/ === 𝄞
```

RegEx considers these longer unicodes as 2 seperate characters.

```
/\uD834\uDD1E/ === 𝄞
```

However, with ES6, we can use a new `u` flag. This tells RegEx to use the longer, single character code. We can then pass in longer unicode values inside `{ }`.

```js
const unicodeFlag = /\u{1D11E}/gu
```

## 8. Common Regular Expression Recipes

This is a collection of common use cases for RegEx.

### 8.1. Matching an Email Address

This is a simple solution to match an email address.

```js
const email = 'something@domain.com'
const simpleEmailRegEx = /.+@.+\..+/
```

However, there are certain symbols that can't appear in an email address (ex. `'@'` or `\s`) that the above expression doesn't account for. We can improve this like this.

```js
const emailRegEx = /^[^\s@]+@[^\s@.]+\.[^\s@.]+$/
```

### 8.2. Matching a Twitter Name

This expression will match a Twitter username.

```js
const twitterName = '@user_name1234'
const twitterRegEx = /^@\w+$/
```

### 8.3. Testing Passwords

When testing passwords, we generally want to:

1. Check that it's a certain length
2. Contain at least 1 uppercase letter
3. Contain at least 1 lowercase letter
4. Contain at least 1 number
5. Contain at least 1 special character

We can do this using seperate expressions, and then confirm the password fits each expression

```js
const length = /^.{8,32}$/
const upperCase = /[A-Z]/
const lowerCase = /[a-z]/
const digits = /[0-9]/
const special = /[^0-9A-Za-z]/

const isValidPassword = (password) =>
  length.test(password) &&
  upperCase.test(password) &&
  lowerCase.test(password) &&
  digits.test(password) &&
  special.test(password)

const validPassword = isValidPassword('My_S4fe_PaSSw0rd!') // true
const invalidPassword = isValidPassword('notvalid') // false
```

Alternatively, we can combine all these conditions into one expression using lookahead groups.

```js
const passwordRegEx = /^(?=.{8,32})(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^0-9A-Za-z]).*$/
```

### 8.4. Using `String.replace()`

The `.replace()` method can be used directly with capturing groups. For example, let's swap an array of names in "Last, First" format to be "First Last" instead.

```js
const names = ['Smith, Bob', 'Tang, Keith', 'Wei, Albert']
const newNames = names.map(name => name.replace(/(\w+), (\w+)/, '$2 $1')
```

Note how we can use `'$1'` directly in replace to refer to the first capturing group.

### 8.5. Matching a Word by another Word

This example shows how we can match a word, but only if it is before another word.

```js
const str = 'Match these words together.'
// match on 'words' but only when 'together' is directly after it.
const regex = /\b(?:words\W+together)\b/g
```

The next example handles addtional words between our two words.

```js
const str = 'Match these words even when there are others together.'
// match on 'words' but only when 'together' is after it at some point.
const regex = /\b(?:words\W+(?:\w+\W+)*together)\b/g
```

This last example matches a word but only when when another word occurs before or after it.

```js
const str = 'Match together these words.'
// match on 'words' but only when 'together' is before or after it at some point.
const regex = /\b(?:together\W+(?:\w+\W+)*words)|(?:words\W+(?:\w+\W+)*together)\b/g
```

### 8.6. Validating Dates

Dates can have many different formats. In this example, we'll use the 'dd/mm/yyyy' format, but we also want to match on 'd/m/yy'.

```js
const dateRegex = /^(3[01]|[12]\d|0?[1-9])\/(1[0-2]|0?[1-9])\/((\d{2})?\d{2})$/g
```

### 8.6. Capturing using the `String.match()` method

In this example, we use regex to capture all numbers in a string, and then sum those numbers.

```js
const txt = 'First number: 32, and a second number is 100. The last number is 15.'
const sum = txt.match(/\d+/g).reduce((total, num) => total + parseInt(num), 0)
```

### 8.7. Information about a Match

Using the same sentence as above, retrieve the starting index for the match, the length of the match, and the actual match. This only applies to the first digit (32).

```js
const txt = 'First number: 32, and a second number is 100. The last number is 15.'

const execArr = /\d+/.exec(txt)

let start
let length
let match

if (execArr) {
  start = execArr.index
  length = execArr[0].length
  match = execArr[0]
}
```

### 8.8. Iterate Over Matches

Using the same sentence as above, iterate over each match and log it to the console.

```js
const txt = 'First number: 32, and a second number is 100. The last number is 15.'

const regex = /\d+/g
let match = regex.exec(txt)

while (match) {
  console.log(match[0])
  match = regex.exec(txt)
}
```
