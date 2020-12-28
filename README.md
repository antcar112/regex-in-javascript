# Regular Expressions in JavaScript

This project is all about Regular Expressions and using them in JavaScript.

## 1. Getting Started

In JavaScript, Regular Expressions are Objects.

There are two ways to create RegEx Objects:

```
const regex1 = new RegExp("hello")
const regex2 = /world/
```

### RegExp object methods

Once created, RegEx objects can be used with methods on both the RegEx Object and the String object wrapper.

```
const txt = "Let's starts with a hello world example."
const regex = /hello/
```

#### .test()

Returns `true` if the pattern is found in passed string, `false` if it is not.

```
regex.test(txt) // true
```

#### .exec()

Returns an array of matchs from passed in string. Will always only return first instance (even if `/g` flag is used). Also provides additional info:

- index - shows where match occured
- input - the passed in string

```
regex.exec(txt)
// ["hello", index: 20, input: "Let's starts with a hello world example."]
```

### String object methods

#### .match()

Returns the same array as the `.exec()` method above when no `/g` flag is used. If `/g` is used, will return an array of all matches, but no additional info.

```
txt.match(regex)
// ["hello", index: 20, input: "Let's starts with a hello world example."]

const greeting = 'hello, hello!'
greeting.match(/hello/g)
// ["hello", "hello"]
```

#### .search()

Returns the index of the matched string.

```
txt.search(regex) // 20
```

#### .replace()

Returns a string that has replaced a match of the regex expression with the passed in string

```
txt.replace(regex, 'hi')
// "Let's starts with a hi world example."
```

#### .split()

Returns an array of strings split on regex matches.

```
txt.split(regex)
// ["Let's starts with a ", " world example."]

txt.split(/\s/)
// ["Let's", "starts", "with", "a", "hello", "world", "example."]
```

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

Inside a character set, metacharacters don't act as metacharacters. Instead, they operate as their character. There are some exceptions to this rule [(see below)](#escaping-characters-in-a-set).

```
const text = 'Make the outline for the square gray and the fill for the circle grey.'
const regex = /gr[ae]y[ .]/g

text.match(regex)
// returns ['gray ', 'grey.']
```

### Specifying a Range (`-`)

Ranges simplify consecutive characters in character sets. Ranges work with both digits and letters.

```
/[1234]/ == /[1-4]/
/[abcde]/ == /[a-e]/
```

Note: the `-` acts as a metacharacter in a character set. This is an exception to the rule above. If we want to use a `-` in a character set, we can escape it.

```
/[\-.]/
```

How do we capture all numbers between 10 and 30?

```
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
\d == [0-9]
```

The word shorthand, which includes all letters (upper and lowercase), all digitis and the underscore.

```
\w == [a-zA-Z0-9_]
```

The whitespace shorthand, which includes blank space, tab, newline and carriage return.

```
\s == [ \t\r\n]
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

```
const txt = 'hello hi hey'
const regex = /h[a-z]+/g

txt.match(regex) // ['hello', 'hi', 'hey']
```

This greedy behaviour can sometimes cause issues.

```
const html = '<p>My first paragraph</p><p>Paragraph number 2.</p>'
const greedyRegex = /<p>.*<\/p>/

html.match(greedyRegex) // ['<p>My first paragraph</p><p>Paragraph number 2.</p>']
```

What if we only want the first `<p>` tag? In this example, you can see that both tags are selected. This happens because the RegEx engine is greedy and wants to match as many characters as possible.

We can fix this by making a RegEx expression lazy. This means that it grab as few characters as possible to satisfy an expression. We can do this using the `?` metacharacter.

```
const lazyRegex = /<p>.*?<\/p>/

html.match(lazyRegex) // ['<p>My first paragraph</p>']
```

### Specifying Repitition Amount

We can use `{ }` to specify how many repittions we want.

- `{min, max}` - Matches min to max occurances
- `{min}` - Matches min occurances
- `{min,}` - Matches min or more occurances

```
const txt = 'Hello there my wholesome dude'
const minMax = /\w{3,5}/g
const minMore = /\w{5,}/g

txt.match(minMax) // ['Hello', 'there', 'dude']
txt.match(minMore) // ['Hello', 'there', 'wholesome']
```

```
const hex = 'Here are some hex numbers: #00ffff, #BA0EF2'
const min = /#[\dA-F]{6}/ig

hex.match(min) // ['#00ffff', '#BA0EF2']
```

## 5. Anchored Expressions

Using anchors in RegEx allows us to define the position of a match. For example, we can ensure that matches only occur at the start of a string.

### Matching at the Start and End

- `^` - Anchors the match to the start of the line.
- `$` - Anchors the match to the end of the line.

```
const txt = 'The quick brown fox dog jumps over the lazy DOG'

const noAnchor = /the/ig
txt.match(noAnchor) // ['The', 'the']

const start = /^the/ig
txt.match(start) // ['The']

const end = /dog$/ig
txt.match(end) // ['DOG']
```

We can use both start and end metacharacters at the same time to ensure there are no other characters.

### Using the Multi-line Flag

When we use the multi-line flag (`\\m`) the start `^` and end `$` anchors will be applied to each line.

```
const multiline = 'The quick brown fox
                   jumps over
                   the lazy dog'

const regex = /^the/igm
multiline.match(regex) // ['The', 'the']
```

When using anchors and the multi-line flag, RegEx will look for matches either before (`$`) the new line character or after (`^`) the new line character.
