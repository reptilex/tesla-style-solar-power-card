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
function t(t,e,i,n){var s,o=arguments.length,r=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,n);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(r=(o<3?s(r):o>3?s(e,i,r):s(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */}const e="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,i=(t,e,i=null)=>{for(;e!==i;){const i=e.nextSibling;t.removeChild(e),e=i}},n=`{{lit-${String(Math.random()).slice(2)}}}`,s=`\x3c!--${n}--\x3e`,o=new RegExp(`${n}|${s}`);class r{constructor(t,e){this.parts=[],this.element=e;const i=[],s=[],r=document.createTreeWalker(e.content,133,null,!1);let c=0,d=-1,p=0;const{strings:u,values:{length:_}}=t;for(;p<_;){const t=r.nextNode();if(null!==t){if(d++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:i}=e;let n=0;for(let t=0;t<i;t++)a(e[t].name,"$lit$")&&n++;for(;n-- >0;){const e=u[p],i=h.exec(e)[2],n=i.toLowerCase()+"$lit$",s=t.getAttribute(n);t.removeAttribute(n);const r=s.split(o);this.parts.push({type:"attribute",index:d,name:i,strings:r}),p+=r.length-1}}"TEMPLATE"===t.tagName&&(s.push(t),r.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(n)>=0){const n=t.parentNode,s=e.split(o),r=s.length-1;for(let e=0;e<r;e++){let i,o=s[e];if(""===o)i=l();else{const t=h.exec(o);null!==t&&a(t[2],"$lit$")&&(o=o.slice(0,t.index)+t[1]+t[2].slice(0,-"$lit$".length)+t[3]),i=document.createTextNode(o)}n.insertBefore(i,t),this.parts.push({type:"node",index:++d})}""===s[r]?(n.insertBefore(l(),t),i.push(t)):t.data=s[r],p+=r}}else if(8===t.nodeType)if(t.data===n){const e=t.parentNode;null!==t.previousSibling&&d!==c||(d++,e.insertBefore(l(),t)),c=d,this.parts.push({type:"node",index:d}),null===t.nextSibling?t.data="":(i.push(t),d--),p++}else{let e=-1;for(;-1!==(e=t.data.indexOf(n,e+1));)this.parts.push({type:"node",index:-1}),p++}}else r.currentNode=s.pop()}for(const t of i)t.parentNode.removeChild(t)}}const a=(t,e)=>{const i=t.length-e.length;return i>=0&&t.slice(i)===e},c=t=>-1!==t.index,l=()=>document.createComment(""),h=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function d(t,e){const{element:{content:i},parts:n}=t,s=document.createTreeWalker(i,133,null,!1);let o=u(n),r=n[o],a=-1,c=0;const l=[];let h=null;for(;s.nextNode();){a++;const t=s.currentNode;for(t.previousSibling===h&&(h=null),e.has(t)&&(l.push(t),null===h&&(h=t)),null!==h&&c++;void 0!==r&&r.index===a;)r.index=null!==h?-1:r.index-c,o=u(n,o),r=n[o]}l.forEach((t=>t.parentNode.removeChild(t)))}const p=t=>{let e=11===t.nodeType?0:1;const i=document.createTreeWalker(t,133,null,!1);for(;i.nextNode();)e++;return e},u=(t,e=-1)=>{for(let i=e+1;i<t.length;i++){const e=t[i];if(c(e))return i}return-1};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const _=new WeakMap,g=t=>"function"==typeof t&&_.has(t),y={},m={};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class f{constructor(t,e,i){this.__parts=[],this.template=t,this.processor=e,this.options=i}update(t){let e=0;for(const i of this.__parts)void 0!==i&&i.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=e?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),i=[],n=this.template.parts,s=document.createTreeWalker(t,133,null,!1);let o,r=0,a=0,l=s.nextNode();for(;r<n.length;)if(o=n[r],c(o)){for(;a<o.index;)a++,"TEMPLATE"===l.nodeName&&(i.push(l),s.currentNode=l.content),null===(l=s.nextNode())&&(s.currentNode=i.pop(),l=s.nextNode());if("node"===o.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(l.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,o.name,o.strings,this.options));r++}else this.__parts.push(void 0),r++;return e&&(document.adoptNode(t),customElements.upgrade(t)),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const v=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:t=>t}),w=` ${n} `;class S{constructor(t,e,i,n){this.strings=t,this.values=e,this.type=i,this.processor=n}getHTML(){const t=this.strings.length-1;let e="",i=!1;for(let o=0;o<t;o++){const t=this.strings[o],r=t.lastIndexOf("\x3c!--");i=(r>-1||i)&&-1===t.indexOf("--\x3e",r+1);const a=h.exec(t);e+=null===a?t+(i?w:s):t.substr(0,a.index)+a[1]+a[2]+"$lit$"+a[3]+n}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");let e=this.getHTML();return void 0!==v&&(e=v.createHTML(e)),t.innerHTML=e,t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const b=t=>null===t||!("object"==typeof t||"function"==typeof t),x=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class C{constructor(t,e,i){this.dirty=!0,this.element=t,this.name=e,this.strings=i,this.parts=[];for(let t=0;t<i.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new $(this)}_getValue(){const t=this.strings,e=t.length-1,i=this.parts;if(1===e&&""===t[0]&&""===t[1]){const t=i[0].value;if("symbol"==typeof t)return String(t);if("string"==typeof t||!x(t))return t}let n="";for(let s=0;s<e;s++){n+=t[s];const e=i[s];if(void 0!==e){const t=e.value;if(b(t)||!x(t))n+="string"==typeof t?t:String(t);else for(const e of t)n+="string"==typeof e?e:String(e)}}return n+=t[e],n}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class ${constructor(t){this.value=void 0,this.committer=t}setValue(t){t===y||b(t)&&t===this.value||(this.value=t,g(t)||(this.committer.dirty=!0))}commit(){for(;g(this.value);){const t=this.value;this.value=y,t(this)}this.value!==y&&this.committer.commit()}}class M{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(l()),this.endNode=t.appendChild(l())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=l()),t.__insert(this.endNode=l())}insertAfterPart(t){t.__insert(this.startNode=l()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;g(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=y,t(this)}const t=this.__pendingValue;t!==y&&(b(t)?t!==this.value&&this.__commitText(t):t instanceof S?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):x(t)?this.__commitIterable(t):t===m?(this.value=m,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,i="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=i:this.__commitNode(document.createTextNode(i)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof f&&this.value.template===e)this.value.update(t.values);else{const i=new f(e,t.processor,this.options),n=i._clone();i.update(t.values),this.__commitNode(n),this.value=i}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let i,n=0;for(const s of t)i=e[n],void 0===i&&(i=new M(this.options),e.push(i),0===n?i.appendIntoPart(this):i.insertAfterPart(e[n-1])),i.setValue(s),i.commit(),n++;n<e.length&&(e.length=n,this.clear(i&&i.endNode))}clear(t=this.startNode){i(this.startNode.parentNode,t.nextSibling,this.endNode)}}class E{constructor(t,e,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=i}setValue(t){this.__pendingValue=t}commit(){for(;g(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=y,t(this)}if(this.__pendingValue===y)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=y}}class P extends C{constructor(t,e,i){super(t,e,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new A(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class A extends ${}let N=!1;(()=>{try{const t={get capture(){return N=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class T{constructor(t,e,i){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=i,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;g(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=y,t(this)}if(this.__pendingValue===y)return;const t=this.__pendingValue,e=this.value,i=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),n=null!=t&&(null==e||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),n&&(this.__options=R(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=y}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const R=t=>t&&(N?{capture:t.capture,passive:t.passive,once:t.once}:t.capture)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */;function k(t){let e=D.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},D.set(t.type,e));let i=e.stringsArray.get(t.strings);if(void 0!==i)return i;const s=t.strings.join(n);return i=e.keyString.get(s),void 0===i&&(i=new r(t,t.getTemplateElement()),e.keyString.set(s,i)),e.stringsArray.set(t.strings,i),i}const D=new Map,O=new WeakMap;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const V=new
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class{handleAttributeExpressions(t,e,i,n){const s=e[0];if("."===s){return new P(t,e.slice(1),i).parts}if("@"===s)return[new T(t,e.slice(1),n.eventContext)];if("?"===s)return[new E(t,e.slice(1),i)];return new C(t,e,i).parts}handleTextExpression(t){return new M(t)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const U=(t,...e)=>new S(t,e,"html",V)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */,I=(t,e)=>`${t}--${e}`;let L=!0;void 0===window.ShadyCSS?L=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),L=!1);const Y=t=>e=>{const i=I(e.type,t);let s=D.get(i);void 0===s&&(s={stringsArray:new WeakMap,keyString:new Map},D.set(i,s));let o=s.stringsArray.get(e.strings);if(void 0!==o)return o;const a=e.strings.join(n);if(o=s.keyString.get(a),void 0===o){const i=e.getTemplateElement();L&&window.ShadyCSS.prepareTemplateDom(i,t),o=new r(e,i),s.keyString.set(a,o)}return s.stringsArray.set(e.strings,o),o},z=["html","svg"],H=new Set,q=(t,e,i)=>{H.add(t);const n=i?i.element:document.createElement("template"),s=e.querySelectorAll("style"),{length:o}=s;if(0===o)return void window.ShadyCSS.prepareTemplateStyles(n,t);const r=document.createElement("style");for(let t=0;t<o;t++){const e=s[t];e.parentNode.removeChild(e),r.textContent+=e.textContent}(t=>{z.forEach((e=>{const i=D.get(I(e,t));void 0!==i&&i.keyString.forEach((t=>{const{element:{content:e}}=t,i=new Set;Array.from(e.querySelectorAll("style")).forEach((t=>{i.add(t)})),d(t,i)}))}))})(t);const a=n.content;i?function(t,e,i=null){const{element:{content:n},parts:s}=t;if(null==i)return void n.appendChild(e);const o=document.createTreeWalker(n,133,null,!1);let r=u(s),a=0,c=-1;for(;o.nextNode();)for(c++,o.currentNode===i&&(a=p(e),i.parentNode.insertBefore(e,i));-1!==r&&s[r].index===c;){if(a>0){for(;-1!==r;)s[r].index+=a,r=u(s,r);return}r=u(s,r)}}(i,r,a.firstChild):a.insertBefore(r,a.firstChild),window.ShadyCSS.prepareTemplateStyles(n,t);const c=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==c)e.insertBefore(c.cloneNode(!0),e.firstChild);else if(i){a.insertBefore(r,a.firstChild);const t=new Set;t.add(r),d(i,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const j={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},W=(t,e)=>e!==t&&(e==e||t==t),F={attribute:!0,type:String,converter:j,reflect:!1,hasChanged:W};class B extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach(((e,i)=>{const n=this._attributeNameForProperty(i,e);void 0!==n&&(this._attributeToPropertyMap.set(n,i),t.push(n))})),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach(((t,e)=>this._classProperties.set(e,t)))}}static createProperty(t,e=F){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const i="symbol"==typeof t?Symbol():`__${t}`,n=this.getPropertyDescriptor(t,i,e);void 0!==n&&Object.defineProperty(this.prototype,t,n)}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(n){const s=this[t];this[e]=n,this.requestUpdateInternal(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||F}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty("finalized")||t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const i of e)this.createProperty(i,t[i])}}static _attributeNameForProperty(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,i=W){return i(t,e)}static _propertyValueFromAttribute(t,e){const i=e.type,n=e.converter||j,s="function"==typeof n?n:n.fromAttribute;return s?s(t,i):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const i=e.type,n=e.converter;return(n&&n.toAttribute||j.toAttribute)(t,i)}initialize(){this._updateState=0,this._updatePromise=new Promise((t=>this._enableUpdatingResolver=t)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((t,e)=>this[e]=t)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,i){e!==i&&this._attributeToProperty(t,i)}_propertyToAttribute(t,e,i=F){const n=this.constructor,s=n._attributeNameForProperty(t,i);if(void 0!==s){const t=n._propertyValueToAttribute(e,i);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(s):this.setAttribute(s,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const i=this.constructor,n=i._attributeToPropertyMap.get(t);if(void 0!==n){const t=i.getPropertyOptions(n);this._updateState=16|this._updateState,this[n]=i._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}requestUpdateInternal(t,e,i){let n=!0;if(void 0!==t){const s=this.constructor;i=i||s.getPropertyOptions(t),s._valueHasChanged(this[t],e,i.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==i.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,i))):n=!1}!this._hasRequestedUpdate&&n&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this.requestUpdateInternal(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((t,e)=>this._propertyToAttribute(e,this[e],t))),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}B.finalized=!0;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const J=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:n}=e;return{kind:i,elements:n,finisher(e){window.customElements.define(t,e)}}})(t,e),Z=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?Object.assign(Object.assign({},e),{finisher(i){i.createProperty(e.key,t)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function G(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):Z(t,e)}function K(t){return G({attribute:!1,hasChanged:null==t?void 0:t.hasChanged})}
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const Q=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,X=Symbol();class tt{constructor(t,e){if(e!==X)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(Q?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const et=(t,...e)=>{const i=e.reduce(((e,i,n)=>e+(t=>{if(t instanceof tt)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+t[n+1]),t[0]);return new tt(i,X)};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const it={};class nt extends B{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(Array.isArray(t)){const e=(t,i)=>t.reduceRight(((t,i)=>Array.isArray(i)?e(i,t):(t.add(i),t)),i),i=e(t,new Set),n=[];i.forEach((t=>n.unshift(t))),this._styles=n}else this._styles=void 0===t?[]:[t];this._styles=this._styles.map((t=>{if(t instanceof CSSStyleSheet&&!Q){const e=Array.prototype.slice.call(t.cssRules).reduce(((t,e)=>t+e.cssText),"");return new tt(String(e),X)}return t}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?Q?this.renderRoot.adoptedStyleSheets=t.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map((t=>t.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==it&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)})))}render(){return it}}nt.finalized=!0,nt.render=(t,e,n)=>{if(!n||"object"!=typeof n||!n.scopeName)throw new Error("The `scopeName` option is required.");const s=n.scopeName,o=O.has(e),r=L&&11===e.nodeType&&!!e.host,a=r&&!H.has(s),c=a?document.createDocumentFragment():e;if(((t,e,n)=>{let s=O.get(e);void 0===s&&(i(e,e.firstChild),O.set(e,s=new M(Object.assign({templateFactory:k},n))),s.appendInto(e)),s.setValue(t),s.commit()})(t,c,Object.assign({templateFactory:Y(s)},n)),a){const t=O.get(c);O.delete(c);const n=t.value instanceof f?t.value.template:void 0;q(s,c,n),i(e,e.firstChild),e.appendChild(c),O.set(e,t)}!o&&r&&window.ShadyCSS.styleElement(e.host)};var st=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,ot="[^\\s]+",rt=/\[([^]*?)\]/gm;function at(t,e){for(var i=[],n=0,s=t.length;n<s;n++)i.push(t[n].substr(0,e));return i}var ct=function(t){return function(e,i){var n=i[t].map((function(t){return t.toLowerCase()})).indexOf(e.toLowerCase());return n>-1?n:null}};function lt(t){for(var e=[],i=1;i<arguments.length;i++)e[i-1]=arguments[i];for(var n=0,s=e;n<s.length;n++){var o=s[n];for(var r in o)t[r]=o[r]}return t}var ht=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dt=["January","February","March","April","May","June","July","August","September","October","November","December"],pt=at(dt,3),ut={dayNamesShort:at(ht,3),dayNames:ht,monthNamesShort:pt,monthNames:dt,amPm:["am","pm"],DoFn:function(t){return t+["th","st","nd","rd"][t%10>3?0:(t-t%10!=10?1:0)*t%10]}},_t=lt({},ut),gt=function(t,e){for(void 0===e&&(e=2),t=String(t);t.length<e;)t="0"+t;return t},yt={D:function(t){return String(t.getDate())},DD:function(t){return gt(t.getDate())},Do:function(t,e){return e.DoFn(t.getDate())},d:function(t){return String(t.getDay())},dd:function(t){return gt(t.getDay())},ddd:function(t,e){return e.dayNamesShort[t.getDay()]},dddd:function(t,e){return e.dayNames[t.getDay()]},M:function(t){return String(t.getMonth()+1)},MM:function(t){return gt(t.getMonth()+1)},MMM:function(t,e){return e.monthNamesShort[t.getMonth()]},MMMM:function(t,e){return e.monthNames[t.getMonth()]},YY:function(t){return gt(String(t.getFullYear()),4).substr(2)},YYYY:function(t){return gt(t.getFullYear(),4)},h:function(t){return String(t.getHours()%12||12)},hh:function(t){return gt(t.getHours()%12||12)},H:function(t){return String(t.getHours())},HH:function(t){return gt(t.getHours())},m:function(t){return String(t.getMinutes())},mm:function(t){return gt(t.getMinutes())},s:function(t){return String(t.getSeconds())},ss:function(t){return gt(t.getSeconds())},S:function(t){return String(Math.round(t.getMilliseconds()/100))},SS:function(t){return gt(Math.round(t.getMilliseconds()/10),2)},SSS:function(t){return gt(t.getMilliseconds(),3)},a:function(t,e){return t.getHours()<12?e.amPm[0]:e.amPm[1]},A:function(t,e){return t.getHours()<12?e.amPm[0].toUpperCase():e.amPm[1].toUpperCase()},ZZ:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+gt(100*Math.floor(Math.abs(e)/60)+Math.abs(e)%60,4)},Z:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+gt(Math.floor(Math.abs(e)/60),2)+":"+gt(Math.abs(e)%60,2)}},mt=function(t){return+t-1},ft=[null,"[1-9]\\d?"],vt=[null,ot],wt=["isPm",ot,function(t,e){var i=t.toLowerCase();return i===e.amPm[0]?0:i===e.amPm[1]?1:null}],St=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(t){var e=(t+"").match(/([+-]|\d\d)/gi);if(e){var i=60*+e[1]+parseInt(e[2],10);return"+"===e[0]?i:-i}return 0}],bt=(ct("monthNamesShort"),ct("monthNames"),{default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",isoDate:"YYYY-MM-DD",isoDateTime:"YYYY-MM-DDTHH:mm:ssZ",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"});var xt=function(t,e,i){if(void 0===e&&(e=bt.default),void 0===i&&(i={}),"number"==typeof t&&(t=new Date(t)),"[object Date]"!==Object.prototype.toString.call(t)||isNaN(t.getTime()))throw new Error("Invalid Date pass to format");var n=[];e=(e=bt[e]||e).replace(rt,(function(t,e){return n.push(e),"@@@"}));var s=lt(lt({},_t),i);return(e=e.replace(st,(function(e){return yt[e](t,s)}))).replace(/@@@/g,(function(){return n.shift()}))};(function(){try{(new Date).toLocaleDateString("i")}catch(t){return"RangeError"===t.name}})(),function(){try{(new Date).toLocaleString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(t){return"RangeError"===t.name}}();const Ct={entities:{icon:"tune",name:"Entities",secondary:"Entities for card to make sense, none are required but you should have a few.",show:!1},actions:{icon:"gesture-tap-hold",name:"Actions",secondary:"Perform actions based on tapping/clicking",show:!1,options:{tap:{icon:"gesture-tap",name:"Tap",secondary:"Set the action to perform on tap",show:!1},hold:{icon:"gesture-tap-hold",name:"Hold",secondary:"Set the action to perform on hold",show:!1},double_tap:{icon:"gesture-double-tap",name:"Double Tap",secondary:"Set the action to perform on double tap",show:!1}}},appearance:{icon:"palette",name:"Appearance",secondary:"Customize the name, icon, etc",show:!1}};let $t=class extends nt{constructor(){super(...arguments),this._initialized=!1,this._entityMap=new Map}setConfig(t){this._config=t,this._fillEntityMap(),this.loadCardHelpers()}shouldUpdate(){return this._initialized||this._initialize(),!0}get _name(){var t;return(null===(t=this._config)||void 0===t?void 0:t.name)||""}get _home_consumption_entity(){var t;return(null===(t=this._config)||void 0===t?void 0:t.home_consumption_entity)||""}get _grid_entity(){var t;return(null===(t=this._config)||void 0===t?void 0:t.grid_entity)||""}get _grid_consumption_entity(){var t;return(null===(t=this._config)||void 0===t?void 0:t.grid_consumption_entity)||""}get _grid_feed_in_entity(){var t;return(null===(t=this._config)||void 0===t?void 0:t.grid_feed_in_entity)||""}get _grid_to_battery_entity(){var t;return(null===(t=this._config)||void 0===t?void 0:t.grid_to_battery_entity)||""}get _solar_entity(){var t;return(null===(t=this._config)||void 0===t?void 0:t.solar_entity)||""}get _solar_yield_entity(){var t;return(null===(t=this._config)||void 0===t?void 0:t.solar_yield_entity)||""}get _solar_consumption_entity(){var t;return(null===(t=this._config)||void 0===t?void 0:t.solar_consumption_entity)||""}get _solar_to_battery_entity(){var t;return(null===(t=this._config)||void 0===t?void 0:t.solar_to_battery_entity)||""}get _battery_soc_entity(){var t;return(null===(t=this._config)||void 0===t?void 0:t.battery_soc_entity)||""}get _battery_consumption_entity(){var t;return(null===(t=this._config)||void 0===t?void 0:t.battery_consumption_entity)||""}get _appliance1_consumption_entity(){var t;return(null===(t=this._config)||void 0===t?void 0:t.appliance1_consumption_entity)||""}get _appliance1_state_entity(){var t;return(null===(t=this._config)||void 0===t?void 0:t.appliance1_state_entity)||""}get _appliance2_consumption_entity(){var t;return(null===(t=this._config)||void 0===t?void 0:t.appliance2_consumption_entity)||""}get _appliance2_state_entity(){var t;return(null===(t=this._config)||void 0===t?void 0:t.appliance2_state_entity)||""}get _show_warning(){var t;return(null===(t=this._config)||void 0===t?void 0:t.show_warning)||!1}get _show_error(){var t;return(null===(t=this._config)||void 0===t?void 0:t.show_error)||!1}get _w_or_kw(){var t;return(null===(t=this._config)||void 0===t?void 0:t.w_or_kw)||!1}get _hide_inactive_lines(){var t;return(null===(t=this._config)||void 0===t?void 0:t.hide_inactive_lines)||!1}get _tap_action(){var t;return(null===(t=this._config)||void 0===t?void 0:t.tap_action)||{action:"more-info"}}get _hold_action(){var t;return(null===(t=this._config)||void 0===t?void 0:t.hold_action)||{action:"none"}}get _double_tap_action(){var t;return(null===(t=this._config)||void 0===t?void 0:t.double_tap_action)||{action:"none"}}render(){return this.hass&&this._helpers?(this._helpers.importMoreInfoControl("climate"),U`
      <div class="card-config">
        <div class="option" @click=${this._toggleOption} .option=${"entities"}>
          <div class="row">
            <ha-icon .icon=${`mdi:${Ct.entities.icon}`}></ha-icon>
            <div class="title">${Ct.entities.name}</div>
          </div>
          <div class="secondary">${Ct.entities.secondary}</div>
        </div>
        ${Ct.entities.show?U`<div class="values">
              ${Array.from(this._entityMap).map((t=>{const e=t[0],i=this["_"+e];let n="";return i instanceof Function&&(n=i()),U`
                  <ha-entity-picker
                      label="${e}"
                      @value-changed=${this._valueChanged}
                      .hass="${this.hass}"
                      .value="${i}"
                      .configValue=${e}
                      @change="${this._valueChanged}"
                      allow-custom-entity
                    >
                    </ha-entity-picker>
                  `}))}
            </div>`:""}
        <div class="option" @click=${this._toggleOption} .option=${"actions"}>
          <div class="row">
            <ha-icon .icon=${`mdi:${Ct.actions.icon}`}></ha-icon>
            <div class="title">${Ct.actions.name}</div>
          </div>
          <div class="secondary">${Ct.actions.secondary}</div>
        </div>
        ${Ct.actions.show?U`
              <div class="values">
                <div class="option" @click=${this._toggleAction} .option=${"tap"}>
                  <div class="row">
                    <ha-icon .icon=${`mdi:${Ct.actions.options.tap.icon}`}></ha-icon>
                    <div class="title">${Ct.actions.options.tap.name}</div>
                  </div>
                  <div class="secondary">${Ct.actions.options.tap.secondary}</div>
                </div>
                ${Ct.actions.options.tap.show?U`
                      <div class="values">
                        <paper-item>Action Editors Coming Soon</paper-item>
                      </div>
                    `:""}
                <div class="option" @click=${this._toggleAction} .option=${"hold"}>
                  <div class="row">
                    <ha-icon .icon=${`mdi:${Ct.actions.options.hold.icon}`}></ha-icon>
                    <div class="title">${Ct.actions.options.hold.name}</div>
                  </div>
                  <div class="secondary">${Ct.actions.options.hold.secondary}</div>
                </div>
                ${Ct.actions.options.hold.show?U`
                      <div class="values">
                        <paper-item>Action Editors Coming Soon</paper-item>
                      </div>
                    `:""}
                <div class="option" @click=${this._toggleAction} .option=${"double_tap"}>
                  <div class="row">
                    <ha-icon .icon=${`mdi:${Ct.actions.options.double_tap.icon}`}></ha-icon>
                    <div class="title">${Ct.actions.options.double_tap.name}</div>
                  </div>
                  <div class="secondary">${Ct.actions.options.double_tap.secondary}</div>
                </div>
                ${Ct.actions.options.double_tap.show?U`
                      <div class="values">
                        <paper-item>Action Editors Coming Soon</paper-item>
                      </div>
                    `:""}
              </div>
            `:""}
        <div class="option" @click=${this._toggleOption} .option=${"appearance"}>
          <div class="row">
            <ha-icon .icon=${`mdi:${Ct.appearance.icon}`}></ha-icon>
            <div class="title">${Ct.appearance.name}</div>
          </div>
          <div class="secondary">${Ct.appearance.secondary}</div>
        </div>
        ${Ct.appearance.show?U`
              <div class="values">
                <paper-input
                  label="Name (Optional)"
                  .value=${this._name}
                  .configValue=${"name"}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <br />
                <ha-formfield .label=${"Toggle warning "+(this._show_warning?"off":"on")}>
                  <ha-switch
                    .checked=${!1!==this._show_warning}
                    .configValue=${"show_warning"}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
                <ha-formfield .label=${"Toggle error "+(this._show_error?"off":"on")}>
                  <ha-switch
                    .checked=${!1!==this._show_error}
                    .configValue=${"show_error"}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
                <ha-formfield .label=${"Toggle W instead of kW "+(this._w_or_kw?"off":"on")}>
                  <ha-switch
                    .checked=${!1!==this._w_or_kw}
                    .configValue=${"w_or_kw"}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
                <ha-formfield .label=${"Toggle hiding inactive power lines "+(this._hide_inactive_lines?"off":"on")}>
                  <ha-switch
                    .checked=${!1!==this._hide_inactive_lines}
                    .configValue=${"hide_inactive_lines"}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
              </div>
            `:""}
      </div>
    `):U``}_initialize(){void 0!==this.hass&&void 0!==this._config&&void 0!==this._helpers&&(this._initialized=!0)}async loadCardHelpers(){this._helpers=await window.loadCardHelpers()}_toggleAction(t){this._toggleThing(t,Ct.actions.options)}_toggleOption(t){this._toggleThing(t,Ct)}_toggleThing(t,e){const i=!e[t.target.option].show;for(const[t]of Object.entries(e))e[t].show=!1;e[t.target.option].show=i,this._toggle=!this._toggle}_valueChanged(t){if(!this._config||!this.hass)return;const e=t.target;if(this[`_${e.configValue}`]!==e.value){if(e.configValue)if(""===e.value)try{delete this._config[e.configValue]}catch(t){this._config[e.configValue]}else this._config=Object.assign(Object.assign({},this._config),{[e.configValue]:void 0!==e.checked?e.checked:e.value});!function(t,e,i,n){n=n||{},i=null==i?{}:i;var s=new Event(e,{bubbles:void 0===n.bubbles||n.bubbles,cancelable:Boolean(n.cancelable),composed:void 0===n.composed||n.composed});s.detail=i,t.dispatchEvent(s)}(this,"config-changed",{config:this._config})}}_fillEntityMap(){null!=this._config&&(this._entityMap.set("home_consumption_entity",this._config.home_consumption_entity),this._entityMap.set("grid_consumption_entity",this._config.grid_consumption_entity),this._entityMap.set("grid_feed_in_entity",this._config.grid_feed_in_entity),this._entityMap.set("grid_to_battery_entity",this._config.grid_to_battery_entity),this._entityMap.set("solar_yield_entity",this._config.solar_yield_entity),this._entityMap.set("solar_consumption_entity",this._config.solar_consumption_entity),this._entityMap.set("solar_to_battery_entity",this._config.solar_to_battery_entity),this._entityMap.set("battery_soc_entity",this._config.battery_soc_entity),this._entityMap.set("battery_consumption_entity",this._config.battery_consumption_entity),this._entityMap.set("appliance1_consumption_entity",this._config.appliance1_consumption_entity),this._entityMap.set("appliance1_state_entity",this._config.appliance1_state_entity),this._entityMap.set("appliance2_consumption_entity",this._config.appliance2_consumption_entity),this._entityMap.set("appliance2_state_entity",this._config.appliance2_state_entity))}static get styles(){return et`
      .option {
        padding: 4px 0px;
        cursor: pointer;
      }
      .row {
        display: flex;
        margin-bottom: -14px;
        pointer-events: none;
      }
      .title {
        padding-left: 16px;
        margin-top: -6px;
        pointer-events: none;
      }
      .secondary {
        padding-left: 40px;
        color: var(--secondary-text-color);
        pointer-events: none;
      }
      .values {
        padding-left: 16px;
        background: var(--secondary-background-color);
        display: grid;
      }
      ha-formfield {
        padding-bottom: 8px;
      }
    `}};t([G({attribute:!1})],$t.prototype,"hass",void 0),t([K()],$t.prototype,"_config",void 0),t([K()],$t.prototype,"_toggle",void 0),t([K()],$t.prototype,"_helpers",void 0),$t=t([J("tesla-style-solar-power-card-editor")],$t);class Mt{constructor(t,e){this.speed=0,this.startPosition=0,this.currentPosition=0,this.currentDelta=0,this.maxPosition=30,this.unitOfMeasurement="",this.accText="",this.accTextclassName="accText",this.entity="",this.color="stroke:var(--info-color)",this.circleColor="var(--primary-color)",this.prevTimestamp=0,this.accTextElement=null,this.entity=t,this.entitySlot=e,this.value=0}setValueAndUnitOfMeasurement(t,e=!1,i){let n=0;if(null==t)return void(this.value=n);if(null==i)return void(this.value=t);const s=parseInt(t);"kW"===i?n=s:"W"!==i||e?("W"===i&&e||"%"===i)&&(n=s):(n=s/1e3,i="kW"),n=n>.1?Math.round(10*(n+Number.EPSILON))/10:Math.round(100*(n+Number.EPSILON))/100,this.unitOfMeasurement=i,this.value=n}setSpeed(t=!1){this.speed=0,this.value<=0||(t?this.value>0&&t&&(this.speed=4e-5*this.value):this.speed=.04*this.value)}}var Et={version:"Version",invalid_configuration:"Invalid configuration",show_warning:"Show Warning",show_error:"Show Error"},Pt={common:Et},At={version:"Versjon",invalid_configuration:"Ikke gyldig konfiguration",show_warning:"Vis advarsel"},Nt={common:At};const Tt={en:Object.freeze({__proto__:null,common:Et,default:Pt}),nb:Object.freeze({__proto__:null,common:At,default:Nt})};function Rt(t,e="",i=""){const n=(localStorage.getItem("selectedLanguage")||"en").replace(/['"]+/g,"").replace("-","_");let s;try{s=t.split(".").reduce(((t,e)=>t[e]),Tt[n])}catch(e){s=t.split(".").reduce(((t,e)=>t[e]),Tt.en)}return void 0===s&&(s=t.split(".").reduce(((t,e)=>t[e]),Tt.en)),""!==e&&""!==i&&(s=s.replace(e,i)),s}console.info(`%c  tesla-style-solar-power-card \n%c  ${Rt("common.version")} 1.3.2    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),window.customCards=window.customCards||[],window.customCards.push({type:"tesla-style-solar-power-card",name:"Tesla Style Solar Power Card",description:"A Solar Power Visualization with svg paths that mimmicks the powerwall app of tesla 2"});let kt=class extends nt{constructor(){super(...arguments),this.solarCardElements=new Map,this.oldWidth=100,this.pxRate=30}static async getConfigElement(){return document.createElement("tesla-style-solar-power-card-editor")}static getStubConfig(){return{}}setConfig(t){if(!t)throw new Error(Rt("common.invalid_configuration"));let e;t.test_gui&&function(){var t=document.querySelector("home-assistant");if(t=(t=(t=(t=(t=(t=(t=(t=t&&t.shadowRoot)&&t.querySelector("home-assistant-main"))&&t.shadowRoot)&&t.querySelector("app-drawer-layout partial-panel-resolver"))&&t.shadowRoot||t)&&t.querySelector("ha-panel-lovelace"))&&t.shadowRoot)&&t.querySelector("hui-root")){var e=t.lovelace;return e.current_view=t.___curView,e}return null}().setEditMode(!0),this.config=Object.assign({},t),null==this.config.grid_icon&&(this.config.grid_icon="mdi:transmission-tower"),null==this.config.pv_icon&&(this.config.pv_icon="mdi:solar-panel-large"),null==this.config.home_icon&&(this.config.home_icon="mdi:home"),null==this.config.appliance1_icon&&(this.config.appliance1_icon="mdi:car-sports"),null==this.config.appliance2_icon&&(this.config.appliance2_icon="mdi:air-filter"),this.createSolarCardElements(),e=this,setInterval(this.animateCircles,15,e),e=this}createSolarCardElements(){Object.keys(this.config).forEach((t=>{if(t.indexOf("_entity")>5&&null!=this.config[t]){const e=this.config[t].toString();this.solarCardElements.set(t,new Mt(e,t))}}))}async firstUpdated(){await new Promise((t=>setTimeout(t,0))),this.changeStylesDependingOnWidth(this.clientWidth)}connectedCallback(){super.connectedCallback(),this.redraw=this.redraw.bind(this),window.addEventListener("resize",this.redraw),window.addEventListener("resize",this.redraw)}shouldUpdate(t){let e;e=this,requestAnimationFrame((function(t){e.updateAllCircles(t)})),e=this;let i=!0;return Array.from(t.keys()).some((e=>{const n=t.get(e);return"hass"===e&&n&&(i=i&&this.sensorChangeDetected(n)),!i})),i}sensorChangeDetected(t){let e=!1;return this.solarCardElements.forEach(((i,n)=>{null!=this.hass.states[this.config[n]]&&this.hass.states[this.config[n]].state!==t.states[this.config[n]].state&&(e=!0)})),e}async performUpdate(){this.solarCardElements.forEach((t=>{t.setValueAndUnitOfMeasurement(this.hass.states[t.entity].state,this.config.w_not_kw,this.hass.states[t.entity].attributes.unit_of_measurement),t.setSpeed()})),super.performUpdate()}render(){return this.config.show_warning?this._showWarning(Rt("common.show_warning")):this.config.show_error?this._showError(Rt("common.show_error")):(this.pxRate=this.clientWidth/100,U`
    <ha-card
      .header=${this.config.name}
      tabindex="0"
      .label=${`TeslaStyleSolarPowerCard: ${this.config.entity||"No Entity Defined"}`}
    >
      <div id="tesla-style-solar-power-card">
        ${this.writeCardDiv("solar_consumption_entity","acc_top","pv_icon")}
        <div class="acc_center">
          <div class="acc_center_container">
            ${this.writeCardDiv("grid_consumption_entity","acc_left","grid_icon")}
            ${this.writeCenterPowerLinesAndCircles()}
            ${this.writeCardDiv("home_consumption_entity","acc_right","home_icon")}
            ${this.writeCardDiv("appliance1_consumption_entity","acc_appliance1","appliance1_icon")}
            ${this.writeAppliancePowerLineAndCircle(1,"M4,"+16*this.pxRate+" C4,"+16*this.pxRate+" 4,0 4,0")}
            ${this.writeCardDiv("appliance2_consumption_entity","acc_appliance2","appliance2_icon")}
            ${this.writeAppliancePowerLineAndCircle(2,"M4,0 C4,0 4,"+16*this.pxRate+" 4,"+16*this.pxRate)}
          </div>
        </div>
        <div class="acc_bottom">
          ${this.writeCardDiv("battery_consumption_entity","acc_battery","getBatteryIcon")}
        </div>
      </div>
    </ha-card>
    `)}writeCardDiv(t,e,i){const n=this.solarCardElements.get(t);if(null==n)return U``;let s;return s="function"==typeof this[i]?this[i]():this.config[i],U`
    <div class= "acc_td ${e}">
        <div class="acc_container ${t}"
             style="${"width:"+9*this.pxRate+"px; height: "+9*this.pxRate+"px; padding:"+5*this.pxRate+"px"}"
             @click="${()=>this._handleClick(this.hass.states[n.entity])}"
            >
              ${this.writeSecondInfoOnIconForBatteryAndAppliances(t)}
              <ha-icon class="acc_icon" icon="${s}" ></ha-icon>
              <div class='acc_text' style="font-size:${3*this.pxRate+"px"}; margin-top:${-1*this.pxRate+"px"}">
                ${n.value.toString()} ${n.unitOfMeasurement}
              </div>
        </div>
    </div>`}writeCenterPowerLinesAndCircles(){const t=22*this.pxRate;return U`
    <div class="acc_line power_lines"
      style="
        height:${42*this.pxRate+"px"};
        width:${42*this.pxRate+"px"};
        top:${0*this.pxRate+"px"};
        left:${28*this.pxRate+"px"}"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="${"0 0 "+42*this.pxRate+" "+42*this.pxRate}"
        preserveAspectRatio="xMinYMax slice"
        style="height:${42*this.pxRate+"px"};width:${42*this.pxRate+"px"}"
      >
        ${this.writeCircleAndLine("solar_consumption_entity","M"+t+",0 C"+t+","+t+" "+t+","+t+" "+2*t+","+t)}
        ${this.writeCircleAndLine("grid_consumption_entity","M0,"+t+" C"+t+","+t+" "+t+","+t+" "+2*t+","+t)}
        ${this.writeCircleAndLine("grid_feed_in_entity","M"+t+",0 C"+t+","+t+" "+t+","+t+" 0,"+t)}
        ${this.writeCircleAndLine("grid_to_battery_entity","M0,"+t+" C"+t+","+t+" "+t+","+t+" "+t+","+2*t)}
        ${this.writeCircleAndLine("solar_to_battery_entity","M"+t+",0 C"+t+",0 "+t+","+2*t+" "+t+","+2*t)}
        ${this.writeCircleAndLine("battery_consumption_entity","M"+t+","+2*t+" C"+t+","+t+" "+t+","+t+" "+2*t+","+t)}
      </svg>
    </div>`}writeAppliancePowerLineAndCircle(t,e){let i;return i=1==t?"top:"+23*this.pxRate+"px;":"bottom:"+15*this.pxRate+"px;",U`<div class="acc_line acc_appliance${t}_line"
      style="
        height:${18*this.pxRate+"px"};
        width:${4*this.pxRate+"px"};
        right:${10*this.pxRate+"px"};
        ${i}
        position:absolute"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="${"0 0 "+26*this.pxRate+" "+26*this.pxRate}"
        preserveAspectRatio="xMinYMax slice"
        style="height:${18*this.pxRate+"px"};width:${4*this.pxRate+"px"}"
      >
        ${this.writeCircleAndLine("appliance"+t+"_consumption_entity",e)}
        </svg>
    </div>`}writeCircleAndLine(t,e){const i=this.solarCardElements.get(t);if(null!=i)return U`<svg><circle r="4"
        cx="${i.startPosition.toString()}"
        cy="4"
        fill="${i.color}"
        id="${t+"_circle"}">
      </circle>
      <path d="${e}" id="${t+"_line"}"></path></svg>`}writeSecondInfoOnIconForBatteryAndAppliances(t){return"battery_consumption_entity"==t&&this.solarCardElements.has("battery_soc_entity")?this.writeSecondSensorDataInIcon("battery_soc_entity"):"appliance1_consumption_entity"==t&&this.solarCardElements.has("appliance1_state_entity")?this.writeSecondSensorDataInIcon("appliance1_state_entity"):"appliance2_consumption_entity"==t&&this.solarCardElements.has("appliance2_state_entity")?this.writeSecondSensorDataInIcon("appliance2_state_entity"):U``}writeSecondSensorDataInIcon(t){if(null==this.shadowRoot)return U``;if(this.powerCardElement=this.shadowRoot.querySelector("#tesla-style-solar-power-card"),null==this.powerCardElement)return U``;const e=this.solarCardElements.get(t);return null==e?U``:U`
      <div class='acc_text_extra'
      style="font-size:${3*this.pxRate+"px"};
             top: ${1*this.pxRate+"px"};
             width: ${10*this.pxRate+"px"};">
        ${e.value.toString()} ${e.unitOfMeasurement}
      </div>
     `}changeStylesDependingOnWidth(t){if("complete"!==document.readyState||this.oldWidth==t)return;if(null==this.shadowRoot)return;if(this.powerCardElement=this.shadowRoot.querySelector("#tesla-style-solar-power-card"),null==this.powerCardElement)return;this.oldWidth=t,this.pxRate=t/100;const e=this.pxRate;this.changeSelectorStyle(".acc_left","top",12*e+"px"),this.changeSelectorStyle(".acc_right","top",12*e+"px"),null==this.solarCardElements.get("battery_consumption_entity")&&null!=this.solarCardElements.get("appliance2_consumption_entity")&&this.changeSelectorStyle(".acc_center_container","margin-bottom",15*e+"px"),this.powerCardElement.querySelectorAll(".acc_container").forEach((function(t,i,n){const s=n[i];s.style.height=9*e+"px",s.style.width=9*e+"px",s.style.padding=5*e+"px"})),this.powerCardElement.querySelectorAll("ha-icon").forEach((function(t,i,n){var s;const o=null===(s=n[i].shadowRoot)||void 0===s?void 0:s.querySelector("ha-svg-icon");null!=o&&(o.style.height=9*e+"px",o.style.width=9*e+"px")})),this.powerCardElement.querySelectorAll(".acc_text").forEach((t=>{t.style["font-size"]=3*e+"px",t.style["margin-top"]=-1*e+"px"})),this.powerCardElement.querySelectorAll(".acc_text_extra").forEach((t=>{t.style["font-size"]=3*this.pxRate+"px",t.style.top=1*this.pxRate+"px",t.style.width=10*this.pxRate+"px"})),this.changeSelectorStyle(".power_lines","height",42*e+"px"),this.changeSelectorStyle(".power_lines","width",42*e+"px"),this.changeSelectorStyle(".power_lines","top",21*e+"px"),this.changeSelectorStyle(".power_lines","left",21*e+"px"),this.changeSelectorStyle(".power_lines svg","width",42*e+"px"),this.changeSelectorStyle(".power_lines svg","height",42*e+"px"),this.changeSelectorStyle(".power_lines svg","viewBox","0 0 "+42*e+" "+42*e);const i=22*e;this.changeSelectorStyle("#solar_consumption_entity_line","d","M"+i+",0 C"+i+","+i+" "+i+","+i+" "+2*i+","+i),this.changeSelectorStyle("#grid_feed_in_entity_line","d","M"+i+",0 C"+i+","+i+" "+i+","+i+" 0,"+i),this.changeSelectorStyle("#grid_consumption_entity_line","d","M0,"+i+" C"+i+","+i+" "+i+","+i+" "+2*i+","+i),this.changeSelectorStyle("#grid_to_battery_entity_line","d","M0,"+i+" C"+i+","+i+" "+i+","+i+" "+i+","+2*i),this.changeSelectorStyle("#battery_consumption_entity_line","d","M"+i+","+2*i+" C"+i+","+i+" "+i+","+i+" "+2*i+","+i),this.changeSelectorStyle("#solar_to_battery_entity_line","d","M"+i+",0 C"+i+",0 "+i+","+2*i+" "+i+","+2*i),[1,2].forEach((t=>{this.changeSelectorStyle(".acc_appliance"+t+"_line","right",10*this.pxRate+"px"),this.changeSelectorStyle(".acc_appliance"+t+"_line","width",4*e+"px"),this.changeSelectorStyle(".acc_appliance"+t+"_line","height",18*e+"px"),this.changeSelectorStyle(".acc_appliance"+t+"_line svg","viewBox","0 0 "+26*this.pxRate+" "+26*this.pxRate),this.changeSelectorStyle(".acc_appliance"+t+"_line svg","width",4*e+"px"),this.changeSelectorStyle(".acc_appliance"+t+"_line svg","height",18*e+"px")})),this.changeSelectorStyle(".acc_appliance1","top","10px"),this.changeSelectorStyle(".acc_appliance1_line","top",23*e+"px"),this.changeSelectorStyle(".acc_appliance2","bottom","10px"),this.changeSelectorStyle(".acc_appliance2_line","bottom",15*e+"px")}changeSelectorStyle(t,e,i){const n=this.powerCardElement.querySelector(t);null!=n&&(n.style[e]=i)}getBatteryIcon(){const t=this.solarCardElements.get("battery_soc_entity");if(null==t)return;t.value<=5&&(t.value=0);const e=10*Math.ceil(t.value/10);let i="-"+e.toString(),n="";return null==this.solarCardElements.get("grid_to_battery_entity")&&null==this.solarCardElements.get("solar_to_battery_entity")||(n="-charging"),100==e&&(i=""),e<=5&&(i="-outline"),"mdi:battery"+n+i}updateAllCircles(t){this.solarCardElements.forEach(((e,i,n)=>{const s=this.solarCardElements.get(i);null!=s&&this.updateOneCircle(t,s)}))}animateCircles(t){requestAnimationFrame((function(e){t.updateAllCircles(e)}))}updateOneCircle(t,e){if(null==this.shadowRoot)return;const i=this.shadowRoot.querySelector("#tesla-style-solar-power-card");if(null==i)return;if(e.line=i.querySelector("#"+e.entitySlot+"_line"),null==e.line)return;const n=e.line.getTotalLength();if(isNaN(n))return;if(e.circle=i.querySelector("#"+e.entitySlot+"_circle"),0==e.speed)return e.circle.setAttribute("visibility","hidden"),void(this.config.hide_inactive_lines&&e.line.setAttribute("visibility","hidden"));e.circle.setAttribute("visibility","visible"),this.config.hide_inactive_lines&&e.line.setAttribute("visibility","visible"),0==e.prevTimestamp&&(e.prevTimestamp=t,e.currentDelta=0),e.currentDelta+=e.speed*(t-e.prevTimestamp);let s=e.currentDelta/n;(s>=1||isNaN(s))&&(e.currentDelta=0,s=.01);const o=e.line.getPointAtLength(n*s);e.circle.setAttributeNS(null,"cx",o.x),e.circle.setAttributeNS(null,"cy",o.y),e.prevTimestamp=t}redraw(t){this.hass&&this.config&&"resize"==t.type&&this.changeStylesDependingOnWidth(this.clientWidth)}_handleClick(t){const e=new Event("hass-more-info",{bubbles:!0,cancelable:!0,composed:!0});e.detail={entityId:t.entity_id},null!=this.shadowRoot&&this.shadowRoot.dispatchEvent(e)}_showWarning(t){return U`
      <hui-warning>${t}</hui-warning>
    `}_showError(t){const e=document.createElement("hui-error-card");return e.setConfig({type:"error",error:t,origConfig:this.config}),U`
      ${e}
    `}static get styles(){return et`
    #tesla-style-solar-power-card{
      margin:auto;
      display:table;
      padding: 10px;
      position: relative;
    }
    .acc_container {
        height: 40px;
        width: 40px;
        border: 1px solid black;
        border-radius: 100px;
        padding: 22px;
        color: var(--primary-text-color);
        border-color: var(--primary-text-color);
        position:relative;
        cursor:pointer;
    }
    .acc_icon {
        --mdc-icon-size: 40px;
    }
    .acc_text,
    .acc_text_extra {
        text-align: center;
        white-space: nowrap;
    }
    .acc_text_extra {
      overflow: hidden;
      position: absolute;
    }
    .acc_td {
        vertical-align: top;
    }
    .acc_center .acc_td{
      position:relative;
    }
    .acc_top .acc_container,
    .acc_bottom .acc_container{
        margin:auto;
    }
    .acc_center{
      display:flex;
    }
    .acc_center_container{
      display:inline-block;
      margin: 0px auto;
      margin-bottom:-5px;
    }

    .acc_right ,
    .acc_left ,
    .acc_line{
      display:inline-block;
      margin-right:-4px
    }
    .acc_left {
      vertical-align: top;
      z-index:5;
    }
    .acc_right {
      z-index:5;
      margin-right:0px;
    }
    #battery_consumption_entity_line,
    #solar_consumption_entity_line,
    #grid_consumption_entity_line,
    #solar_to_battery_entity_line,
    #grid_feed_in_entity_line,
    #grid_to_battery_entity_line,
    #appliance1_consumption_entity_line,
    #appliance2_consumption_entity_line{
      stroke:var(--info-color);
      fill:none;
      stroke-width:1;
    }

    .solar_consumption_entity {
      border: 1px solid var(--warning-color);
    }
    .solar_consumption_entity .acc_icon,
    .solar_consumption_entity{
      color: var(--warning-color);
    }
    .home_consumption_entity,
    .appliance1_consumption_entity,
    .appliance2_consumption_entity {
      border: 1px solid var(--info-color);
    }
    .home_consumption_entity,
    .appliance1_consumption_entity,
    .appliance2_consumption_entity{
      color: var(--info-color);
    }
    #grid_consumption_entity_line{
      stroke-width:1;
    }
    #solar_consumption_entity_line,
    #grid_feed_in_entity_line,
    #solar_to_battery_entity_line{
      stroke:var(--warning-color);
    }
    #solar_consumption_entity_circle,
    #grid_feed_in_entity_circle,
    #solar_to_battery_entity_circle{
      fill:var(--warning-color);
    }
    #battery_consumption_entity_line{
      stroke:var(--success-color);
    }
    #battery_consumption_entity_circle{
      fill:var(--success-color);
    }
    .battery_soc_entity,
    .battery_consumption_entity{
      border: 1px solid var(--success-color);
      color: var(--success-color);
    }
    .battery_charge_state_text{
      position:absolute;
      top:8px;
    }
    br.clear {
      clear:both;
    }
    .power_lines svg{
      transform: translateZ(0);
      display:inline-block;
    }
    .acc_center .acc_td.acc_appliance1,
    .acc_center .acc_td.acc_appliance2 {
      position: absolute;
      right: 10px;
    `}};t([G({attribute:!1})],kt.prototype,"hass",void 0),t([K()],kt.prototype,"config",void 0),t([G({attribute:!1})],kt.prototype,"solarCardElements",void 0),t([K()],kt.prototype,"oldWidth",void 0),kt=t([J("tesla-style-solar-power-card")],kt);export{kt as TeslaStyleSolarPowerCard};
