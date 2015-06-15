# babel-plugin-flow-comments

Turn flow type annotations into comments.

http://flowtype.org/blog/2015/02/20/Flow-Comments.html

## Example

**In**

```javascript
function foo(x: number): string {}
```

**Out**

```javascript
"use strict";

function foo(x /*: number*/) /*: string*/ {}
```

## Installation

```sh
$ npm install babel-plugin-flow-comments
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["flow-comments"]
}
```

### Via CLI

```sh
$ babel --plugins flow-comments script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["flow-comments"]
});
```
