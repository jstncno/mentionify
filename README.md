# mentionify.js

A tiny JS library that renders @'s in the DOM's text to social media profile links

**[See demo](http://www.jcano.me/mentionify.js/)**

[![build status](https://secure.travis-ci.org/earthican/mentionify.svg)](http://travis-ci.org/earthican/mentionify.js)
[![dependency status](https://david-dm.org/earthican/mentionify.svg)](https://david-dm.org/earthican/mentionify.js)

**mentionify.js** is a tiny JavaScript library that looks for all intances of @'s in the DOM's text nodes and injects an HTML `a` tag that links to that user's social media profile.

For example, if your document has something like:

```javascript
<p id="twitter">
    My Twitter handle is @canokiid!
<p>
```

You can add **mentionify.js** and run it with some options:

```javascript
<script src="mentionify.js"></script>
<script>
    var mentionify = new Mentionify();
    mentionify.run({
        elementId: "twiiter",
        account: "twitter"
    });
</script>
```

Your document will then be rendered as:

```javascript
<p id="twitter">
    My Twitter handle is
    <a href="//twitter.com/canokiid" class="mentionified">@canokiid</a>!
</p>
```

## Installation

Install **mentionify.js** using one of options below and include it as a `<script>` in your project.

### Option 1

Download the latest stable [mentionify.js](https://github.com/earthican/mentionify/blob/v0.0.7/dist/mentionify.js)

### Option 2

`npm install mentionify`

## Usage

You can use **mentionify.js** in the `<body>` of your HTML document:

```javascript
<div id="container">
    <p>
        My Twitter handle is @canokiid!
    <p>
</div>

<script src="mentionify.js"></script>
<script>
    var mentionify = new Mentionify();
    mentionify.run({
        account: "twitter"
    });
</script>
```

The default `account` option is `twitter` which links to the user's Twitter profile, but can be overridden:

```javascript
<div id="container">
    <p>
        My GitHub handle is @earthican!
    <p>
</div>

<script src="mentionify.js"></script>
<script>
    var mentionify = new Mentionify();
    mentionify.run({
        account: "github"
    });
</script>
```

The above HTML will be rendered as:

```javascript
<div id="container">
    <p>
        My GitHub handle is
        <a href="//github.com/earthican" class="mentionified">@earthican</a>!
    </p>
</div>
```

### API

#### **`Mentionify.run()`**

Runs **mentionify.js** using the specified options, which are described below.

### Options

The following options can be passed into **`Mentionify.run()`**

#### **`elementId` (string)**

The `id` of the element to find and render "_@user_" text to `a` tags. Default: `container`

#### **`account` (string)**

The social media account to link to. Default: `twitter`

Any social media `account` can be used to link to its web profile, provided that it has the following URL format: `http://account.com/username`

##### Additional account support

**mentionify.js** now also supports `linkedin` and `reddit` accounts:

```javascript
<ul>
    <li id="reddit">reddit: /u/canokiid</li>
    <li id="linkedin">LinkedIn: /in/justincano</li>
</ul>

<script src="mentionify.js"></script>
<script>
    var mentionify = new Mentionify();
    mentionify.run({
        elementId: "reddit",
        account: "reddit"
    });
    mentionify.run({
        elementId: "linkedin",
        account: "linkedin"
    });
</script>
```

## Future

Have a request? File an issue or, better yet, create a pull request ;)

## Credits
[Justin Cano](https://github.com/earthican/)

## License

ISC
