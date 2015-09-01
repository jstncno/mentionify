# Mentionify

Render '@user' HTML text to link tags that link to their social media profile

**[See demo](http://www.jcano.me/mentionify/)**

[![build status](https://secure.travis-ci.org/bumrush/mentionify.svg)](http://travis-ci.org/bumrush/mentionify)
[![dependency status](https://david-dm.org/bumrush/mentionify.svg)](https://david-dm.org/bumrush/mentionify)

**Mentionify** is a tiny JavaScript library that changes all intances of HTML text that matches the pattern "*@user*" and injects an HTML `a` tag that links to that user's social media profile.

For example, if your document has something like:

```javascript
<p id="twitter">
    My Twitter handle is @canokiid!
<p>
```

You can add **Mentionify** and run it with some options:

```javascript
<script src="mentionify.js"></script>
<script>
    var mentionify = Mentionify();
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

Install **Mentionify** using one of options below and include it as a `<script>` in your project.

### Option 1

Download the latest stable [mentionify.js](https://github.com/bumrush/mentionify/blob/v0.0.5/dist/mentionify.js)

### Option 2

`npm install mentionify`

## Usage

You can use **Mentionify** in the `<body>` of your HTML document:

```javascript
<div id="container">
    <p>
        My Twitter handle is @canokiid!
    <p>
</div>

<script src="mentionify.js"></script>
<script>
    var mentionify = Mentionify();
    mentionify.run({
        account: "twitter"
    });
</script>
```

The default `account` option is `twitter` which links to the user's Twitter profile, but can be overridden:

```javascript
<div id="container">
    <p>
        My GitHub handle is @bumrush!
    <p>
</div>

<script src="mentionify.js"></script>
<script>
    var mentionify = Mentionify();
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
        <a href="//github.com/bumrush" class="mentionified">@bumrush</a>!
    </p>
</div>
```

### API

#### **`Mentionify.run()`**

Runs **Mentionify** using the specified options, which are described below.

### Options

The following options can be passed into **`Mentionify.run()`**

#### **`elementId` (string)**

The `id` of the element to find and render "_@user_" text to `a` tags. Default: `container`

#### **`account` (string)**

The social media account to link to. Default: `twitter`

Any social media `account` can be used to link to its web profile, provided that it has the following URL format: `http://account.com/username`

## Future

- Add support for the following accounts:

    - LinkedIn
    - Reddit
    - and more...

Have a request? File an issue or, better yet, create a pull request ;)

## Credits
[Justin Cano](https://github.com/bumrush/)

## License

ISC
