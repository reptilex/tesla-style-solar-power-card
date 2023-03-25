!function(){"use strict";function t(t,e,i,n){var s,o=arguments.length,r=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,n);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(r=(o<3?s(r):o>3?s(e,i,r):s(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r
/**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */}const e=window,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),s=new WeakMap;class o{constructor(t,e,i){if(this._$cssResult$=!0,i!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(e,t))}return t}toString(){return this.cssText}}const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1]),t[0]);return new o(i,t,n)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,n))(e)})(t):t
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */;var l;const c=window,h=c.trustedTypes,d=h?h.emptyScript:"",u=c.reactiveElementPolyfillSupport,p={toAttribute(t,e){switch(e){case Boolean:t=t?d:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},_=(t,e)=>e!==t&&(e==e||t==t),m={attribute:!0,type:String,converter:p,reflect:!1,hasChanged:_};class g extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const n=this._$Ep(i,e);void 0!==n&&(this._$Ev.set(n,i),t.push(n))})),t}static createProperty(t,e=m){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,n=this.getPropertyDescriptor(t,i,e);void 0!==n&&Object.defineProperty(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(n){const s=this[t];this[e]=n,this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||m}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const n=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,n)=>{i?t.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((i=>{const n=document.createElement("style"),s=e.litNonce;void 0!==s&&n.setAttribute("nonce",s),n.textContent=i.cssText,t.appendChild(n)}))})(n,this.constructor.elementStyles),n}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=m){var n;const s=this.constructor._$Ep(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==(null===(n=i.converter)||void 0===n?void 0:n.toAttribute)?i.converter:p).toAttribute(e,i.type);this._$El=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$El=null}}_$AK(t,e){var i;const n=this.constructor,s=n._$Ev.get(t);if(void 0!==s&&this._$El!==s){const t=n.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:p;this._$El=s,this[s]=o.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let n=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||_)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):n=!1),!this.isUpdatePending&&n&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var y;g.finalized=!0,g.elementProperties=new Map,g.elementStyles=[],g.shadowRootOptions={mode:"open"},null==u||u({ReactiveElement:g}),(null!==(l=c.reactiveElementVersions)&&void 0!==l?l:c.reactiveElementVersions=[]).push("1.6.1");const v=window,f=v.trustedTypes,b=f?f.createPolicy("lit-html",{createHTML:t=>t}):void 0,x=`lit$${(Math.random()+"").slice(9)}$`,$="?"+x,w=`<${$}>`,A=document,C=(t="")=>A.createComment(t),S=t=>null===t||"object"!=typeof t&&"function"!=typeof t,R=Array.isArray,E=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,O=/>/g,B=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),k=/'/g,H=/"/g,P=/^(?:script|style|textarea|title)$/i,U=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),W=Symbol.for("lit-noChange"),T=Symbol.for("lit-nothing"),N=new WeakMap,D=A.createTreeWalker(A,129,null,!1),L=(t,e)=>{const i=t.length-1,n=[];let s,o=2===e?"<svg>":"",r=E;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(r.lastIndex=h,l=r.exec(i),null!==l);)h=r.lastIndex,r===E?"!--"===l[1]?r=M:void 0!==l[1]?r=O:void 0!==l[2]?(P.test(l[2])&&(s=RegExp("</"+l[2],"g")),r=B):void 0!==l[3]&&(r=B):r===B?">"===l[0]?(r=null!=s?s:E,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?B:'"'===l[3]?H:k):r===H||r===k?r=B:r===M||r===O?r=E:(r=B,s=void 0);const d=r===B&&t[e+1].startsWith("/>")?" ":"";o+=r===E?i+w:c>=0?(n.push(a),i.slice(0,c)+"$lit$"+i.slice(c)+x+d):i+x+(-2===c?(n.push(void 0),e):d)}const a=o+(t[i]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==b?b.createHTML(a):a,n]};class z{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let s=0,o=0;const r=t.length-1,a=this.parts,[l,c]=L(t,e);if(this.el=z.createElement(l,i),D.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(n=D.nextNode())&&a.length<r;){if(1===n.nodeType){if(n.hasAttributes()){const t=[];for(const e of n.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(x)){const i=c[o++];if(t.push(e),void 0!==i){const t=n.getAttribute(i.toLowerCase()+"$lit$").split(x),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:s,name:e[2],strings:t,ctor:"."===e[1]?F:"?"===e[1]?G:"@"===e[1]?Z:j})}else a.push({type:6,index:s})}for(const e of t)n.removeAttribute(e)}if(P.test(n.tagName)){const t=n.textContent.split(x),e=t.length-1;if(e>0){n.textContent=f?f.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],C()),D.nextNode(),a.push({type:2,index:++s});n.append(t[e],C())}}}else if(8===n.nodeType)if(n.data===$)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=n.data.indexOf(x,t+1));)a.push({type:7,index:s}),t+=x.length-1}s++}}static createElement(t,e){const i=A.createElement("template");return i.innerHTML=t,i}}function I(t,e,i=t,n){var s,o,r,a;if(e===W)return e;let l=void 0!==n?null===(s=i._$Co)||void 0===s?void 0:s[n]:i._$Cl;const c=S(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(o=null==l?void 0:l._$AO)||void 0===o||o.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,i,n)),void 0!==n?(null!==(r=(a=i)._$Co)&&void 0!==r?r:a._$Co=[])[n]=l:i._$Cl=l),void 0!==l&&(e=I(t,l._$AS(t,e.values),l,n)),e}class V{constructor(t,e){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var e;const{el:{content:i},parts:n}=this._$AD,s=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:A).importNode(i,!0);D.currentNode=s;let o=D.nextNode(),r=0,a=0,l=n[0];for(;void 0!==l;){if(r===l.index){let e;2===l.type?e=new q(o,o.nextSibling,this,t):1===l.type?e=new l.ctor(o,l.name,l.strings,this,t):6===l.type&&(e=new J(o,this,t)),this.u.push(e),l=n[++a]}r!==(null==l?void 0:l.index)&&(o=D.nextNode(),r++)}return s}p(t){let e=0;for(const i of this.u)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class q{constructor(t,e,i,n){var s;this.type=2,this._$AH=T,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cm=null===(s=null==n?void 0:n.isConnected)||void 0===s||s}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cm}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=I(this,t,e),S(t)?t===T||null==t||""===t?(this._$AH!==T&&this._$AR(),this._$AH=T):t!==this._$AH&&t!==W&&this.g(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>R(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.k(t):this.g(t)}O(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}g(t){this._$AH!==T&&S(this._$AH)?this._$AA.nextSibling.data=t:this.T(A.createTextNode(t)),this._$AH=t}$(t){var e;const{values:i,_$litType$:n}=t,s="number"==typeof n?this._$AC(t):(void 0===n.el&&(n.el=z.createElement(n.h,this.options)),n);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===s)this._$AH.p(i);else{const t=new V(s,this),e=t.v(this.options);t.p(i),this.T(e),this._$AH=t}}_$AC(t){let e=N.get(t.strings);return void 0===e&&N.set(t.strings,e=new z(t)),e}k(t){R(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,n=0;for(const s of t)n===e.length?e.push(i=new q(this.O(C()),this.O(C()),this,this.options)):i=e[n],i._$AI(s),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cm=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class j{constructor(t,e,i,n,s){this.type=1,this._$AH=T,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=T}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,n){const s=this.strings;let o=!1;if(void 0===s)t=I(this,t,e,0),o=!S(t)||t!==this._$AH&&t!==W,o&&(this._$AH=t);else{const n=t;let r,a;for(t=s[0],r=0;r<s.length-1;r++)a=I(this,n[i+r],e,r),a===W&&(a=this._$AH[r]),o||(o=!S(a)||a!==this._$AH[r]),a===T?t=T:t!==T&&(t+=(null!=a?a:"")+s[r+1]),this._$AH[r]=a}o&&!n&&this.j(t)}j(t){t===T?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class F extends j{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===T?void 0:t}}const K=f?f.emptyScript:"";class G extends j{constructor(){super(...arguments),this.type=4}j(t){t&&t!==T?this.element.setAttribute(this.name,K):this.element.removeAttribute(this.name)}}class Z extends j{constructor(t,e,i,n,s){super(t,e,i,n,s),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=I(this,t,e,0))&&void 0!==i?i:T)===W)return;const n=this._$AH,s=t===T&&n!==T||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==T&&(n===T||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class J{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){I(this,t)}}const Y=v.litHtmlPolyfillSupport;null==Y||Y(z,q),(null!==(y=v.litHtmlVersions)&&void 0!==y?y:v.litHtmlVersions=[]).push("2.6.1");
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var Q,X;class tt extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var n,s;const o=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:e;let r=o._$litPart$;if(void 0===r){const t=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:null;o._$litPart$=r=new q(e.insertBefore(C(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return W}}tt.finalized=!0,tt._$litElement$=!0,null===(Q=globalThis.litElementHydrateSupport)||void 0===Q||Q.call(globalThis,{LitElement:tt});const et=globalThis.litElementPolyfillSupport;null==et||et({LitElement:tt}),(null!==(X=globalThis.litElementVersions)&&void 0!==X?X:globalThis.litElementVersions=[]).push("3.2.2");
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
     */}var st;null===(st=window.HTMLSlotElement)||void 0===st||st.prototype.assignedElements;class ot{constructor(t,e){this.speed=0,this.startPosition=0,this.currentPosition=0,this.currentDelta=0,this.maxPosition=30,this.unitOfMeasurement="",this.accText="",this.accTextclassName="accText",this.entity="",this.color="stroke:var(--info-color)",this.circleColor="var(--primary-color)",this.prevTimestamp=0,this.accTextElement=null,this.entity=t,this.entitySlot=e,this.value=0}setValueAndUnitOfMeasurement(t,e){if(void 0===t)return void(this.value=0);if(void 0===e)return void(this.value=t);const i=parseFloat(t);switch(e.toLowerCase()){case"w":case"kw":this.value=i,"kW"===e&&(this.value*=1e3),this.unitOfMeasurement="W",this.value=Math.round(this.value);break;case"wh":case"kwh":this.value=i,"kWh"===e&&(this.value*=1e3),this.unitOfMeasurement="Wh",this.value=Math.round(this.value);break;case"%":this.value=i,this.unitOfMeasurement=e;break;default:this.value=t,this.unitOfMeasurement=e}}setSpeed(t){if(this.speed=0,0===Math.abs(this.value))return;let e;e=void 0===t||t>1||t<=0?ot.SPEEDFACTOR:t,this.speed=e*this.value/1e3}}ot.SPEEDFACTOR=.04;class rt{constructor(){this.mainValue=0,this.clickEntitySlot=null,this.clickEntityHassState=null,this.noEntitiesWithValueFound=!0}}class at{constructor(t,e){this.teslaCard=t,this.solarCardElements=t.solarCardElements,this.hass=e}writeBubbleDiv(t,e=""){if(t.noEntitiesWithValueFound)return U``;e.length>0&&(e.startsWith(";")||(e="; "+e));const i=this.getSpaceBeforeUnit(t.extraUnitOfMeasurement),n=this.getSpaceBeforeUnit(t.mainUnitOfMeasurement);return U` <div class="acc_td ${t.cssSelector}" style="${e}">
      <div
        class="acc_container ${t.clickEntitySlot}"
        style="${"width:"+this.teslaCard.dimensions.bubbleHeight+"px; height: "+this.teslaCard.dimensions.bubbleHeight+"px; padding:0px"}"
        @click="${()=>this._handleClick(t.clickEntityHassState)}"
      >
        ${null!==t.extraValue?U` <div
              class="acc_text_extra"
              style="font-size:${this.teslaCard.dimensions.fontSize+"px"};
                     line-height:${this.teslaCard.dimensions.fontSize+"px"};
                     margin-top:${this.teslaCard.dimensions.marginTop+"px"}; "
            >${t.extraValue}${i}${t.extraUnitOfMeasurement}
            </div>`:U``}
        <ha-icon class="acc_icon" icon="${t.icon}" style="--mdc-icon-size:${this.teslaCard.dimensions.iconHeight+"px"};width:${this.teslaCard.dimensions.iconHeight+"px"};height:${this.teslaCard.dimensions.iconHeight+"px"}"></ha-icon>
        <div class="acc_text" style="font-size:${this.teslaCard.dimensions.fontSize+"px"}; line-height:${this.teslaCard.dimensions.fontSize+"px"}; margin-bottom:${this.teslaCard.dimensions.fontSize+"px"};">
          ${t.mainValue}${n}${t.mainUnitOfMeasurement}
        </div>
      </div>
    </div>`}getSpaceBeforeUnit(t){return this.teslaCard.config.show_space_before_all_units?" ":this.teslaCard.config.show_space_before_power_units?(null==t?void 0:t.toLocaleLowerCase().startsWith("kw"))||(null==t?void 0:t.toLocaleLowerCase().startsWith("w"))?" ":void 0:""}writeBatteryBubbleDiv(t,e=""){return void 0!==t.extraValue&&("mdi:battery-medium"!==t.icon&&"mdi:battery"!==t.icon||(t.icon=this.getBatteryIcon(parseFloat(t.extraValue),t.mainValue))),this.writeBubbleDiv(t,e)}getBatteryIcon(t,e){let i=t;t<=5&&(i=0);const n=10*Math.ceil(i/10);let s="-"+n.toString(),o="-charging";return e<=0&&(o=""),100===n&&(s=""),n<=5&&(s="-outline"),"mdi:battery"+o+s}writeAppliancePowerLineAndCircle(t,e,i,n,s){if(null==this.solarCardElements.get("appliance"+t+"_consumption_entity"))return U``;let o;return o=1===t?"top:"+23.45*s+"px;":"bottom:"+22.62*s+"px;",U` <div
      class="acc_line acc_appliance${t}_line"
      style="
        right:${11.46*s+"px"};
        ${o}
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
    </div>`}writeCircleAndLine(t,e){const i=this.solarCardElements.get(t);return null==i?U``:U`<svg>
      <circle r="4" cx="${i.startPosition.toString()}" cy="4" fill="${i.color}" id="${t+"_circle"}"></circle>
      <path d="${e}" id="${t+"_line"}"></path>
    </svg>`}_handleClick(t){if(null==t)return;const e=new Event("hass-more-info",{bubbles:!0,cancelable:!0,composed:!0});e.detail={entityId:t.entity_id},null!=this.teslaCard.shadowRoot&&this.teslaCard.shadowRoot.dispatchEvent(e)}}class lt{static changeStylesDependingOnWidth(t,e,i,n){if("complete"!==document.readyState||n===i)return n;if(null==t.shadowRoot)return n;const s=t.shadowRoot.querySelector("#tesla-style-solar-power-card");if(null==s)return n;t.dimensions.updateCardDimensions(i);const o=function(t,e,i){const n=s.querySelector(t);null!==n&&(n.style[e]=i)};s.style.padding=2*t.dimensions.pxRate+"px",o(".acc_left","top",11*t.dimensions.pxRate+"px"),o(".acc_right","top",11*t.dimensions.pxRate+"px"),s.querySelectorAll(".acc_container").forEach(((e,i,n)=>{const s=n[i];s.style.height=t.dimensions.bubbleHeight+"px",s.style.width=t.dimensions.bubbleHeight+"px",s.style.padding="0px"})),s.querySelectorAll("ha-icon").forEach(((e,i,n)=>{var s;n[i].setAttribute("style",`--mdc-icon-size:${t.dimensions.iconHeight+"px"};width:${t.dimensions.iconHeight+"px"};height:${t.dimensions.iconHeight+"px"}`),null===(s=n[i].shadowRoot)||void 0===s||s.querySelector("ha-svg-icon")})),s.querySelectorAll(".acc_text_extra").forEach((e=>{e.style["font-size"]=t.dimensions.fontSize+"px",e.style["line-height"]=t.dimensions.fontSize+"px",e.style["margin-top"]=t.dimensions.marginTop+"px"})),s.querySelectorAll(".acc_text").forEach((e=>{e.style["font-size"]=t.dimensions.fontSize+"px",e.style["line-height"]=t.dimensions.fontSize+"px",e.style["margin-bottom"]=t.dimensions.fontSize+"px"})),s.querySelectorAll(".acc_text_extra").forEach((e=>{e.style["font-size"]=3*pxRate+"px",e.style.top=1*t.dimensions.pxRate+"px"})),o(".power_lines","height",42*t.dimensions.pxRate+"px"),o(".power_lines","width",42*t.dimensions.pxRate+"px"),o(".power_lines","top",0*t.dimensions.pxRate+"px"),o(".power_lines","left",28*t.dimensions.pxRate+"px"),o(".power_lines","margin-left",-1.15*t.dimensions.pxRate+"px"),o(".power_lines","margin-left",-1.15*t.dimensions.pxRate+"px"),o(".power_lines svg","width",42*t.dimensions.pxRate+"px"),o(".power_lines svg","height",42*t.dimensions.pxRate+"px"),o(".power_lines svg","viewBox","0 0 "+42*t.dimensions.pxRate+" "+42*t.dimensions.pxRate);let r=s.querySelector(".power_lines svg");null!==r&&r.setAttribute("viewBox","0 0 "+42*t.dimensions.pxRate+" "+42*t.dimensions.pxRate);const a=22*t.dimensions.pxRate;o("#generation_to_house_entity_line","d","M"+(a-t.dimensions.pxRate)+",0 C"+(a-t.dimensions.pxRate)+","+a+" "+(a-t.dimensions.pxRate)+","+a+" "+2*a+","+a),o("#grid_feed_in_entity_line","d","M"+(a-t.dimensions.pxRate)+",0 C"+(a-t.dimensions.pxRate)+","+a+" "+(a-t.dimensions.pxRate)+","+a+" 0,"+a),o("#grid_to_house_entity_line","d","M0,"+a+" C"+a+","+a+" "+a+","+a+" "+2*a+","+a),o("#grid_to_battery_entity_line","d","M0,"+a+" C"+a+","+a+" "+a+","+a+" "+a+","+2*a),o("#battery_to_house_entity_line","d","M"+(a-t.dimensions.pxRate)+","+2*a+" C"+(a-t.dimensions.pxRate)+","+a+" "+(a-t.dimensions.pxRate)+","+a+" "+2*a+","+a),o("#generation_to_battery_entity_line","d","M"+(a-t.dimensions.pxRate)+",0 C"+(a-t.dimensions.pxRate)+",0 "+(a-t.dimensions.pxRate)+","+2*a+" "+(a-t.dimensions.pxRate)+","+2*a);const l=11.38*t.dimensions.pxRate,c=2.2*t.dimensions.pxRate;[1,2].forEach((e=>{o(".acc_appliance"+e+"_line","right",11.46*t.dimensions.pxRate+"px"),o(".acc_appliance"+e+"_line svg","width",2.5*t.dimensions.pxRate+"px"),o(".acc_appliance"+e+"_line svg","height",l-(e-1)*c+"px"),r=s.querySelector(".acc_appliance"+e+"_line_svg"),null!==r&&r.setAttribute("viewBox","0 0 "+(l-(e-1)*c)+" "+(l-(e-1)*c));const i=s.querySelector(".generation_entity");o(".acc_center_container","margin-top",null===i&&1===e&&null!==r?19*t.dimensions.pxRate+"px":-.3*t.dimensions.pxRate+"px");const n=s.querySelector(".battery_entity");o(".acc_center_container","margin-bottom",null===n&&2===e&&null!==r?19*t.dimensions.pxRate+"px":-1.55*t.dimensions.pxRate+"px")}));return null===s.querySelector(".grid_entity")&&(o(".generation_entity","margin","0px"),o(".battery_entity","margin","0px"),o(".power_lines","width",30*t.dimensions.pxRate+"px"),r=s.querySelector(".power_lines svg"),null!==r&&r.setAttribute("viewBox",12*t.dimensions.pxRate+" 0 "+42*t.dimensions.pxRate+" "+42*t.dimensions.pxRate)),o(".acc_appliance1","top",2*t.dimensions.pxRate+"px"),o(".acc_appliance1","right",2*t.dimensions.pxRate+"px"),o(".acc_appliance1_line","top",23.45*t.dimensions.pxRate+"px"),o(".acc_appliance2","bottom",2*t.dimensions.pxRate+"px"),o(".acc_appliance2","right",2*t.dimensions.pxRate+"px"),o(".acc_appliance2_line","bottom",22.62*t.dimensions.pxRate+"px"),o("#appliance1_consumption_entity_line","d","M5,"+l+" C5,"+l+" 5,0 5,0"),o("#appliance2_consumption_entity_line","d","M5,0 C5,0 5,"+(l-c)+" 5,"+(l-c)),t.dimensions.width}}class ct{constructor(t){this._pxRate=0,this._width=ct.minimumWidth,this._bubbleHeight=0,this.teslaCard=t}updateCardDimensions(t){return void 0===this.teslaCard.config.minimum_width&&(this.teslaCard.config.minimum_width=ct.minimumWidth),t<this.teslaCard.config.minimum_width?this._width=this.teslaCard.config.minimum_width:this._width=t,this._pxRate=this._width/100,this._bubbleHeight=21*this.pxRate,this._width}get pxRate(){return this._pxRate}get bubbleHeight(){return this._bubbleHeight}get iconHeight(){return.33*this._bubbleHeight}get fontSize(){return.143*this._bubbleHeight}get marginTop(){return.192*this._bubbleHeight}get width(){return this._width}}ct.minimumWidth=280,window.customCards=window.customCards||[],window.customCards.push({type:"tesla-style-solar-power-card",name:"Tesla Style Solar Power Card",description:"A Solar Power Visualization with svg paths that mimmicks the powerwall app of tesla 2"});class ht extends tt{constructor(){super(...arguments),this.solarCardElements=new Map,this.oldWidth=ct.minimumWidth,this.htmlWriter=new at(this,this.hass),this.dimensions=new ct(this),this.title="Hey there",this.counter=5,this.error=""}__increment(){this.counter+=1}setConfig(t){if(t.test_gui,this.config={...t},null==this.config.grid_icon&&(this.config.grid_icon="mdi:transmission-tower"),null==this.config.generation_icon&&(this.config.generation_icon="mdi:solar-panel-large"),null==this.config.house_icon&&(this.config.house_icon="mdi:home"),null==this.config.battery_icon&&(this.config.battery_icon="mdi:battery-medium"),null==this.config.appliance1_icon&&(this.config.appliance1_icon="mdi:car-sports"),null==this.config.appliance2_icon&&(this.config.appliance2_icon="mdi:air-filter"),null==this.config.speed_factor&&(this.config.speed_factor=.04),this.createSolarCardElements(),!this.config.energy_flow_diagramm){const t=this;setInterval(this.animateCircles,15,t)}}createSolarCardElements(){Object.keys(this.config).forEach((t=>{if(null!=this.config[t]&&t.indexOf("_entity")>5){const e=this.config[t].toString();this.solarCardElements.set(t,new ot(e,t))}}))}getCardSize(){return 5}static getStubConfig(){return{}}async firstUpdated(){await new Promise((t=>setTimeout(t,0))),this.oldWidth=lt.changeStylesDependingOnWidth(this,this.solarCardElements,this.clientWidth,this.oldWidth)}connectedCallback(){super.connectedCallback(),this.redraw=this.redraw.bind(this),window.addEventListener("resize",this.redraw)}shouldUpdate(t){let e;e=this,this.config.energy_flow_diagramm||requestAnimationFrame((t=>{e.updateAllCircles(t)})),e=this;let i=!0;return Array.from(t.keys()).some((e=>{const n=t.get(e);return"hass"===e&&n&&(i=i&&this.sensorChangeDetected(n)),!i})),i}sensorChangeDetected(t){let e=!1;return this.solarCardElements.forEach(((i,n)=>{void 0!==this.hass.states[this.config[n]]&&this.hass.states[this.config[n]].state!==t.states[this.config[n]].state&&(e=!0)})),e}async performUpdate(){this.error="",this.solarCardElements.forEach((t=>{try{t.setValueAndUnitOfMeasurement(this.hass.states[t.entity].state,this.hass.states[t.entity].attributes.unit_of_measurement),t.setSpeed(this.config.speed_factor)}catch(e){this.error+=" Configured '"+t.entity+"' entity was not found. "}})),this.config.energy_flow_diagramm&&this.setEnergyFlowDiagramm(),this.config.change_house_bubble_color_with_flow&&this.colourHouseBubbleDependingOnHighestInput(),super.performUpdate()}render(){if(""!==this.error)return this._showError();let t;this.dimensions.updateCardDimensions(this.clientWidth),t=void 0!==this.config.show_gap&&this.config.show_gap?2*this.dimensions.pxRate:0;const e=22*this.dimensions.pxRate,i=11.38*this.dimensions.pxRate,n=2.2*this.dimensions.pxRate;return U`
      <ha-card .header=${this.config.name} tabindex="0">
        <div id="tesla-style-solar-power-card" style="padding:${2*this.dimensions.pxRate+"px"}">
          ${this.writeGenerationIconBubble()}
          <div class="acc_center">
            <div class="acc_center_container" 
              style="
              margin-top:${-.3*this.dimensions.pxRate+"px"};
              margin-bottom:${-1.55*this.dimensions.pxRate+"px"}">
              ${this.writeGridIconBubble()}
              <div
                class="acc_line power_lines"
                style="
                height:${42*this.dimensions.pxRate+"px"};
                width:${42*this.dimensions.pxRate+"px"};
                top:${0*this.dimensions.pxRate+"px"};
                left:${28*this.dimensions.pxRate+"px"};
                margin-left:${-1.15*this.dimensions.pxRate+"px"};
                margin-right:${-1.15*this.dimensions.pxRate+"px"}"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="${"0 0 "+42*this.dimensions.pxRate+" "+42*this.dimensions.pxRate}"
                  preserveAspectRatio="xMinYMax slice"
                  style="height:${42*this.dimensions.pxRate+"px"};width:${42*this.dimensions.pxRate+"px"}"
                >
                  ${this.htmlWriter.writeCircleAndLine("generation_to_house_entity","M"+(e-this.dimensions.pxRate+t)+",0C"+(e-this.dimensions.pxRate+t)+","+(e-t)+" "+(e-this.dimensions.pxRate+t)+","+(e-t)+" "+2*e+","+(e-t))}
                  ${this.htmlWriter.writeCircleAndLine("grid_to_house_entity","M0,"+e+" C"+(e-this.dimensions.pxRate)+","+e+" "+(e-this.dimensions.pxRate)+","+e+" "+2*(e-this.dimensions.pxRate)+","+e)}
                  ${this.htmlWriter.writeCircleAndLine("generation_to_grid_entity","M"+(e-this.dimensions.pxRate-t)+",0 C"+(e-this.dimensions.pxRate-t)+","+(e-t)+" "+(e-this.dimensions.pxRate-t)+","+(e-t)+" 0,"+(e-t))}
                  ${this.htmlWriter.writeCircleAndLine("grid_to_battery_entity","M0,"+(e+t)+" C"+(e-this.dimensions.pxRate-t)+","+(e+t)+" "+(e-this.dimensions.pxRate-t)+","+(e+t)+" "+(e-this.dimensions.pxRate-t)+","+2*e)}
                  ${this.htmlWriter.writeCircleAndLine("battery_to_grid_entity","M"+(e-this.dimensions.pxRate-t)+","+2*e+" C"+(e-this.dimensions.pxRate-t)+","+(e+t)+" "+(e-this.dimensions.pxRate-t)+","+(e+t)+" 0,"+(e+t))}
                  ${this.htmlWriter.writeCircleAndLine("generation_to_battery_entity","M"+(e-this.dimensions.pxRate)+",0 C"+(e-this.dimensions.pxRate)+",0 "+(e-this.dimensions.pxRate)+","+2*e+" "+(e-this.dimensions.pxRate)+","+2*e)}
                  ${this.htmlWriter.writeCircleAndLine("battery_to_house_entity","M"+(e-this.dimensions.pxRate+t)+","+2*e+" C"+(e-this.dimensions.pxRate+t)+","+(e+t)+" "+(e-this.dimensions.pxRate+t)+","+(e+t)+" "+2*e+","+(e+t))}
                </svg>
              </div>

              ${this.writeHouseIconBubble()}
              ${this.writeApplianceIconBubble(1)}
              ${this.htmlWriter.writeAppliancePowerLineAndCircle(1,"M5,"+i+" C5,"+i+" 5,0 5,0",i,n,this.dimensions.pxRate)}
              ${this.writeApplianceIconBubble(2)}
              ${this.htmlWriter.writeAppliancePowerLineAndCircle(2,"M5,0 C5,0 5,"+(i-n)+" 5,"+(i-n),i,n,this.dimensions.pxRate)}
            </div>
          </div>
          <div class="acc_bottom">${this.writeBatteryIconBubble()}</div>
        </div>
      </ha-card>
    `}writeGenerationIconBubble(){const t=this.calculateIconBubbleData(["generation_to_grid_entity","generation_to_house_entity","generation_to_battery_entity"],"generation_entity","generation_extra_entity");return t.cssSelector="acc_top",t.icon=this.config.generation_icon,this.htmlWriter.writeBatteryBubbleDiv(t)}writeGridIconBubble(){const t=this.calculateIconBubbleData(["-generation_to_grid_entity","grid_to_house_entity","-battery_to_grid_entity","grid_to_battery_entity"],"grid_entity","grid_extra_entity");return t.cssSelector="acc_left",t.icon=this.config.grid_icon,this.htmlWriter.writeBatteryBubbleDiv(t)}writeHouseIconBubble(){let t;t=this.config.house_without_appliances_values?["generation_to_house_entity","grid_to_house_entity","battery_to_house_entity","-appliance1_consumption_entity","-appliance2_consumption_entity"]:["generation_to_house_entity","grid_to_house_entity","battery_to_house_entity"];const e=this.calculateIconBubbleData(t,"house_entity","house_extra_entity");return e.cssSelector="acc_right",e.icon=this.config.house_icon,this.htmlWriter.writeBatteryBubbleDiv(e)}writeBatteryIconBubble(){const t=this.calculateIconBubbleData(["generation_to_battery_entity","grid_to_battery_entity","-battery_to_house_entity","-battery_to_grid_entity"],"battery_entity","battery_extra_entity");return t.cssSelector="acc_bottom",t.icon=this.config.battery_icon,this.htmlWriter.writeBatteryBubbleDiv(t)}writeApplianceIconBubble(t){const e=["appliance"+t+"_consumption_entity"],i=this.calculateIconBubbleData(e,"appliance"+t+"_consumption_entity","appliance"+t+"_extra_entity");i.cssSelector="acc_appliance"+t,i.icon=this.config["appliance"+t+"_icon"];let n="right:"+2*this.dimensions.pxRate+"px";return n+=1==t?";top: "+2*this.dimensions.pxRate+"px":";bottom: "+2*this.dimensions.pxRate+"px",this.htmlWriter.writeBatteryBubbleDiv(i,n)}calculateIconBubbleData(t,e=null,i=null){let n=!1;const s=new rt;if(s.clickEntitySlot=e,t.forEach((t=>{"-"===t.substring(0,1)&&(t=t.substring(1),n=!0);const e=this.solarCardElements.get(t);null!==e&&void 0!==(null==e?void 0:e.value)&&(s.noEntitiesWithValueFound=!1,s.mainValue=n?s.mainValue-(null==e?void 0:e.value):s.mainValue+(null==e?void 0:e.value),s.mainValue=(100*s.mainValue|0)/100,s.mainUnitOfMeasurement=null==e?void 0:e.unitOfMeasurement),n=!1})),null!==i){const t=this.solarCardElements.get(i);if(s.extraValue=null==t?void 0:t.value,s.extraUnitOfMeasurement=null==t?void 0:t.unitOfMeasurement,void 0!==(null==t?void 0:t.value)&&void 0!==(null==t?void 0:t.unitOfMeasurement)&&"wh"==t.unitOfMeasurement.toLowerCase()){let e=parseInt(t.value);Number.isNaN(e)||this.showKW(e)&&(e=this.roundValue(e/1e3),s.extraValue=e.toString(),s.extraUnitOfMeasurement="k"+s.extraUnitOfMeasurement)}}return null!==e&&(s.clickEntityHassState=this.hass.states[this.config[e]]),this.showKW(s.mainValue)&&(s.mainValue=this.roundValue(s.mainValue/1e3),s.mainUnitOfMeasurement="kW"),s}threeSigFigs(t){return t<1e3?parseFloat(t.toPrecision(3)):t}showKW(t){return!this.config.show_w_not_kw&&!(void 0!==this.config.threshold_in_k&&Math.abs(t)<1e3*this.config.threshold_in_k)}roundValue(t){let e;return e=t>.1?(0|Math.round(10*(t+Number.EPSILON)))/10:(0|Math.round(100*(t+Number.EPSILON)))/100,e=this.threeSigFigs(e),e}animateCircles(t){requestAnimationFrame((e=>{t.updateAllCircles(e)}))}updateAllCircles(t){this.solarCardElements.forEach(((e,i)=>{const n=this.solarCardElements.get(i);void 0!==n&&this.updateOneCircle(t,n)}))}updateOneCircle(t,e){if(null==this.shadowRoot)return;const i=this.shadowRoot.querySelector("#tesla-style-solar-power-card");if(null==i)return;if(e.line=i.querySelector("#"+e.entitySlot+"_line"),null===e.line)return;const n=e.line.getTotalLength();if(isNaN(n))return;if(e.circle=i.querySelector("#"+e.entitySlot+"_circle"),0===e.speed)return e.circle.setAttribute("visibility","hidden"),void(this.config.hide_inactive_lines&&e.line.setAttribute("visibility","hidden"));e.circle.setAttribute("visibility","visible"),this.config.hide_inactive_lines&&e.line.setAttribute("visibility","visible"),0===e.prevTimestamp&&(e.prevTimestamp=t,e.currentDelta=0),e.currentDelta+=Math.abs(e.speed)*(t-e.prevTimestamp);let s=e.currentDelta/n;e.speed>0?(s>=1||isNaN(s))&&(e.currentDelta=0,s=.01):(s=1-s,(s<=0||isNaN(s))&&(e.currentDelta=0,s=1));const o=e.line.getPointAtLength(n*s);e.circle.setAttributeNS(null,"cx",o.x.toString()),e.circle.setAttributeNS(null,"cy",o.y.toString()),e.prevTimestamp=t}colourHouseBubbleDependingOnHighestInput(){if(null==this.shadowRoot)return;const t=this.shadowRoot.querySelector("#tesla-style-solar-power-card");if(null==t)return;let e=null,i="";switch(["generation_to_house_entity","grid_to_house_entity","battery_to_house_entity"].forEach((t=>{const n=this.solarCardElements.get(t);null!==n&&void 0!==(null==n?void 0:n.value)&&(null==e||(null==n?void 0:n.value)>e.value)&&(i=t,e=n)})),i){case"generation_to_house_entity":this.colourBubble(".house_entity",t,"warning"),this.colourBubble(".appliance1_consumption_entity",t,"warning"),this.colourBubble(".appliance2_consumption_entity",t,"warning"),this.colourLineAndCircle("#appliance1_consumption_entity",t,"warning"),this.colourLineAndCircle("#appliance2_consumption_entity",t,"warning");break;case"battery_to_house_entity":this.colourBubble(".house_entity",t,"success"),this.colourBubble(".appliance1_consumption_entity",t,"success"),this.colourBubble(".appliance2_consumption_entity",t,"success"),this.colourLineAndCircle("#appliance1_consumption_entity",t,"success"),this.colourLineAndCircle("#appliance2_consumption_entity",t,"success");break;case"grid_to_house_entity":this.colourBubble(".house_entity",t,"info"),this.colourBubble(".appliance1_consumption_entity",t,"info"),this.colourBubble(".appliance2_consumption_entity",t,"info"),this.colourLineAndCircle("#appliance1_consumption_entity",t,"info"),this.colourLineAndCircle("#appliance2_consumption_entity",t,"info")}}colourBubble(t,e,i){const n=e.querySelector(t);null!==n&&(n.style.color="var(--"+i+"-color)",n.style.border="1px solid var(--"+i+"-color)")}colourLineAndCircle(t,e,i){const n=e.querySelector(t+"_line"),s=e.querySelector(t+"_circle");null!==n&&(n.style.stroke="var(--"+i+"-color)",s.style.fill="var(--"+i+"-color)")}setEnergyFlowDiagramm(){if(null==this.shadowRoot)return;const t=this.shadowRoot.querySelector("#tesla-style-solar-power-card");null!=t&&this.solarCardElements.forEach(((e,i)=>{const n=this.solarCardElements.get(i);let s=1;if(null==t)return;const o=t.querySelector("#"+i+"_line");if(null!=o&&void 0!==n){t.querySelector("#"+i+"_circle").style.visibility="hidden",void 0===this.config.energy_flow_diagramm_lines_factor&&(this.config.energy_flow_diagramm_lines_factor=2),s="W"===(null==n?void 0:n.unitOfMeasurement.toUpperCase())?Math.floor((null==n?void 0:n.value)/100)/10*this.config.energy_flow_diagramm_lines_factor:Math.floor(10*(null==n?void 0:n.value))/10*this.config.energy_flow_diagramm_lines_factor,s<=.1&&0!==s&&(s=.1),o.style.strokeWidth=s+"px"}}))}redraw(t){this.hass&&this.config&&"resize"===t.type&&(this.oldWidth=lt.changeStylesDependingOnWidth(this,this.solarCardElements,this.clientWidth,this.oldWidth))}_showWarning(t){return U` <hui-warning>${t}</hui-warning> `}_showError(){return console.log(this.error),U`
      <hui-warning
        ><div>
          ERROR:<br />
          ${this.error}
        </div></hui-warning
      >
    `}static get styles(){return r`
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
    `}}t([nt({attribute:!1})],ht.prototype,"hass",void 0),t([nt()],ht.prototype,"config",void 0),t([nt({attribute:!1})],ht.prototype,"solarCardElements",void 0),t([nt()],ht.prototype,"oldWidth",void 0),t([nt({type:String})],ht.prototype,"title",void 0),t([nt({type:Number})],ht.prototype,"counter",void 0),window.customElements.define("tesla-style-solar-power-card",ht)}();
