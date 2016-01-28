# cache-bust

Use cache busting in express. Adds a version query string to ressources.

## Usage with express

```js
var express = require('express');
var cacheBust = require('cache-busted');

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
  <script type="text/js" src="/public/js/app.js?v=1.0.0" />
  <link rel="stylesheet" href="/public/css/style.css?v=1.0.0" />
  <link rel="stylesheet" href="/public/css/style.css?v=1.0.0" />
</head>
```

## Options

Add the options to the `handler` call: `cacheBust.handler(app, options)`

`version`: Use this exact version. Default: null which will make this module look for a package.json in the folder below
`packageLocation`: Path to the `package.json`. Defaults to `../../package.json`.
`useGitHash`: (optional) The current git hash which will be appended to the version.

## Difference production and development

The above example is the output if the NODE_ENV environment variable is set to `production` or `integration`. Otherwise it also appends the current timestamp so that each request will load all new dependencies. Example:

```html
<link rel="stylesheet" href="/public/css/style.css?v=1.0.0-1432576223502" />
```
