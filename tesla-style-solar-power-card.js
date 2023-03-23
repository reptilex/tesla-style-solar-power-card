!function(){"use strict";function t(t,e,i,n){var s,r=arguments.length,o=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,n);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(o=(r<3?s(o):r>3?s(e,i,o):s(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o
/**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */}const e=window,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),s=new WeakMap;class r{constructor(t,e,i){if(this._$cssResult$=!0,i!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(e,t))}return t}toString(){return this.cssText}}const o=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1]),t[0]);return new r(i,t,n)},l=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,n))(e)})(t):t
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */;var a;const c=window,h=c.trustedTypes,u=h?h.emptyScript:"",d=c.reactiveElementPolyfillSupport,_={toAttribute(t,e){switch(e){case Boolean:t=t?u:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},p=(t,e)=>e!==t&&(e==e||t==t),y={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:p};class g extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const n=this._$Ep(i,e);void 0!==n&&(this._$Ev.set(n,i),t.push(n))})),t}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,n=this.getPropertyDescriptor(t,i,e);void 0!==n&&Object.defineProperty(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(n){const s=this[t];this[e]=n,this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||y}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const n=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,n)=>{i?t.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((i=>{const n=document.createElement("style"),s=e.litNonce;void 0!==s&&n.setAttribute("nonce",s),n.textContent=i.cssText,t.appendChild(n)}))})(n,this.constructor.elementStyles),n}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=y){var n;const s=this.constructor._$Ep(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==(null===(n=i.converter)||void 0===n?void 0:n.toAttribute)?i.converter:_).toAttribute(e,i.type);this._$El=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$El=null}}_$AK(t,e){var i;const n=this.constructor,s=n._$Ev.get(t);if(void 0!==s&&this._$El!==s){const t=n.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:_;this._$El=s,this[s]=r.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let n=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||p)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):n=!1),!this.isUpdatePending&&n&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var v;g.finalized=!0,g.elementProperties=new Map,g.elementStyles=[],g.shadowRootOptions={mode:"open"},null==d||d({ReactiveElement:g}),(null!==(a=c.reactiveElementVersions)&&void 0!==a?a:c.reactiveElementVersions=[]).push("1.6.1");const m=window,f=m.trustedTypes,b=f?f.createPolicy("lit-html",{createHTML:t=>t}):void 0,$=`lit$${(Math.random()+"").slice(9)}$`,w="?"+$,A=`<${w}>`,x=document,C=(t="")=>x.createComment(t),S=t=>null===t||"object"!=typeof t&&"function"!=typeof t,E=Array.isArray,M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,B=/>/g,k=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),P=/'/g,U=/"/g,W=/^(?:script|style|textarea|title)$/i,R=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),N=Symbol.for("lit-noChange"),H=Symbol.for("lit-nothing"),T=new WeakMap,L=x.createTreeWalker(x,129,null,!1),D=(t,e)=>{const i=t.length-1,n=[];let s,r=2===e?"<svg>":"",o=M;for(let e=0;e<i;e++){const i=t[e];let l,a,c=-1,h=0;for(;h<i.length&&(o.lastIndex=h,a=o.exec(i),null!==a);)h=o.lastIndex,o===M?"!--"===a[1]?o=O:void 0!==a[1]?o=B:void 0!==a[2]?(W.test(a[2])&&(s=RegExp("</"+a[2],"g")),o=k):void 0!==a[3]&&(o=k):o===k?">"===a[0]?(o=null!=s?s:M,c=-1):void 0===a[1]?c=-2:(c=o.lastIndex-a[2].length,l=a[1],o=void 0===a[3]?k:'"'===a[3]?U:P):o===U||o===P?o=k:o===O||o===B?o=M:(o=k,s=void 0);const u=o===k&&t[e+1].startsWith("/>")?" ":"";r+=o===M?i+A:c>=0?(n.push(l),i.slice(0,c)+"$lit$"+i.slice(c)+$+u):i+$+(-2===c?(n.push(void 0),e):u)}const l=r+(t[i]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==b?b.createHTML(l):l,n]};class I{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let s=0,r=0;const o=t.length-1,l=this.parts,[a,c]=D(t,e);if(this.el=I.createElement(a,i),L.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(n=L.nextNode())&&l.length<o;){if(1===n.nodeType){if(n.hasAttributes()){const t=[];for(const e of n.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith($)){const i=c[r++];if(t.push(e),void 0!==i){const t=n.getAttribute(i.toLowerCase()+"$lit$").split($),e=/([.?@])?(.*)/.exec(i);l.push({type:1,index:s,name:e[2],strings:t,ctor:"."===e[1]?F:"?"===e[1]?G:"@"===e[1]?Z:j})}else l.push({type:6,index:s})}for(const e of t)n.removeAttribute(e)}if(W.test(n.tagName)){const t=n.textContent.split($),e=t.length-1;if(e>0){n.textContent=f?f.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],C()),L.nextNode(),l.push({type:2,index:++s});n.append(t[e],C())}}}else if(8===n.nodeType)if(n.data===w)l.push({type:2,index:s});else{let t=-1;for(;-1!==(t=n.data.indexOf($,t+1));)l.push({type:7,index:s}),t+=$.length-1}s++}}static createElement(t,e){const i=x.createElement("template");return i.innerHTML=t,i}}function V(t,e,i=t,n){var s,r,o,l;if(e===N)return e;let a=void 0!==n?null===(s=i._$Co)||void 0===s?void 0:s[n]:i._$Cl;const c=S(e)?void 0:e._$litDirective$;return(null==a?void 0:a.constructor)!==c&&(null===(r=null==a?void 0:a._$AO)||void 0===r||r.call(a,!1),void 0===c?a=void 0:(a=new c(t),a._$AT(t,i,n)),void 0!==n?(null!==(o=(l=i)._$Co)&&void 0!==o?o:l._$Co=[])[n]=a:i._$Cl=a),void 0!==a&&(e=V(t,a._$AS(t,e.values),a,n)),e}class q{constructor(t,e){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var e;const{el:{content:i},parts:n}=this._$AD,s=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:x).importNode(i,!0);L.currentNode=s;let r=L.nextNode(),o=0,l=0,a=n[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new z(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new J(r,this,t)),this.u.push(e),a=n[++l]}o!==(null==a?void 0:a.index)&&(r=L.nextNode(),o++)}return s}p(t){let e=0;for(const i of this.u)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class z{constructor(t,e,i,n){var s;this.type=2,this._$AH=H,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cm=null===(s=null==n?void 0:n.isConnected)||void 0===s||s}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cm}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=V(this,t,e),S(t)?t===H||null==t||""===t?(this._$AH!==H&&this._$AR(),this._$AH=H):t!==this._$AH&&t!==N&&this.g(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>E(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.k(t):this.g(t)}O(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}g(t){this._$AH!==H&&S(this._$AH)?this._$AA.nextSibling.data=t:this.T(x.createTextNode(t)),this._$AH=t}$(t){var e;const{values:i,_$litType$:n}=t,s="number"==typeof n?this._$AC(t):(void 0===n.el&&(n.el=I.createElement(n.h,this.options)),n);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===s)this._$AH.p(i);else{const t=new q(s,this),e=t.v(this.options);t.p(i),this.T(e),this._$AH=t}}_$AC(t){let e=T.get(t.strings);return void 0===e&&T.set(t.strings,e=new I(t)),e}k(t){E(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,n=0;for(const s of t)n===e.length?e.push(i=new z(this.O(C()),this.O(C()),this,this.options)):i=e[n],i._$AI(s),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cm=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class j{constructor(t,e,i,n,s){this.type=1,this._$AH=H,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=H}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,n){const s=this.strings;let r=!1;if(void 0===s)t=V(this,t,e,0),r=!S(t)||t!==this._$AH&&t!==N,r&&(this._$AH=t);else{const n=t;let o,l;for(t=s[0],o=0;o<s.length-1;o++)l=V(this,n[i+o],e,o),l===N&&(l=this._$AH[o]),r||(r=!S(l)||l!==this._$AH[o]),l===H?t=H:t!==H&&(t+=(null!=l?l:"")+s[o+1]),this._$AH[o]=l}r&&!n&&this.j(t)}j(t){t===H?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class F extends j{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===H?void 0:t}}const K=f?f.emptyScript:"";class G extends j{constructor(){super(...arguments),this.type=4}j(t){t&&t!==H?this.element.setAttribute(this.name,K):this.element.removeAttribute(this.name)}}class Z extends j{constructor(t,e,i,n,s){super(t,e,i,n,s),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=V(this,t,e,0))&&void 0!==i?i:H)===N)return;const n=this._$AH,s=t===H&&n!==H||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,r=t!==H&&(n===H||s);s&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class J{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){V(this,t)}}const Y=m.litHtmlPolyfillSupport;null==Y||Y(I,z),(null!==(v=m.litHtmlVersions)&&void 0!==v?v:m.litHtmlVersions=[]).push("2.6.1");
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var Q,X;class tt extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var n,s;const r=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:e;let o=r._$litPart$;if(void 0===o){const t=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:null;r._$litPart$=o=new z(e.insertBefore(C(),t),t,void 0,null!=i?i:{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return N}}tt.finalized=!0,tt._$litElement$=!0,null===(Q=globalThis.litElementHydrateSupport)||void 0===Q||Q.call(globalThis,{LitElement:tt});const et=globalThis.litElementPolyfillSupport;null==et||et({LitElement:tt}),(null!==(X=globalThis.litElementVersions)&&void 0!==X?X:globalThis.litElementVersions=[]).push("3.2.2");
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
const it=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function nt(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):it(t,e)
/**
     * @license
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */}var st;null===(st=window.HTMLSlotElement)||void 0===st||st.prototype.assignedElements;class rt{constructor(t,e){this.speed=0,this.startPosition=0,this.currentPosition=0,this.currentDelta=0,this.maxPosition=30,this.unitOfMeasurement="",this.accText="",this.accTextclassName="accText",this.entity="",this.color="stroke:var(--info-color)",this.circleColor="var(--primary-color)",this.prevTimestamp=0,this.accTextElement=null,this.entity=t,this.entitySlot=e,this.value=0}setValueAndUnitOfMeasurement(t,e){if(void 0===t)return void(this.value=0);if(void 0===e)return void(this.value=t);const i=parseFloat(t);switch(e.toLowerCase()){case"w":case"kw":this.value=i,"kW"===e&&(this.value*=1e3),this.unitOfMeasurement="W",this.value=Math.round(this.value);break;case"wh":case"kwh":this.value=i,"kWh"===e&&(this.value*=1e3),this.unitOfMeasurement="Wh",this.value=Math.round(this.value);break;case"%":this.value=i,this.unitOfMeasurement=e;break;default:this.value=t,this.unitOfMeasurement=e}}setSpeed(t){if(this.speed=0,0===Math.abs(this.value))return;let e;e=void 0===t||t>1||t<=0?rt.SPEEDFACTOR:t,this.speed=e*this.value/1e3}}rt.SPEEDFACTOR=.04;class ot{constructor(){this.mainValue=0,this.clickEntitySlot=null,this.clickEntityHassState=null,this.noEntitiesWithValueFound=!0}}class lt{constructor(t,e){this.teslaCard=t,this.solarCardElements=t.solarCardElements,this.hass=e}writeBubbleDiv(t,e,i=""){if(t.noEntitiesWithValueFound)return R``;i.length>0&&(i.startsWith(";")||(i="; "+i));const n=this.getSpaceBeforeUnit(t.extraUnitOfMeasurement),s=this.getSpaceBeforeUnit(t.mainUnitOfMeasurement);return R` <div class="acc_td ${t.cssSelector}" styles="${i}">
      <div
        class="acc_container ${t.clickEntitySlot}"
        style="${"width:"+21*e+"px; height: "+21*e+"px; padding:"+0*e+"px"}"
        @click="${()=>this._handleClick(t.clickEntityHassState)}"
      >
        ${null!==t.extraValue?R` <div
              class="acc_text_extra"
              style="font-size:${3*e+"px"};
                     margin-top: ${3*e+"px"};
                     margin-bottom: ${-.3*e+"px"}; "
            >${t.extraValue}${n}${t.extraUnitOfMeasurement}
            </div>`:R``}
        <ha-icon class="acc_icon" icon="${t.icon}"></ha-icon>
        <div class="acc_text" style="font-size:${3*e+"px"}; margin-top:${-.3*e+"px"}; margin-bottom:${3*e+"px"};">
          ${t.mainValue}${s}${t.mainUnitOfMeasurement}
        </div>
      </div>
    </div>`}getSpaceBeforeUnit(t){return this.teslaCard.config.show_space_before_all_units?" ":this.teslaCard.config.show_space_before_power_units?(null==t?void 0:t.toLocaleLowerCase().startsWith("kw"))||(null==t?void 0:t.toLocaleLowerCase().startsWith("w"))?" ":void 0:""}writeBatteryBubbleDiv(t,e,i=""){return void 0!==t.extraValue&&("mdi:battery-medium"!==t.icon&&"mdi:battery"!==t.icon||(t.icon=this.getBatteryIcon(parseFloat(t.extraValue),t.mainValue,e))),this.writeBubbleDiv(t,e,i)}getBatteryIcon(t,e,i){let n=t;t<=5&&(n=0);const s=10*Math.ceil(n/10);let r="-"+s.toString(),o="-charging";return e<=0&&(o=""),100===s&&(r=""),s<=5&&(r="-outline"),"mdi:battery"+o+r}writeAppliancePowerLineAndCircle(t,e,i,n,s){if(null==this.solarCardElements.get("appliance"+t+"_consumption_entity"))return R``;let r;return r=1===t?"top:"+23.45*s+"px;":"bottom:"+22.62*s+"px;",R` <div
      class="acc_line acc_appliance${t}_line"
      style="
        right:${11.46*s+"px"};
        ${r}
        position:absolute"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox='${"0 0 "+(i-(t-1)*n)+" "+(i-(t-1)*n)}'
        preserveAspectRatio="xMinYMax slice"
        style="height:${i-(t-1)*n+"px"};width:${2.5*s+"px"}"
        class="acc_appliance${t}_line_svg"
      >
        ${this.writeCircleAndLine("appliance"+t+"_consumption_entity",e)}
      </svg>
    </div>`}writeCircleAndLine(t,e){const i=this.solarCardElements.get(t);return null==i?R``:R`<svg>
      <circle r="4" cx="${i.startPosition.toString()}" cy="4" fill="${i.color}" id="${t+"_circle"}"></circle>
      <path d="${e}" id="${t+"_line"}"></path>
    </svg>`}_handleClick(t){if(null==t)return;const e=new Event("hass-more-info",{bubbles:!0,cancelable:!0,composed:!0});e.detail={entityId:t.entity_id},null!=this.teslaCard.shadowRoot&&this.teslaCard.shadowRoot.dispatchEvent(e)}}class at{static getNewWidth(t){return t<200&&(t=250),t}static getPxRate(t){return t/100}static changeStylesDependingOnWidth(t,e,i,n){if("complete"!==document.readyState||n===i)return n;if(null==t.shadowRoot)return n;const s=t.shadowRoot.querySelector("#tesla-style-solar-power-card");if(null==s)return n;i=at.getNewWidth(i);const r=at.getPxRate(i),o=function(t,e,i){const n=s.querySelector(t);null!==n&&(n.style[e]=i)};s.style.padding=2*r+"px",o(".acc_left","top",11*r+"px"),o(".acc_right","top",11*r+"px"),s.querySelectorAll(".acc_container").forEach(((t,e,i)=>{const n=i[e];n.style.height=21*r+"px",n.style.width=21*r+"px",n.style.padding=0*r+"px"})),s.querySelectorAll("ha-icon").forEach(((t,e,i)=>{var n;const s=null===(n=i[e].shadowRoot)||void 0===n?void 0:n.querySelector("ha-svg-icon");null!=s&&(s.style.height=7*r+"px",s.style.width=7*r+"px")})),s.querySelectorAll(".acc_text_extra").forEach((t=>{t.style["font-size"]=3*r+"px",t.style["margin-top"]=3*r+"px",t.style["margin-bottom"]=-.3*r+"px"})),s.querySelectorAll(".acc_text").forEach((t=>{t.style["font-size"]=3*r+"px",t.style["margin-top"]=-.3*r+"px",t.style["margin-bottom"]=3*r+"px"})),s.querySelectorAll(".acc_text_extra").forEach((t=>{t.style["font-size"]=3*r+"px",t.style.top=1*r+"px"})),o(".power_lines","height",42*r+"px"),o(".power_lines","width",42*r+"px"),o(".power_lines","top",0*r+"px"),o(".power_lines","left",28*r+"px"),o(".power_lines","margin-left",-1.15*r+"px"),o(".power_lines","margin-left",-1.15*r+"px"),o(".power_lines svg","width",42*r+"px"),o(".power_lines svg","height",42*r+"px"),o(".power_lines svg","viewBox","0 0 "+42*r+" "+42*r);let l=s.querySelector(".power_lines svg");null!==l&&l.setAttribute("viewBox","0 0 "+42*r+" "+42*r);const a=22*r;o("#generation_to_house_entity_line","d","M"+(a-r)+",0 C"+(a-r)+","+a+" "+(a-r)+","+a+" "+2*a+","+a),o("#grid_feed_in_entity_line","d","M"+(a-r)+",0 C"+(a-r)+","+a+" "+(a-r)+","+a+" 0,"+a),o("#grid_to_house_entity_line","d","M0,"+a+" C"+a+","+a+" "+a+","+a+" "+2*a+","+a),o("#grid_to_battery_entity_line","d","M0,"+a+" C"+a+","+a+" "+a+","+a+" "+a+","+2*a),o("#battery_to_house_entity_line","d","M"+(a-r)+","+2*a+" C"+(a-r)+","+a+" "+(a-r)+","+a+" "+2*a+","+a),o("#generation_to_battery_entity_line","d","M"+(a-r)+",0 C"+(a-r)+",0 "+(a-r)+","+2*a+" "+(a-r)+","+2*a);const c=11.38*r,h=2.2*r;[1,2].forEach((t=>{o(".acc_appliance"+t+"_line","right",11.46*r+"px"),o(".acc_appliance"+t+"_line svg","width",2.5*r+"px"),o(".acc_appliance"+t+"_line svg","height",c-(t-1)*h+"px"),l=s.querySelector(".acc_appliance"+t+"_line_svg"),null!==l&&l.setAttribute("viewBox","0 0 "+(c-(t-1)*h)+" "+(c-(t-1)*h));const e=s.querySelector(".generation_entity");o(".acc_center_container","margin-top",null===e&&1===t&&null!==l?19*r+"px":-.3*r+"px");const i=s.querySelector(".battery_entity");o(".acc_center_container","margin-bottom",null===i&&2===t&&null!==l?19*r+"px":-1.55*r+"px")}));return null===s.querySelector(".grid_entity")&&(o(".generation_entity","margin","0px"),o(".battery_entity","margin","0px"),o(".power_lines","width",30*r+"px"),l=s.querySelector(".power_lines svg"),null!==l&&l.setAttribute("viewBox",12*r+" 0 "+42*r+" "+42*r)),o(".acc_appliance1","top",2*r+"px"),o(".acc_appliance1","right",2*r+"px"),o(".acc_appliance1_line","top",23.45*r+"px"),o(".acc_appliance2","bottom",2*r+"px"),o(".acc_appliance2","right",2*r+"px"),o(".acc_appliance2_line","bottom",22.62*r+"px"),o("#appliance1_consumption_entity_line","d","M5,"+c+" C5,"+c+" 5,0 5,0"),o("#appliance2_consumption_entity_line","d","M5,0 C5,0 5,"+(c-h)+" 5,"+(c-h)),i}}window.customCards=window.customCards||[],window.customCards.push({type:"tesla-style-solar-power-card",name:"Tesla Style Solar Power Card",description:"A Solar Power Visualization with svg paths that mimmicks the powerwall app of tesla 2"});class ct extends tt{constructor(){super(...arguments),this.solarCardElements=new Map,this.oldWidth=100,this.htmlWriter=new lt(this,this.hass),this.title="Hey there",this.counter=5,this.error=""}__increment(){this.counter+=1}setConfig(t){if(t.test_gui,this.config={...t},null==this.config.grid_icon&&(this.config.grid_icon="mdi:transmission-tower"),null==this.config.generation_icon&&(this.config.generation_icon="mdi:solar-panel-large"),null==this.config.house_icon&&(this.config.house_icon="mdi:home"),null==this.config.battery_icon&&(this.config.battery_icon="mdi:battery-medium"),null==this.config.appliance1_icon&&(this.config.appliance1_icon="mdi:car-sports"),null==this.config.appliance2_icon&&(this.config.appliance2_icon="mdi:air-filter"),null==this.config.speed_factor&&(this.config.speed_factor=.04),this.createSolarCardElements(),!this.config.energy_flow_diagramm){const t=this;setInterval(this.animateCircles,15,t)}}createSolarCardElements(){Object.keys(this.config).forEach((t=>{if(null!=this.config[t]&&t.indexOf("_entity")>5){const e=this.config[t].toString();this.solarCardElements.set(t,new rt(e,t))}}))}getCardSize(){return 5}static getStubConfig(){return{}}async firstUpdated(){await new Promise((t=>setTimeout(t,0))),this.oldWidth=at.changeStylesDependingOnWidth(this,this.solarCardElements,this.clientWidth,this.oldWidth)}connectedCallback(){super.connectedCallback(),this.redraw=this.redraw.bind(this),window.addEventListener("resize",this.redraw)}shouldUpdate(t){let e;e=this,this.config.energy_flow_diagramm||requestAnimationFrame((t=>{e.updateAllCircles(t)})),e=this;let i=!0;return Array.from(t.keys()).some((e=>{const n=t.get(e);return"hass"===e&&n&&(i=i&&this.sensorChangeDetected(n)),!i})),i}sensorChangeDetected(t){let e=!1;return this.solarCardElements.forEach(((i,n)=>{void 0!==this.hass.states[this.config[n]]&&this.hass.states[this.config[n]].state!==t.states[this.config[n]].state&&(e=!0)})),e}async performUpdate(){this.error="",this.solarCardElements.forEach((t=>{try{t.setValueAndUnitOfMeasurement(this.hass.states[t.entity].state,this.hass.states[t.entity].attributes.unit_of_measurement),t.setSpeed(this.config.speed_factor)}catch(e){this.error+=" Configured '"+t.entity+"' entity was not found. "}})),this.config.energy_flow_diagramm&&this.setEnergyFlowDiagramm(),this.config.change_house_bubble_color_with_flow&&this.colourHouseBubbleDependingOnHighestInput(),super.performUpdate()}render(){if(""!==this.error)return this._showError();const t=at.getNewWidth(this.clientWidth),e=at.getPxRate(t);let i;i=void 0!==this.config.show_gap&&this.config.show_gap?2*e:0;const n=22*e,s=11.38*e,r=2.2*e;return R`
      <ha-card .header=${this.config.name} tabindex="0">
        <div id="tesla-style-solar-power-card" style="padding:${2*e+"px"}">
          ${this.writeGenerationIconBubble(e)}
          <div class="acc_center">
            <div class="acc_center_container" 
              style="
              margin-top:${-.3*e+"px"};
              margin-bottom:${-1.55*e+"px"}">
              ${this.writeGridIconBubble(e)}
              <div
                class="acc_line power_lines"
                style="
                height:${42*e+"px"};
                width:${42*e+"px"};
                top:${0*e+"px"};
                left:${28*e+"px"};
                margin-left:${-1.15*e+"px"};
                margin-right:${-1.15*e+"px"}"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="${"0 0 "+42*e+" "+42*e}"
                  preserveAspectRatio="xMinYMax slice"
                  style="height:${42*e+"px"};width:${42*e+"px"}"
                >
                  ${this.htmlWriter.writeCircleAndLine("generation_to_house_entity","M"+(n-e+i)+",0C"+(n-e+i)+","+(n-i)+" "+(n-e+i)+","+(n-i)+" "+2*n+","+(n-i))}
                  ${this.htmlWriter.writeCircleAndLine("grid_to_house_entity","M0,"+n+" C"+(n-e)+","+n+" "+(n-e)+","+n+" "+2*(n-e)+","+n)}
                  ${this.htmlWriter.writeCircleAndLine("generation_to_grid_entity","M"+(n-e-i)+",0 C"+(n-e-i)+","+(n-i)+" "+(n-e-i)+","+(n-i)+" 0,"+(n-i))}
                  ${this.htmlWriter.writeCircleAndLine("grid_to_battery_entity","M0,"+(n+i)+" C"+(n-e-i)+","+(n+i)+" "+(n-e-i)+","+(n+i)+" "+(n-e-i)+","+2*n)}
                  ${this.htmlWriter.writeCircleAndLine("battery_to_grid_entity","M"+(n-e-i)+","+2*n+" C"+(n-e-i)+","+(n+i)+" "+(n-e-i)+","+(n+i)+" 0,"+(n+i))}
                  ${this.htmlWriter.writeCircleAndLine("generation_to_battery_entity","M"+(n-e)+",0 C"+(n-e)+",0 "+(n-e)+","+2*n+" "+(n-e)+","+2*n)}
                  ${this.htmlWriter.writeCircleAndLine("battery_to_house_entity","M"+(n-e+i)+","+2*n+" C"+(n-e+i)+","+(n+i)+" "+(n-e+i)+","+(n+i)+" "+2*n+","+(n+i))}
                </svg>
              </div>

              ${this.writeHouseIconBubble(e)}
              ${this.writeApplianceIconBubble(1,e)}
              ${this.htmlWriter.writeAppliancePowerLineAndCircle(1,"M5,"+s+" C5,"+s+" 5,0 5,0",s,r,e)}
              ${this.writeApplianceIconBubble(2,e)}
              ${this.htmlWriter.writeAppliancePowerLineAndCircle(2,"M5,0 C5,0 5,"+(s-r)+" 5,"+(s-r),s,r,e)}
            </div>
          </div>
          <div class="acc_bottom">${this.writeBatteryIconBubble(e)}</div>
        </div>
      </ha-card>
    `}writeGenerationIconBubble(t){const e=this.calculateIconBubbleData(["generation_to_grid_entity","generation_to_house_entity","generation_to_battery_entity"],"generation_entity","generation_extra_entity");return e.cssSelector="acc_top",e.icon=this.config.generation_icon,this.htmlWriter.writeBatteryBubbleDiv(e,t)}writeGridIconBubble(t){const e=this.calculateIconBubbleData(["-generation_to_grid_entity","grid_to_house_entity","-battery_to_grid_entity","grid_to_battery_entity"],"grid_entity","grid_extra_entity");return e.cssSelector="acc_left",e.icon=this.config.grid_icon,this.htmlWriter.writeBatteryBubbleDiv(e,t)}writeHouseIconBubble(t){let e;e=this.config.house_without_appliances_values?["generation_to_house_entity","grid_to_house_entity","battery_to_house_entity","-appliance1_consumption_entity","-appliance2_consumption_entity"]:["generation_to_house_entity","grid_to_house_entity","battery_to_house_entity"];const i=this.calculateIconBubbleData(e,"house_entity","house_extra_entity");return i.cssSelector="acc_right",i.icon=this.config.house_icon,this.htmlWriter.writeBatteryBubbleDiv(i,t)}writeBatteryIconBubble(t){const e=this.calculateIconBubbleData(["generation_to_battery_entity","grid_to_battery_entity","-battery_to_house_entity","-battery_to_grid_entity"],"battery_entity","battery_extra_entity");return e.cssSelector="acc_bottom",e.icon=this.config.battery_icon,this.htmlWriter.writeBatteryBubbleDiv(e,t)}writeApplianceIconBubble(t,e){const i=["appliance"+t+"_consumption_entity"],n=this.calculateIconBubbleData(i,"appliance"+t+"_consumption_entity","appliance"+t+"_extra_entity");n.cssSelector="acc_appliance"+t,n.icon=this.config["appliance"+t+"_icon"];let s="right:"+2*e+"px";return this.htmlWriter.writeBatteryBubbleDiv(n,e,s)}calculateIconBubbleData(t,e=null,i=null){let n=!1;const s=new ot;if(s.clickEntitySlot=e,t.forEach((t=>{"-"===t.substring(0,1)&&(t=t.substring(1),n=!0);const e=this.solarCardElements.get(t);null!==e&&void 0!==(null==e?void 0:e.value)&&(s.noEntitiesWithValueFound=!1,s.mainValue=n?s.mainValue-(null==e?void 0:e.value):s.mainValue+(null==e?void 0:e.value),s.mainValue=(100*s.mainValue|0)/100,s.mainUnitOfMeasurement=null==e?void 0:e.unitOfMeasurement),n=!1})),null!==i){const t=this.solarCardElements.get(i);if(s.extraValue=null==t?void 0:t.value,s.extraUnitOfMeasurement=null==t?void 0:t.unitOfMeasurement,void 0!==(null==t?void 0:t.value)&&void 0!==(null==t?void 0:t.unitOfMeasurement)&&"wh"==t.unitOfMeasurement.toLowerCase()){const e=parseInt(t.value);Number.isNaN(e)||this.showKW(e)&&(s.extraValue=this.roundValue(e/1e3).toString(),s.extraUnitOfMeasurement="k"+s.extraUnitOfMeasurement)}}return null!==e&&(s.clickEntityHassState=this.hass.states[this.config[e]]),this.showKW(s.mainValue)&&(s.mainValue=this.roundValue(s.mainValue/1e3),s.mainUnitOfMeasurement="kW"),s}showKW(t){return!this.config.show_w_not_kw&&!(void 0!==this.config.threshold_in_k&&Math.abs(t)<1e3*this.config.threshold_in_k)}roundValue(t){let e;return e=t>.1?(0|Math.round(10*(t+Number.EPSILON)))/10:(0|Math.round(100*(t+Number.EPSILON)))/100,e}animateCircles(t){requestAnimationFrame((e=>{t.updateAllCircles(e)}))}updateAllCircles(t){this.solarCardElements.forEach(((e,i)=>{const n=this.solarCardElements.get(i);void 0!==n&&this.updateOneCircle(t,n)}))}updateOneCircle(t,e){if(null==this.shadowRoot)return;const i=this.shadowRoot.querySelector("#tesla-style-solar-power-card");if(null==i)return;if(e.line=i.querySelector("#"+e.entitySlot+"_line"),null===e.line)return;const n=e.line.getTotalLength();if(isNaN(n))return;if(e.circle=i.querySelector("#"+e.entitySlot+"_circle"),0===e.speed)return e.circle.setAttribute("visibility","hidden"),void(this.config.hide_inactive_lines&&e.line.setAttribute("visibility","hidden"));e.circle.setAttribute("visibility","visible"),this.config.hide_inactive_lines&&e.line.setAttribute("visibility","visible"),0===e.prevTimestamp&&(e.prevTimestamp=t,e.currentDelta=0),e.currentDelta+=Math.abs(e.speed)*(t-e.prevTimestamp);let s=e.currentDelta/n;e.speed>0?(s>=1||isNaN(s))&&(e.currentDelta=0,s=.01):(s=1-s,(s<=0||isNaN(s))&&(e.currentDelta=0,s=1));const r=e.line.getPointAtLength(n*s);e.circle.setAttributeNS(null,"cx",r.x.toString()),e.circle.setAttributeNS(null,"cy",r.y.toString()),e.prevTimestamp=t}colourHouseBubbleDependingOnHighestInput(){if(null==this.shadowRoot)return;const t=this.shadowRoot.querySelector("#tesla-style-solar-power-card");if(null==t)return;let e=null,i="";switch(["generation_to_house_entity","grid_to_house_entity","battery_to_house_entity"].forEach((t=>{const n=this.solarCardElements.get(t);null!==n&&void 0!==(null==n?void 0:n.value)&&(null==e||(null==n?void 0:n.value)>e.value)&&(i=t,e=n)})),i){case"generation_to_house_entity":this.colourBubble(".house_entity",t,"warning"),this.colourBubble(".appliance1_consumption_entity",t,"warning"),this.colourBubble(".appliance2_consumption_entity",t,"warning"),this.colourLineAndCircle("#appliance1_consumption_entity",t,"warning"),this.colourLineAndCircle("#appliance2_consumption_entity",t,"warning");break;case"battery_to_house_entity":this.colourBubble(".house_entity",t,"success"),this.colourBubble(".appliance1_consumption_entity",t,"success"),this.colourBubble(".appliance2_consumption_entity",t,"success"),this.colourLineAndCircle("#appliance1_consumption_entity",t,"success"),this.colourLineAndCircle("#appliance2_consumption_entity",t,"success");break;case"grid_to_house_entity":this.colourBubble(".house_entity",t,"info"),this.colourBubble(".appliance1_consumption_entity",t,"info"),this.colourBubble(".appliance2_consumption_entity",t,"info"),this.colourLineAndCircle("#appliance1_consumption_entity",t,"info"),this.colourLineAndCircle("#appliance2_consumption_entity",t,"info")}}colourBubble(t,e,i){const n=e.querySelector(t);null!==n&&(n.style.color="var(--"+i+"-color)",n.style.border="1px solid var(--"+i+"-color)")}colourLineAndCircle(t,e,i){const n=e.querySelector(t+"_line"),s=e.querySelector(t+"_circle");null!==n&&(n.style.stroke="var(--"+i+"-color)",s.style.fill="var(--"+i+"-color)")}setEnergyFlowDiagramm(){if(null==this.shadowRoot)return;const t=this.shadowRoot.querySelector("#tesla-style-solar-power-card");null!=t&&this.solarCardElements.forEach(((e,i)=>{const n=this.solarCardElements.get(i);let s=1;if(null==t)return;const r=t.querySelector("#"+i+"_line");if(null!=r&&void 0!==n){t.querySelector("#"+i+"_circle").style.visibility="hidden",void 0===this.config.energy_flow_diagramm_lines_factor&&(this.config.energy_flow_diagramm_lines_factor=2),s="W"===(null==n?void 0:n.unitOfMeasurement.toUpperCase())?Math.floor((null==n?void 0:n.value)/100)/10*this.config.energy_flow_diagramm_lines_factor:Math.floor(10*(null==n?void 0:n.value))/10*this.config.energy_flow_diagramm_lines_factor,s<=.1&&0!==s&&(s=.1),r.style.strokeWidth=s+"px"}}))}redraw(t){this.hass&&this.config&&"resize"===t.type&&(this.oldWidth=at.changeStylesDependingOnWidth(this,this.solarCardElements,this.clientWidth,this.oldWidth))}_showWarning(t){return R` <hui-warning>${t}</hui-warning> `}_showError(){return console.log(this.error),R`
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
      position: relative;
    }
    .acc_container {
        border: 2px solid black;
        border-radius: 100px;
        color: var(--primary-text-color);
        border-color: var(--primary-text-color);
        position:relative;
        cursor:pointer;
        display:grid;
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
    .acc_center_container{
      display:inline-block;
    }

    .acc_right ,
    .acc_left ,
    .acc_line{
      display:inline-block;
    }
    .acc_left {
      vertical-align: top;
      z-index:5;
    }
    .acc_right {
      z-index:5;
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
      stroke-width:2;
    }

    .generation_entity {
      border: 2px solid var(--warning-color);
    }
    .generation_entity .acc_icon,
    .generation_entity{
      color: var(--warning-color);
    }
    .house_entity{
      border: 2px solid var(--info-color);
    }
    .appliance1_consumption_entity,
    .appliance2_consumption_entity {
      border: 2px solid var(--info-color);
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
      border: 2px solid var(--success-color);
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
    `}}t([nt({attribute:!1})],ct.prototype,"hass",void 0),t([nt()],ct.prototype,"config",void 0),t([nt({attribute:!1})],ct.prototype,"solarCardElements",void 0),t([nt()],ct.prototype,"oldWidth",void 0),t([nt({type:String})],ct.prototype,"title",void 0),t([nt({type:Number})],ct.prototype,"counter",void 0),window.customElements.define("tesla-style-solar-power-card",ct)}();
