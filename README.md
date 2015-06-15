# babel-plugin-flow-comments

Turn flow type annotations into comments

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
