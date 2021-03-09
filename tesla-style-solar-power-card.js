!function(){"use strict";
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
    ***************************************************************************** */function t(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o
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
     */}const e="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,i=(t,e,i=null)=>{for(;e!==i;){const i=e.nextSibling;t.removeChild(e),e=i}},s=`{{lit-${String(Math.random()).slice(2)}}}`,n=`\x3c!--${s}--\x3e`,r=new RegExp(`${s}|${n}`),o="$lit$";class a{constructor(t,e){this.parts=[],this.element=e;const i=[],n=[],a=document.createTreeWalker(e.content,133,null,!1);let c=0,d=-1,u=0;const{strings:_,values:{length:y}}=t;for(;u<y;){const t=a.nextNode();if(null!==t){if(d++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:i}=e;let s=0;for(let t=0;t<i;t++)l(e[t].name,o)&&s++;for(;s-- >0;){const e=_[u],i=p.exec(e)[2],s=i.toLowerCase()+o,n=t.getAttribute(s);t.removeAttribute(s);const a=n.split(r);this.parts.push({type:"attribute",index:d,name:i,strings:a}),u+=a.length-1}}"TEMPLATE"===t.tagName&&(n.push(t),a.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(s)>=0){const s=t.parentNode,n=e.split(r),a=n.length-1;for(let e=0;e<a;e++){let i,r=n[e];if(""===r)i=h();else{const t=p.exec(r);null!==t&&l(t[2],o)&&(r=r.slice(0,t.index)+t[1]+t[2].slice(0,-o.length)+t[3]),i=document.createTextNode(r)}s.insertBefore(i,t),this.parts.push({type:"node",index:++d})}""===n[a]?(s.insertBefore(h(),t),i.push(t)):t.data=n[a],u+=a}}else if(8===t.nodeType)if(t.data===s){const e=t.parentNode;null!==t.previousSibling&&d!==c||(d++,e.insertBefore(h(),t)),c=d,this.parts.push({type:"node",index:d}),null===t.nextSibling?t.data="":(i.push(t),d--),u++}else{let e=-1;for(;-1!==(e=t.data.indexOf(s,e+1));)this.parts.push({type:"node",index:-1}),u++}}else a.currentNode=n.pop()}for(const t of i)t.parentNode.removeChild(t)}}const l=(t,e)=>{const i=t.length-e.length;return i>=0&&t.slice(i)===e},c=t=>-1!==t.index,h=()=>document.createComment(""),p=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function d(t,e){const{element:{content:i},parts:s}=t,n=document.createTreeWalker(i,133,null,!1);let r=_(s),o=s[r],a=-1,l=0;const c=[];let h=null;for(;n.nextNode();){a++;const t=n.currentNode;for(t.previousSibling===h&&(h=null),e.has(t)&&(c.push(t),null===h&&(h=t)),null!==h&&l++;void 0!==o&&o.index===a;)o.index=null!==h?-1:o.index-l,r=_(s,r),o=s[r]}c.forEach((t=>t.parentNode.removeChild(t)))}const u=t=>{let e=11===t.nodeType?0:1;const i=document.createTreeWalker(t,133,null,!1);for(;i.nextNode();)e++;return e},_=(t,e=-1)=>{for(let i=e+1;i<t.length;i++){const e=t[i];if(c(e))return i}return-1};
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
const y=new WeakMap,g=t=>"function"==typeof t&&y.has(t),m={},f={};
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
class v{constructor(t,e,i){this.__parts=[],this.template=t,this.processor=e,this.options=i}update(t){let e=0;for(const i of this.__parts)void 0!==i&&i.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=e?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),i=[],s=this.template.parts,n=document.createTreeWalker(t,133,null,!1);let r,o=0,a=0,l=n.nextNode();for(;o<s.length;)if(r=s[o],c(r)){for(;a<r.index;)a++,"TEMPLATE"===l.nodeName&&(i.push(l),n.currentNode=l.content),null===(l=n.nextNode())&&(n.currentNode=i.pop(),l=n.nextNode());if("node"===r.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(l.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,r.name,r.strings,this.options));o++}else this.__parts.push(void 0),o++;return e&&(document.adoptNode(t),customElements.upgrade(t)),t}}
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
     */const w=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:t=>t}),b=` ${s} `;class x{constructor(t,e,i,s){this.strings=t,this.values=e,this.type=i,this.processor=s}getHTML(){const t=this.strings.length-1;let e="",i=!1;for(let r=0;r<t;r++){const t=this.strings[r],a=t.lastIndexOf("\x3c!--");i=(a>-1||i)&&-1===t.indexOf("--\x3e",a+1);const l=p.exec(t);e+=null===l?t+(i?b:n):t.substr(0,l.index)+l[1]+l[2]+o+l[3]+s}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");let e=this.getHTML();return void 0!==w&&(e=w.createHTML(e)),t.innerHTML=e,t}}
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
     */const S=t=>null===t||!("object"==typeof t||"function"==typeof t),C=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class P{constructor(t,e,i){this.dirty=!0,this.element=t,this.name=e,this.strings=i,this.parts=[];for(let t=0;t<i.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new A(this)}_getValue(){const t=this.strings,e=t.length-1,i=this.parts;if(1===e&&""===t[0]&&""===t[1]){const t=i[0].value;if("symbol"==typeof t)return String(t);if("string"==typeof t||!C(t))return t}let s="";for(let n=0;n<e;n++){s+=t[n];const e=i[n];if(void 0!==e){const t=e.value;if(S(t)||!C(t))s+="string"==typeof t?t:String(t);else for(const e of t)s+="string"==typeof e?e:String(e)}}return s+=t[e],s}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class A{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===m||S(t)&&t===this.value||(this.value=t,g(t)||(this.committer.dirty=!0))}commit(){for(;g(this.value);){const t=this.value;this.value=m,t(this)}this.value!==m&&this.committer.commit()}}class E{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(h()),this.endNode=t.appendChild(h())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=h()),t.__insert(this.endNode=h())}insertAfterPart(t){t.__insert(this.startNode=h()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;g(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=m,t(this)}const t=this.__pendingValue;t!==m&&(S(t)?t!==this.value&&this.__commitText(t):t instanceof x?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):C(t)?this.__commitIterable(t):t===f?(this.value=f,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,i="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=i:this.__commitNode(document.createTextNode(i)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof v&&this.value.template===e)this.value.update(t.values);else{const i=new v(e,t.processor,this.options),s=i._clone();i.update(t.values),this.__commitNode(s),this.value=i}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let i,s=0;for(const n of t)i=e[s],void 0===i&&(i=new E(this.options),e.push(i),0===s?i.appendIntoPart(this):i.insertAfterPart(e[s-1])),i.setValue(n),i.commit(),s++;s<e.length&&(e.length=s,this.clear(i&&i.endNode))}clear(t=this.startNode){i(this.startNode.parentNode,t.nextSibling,this.endNode)}}class N{constructor(t,e,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=i}setValue(t){this.__pendingValue=t}commit(){for(;g(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=m,t(this)}if(this.__pendingValue===m)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=m}}class R extends P{constructor(t,e,i){super(t,e,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new T(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class T extends A{}let $=!1;(()=>{try{const t={get capture(){return $=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class M{constructor(t,e,i){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=i,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;g(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=m,t(this)}if(this.__pendingValue===m)return;const t=this.__pendingValue,e=this.value,i=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),s=null!=t&&(null==e||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),s&&(this.__options=k(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=m}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const k=t=>t&&($?{capture:t.capture,passive:t.passive,once:t.once}:t.capture)
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
     */;function O(t){let e=V.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},V.set(t.type,e));let i=e.stringsArray.get(t.strings);if(void 0!==i)return i;const n=t.strings.join(s);return i=e.keyString.get(n),void 0===i&&(i=new a(t,t.getTemplateElement()),e.keyString.set(n,i)),e.stringsArray.set(t.strings,i),i}const V=new Map,B=new WeakMap;
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
     */const U=new
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
class{handleAttributeExpressions(t,e,i,s){const n=e[0];if("."===n){return new R(t,e.slice(1),i).parts}if("@"===n)return[new M(t,e.slice(1),s.eventContext)];if("?"===n)return[new N(t,e.slice(1),i)];return new P(t,e,i).parts}handleTextExpression(t){return new E(t)}};
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
     */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const I=(t,...e)=>new x(t,e,"html",U)
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
     */,W=(t,e)=>`${t}--${e}`;let q=!0;void 0===window.ShadyCSS?q=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),q=!1);const L=t=>e=>{const i=W(e.type,t);let n=V.get(i);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},V.set(i,n));let r=n.stringsArray.get(e.strings);if(void 0!==r)return r;const o=e.strings.join(s);if(r=n.keyString.get(o),void 0===r){const i=e.getTemplateElement();q&&window.ShadyCSS.prepareTemplateDom(i,t),r=new a(e,i),n.keyString.set(o,r)}return n.stringsArray.set(e.strings,r),r},z=["html","svg"],D=new Set,j=(t,e,i)=>{D.add(t);const s=i?i.element:document.createElement("template"),n=e.querySelectorAll("style"),{length:r}=n;if(0===r)return void window.ShadyCSS.prepareTemplateStyles(s,t);const o=document.createElement("style");for(let t=0;t<r;t++){const e=n[t];e.parentNode.removeChild(e),o.textContent+=e.textContent}(t=>{z.forEach((e=>{const i=V.get(W(e,t));void 0!==i&&i.keyString.forEach((t=>{const{element:{content:e}}=t,i=new Set;Array.from(e.querySelectorAll("style")).forEach((t=>{i.add(t)})),d(t,i)}))}))})(t);const a=s.content;i?function(t,e,i=null){const{element:{content:s},parts:n}=t;if(null==i)return void s.appendChild(e);const r=document.createTreeWalker(s,133,null,!1);let o=_(n),a=0,l=-1;for(;r.nextNode();)for(l++,r.currentNode===i&&(a=u(e),i.parentNode.insertBefore(e,i));-1!==o&&n[o].index===l;){if(a>0){for(;-1!==o;)n[o].index+=a,o=_(n,o);return}o=_(n,o)}}(i,o,a.firstChild):a.insertBefore(o,a.firstChild),window.ShadyCSS.prepareTemplateStyles(s,t);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)e.insertBefore(l.cloneNode(!0),e.firstChild);else if(i){a.insertBefore(o,a.firstChild);const t=new Set;t.add(o),d(i,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const F={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},H=(t,e)=>e!==t&&(e==e||t==t),J={attribute:!0,type:String,converter:F,reflect:!1,hasChanged:H},G="finalized";class Y extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach(((e,i)=>{const s=this._attributeNameForProperty(i,e);void 0!==s&&(this._attributeToPropertyMap.set(s,i),t.push(s))})),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach(((t,e)=>this._classProperties.set(e,t)))}}static createProperty(t,e=J){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const i="symbol"==typeof t?Symbol():`__${t}`,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const n=this[t];this[e]=s,this.requestUpdateInternal(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||J}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty(G)||t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const i of e)this.createProperty(i,t[i])}}static _attributeNameForProperty(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,i=H){return i(t,e)}static _propertyValueFromAttribute(t,e){const i=e.type,s=e.converter||F,n="function"==typeof s?s:s.fromAttribute;return n?n(t,i):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const i=e.type,s=e.converter;return(s&&s.toAttribute||F.toAttribute)(t,i)}initialize(){this._updateState=0,this._updatePromise=new Promise((t=>this._enableUpdatingResolver=t)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((t,e)=>this[e]=t)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,i){e!==i&&this._attributeToProperty(t,i)}_propertyToAttribute(t,e,i=J){const s=this.constructor,n=s._attributeNameForProperty(t,i);if(void 0!==n){const t=s._propertyValueToAttribute(e,i);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(n):this.setAttribute(n,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const i=this.constructor,s=i._attributeToPropertyMap.get(t);if(void 0!==s){const t=i.getPropertyOptions(s);this._updateState=16|this._updateState,this[s]=i._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}requestUpdateInternal(t,e,i){let s=!0;if(void 0!==t){const n=this.constructor;i=i||n.getPropertyOptions(t),n._valueHasChanged(this[t],e,i.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==i.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,i))):s=!1}!this._hasRequestedUpdate&&s&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this.requestUpdateInternal(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((t,e)=>this._propertyToAttribute(e,this[e],t))),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}Y.finalized=!0;
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
const Z=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?Object.assign(Object.assign({},e),{finisher(i){i.createProperty(e.key,t)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function K(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):Z(t,e)}function Q(t){return K({attribute:!1,hasChanged:null==t?void 0:t.hasChanged})}
/**
    @license
    Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
    This code may only be used under the BSD style license found at
    http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
    http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
    found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
    part of the polymer project is also subject to an additional IP rights grant
    found at http://polymer.github.io/PATENTS.txt
    */const X=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,tt=Symbol();class et{constructor(t,e){if(e!==tt)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(X?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const it=(t,...e)=>{const i=e.reduce(((e,i,s)=>e+(t=>{if(t instanceof et)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+t[s+1]),t[0]);return new et(i,tt)};
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const st={};class nt extends Y{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(Array.isArray(t)){const e=(t,i)=>t.reduceRight(((t,i)=>Array.isArray(i)?e(i,t):(t.add(i),t)),i),i=e(t,new Set),s=[];i.forEach((t=>s.unshift(t))),this._styles=s}else this._styles=void 0===t?[]:[t];this._styles=this._styles.map((t=>{if(t instanceof CSSStyleSheet&&!X){const e=Array.prototype.slice.call(t.cssRules).reduce(((t,e)=>t+e.cssText),"");return new et(String(e),tt)}return t}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?X?this.renderRoot.adoptedStyleSheets=t.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map((t=>t.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==st&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)})))}render(){return st}}nt.finalized=!0,nt.render=(t,e,s)=>{if(!s||"object"!=typeof s||!s.scopeName)throw new Error("The `scopeName` option is required.");const n=s.scopeName,r=B.has(e),o=q&&11===e.nodeType&&!!e.host,a=o&&!D.has(n),l=a?document.createDocumentFragment():e;if(((t,e,s)=>{let n=B.get(e);void 0===n&&(i(e,e.firstChild),B.set(e,n=new E(Object.assign({templateFactory:O},s))),n.appendInto(e)),n.setValue(t),n.commit()})(t,l,Object.assign({templateFactory:L(n)},s)),a){const t=B.get(l);B.delete(l);const s=t.value instanceof v?t.value.template:void 0;j(n,l,s),i(e,e.firstChild),e.appendChild(l),B.set(e,t)}!r&&o&&window.ShadyCSS.styleElement(e.host)};class rt{constructor(t,e){this.speed=0,this.startPosition=0,this.currentPosition=0,this.currentDelta=0,this.maxPosition=30,this.unitOfMeasurement="",this.accText="",this.accTextclassName="accText",this.entity="",this.color="stroke:var(--info-color)",this.circleColor="var(--primary-color)",this.prevTimestamp=0,this.accTextElement=null,this.entity=t,this.entitySlot=e,this.value=0}setValueAndUnitOfMeasurement(t,e=!1,i){let s=0;if(void 0===t)return void(this.value=s);if(void 0===i)return void(this.value=t);const n=parseFloat(t);if("kW"===i)s=n;else if("W"!==i||e)if("W"===i&&e)s=n;else{if("%"!==i)return void(this.value=t);s=n}else s=n/1e3,i="kW";this.unitOfMeasurement=i,this.value=this.roundValue(s)}roundValue(t){return t=t>.1?(0|Math.round(10*(t+Number.EPSILON)))/10:(0|Math.round(100*(t+Number.EPSILON)))/100}setSpeed(t){this.speed=0,0!=Math.abs(this.value)&&(this.speed=t?rt.SPEEDFACTOR/1e3*this.value:rt.SPEEDFACTOR*this.value)}}rt.SPEEDFACTOR=.04;class ot{constructor(t,e){this.teslaCard=t,this.solarCardElements=t.solarCardElements,this.pxRate=t.pxRate,this.hass=e}writeBubbleDiv(t,e,i,s,n,r,o=null,a=null){return I`
        <div class= "acc_td ${n}">
            <div class="acc_container ${t}"
              style="${"width:"+9*this.pxRate+"px; height: "+9*this.pxRate+"px; padding:"+5*this.pxRate+"px"}"
              @click="${()=>this._handleClick(e)}" 
            >
              ${null!==o?I` 
                <div 
                  class="acc_text_extra"
                  style="font-size:${3*this.pxRate+"px"};
                        top: ${1*this.pxRate+"px"};
                        width: ${10*this.pxRate+"px"};"
                >
                  ${o} ${a}
                </div>`:I``}
              <ha-icon class="acc_icon" icon="${r}" ></ha-icon>
              <div class='acc_text' style="font-size:${3*this.pxRate+"px"}; margin-top:${-.8*this.pxRate+"px"}">
                  ${i} ${s}
              </div>
            </div>
          </div>`}writeBatteryBubbleDiv(t,e,i,s,n,r,o,a){return void 0!==o&&(r=this.getBatteryIcon(parseFloat(o),i)),this.writeBubbleDiv(t,e,i,s,n,r,o,a)}getBatteryIcon(t,e){let i=t;t<=5&&(i=0);const s=10*Math.ceil(i/10);let n="-"+s.toString(),r="-charging";return e<=0&&(r=""),100===s&&(n=""),s<=5&&(n="-outline"),"mdi:battery"+r+n}writeAppliancePowerLineAndCircle(t,e){if(null==this.solarCardElements.get("appliance"+t+"_consumption_entity"))return I``;let i;return i=1===t?"top:"+22.5*this.pxRate+"px;":"bottom:"+15*this.pxRate+"px;",I`
    <div class="acc_line acc_appliance${t}_line"
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
        class="acc_appliance${t}_line_svg"
      >
        ${this.writeCircleAndLine("appliance"+t+"_consumption_entity",e)}
        </svg>
    </div>`}writeCircleAndLine(t,e){const i=this.solarCardElements.get(t);return null==i?I``:I`<svg><circle r="4"
        cx="${i.startPosition.toString()}"
        cy="4"
        fill="${i.color}"
        id="${t+"_circle"}">
      </circle>
      <path d="${e}" id="${t+"_line"}"></path></svg>`}_handleClick(t){const e=new Event("hass-more-info",{bubbles:!0,cancelable:!0,composed:!0});e.detail={entityId:t.entity_id},null!=this.teslaCard.shadowRoot&&this.teslaCard.shadowRoot.dispatchEvent(e)}}class at{static changeStylesDependingOnWidth(t,e,i,s){if("complete"!==document.readyState||s===i)return s;if(null==t.shadowRoot)return s;const n=t.shadowRoot.querySelector("#tesla-style-solar-power-card");if(null==n)return s;const r=i/100,o=function(t,e,i){const s=n.querySelector(t);null!==s&&(s.style[e]=i)};o(".acc_left","top",12*r+"px"),o(".acc_right","top",12*r+"px"),void 0===e.get("battery_consumption_entity")&&void 0!==e.get("appliance2_consumption_entity")&&o(".acc_center_container","margin-bottom",15*r+"px"),n.querySelectorAll(".acc_container").forEach(((t,e,i)=>{const s=i[e];s.style.height=9*r+"px",s.style.width=9*r+"px",s.style.padding=5*r+"px"})),n.querySelectorAll("ha-icon").forEach(((t,e,i)=>{var s;const n=null===(s=i[e].shadowRoot)||void 0===s?void 0:s.querySelector("ha-svg-icon");null!=n&&(n.style.height=9*r+"px",n.style.width=9*r+"px")})),n.querySelectorAll(".acc_text").forEach((t=>{t.style["font-size"]=3*r+"px",t.style["margin-top"]=-1*r+"px"})),n.querySelectorAll(".acc_text_extra").forEach((t=>{t.style["font-size"]=3*r+"px",t.style.top=1*r+"px",t.style.width=10*r+"px"})),o(".power_lines","height",42*r+"px"),o(".power_lines","width",42*r+"px"),o(".power_lines","top",21*r+"px"),o(".power_lines","left",21*r+"px"),o(".power_lines svg","width",42*r+"px"),o(".power_lines svg","height",42*r+"px"),o(".power_lines svg","viewBox","0 0 "+42*r+" "+42*r);let a=n.querySelector(".power_lines svg");null!==a&&a.setAttribute("viewBox","0 0 "+42*r+" "+42*r);const l=22*r;return o("#generation_to_house_entity_line","d","M"+l+",0 C"+l+","+l+" "+l+","+l+" "+2*l+","+l),o("#grid_feed_in_entity_line","d","M"+l+",0 C"+l+","+l+" "+l+","+l+" 0,"+l),o("#grid_to_house_entity_line","d","M0,"+l+" C"+l+","+l+" "+l+","+l+" "+2*l+","+l),o("#grid_to_battery_entity_line","d","M0,"+l+" C"+l+","+l+" "+l+","+l+" "+l+","+2*l),o("#battery_to_house_entity_line","d","M"+l+","+2*l+" C"+l+","+l+" "+l+","+l+" "+2*l+","+l),o("#generation_to_battery_entity_line","d","M"+l+",0 C"+l+",0 "+l+","+2*l+" "+l+","+2*l),[1,2].forEach((t=>{o(".acc_appliance"+t+"_line svg","viewBox","0 0 "+26*r+" "+26*r),o(".acc_appliance"+t+"_line","right",10*r+"px"),o(".acc_appliance"+t+"_line","width",4*r+"px"),o(".acc_appliance"+t+"_line","height",18*r+"px"),o(".acc_appliance"+t+"_line svg","width",4*r+"px"),o(".acc_appliance"+t+"_line svg","height",18*r+"px"),a=n.querySelector(".acc_appliance"+t+"_line_svg"),null!==a&&a.setAttribute("viewBox","0 0 "+26*r+" "+26*r)})),o(".acc_appliance1","top","10px"),o(".acc_appliance1_line","top",23*r+"px"),o(".acc_appliance2","bottom","10px"),o(".acc_appliance2_line","bottom",15*r+"px"),i}}window.customCards=window.customCards||[],window.customCards.push({type:"tesla-style-solar-power-card",name:"Tesla Style Solar Power Card",description:"A Solar Power Visualization with svg paths that mimmicks the powerwall app of tesla 2"});class lt extends nt{constructor(){super(...arguments),this.solarCardElements=new Map,this.oldWidth=100,this.pxRate=30,this.htmlWriter=new ot(this,this.hass),this.title="Hey there",this.counter=5}__increment(){this.counter+=1}setConfig(t){let e;t.test_gui,this.config={...t},null==this.config.grid_icon&&(this.config.grid_icon="mdi:transmission-tower"),null==this.config.generation_icon&&(this.config.generation_icon="mdi:solar-panel-large"),null==this.config.house_icon&&(this.config.house_icon="mdi:home"),null==this.config.appliance1_icon&&(this.config.appliance1_icon="mdi:car-sports"),null==this.config.appliance2_icon&&(this.config.appliance2_icon="mdi:air-filter"),this.createSolarCardElements(),e=this,setInterval(this.animateCircles,15,e),e=this}createSolarCardElements(){Object.keys(this.config).forEach((t=>{if(null!=this.config[t]&&t.indexOf("_entity")>5){const e=this.config[t].toString();this.solarCardElements.set(t,new rt(e,t))}}))}getCardSize(){return 5}static getStubConfig(){return{}}async firstUpdated(){await new Promise((t=>setTimeout(t,0))),this.oldWidth=at.changeStylesDependingOnWidth(this,this.solarCardElements,this.clientWidth,this.oldWidth)}connectedCallback(){super.connectedCallback(),this.redraw=this.redraw.bind(this),window.addEventListener("resize",this.redraw)}shouldUpdate(t){let e;e=this,requestAnimationFrame((t=>{e.updateAllCircles(t)})),e=this;let i=!0;return Array.from(t.keys()).some((e=>{const s=t.get(e);return"hass"===e&&s&&(i=i&&this.sensorChangeDetected(s)),!i})),i}sensorChangeDetected(t){let e=!1;return this.solarCardElements.forEach(((i,s)=>{void 0!==this.hass.states[this.config[s]]&&this.hass.states[this.config[s]].state!==t.states[this.config[s]].state&&(e=!0)})),e}async performUpdate(){this.solarCardElements.forEach((t=>{t.setValueAndUnitOfMeasurement(this.hass.states[t.entity].state,this.config.w_not_kw,this.hass.states[t.entity].attributes.unit_of_measurement),t.setSpeed(this.config.w_not_kw)})),super.performUpdate()}render(){this.pxRate=this.clientWidth/100;const t=22*this.pxRate;return I`
    <ha-card
      .header=${this.config.name}
      tabindex="0"
    >
      <div id="tesla-style-solar-power-card">
        ${this.writeGenerationIconBubble()}
        <div class="acc_center">
          <div class="acc_center_container">
            ${this.writeGridIconBubble()}
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
                ${this.htmlWriter.writeCircleAndLine("generation_to_house_entity","M"+t+",0 C"+t+","+t+" "+t+","+t+" "+2*t+","+t)}
                ${this.htmlWriter.writeCircleAndLine("grid_to_house_entity","M0,"+t+" C"+t+","+t+" "+t+","+t+" "+2*t+","+t)}
                ${this.htmlWriter.writeCircleAndLine("generation_to_grid_entity","M"+t+",0 C"+t+","+t+" "+t+","+t+" 0,"+t)}
                ${this.htmlWriter.writeCircleAndLine("grid_to_battery_entity","M0,"+t+" C"+t+","+t+" "+t+","+t+" "+t+","+2*t)}
                ${this.htmlWriter.writeCircleAndLine("battery_to_grid_entity","M"+t+","+2*t+" C"+t+","+t+" "+t+","+t+" 0,"+t)}
                ${this.htmlWriter.writeCircleAndLine("generation_to_battery_entity","M"+t+",0 C"+t+",0 "+t+","+2*t+" "+t+","+2*t)}
                ${this.htmlWriter.writeCircleAndLine("battery_to_house_entity","M"+t+","+2*t+" C"+t+","+t+" "+t+","+t+" "+2*t+","+t)}
              </svg>
            </div>

            ${this.writeHouseIconBubble()}
            ${this.writeApplianceIconBubble(1)}
            ${this.htmlWriter.writeAppliancePowerLineAndCircle(1,"M4,"+16*this.pxRate+" C4,"+16*this.pxRate+" 4,0 4,0")}
            ${this.writeApplianceIconBubble(2)}
            ${this.htmlWriter.writeAppliancePowerLineAndCircle(2,"M4,0 C4,0 4,"+16*this.pxRate+" 4,"+16*this.pxRate)}
          </div>
        </div>
        <div class="acc_bottom">
          ${this.writeBatteryIconBubble()}
        </div>
      </div>
    </ha-card>
    `}writeGenerationIconBubble(){return this.writeIconBubble("generation_yield_entity",["generation_to_grid_entity","generation_to_house_entity","generation_to_battery_entity"],"acc_top","generation_icon")}writeGridIconBubble(){return this.writeIconBubble("grid_consumption_entity",["-generation_to_grid_entity","grid_to_house_entity","-battery_to_grid_entity"],"acc_left","grid_icon")}writeHouseIconBubble(){return this.writeIconBubble("house_consumption_entity",["generation_to_house_entity","grid_to_house_entity","battery_to_house_entity"],"acc_right","house_icon")}writeBatteryIconBubble(){return this.writeIconBubble("battery_consumption_entity",["generation_to_battery_entity","grid_to_battery_entity","-battery_to_house_entity","-battery_to_grid_entity"],"acc_bottom","battery_icon","battery_soc_entity",!0)}writeApplianceIconBubble(t){const e=["appliance"+t+"_consumption_entity"];return this.writeIconBubble("appliance"+t+"_consumption_entity",e,"acc_appliance"+t,"appliance"+t+"_icon","appliance"+t+"_state_entity")}writeIconBubble(t,e,i,s,n=null,r=!1){if(void 0===this.config[t])return I``;let o,a,l,c=0,h=!1;if(null!==n){const t=this.solarCardElements.get(n);a=null==t?void 0:t.value,l=null==t?void 0:t.unitOfMeasurement}return e.forEach((t=>{"-"===t.substring(0,1)&&(t=t.substring(1),h=!0);const e=this.solarCardElements.get(t);null!==e&&void 0!==(null==e?void 0:e.value)&&(h?c-=null==e?void 0:e.value:c+=null==e?void 0:e.value,c=(100*c|0)/100,o=null==e?void 0:e.unitOfMeasurement),h=!1})),r?this.htmlWriter.writeBatteryBubbleDiv(t,this.hass.states[this.config[t]],c,o,i,this.config[s],a,l):this.htmlWriter.writeBubbleDiv(t,this.hass.states[this.config[t]],c,o,i,this.config[s],a,l)}animateCircles(t){requestAnimationFrame((e=>{t.updateAllCircles(e)}))}updateAllCircles(t){this.solarCardElements.forEach(((e,i)=>{const s=this.solarCardElements.get(i);void 0!==s&&this.updateOneCircle(t,s)}))}updateOneCircle(t,e){if(null==this.shadowRoot)return;const i=this.shadowRoot.querySelector("#tesla-style-solar-power-card");if(null==i)return;if(e.line=i.querySelector("#"+e.entitySlot+"_line"),null===e.line)return;const s=e.line.getTotalLength();if(isNaN(s))return;if(e.circle=i.querySelector("#"+e.entitySlot+"_circle"),0===e.speed)return e.circle.setAttribute("visibility","hidden"),void(this.config.hide_inactive_lines&&e.line.setAttribute("visibility","hidden"));e.circle.setAttribute("visibility","visible"),this.config.hide_inactive_lines&&e.line.setAttribute("visibility","visible"),0===e.prevTimestamp&&(e.prevTimestamp=t,e.currentDelta=0),e.currentDelta+=Math.abs(e.speed)*(t-e.prevTimestamp);let n=e.currentDelta/s;e.speed>0?(n>=1||isNaN(n))&&(e.currentDelta=0,n=.01):(n=1-n,(n<=0||isNaN(n))&&(e.currentDelta=0,n=1));const r=e.line.getPointAtLength(s*n);e.circle.setAttributeNS(null,"cx",r.x.toString()),e.circle.setAttributeNS(null,"cy",r.y.toString()),e.prevTimestamp=t}redraw(t){this.hass&&this.config&&"resize"===t.type&&(this.oldWidth=at.changeStylesDependingOnWidth(this,this.solarCardElements,this.clientWidth,this.oldWidth))}_showWarning(t){return I`
      <hui-warning>${t}</hui-warning>
    `}_showError(t){const e=document.createElement("hui-error-card");return e.setConfig({type:"error",error:t,origConfig:this.config}),I`
      ${e}
    `}static get styles(){return it`
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
    #battery_to_house_entity_line,
    #generation_to_house_entity_line,
    #grid_to_house_entity_line,
    #generation_to_battery_entity_line,
    #grid_feed_in_entity_line,
    #generation_to_grid_entity_line,
    #battery_to_grid_entity_line,
    #grid_to_battery_entity_line,
    #appliance1_consumption_entity_line,
    #appliance2_consumption_entity_line{
      stroke:var(--info-color);
      fill:none;
      stroke-width:1;
    }

    .generation_yield_entity {
      border: 1px solid var(--warning-color);
    }
    .generation_yield_entity .acc_icon,
    .generation_yield_entity{
      color: var(--warning-color);
    }
    .house_consumption_entity,
    .appliance1_consumption_entity,
    .appliance2_consumption_entity {
      border: 1px solid var(--info-color);
    }
    .house_consumption_entity,
    .appliance1_consumption_entity,
    .appliance2_consumption_entity{
      color: var(--info-color);
    }
    #grid_to_house_entity_line{
      stroke-width:1;
    }
    #generation_to_house_entity_line,
    #generation_to_grid_entity_line,
    #generation_to_battery_entity_line{
      stroke:var(--warning-color);
    }
    #generation_to_house_entity_circle,
    #generation_to_grid_entity_circle,
    #generation_to_battery_entity_circle{
      fill:var(--warning-color);
    }
    #battery_to_house_entity_line,
    #battery_to_grid_entity_line{
      stroke:var(--success-color);
    }
    #battery_to_house_entity_circle,
    #battery_to_grid_entity_circle{
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
    `}}t([K({attribute:!1})],lt.prototype,"hass",void 0),t([Q()],lt.prototype,"config",void 0),t([K({attribute:!1})],lt.prototype,"solarCardElements",void 0),t([Q()],lt.prototype,"oldWidth",void 0),t([K({type:String})],lt.prototype,"title",void 0),t([K({type:Number})],lt.prototype,"counter",void 0),window.customElements.define("tesla-style-solar-power-card",lt)}();
