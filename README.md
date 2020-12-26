# Regular Expressions in JavaScript

This project is all about Regular Expressions and using them in JavaScript.

## 1. Getting Started

In JavaScript, Regular Expressions are Objects.

There are two ways to create RegEx Objects:

```
const regex1 = new RegExp("hello")
const regex2 = /world/
```

Once created, RegEx objects can be used with methods on both the RegEx Object and the String object wrapper.

### RegExp object methods

#### .test()

Returns true if the pattern is found in passed string, false if not

#### .exec()

Returns an array of matchs from passed in string. Will always only return first instance (even if `/g` flag is used). Also provides additional info:

- index - shows where match occured
- input - the passed in string

### String object methods

#### .match()

Returns the same array as the .exec() method above when no `/g` flag is used. If `/g` is used, will return an array of all matches, but no additional info.

#### .search()

Returns the index of the matched string.

#### .replace()

Returns a string that has replaced a match of the regex expression with the passed in string

#### .split()

Returns an array of strings split on regex matches.

### Regular Expression Flags

Flags can be added to RegEx in two ways

```
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

```
const txt = 'how is that so hot? h t. hoot.'
const re = /h.t/g

const match = txt.match(re)
// ['hat', 'hot', 'h t']
```

#### `\` - Esacape character

Escaping a metacharacter tells the RegEx engine we only want to match on the literal value of that character.

```
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

```
const regex = /gr[ae]y/

regex.test('gray') // returns true
regex.test('grey') // returns true
```

This character set says to only match one character in the set.

```
regex.test('graey') // returns false
```

Multiple character sets can be used together.

```
const multi = /[abcd][123][xyz]/g
```

Inside a character set, metacharacters don't act as metacharacters. Instead, they operate as their character.

```
const text = 'Make the outline for the square gray and the fill for the circle grey.'
const regex = /gr[ae]y[ .]/g

text.match(regex)
// returns ['gray ', 'grey.']
```

### Specifying a Range in a Character Set

Ranges simplify consecutive characters in character sets. Ranges work with both digits and letters.

```
/[1234]/ == /[1-4]/
/[abcde]/ == /[a-e]/
```

Note: the `-` acts as a metacharacter in a character set. This is one exception to the rule above. If we want to use a `-` in a character set, we can escape it.

```
/[\-.]/
```

How do we capture all numbers between 10 and 30?

```
const text = '13 - 25'
const regex = /[10-30]/g
```

This character set will match 1, a range of 0-3, and 0, not 10 to 30 like we want.
