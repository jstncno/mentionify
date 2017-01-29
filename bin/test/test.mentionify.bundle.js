/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _mentionify = __webpack_require__(1);

	var _mentionify2 = _interopRequireDefault(_mentionify);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var mentionify = new _mentionify2.default();
	mentionify.run({ elementId: 'twitter' });
	mentionify.run({ elementId: 'github', account: 'github' });
	mentionify.run({ elementId: 'facebook', account: 'facebook' });
	mentionify.run({ elementId: 'portfolium', account: 'portfolium' });
	mentionify.run({ elementId: 'soundcloud', account: 'soundcloud' });
	mentionify.run({ elementId: 'linkedin', account: 'linkedin' });
	mentionify.run({ elementId: 'reddit', account: 'reddit' });
	mentionify.run({ elementId: 'auto', account: 'auto' });
	mentionify.run({ elementId: 'specified-class-name', account: 'facebook', className: 'some-class-name' });
	mentionify.run({ elementId: 'email' });

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () {
	    function defineProperties(target, props) {
	        for (var i = 0; i < props.length; i++) {
	            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	        }
	    }return function (Constructor, protoProps, staticProps) {
	        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	    };
	}();

	var _findandreplacedomtext = __webpack_require__(2);

	var _findandreplacedomtext2 = _interopRequireDefault(_findandreplacedomtext);

	var _utils = __webpack_require__(3);

	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	        throw new TypeError("Cannot call a class as a function");
	    }
	}

	function getAccountUri(account) {
	    return _utils.accounts[account] ? _utils.accounts[account] : account + ".com/";
	}

	function getRegex(account) {
	    return _utils.regexes[account] ? _utils.regexes[account] : _utils.regexes["default"];
	}

	var Mentionify = function () {
	    function Mentionify() {
	        _classCallCheck(this, Mentionify);
	    }

	    _createClass(Mentionify, [{
	        key: 'run',
	        value: function run(options) {
	            var userOptions = typeof options !== "undefined" ? options : _utils.defaultOptions;
	            for (var option in _utils.defaultOptions) {
	                userOptions[option] = userOptions[option] || _utils.defaultOptions[option];
	            }

	            (0, _findandreplacedomtext2.default)(document.getElementById(userOptions.elementId), {
	                find: getRegex(userOptions.account),
	                replace: function replace(portion, match) {
	                    var whole = match[0],
	                        mention = match[1],
	                        username = match[2],
	                        account = match[3] || userOptions.account,
	                        a = document.createElement("a"),
	                        href = "//" + getAccountUri(account) + username,
	                        text = document.createTextNode(whole);

	                    a.setAttribute("href", href);
	                    a.setAttribute("class", userOptions.className);
	                    a.appendChild(text);

	                    return a;
	                }
	            });
	        }
	    }]);

	    return Mentionify;
	}();

	exports.default = Mentionify;

	module.exports.regexes = _utils.regexes;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * findAndReplaceDOMText v 0.4.5
	 * @author James Padolsey http://james.padolsey.com
	 * @license http://unlicense.org/UNLICENSE
	 *
	 * Matches the text of a DOM node against a regular expression
	 * and replaces each match (or node-separated portions of the match)
	 * in the specified element.
	 */
	 (function (root, factory) {
	     if (typeof module === 'object' && module.exports) {
	         // Node/CommonJS
	         module.exports = factory();
	     } else if (true) {
	         // AMD. Register as an anonymous module.
	         !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	     } else {
	         // Browser globals
	         root.findAndReplaceDOMText = factory();
	     }
	 }(this, function factory() {

		var PORTION_MODE_RETAIN = 'retain';
		var PORTION_MODE_FIRST = 'first';

		var doc = document;
		var hasOwn = {}.hasOwnProperty;

		function escapeRegExp(s) {
			return String(s).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
		}

		function exposed() {
			// Try deprecated arg signature first:
			return deprecated.apply(null, arguments) || findAndReplaceDOMText.apply(null, arguments);
		}

		function deprecated(regex, node, replacement, captureGroup, elFilter) {
			if ((node && !node.nodeType) && arguments.length <= 2) {
				return false;
			}
			var isReplacementFunction = typeof replacement == 'function';

			if (isReplacementFunction) {
				replacement = (function(original) {
					return function(portion, match) {
						return original(portion.text, match.startIndex);
					};
				}(replacement));
			}

			// Awkward support for deprecated argument signature (<0.4.0)
			var instance = findAndReplaceDOMText(node, {

				find: regex,

				wrap: isReplacementFunction ? null : replacement,
				replace: isReplacementFunction ? replacement : '$' + (captureGroup || '&'),

				prepMatch: function(m, mi) {

					// Support captureGroup (a deprecated feature)

					if (!m[0]) throw 'findAndReplaceDOMText cannot handle zero-length matches';

					if (captureGroup > 0) {
						var cg = m[captureGroup];
						m.index += m[0].indexOf(cg);
						m[0] = cg;
					}

					m.endIndex = m.index + m[0].length;
					m.startIndex = m.index;
					m.index = mi;

					return m;
				},
				filterElements: elFilter
			});

			exposed.revert = function() {
				return instance.revert();
			};

			return true;
		}

		/**
		 * findAndReplaceDOMText
		 *
		 * Locates matches and replaces with replacementNode
		 *
		 * @param {Node} node Element or Text node to search within
		 * @param {RegExp} options.find The regular expression to match
		 * @param {String|Element} [options.wrap] A NodeName, or a Node to clone
		 * @param {String} [options.wrapClass] A classname to append to the wrapping element
		 * @param {String|Function} [options.replace='$&'] What to replace each match with
		 * @param {Function} [options.filterElements] A Function to be called to check whether to
		 *	process an element. (returning true = process element,
		 *	returning false = avoid element)
		 */
		function findAndReplaceDOMText(node, options) {
			return new Finder(node, options);
		}

		exposed.NON_PROSE_ELEMENTS = {
			br:1, hr:1,
			// Media / Source elements:
			script:1, style:1, img:1, video:1, audio:1, canvas:1, svg:1, map:1, object:1,
			// Input elements
			input:1, textarea:1, select:1, option:1, optgroup: 1, button:1
		};

		exposed.NON_CONTIGUOUS_PROSE_ELEMENTS = {

			// Elements that will not contain prose or block elements where we don't
			// want prose to be matches across element borders:

			// Block Elements
			address:1, article:1, aside:1, blockquote:1, dd:1, div:1,
			dl:1, fieldset:1, figcaption:1, figure:1, footer:1, form:1, h1:1, h2:1, h3:1,
			h4:1, h5:1, h6:1, header:1, hgroup:1, hr:1, main:1, nav:1, noscript:1, ol:1,
			output:1, p:1, pre:1, section:1, ul:1,
			// Other misc. elements that are not part of continuous inline prose:
			br:1, li: 1, summary: 1, dt:1, details:1, rp:1, rt:1, rtc:1,
			// Media / Source elements:
			script:1, style:1, img:1, video:1, audio:1, canvas:1, svg:1, map:1, object:1,
			// Input elements
			input:1, textarea:1, select:1, option:1, optgroup:1, button:1,
			// Table related elements:
			table:1, tbody:1, thead:1, th:1, tr:1, td:1, caption:1, col:1, tfoot:1, colgroup:1

		};

		exposed.NON_INLINE_PROSE = function(el) {
			return hasOwn.call(exposed.NON_CONTIGUOUS_PROSE_ELEMENTS, el.nodeName.toLowerCase());
		};

		// Presets accessed via `options.preset` when calling findAndReplaceDOMText():
		exposed.PRESETS = {
			prose: {
				forceContext: exposed.NON_INLINE_PROSE,
				filterElements: function(el) {
					return !hasOwn.call(exposed.NON_PROSE_ELEMENTS, el.nodeName.toLowerCase());
				}
			}
		};

		exposed.Finder = Finder;

		/**
		 * Finder -- encapsulates logic to find and replace.
		 */
		function Finder(node, options) {

			var preset = options.preset && exposed.PRESETS[options.preset];

			options.portionMode = options.portionMode || PORTION_MODE_RETAIN;

			if (preset) {
				for (var i in preset) {
					if (hasOwn.call(preset, i) && !hasOwn.call(options, i)) {
						options[i] = preset[i];
					}
				}
			}

			this.node = node;
			this.options = options;

			// Enable match-preparation method to be passed as option:
			this.prepMatch = options.prepMatch || this.prepMatch;

			this.reverts = [];

			this.matches = this.search();

			if (this.matches.length) {
				this.processMatches();
			}

		}

		Finder.prototype = {

			/**
			 * Searches for all matches that comply with the instance's 'match' option
			 */
			search: function() {

				var match;
				var matchIndex = 0;
				var offset = 0;
				var regex = this.options.find;
				var textAggregation = this.getAggregateText();
				var matches = [];
				var self = this;

				regex = typeof regex === 'string' ? RegExp(escapeRegExp(regex), 'g') : regex;

				matchAggregation(textAggregation);

				function matchAggregation(textAggregation) {
					for (var i = 0, l = textAggregation.length; i < l; ++i) {

						var text = textAggregation[i];

						if (typeof text !== 'string') {
							// Deal with nested contexts: (recursive)
							matchAggregation(text);
							continue;
						}

						if (regex.global) {
							while (match = regex.exec(text)) {
								matches.push(self.prepMatch(match, matchIndex++, offset));
							}
						} else {
							if (match = text.match(regex)) {
								matches.push(self.prepMatch(match, 0, offset));
							}
						}

						offset += text.length;
					}
				}

				return matches;

			},

			/**
			 * Prepares a single match with useful meta info:
			 */
			prepMatch: function(match, matchIndex, characterOffset) {

				if (!match[0]) {
					throw new Error('findAndReplaceDOMText cannot handle zero-length matches');
				}

				match.endIndex = characterOffset + match.index + match[0].length;
				match.startIndex = characterOffset + match.index;
				match.index = matchIndex;

				return match;
			},

			/**
			 * Gets aggregate text within subject node
			 */
			getAggregateText: function() {

				var elementFilter = this.options.filterElements;
				var forceContext = this.options.forceContext;

				return getText(this.node);

				/**
				 * Gets aggregate text of a node without resorting
				 * to broken innerText/textContent
				 */
				function getText(node) {

					if (node.nodeType === Node.TEXT_NODE) {
						return [node.data];
					}

					if (elementFilter && !elementFilter(node)) {
						return [];
					}

					var txt = [''];
					var i = 0;

					if (node = node.firstChild) do {

						if (node.nodeType === Node.TEXT_NODE) {
							txt[i] += node.data;
							continue;
						}

						var innerText = getText(node);

						if (
							forceContext &&
							node.nodeType === Node.ELEMENT_NODE &&
							(forceContext === true || forceContext(node))
						) {
							txt[++i] = innerText;
							txt[++i] = '';
						} else {
							if (typeof innerText[0] === 'string') {
								// Bridge nested text-node data so that they're
								// not considered their own contexts:
								// I.e. ['some', ['thing']] -> ['something']
								txt[i] += innerText.shift();
							}
							if (innerText.length) {
								txt[++i] = innerText;
								txt[++i] = '';
							}
						}
					} while (node = node.nextSibling);

					return txt;

				}

			},

			/**
			 * Steps through the target node, looking for matches, and
			 * calling replaceFn when a match is found.
			 */
			processMatches: function() {

				var matches = this.matches;
				var node = this.node;
				var elementFilter = this.options.filterElements;

				var startPortion,
					endPortion,
					innerPortions = [],
					curNode = node,
					match = matches.shift(),
					atIndex = 0, // i.e. nodeAtIndex
					matchIndex = 0,
					portionIndex = 0,
					doAvoidNode,
					nodeStack = [node];

				out: while (true) {

					if (curNode.nodeType === Node.TEXT_NODE) {

						if (!endPortion && curNode.length + atIndex >= match.endIndex) {

							// We've found the ending
							endPortion = {
								node: curNode,
								index: portionIndex++,
								text: curNode.data.substring(match.startIndex - atIndex, match.endIndex - atIndex),
								indexInMatch: atIndex - match.startIndex,
								indexInNode: match.startIndex - atIndex, // always zero for end-portions
								endIndexInNode: match.endIndex - atIndex,
								isEnd: true
							};

						} else if (startPortion) {
							// Intersecting node
							innerPortions.push({
								node: curNode,
								index: portionIndex++,
								text: curNode.data,
								indexInMatch: atIndex - match.startIndex,
								indexInNode: 0 // always zero for inner-portions
							});
						}

						if (!startPortion && curNode.length + atIndex > match.startIndex) {
							// We've found the match start
							startPortion = {
								node: curNode,
								index: portionIndex++,
								indexInMatch: 0,
								indexInNode: match.startIndex - atIndex,
								endIndexInNode: match.endIndex - atIndex,
								text: curNode.data.substring(match.startIndex - atIndex, match.endIndex - atIndex)
							};
						}

						atIndex += curNode.data.length;

					}

					doAvoidNode = curNode.nodeType === Node.ELEMENT_NODE && elementFilter && !elementFilter(curNode);

					if (startPortion && endPortion) {

						curNode = this.replaceMatch(match, startPortion, innerPortions, endPortion);

						// processMatches has to return the node that replaced the endNode
						// and then we step back so we can continue from the end of the
						// match:

						atIndex -= (endPortion.node.data.length - endPortion.endIndexInNode);

						startPortion = null;
						endPortion = null;
						innerPortions = [];
						match = matches.shift();
						portionIndex = 0;
						matchIndex++;

						if (!match) {
							break; // no more matches
						}

					} else if (
						!doAvoidNode &&
						(curNode.firstChild || curNode.nextSibling)
					) {
						// Move down or forward:
						if (curNode.firstChild) {
							nodeStack.push(curNode);
							curNode = curNode.firstChild;
						} else {
							curNode = curNode.nextSibling;
						}
						continue;
					}

					// Move forward or up:
					while (true) {
						if (curNode.nextSibling) {
							curNode = curNode.nextSibling;
							break;
						}
						curNode = nodeStack.pop();
						if (curNode === node) {
							break out;
						}
					}

				}

			},

			/**
			 * Reverts ... TODO
			 */
			revert: function() {
				// Reversion occurs backwards so as to avoid nodes subsequently
				// replaced during the matching phase (a forward process):
				for (var l = this.reverts.length; l--;) {
					this.reverts[l]();
				}
				this.reverts = [];
			},

			prepareReplacementString: function(string, portion, match) {
				var portionMode = this.options.portionMode;
				if (
					portionMode === PORTION_MODE_FIRST &&
					portion.indexInMatch > 0
				) {
					return '';
				}
				string = string.replace(/\$(\d+|&|`|')/g, function($0, t) {
					var replacement;
					switch(t) {
						case '&':
							replacement = match[0];
							break;
						case '`':
							replacement = match.input.substring(0, match.startIndex);
							break;
						case '\'':
							replacement = match.input.substring(match.endIndex);
							break;
						default:
							replacement = match[+t];
					}
					return replacement;
				});

				if (portionMode === PORTION_MODE_FIRST) {
					return string;
				}

				if (portion.isEnd) {
					return string.substring(portion.indexInMatch);
				}

				return string.substring(portion.indexInMatch, portion.indexInMatch + portion.text.length);
			},

			getPortionReplacementNode: function(portion, match) {

				var replacement = this.options.replace || '$&';
				var wrapper = this.options.wrap;
				var wrapperClass = this.options.wrapClass;

				if (wrapper && wrapper.nodeType) {
					// Wrapper has been provided as a stencil-node for us to clone:
					var clone = doc.createElement('div');
					clone.innerHTML = wrapper.outerHTML || new XMLSerializer().serializeToString(wrapper);
					wrapper = clone.firstChild;
				}

				if (typeof replacement == 'function') {
					replacement = replacement(portion, match);
					if (replacement && replacement.nodeType) {
						return replacement;
					}
					return doc.createTextNode(String(replacement));
				}

				var el = typeof wrapper == 'string' ? doc.createElement(wrapper) : wrapper;

	 			if (el && wrapperClass) {
					el.className = wrapperClass;
				}

				replacement = doc.createTextNode(
					this.prepareReplacementString(
						replacement, portion, match
					)
				);

				if (!replacement.data) {
					return replacement;
				}

				if (!el) {
					return replacement;
				}

				el.appendChild(replacement);

				return el;
			},

			replaceMatch: function(match, startPortion, innerPortions, endPortion) {

				var matchStartNode = startPortion.node;
				var matchEndNode = endPortion.node;

				var precedingTextNode;
				var followingTextNode;

				if (matchStartNode === matchEndNode) {

					var node = matchStartNode;

					if (startPortion.indexInNode > 0) {
						// Add `before` text node (before the match)
						precedingTextNode = doc.createTextNode(node.data.substring(0, startPortion.indexInNode));
						node.parentNode.insertBefore(precedingTextNode, node);
					}

					// Create the replacement node:
					var newNode = this.getPortionReplacementNode(
						endPortion,
						match
					);

					node.parentNode.insertBefore(newNode, node);

					if (endPortion.endIndexInNode < node.length) { // ?????
						// Add `after` text node (after the match)
						followingTextNode = doc.createTextNode(node.data.substring(endPortion.endIndexInNode));
						node.parentNode.insertBefore(followingTextNode, node);
					}

					node.parentNode.removeChild(node);

					this.reverts.push(function() {
						if (precedingTextNode === newNode.previousSibling) {
							precedingTextNode.parentNode.removeChild(precedingTextNode);
						}
						if (followingTextNode === newNode.nextSibling) {
							followingTextNode.parentNode.removeChild(followingTextNode);
						}
						newNode.parentNode.replaceChild(node, newNode);
					});

					return newNode;

				} else {
					// Replace matchStartNode -> [innerMatchNodes...] -> matchEndNode (in that order)


					precedingTextNode = doc.createTextNode(
						matchStartNode.data.substring(0, startPortion.indexInNode)
					);

					followingTextNode = doc.createTextNode(
						matchEndNode.data.substring(endPortion.endIndexInNode)
					);

					var firstNode = this.getPortionReplacementNode(
						startPortion,
						match
					);

					var innerNodes = [];

					for (var i = 0, l = innerPortions.length; i < l; ++i) {
						var portion = innerPortions[i];
						var innerNode = this.getPortionReplacementNode(
							portion,
							match
						);
						portion.node.parentNode.replaceChild(innerNode, portion.node);
						this.reverts.push((function(portion, innerNode) {
							return function() {
								innerNode.parentNode.replaceChild(portion.node, innerNode);
							};
						}(portion, innerNode)));
						innerNodes.push(innerNode);
					}

					var lastNode = this.getPortionReplacementNode(
						endPortion,
						match
					);

					matchStartNode.parentNode.insertBefore(precedingTextNode, matchStartNode);
					matchStartNode.parentNode.insertBefore(firstNode, matchStartNode);
					matchStartNode.parentNode.removeChild(matchStartNode);

					matchEndNode.parentNode.insertBefore(lastNode, matchEndNode);
					matchEndNode.parentNode.insertBefore(followingTextNode, matchEndNode);
					matchEndNode.parentNode.removeChild(matchEndNode);

					this.reverts.push(function() {
						precedingTextNode.parentNode.removeChild(precedingTextNode);
						firstNode.parentNode.replaceChild(matchStartNode, firstNode);
						followingTextNode.parentNode.removeChild(followingTextNode);
						lastNode.parentNode.replaceChild(matchEndNode, lastNode);
					});

					return lastNode;
				}
			}

		};

		return exposed;

	}));


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

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

/***/ }
/******/ ]);