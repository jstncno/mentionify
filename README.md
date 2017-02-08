# mentionify

A Node.js module that renders @'s in the DOM's text to social media profile links

**[See demo](http://www.jcano.me/mentionify.js/)**

[![Build Status](https://travis-ci.org/earthican/mentionify.js.svg?branch=master)](https://travis-ci.org/earthican/mentionify.js)
[![dependency status](https://david-dm.org/earthican/mentionify.js.svg)](https://david-dm.org/earthican/mentionify.js)

**mentionify** is Node.js module that looks for all intances of @'s in the DOM's text nodes and injects an HTML `a` tag that links to that user's social media profile.

For example, if your document has something like:

```javascript
<p id="twitter">
    My Twitter handle is @jcvno!
<p>
```

You can use the **mentionify** Node.js module and run it with some options:

```javascript
import mentionify from 'mentionify';

mentionify.run({
    elementId: 'twitter'
    site: 'twitter'
});
```

Your document will then be rendered as:

```javascript
<p id="twitter">
    My Twitter handle is
    <a href="//twitter.com/jcvno" class="mentionified">@jcvno</a>!
</p>
```

## Installation

**mentionify** is a Node.js module published to npm:

`$ npm install mentionify`

## Usage

You can use the **mentionify** as a Node.js module:

**index.html:**

```html
<div id="container">
    <p>
        My Twitter handle is @jcvno!
    <p>
</div>
```

**app.js:**

```javascript
import mentionify from 'mentionify';

mentionify.run({
    site: 'twitter'
});
```

The default `site` option is `twitter` which links to the user's Twitter profile, but can be overridden:

**index.html:**

```html
<div id="container">
    <p>
        My Twitter handle is @earthican!
    <p>
</div>
```

**app.js:**

```javascript
import mentionify from 'mentionify';

mentionify.run({
    site: 'github'
});
```

The above HTML will be rendered as:

```html
<div id="container">
    <p>
        My GitHub handle is
        <a href="//github.com/earthican" class="mentionified">@earthican</a>!
    </p>
</div>
```

In fact, the `site` option can [any site that has the URL format `http://${ site }.com/${ username }`](https://github.com/earthican/mentionify.js#site-string).

### API

#### **`mentionify.run()`**

Runs the **mentionify** module using the specified options, which are described below.

### Options

The following options can be passed into **`Mentionify.run()`**

#### **`elementId` (string)**

The `id` of the element to find and render "_@user_" text to `a` tags. Default: `container`

#### **`site` (string)**

The social media site to link to. Default: `twitter`

Any social media `site` can be used to link to its web profile, provided that it has the following URL format: 

`http://${ site }.com/${ username }`

#### **`className` (string)**

The specified CSS `class` name. Default: `mentionified`

##### Additional `site` support

**mentionify** now also supports `linkedin` and `reddit` sites:

**index.html:**

```html
<ul>
    <li id="reddit">reddit: /u/canoj</li>
    <li id="linkedin">LinkedIn: /in/justincano</li>
</ul>
```

**app.js**

```javascript
import metionify from 'mentionify';

mentionify.run({
    elementId: "reddit",
    site: "reddit"
});
mentionify.run({
    elementId: "linkedin",
    site: "linkedin"
});
```

**Rendered DOM:**

```html
<ul>
    <li id="reddit">reddit: <a href="//reddit.com/u/canoj" class="mentionified">/u/canoj</a></li>
    <li id="linkedin">LinkedIn: <a href="//linkedin.com/in/justincano" class="mentionified">/in/justincano</a></li>
</ul>
```

##### Automated mention identifiers

**mentionify** now has support for identifiers as part of the mention using the `auto` account option:

**`index.html`:**

```html
<div id="mentions">
    Reddit: @canoj(reddit)
    LinkedIn: @justincano(linkedin)
</div>
```

**app.js**

```javascript
import mentionify from 'mentionify';

mentionify.run({
    elementId: "mentions",
    site: "auto"
});
```

**Rendered DOM:**

```html
<div id="mentions">
    Reddit: <a href="//reddit.com/u/canoj" class="mentionified">@canoj(reddit)</a>
    LinkedIn: <a href="//linkedin.com/in/justincano" class="mentionified">@justincano(linkedin)</a>
</div>
```


## Contributing

### Build

Fork this repository and clone to your local machine. Make sure `node` and `npm` are installed, then `cd` into project dir and run:

```bash
$ npm install
```

Any pull requests that relate to a new or existing feature, please write unit tests for your implementation. It's good practice!

## Future

I am planning for a **v0.1.0** release. To do so, I am creating/collecting tickets that would be beneficial to include for the release - see [here](https://github.com/earthican/mentionify.js/milestones/First%20minor%20release%20-%20v0.1.0).

If you have a feature request you would like to see in v0.1.0, please file an issue, and we can discuss. Pull requests are welcomed, too! :smile_cat:

## License

ISC
