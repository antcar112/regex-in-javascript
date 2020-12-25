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

- test
- exec

### String object methods

- match
- search
- replace
- split

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
