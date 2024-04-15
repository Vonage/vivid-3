/******/ (() => {
	// webpackBootstrap
	/******/ 'use strict';
	/******/ var __webpack_modules__ = {
		/***/ '../consts/src/index.ts':
			/*!******************************!*\
  !*** ../consts/src/index.ts ***!
  \******************************/
			/***/ (
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__
			) => {
				__webpack_require__.r(__webpack_exports__);
				/* harmony export */ __webpack_require__.d(__webpack_exports__, {
					/* harmony export */ ICONS_BASE_URL: () =>
						/* reexport safe */ _lib_consts__WEBPACK_IMPORTED_MODULE_0__.ICONS_BASE_URL,
					/* harmony export */ ICONS_VERSION: () =>
						/* reexport safe */ _lib_consts__WEBPACK_IMPORTED_MODULE_0__.ICONS_VERSION,
					/* harmony export */
				});
				/* harmony import */ var _lib_consts__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						/*! ./lib/consts */ '../consts/src/lib/consts.ts'
					);

				/***/
			},

		/***/ '../consts/src/lib/consts.ts':
			/*!***********************************!*\
  !*** ../consts/src/lib/consts.ts ***!
  \***********************************/
			/***/ (
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__
			) => {
				__webpack_require__.r(__webpack_exports__);
				/* harmony export */ __webpack_require__.d(__webpack_exports__, {
					/* harmony export */ ICONS_BASE_URL: () =>
						/* reexport safe */ _icons__WEBPACK_IMPORTED_MODULE_0__.ICONS_BASE_URL,
					/* harmony export */ ICONS_VERSION: () =>
						/* reexport safe */ _icons__WEBPACK_IMPORTED_MODULE_0__.ICONS_VERSION,
					/* harmony export */
				});
				/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(/*! ./icons */ '../consts/src/lib/icons.ts');

				/***/
			},

		/***/ '../consts/src/lib/icons.ts':
			/*!**********************************!*\
  !*** ../consts/src/lib/icons.ts ***!
  \**********************************/
			/***/ (
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__
			) => {
				__webpack_require__.r(__webpack_exports__);
				/* harmony export */ __webpack_require__.d(__webpack_exports__, {
					/* harmony export */ ICONS_BASE_URL: () =>
						/* binding */ ICONS_BASE_URL,
					/* harmony export */ ICONS_VERSION: () => /* binding */ ICONS_VERSION,
					/* harmony export */
				});
				const ICONS_BASE_URL = 'https://icon.resources.vonage.com';
				const ICONS_VERSION = '5.5.5';

				/***/
			},

		/***/ './node_modules/tslib/tslib.es6.js':
			/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
			/***/ (
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__
			) => {
				__webpack_require__.r(__webpack_exports__);
				/* harmony export */ __webpack_require__.d(__webpack_exports__, {
					/* harmony export */ __assign: () => /* binding */ __assign,
					/* harmony export */ __asyncDelegator: () =>
						/* binding */ __asyncDelegator,
					/* harmony export */ __asyncGenerator: () =>
						/* binding */ __asyncGenerator,
					/* harmony export */ __asyncValues: () => /* binding */ __asyncValues,
					/* harmony export */ __await: () => /* binding */ __await,
					/* harmony export */ __awaiter: () => /* binding */ __awaiter,
					/* harmony export */ __classPrivateFieldGet: () =>
						/* binding */ __classPrivateFieldGet,
					/* harmony export */ __classPrivateFieldSet: () =>
						/* binding */ __classPrivateFieldSet,
					/* harmony export */ __createBinding: () =>
						/* binding */ __createBinding,
					/* harmony export */ __decorate: () => /* binding */ __decorate,
					/* harmony export */ __exportStar: () => /* binding */ __exportStar,
					/* harmony export */ __extends: () => /* binding */ __extends,
					/* harmony export */ __generator: () => /* binding */ __generator,
					/* harmony export */ __importDefault: () =>
						/* binding */ __importDefault,
					/* harmony export */ __importStar: () => /* binding */ __importStar,
					/* harmony export */ __makeTemplateObject: () =>
						/* binding */ __makeTemplateObject,
					/* harmony export */ __metadata: () => /* binding */ __metadata,
					/* harmony export */ __param: () => /* binding */ __param,
					/* harmony export */ __read: () => /* binding */ __read,
					/* harmony export */ __rest: () => /* binding */ __rest,
					/* harmony export */ __spread: () => /* binding */ __spread,
					/* harmony export */ __spreadArrays: () =>
						/* binding */ __spreadArrays,
					/* harmony export */ __values: () => /* binding */ __values,
					/* harmony export */
				});
				/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
				/* global Reflect, Promise */

				var extendStatics = function (d, b) {
					extendStatics =
						Object.setPrototypeOf ||
						({ __proto__: [] } instanceof Array &&
							function (d, b) {
								d.__proto__ = b;
							}) ||
						function (d, b) {
							for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
						};
					return extendStatics(d, b);
				};

				function __extends(d, b) {
					extendStatics(d, b);
					function __() {
						this.constructor = d;
					}
					d.prototype =
						b === null
							? Object.create(b)
							: ((__.prototype = b.prototype), new __());
				}

				var __assign = function () {
					__assign =
						Object.assign ||
						function __assign(t) {
							for (var s, i = 1, n = arguments.length; i < n; i++) {
								s = arguments[i];
								for (var p in s)
									if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
							}
							return t;
						};
					return __assign.apply(this, arguments);
				};

				function __rest(s, e) {
					var t = {};
					for (var p in s)
						if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
							t[p] = s[p];
					if (s != null && typeof Object.getOwnPropertySymbols === 'function')
						for (
							var i = 0, p = Object.getOwnPropertySymbols(s);
							i < p.length;
							i++
						) {
							if (
								e.indexOf(p[i]) < 0 &&
								Object.prototype.propertyIsEnumerable.call(s, p[i])
							)
								t[p[i]] = s[p[i]];
						}
					return t;
				}

				function __decorate(decorators, target, key, desc) {
					var c = arguments.length,
						r =
							c < 3
								? target
								: desc === null
								? (desc = Object.getOwnPropertyDescriptor(target, key))
								: desc,
						d;
					if (
						typeof Reflect === 'object' &&
						typeof Reflect.decorate === 'function'
					)
						r = Reflect.decorate(decorators, target, key, desc);
					else
						for (var i = decorators.length - 1; i >= 0; i--)
							if ((d = decorators[i]))
								r =
									(c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) ||
									r;
					return c > 3 && r && Object.defineProperty(target, key, r), r;
				}

				function __param(paramIndex, decorator) {
					return function (target, key) {
						decorator(target, key, paramIndex);
					};
				}

				function __metadata(metadataKey, metadataValue) {
					if (
						typeof Reflect === 'object' &&
						typeof Reflect.metadata === 'function'
					)
						return Reflect.metadata(metadataKey, metadataValue);
				}

				function __awaiter(thisArg, _arguments, P, generator) {
					function adopt(value) {
						return value instanceof P
							? value
							: new P(function (resolve) {
									resolve(value);
							  });
					}
					return new (P || (P = Promise))(function (resolve, reject) {
						function fulfilled(value) {
							try {
								step(generator.next(value));
							} catch (e) {
								reject(e);
							}
						}
						function rejected(value) {
							try {
								step(generator['throw'](value));
							} catch (e) {
								reject(e);
							}
						}
						function step(result) {
							result.done
								? resolve(result.value)
								: adopt(result.value).then(fulfilled, rejected);
						}
						step(
							(generator = generator.apply(thisArg, _arguments || [])).next()
						);
					});
				}

				function __generator(thisArg, body) {
					var _ = {
							label: 0,
							sent: function () {
								if (t[0] & 1) throw t[1];
								return t[1];
							},
							trys: [],
							ops: [],
						},
						f,
						y,
						t,
						g;
					return (
						(g = { next: verb(0), throw: verb(1), return: verb(2) }),
						typeof Symbol === 'function' &&
							(g[Symbol.iterator] = function () {
								return this;
							}),
						g
					);
					function verb(n) {
						return function (v) {
							return step([n, v]);
						};
					}
					function step(op) {
						if (f) throw new TypeError('Generator is already executing.');
						while (_)
							try {
								if (
									((f = 1),
									y &&
										(t =
											op[0] & 2
												? y['return']
												: op[0]
												? y['throw'] || ((t = y['return']) && t.call(y), 0)
												: y.next) &&
										!(t = t.call(y, op[1])).done)
								)
									return t;
								if (((y = 0), t)) op = [op[0] & 2, t.value];
								switch (op[0]) {
									case 0:
									case 1:
										t = op;
										break;
									case 4:
										_.label++;
										return { value: op[1], done: false };
									case 5:
										_.label++;
										y = op[1];
										op = [0];
										continue;
									case 7:
										op = _.ops.pop();
										_.trys.pop();
										continue;
									default:
										if (
											!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
											(op[0] === 6 || op[0] === 2)
										) {
											_ = 0;
											continue;
										}
										if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
											_.label = op[1];
											break;
										}
										if (op[0] === 6 && _.label < t[1]) {
											_.label = t[1];
											t = op;
											break;
										}
										if (t && _.label < t[2]) {
											_.label = t[2];
											_.ops.push(op);
											break;
										}
										if (t[2]) _.ops.pop();
										_.trys.pop();
										continue;
								}
								op = body.call(thisArg, _);
							} catch (e) {
								op = [6, e];
								y = 0;
							} finally {
								f = t = 0;
							}
						if (op[0] & 5) throw op[1];
						return { value: op[0] ? op[1] : void 0, done: true };
					}
				}

				function __createBinding(o, m, k, k2) {
					if (k2 === undefined) k2 = k;
					o[k2] = m[k];
				}

				function __exportStar(m, exports) {
					for (var p in m)
						if (p !== 'default' && !exports.hasOwnProperty(p))
							exports[p] = m[p];
				}

				function __values(o) {
					var s = typeof Symbol === 'function' && Symbol.iterator,
						m = s && o[s],
						i = 0;
					if (m) return m.call(o);
					if (o && typeof o.length === 'number')
						return {
							next: function () {
								if (o && i >= o.length) o = void 0;
								return { value: o && o[i++], done: !o };
							},
						};
					throw new TypeError(
						s ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
					);
				}

				function __read(o, n) {
					var m = typeof Symbol === 'function' && o[Symbol.iterator];
					if (!m) return o;
					var i = m.call(o),
						r,
						ar = [],
						e;
					try {
						while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
							ar.push(r.value);
					} catch (error) {
						e = { error: error };
					} finally {
						try {
							if (r && !r.done && (m = i['return'])) m.call(i);
						} finally {
							if (e) throw e.error;
						}
					}
					return ar;
				}

				function __spread() {
					for (var ar = [], i = 0; i < arguments.length; i++)
						ar = ar.concat(__read(arguments[i]));
					return ar;
				}

				function __spreadArrays() {
					for (var s = 0, i = 0, il = arguments.length; i < il; i++)
						s += arguments[i].length;
					for (var r = Array(s), k = 0, i = 0; i < il; i++)
						for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
							r[k] = a[j];
					return r;
				}

				function __await(v) {
					return this instanceof __await
						? ((this.v = v), this)
						: new __await(v);
				}

				function __asyncGenerator(thisArg, _arguments, generator) {
					if (!Symbol.asyncIterator)
						throw new TypeError('Symbol.asyncIterator is not defined.');
					var g = generator.apply(thisArg, _arguments || []),
						i,
						q = [];
					return (
						(i = {}),
						verb('next'),
						verb('throw'),
						verb('return'),
						(i[Symbol.asyncIterator] = function () {
							return this;
						}),
						i
					);
					function verb(n) {
						if (g[n])
							i[n] = function (v) {
								return new Promise(function (a, b) {
									q.push([n, v, a, b]) > 1 || resume(n, v);
								});
							};
					}
					function resume(n, v) {
						try {
							step(g[n](v));
						} catch (e) {
							settle(q[0][3], e);
						}
					}
					function step(r) {
						r.value instanceof __await
							? Promise.resolve(r.value.v).then(fulfill, reject)
							: settle(q[0][2], r);
					}
					function fulfill(value) {
						resume('next', value);
					}
					function reject(value) {
						resume('throw', value);
					}
					function settle(f, v) {
						if ((f(v), q.shift(), q.length)) resume(q[0][0], q[0][1]);
					}
				}

				function __asyncDelegator(o) {
					var i, p;
					return (
						(i = {}),
						verb('next'),
						verb('throw', function (e) {
							throw e;
						}),
						verb('return'),
						(i[Symbol.iterator] = function () {
							return this;
						}),
						i
					);
					function verb(n, f) {
						i[n] = o[n]
							? function (v) {
									return (p = !p)
										? { value: __await(o[n](v)), done: n === 'return' }
										: f
										? f(v)
										: v;
							  }
							: f;
					}
				}

				function __asyncValues(o) {
					if (!Symbol.asyncIterator)
						throw new TypeError('Symbol.asyncIterator is not defined.');
					var m = o[Symbol.asyncIterator],
						i;
					return m
						? m.call(o)
						: ((o =
								typeof __values === 'function'
									? __values(o)
									: o[Symbol.iterator]()),
						  (i = {}),
						  verb('next'),
						  verb('throw'),
						  verb('return'),
						  (i[Symbol.asyncIterator] = function () {
								return this;
						  }),
						  i);
					function verb(n) {
						i[n] =
							o[n] &&
							function (v) {
								return new Promise(function (resolve, reject) {
									(v = o[n](v)), settle(resolve, reject, v.done, v.value);
								});
							};
					}
					function settle(resolve, reject, d, v) {
						Promise.resolve(v).then(function (v) {
							resolve({ value: v, done: d });
						}, reject);
					}
				}

				function __makeTemplateObject(cooked, raw) {
					if (Object.defineProperty) {
						Object.defineProperty(cooked, 'raw', { value: raw });
					} else {
						cooked.raw = raw;
					}
					return cooked;
				}

				function __importStar(mod) {
					if (mod && mod.__esModule) return mod;
					var result = {};
					if (mod != null)
						for (var k in mod)
							if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
					result.default = mod;
					return result;
				}

				function __importDefault(mod) {
					return mod && mod.__esModule ? mod : { default: mod };
				}

				function __classPrivateFieldGet(receiver, privateMap) {
					if (!privateMap.has(receiver)) {
						throw new TypeError(
							'attempted to get private field on non-instance'
						);
					}
					return privateMap.get(receiver);
				}

				function __classPrivateFieldSet(receiver, privateMap, value) {
					if (!privateMap.has(receiver)) {
						throw new TypeError(
							'attempted to set private field on non-instance'
						);
					}
					privateMap.set(receiver, value);
					return value;
				}

				/***/
			},

		/******/
	};
	/************************************************************************/
	/******/ // The module cache
	/******/ var __webpack_module_cache__ = {};
	/******/
	/******/ // The require function
	/******/ function __webpack_require__(moduleId) {
		/******/ // Check if module is in cache
		/******/ var cachedModule = __webpack_module_cache__[moduleId];
		/******/ if (cachedModule !== undefined) {
			/******/ return cachedModule.exports;
			/******/
		}
		/******/ // Create a new module (and put it into the cache)
		/******/ var module = (__webpack_module_cache__[moduleId] = {
			/******/ // no module.id needed
			/******/ // no module.loaded needed
			/******/ exports: {},
			/******/
		});
		/******/
		/******/ // Execute the module function
		/******/ __webpack_modules__[moduleId](
			module,
			module.exports,
			__webpack_require__
		);
		/******/
		/******/ // Return the exports of the module
		/******/ return module.exports;
		/******/
	}
	/******/
	/************************************************************************/
	/******/ /* webpack/runtime/define property getters */
	/******/ (() => {
		/******/ // define getter functions for harmony exports
		/******/ __webpack_require__.d = (exports, definition) => {
			/******/ for (var key in definition) {
				/******/ if (
					__webpack_require__.o(definition, key) &&
					!__webpack_require__.o(exports, key)
				) {
					/******/ Object.defineProperty(exports, key, {
						enumerable: true,
						get: definition[key],
					});
					/******/
				}
				/******/
			}
			/******/
		};
		/******/
	})();
	/******/
	/******/ /* webpack/runtime/hasOwnProperty shorthand */
	/******/ (() => {
		/******/ __webpack_require__.o = (obj, prop) =>
			Object.prototype.hasOwnProperty.call(obj, prop);
		/******/
	})();
	/******/
	/******/ /* webpack/runtime/make namespace object */
	/******/ (() => {
		/******/ // define __esModule on exports
		/******/ __webpack_require__.r = (exports) => {
			/******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
				/******/ Object.defineProperty(exports, Symbol.toStringTag, {
					value: 'Module',
				});
				/******/
			}
			/******/ Object.defineProperty(exports, '__esModule', { value: true });
			/******/
		};
		/******/
	})();
	/******/
	/************************************************************************/
	var __webpack_exports__ = {};
	// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
	(() => {
		/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
		__webpack_require__.r(__webpack_exports__);
		/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ =
			__webpack_require__(/*! tslib */ './node_modules/tslib/tslib.es6.js');
		/* harmony import */ var _consts_src_index__WEBPACK_IMPORTED_MODULE_0__ =
			__webpack_require__(
				/*! ../../consts/src/index */ '../consts/src/index.ts'
			);

		figma.showUI(__html__);
		const ROW_SIZE = 20;
		figma.ui.onmessage = (msg) =>
			(0, tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(
				void 0,
				void 0,
				void 0,
				function* () {
					if (msg.type === 'add-icons') {
						// Remove all existing nodes
						figma.currentPage.children.forEach((node) => {
							if (
								node.type === 'FRAME' ||
								node.type === 'COMPONENT' ||
								node.type === 'INSTANCE'
							) {
								node.remove();
							}
						});
						const svgsJson = yield loadManifest();
						const categorizedIcons = categorizeIconsByCategory(svgsJson);
						const categories = Object.keys(categorizedIcons).sort();
						let lastFramePosition = 0;
						// Add icons to frames
						for (let i = 0; i < categories.length; i++) {
							const category = categories[i];
							const categoryNode = createCategoryFrame(
								category,
								lastFramePosition
							);
							const icons = categorizedIcons[category].sort((a, b) =>
								a.id.localeCompare(b.id)
							);
							let count = 0;
							for (let j = 0; j < icons.length; j++) {
								const icon = icons[j];
								const svgJson = yield loadSvgs(icon.id);
								try {
									const svg = figma.createNodeFromSvg(svgJson);
									svg.name = replaceSuffix(icon.id);
									svg.x = 50 * count + 10;
									svg.y = 50 * Math.floor(j / ROW_SIZE) + 10;
									if (count >= ROW_SIZE - 1) {
										count = 0;
										categoryNode.resize(
											categoryNode.width,
											categoryNode.height + 50
										);
									} else {
										count++;
									}
									lastFramePosition = categoryNode.y + categoryNode.height;
									const component = figma.createComponentFromNode(svg);
									component.description = 'keyword: ' + icon.keyword.join(', ');
									categoryNode.appendChild(component);
								} catch (e) {
									console.error(icon.id + ' failed to load');
								}
							}
							console.log(
								category +
									' category loaded -> ' +
									(i + 1) +
									' of ' +
									categories.length +
									' categories'
							);
						}
						console.log('All categories loaded!!!!');
						figma.closePlugin();
					}
				}
			);
		function createCategoryFrame(category, lastFramePosition) {
			// Create frames for each category
			const categoryNode = figma.createFrame();
			categoryNode.name = category;
			categoryNode.resize(1000, 50);
			categoryNode.cornerRadius = 8;
			categoryNode.y = lastFramePosition + 50;
			figma.currentPage.appendChild(categoryNode);
			return categoryNode;
		}
		function replaceSuffix(str) {
			const pattern = /-(solid|line|mono|color)$/;
			if (pattern.test(str)) {
				// Replace the last "-" before the suffix with "/"
				return str.replace(/-(solid|line|mono|color)$/, '/$1');
			} else {
				return str;
			}
		}
		// Categorize icons
		function categorizeIconsByCategory(icons) {
			const categorizedIcons = {};
			categorizedIcons['uncategorized'] = [];
			icons.forEach((icon) => {
				var _a;
				const category =
					(_a = icon.tag.find((tag) => tag.startsWith('category_'))) === null ||
					_a === void 0
						? void 0
						: _a.substring(9);
				if (category) {
					if (!categorizedIcons[category]) {
						categorizedIcons[category] = [];
					}
					categorizedIcons[category].push(icon);
				} else {
					categorizedIcons['uncategorized'].push(icon);
				}
			});
			return categorizedIcons;
		}
		// Load svgs from json
		function loadSvgs(name) {
			return (0, tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(
				this,
				void 0,
				void 0,
				function* () {
					try {
						const response = yield fetch(
							`${_consts_src_index__WEBPACK_IMPORTED_MODULE_0__.ICONS_BASE_URL}/v${_consts_src_index__WEBPACK_IMPORTED_MODULE_0__.ICONS_VERSION}/${name}.svg`
						);
						return yield response.text();
					} catch (e) {
						console.error('failed to load svg' + e);
						return '';
					}
				}
			);
		}
		function loadManifest() {
			return (0, tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(
				this,
				void 0,
				void 0,
				function* () {
					try {
						const response = yield fetch(
							`${_consts_src_index__WEBPACK_IMPORTED_MODULE_0__.ICONS_BASE_URL}/v${_consts_src_index__WEBPACK_IMPORTED_MODULE_0__.ICONS_VERSION}/manifest.json`
						);
						return response.json();
					} catch (e) {
						console.error('error loading the manifest', e);
						figma.closePlugin();
						return;
					}
				}
			);
		}
	})();

	/******/
})();
