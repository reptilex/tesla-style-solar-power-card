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
    ***************************************************************************** */function t(t,e,i,n){var s,r=arguments.length,o=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,n);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(o=(r<3?s(o):r>3?s(e,i,o):s(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o
/**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */}const e=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=new Map;class s{constructor(t,e){if(this._$cssResult$=!0,e!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let t=n.get(this.cssText);return e&&void 0===t&&(n.set(this.cssText,t=new CSSStyleSheet),t.replaceSync(this.cssText)),t}toString(){return this.cssText}}const r=(t,...e)=>{const n=1===t.length?t[0]:e.reduce(((e,i,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1]),t[0]);return new s(n,i)},o=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new s("string"==typeof t?t:t+"",i))(e)})(t):t
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */;var l;const a=window.trustedTypes,c=a?a.emptyScript:"",h=window.reactiveElementPolyfillSupport,d={toAttribute(t,e){switch(e){case Boolean:t=t?c:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},u=(t,e)=>e!==t&&(e==e||t==t),_={attribute:!0,type:String,converter:d,reflect:!1,hasChanged:u};class p extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;null!==(e=this.l)&&void 0!==e||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const n=this._$Eh(i,e);void 0!==n&&(this._$Eu.set(n,i),t.push(n))})),t}static createProperty(t,e=_){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,n=this.getPropertyDescriptor(t,i,e);void 0!==n&&Object.defineProperty(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(n){const s=this[t];this[e]=n,this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||_}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eh(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ep=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Em(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$Eg)&&void 0!==e?e:this._$Eg=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$Eg)||void 0===e||e.splice(this._$Eg.indexOf(t)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const i=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{e?t.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):i.forEach((e=>{const i=document.createElement("style"),n=window.litNonce;void 0!==n&&i.setAttribute("nonce",n),i.textContent=e.cssText,t.appendChild(i)}))})(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ES(t,e,i=_){var n,s;const r=this.constructor._$Eh(t,i);if(void 0!==r&&!0===i.reflect){const o=(null!==(s=null===(n=i.converter)||void 0===n?void 0:n.toAttribute)&&void 0!==s?s:d.toAttribute)(e,i.type);this._$Ei=t,null==o?this.removeAttribute(r):this.setAttribute(r,o),this._$Ei=null}}_$AK(t,e){var i,n,s;const r=this.constructor,o=r._$Eu.get(t);if(void 0!==o&&this._$Ei!==o){const t=r.getPropertyOptions(o),l=t.converter,a=null!==(s=null!==(n=null===(i=l)||void 0===i?void 0:i.fromAttribute)&&void 0!==n?n:"function"==typeof l?l:null)&&void 0!==s?s:d.fromAttribute;this._$Ei=o,this[o]=a(e,t.type),this._$Ei=null}}requestUpdate(t,e,i){let n=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||u)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Ei!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):n=!1),!this.isUpdatePending&&n&&(this._$Ep=this._$E_())}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,e)=>this[e]=t)),this._$Et=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$EU()}catch(t){throw e=!1,this._$EU(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$Eg)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$ES(e,this[e],t))),this._$EC=void 0),this._$EU()}updated(t){}firstUpdated(t){}}
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var y;p.finalized=!0,p.elementProperties=new Map,p.elementStyles=[],p.shadowRootOptions={mode:"open"},null==h||h({ReactiveElement:p}),(null!==(l=globalThis.reactiveElementVersions)&&void 0!==l?l:globalThis.reactiveElementVersions=[]).push("1.3.1");const g=globalThis.trustedTypes,v=g?g.createPolicy("lit-html",{createHTML:t=>t}):void 0,f=`lit$${(Math.random()+"").slice(9)}$`,m="?"+f,b=`<${m}>`,w=document,$=(t="")=>w.createComment(t),A=t=>null===t||"object"!=typeof t&&"function"!=typeof t,C=Array.isArray,E=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,S=/-->/g,x=/>/g,k=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,P=/'/g,M=/"/g,B=/^(?:script|style|textarea|title)$/i,O=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),U=Symbol.for("lit-noChange"),T=Symbol.for("lit-nothing"),H=new WeakMap,N=w.createTreeWalker(w,129,null,!1),R=(t,e)=>{const i=t.length-1,n=[];let s,r=2===e?"<svg>":"",o=E;for(let e=0;e<i;e++){const i=t[e];let l,a,c=-1,h=0;for(;h<i.length&&(o.lastIndex=h,a=o.exec(i),null!==a);)h=o.lastIndex,o===E?"!--"===a[1]?o=S:void 0!==a[1]?o=x:void 0!==a[2]?(B.test(a[2])&&(s=RegExp("</"+a[2],"g")),o=k):void 0!==a[3]&&(o=k):o===k?">"===a[0]?(o=null!=s?s:E,c=-1):void 0===a[1]?c=-2:(c=o.lastIndex-a[2].length,l=a[1],o=void 0===a[3]?k:'"'===a[3]?M:P):o===M||o===P?o=k:o===S||o===x?o=E:(o=k,s=void 0);const d=o===k&&t[e+1].startsWith("/>")?" ":"";r+=o===E?i+b:c>=0?(n.push(l),i.slice(0,c)+"$lit$"+i.slice(c)+f+d):i+f+(-2===c?(n.push(void 0),e):d)}const l=r+(t[i]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==v?v.createHTML(l):l,n]};class W{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let s=0,r=0;const o=t.length-1,l=this.parts,[a,c]=R(t,e);if(this.el=W.createElement(a,i),N.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(n=N.nextNode())&&l.length<o;){if(1===n.nodeType){if(n.hasAttributes()){const t=[];for(const e of n.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(f)){const i=c[r++];if(t.push(e),void 0!==i){const t=n.getAttribute(i.toLowerCase()+"$lit$").split(f),e=/([.?@])?(.*)/.exec(i);l.push({type:1,index:s,name:e[2],strings:t,ctor:"."===e[1]?V:"?"===e[1]?j:"@"===e[1]?F:z})}else l.push({type:6,index:s})}for(const e of t)n.removeAttribute(e)}if(B.test(n.tagName)){const t=n.textContent.split(f),e=t.length-1;if(e>0){n.textContent=g?g.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],$()),N.nextNode(),l.push({type:2,index:++s});n.append(t[e],$())}}}else if(8===n.nodeType)if(n.data===m)l.push({type:2,index:s});else{let t=-1;for(;-1!==(t=n.data.indexOf(f,t+1));)l.push({type:7,index:s}),t+=f.length-1}s++}}static createElement(t,e){const i=w.createElement("template");return i.innerHTML=t,i}}function D(t,e,i=t,n){var s,r,o,l;if(e===U)return e;let a=void 0!==n?null===(s=i._$Cl)||void 0===s?void 0:s[n]:i._$Cu;const c=A(e)?void 0:e._$litDirective$;return(null==a?void 0:a.constructor)!==c&&(null===(r=null==a?void 0:a._$AO)||void 0===r||r.call(a,!1),void 0===c?a=void 0:(a=new c(t),a._$AT(t,i,n)),void 0!==n?(null!==(o=(l=i)._$Cl)&&void 0!==o?o:l._$Cl=[])[n]=a:i._$Cu=a),void 0!==a&&(e=D(t,a._$AS(t,e.values),a,n)),e}class L{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:i},parts:n}=this._$AD,s=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:w).importNode(i,!0);N.currentNode=s;let r=N.nextNode(),o=0,l=0,a=n[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new I(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new K(r,this,t)),this.v.push(e),a=n[++l]}o!==(null==a?void 0:a.index)&&(r=N.nextNode(),o++)}return s}m(t){let e=0;for(const i of this.v)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class I{constructor(t,e,i,n){var s;this.type=2,this._$AH=T,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cg=null===(s=null==n?void 0:n.isConnected)||void 0===s||s}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=D(this,t,e),A(t)?t===T||null==t||""===t?(this._$AH!==T&&this._$AR(),this._$AH=T):t!==this._$AH&&t!==U&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.k(t):(t=>{var e;return C(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])})(t)?this.S(t):this.$(t)}A(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}k(t){this._$AH!==t&&(this._$AR(),this._$AH=this.A(t))}$(t){this._$AH!==T&&A(this._$AH)?this._$AA.nextSibling.data=t:this.k(w.createTextNode(t)),this._$AH=t}T(t){var e;const{values:i,_$litType$:n}=t,s="number"==typeof n?this._$AC(t):(void 0===n.el&&(n.el=W.createElement(n.h,this.options)),n);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===s)this._$AH.m(i);else{const t=new L(s,this),e=t.p(this.options);t.m(i),this.k(e),this._$AH=t}}_$AC(t){let e=H.get(t.strings);return void 0===e&&H.set(t.strings,e=new W(t)),e}S(t){C(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,n=0;for(const s of t)n===e.length?e.push(i=new I(this.A($()),this.A($()),this,this.options)):i=e[n],i._$AI(s),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cg=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class z{constructor(t,e,i,n,s){this.type=1,this._$AH=T,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=T}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,n){const s=this.strings;let r=!1;if(void 0===s)t=D(this,t,e,0),r=!A(t)||t!==this._$AH&&t!==U,r&&(this._$AH=t);else{const n=t;let o,l;for(t=s[0],o=0;o<s.length-1;o++)l=D(this,n[i+o],e,o),l===U&&(l=this._$AH[o]),r||(r=!A(l)||l!==this._$AH[o]),l===T?t=T:t!==T&&(t+=(null!=l?l:"")+s[o+1]),this._$AH[o]=l}r&&!n&&this.C(t)}C(t){t===T?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class V extends z{constructor(){super(...arguments),this.type=3}C(t){this.element[this.name]=t===T?void 0:t}}const q=g?g.emptyScript:"";class j extends z{constructor(){super(...arguments),this.type=4}C(t){t&&t!==T?this.element.setAttribute(this.name,q):this.element.removeAttribute(this.name)}}class F extends z{constructor(t,e,i,n,s){super(t,e,i,n,s),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=D(this,t,e,0))&&void 0!==i?i:T)===U)return;const n=this._$AH,s=t===T&&n!==T||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,r=t!==T&&(n===T||s);s&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class K{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){D(this,t)}}const G=window.litHtmlPolyfillSupport;
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var J,Y;null==G||G(W,I),(null!==(y=globalThis.litHtmlVersions)&&void 0!==y?y:globalThis.litHtmlVersions=[]).push("2.2.1");class Z extends p{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,e,i)=>{var n,s;const r=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:e;let o=r._$litPart$;if(void 0===o){const t=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:null;r._$litPart$=o=new I(e.insertBefore($(),t),t,void 0,null!=i?i:{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return U}}Z.finalized=!0,Z._$litElement$=!0,null===(J=globalThis.litElementHydrateSupport)||void 0===J||J.call(globalThis,{LitElement:Z});const Q=globalThis.litElementPolyfillSupport;null==Q||Q({LitElement:Z}),(null!==(Y=globalThis.litElementVersions)&&void 0!==Y?Y:globalThis.litElementVersions=[]).push("3.2.0");
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
const X=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function tt(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):X(t,e)
/**
     * @license
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */}var et;null===(et=window.HTMLSlotElement)||void 0===et||et.prototype.assignedElements;class it{constructor(t,e){this.speed=0,this.startPosition=0,this.currentPosition=0,this.currentDelta=0,this.maxPosition=30,this.unitOfMeasurement="",this.accText="",this.accTextclassName="accText",this.entity="",this.color="stroke:var(--info-color)",this.circleColor="var(--primary-color)",this.prevTimestamp=0,this.accTextElement=null,this.entity=t,this.entitySlot=e,this.value=0}setValueAndUnitOfMeasurement(t,e){if(void 0===t)return void(this.value=0);if(void 0===e)return void(this.value=t);const i=parseFloat(t);switch(e){case"W":case"w":case"kW":this.value=i,"kW"===e&&(this.value*=1e3),this.unitOfMeasurement="W",this.value=Math.round(this.value);break;case"%":this.value=i,this.unitOfMeasurement=e;break;default:this.value=t,this.unitOfMeasurement=e}}setSpeed(t){if(this.speed=0,0===Math.abs(this.value))return;let e;e=void 0===t||t>1||t<=0?it.SPEEDFACTOR:t,this.speed=e*this.value/1e3}}it.SPEEDFACTOR=.04;class nt{constructor(){this.mainValue=0,this.clickEntitySlot=null,this.clickEntityHassState=null,this.noEntitiesWithValueFound=!0}}class st{constructor(t,e){this.teslaCard=t,this.solarCardElements=t.solarCardElements,this.hass=e}writeBubbleDiv(t){return t.noEntitiesWithValueFound?O``:O` <div class="acc_td ${t.cssSelector}">
      <div
        class="acc_container ${t.clickEntitySlot}"
        @click="${()=>this._handleClick(t.clickEntityHassState)}"
      >
        ${null!==t.extraValue?O` <div class="acc_text_extra">
		  	${t.extraValue} ${t.extraUnitOfMeasurement}
            </div>`:O``}
        <ha-icon class="acc_icon" icon="${t.icon}"></ha-icon>
        <div class="acc_text">
          ${t.mainValue} ${t.mainUnitOfMeasurement}
        </div>
      </div>
    </div>`}writeBatteryBubbleDiv(t){return void 0!==t.extraValue&&("mdi:battery-medium"!==t.icon&&"mdi:battery"!==t.icon||(t.icon=this.getBatteryIcon(parseFloat(t.extraValue),t.mainValue))),this.writeBubbleDiv(t)}getBatteryIcon(t,e){let i=t;t<=5&&(i=0);const n=10*Math.ceil(i/10);let s="-"+n.toString(),r="-charging";return e<=0&&(r=""),100===n&&(s=""),n<=5&&(s="-outline"),"mdi:battery"+r+s}writeAppliancePowerLineAndCircle(t,e,i){return null==this.solarCardElements.get("appliance"+t+"_consumption_entity")?O``:O` <div
      class="acc_line acc_appliance${t}_line">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox='${"0 0 "+i+" "+i}'
        preserveAspectRatio="xMinYMax slice"
        class="acc_appliance${t}_line_svg"
      >
        ${this.writeCircleAndLine("appliance"+t+"_consumption_entity",e)}
      </svg>
    </div>`}writeCircleAndLine(t,e){return null==this.solarCardElements.get(t)?O``:O`<svg>
	  <line x1="0" y1="0" x2="0" y2="0" id="${t+"_circle"}" />
      <path d="${e}" id="${t+"_line"}"></path>
    </svg>`}_handleClick(t){if(null==t)return;const e=new Event("hass-more-info",{bubbles:!0,cancelable:!0,composed:!0});e.detail={entityId:t.entity_id},null!=this.teslaCard.shadowRoot&&this.teslaCard.shadowRoot.dispatchEvent(e)}}class rt{static changeStylesDependingOnWidth(t,e,i,n){if("complete"!==document.readyState||n===i)return n;if(null==t.shadowRoot)return n;return null==t.shadowRoot.querySelector("#tesla-style-solar-power-card")?n:i}}window.customCards=window.customCards||[],window.customCards.push({type:"tesla-style-solar-power-card",name:"Tesla Style Solar Power Card",description:"A Solar Power Visualization with svg paths that mimmicks the powerwall app of tesla 2"});class ot extends Z{constructor(){super(...arguments),this.solarCardElements=new Map,this.oldWidth=100,this.htmlWriter=new st(this,this.hass),this.title="Hey there",this.counter=5,this.error="",this.bubblePercentage=20}__increment(){this.counter+=1}setConfig(t){if(t.test_gui,this.config={...t},null==this.config.grid_icon&&(this.config.grid_icon="mdi:transmission-tower"),null==this.config.generation_icon&&(this.config.generation_icon="mdi:solar-panel-large"),null==this.config.house_icon&&(this.config.house_icon="mdi:home"),null==this.config.battery_icon&&(this.config.battery_icon="mdi:battery-medium"),null==this.config.appliance1_icon&&(this.config.appliance1_icon="mdi:car-sports"),null==this.config.appliance2_icon&&(this.config.appliance2_icon="mdi:air-filter"),null==this.config.speed_factor&&(this.config.speed_factor=.04),null==this.config.dot_factor&&(this.config.dot_factor=8),null==this.config.line_width&&(this.config.line_width="1px"),null==this.config.entity_radius&&(this.config.entity_radius="50%"),null==this.config.card_padding&&(this.config.card_padding="16px"),this.createSolarCardElements(),!this.config.energy_flow_diagramm){const t=this;setInterval(this.animateCircles,15,t)}}createSolarCardElements(){Object.keys(this.config).forEach((t=>{if(null!=this.config[t]&&t.indexOf("_entity")>5){const e=this.config[t].toString();this.solarCardElements.set(t,new it(e,t))}}))}getCardSize(){return 5}static getStubConfig(){return{}}async firstUpdated(){await new Promise((t=>setTimeout(t,0))),this.oldWidth=rt.changeStylesDependingOnWidth(this,this.solarCardElements,this.clientWidth,this.oldWidth)}connectedCallback(){super.connectedCallback(),this.redraw=this.redraw.bind(this),window.addEventListener("resize",this.redraw)}shouldUpdate(t){let e;e=this,this.config.energy_flow_diagramm||requestAnimationFrame((t=>{e.updateAllCircles(t)})),e=this;let i=!0;return Array.from(t.keys()).some((e=>{const n=t.get(e);return"hass"===e&&n&&(i=i&&this.sensorChangeDetected(n)),!i})),i}sensorChangeDetected(t){let e=!1;return this.solarCardElements.forEach(((i,n)=>{void 0!==this.hass.states[this.config[n]]&&this.hass.states[this.config[n]].state!==t.states[this.config[n]].state&&(e=!0)})),e}async performUpdate(){this.error="",this.solarCardElements.forEach((t=>{try{t.setValueAndUnitOfMeasurement(this.hass.states[t.entity].state,this.hass.states[t.entity].attributes.unit_of_measurement),t.setSpeed(this.config.speed_factor)}catch(e){this.error+=" Configured '"+t.entity+"' entity was not found. "}})),this.config.energy_flow_diagramm&&this.setEnergyFlowDiagramm(),this.config.change_house_bubble_color_with_flow&&this.colourHouseBubbleDependingOnHighestInput(),super.performUpdate()}render(){var t;if(""!==this.error)return this._showError();const e=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector("ha-card");let i=300;e&&(i=e.clientWidth);const n=this.bubblePercentage/100*i,s=500,r=s/3,o=250;let l=0;return l=void 0!==this.config.show_gap&&this.config.show_gap?s/30:0,this.config.entity_radius&&this.style.setProperty("--entity-radius",this.config.entity_radius),this.config.line_width&&this.style.setProperty("--line-width",this.config.line_width),this.config.card_padding&&this.style.setProperty("--card-padding",this.config.card_padding),this.config.dot_factor&&this.style.setProperty("--dot-factor",this.config.dot_factor),this.style.setProperty("--bubble-size",`${n}px`),O`
      <ha-card .header=${this.config.name} tabindex="0">
        <div id="tesla-style-solar-power-card">
          ${this.writeGenerationIconBubble()}
          <div class="acc_center">
            <div class="acc_center_container">
              ${this.writeGridIconBubble()}
              <div
                class="acc_line power_lines"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="${"0 0 500 500"}"
                  preserveAspectRatio="xMidYMid meet"
                >
                  ${this.htmlWriter.writeCircleAndLine("generation_to_house_entity","M"+(o+l)+",0C"+(o+l)+","+(o-l)+" "+(o+l)+","+(o-l)+" "+"500,"+(o-l))}
                  ${this.htmlWriter.writeCircleAndLine("grid_to_house_entity","M0,250 C250,250 250,250 500,250")}
                  ${this.htmlWriter.writeCircleAndLine("generation_to_grid_entity","M"+(o-l)+",0 C"+(o-l)+","+(o-l)+" "+(o-l)+","+(o-l)+" 0,"+(o-l))}
                  ${this.htmlWriter.writeCircleAndLine("grid_to_battery_entity","M0,"+(o+l)+" C"+(o-l)+","+(o+l)+" "+(o-l)+","+(o+l)+" "+(o-l)+","+s)}
                  ${this.htmlWriter.writeCircleAndLine("battery_to_grid_entity","M"+(o-l)+","+"500 C"+(o-l)+","+(o+l)+" "+(o-l)+","+(o+l)+" 0,"+(o+l))}
                  ${this.htmlWriter.writeCircleAndLine("generation_to_battery_entity","M250,4 C250,0 250,496 250,496")}
                  ${this.htmlWriter.writeCircleAndLine("battery_to_house_entity","M"+(o+l)+","+"500 C"+(o+l)+","+(o+l)+" "+(o+l)+","+(o+l)+" "+"500,"+(o+l))}
                </svg>
              </div>

              ${this.writeHouseIconBubble()} ${this.writeApplianceIconBubble(1)}
              ${this.htmlWriter.writeAppliancePowerLineAndCircle(1,"M"+r/2+","+r+" C"+r/2+","+r+" "+r/2+",0 "+r/2+",0",r)}
              ${this.writeApplianceIconBubble(2)}
              ${this.htmlWriter.writeAppliancePowerLineAndCircle(2,"M"+r/2+",0 C"+r/2+",0 "+r/2+","+r+" "+r/2+","+r,r)}
            </div>
          </div>
          <div class="acc_bottom">${this.writeBatteryIconBubble()}</div>
        </div>
      </ha-card>
    `}writeGenerationIconBubble(){const t=this.calculateIconBubbleData(["generation_to_grid_entity","generation_to_house_entity","generation_to_battery_entity"],"generation_entity","generation_extra_entity");return t.cssSelector="acc_top",t.icon=this.config.generation_icon,this.htmlWriter.writeBatteryBubbleDiv(t)}writeGridIconBubble(){const t=this.calculateIconBubbleData(["-generation_to_grid_entity","grid_to_house_entity","-battery_to_grid_entity","grid_to_battery_entity"],"grid_entity","grid_extra_entity");return t.cssSelector="acc_left",t.icon=this.config.grid_icon,this.htmlWriter.writeBatteryBubbleDiv(t)}writeHouseIconBubble(){let t;t=this.config.house_without_appliances_values?["generation_to_house_entity","grid_to_house_entity","battery_to_house_entity","-appliance1_consumption_entity","-appliance2_consumption_entity"]:["generation_to_house_entity","grid_to_house_entity","battery_to_house_entity"];const e=this.calculateIconBubbleData(t,"house_entity","house_extra_entity");return e.cssSelector="acc_right",e.icon=this.config.house_icon,this.htmlWriter.writeBatteryBubbleDiv(e)}writeBatteryIconBubble(){const t=this.calculateIconBubbleData(["generation_to_battery_entity","grid_to_battery_entity","-battery_to_house_entity","-battery_to_grid_entity"],"battery_entity","battery_extra_entity");return t.cssSelector="acc_bottom",t.icon=this.config.battery_icon,this.htmlWriter.writeBatteryBubbleDiv(t)}writeApplianceIconBubble(t){const e=["appliance"+t+"_consumption_entity"],i=this.calculateIconBubbleData(e,"appliance"+t+"_consumption_entity","appliance"+t+"_extra_entity");return i.cssSelector="acc_appliance"+t,i.icon=this.config["appliance"+t+"_icon"],this.htmlWriter.writeBatteryBubbleDiv(i)}calculateIconBubbleData(t,e=null,i=null){let n=!1;const s=new nt;if(s.clickEntitySlot=e,t.forEach((t=>{"-"===t.substring(0,1)&&(t=t.substring(1),n=!0);const e=this.solarCardElements.get(t);null!==e&&void 0!==(null==e?void 0:e.value)&&(s.noEntitiesWithValueFound=!1,s.mainValue=n?s.mainValue-(null==e?void 0:e.value):s.mainValue+(null==e?void 0:e.value),s.mainValue=(100*s.mainValue|0)/100,s.mainUnitOfMeasurement=null==e?void 0:e.unitOfMeasurement),n=!1})),null!==i){const t=this.solarCardElements.get(i);s.extraValue=null==t?void 0:t.value,s.extraUnitOfMeasurement=null==t?void 0:t.unitOfMeasurement}return null!==e&&(s.clickEntityHassState=this.hass.states[this.config[e]]),this.showKW(s.mainValue)&&(s.mainValue=this.roundValue(s.mainValue/1e3),s.mainUnitOfMeasurement="kW"),s}showKW(t){return!this.config.show_w_not_kw&&!(void 0!==this.config.threshold_in_k&&Math.abs(t)<1e3*this.config.threshold_in_k)}roundValue(t){let e;return e=t>.1?(0|Math.round(10*(t+Number.EPSILON)))/10:(0|Math.round(100*(t+Number.EPSILON)))/100,e}animateCircles(t){requestAnimationFrame((e=>{t.updateAllCircles(e)}))}updateAllCircles(t){this.solarCardElements.forEach(((e,i)=>{const n=this.solarCardElements.get(i);void 0!==n&&this.updateOneCircle(t,n)}))}updateOneCircle(t,e){var i;const n=null===(i=this.shadowRoot)||void 0===i?void 0:i.querySelector("#tesla-style-solar-power-card");if(null==n)return;if(e.line=n.querySelector("#"+e.entitySlot+"_line"),null===e.line)return;const s=e.line.getTotalLength();if(isNaN(s))return;if(e.circle=n.querySelector("#"+e.entitySlot+"_circle"),0===e.speed)return e.circle.setAttribute("visibility","hidden"),void(this.config.hide_inactive_lines&&e.line.setAttribute("visibility","hidden"));this.config.hide_inactive_lines&&e.line.setAttribute("visibility","visible"),0===e.prevTimestamp&&(e.prevTimestamp=t,e.currentDelta=0),e.currentDelta+=Math.abs(e.speed)*(t-e.prevTimestamp);let r=e.currentDelta/s;e.speed>0?(r>=1||isNaN(r))&&(e.currentDelta=0,r=.01):(r=1-r,(r<=0||isNaN(r))&&(e.currentDelta=0,r=1));const o=e.line.getPointAtLength(s*r);e.circle.setAttributeNS(null,"x1",o.x.toString()),e.circle.setAttributeNS(null,"y1",o.y.toString()),e.circle.setAttributeNS(null,"x2",o.x.toString()),e.circle.setAttributeNS(null,"y2",o.y.toString()),e.prevTimestamp=t}colourHouseBubbleDependingOnHighestInput(){var t;const e=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector("#tesla-style-solar-power-card");if(null==e)return;let i=null,n="";switch(["generation_to_house_entity","grid_to_house_entity","battery_to_house_entity"].forEach((t=>{const e=this.solarCardElements.get(t);null!==e&&void 0!==(null==e?void 0:e.value)&&(null==i||(null==e?void 0:e.value)>i.value)&&(n=t,i=e)})),n){case"generation_to_house_entity":this.colourBubble(".house_entity",e,"warning"),this.colourBubble(".appliance1_consumption_entity",e,"warning"),this.colourBubble(".appliance2_consumption_entity",e,"warning"),this.colourLineAndCircle("#appliance1_consumption_entity",e,"warning"),this.colourLineAndCircle("#appliance2_consumption_entity",e,"warning");break;case"battery_to_house_entity":this.colourBubble(".house_entity",e,"success"),this.colourBubble(".appliance1_consumption_entity",e,"success"),this.colourBubble(".appliance2_consumption_entity",e,"success"),this.colourLineAndCircle("#appliance1_consumption_entity",e,"success"),this.colourLineAndCircle("#appliance2_consumption_entity",e,"success");break;case"grid_to_house_entity":this.colourBubble(".house_entity",e,"info"),this.colourBubble(".appliance1_consumption_entity",e,"info"),this.colourBubble(".appliance2_consumption_entity",e,"info"),this.colourLineAndCircle("#appliance1_consumption_entity",e,"info"),this.colourLineAndCircle("#appliance2_consumption_entity",e,"info")}}colourBubble(t,e,i){const n=e.querySelector(t);null!==n&&(n.style.color="var(--"+i+"-color)",n.style.border="1px solid var(--"+i+"-color)")}colourLineAndCircle(t,e,i){const n=e.querySelector(t+"_line"),s=e.querySelector(t+"_circle");null!==n&&(n.style.stroke="var(--"+i+"-color)",s.style.fill="var(--"+i+"-color)")}setEnergyFlowDiagramm(){if(null==this.shadowRoot)return;const t=this.shadowRoot.querySelector("#tesla-style-solar-power-card");null!=t&&this.solarCardElements.forEach(((e,i)=>{const n=this.solarCardElements.get(i);let s=1;if(null==t)return;const r=t.querySelector("#"+i+"_line");if(null!=r&&void 0!==n){t.querySelector("#"+i+"_circle").style.visibility="hidden",void 0===this.config.energy_flow_diagramm_lines_factor&&(this.config.energy_flow_diagramm_lines_factor=2),s="W"===(null==n?void 0:n.unitOfMeasurement.toUpperCase())?Math.floor((null==n?void 0:n.value)/100)/10*this.config.energy_flow_diagramm_lines_factor:Math.floor(10*(null==n?void 0:n.value))/10*this.config.energy_flow_diagramm_lines_factor,s<=.1&&0!==s&&(s=.1),r.style.strokeWidth=s+"px"}}))}redraw(t){this.hass&&this.config&&"resize"===t.type&&(this.oldWidth=rt.changeStylesDependingOnWidth(this,this.solarCardElements,this.clientWidth,this.oldWidth))}_showWarning(t){return O` <hui-warning>${t}</hui-warning> `}_showError(){return console.log(this.error),O`
      <hui-warning
        ><div>
          ERROR:<br />
          ${this.error}
        </div></hui-warning
      >
    `}static get styles(){return r`
    #tesla-style-solar-power-card{
      margin: auto;
      padding: 0;
      position: relative;
	  width: 100%;
	  box-sizing: border-box;
    }
	.type-custom-tesla-style-solar-power-card{
		padding: var(--card-padding, 16px);
	}
    .acc_container {
		width: var(--bubble-size);
		height: var(--bubble-size);
        color: var(--primary-text-color);
        border-color: var(--primary-text-color);
		border-radius: var(--entity-radius, 50%);
		border-width: var(--line-width, 1px);
		border-style: solid;
		position:relative;
        cursor:pointer;
		background-color: var(--ha-card-background, var(--card-background-color, white));
		z-index: 5;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: center;
		align-items: normal;
		align-content: normal;
	}
	.acc_container>div{
		display: block;
	}
    .acc_icon {
        margin-left: auto;
        margin-right: auto;
    }
    .acc_text,
    .acc_text_extra {
        text-align: center;
        white-space: nowrap;
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
    .acc_right,
    .acc_left{
		z-index:5;
    }
	.acc_center_container {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: normal;
		align-items: normal;
		align-content: normal;
		width: 100%;
	  }

	  .acc_left {
		display: block;
		flex-grow: 0;
		flex-shrink: 1;
		flex-basis: auto;
		align-self: center;
		order: 0;
	  }

	  .power_lines {
		display: block;
		flex-grow: 1;
		flex-shrink: 0;
		flex-basis: auto;
		align-self: auto;
		order: 0;
		z-index: 3;
		line-height: 0;
		margin: -5px;
      }

	  .acc_right {
		display: block;
		flex-grow: 0;
		flex-shrink: 1;
		flex-basis: auto;
		align-self: center;
		order: 0;
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
      stroke-width:var(--line-width);
	  vector-effect: non-scaling-stroke;
    }

    .generation_entity {
	  border-style: solid;
	  border-color: var(--warning-color);
    }
    .generation_entity .acc_icon,
    .generation_entity{
      color: var(--warning-color);
    }
	.house_entity,
    .appliance1_consumption_entity,
    .appliance1_consumption_entity,
    .appliance2_consumption_entity {
	  border-style: solid;
	  border-color: var(--info-color);
    }
    .house_entity,
    .appliance1_consumption_entity,
    .appliance2_consumption_entity{
      color: var(--info-color);
    }
    #generation_to_house_entity_line,
    #generation_to_grid_entity_line,
    #generation_to_battery_entity_line{
      stroke:var(--warning-color);
    }
    #grid_to_battery_entity_circle,
    #grid_to_house_entity_circle,
	#appliance1_consumption_entity_circle,
    #appliance2_consumption_entity_circle{
		stroke: var(--info-color);
		stroke-linecap: round;
		stroke-width: calc(var(--line-width) * var(--dot-factor, 8));
		vector-effect: non-scaling-stroke;
		z-index: 4;
	}

    #generation_to_house_entity_circle,
    #generation_to_grid_entity_circle,
    #generation_to_battery_entity_circle{
	  stroke: var(--warning-color);
	  stroke-linecap: round;
	  stroke-width: calc(var(--line-width) * var(--dot-factor, 8));
	  vector-effect: non-scaling-stroke;
	  z-index: 4;
	}
    #battery_to_house_entity_line,
    #battery_to_grid_entity_line{
      stroke:var(--success-color);
    }
    #battery_to_house_entity_circle,
    #battery_to_grid_entity_circle{
	  stroke: var(--success-color);
	  stroke-linecap: round;
	  stroke-width: calc(var(--line-width) * var(--dot-factor, 8));
	  vector-effect: non-scaling-stroke;
	  z-index: 4;
    }
    .battery_extra_entity,
    .battery_entity{
	  border-style: solid;
	  border-color: var(--success-color);
    }
    .battery_extra_text{
      position:absolute;
      top:8px;
    }
    br.clear {
      clear:both;
    }
	.acc_center .acc_appliance1_line,
	.acc_center .acc_appliance2_line {
		position: absolute;
		right: 0;
		padding: inherit;
		line-height: 1;
		width: var(--bubble-size);
		height: var(--bubble-size);
	}

	.acc_center .acc_appliance1_line{
		top: var(--bubble-size);
	}
	.acc_center .acc_appliance2_line{
		bottom: var(--bubble-size);
	}
    .acc_center .acc_td.acc_appliance1,
    .acc_center .acc_td.acc_appliance2 {
      position: absolute;
	  right: 0;
	}
    .acc_center .acc_td.acc_appliance1 {
      top: 0;
	}
    .acc_center .acc_td.acc_appliance2 {
      bottom: 0;
	}
    `}}t([tt({attribute:!1})],ot.prototype,"hass",void 0),t([tt()],ot.prototype,"config",void 0),t([tt({attribute:!1})],ot.prototype,"solarCardElements",void 0),t([tt()],ot.prototype,"oldWidth",void 0),t([tt({type:String})],ot.prototype,"title",void 0),t([tt({type:Number})],ot.prototype,"counter",void 0),window.customElements.define("tesla-style-solar-power-card",ot)}();
