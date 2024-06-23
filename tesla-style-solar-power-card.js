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
    ***************************************************************************** */function t(t,e,i,n){var s,o=arguments.length,r=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,n);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(r=(o<3?s(r):o>3?s(e,i,r):s(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r
/**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */}const e=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=new Map;class s{constructor(t,e){if(this._$cssResult$=!0,e!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let t=n.get(this.cssText);return e&&void 0===t&&(n.set(this.cssText,t=new CSSStyleSheet),t.replaceSync(this.cssText)),t}toString(){return this.cssText}}const o=(t,...e)=>{const n=1===t.length?t[0]:e.reduce(((e,i,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1]),t[0]);return new s(n,i)},r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new s("string"==typeof t?t:t+"",i))(e)})(t):t
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */;var l;const a=window.trustedTypes,c=a?a.emptyScript:"",h=window.reactiveElementPolyfillSupport,u={toAttribute(t,e){switch(e){case Boolean:t=t?c:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},d=(t,e)=>e!==t&&(e==e||t==t),p={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:d};class _ extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;null!==(e=this.l)&&void 0!==e||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const n=this._$Eh(i,e);void 0!==n&&(this._$Eu.set(n,i),t.push(n))})),t}static createProperty(t,e=p){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,n=this.getPropertyDescriptor(t,i,e);void 0!==n&&Object.defineProperty(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(n){const s=this[t];this[e]=n,this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||p}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eh(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ep=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Em(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$Eg)&&void 0!==e?e:this._$Eg=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$Eg)||void 0===e||e.splice(this._$Eg.indexOf(t)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const i=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{e?t.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):i.forEach((e=>{const i=document.createElement("style"),n=window.litNonce;void 0!==n&&i.setAttribute("nonce",n),i.textContent=e.cssText,t.appendChild(i)}))})(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ES(t,e,i=p){var n,s;const o=this.constructor._$Eh(t,i);if(void 0!==o&&!0===i.reflect){const r=(null!==(s=null===(n=i.converter)||void 0===n?void 0:n.toAttribute)&&void 0!==s?s:u.toAttribute)(e,i.type);this._$Ei=t,null==r?this.removeAttribute(o):this.setAttribute(o,r),this._$Ei=null}}_$AK(t,e){var i,n,s;const o=this.constructor,r=o._$Eu.get(t);if(void 0!==r&&this._$Ei!==r){const t=o.getPropertyOptions(r),l=t.converter,a=null!==(s=null!==(n=null===(i=l)||void 0===i?void 0:i.fromAttribute)&&void 0!==n?n:"function"==typeof l?l:null)&&void 0!==s?s:u.fromAttribute;this._$Ei=r,this[r]=a(e,t.type),this._$Ei=null}}requestUpdate(t,e,i){let n=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||d)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Ei!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):n=!1),!this.isUpdatePending&&n&&(this._$Ep=this._$E_())}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,e)=>this[e]=t)),this._$Et=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$EU()}catch(t){throw e=!1,this._$EU(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$Eg)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$ES(e,this[e],t))),this._$EC=void 0),this._$EU()}updated(t){}firstUpdated(t){}}
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var y;_.finalized=!0,_.elementProperties=new Map,_.elementStyles=[],_.shadowRootOptions={mode:"open"},null==h||h({ReactiveElement:_}),(null!==(l=globalThis.reactiveElementVersions)&&void 0!==l?l:globalThis.reactiveElementVersions=[]).push("1.3.1");const g=globalThis.trustedTypes,v=g?g.createPolicy("lit-html",{createHTML:t=>t}):void 0,m=`lit$${(Math.random()+"").slice(9)}$`,f="?"+m,b=`<${f}>`,$=document,w=(t="")=>$.createComment(t),x=t=>null===t||"object"!=typeof t&&"function"!=typeof t,A=Array.isArray,C=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,E=/-->/g,S=/>/g,R=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,B=/'/g,M=/"/g,k=/^(?:script|style|textarea|title)$/i,O=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),P=Symbol.for("lit-noChange"),U=Symbol.for("lit-nothing"),T=new WeakMap,H=$.createTreeWalker($,129,null,!1),N=(t,e)=>{const i=t.length-1,n=[];let s,o=2===e?"<svg>":"",r=C;for(let e=0;e<i;e++){const i=t[e];let l,a,c=-1,h=0;for(;h<i.length&&(r.lastIndex=h,a=r.exec(i),null!==a);)h=r.lastIndex,r===C?"!--"===a[1]?r=E:void 0!==a[1]?r=S:void 0!==a[2]?(k.test(a[2])&&(s=RegExp("</"+a[2],"g")),r=R):void 0!==a[3]&&(r=R):r===R?">"===a[0]?(r=null!=s?s:C,c=-1):void 0===a[1]?c=-2:(c=r.lastIndex-a[2].length,l=a[1],r=void 0===a[3]?R:'"'===a[3]?M:B):r===M||r===B?r=R:r===E||r===S?r=C:(r=R,s=void 0);const u=r===R&&t[e+1].startsWith("/>")?" ":"";o+=r===C?i+b:c>=0?(n.push(l),i.slice(0,c)+"$lit$"+i.slice(c)+m+u):i+m+(-2===c?(n.push(void 0),e):u)}const l=o+(t[i]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==v?v.createHTML(l):l,n]};class D{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let s=0,o=0;const r=t.length-1,l=this.parts,[a,c]=N(t,e);if(this.el=D.createElement(a,i),H.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(n=H.nextNode())&&l.length<r;){if(1===n.nodeType){if(n.hasAttributes()){const t=[];for(const e of n.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(m)){const i=c[o++];if(t.push(e),void 0!==i){const t=n.getAttribute(i.toLowerCase()+"$lit$").split(m),e=/([.?@])?(.*)/.exec(i);l.push({type:1,index:s,name:e[2],strings:t,ctor:"."===e[1]?q:"?"===e[1]?j:"@"===e[1]?F:V})}else l.push({type:6,index:s})}for(const e of t)n.removeAttribute(e)}if(k.test(n.tagName)){const t=n.textContent.split(m),e=t.length-1;if(e>0){n.textContent=g?g.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],w()),H.nextNode(),l.push({type:2,index:++s});n.append(t[e],w())}}}else if(8===n.nodeType)if(n.data===f)l.push({type:2,index:s});else{let t=-1;for(;-1!==(t=n.data.indexOf(m,t+1));)l.push({type:7,index:s}),t+=m.length-1}s++}}static createElement(t,e){const i=$.createElement("template");return i.innerHTML=t,i}}function W(t,e,i=t,n){var s,o,r,l;if(e===P)return e;let a=void 0!==n?null===(s=i._$Cl)||void 0===s?void 0:s[n]:i._$Cu;const c=x(e)?void 0:e._$litDirective$;return(null==a?void 0:a.constructor)!==c&&(null===(o=null==a?void 0:a._$AO)||void 0===o||o.call(a,!1),void 0===c?a=void 0:(a=new c(t),a._$AT(t,i,n)),void 0!==n?(null!==(r=(l=i)._$Cl)&&void 0!==r?r:l._$Cl=[])[n]=a:i._$Cu=a),void 0!==a&&(e=W(t,a._$AS(t,e.values),a,n)),e}class L{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:i},parts:n}=this._$AD,s=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:$).importNode(i,!0);H.currentNode=s;let o=H.nextNode(),r=0,l=0,a=n[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new I(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new K(o,this,t)),this.v.push(e),a=n[++l]}r!==(null==a?void 0:a.index)&&(o=H.nextNode(),r++)}return s}m(t){let e=0;for(const i of this.v)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class I{constructor(t,e,i,n){var s;this.type=2,this._$AH=U,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cg=null===(s=null==n?void 0:n.isConnected)||void 0===s||s}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=W(this,t,e),x(t)?t===U||null==t||""===t?(this._$AH!==U&&this._$AR(),this._$AH=U):t!==this._$AH&&t!==P&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.k(t):(t=>{var e;return A(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])})(t)?this.S(t):this.$(t)}A(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}k(t){this._$AH!==t&&(this._$AR(),this._$AH=this.A(t))}$(t){this._$AH!==U&&x(this._$AH)?this._$AA.nextSibling.data=t:this.k($.createTextNode(t)),this._$AH=t}T(t){var e;const{values:i,_$litType$:n}=t,s="number"==typeof n?this._$AC(t):(void 0===n.el&&(n.el=D.createElement(n.h,this.options)),n);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===s)this._$AH.m(i);else{const t=new L(s,this),e=t.p(this.options);t.m(i),this.k(e),this._$AH=t}}_$AC(t){let e=T.get(t.strings);return void 0===e&&T.set(t.strings,e=new D(t)),e}S(t){A(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,n=0;for(const s of t)n===e.length?e.push(i=new I(this.A(w()),this.A(w()),this,this.options)):i=e[n],i._$AI(s),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cg=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class V{constructor(t,e,i,n,s){this.type=1,this._$AH=U,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=U}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,n){const s=this.strings;let o=!1;if(void 0===s)t=W(this,t,e,0),o=!x(t)||t!==this._$AH&&t!==P,o&&(this._$AH=t);else{const n=t;let r,l;for(t=s[0],r=0;r<s.length-1;r++)l=W(this,n[i+r],e,r),l===P&&(l=this._$AH[r]),o||(o=!x(l)||l!==this._$AH[r]),l===U?t=U:t!==U&&(t+=(null!=l?l:"")+s[r+1]),this._$AH[r]=l}o&&!n&&this.C(t)}C(t){t===U?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class q extends V{constructor(){super(...arguments),this.type=3}C(t){this.element[this.name]=t===U?void 0:t}}const z=g?g.emptyScript:"";class j extends V{constructor(){super(...arguments),this.type=4}C(t){t&&t!==U?this.element.setAttribute(this.name,z):this.element.removeAttribute(this.name)}}class F extends V{constructor(t,e,i,n,s){super(t,e,i,n,s),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=W(this,t,e,0))&&void 0!==i?i:U)===P)return;const n=this._$AH,s=t===U&&n!==U||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==U&&(n===U||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class K{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){W(this,t)}}const G=window.litHtmlPolyfillSupport;
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var Z,J;null==G||G(D,I),(null!==(y=globalThis.litHtmlVersions)&&void 0!==y?y:globalThis.litHtmlVersions=[]).push("2.2.1");class Y extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,e,i)=>{var n,s;const o=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:e;let r=o._$litPart$;if(void 0===r){const t=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:null;o._$litPart$=r=new I(e.insertBefore(w(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return P}}Y.finalized=!0,Y._$litElement$=!0,null===(Z=globalThis.litElementHydrateSupport)||void 0===Z||Z.call(globalThis,{LitElement:Y});const Q=globalThis.litElementPolyfillSupport;null==Q||Q({LitElement:Y}),(null!==(J=globalThis.litElementVersions)&&void 0!==J?J:globalThis.litElementVersions=[]).push("3.2.0");
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
     */}var et;null===(et=window.HTMLSlotElement)||void 0===et||et.prototype.assignedElements;class it{constructor(t,e){this.speed=0,this.startPosition=0,this.currentPosition=0,this.currentDelta=0,this.maxPosition=30,this.unitOfMeasurement="",this.accText="",this.accTextclassName="accText",this.entity="",this.color="stroke:var(--info-color)",this.circleColor="var(--primary-color)",this.prevTimestamp=0,this.accTextElement=null,this.entity=t,this.entitySlot=e,this.value=0}setValueAndUnitOfMeasurement(t,e){if(void 0===t)return void(this.value=0);if(void 0===e)return void(this.value=t);const i=parseFloat(t);switch(e){case"W":case"w":case"kW":this.value=i,"kW"===e&&(this.value*=1e3),this.unitOfMeasurement="W",this.value=Math.round(this.value);break;case"%":this.value=i,this.unitOfMeasurement=e;break;default:this.value=t,this.unitOfMeasurement=e}}setSpeed(t){if(this.speed=0,0===Math.abs(this.value))return;let e;e=void 0===t||t>1||t<=0?it.SPEEDFACTOR:t,this.speed=e*this.value/1e3}}it.SPEEDFACTOR=.04;class nt{constructor(){this.mainValue=0,this.clickEntitySlot=null,this.clickEntityHassState=null,this.noEntitiesWithValueFound=!0}}class st{constructor(t,e){this.teslaCard=t,this.solarCardElements=t.solarCardElements,this.pxRate=t.pxRate,this.hass=e}writeBubbleDiv(t){return t.noEntitiesWithValueFound?O``:O` <div class="acc_td ${t.cssSelector}">
      <div
        class="acc_container ${t.clickEntitySlot}"
        style="${"width:"+9*this.pxRate+"px; height: "+9*this.pxRate+"px; padding:"+5*this.pxRate+"px;"}"
        @click="${()=>this._handleClick(t.clickEntityHassState)}"
      >
        ${null!==t.extraValue?O` <div
              class="acc_text_extra"
              style="font-size:${3*this.pxRate+"px"};
                        top: ${1*this.pxRate+"px"};
                        width: ${10*this.pxRate+"px"};"
            >${t.extraValue} ${t.extraUnitOfMeasurement}
            </div>`:O``}
        <ha-icon class="acc_icon" icon="${t.icon}"></ha-icon>
        <div class="acc_text" style="font-size:${3*this.pxRate+"px"}; margin-top:${-.5*this.pxRate+"px"}; width: ${10*this.pxRate+"px"}">
          ${t.mainValue} ${t.mainUnitOfMeasurement}
        </div>
      </div>
    </div>`}writeBatteryBubbleDiv(t){return void 0!==t.extraValue&&("mdi:battery-medium"!==t.icon&&"mdi:battery"!==t.icon||(t.icon=this.getBatteryIcon(parseFloat(t.extraValue),t.mainValue))),this.writeBubbleDiv(t)}getBatteryIcon(t,e){let i=t;t<=5&&(i=0);const n=10*Math.ceil(i/10);let s="-"+n.toString(),o="-charging";return e<=0&&(o=""),100===n&&(s=""),n<=5&&(s="-outline"),"mdi:battery"+o+s}writeAppliancePowerLineAndCircle(t,e){if(null==this.solarCardElements.get("appliance"+t+"_consumption_entity"))return O``;let i;return i=1===t?"top:"+22.5*this.pxRate+"px;":"bottom:"+15*this.pxRate+"px;",O` <div
      class="acc_line acc_appliance${t}_line"
      style="
        height:${12*this.pxRate-5*(t-1)+"px"}
        width:10px};
        right:${9.5*this.pxRate+10+"px"};
        ${i}
        position:absolute"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox='${"0 0 "+(12*this.pxRate-5*(t-1))+" "+(12*this.pxRate-5*(t-1))}'
        preserveAspectRatio="xMinYMax slice"
        style="height:${12*this.pxRate-5*(t-1)+"px"};width:10px}"
        class="acc_appliance${t}_line_svg"
      >
        ${this.writeCircleAndLine("appliance"+t+"_consumption_entity",e)}
      </svg>
    </div>`}writeCircleAndLine(t,e){const i=this.solarCardElements.get(t);return null==i?O``:O`<svg>
      <circle r="4" cx="${i.startPosition.toString()}" cy="4" fill="${i.color}" id="${t+"_circle"}"></circle>
      <path d="${e}" id="${t+"_line"}"></path>
    </svg>`}_handleClick(t){if(null==t)return;const e=new Event("hass-more-info",{bubbles:!0,cancelable:!0,composed:!0});e.detail={entityId:t.entity_id},null!=this.teslaCard.shadowRoot&&this.teslaCard.shadowRoot.dispatchEvent(e)}}class ot{static changeStylesDependingOnWidth(t,e,i,n){if("complete"!==document.readyState||n===i)return n;if(null==t.shadowRoot)return n;const s=t.shadowRoot.querySelector("#tesla-style-solar-power-card");if(null==s)return n;i<200&&(i=250);const o=i/100,r=function(t,e,i){const n=s.querySelector(t);null!==n&&(n.style[e]=i)};r(".acc_left","top",12*o+"px"),r(".acc_right","top",12*o+"px"),s.querySelectorAll(".acc_container").forEach(((t,e,i)=>{const n=i[e];n.style.height=9*o+"px",n.style.width=9*o+"px",n.style.padding=5*o+"px"})),s.querySelectorAll("ha-icon").forEach(((t,e,i)=>{var n;const s=null===(n=i[e].shadowRoot)||void 0===n?void 0:n.querySelector("ha-svg-icon");null!=s&&(s.style.height=9*o+"px",s.style.width=9*o+"px")})),s.querySelectorAll(".acc_text").forEach((t=>{t.style["font-size"]=3*o+"px",t.style["margin-top"]=-.5*o+"px",t.style.width=10*o+"px"})),s.querySelectorAll(".acc_text_extra").forEach((t=>{t.style["font-size"]=3*o+"px",t.style.top=1*o+"px",t.style.width=10*o+"px"})),r(".power_lines","height",42*o+"px"),r(".power_lines","width",42*o+"px"),r(".power_lines","top",0*o+"px"),r(".power_lines","left",28*o+"px"),r(".power_lines svg","width",42*o+"px"),r(".power_lines svg","height",42*o+"px"),r(".power_lines svg","viewBox","0 0 "+42*o+" "+42*o);let l=s.querySelector(".power_lines svg");null!==l&&l.setAttribute("viewBox","0 0 "+42*o+" "+42*o);const a=22*o;r("#generation_to_house_entity_line","d","M"+(a-o)+",0 C"+(a-o)+","+a+" "+(a-o)+","+a+" "+2*a+","+a),r("#grid_feed_in_entity_line","d","M"+(a-o)+",0 C"+(a-o)+","+a+" "+(a-o)+","+a+" 0,"+a),r("#grid_to_house_entity_line","d","M0,"+a+" C"+a+","+a+" "+a+","+a+" "+2*a+","+a),r("#grid_to_battery_entity_line","d","M0,"+a+" C"+a+","+a+" "+a+","+a+" "+a+","+2*a),r("#battery_to_house_entity_line","d","M"+(a-o)+","+2*a+" C"+(a-o)+","+a+" "+(a-o)+","+a+" "+2*a+","+a),r("#generation_to_battery_entity_line","d","M"+(a-o)+",0 C"+(a-o)+",0 "+(a-o)+","+2*a+" "+(a-o)+","+2*a),[1,2].forEach((t=>{r(".acc_appliance"+t+"_line svg","viewBox","0 0 "+(12*o-5*(t-1))+" "+(12*o-5*(t-1))),r(".acc_appliance"+t+"_line","right",9.5*o+10+"px"),r(".acc_appliance"+t+"_line","width","10px"),r(".acc_appliance"+t+"_line","height",12*o-5*(t-1)+"px"),r(".acc_appliance"+t+"_line svg","width","10px"),r(".acc_appliance"+t+"_line svg","height",12*o-5*(t-1)+"px"),l=s.querySelector(".acc_appliance"+t+"_line_svg"),null!==l&&l.setAttribute("viewBox","0 0 "+(12*o-5*(t-1))+" "+(12*o-5*(t-1)));null===s.querySelector(".generation_entity")&&1===t&&null!==l&&r(".acc_center_container","margin-top",19*o+"px");null===s.querySelector(".battery_entity")&&2===t&&null!==l&&r(".acc_center_container","margin-bottom",19*o+"px")}));return null===s.querySelector(".grid_entity")&&(r(".generation_entity","margin","0px"),r(".battery_entity","margin","0px"),r(".power_lines","width",30*o+"px"),l=s.querySelector(".power_lines svg"),null!==l&&l.setAttribute("viewBox",12*o+" 0 "+42*o+" "+42*o)),r(".acc_appliance1","top","10px"),r(".acc_appliance1_line","top",19*o+12+"px"),r(".acc_appliance2","bottom","10px"),r(".acc_appliance2_line","bottom",19*o+12+"px"),i}}window.customCards=window.customCards||[],window.customCards.push({type:"tesla-style-solar-power-card",name:"Tesla Style Solar Power Card",description:"A Solar Power Visualization with svg paths that mimmicks the powerwall app of tesla 2"});class rt extends Y{constructor(){super(...arguments),this.solarCardElements=new Map,this.oldWidth=100,this.pxRate=4,this.htmlWriter=new st(this,this.hass),this.title="Hey there",this.counter=5,this.error=""}__increment(){this.counter+=1}setConfig(t){if(t.test_gui,this.config={...t},null==this.config.grid_icon&&(this.config.grid_icon="mdi:transmission-tower"),null==this.config.generation_icon&&(this.config.generation_icon="mdi:solar-panel-large"),null==this.config.house_icon&&(this.config.house_icon="mdi:home"),null==this.config.battery_icon&&(this.config.battery_icon="mdi:battery-medium"),null==this.config.appliance1_icon&&(this.config.appliance1_icon="mdi:car-sports"),null==this.config.appliance2_icon&&(this.config.appliance2_icon="mdi:air-filter"),null==this.config.speed_factor&&(this.config.speed_factor=.04),this.createSolarCardElements(),!this.config.energy_flow_diagramm){const t=this;setInterval(this.animateCircles,15,t)}}createSolarCardElements(){Object.keys(this.config).forEach((t=>{if(null!=this.config[t]&&t.indexOf("_entity")>5){const e=this.config[t].toString();this.solarCardElements.set(t,new it(e,t))}}))}getCardSize(){return 5}static getStubConfig(){return{}}async firstUpdated(){await new Promise((t=>setTimeout(t,0)));const t=this.getBoundingClientRect().width;this.oldWidth=ot.changeStylesDependingOnWidth(this,this.solarCardElements,t,this.oldWidth)}connectedCallback(){super.connectedCallback(),this.redraw=this.redraw.bind(this),window.addEventListener("resize",this.redraw)}shouldUpdate(t){let e;e=this,this.config.energy_flow_diagramm||requestAnimationFrame((t=>{e.updateAllCircles(t)})),e=this;let i=!0;return Array.from(t.keys()).some((e=>{const n=t.get(e);return"hass"===e&&n&&(i=i&&this.sensorChangeDetected(n)),!i})),i}sensorChangeDetected(t){let e=!1;return this.solarCardElements.forEach(((i,n)=>{void 0!==this.hass.states[this.config[n]]&&this.hass.states[this.config[n]].state!==t.states[this.config[n]].state&&(e=!0)})),e}async performUpdate(){this.error="",this.solarCardElements.forEach((t=>{try{t.setValueAndUnitOfMeasurement(this.hass.states[t.entity].state,this.hass.states[t.entity].attributes.unit_of_measurement),t.setSpeed(this.config.speed_factor)}catch(e){this.error+=" Configured '"+t.entity+"' entity was not found. "}})),this.config.energy_flow_diagramm&&this.setEnergyFlowDiagramm(),this.config.change_house_bubble_color_with_flow&&this.colourHouseBubbleDependingOnHighestInput(),super.performUpdate()}render(){if(""!==this.error)return this._showError();let t,e=this.getBoundingClientRect().width;e<200&&(e=250),this.pxRate=e/100,t=void 0!==this.config.show_gap&&this.config.show_gap?2*this.pxRate:0;const i=22*this.pxRate;return O`
      <ha-card .header=${this.config.name} tabindex="0">
        <div id="tesla-style-solar-power-card">
          ${this.writeGenerationIconBubble()}
          <div class="acc_center">
            <div class="acc_center_container">
              ${this.writeGridIconBubble()}
              <div
                class="acc_line power_lines"
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
                  ${this.htmlWriter.writeCircleAndLine("generation_to_house_entity","M"+(i-this.pxRate+t)+",0C"+(i-this.pxRate+t)+","+(i-t)+" "+(i-this.pxRate+t)+","+(i-t)+" "+2*i+","+(i-t))}
                  ${this.htmlWriter.writeCircleAndLine("grid_to_house_entity","M0,"+i+" C"+(i-this.pxRate)+","+i+" "+(i-this.pxRate)+","+i+" "+2*(i-this.pxRate)+","+i)}
                  ${this.htmlWriter.writeCircleAndLine("generation_to_grid_entity","M"+(i-this.pxRate-t)+",0 C"+(i-this.pxRate-t)+","+(i-t)+" "+(i-this.pxRate-t)+","+(i-t)+" 0,"+(i-t))}
                  ${this.htmlWriter.writeCircleAndLine("grid_to_battery_entity","M0,"+(i+t)+" C"+(i-this.pxRate-t)+","+(i+t)+" "+(i-this.pxRate-t)+","+(i+t)+" "+(i-this.pxRate-t)+","+2*i)}
                  ${this.htmlWriter.writeCircleAndLine("battery_to_grid_entity","M"+(i-this.pxRate-t)+","+2*i+" C"+(i-this.pxRate-t)+","+(i+t)+" "+(i-this.pxRate-t)+","+(i+t)+" 0,"+(i+t))}
                  ${this.htmlWriter.writeCircleAndLine("generation_to_battery_entity","M"+(i-this.pxRate)+",0 C"+(i-this.pxRate)+",0 "+(i-this.pxRate)+","+2*i+" "+(i-this.pxRate)+","+2*i)}
                  ${this.htmlWriter.writeCircleAndLine("battery_to_house_entity","M"+(i-this.pxRate+t)+","+2*i+" C"+(i-this.pxRate+t)+","+(i+t)+" "+(i-this.pxRate+t)+","+(i+t)+" "+2*i+","+(i+t))}
                </svg>
              </div>

              ${this.writeHouseIconBubble()} ${this.writeApplianceIconBubble(1)}
              ${this.htmlWriter.writeAppliancePowerLineAndCircle(1,"M5,"+12*this.pxRate+" C5,"+12*this.pxRate+" 5,0 5,0")}
              ${this.writeApplianceIconBubble(2)}
              ${this.htmlWriter.writeAppliancePowerLineAndCircle(2,"M5,0 C5,0 5,"+11*this.pxRate+" 5,"+11*this.pxRate)}
            </div>
          </div>
          <div class="acc_bottom">${this.writeBatteryIconBubble()}</div>
        </div>
      </ha-card>
    `}writeGenerationIconBubble(){const t=this.calculateIconBubbleData(["generation_to_grid_entity","generation_to_house_entity","generation_to_battery_entity"],"generation_entity","generation_extra_entity");return t.cssSelector="acc_top",t.icon=this.config.generation_icon,this.htmlWriter.writeBatteryBubbleDiv(t)}writeGridIconBubble(){const t=this.calculateIconBubbleData(["-generation_to_grid_entity","grid_to_house_entity","-battery_to_grid_entity","grid_to_battery_entity"],"grid_entity","grid_extra_entity");return t.cssSelector="acc_left",t.icon=this.config.grid_icon,this.htmlWriter.writeBatteryBubbleDiv(t)}writeHouseIconBubble(){let t;t=this.config.house_without_appliances_values?["generation_to_house_entity","grid_to_house_entity","battery_to_house_entity","-appliance1_consumption_entity","-appliance2_consumption_entity"]:["generation_to_house_entity","grid_to_house_entity","battery_to_house_entity"];const e=this.calculateIconBubbleData(t,"house_entity","house_extra_entity");return e.cssSelector="acc_right",e.icon=this.config.house_icon,this.htmlWriter.writeBatteryBubbleDiv(e)}writeBatteryIconBubble(){const t=this.calculateIconBubbleData(["generation_to_battery_entity","grid_to_battery_entity","-battery_to_house_entity","-battery_to_grid_entity"],"battery_entity","battery_extra_entity");return t.cssSelector="acc_bottom",t.icon=this.config.battery_icon,this.htmlWriter.writeBatteryBubbleDiv(t)}writeApplianceIconBubble(t){const e=["appliance"+t+"_consumption_entity"],i=this.calculateIconBubbleData(e,"appliance"+t+"_consumption_entity","appliance"+t+"_extra_entity");return i.cssSelector="acc_appliance"+t,i.icon=this.config["appliance"+t+"_icon"],this.htmlWriter.writeBatteryBubbleDiv(i)}calculateIconBubbleData(t,e=null,i=null){let n=!1;const s=new nt;if(s.clickEntitySlot=e,t.forEach((t=>{"-"===t.substring(0,1)&&(t=t.substring(1),n=!0);const e=this.solarCardElements.get(t);null!==e&&void 0!==(null==e?void 0:e.value)&&(s.noEntitiesWithValueFound=!1,s.mainValue=n?s.mainValue-(null==e?void 0:e.value):s.mainValue+(null==e?void 0:e.value),s.mainValue=(100*s.mainValue|0)/100,s.mainUnitOfMeasurement=null==e?void 0:e.unitOfMeasurement),n=!1})),null!==i){const t=this.solarCardElements.get(i);s.extraValue=null==t?void 0:t.value,s.extraUnitOfMeasurement=null==t?void 0:t.unitOfMeasurement}return null!==e&&(s.clickEntityHassState=this.hass.states[this.config[e]]),this.showKW(s.mainValue)&&(s.mainValue=this.roundValue(s.mainValue/1e3),s.mainUnitOfMeasurement="kW"),s}showKW(t){return!this.config.show_w_not_kw&&!(void 0!==this.config.threshold_in_k&&Math.abs(t)<1e3*this.config.threshold_in_k)}roundValue(t){let e;return e=t>.1?(0|Math.round(10*(t+Number.EPSILON)))/10:(0|Math.round(100*(t+Number.EPSILON)))/100,e}animateCircles(t){requestAnimationFrame((e=>{t.updateAllCircles(e)}))}updateAllCircles(t){this.solarCardElements.forEach(((e,i)=>{const n=this.solarCardElements.get(i);void 0!==n&&this.updateOneCircle(t,n)}))}updateOneCircle(t,e){if(null==this.shadowRoot)return;const i=this.shadowRoot.querySelector("#tesla-style-solar-power-card");if(null==i)return;if(e.line=i.querySelector("#"+e.entitySlot+"_line"),null===e.line)return;const n=e.line.getTotalLength();if(isNaN(n))return;if(e.circle=i.querySelector("#"+e.entitySlot+"_circle"),0===e.speed)return e.circle.setAttribute("visibility","hidden"),void(this.config.hide_inactive_lines&&e.line.setAttribute("visibility","hidden"));e.circle.setAttribute("visibility","visible"),this.config.hide_inactive_lines&&e.line.setAttribute("visibility","visible"),0===e.prevTimestamp&&(e.prevTimestamp=t,e.currentDelta=0),e.currentDelta+=Math.abs(e.speed)*(t-e.prevTimestamp);let s=e.currentDelta/n;e.speed>0?(s>=1||isNaN(s))&&(e.currentDelta=0,s=.01):(s=1-s,(s<=0||isNaN(s))&&(e.currentDelta=0,s=1));const o=e.line.getPointAtLength(n*s);e.circle.setAttributeNS(null,"cx",o.x.toString()),e.circle.setAttributeNS(null,"cy",o.y.toString()),e.prevTimestamp=t}colourHouseBubbleDependingOnHighestInput(){if(null==this.shadowRoot)return;const t=this.shadowRoot.querySelector("#tesla-style-solar-power-card");if(null==t)return;let e=null,i="";switch(["generation_to_house_entity","grid_to_house_entity","battery_to_house_entity"].forEach((t=>{const n=this.solarCardElements.get(t);null!==n&&void 0!==(null==n?void 0:n.value)&&(null==e||(null==n?void 0:n.value)>e.value)&&(i=t,e=n)})),i){case"generation_to_house_entity":this.colourBubble(".house_entity",t,"warning"),this.colourBubble(".appliance1_consumption_entity",t,"warning"),this.colourBubble(".appliance2_consumption_entity",t,"warning"),this.colourLineAndCircle("#appliance1_consumption_entity",t,"warning"),this.colourLineAndCircle("#appliance2_consumption_entity",t,"warning");break;case"battery_to_house_entity":this.colourBubble(".house_entity",t,"success"),this.colourBubble(".appliance1_consumption_entity",t,"success"),this.colourBubble(".appliance2_consumption_entity",t,"success"),this.colourLineAndCircle("#appliance1_consumption_entity",t,"success"),this.colourLineAndCircle("#appliance2_consumption_entity",t,"success");break;case"grid_to_house_entity":this.colourBubble(".house_entity",t,"info"),this.colourBubble(".appliance1_consumption_entity",t,"info"),this.colourBubble(".appliance2_consumption_entity",t,"info"),this.colourLineAndCircle("#appliance1_consumption_entity",t,"info"),this.colourLineAndCircle("#appliance2_consumption_entity",t,"info")}}colourBubble(t,e,i){const n=e.querySelector(t);null!==n&&(n.style.color="var(--"+i+"-color)",n.style.border="1px solid var(--"+i+"-color)")}colourLineAndCircle(t,e,i){const n=e.querySelector(t+"_line"),s=e.querySelector(t+"_circle");null!==n&&(n.style.stroke="var(--"+i+"-color)",s.style.fill="var(--"+i+"-color)")}setEnergyFlowDiagramm(){if(null==this.shadowRoot)return;const t=this.shadowRoot.querySelector("#tesla-style-solar-power-card");null!=t&&this.solarCardElements.forEach(((e,i)=>{const n=this.solarCardElements.get(i);let s=1;if(null==t)return;const o=t.querySelector("#"+i+"_line");if(null!=o&&void 0!==n){t.querySelector("#"+i+"_circle").style.visibility="hidden",void 0===this.config.energy_flow_diagramm_lines_factor&&(this.config.energy_flow_diagramm_lines_factor=2),s="W"===(null==n?void 0:n.unitOfMeasurement.toUpperCase())?Math.floor((null==n?void 0:n.value)/100)/10*this.config.energy_flow_diagramm_lines_factor:Math.floor(10*(null==n?void 0:n.value))/10*this.config.energy_flow_diagramm_lines_factor,s<=.1&&0!==s&&(s=.1),o.style.strokeWidth=s+"px"}}))}redraw(t){if(this.hass&&this.config&&"resize"===t.type){const t=this.getBoundingClientRect().width;this.oldWidth=ot.changeStylesDependingOnWidth(this,this.solarCardElements,t,this.oldWidth)}}_showWarning(t){return O` <hui-warning>${t}</hui-warning> `}_showError(){return console.log(this.error),O`
      <hui-warning
        ><div>
          ERROR:<br />
          ${this.error}
        </div></hui-warning
      >
    `}static get styles(){return o`
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
    }
    .acc_right {
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

    .generation_entity {
      border: 1px solid var(--warning-color);
    }
    .generation_entity .acc_icon,
    .generation_entity{
      color: var(--warning-color);
    }
    .house_entity{
      border: 1px solid var(--info-color);
    }
    .appliance1_consumption_entity,
    .appliance2_consumption_entity {
      border: 1px solid var(--info-color);
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
      fill:var(--info-color);
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
    .battery_extra_entity,
    .battery_entity{
      border: 1px solid var(--success-color);
      color: var(--success-color);
    }
    .battery_extra_text{
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
    `}}t([tt({attribute:!1})],rt.prototype,"hass",void 0),t([tt()],rt.prototype,"config",void 0),t([tt({attribute:!1})],rt.prototype,"solarCardElements",void 0),t([tt()],rt.prototype,"oldWidth",void 0),t([tt({type:String})],rt.prototype,"title",void 0),t([tt({type:Number})],rt.prototype,"counter",void 0),window.customElements.define("tesla-style-solar-power-card",rt)}();
