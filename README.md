# cache-bust

Use cache busting in express. Adds a version query string to ressources.

## Usage with express

```js
var express = require('express');
var cacheBust = require('cache-bust');

var app = express();
cacheBust.handler(app);
```

This exposes the function cacheBust in your app locals. Enabling you to do the following (example using jade):

```jade
head
  title Hello World
  != cacheBust('/public/js/app.js')
  != cacheBust('/public/css/style.css')
  != cacheBust('/public/css/style', 'css')
```

Output:

```html
<head>
  <title>Hello World</title>
  <script type="text/js" src="/public/js/app.js" />
  <link rel="stylesheet" href="/public/css/style.css" />
  <link rel="stylesheet" href="/public/css/style.css" />
</head>
```

## Options

`version`: Use this exact version. Default: null which will make this module look for a package.json in the folder above
`packageLocation`: Path to the `package.json`. Defaults to `../../package.json`.

