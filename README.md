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

- /g - global - match more than one occurance. Without global, only the first match is found
- /i - case insensitive match, case doesn't matter
- /m - multi-line match

Can combine multiple flags (/gi)

### Testing RegEx

[RegEx Pal](https://www.regexpal.com/) is a very useful for testing RegEx.
