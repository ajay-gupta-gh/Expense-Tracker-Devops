import{r as u,a as xe,u as Q,L as me,B as ge,R as he,b as z,c as fe}from"./vendor-DyZJ2TT3.js";import{a as ye}from"./utils-DhXgJQ-f.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function a(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(r){if(r.ep)return;r.ep=!0;const n=a(r);fetch(r.href,n)}})();var ee={exports:{}},F={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var be=u,ve=Symbol.for("react.element"),je=Symbol.for("react.fragment"),Ne=Object.prototype.hasOwnProperty,we=be.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,ke={key:!0,ref:!0,__self:!0,__source:!0};function te(e,s,a){var o,r={},n=null,i=null;a!==void 0&&(n=""+a),s.key!==void 0&&(n=""+s.key),s.ref!==void 0&&(i=s.ref);for(o in s)Ne.call(s,o)&&!ke.hasOwnProperty(o)&&(r[o]=s[o]);if(e&&e.defaultProps)for(o in s=e.defaultProps,s)r[o]===void 0&&(r[o]=s[o]);return{$$typeof:ve,type:e,key:n,ref:i,props:r,_owner:we.current}}F.Fragment=je;F.jsx=te;F.jsxs=te;ee.exports=F;var t=ee.exports,H={},K=xe;H.createRoot=K.createRoot,H.hydrateRoot=K.hydrateRoot;let Ce={data:""},Ee=e=>{if(typeof window=="object"){let s=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return s.nonce=window.__nonce__,s.parentNode||(e||document.head).appendChild(s),s.firstChild}return e||Ce},_e=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,Se=/\/\*[^]*?\*\/|  +/g,X=/\n+/g,_=(e,s)=>{let a="",o="",r="";for(let n in e){let i=e[n];n[0]=="@"?n[1]=="i"?a=n+" "+i+";":o+=n[1]=="f"?_(i,n):n+"{"+_(i,n[1]=="k"?"":s)+"}":typeof i=="object"?o+=_(i,s?s.replace(/([^,])+/g,p=>n.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,d=>/&/.test(d)?d.replace(/&/g,p):p?p+" "+d:d)):n):i!=null&&(n=n[1]=="-"?n:n.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=_.p?_.p(n,i):n+":"+i+";")}return a+(s&&r?s+"{"+r+"}":r)+o},E={},se=e=>{if(typeof e=="object"){let s="";for(let a in e)s+=a+se(e[a]);return s}return e},Oe=(e,s,a,o,r)=>{let n=se(e),i=E[n]||(E[n]=(d=>{let c=0,l=11;for(;c<d.length;)l=101*l+d.charCodeAt(c++)>>>0;return"go"+l})(n));if(!E[i]){let d=n!==e?e:(c=>{let l,x,g=[{}];for(;l=_e.exec(c.replace(Se,""));)l[4]?g.shift():l[3]?(x=l[3].replace(X," ").trim(),g.unshift(g[0][x]=g[0][x]||{})):g[0][l[1]]=l[2].replace(X," ").trim();return g[0]})(e);E[i]=_(r?{["@keyframes "+i]:d}:d,a?"":"."+i)}let p=a&&E.g;return a&&(E.g=E[i]),((d,c,l,x)=>{x?c.data=c.data.replace(x,d):c.data.indexOf(d)===-1&&(c.data=l?d+c.data:c.data+d)})(E[i],s,o,p),i},$e=(e,s,a)=>e.reduce((o,r,n)=>{let i=s[n];if(i&&i.call){let p=i(a),d=p&&p.props&&p.props.className||/^go/.test(p)&&p;i=d?"."+d:p&&typeof p=="object"?p.props?"":_(p,""):p===!1?"":p}return o+r+(i??"")},"");function U(e){let s=this||{},a=e.call?e(s.p):e;return Oe(a.unshift?a.raw?$e(a,[].slice.call(arguments,1),s.p):a.reduce((o,r)=>Object.assign(o,r&&r.call?r(s.p):r),{}):a,Ee(s.target),s.g,s.o,s.k)}let ae,V,W;U.bind({g:1});let w=U.bind({k:1});function Ae(e,s,a,o){_.p=s,ae=e,V=a,W=o}function S(e,s){let a=this||{};return function(){let o=arguments;function r(n,i){let p=Object.assign({},n),d=p.className||r.className;a.p=Object.assign({theme:V&&V()},p),a.o=/go\d/.test(d),p.className=U.apply(a,o)+(d?" "+d:"");let c=e;return e[0]&&(c=p.as||e,delete p.as),W&&c[0]&&W(p),ae(c,p)}return r}}var Le=e=>typeof e=="function",T=(e,s)=>Le(e)?e(s):e,Ie=(()=>{let e=0;return()=>(++e).toString()})(),re=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let s=matchMedia("(prefers-reduced-motion: reduce)");e=!s||s.matches}return e}})(),De=20,G="default",oe=(e,s)=>{let{toastLimit:a}=e.settings;switch(s.type){case 0:return{...e,toasts:[s.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(i=>i.id===s.toast.id?{...i,...s.toast}:i)};case 2:let{toast:o}=s;return oe(e,{type:e.toasts.find(i=>i.id===o.id)?1:0,toast:o});case 3:let{toastId:r}=s;return{...e,toasts:e.toasts.map(i=>i.id===r||r===void 0?{...i,dismissed:!0,visible:!1}:i)};case 4:return s.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(i=>i.id!==s.toastId)};case 5:return{...e,pausedAt:s.time};case 6:let n=s.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(i=>({...i,pauseDuration:i.pauseDuration+n}))}}},M=[],ie={toasts:[],pausedAt:void 0,settings:{toastLimit:De}},N={},ne=(e,s=G)=>{N[s]=oe(N[s]||ie,e),M.forEach(([a,o])=>{a===s&&o(N[s])})},le=e=>Object.keys(N).forEach(s=>ne(e,s)),Re=e=>Object.keys(N).find(s=>N[s].toasts.some(a=>a.id===e)),q=(e=G)=>s=>{ne(s,e)},ze={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},Pe=(e={},s=G)=>{let[a,o]=u.useState(N[s]||ie),r=u.useRef(N[s]);u.useEffect(()=>(r.current!==N[s]&&o(N[s]),M.push([s,o]),()=>{let i=M.findIndex(([p])=>p===s);i>-1&&M.splice(i,1)}),[s]);let n=a.toasts.map(i=>{var p,d,c;return{...e,...e[i.type],...i,removeDelay:i.removeDelay||((p=e[i.type])==null?void 0:p.removeDelay)||(e==null?void 0:e.removeDelay),duration:i.duration||((d=e[i.type])==null?void 0:d.duration)||(e==null?void 0:e.duration)||ze[i.type],style:{...e.style,...(c=e[i.type])==null?void 0:c.style,...i.style}}});return{...a,toasts:n}},Me=(e,s="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:s,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(a==null?void 0:a.id)||Ie()}),D=e=>(s,a)=>{let o=Me(s,e,a);return q(o.toasterId||Re(o.id))({type:2,toast:o}),o.id},y=(e,s)=>D("blank")(e,s);y.error=D("error");y.success=D("success");y.loading=D("loading");y.custom=D("custom");y.dismiss=(e,s)=>{let a={type:3,toastId:e};s?q(s)(a):le(a)};y.dismissAll=e=>y.dismiss(void 0,e);y.remove=(e,s)=>{let a={type:4,toastId:e};s?q(s)(a):le(a)};y.removeAll=e=>y.remove(void 0,e);y.promise=(e,s,a)=>{let o=y.loading(s.loading,{...a,...a==null?void 0:a.loading});return typeof e=="function"&&(e=e()),e.then(r=>{let n=s.success?T(s.success,r):void 0;return n?y.success(n,{id:o,...a,...a==null?void 0:a.success}):y.dismiss(o),r}).catch(r=>{let n=s.error?T(s.error,r):void 0;n?y.error(n,{id:o,...a,...a==null?void 0:a.error}):y.dismiss(o)}),e};var Te=1e3,Fe=(e,s="default")=>{let{toasts:a,pausedAt:o}=Pe(e,s),r=u.useRef(new Map).current,n=u.useCallback((x,g=Te)=>{if(r.has(x))return;let f=setTimeout(()=>{r.delete(x),i({type:4,toastId:x})},g);r.set(x,f)},[]);u.useEffect(()=>{if(o)return;let x=Date.now(),g=a.map(f=>{if(f.duration===1/0)return;let k=(f.duration||0)+f.pauseDuration-(x-f.createdAt);if(k<0){f.visible&&y.dismiss(f.id);return}return setTimeout(()=>y.dismiss(f.id,s),k)});return()=>{g.forEach(f=>f&&clearTimeout(f))}},[a,o,s]);let i=u.useCallback(q(s),[s]),p=u.useCallback(()=>{i({type:5,time:Date.now()})},[i]),d=u.useCallback((x,g)=>{i({type:1,toast:{id:x,height:g}})},[i]),c=u.useCallback(()=>{o&&i({type:6,time:Date.now()})},[o,i]),l=u.useCallback((x,g)=>{let{reverseOrder:f=!1,gutter:k=8,defaultPosition:R}=g||{},A=a.filter(m=>(m.position||R)===(x.position||R)&&m.height),B=A.findIndex(m=>m.id===x.id),L=A.filter((m,C)=>C<B&&m.visible).length;return A.filter(m=>m.visible).slice(...f?[L+1]:[0,L]).reduce((m,C)=>m+(C.height||0)+k,0)},[a]);return u.useEffect(()=>{a.forEach(x=>{if(x.dismissed)n(x.id,x.removeDelay);else{let g=r.get(x.id);g&&(clearTimeout(g),r.delete(x.id))}})},[a,n]),{toasts:a,handlers:{updateHeight:d,startPause:p,endPause:c,calculateOffset:l}}},Ue=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,qe=w`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Be=w`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,He=S("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Ue} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${qe} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${Be} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Ve=w`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,We=S("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Ve} 1s linear infinite;
`,Ge=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Ze=w`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,Je=S("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Ge} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Ze} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,Ke=S("div")`
  position: absolute;
`,Xe=S("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Ye=w`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Qe=S("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Ye} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,et=({toast:e})=>{let{icon:s,type:a,iconTheme:o}=e;return s!==void 0?typeof s=="string"?u.createElement(Qe,null,s):s:a==="blank"?null:u.createElement(Xe,null,u.createElement(We,{...o}),a!=="loading"&&u.createElement(Ke,null,a==="error"?u.createElement(He,{...o}):u.createElement(Je,{...o})))},tt=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,st=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,at="0%{opacity:0;} 100%{opacity:1;}",rt="0%{opacity:1;} 100%{opacity:0;}",ot=S("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,it=S("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,nt=(e,s)=>{let a=e.includes("top")?1:-1,[o,r]=re()?[at,rt]:[tt(a),st(a)];return{animation:s?`${w(o)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${w(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},lt=u.memo(({toast:e,position:s,style:a,children:o})=>{let r=e.height?nt(e.position||s||"top-center",e.visible):{opacity:0},n=u.createElement(et,{toast:e}),i=u.createElement(it,{...e.ariaProps},T(e.message,e));return u.createElement(ot,{className:e.className,style:{...r,...a,...e.style}},typeof o=="function"?o({icon:n,message:i}):u.createElement(u.Fragment,null,n,i))});Ae(u.createElement);var dt=({id:e,className:s,style:a,onHeightUpdate:o,children:r})=>{let n=u.useCallback(i=>{if(i){let p=()=>{let d=i.getBoundingClientRect().height;o(e,d)};p(),new MutationObserver(p).observe(i,{subtree:!0,childList:!0,characterData:!0})}},[e,o]);return u.createElement("div",{ref:n,className:s,style:a},r)},ct=(e,s)=>{let a=e.includes("top"),o=a?{top:0}:{bottom:0},r=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:re()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${s*(a?1:-1)}px)`,...o,...r}},ut=U`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,P=16,pt=({reverseOrder:e,position:s="top-center",toastOptions:a,gutter:o,children:r,toasterId:n,containerStyle:i,containerClassName:p})=>{let{toasts:d,handlers:c}=Fe(a,n);return u.createElement("div",{"data-rht-toaster":n||"",style:{position:"fixed",zIndex:9999,top:P,left:P,right:P,bottom:P,pointerEvents:"none",...i},className:p,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(l=>{let x=l.position||s,g=c.calculateOffset(l,{reverseOrder:e,gutter:o,defaultPosition:s}),f=ct(x,g);return u.createElement(dt,{id:l.id,key:l.id,onHeightUpdate:c.updateHeight,className:l.visible?ut:"",style:f},l.type==="custom"?T(l.message,l):r?r(l):u.createElement(lt,{toast:l,position:x}))}))},v=y;const O={DEBUG:0,INFO:1,WARN:2,ERROR:3};class xt{constructor(s="expense-tracker-frontend"){this.serviceName=s,this.logLevel=this.getLogLevel()}getLogLevel(){return O["INFO"]??O.INFO}generateCorrelationId(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,s=>{const a=Math.floor(Math.random()*16);return(s==="x"?a:a&3|8).toString(16)})}formatLog(s,a,o={}){return JSON.stringify({timestamp:new Date().toISOString(),level:s,service:this.serviceName,message:a,correlation_id:this.getCorrelationId(),...o})}getCorrelationId(){return window.__correlationId||(window.__correlationId=this.generateCorrelationId())}setCorrelationId(s){window.__correlationId=s}debug(s,a={}){this.logLevel<=O.DEBUG&&console.debug(this.formatLog("DEBUG",s,a))}info(s,a={}){this.logLevel<=O.INFO&&console.info(this.formatLog("INFO",s,a))}warn(s,a={}){this.logLevel<=O.WARN&&console.warn(this.formatLog("WARN",s,a))}error(s,a={}){this.logLevel<=O.ERROR&&console.error(this.formatLog("ERROR",s,a))}logApiCall(s,a,o,r,n){this.info("API Call",{type:"api_call",method:s,endpoint:a,status:o,duration_ms:r,correlation_id:n})}logNavigation(s,a){this.info("Navigation",{type:"navigation",from:s,to:a,user_agent:navigator.userAgent.substring(0,100)})}logError(s,a={}){var o;this.error("Application Error",{type:"error",error_name:s.name,error_message:s.message,stack:(o=s.stack)==null?void 0:o.substring(0,500),...a})}}const h=new xt,mt=e=>{e.interceptors.request.use(s=>{var r;const a=h.getCorrelationId();s.headers["X-Correlation-ID"]=a;const o=Date.now();return s.metadata={startTime:o,correlationId:a},h.debug("API Request",{method:(r=s.method)==null?void 0:r.toUpperCase(),url:s.url,correlation_id:a}),s},s=>(h.logError(s,{context:"api_request_error"}),Promise.reject(s))),e.interceptors.response.use(s=>{var o;const a=Date.now()-s.config.metadata.startTime;return h.logApiCall((o=s.config.method)==null?void 0:o.toUpperCase(),s.config.url,s.status,a,s.config.metadata.correlationId),s},s=>{var o,r,n,i,p,d,c,l;const a=(r=(o=s.config)==null?void 0:o.metadata)!=null&&r.startTime?Date.now()-s.config.metadata.startTime:0;return h.logApiCall(((i=(n=s.config)==null?void 0:n.method)==null?void 0:i.toUpperCase())||"UNKNOWN",((p=s.config)==null?void 0:p.url)||"unknown",((d=s.response)==null?void 0:d.status)||0,a,(l=(c=s.config)==null?void 0:c.metadata)==null?void 0:l.correlationId),h.logError(s,{context:"api_response_error"}),Promise.reject(s)})};/**
 * @license lucide-react v0.330.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var gt={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.330.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ht=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),j=(e,s)=>{const a=u.forwardRef(({color:o="currentColor",size:r=24,strokeWidth:n=2,absoluteStrokeWidth:i,className:p="",children:d,...c},l)=>u.createElement("svg",{ref:l,...gt,width:r,height:r,stroke:o,strokeWidth:i?Number(n)*24/Number(r):n,className:["lucide",`lucide-${ht(e)}`,p].join(" "),...c},[...s.map(([x,g])=>u.createElement(x,g)),...Array.isArray(d)?d:[d]]));return a.displayName=`${e}`,a};/**
 * @license lucide-react v0.330.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ft=j("DollarSign",[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]]);/**
 * @license lucide-react v0.330.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yt=j("Home",[["path",{d:"m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"y5dka4"}],["polyline",{points:"9 22 9 12 15 12 15 22",key:"e2us08"}]]);/**
 * @license lucide-react v0.330.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bt=j("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.330.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const de=j("Pen",[["path",{d:"M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z",key:"5qss01"}]]);/**
 * @license lucide-react v0.330.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ce=j("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.330.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ue=j("Receipt",[["path",{d:"M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z",key:"q3az6g"}],["path",{d:"M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8",key:"1h4pet"}],["path",{d:"M12 17.5v-11",key:"1jc1ny"}]]);/**
 * @license lucide-react v0.330.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vt=j("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.330.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jt=j("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.330.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nt=j("Tag",[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",key:"vktsd0"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor",key:"kqv944"}]]);/**
 * @license lucide-react v0.330.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pe=j("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.330.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y=j("TrendingUp",[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]]);/**
 * @license lucide-react v0.330.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z=j("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),wt="/api/v1",b=ye.create({baseURL:wt,timeout:3e4,headers:{"Content-Type":"application/json"}});mt(b);b.interceptors.response.use(e=>{const s=e.headers["x-correlation-id"];return s&&h.setCorrelationId(s),e},e=>Promise.reject(e));const $={getAll:(e={})=>b.get("/expenses",{params:e}),getById:e=>b.get(`/expenses/${e}`),create:e=>b.post("/expenses",e),update:(e,s)=>b.put(`/expenses/${e}`,s),delete:e=>b.delete(`/expenses/${e}`),getStats:(e={})=>b.get("/expenses/stats",{params:e})},I={getAll:()=>b.get("/categories"),getById:e=>b.get(`/categories/${e}`),create:e=>b.post("/categories",e),update:(e,s)=>b.put(`/categories/${e}`,s),delete:e=>b.delete(`/categories/${e}`)},kt={check:()=>b.get("/health"),readiness:()=>b.get("/health/ready"),liveness:()=>b.get("/health/live")};function Ct(){var d,c;const[e,s]=u.useState(null),[a,o]=u.useState([]),[r,n]=u.useState(!0);u.useEffect(()=>{i()},[]);const i=async()=>{try{n(!0);const[l,x]=await Promise.all([$.getStats(),$.getAll({per_page:5,sort_by:"date",order:"desc"})]);s(l.data.stats),o(x.data.expenses),h.info("Dashboard data loaded")}catch(l){h.logError(l,{context:"dashboard_load"}),v.error("Failed to load dashboard data")}finally{n(!1)}};if(r)return t.jsx("div",{className:"flex items-center justify-center h-64",children:t.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"})});const p=[{label:"Total Expenses",value:`$${((d=e==null?void 0:e.total_amount)==null?void 0:d.toFixed(2))||"0.00"}`,icon:ft,color:"bg-indigo-500",trend:(e==null?void 0:e.total_count)||0},{label:"This Month",value:`$${((e==null?void 0:e.total_amount)*.35).toFixed(2)||"0.00"}`,icon:Y,color:"bg-green-500",trend:"+12%"},{label:"Average Expense",value:`$${((c=e==null?void 0:e.average_amount)==null?void 0:c.toFixed(2))||"0.00"}`,icon:ue,color:"bg-orange-500",trend:null}];return t.jsxs("div",{className:"space-y-6",children:[t.jsx("h1",{className:"text-2xl font-bold text-gray-900",children:"Dashboard"}),t.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:p.map((l,x)=>t.jsx("div",{className:"bg-white rounded-xl shadow-sm p-6",children:t.jsxs("div",{className:"flex items-center justify-between",children:[t.jsxs("div",{children:[t.jsx("p",{className:"text-sm text-gray-500",children:l.label}),t.jsx("p",{className:"text-2xl font-bold text-gray-900 mt-1",children:l.value}),l.trend&&t.jsxs("p",{className:"text-sm text-green-600 mt-1 flex items-center gap-1",children:[t.jsx(Y,{size:14}),l.trend]})]}),t.jsx("div",{className:`${l.color} p-3 rounded-lg`,children:t.jsx(l.icon,{size:24,className:"text-white"})})]})},x))}),t.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-6",children:[t.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Recent Expenses"}),t.jsx("div",{className:"space-y-3",children:a.length===0?t.jsx("p",{className:"text-gray-500 text-center py-8",children:"No expenses yet"}):a.map(l=>{var x,g;return t.jsxs("div",{className:"flex items-center justify-between p-3 bg-gray-50 rounded-lg",children:[t.jsxs("div",{className:"flex items-center gap-3",children:[t.jsx("div",{className:"w-3 h-3 rounded-full",style:{backgroundColor:((x=l.category)==null?void 0:x.color)||"#6366f1"}}),t.jsxs("div",{children:[t.jsx("p",{className:"font-medium text-gray-900",children:l.title}),t.jsx("p",{className:"text-sm text-gray-500",children:(g=l.category)==null?void 0:g.name})]})]}),t.jsxs("p",{className:"font-semibold text-gray-900",children:["$",l.amount.toFixed(2)]})]},l.id)})})]})]})}function Et({expense:e,categories:s,onClose:a,onSuccess:o}){const[r,n]=u.useState({title:"",amount:"",description:"",date:new Date().toISOString().split("T")[0],category_id:"",payment_method:"card"}),[i,p]=u.useState(!1);u.useEffect(()=>{e&&n({title:e.title,amount:e.amount.toString(),description:e.description||"",date:e.date,category_id:e.category_id.toString(),payment_method:e.payment_method})},[e]);const d=async c=>{var l,x;c.preventDefault(),p(!0);try{const g={...r,amount:parseFloat(r.amount),category_id:parseInt(r.category_id),date:r.date};e?(await $.update(e.id,g),v.success("Expense updated"),h.info("Expense updated",{expense_id:e.id})):(await $.create(g),v.success("Expense created"),h.info("Expense created")),o()}catch(g){v.error(((x=(l=g.response)==null?void 0:l.data)==null?void 0:x.error)||"Operation failed"),h.logError(g,{context:"expense_save"})}finally{p(!1)}};return t.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",children:t.jsxs("div",{className:"bg-white rounded-xl w-full max-w-md mx-4",children:[t.jsxs("div",{className:"flex items-center justify-between p-4 border-b",children:[t.jsx("h2",{className:"text-lg font-semibold",children:e?"Edit Expense":"Add Expense"}),t.jsx("button",{onClick:a,className:"p-1 hover:bg-gray-100 rounded",children:t.jsx(Z,{size:20})})]}),t.jsxs("form",{onSubmit:d,className:"p-4 space-y-4",children:[t.jsxs("div",{children:[t.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Title"}),t.jsx("input",{type:"text",required:!0,className:"w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500",value:r.title,onChange:c=>n({...r,title:c.target.value})})]}),t.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[t.jsxs("div",{children:[t.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Amount ($)"}),t.jsx("input",{type:"number",step:"0.01",required:!0,className:"w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500",value:r.amount,onChange:c=>n({...r,amount:c.target.value})})]}),t.jsxs("div",{children:[t.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Date"}),t.jsx("input",{type:"date",required:!0,className:"w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500",value:r.date,onChange:c=>n({...r,date:c.target.value})})]})]}),t.jsxs("div",{children:[t.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Category"}),t.jsxs("select",{required:!0,className:"w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500",value:r.category_id,onChange:c=>n({...r,category_id:c.target.value}),children:[t.jsx("option",{value:"",children:"Select category"}),s.map(c=>t.jsx("option",{value:c.id,children:c.name},c.id))]})]}),t.jsxs("div",{children:[t.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Payment Method"}),t.jsxs("select",{className:"w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500",value:r.payment_method,onChange:c=>n({...r,payment_method:c.target.value}),children:[t.jsx("option",{value:"cash",children:"Cash"}),t.jsx("option",{value:"card",children:"Card"}),t.jsx("option",{value:"bank_transfer",children:"Bank Transfer"}),t.jsx("option",{value:"digital_wallet",children:"Digital Wallet"})]})]}),t.jsxs("div",{children:[t.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Description (optional)"}),t.jsx("textarea",{rows:3,className:"w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500",value:r.description,onChange:c=>n({...r,description:c.target.value})})]}),t.jsxs("div",{className:"flex gap-3 pt-2",children:[t.jsx("button",{type:"button",onClick:a,className:"flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50",children:"Cancel"}),t.jsx("button",{type:"submit",disabled:i,className:"flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50",children:i?"Saving...":e?"Update":"Create"})]})]})]})})}function _t(){const[e,s]=u.useState([]),[a,o]=u.useState([]),[r,n]=u.useState({}),[i,p]=u.useState(!0),[d,c]=u.useState(!1),[l,x]=u.useState(null),[g,f]=u.useState({search:"",category_id:"",per_page:10});u.useEffect(()=>{k(),R()},[g]);const k=async()=>{try{p(!0);const m=await $.getAll(g);s(m.data.expenses),n(m.data.pagination),h.info("Expenses loaded",{count:m.data.expenses.length})}catch(m){h.logError(m,{context:"expenses_load"}),v.error("Failed to load expenses")}finally{p(!1)}},R=async()=>{try{const m=await I.getAll();o(m.data.categories)}catch(m){h.logError(m,{context:"categories_load"})}},A=async m=>{if(confirm("Are you sure you want to delete this expense?"))try{await $.delete(m),v.success("Expense deleted"),h.info("Expense deleted",{expense_id:m}),k()}catch(C){h.logError(C,{context:"expense_delete"}),v.error("Failed to delete expense")}},B=m=>{x(m),c(!0)},L=()=>{c(!1),x(null)};return t.jsxs("div",{className:"space-y-6",children:[t.jsxs("div",{className:"flex items-center justify-between",children:[t.jsx("h1",{className:"text-2xl font-bold text-gray-900",children:"Expenses"}),t.jsxs("button",{onClick:()=>c(!0),className:"flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700",children:[t.jsx(ce,{size:20}),"Add Expense"]})]}),t.jsx("div",{className:"bg-white rounded-xl shadow-sm p-4",children:t.jsxs("div",{className:"flex flex-wrap gap-4",children:[t.jsx("div",{className:"flex-1 min-w-[200px]",children:t.jsxs("div",{className:"relative",children:[t.jsx(vt,{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-400",size:20}),t.jsx("input",{type:"text",placeholder:"Search expenses...",className:"w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",value:g.search,onChange:m=>f({...g,search:m.target.value})})]})}),t.jsxs("select",{className:"px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500",value:g.category_id,onChange:m=>f({...g,category_id:m.target.value}),children:[t.jsx("option",{value:"",children:"All Categories"}),a.map(m=>t.jsx("option",{value:m.id,children:m.name},m.id))]})]})}),t.jsxs("div",{className:"bg-white rounded-xl shadow-sm overflow-hidden",children:[t.jsxs("table",{className:"w-full",children:[t.jsx("thead",{className:"bg-gray-50",children:t.jsxs("tr",{children:[t.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase",children:"Date"}),t.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase",children:"Title"}),t.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase",children:"Category"}),t.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase",children:"Amount"}),t.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase",children:"Payment"}),t.jsx("th",{className:"px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase",children:"Actions"})]})}),t.jsx("tbody",{className:"divide-y divide-gray-200",children:i?t.jsx("tr",{children:t.jsx("td",{colSpan:6,className:"px-6 py-8 text-center",children:t.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"})})}):e.length===0?t.jsx("tr",{children:t.jsx("td",{colSpan:6,className:"px-6 py-8 text-center text-gray-500",children:"No expenses found"})}):e.map(m=>{var C,J;return t.jsxs("tr",{className:"hover:bg-gray-50",children:[t.jsx("td",{className:"px-6 py-4 text-sm text-gray-900",children:m.date}),t.jsx("td",{className:"px-6 py-4 text-sm font-medium text-gray-900",children:m.title}),t.jsx("td",{className:"px-6 py-4",children:t.jsx("span",{className:"px-2 py-1 text-xs rounded-full text-white",style:{backgroundColor:(C=m.category)==null?void 0:C.color},children:(J=m.category)==null?void 0:J.name})}),t.jsxs("td",{className:"px-6 py-4 text-sm font-semibold text-gray-900",children:["$",m.amount.toFixed(2)]}),t.jsx("td",{className:"px-6 py-4 text-sm text-gray-500",children:m.payment_method}),t.jsxs("td",{className:"px-6 py-4 text-right",children:[t.jsx("button",{onClick:()=>B(m),className:"p-1 text-indigo-600 hover:bg-indigo-50 rounded",children:t.jsx(de,{size:16})}),t.jsx("button",{onClick:()=>A(m.id),className:"p-1 text-red-600 hover:bg-red-50 rounded ml-2",children:t.jsx(pe,{size:16})})]})]},m.id)})})]}),r.pages>1&&t.jsxs("div",{className:"px-6 py-4 border-t flex items-center justify-between",children:[t.jsxs("p",{className:"text-sm text-gray-500",children:["Showing ",(r.page-1)*r.per_page+1," to ",Math.min(r.page*r.per_page,r.total)," of ",r.total]}),t.jsxs("div",{className:"flex gap-2",children:[t.jsx("button",{disabled:!r.has_prev,onClick:()=>f({...g,page:r.page-1}),className:"px-3 py-1 border rounded disabled:opacity-50",children:"Previous"}),t.jsx("button",{disabled:!r.has_next,onClick:()=>f({...g,page:r.page+1}),className:"px-3 py-1 border rounded disabled:opacity-50",children:"Next"})]})]})]}),d&&t.jsx(Et,{expense:l,categories:a,onClose:L,onSuccess:()=>{L(),k()}})]})}const St=["#ff5722","#2196f3","#9c27b0","#e91e63","#ff9800","#4caf50","#3f51b5","#607d8b"];function Ot({category:e,onClose:s,onSuccess:a}){const[o,r]=u.useState({name:"",description:"",color:"#6366f1"}),[n,i]=u.useState(!1);u.useEffect(()=>{e&&r({name:e.name,description:e.description||"",color:e.color})},[e]);const p=async d=>{var c,l;d.preventDefault(),i(!0);try{e?(await I.update(e.id,o),v.success("Category updated"),h.info("Category updated",{category_id:e.id})):(await I.create(o),v.success("Category created"),h.info("Category created")),a()}catch(x){v.error(((l=(c=x.response)==null?void 0:c.data)==null?void 0:l.error)||"Operation failed"),h.logError(x,{context:"category_save"})}finally{i(!1)}};return t.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",children:t.jsxs("div",{className:"bg-white rounded-xl w-full max-w-md mx-4",children:[t.jsxs("div",{className:"flex items-center justify-between p-4 border-b",children:[t.jsx("h2",{className:"text-lg font-semibold",children:e?"Edit Category":"Add Category"}),t.jsx("button",{onClick:s,className:"p-1 hover:bg-gray-100 rounded",children:t.jsx(Z,{size:20})})]}),t.jsxs("form",{onSubmit:p,className:"p-4 space-y-4",children:[t.jsxs("div",{children:[t.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Name"}),t.jsx("input",{type:"text",required:!0,className:"w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500",value:o.name,onChange:d=>r({...o,name:d.target.value})})]}),t.jsxs("div",{children:[t.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Description (optional)"}),t.jsx("textarea",{rows:2,className:"w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500",value:o.description,onChange:d=>r({...o,description:d.target.value})})]}),t.jsxs("div",{children:[t.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Color"}),t.jsx("div",{className:"flex gap-2 flex-wrap",children:St.map(d=>t.jsx("button",{type:"button",onClick:()=>r({...o,color:d}),className:`w-8 h-8 rounded-full border-2 transition-transform ${o.color===d?"scale-110 border-gray-900":"border-transparent"}`,style:{backgroundColor:d}},d))}),t.jsx("input",{type:"color",className:"w-full mt-2 h-10 cursor-pointer",value:o.color,onChange:d=>r({...o,color:d.target.value})})]}),t.jsxs("div",{className:"flex gap-3 pt-2",children:[t.jsx("button",{type:"button",onClick:s,className:"flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50",children:"Cancel"}),t.jsx("button",{type:"submit",disabled:n,className:"flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50",children:n?"Saving...":e?"Update":"Create"})]})]})]})})}function $t(){const[e,s]=u.useState([]),[a,o]=u.useState(!0),[r,n]=u.useState(!1),[i,p]=u.useState(null);u.useEffect(()=>{d()},[]);const d=async()=>{try{o(!0);const l=await I.getAll();s(l.data.categories),h.info("Categories loaded",{count:l.data.categories.length})}catch(l){h.logError(l,{context:"categories_load"}),v.error("Failed to load categories")}finally{o(!1)}},c=async l=>{var x,g;if(confirm("Are you sure? Categories with expenses cannot be deleted."))try{await I.delete(l),v.success("Category deleted"),h.info("Category deleted",{category_id:l}),d()}catch(f){v.error(((g=(x=f.response)==null?void 0:x.data)==null?void 0:g.error)||"Failed to delete category"),h.logError(f,{context:"category_delete"})}};return t.jsxs("div",{className:"space-y-6",children:[t.jsxs("div",{className:"flex items-center justify-between",children:[t.jsx("h1",{className:"text-2xl font-bold text-gray-900",children:"Categories"}),t.jsxs("button",{onClick:()=>n(!0),className:"flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700",children:[t.jsx(ce,{size:20}),"Add Category"]})]}),t.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:a?t.jsx("div",{className:"col-span-full flex justify-center py-8",children:t.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"})}):e.map(l=>t.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-6",children:[t.jsxs("div",{className:"flex items-start justify-between",children:[t.jsxs("div",{className:"flex items-center gap-3",children:[t.jsxs("div",{className:"w-10 h-10 rounded-lg flex items-center justify-center text-white text-xl",style:{backgroundColor:l.color},children:[l.icon==="restaurant"&&"🍽️",l.icon==="directions_car"&&"🚗",l.icon==="shopping_cart"&&"🛒",l.icon==="movie"&&"🎬",l.icon==="receipt"&&"📄",l.icon==="local_hospital"&&"🏥",l.icon==="school"&&"📚",!["restaurant","directions_car","shopping_cart","movie","receipt","local_hospital","school"].includes(l.icon)&&"📁"]}),t.jsxs("div",{children:[t.jsx("h3",{className:"font-semibold text-gray-900",children:l.name}),t.jsxs("p",{className:"text-sm text-gray-500",children:[l.expense_count," expenses"]})]})]}),t.jsxs("div",{className:"flex gap-1",children:[t.jsx("button",{onClick:()=>{p(l),n(!0)},className:"p-1 text-gray-400 hover:text-indigo-600",children:t.jsx(de,{size:16})}),t.jsx("button",{onClick:()=>c(l.id),className:"p-1 text-gray-400 hover:text-red-600",children:t.jsx(pe,{size:16})})]})]}),l.description&&t.jsx("p",{className:"mt-3 text-sm text-gray-500",children:l.description}),t.jsx("div",{className:"mt-4 h-2 rounded-full",style:{backgroundColor:l.color,opacity:.3}})]},l.id))}),r&&t.jsx(Ot,{category:i,onClose:()=>{n(!1),p(null)},onSuccess:()=>{n(!1),p(null),d()}})]})}function At(){return t.jsxs("div",{className:"space-y-6",children:[t.jsx("h1",{className:"text-2xl font-bold text-gray-900",children:"Settings"}),t.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-6",children:[t.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Application Information"}),t.jsxs("div",{className:"space-y-3",children:[t.jsxs("div",{className:"flex justify-between py-2 border-b",children:[t.jsx("span",{className:"text-gray-500",children:"Version"}),t.jsx("span",{className:"font-medium",children:"1.0.0"})]}),t.jsxs("div",{className:"flex justify-between py-2 border-b",children:[t.jsx("span",{className:"text-gray-500",children:"Environment"}),t.jsx("span",{className:"font-medium",children:"production"})]}),t.jsxs("div",{className:"flex justify-between py-2 border-b",children:[t.jsx("span",{className:"text-gray-500",children:"API URL"}),t.jsx("span",{className:"font-medium text-sm",children:"/api/v1"})]})]})]}),t.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-6",children:[t.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Log Configuration"}),t.jsx("p",{className:"text-sm text-gray-500 mb-4",children:"Console logging is enabled. Logs are formatted as JSON for container log aggregation."}),t.jsx("button",{onClick:()=>console.log(JSON.stringify({timestamp:new Date().toISOString(),level:"INFO",service:"expense-tracker-frontend",message:"Test log entry from settings page"})),className:"px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700",children:"Generate Test Log"})]})]})}function Lt({children:e}){const[s,a]=u.useState(!1),[o,r]=u.useState("checking"),n=Q();u.useEffect(()=>{i();const d=setInterval(i,3e4);return()=>clearInterval(d)},[]);const i=async()=>{try{await kt.check(),r("healthy"),h.debug("Backend health check passed")}catch{r("unhealthy"),h.warn("Backend health check failed")}},p=[{path:"/",icon:yt,label:"Dashboard"},{path:"/expenses",icon:ue,label:"Expenses"},{path:"/categories",icon:Nt,label:"Categories"},{path:"/settings",icon:jt,label:"Settings"}];return t.jsxs("div",{className:"min-h-screen bg-gray-50 flex",children:[t.jsx("button",{onClick:()=>a(!s),className:"lg:hidden fixed top-4 left-4 z-50 p-2 bg-indigo-600 text-white rounded-lg shadow-lg",children:s?t.jsx(Z,{size:20}):t.jsx(bt,{size:20})}),t.jsx("aside",{className:`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-indigo-700 text-white transform transition-transform duration-300 ease-in-out
        ${s?"translate-x-0":"-translate-x-full lg:translate-x-0"}
      `,children:t.jsxs("div",{className:"h-full flex flex-col",children:[t.jsxs("div",{className:"p-6 border-b border-indigo-600",children:[t.jsxs("h1",{className:"text-xl font-bold flex items-center gap-2",children:[t.jsx("span",{className:"text-2xl",children:"💰"}),"Expense Tracker"]}),t.jsx("p",{className:"text-xs text-indigo-300 mt-1",children:"v1.0.0"})]}),t.jsx("nav",{className:"flex-1 p-4 space-y-1",children:p.map(({path:d,icon:c,label:l})=>t.jsxs(me,{to:d,onClick:()=>a(!1),className:`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${n.pathname===d?"bg-indigo-800 text-white":"text-indigo-200 hover:bg-indigo-600 hover:text-white"}
                `,children:[t.jsx(c,{size:20}),t.jsx("span",{children:l})]},d))}),t.jsx("div",{className:"p-4 border-t border-indigo-600",children:t.jsxs("div",{className:"flex items-center gap-2 text-sm",children:[t.jsx("span",{className:`w-2 h-2 rounded-full ${o==="healthy"?"bg-green-400":o==="unhealthy"?"bg-red-400":"bg-yellow-400"}`}),t.jsxs("span",{className:"text-indigo-200",children:["Backend: ",o]})]})})]})}),t.jsx("main",{className:"flex-1 p-4 lg:p-8 overflow-auto",children:t.jsx("div",{className:"max-w-7xl mx-auto",children:e})})]})}function It({children:e}){const s=Q();return u.useEffect(()=>{h.logNavigation(s.pathname,s.pathname)},[s]),e}function Dt(){return u.useEffect(()=>{h.info("Application mounted",{version:"1.0.0",environment:"production"})},[]),t.jsx(ge,{children:t.jsxs(It,{children:[t.jsx(Lt,{children:t.jsxs(he,{children:[t.jsx(z,{path:"/",element:t.jsx(Ct,{})}),t.jsx(z,{path:"/expenses",element:t.jsx(_t,{})}),t.jsx(z,{path:"/categories",element:t.jsx($t,{})}),t.jsx(z,{path:"/settings",element:t.jsx(At,{})})]})}),t.jsx(pt,{position:"top-right",toastOptions:{duration:4e3,style:{background:"#363636",color:"#fff"}}})]})})}H.createRoot(document.getElementById("root")).render(t.jsx(fe.StrictMode,{children:t.jsx(Dt,{})}));
//# sourceMappingURL=index-DVBEvnEU.js.map
