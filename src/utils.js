module.exports.defaultOptions = {
    "elementId": "container",
    "account": "twitter",
    "className": "mentionified"
};

module.exports.accounts = {
    "linkedin": "linkedin.com/in/",
    "reddit": "reddit.com/u/"
};

module.exports.regexes = {
    "default": /\B(\@)([a-zA-Z0-9-_]+)\b/g,
    "linkedin": /\B(\/in\/)([a-zA-Z0-9-_]+)\b/g,
    "reddit": /\B(\/u\/)([a-zA-Z0-9-_]+)\b/g,
    "auto": /\B(\@)([a-zA-Z0-9-_]+)\(([a-zA-Z0-9-_]+)\)/g
};
