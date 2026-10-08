var e=`runData`,t=null,n=0,r=null;function i(){let e=crypto.getRandomValues(new Uint8Array(8));return Array.from(e,e=>e.toString(16).padStart(2,`0`)).join(``)}var a=!1;function o(){try{return localStorage.getItem(e)!==`off`}catch{return a}}function s(t){a=t;try{t?localStorage.removeItem(e):localStorage.setItem(e,`off`)}catch{return}}function c(e,a,o){let s=performance.now();n++,t={id:i(),n,gap:r===null?null:Math.round((s-r)/1e3),exp:e,view:a,start:s,last:0,keyboard:o===!0,touch:o===!1,ev:``}}function l(e){if(t===null)return;let n=Math.round((performance.now()-t.start)/10);t.ev+=n-t.last+e,t.last=n}function u(e){l(e[0].toUpperCase())}function d(e,t){l(e[0]+(t?``:`x`))}function f(e){l(e?`F`:`P`)}function p(){l(`p`)}function m(){l(`Z`)}function ee(e){t!==null&&(e?t.keyboard=!0:t.touch=!0)}function h(e,n){if(!o())return;let r=JSON.stringify({v:2,build:`feecaa6`,run:t.id,n:t.n,gap:t.gap,end:e,score:n,in:(t.keyboard?`k`:``)+(t.touch?`t`:``),exp:t.exp,view:t.view,ev:t.ev});fetch(`https://arrow-hero-runs.agraziani.workers.dev/run`,{method:`POST`,body:r,mode:`no-cors`,credentials:`omit`,keepalive:r.length<6e4}).catch(()=>null)}function g(e){t!==null&&(h(`dead`,e),r=performance.now(),t=null)}function _(e){t!==null&&h(`hidden`,e)}var v=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="-24 -24 48 48">
  <path d="M-16 11 0-7 16 11" fill="none" stroke="currentColor" stroke-width="11" stroke-miterlimit="10"/>
</svg>
`,y=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 74 74">
  <g class="sel-body">
    <g class="sel-plate">
      <rect class="sel-core" x="4" y="4" width="66" height="66"/>
      <path class="sel-life-track" d="M37 2H72V72H2V2Z" pathLength="100"/>
      <path class="sel-life-chunk" d="M37 2H72V72H2V2Z" pathLength="100"/>
      <path class="sel-life-band" d="M37 2H72V72H2V2Z" pathLength="100"/>
    </g>
    <g transform="translate(37 37)">
      <g class="sel-glyph">
        <path class="sel-glyph-base" d="M-18.66 13.99 0-7 18.66 13.99"/>
        <path class="sel-glyph-shape" d="M-16 11 0-7 16 11"/>
      </g>
    </g>
  </g>
</svg>
`,te=new DOMParser().parseFromString(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="-30 -30 60 60">
  <path class="key-base" d="M-17.99 13.24 0-7 17.99 13.24" fill="none" stroke="#000" stroke-width="17" stroke-miterlimit="10"/>
  <path class="key-shape" d="M-16 11 0-7 16 11" fill="none" stroke="currentColor" stroke-width="11" stroke-miterlimit="10"/>
</svg>
`,`image/svg+xml`),ne=new DOMParser().parseFromString(v,`image/svg+xml`),re=new DOMParser().parseFromString(y,`image/svg+xml`);function ie(e){return Number(e)===1?`point`:`points`}function ae(e,t,n){t.forEach(t=>e.addEventListener(t,n))}function oe(){try{return localStorage.getItem(`bestScore`)}catch{return null}}function se(e){try{localStorage.setItem(`bestScore`,e)}catch{return}}document.addEventListener(`DOMContentLoaded`,()=>{let e=0,t=document.querySelectorAll(`.points`),n=`key-`,r=document.querySelector(`.keys-container`),i=document.querySelector(`.fullscreen-container`),a=document.querySelector(`.container`),l=document.querySelector(`.key-selector`),h=[{score:0,speed:800,message:``,points:1,keys:1},{score:3,speed:750,message:`You've got it!`,points:2,keys:2},{score:20,speed:670,message:`Keep going!`,points:5,keys:3},{score:70,speed:620,message:`You're doing great!`,points:7,keys:3},{score:150,speed:560,message:`You rock!`,points:10,keys:3},{score:300,speed:510,message:`Don't stop!`,points:12,keys:4},{score:500,speed:490,message:`Tricky!`,points:15,keys:4},{score:760,speed:465,message:`Great!`,points:17,keys:4},{score:1100,speed:440,message:`I like your style!`,points:20,keys:4},{score:1500,speed:390,message:`Awesome!`,points:22,keys:4},{score:2e3,speed:360,message:`Yeah!!`,points:25,keys:4},{score:2700,speed:330,message:`How do you do that?`,points:27,keys:4},{score:3500,speed:310,message:`...how?`,points:30,keys:4},{score:4300,speed:290,message:`Don't ever stop!!`,points:32,keys:4},{score:5500,speed:280,message:`I'm really impressed.`,points:35,keys:4},{score:7e3,speed:270,message:`Arrow hero!`,points:40,keys:4},{score:1e4,speed:260,message:`You're really still here?`,points:40,keys:4},{score:10500,speed:250,message:`That's incredible!`,points:40,keys:4}],v=h[0],y=!1,b=5e3,x=b,S=[],C=oe(),ce=document.querySelector(`.mobile-controls`),le=window.matchMedia(`(max-width: 480px)`),w=!1,T=[`left`,`up`,`right`,`down`];document.querySelectorAll(`.about .key-up`).forEach(e=>e.appendChild(ne.childNodes[0].cloneNode(!0))),l.appendChild(re.childNodes[0].cloneNode(!0)),T.forEach(e=>document.querySelector(`.mobile-controls .key-`+e).appendChild(te.childNodes[0].cloneNode(!0)));function ue(n){n<1&&(n=1),n=Math.floor(n),e+=n,fe(`seat`),ye(),t.forEach(e=>{e.classList.add(`bump`),e.onanimationend=()=>{e.classList.remove(`bump`)}});let r=document.createElement(`div`);r.classList.add(`ding`),r.textContent=`+${n}`,r.onanimationend=()=>{r.remove()},l.appendChild(r)}let de={"selector-seat":`seat`,"selector-shake":`bad`,"selector-punch":`punch`,"life-heartbeat":`heal`};l.addEventListener(`animationend`,e=>{l.contains(e.target)&&de[e.animationName]&&l.classList.remove(de[e.animationName])});function fe(e){l.classList.remove(e),l.getBoundingClientRect(),l.classList.add(e)}let E=document.querySelector(`.shutter`),D=null;function O(e,t){D&&D(),D=e,E.classList.remove(`cover`,`uncover`),E.getBoundingClientRect(),E.classList.add(`cover`),E.onanimationend=()=>{D=null,e(),E.classList.replace(`cover`,`uncover`),E.onanimationend=()=>{E.classList.remove(`uncover`),t&&t()}}}let pe=l.querySelector(`.sel-life-band`),k=l.querySelector(`.sel-life-chunk`),A=b,j=b,M=0,me=0,he=performance.now();function ge(e){let t=Math.max(0,x);M<=0&&j<=t+1&&(j=t),M=.45,x-=e}function _e(e){let t=performance.now();x<b&&t-me>=300&&(me=t,fe(`heal`)),x=Math.min(x+e,b)}function ve(e){let t=Math.min(.05,(e-he)/1e3);he=e;let n=Math.max(0,x);A+=(n-A)*Math.min(1,t*45),n>=j?j=A:M>0?M-=t:j=Math.max(n,j-b*.5*t);let r=A*100/b;pe.style.strokeDasharray=`${r} 100`,k.style.strokeDasharray=`${(j-A)*100/b} 100`,k.style.strokeDashoffset=-r,requestAnimationFrame(ve)}requestAnimationFrame(ve);function ye(){t.forEach(t=>t.textContent=e),document.querySelectorAll(`.points + .points-label`).forEach(t=>t.textContent=ie(e))}function be(){document.querySelector(`.best-points .value`).textContent=C,document.querySelector(`.best-points .points-label`).textContent=ie(C),document.querySelector(`.best`).style.display=`block`}let N=document.querySelector(`.level-message`);function P(){let t=v;for(let t in h){let n=h[t];if(e>=n.score)v=n;else if(e<n.score)break}v.speed!==t.speed&&(N.textContent=v.message,N.classList.add(`show`),N.onanimationend=()=>{N.classList.remove(`show`)})}function F(e){if(y!==`paused`&&Se(e),y===`end`||y===`paused`||y===`restart`)return;let t=[`key-right`,`key-left`,`key-down`,`key-up`][Math.floor(Math.random()*v.keys)],i=r.querySelector(`.idle`);i===null?(i=document.createElement(`div`),i.appendChild(te.childNodes[0].cloneNode(!0)),i.classList.add(`key`,t),i.onanimationend=()=>{if(y===`end`||y===`restart`||i.classList.contains(`idle`))return;let e=i.classList.contains(n);d(T.find(e=>i.classList.contains(`key-`+e)),e),e?(_e(200),ue(v.points)):(ge(1e3),fe(`bad`)),P(),x<=0&&y===`running`&&we(),i.classList.add(`idle`),i.classList.remove(`key-up`,`key-down`,`key-left`,`key-right`)},r.appendChild(i)):(i.classList.remove(`idle`),i.classList.add(t)),xe(v.speed)}function xe(e){let t={delay:e,started:new Date().getTime()};t.interval=setTimeout(F,e,t),S.push(t)}function Se(e){let t=S.indexOf(e);t>-1&&S.splice(t,1)}function I(){let e=new Date;for(let t in S){let n=S[t];n.delay-=e.getTime()-n.started,n.started=null,clearInterval(n.interval)}}function Ce(){let e=new Date;for(let t in S){let n=S[t];n.started=e.getTime(),n.interval=setTimeout(F,n.delay,n)}}function we(){y=`end`,g(e),document.querySelector(`.pause-btn`).textContent=`Restart`,document.querySelectorAll(`.key`).forEach(e=>e.classList.add(`paused`)),setTimeout(()=>{y===`end`&&O(()=>{document.querySelectorAll(`.key`).forEach(e=>e.classList.add(`hide`));let e=document.querySelector(`.key-selector-container`);e.classList.add(`hide`),e.classList.remove(`show`);let t=document.querySelector(`.results`);t.classList.add(`show`),t.classList.remove(`hide`);let n=document.querySelector(`.points-container`);n.classList.add(`hide`),n.classList.remove(`show`)})},250),e>C&&(C=e,se(C),be())}function Te(){y=`restart`,e=0,b=5e3,x=b,v=h[0],n!==``&&l.classList.remove(`s-`+n),n=``,O(()=>{r.querySelectorAll(`.key`).forEach(e=>{e.classList.remove(`key-up`,`key-down`,`key-left`,`key-right`,`hide`,`paused`),e.classList.add(`idle`)});let e=document.querySelector(`.key-selector-container`);e.classList.add(`show`),e.classList.remove(`hide`);let t=document.querySelector(`.results`);t.classList.add(`hide`),t.classList.remove(`show`);let n=document.querySelector(`.points-container`);n.classList.add(`show`),n.classList.remove(`hide`);for(let e in S){let t=S[e];clearInterval(t.interval)}S=[],ye()},()=>{y=`running`,R(),document.querySelector(`.pause-btn`).textContent=`Pause`,xe(1),document.hasFocus()||Oe()})}function Ee(){document.fullscreenElement===null?i.requestFullscreen&&i.requestFullscreen():document.exitFullscreen&&document.exitFullscreen()}function De(){let e=a.offsetHeight;document.documentElement.style.setProperty(`--scale-factor`,e/390)}document.onfullscreenchange=()=>{document.fullscreenElement===null?i.classList.remove(`is-fullscreen`):i.classList.add(`is-fullscreen`),setTimeout(De,100)},window.onresize=De;function Oe(){y===`running`&&(w=!0,document.dispatchEvent(new KeyboardEvent(`keydown`,{keyCode:32})),w=!1)}document.body.onblur=Oe,document.onkeydown=e=>{if(e.key===`F11`&&(Ee(),e.preventDefault()),e.keyCode===32&&(e.preventDefault(),y===`running`||y===`paused`?(y=y===`running`?`paused`:`running`,document.querySelectorAll(`.key`).forEach(e=>e.classList.toggle(`paused`,y===`paused`)),document.querySelector(`.pause`).classList.toggle(`show`,y===`paused`),y===`paused`?(I(),f(w)):x<=0?we():(Ce(),p())):y===`end`&&Te()),[37,38,39,40,72,74,75,76].includes(e.keyCode)&&y!==`paused`&&y!==`restart`){e.preventDefault(),y===!1&&ke(e.isTrusted),ee(e.isTrusted);let t=n;switch(n!==``&&l.classList.remove(`s-`+n),e.keyCode){case 37:case 72:n=`key-left`;break;case 38:case 75:n=`key-up`;break;case 39:case 76:n=`key-right`;break;case 40:case 74:n=`key-down`}l.classList.add(`s-`+n),n!==t&&(u(n.replace(`key-`,``)),fe(`punch`))}};function ke(e){y=`running`,R(e),O(()=>{document.querySelector(`.points-container`).classList.add(`show`),document.querySelector(`.helper-container`).classList.add(`hide`),document.querySelector(`.track`).classList.add(`show`),document.querySelector(`.key-selector`).classList.add(`show`),xe(1)})}function L(e){let t=0;return h.forEach((n,r)=>{e>=n.score&&(t=r)}),t}function R(e){let t=Number(C),n=C===null||Number.isNaN(t)?null:L(t),r=le.matches?`mobile`:`normal`;i.classList.contains(`is-fullscreen`)&&(r=`full`),c(n,r,e)}C&&be();function z(e,t){ae(ce.querySelector(e),[`touchstart`,`click`],()=>{document.dispatchEvent(new KeyboardEvent(`keydown`,{keyCode:t}))})}z(`.key-left`,37),z(`.key-up`,38),z(`.key-right`,39),z(`.key-down`,40),ae(ce.querySelector(`.pause-btn`),[`click`,`touchstart`],e=>{e.preventDefault(),document.dispatchEvent(new KeyboardEvent(`keydown`,{keyCode:32}))}),window.location.search.includes(`fullscreen`)&&i.classList.add(`is-fullscreen`),document.getElementById(`toggle-fullscreen`).addEventListener(`click`,Ee),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`hidden`&&_(e)}),le.addEventListener(`change`,m);let Ae=document.querySelector(`.run-data-status`),je=document.getElementById(`toggle-run-data`),Me=Ae.textContent;function Ne(){let e=o();Ae.textContent=e?Me:`Run recording is off.`,je.textContent=e?`Turn off`:`Turn on`}je.addEventListener(`click`,()=>{s(!o()),Ne()}),Ne(),De()});
/*!
* Font Awesome Free 7.3.1 by @fontawesome - https://fontawesome.com
* License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
* Copyright 2026 Fonticons, Inc.
*/
function b(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function x(e){if(Array.isArray(e))return e}function S(e){if(Array.isArray(e))return b(e)}function C(e,t){if(!(e instanceof t))throw TypeError(`Cannot call a class as a function`)}function ce(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,`value`in r&&(r.writable=!0),Object.defineProperty(e,j(r.key),r)}}function le(e,t,n){return t&&ce(e.prototype,t),n&&ce(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function w(e,t){var n=typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(!n){if(Array.isArray(e)||(n=me(e))||t&&e&&typeof e.length==`number`){n&&(e=n);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var a,o=!0,s=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return o=e.done,e},e:function(e){s=!0,a=e},f:function(){try{o||n.return==null||n.return()}finally{if(s)throw a}}}}function T(e,t,n){return(t=j(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ue(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function de(e,t){var n=e==null?null:typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(n!=null){var r,i,a,o,s=[],c=!0,l=!1;try{if(a=(n=n.call(e)).next,t===0){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=a.call(n)).done)&&(s.push(r.value),s.length!==t);c=!0);}catch(e){l=!0,i=e}finally{try{if(!c&&n.return!=null&&(o=n.return(),Object(o)!==o))return}finally{if(l)throw i}}return s}}function fe(){throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function E(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function D(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function O(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?D(Object(n),!0).forEach(function(t){T(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):D(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function pe(e,t){return x(e)||de(e,t)||me(e,t)||fe()}function k(e){return S(e)||ue(e)||me(e)||E()}function A(e,t){if(typeof e!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(typeof r!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function j(e){var t=A(e,`string`);return typeof t==`symbol`?t:t+``}function M(e){"@babel/helpers - typeof";return M=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},M(e)}function me(e,t){if(e){if(typeof e==`string`)return b(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?b(e,t):void 0}}var he=function(){},ge={},_e={},ve=null,ye={mark:he,measure:he};try{typeof window<`u`&&(ge=window),typeof document<`u`&&(_e=document),typeof MutationObserver<`u`&&(ve=MutationObserver),typeof performance<`u`&&(ye=performance)}catch{}var be=(ge.navigator||{}).userAgent,N=be===void 0?``:be,P=ge,F=_e,xe=ve,Se=ye;P.document;var I=!!F.documentElement&&!!F.head&&typeof F.addEventListener==`function`&&typeof F.createElement==`function`,Ce=~N.indexOf(`MSIE`)||~N.indexOf(`Trident/`),we,Te=/fa(k|kd|s|r|l|t|d|dr|dl|dt|b|slr|slpr|wsb|tl|ns|nds|es|gt|jr|jfr|jdr|usb|ufsb|udsb|cr|ss|sr|sl|st|sds|sdr|sdl|sdt|sldr|slpdr|pr|ms|vs)?[\-\ ]/,Ee=/Font ?Awesome ?([567 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit|Notdog Duo|Notdog|Chisel|Etch|Graphite|Thumbprint|Jelly Fill|Jelly Duo|Jelly|Utility|Utility Fill|Utility Duo|Slab Press|Slab|Slab Duo|Slab Press Duo|Pixel|Mosaic|Vellum|Whiteboard)?.*/i,De={classic:{fa:`solid`,fas:`solid`,"fa-solid":`solid`,far:`regular`,"fa-regular":`regular`,fal:`light`,"fa-light":`light`,fat:`thin`,"fa-thin":`thin`,fab:`brands`,"fa-brands":`brands`},duotone:{fa:`solid`,fad:`solid`,"fa-solid":`solid`,"fa-duotone":`solid`,fadr:`regular`,"fa-regular":`regular`,fadl:`light`,"fa-light":`light`,fadt:`thin`,"fa-thin":`thin`},sharp:{fa:`solid`,fass:`solid`,"fa-solid":`solid`,fasr:`regular`,"fa-regular":`regular`,fasl:`light`,"fa-light":`light`,fast:`thin`,"fa-thin":`thin`},"sharp-duotone":{fa:`solid`,fasds:`solid`,"fa-solid":`solid`,fasdr:`regular`,"fa-regular":`regular`,fasdl:`light`,"fa-light":`light`,fasdt:`thin`,"fa-thin":`thin`},slab:{"fa-regular":`regular`,faslr:`regular`},"slab-press":{"fa-regular":`regular`,faslpr:`regular`},"slab-duo":{"fa-regular":`regular`,fasldr:`regular`},"slab-press-duo":{"fa-regular":`regular`,faslpdr:`regular`},thumbprint:{"fa-light":`light`,fatl:`light`},vellum:{"fa-solid":`solid`,favs:`solid`},pixel:{"fa-regular":`regular`,fapr:`regular`},mosaic:{"fa-solid":`solid`,fams:`solid`},whiteboard:{"fa-semibold":`semibold`,fawsb:`semibold`},notdog:{"fa-solid":`solid`,fans:`solid`},"notdog-duo":{"fa-solid":`solid`,fands:`solid`},etch:{"fa-solid":`solid`,faes:`solid`},graphite:{"fa-thin":`thin`,fagt:`thin`},jelly:{"fa-regular":`regular`,fajr:`regular`},"jelly-fill":{"fa-regular":`regular`,fajfr:`regular`},"jelly-duo":{"fa-regular":`regular`,fajdr:`regular`},chisel:{"fa-regular":`regular`,facr:`regular`},utility:{"fa-semibold":`semibold`,fausb:`semibold`},"utility-duo":{"fa-semibold":`semibold`,faudsb:`semibold`},"utility-fill":{"fa-semibold":`semibold`,faufsb:`semibold`}},Oe={GROUP:`duotone-group`,SWAP_OPACITY:`swap-opacity`,PRIMARY:`primary`,SECONDARY:`secondary`},ke=[`fa-classic`,`fa-duotone`,`fa-sharp`,`fa-sharp-duotone`,`fa-thumbprint`,`fa-whiteboard`,`fa-notdog`,`fa-notdog-duo`,`fa-chisel`,`fa-etch`,`fa-graphite`,`fa-jelly`,`fa-jelly-fill`,`fa-jelly-duo`,`fa-slab`,`fa-slab-press`,`fa-slab-press-duo`,`fa-slab-duo`,`fa-mosaic`,`fa-pixel`,`fa-vellum`,`fa-utility`,`fa-utility-duo`,`fa-utility-fill`],L=`classic`,R=`duotone`,z=`sharp`,Ae=`sharp-duotone`,je=`chisel`,Me=`etch`,Ne=`graphite`,Pe=`jelly`,Fe=`jelly-duo`,Ie=`jelly-fill`,Le=`mosaic`,Re=`notdog`,ze=`notdog-duo`,Be=`pixel`,Ve=`slab`,He=`slab-duo`,Ue=`slab-press`,We=`slab-press-duo`,Ge=`thumbprint`,Ke=`utility`,qe=`utility-duo`,Je=`utility-fill`,Ye=`vellum`,Xe=`whiteboard`,Ze=`Classic`,Qe=`Duotone`,$e=`Sharp`,et=`Sharp Duotone`,tt=`Chisel`,nt=`Etch`,rt=`Graphite`,it=`Jelly`,at=`Jelly Duo`,ot=`Jelly Fill`,st=`Mosaic`,ct=`Notdog`,lt=`Notdog Duo`,ut=`Pixel`,dt=`Slab`,ft=`Slab Duo`,pt=`Slab Press`,mt=`Slab Press Duo`,ht=`Thumbprint`,gt=`Utility`,_t=`Utility Duo`,vt=`Utility Fill`,yt=`Vellum`,bt=`Whiteboard`,xt=[L,R,z,Ae,je,Me,Ne,Pe,Fe,Ie,Le,Re,ze,Be,Ve,He,Ue,We,Ge,Ke,qe,Je,Ye,Xe];we={},T(T(T(T(T(T(T(T(T(T(we,L,Ze),R,Qe),z,$e),Ae,et),je,tt),Me,nt),Ne,rt),Pe,it),Fe,at),Ie,ot),T(T(T(T(T(T(T(T(T(T(we,Le,st),Re,ct),ze,lt),Be,ut),Ve,dt),He,ft),Ue,pt),We,mt),Ge,ht),Ke,gt),T(T(T(T(we,qe,_t),Je,vt),Ye,yt),Xe,bt);var St={classic:{900:`fas`,400:`far`,normal:`far`,300:`fal`,100:`fat`},duotone:{900:`fad`,400:`fadr`,300:`fadl`,100:`fadt`},sharp:{900:`fass`,400:`fasr`,300:`fasl`,100:`fast`},"sharp-duotone":{900:`fasds`,400:`fasdr`,300:`fasdl`,100:`fasdt`},slab:{400:`faslr`},"slab-press":{400:`faslpr`},"slab-duo":{400:`fasldr`},"slab-press-duo":{400:`faslpdr`},vellum:{900:`favs`},mosaic:{900:`fams`},pixel:{400:`fapr`},whiteboard:{600:`fawsb`},thumbprint:{300:`fatl`},notdog:{900:`fans`},"notdog-duo":{900:`fands`},etch:{900:`faes`},graphite:{100:`fagt`},chisel:{400:`facr`},jelly:{400:`fajr`},"jelly-fill":{400:`fajfr`},"jelly-duo":{400:`fajdr`},utility:{600:`fausb`},"utility-duo":{600:`faudsb`},"utility-fill":{600:`faufsb`}},Ct={"Font Awesome 7 Free":{900:`fas`,400:`far`},"Font Awesome 7 Pro":{900:`fas`,400:`far`,normal:`far`,300:`fal`,100:`fat`},"Font Awesome 7 Brands":{400:`fab`,normal:`fab`},"Font Awesome 7 Duotone":{900:`fad`,400:`fadr`,normal:`fadr`,300:`fadl`,100:`fadt`},"Font Awesome 7 Sharp":{900:`fass`,400:`fasr`,normal:`fasr`,300:`fasl`,100:`fast`},"Font Awesome 7 Sharp Duotone":{900:`fasds`,400:`fasdr`,normal:`fasdr`,300:`fasdl`,100:`fasdt`},"Font Awesome 7 Jelly":{400:`fajr`,normal:`fajr`},"Font Awesome 7 Jelly Fill":{400:`fajfr`,normal:`fajfr`},"Font Awesome 7 Jelly Duo":{400:`fajdr`,normal:`fajdr`},"Font Awesome 7 Slab":{400:`faslr`,normal:`faslr`},"Font Awesome 7 Slab Press":{400:`faslpr`,normal:`faslpr`},"Font Awesome 7 Slab Duo":{400:`fasldr`,normal:`fasldr`},"Font Awesome 7 Slab Press Duo":{400:`faslpdr`,normal:`faslpdr`},"Font Awesome 7 Pixel":{400:`fapr`,normal:`fapr`},"Font Awesome 7 Mosaic":{900:`fams`,normal:`fams`},"Font Awesome 7 Vellum":{900:`favs`,normal:`favs`},"Font Awesome 7 Thumbprint":{300:`fatl`,normal:`fatl`},"Font Awesome 7 Notdog":{900:`fans`,normal:`fans`},"Font Awesome 7 Notdog Duo":{900:`fands`,normal:`fands`},"Font Awesome 7 Etch":{900:`faes`,normal:`faes`},"Font Awesome 7 Graphite":{100:`fagt`,normal:`fagt`},"Font Awesome 7 Chisel":{400:`facr`,normal:`facr`},"Font Awesome 7 Whiteboard":{600:`fawsb`,normal:`fawsb`},"Font Awesome 7 Utility":{600:`fausb`,normal:`fausb`},"Font Awesome 7 Utility Duo":{600:`faudsb`,normal:`faudsb`},"Font Awesome 7 Utility Fill":{600:`faufsb`,normal:`faufsb`}},wt=new Map([[`classic`,{defaultShortPrefixId:`fas`,defaultStyleId:`solid`,styleIds:[`solid`,`regular`,`light`,`thin`,`brands`],futureStyleIds:[],defaultFontWeight:900}],[`duotone`,{defaultShortPrefixId:`fad`,defaultStyleId:`solid`,styleIds:[`solid`,`regular`,`light`,`thin`],futureStyleIds:[],defaultFontWeight:900}],[`sharp`,{defaultShortPrefixId:`fass`,defaultStyleId:`solid`,styleIds:[`solid`,`regular`,`light`,`thin`],futureStyleIds:[],defaultFontWeight:900}],[`sharp-duotone`,{defaultShortPrefixId:`fasds`,defaultStyleId:`solid`,styleIds:[`solid`,`regular`,`light`,`thin`],futureStyleIds:[],defaultFontWeight:900}],[`chisel`,{defaultShortPrefixId:`facr`,defaultStyleId:`regular`,styleIds:[`regular`],futureStyleIds:[],defaultFontWeight:400}],[`etch`,{defaultShortPrefixId:`faes`,defaultStyleId:`solid`,styleIds:[`solid`],futureStyleIds:[],defaultFontWeight:900}],[`graphite`,{defaultShortPrefixId:`fagt`,defaultStyleId:`thin`,styleIds:[`thin`],futureStyleIds:[],defaultFontWeight:100}],[`jelly`,{defaultShortPrefixId:`fajr`,defaultStyleId:`regular`,styleIds:[`regular`],futureStyleIds:[],defaultFontWeight:400}],[`jelly-duo`,{defaultShortPrefixId:`fajdr`,defaultStyleId:`regular`,styleIds:[`regular`],futureStyleIds:[],defaultFontWeight:400}],[`jelly-fill`,{defaultShortPrefixId:`fajfr`,defaultStyleId:`regular`,styleIds:[`regular`],futureStyleIds:[],defaultFontWeight:400}],[`mosaic`,{defaultShortPrefixId:`fams`,defaultStyleId:`solid`,styleIds:[`solid`],futureStyleIds:[],defaultFontWeight:900}],[`notdog`,{defaultShortPrefixId:`fans`,defaultStyleId:`solid`,styleIds:[`solid`],futureStyleIds:[],defaultFontWeight:900}],[`notdog-duo`,{defaultShortPrefixId:`fands`,defaultStyleId:`solid`,styleIds:[`solid`],futureStyleIds:[],defaultFontWeight:900}],[`pixel`,{defaultShortPrefixId:`fapr`,defaultStyleId:`regular`,styleIds:[`regular`],futureStyleIds:[],defaultFontWeight:400}],[`slab`,{defaultShortPrefixId:`faslr`,defaultStyleId:`regular`,styleIds:[`regular`],futureStyleIds:[],defaultFontWeight:400}],[`slab-duo`,{defaultShortPrefixId:`fasldr`,defaultStyleId:`regular`,styleIds:[`regular`],futureStyleIds:[],defaultFontWeight:400}],[`slab-press`,{defaultShortPrefixId:`faslpr`,defaultStyleId:`regular`,styleIds:[`regular`],futureStyleIds:[],defaultFontWeight:400}],[`slab-press-duo`,{defaultShortPrefixId:`faslpdr`,defaultStyleId:`regular`,styleIds:[`regular`],futureStyleIds:[],defaultFontWeight:400}],[`thumbprint`,{defaultShortPrefixId:`fatl`,defaultStyleId:`light`,styleIds:[`light`],futureStyleIds:[],defaultFontWeight:300}],[`utility`,{defaultShortPrefixId:`fausb`,defaultStyleId:`semibold`,styleIds:[`semibold`],futureStyleIds:[],defaultFontWeight:600}],[`utility-duo`,{defaultShortPrefixId:`faudsb`,defaultStyleId:`semibold`,styleIds:[`semibold`],futureStyleIds:[],defaultFontWeight:600}],[`utility-fill`,{defaultShortPrefixId:`faufsb`,defaultStyleId:`semibold`,styleIds:[`semibold`],futureStyleIds:[],defaultFontWeight:600}],[`vellum`,{defaultShortPrefixId:`favs`,defaultStyleId:`solid`,styleIds:[`solid`],futureStyleIds:[],defaultFontWeight:900}],[`whiteboard`,{defaultShortPrefixId:`fawsb`,defaultStyleId:`semibold`,styleIds:[`semibold`],futureStyleIds:[],defaultFontWeight:600}]]),Tt={chisel:{regular:`facr`},classic:{brands:`fab`,light:`fal`,regular:`far`,solid:`fas`,thin:`fat`},duotone:{light:`fadl`,regular:`fadr`,solid:`fad`,thin:`fadt`},etch:{solid:`faes`},graphite:{thin:`fagt`},jelly:{regular:`fajr`},"jelly-duo":{regular:`fajdr`},"jelly-fill":{regular:`fajfr`},mosaic:{solid:`fams`},notdog:{solid:`fans`},"notdog-duo":{solid:`fands`},pixel:{regular:`fapr`},sharp:{light:`fasl`,regular:`fasr`,solid:`fass`,thin:`fast`},"sharp-duotone":{light:`fasdl`,regular:`fasdr`,solid:`fasds`,thin:`fasdt`},slab:{regular:`faslr`},"slab-duo":{regular:`fasldr`},"slab-press":{regular:`faslpr`},"slab-press-duo":{regular:`faslpdr`},thumbprint:{light:`fatl`},utility:{semibold:`fausb`},"utility-duo":{semibold:`faudsb`},"utility-fill":{semibold:`faufsb`},vellum:{solid:`favs`},whiteboard:{semibold:`fawsb`}},Et=[`fak`,`fa-kit`,`fakd`,`fa-kit-duotone`],Dt={kit:{fak:`kit`,"fa-kit":`kit`},"kit-duotone":{fakd:`kit-duotone`,"fa-kit-duotone":`kit-duotone`}},Ot=[`kit`];T(T({},`kit`,`Kit`),`kit-duotone`,`Kit Duotone`);var kt={kit:{"fa-kit":`fak`},"kit-duotone":{"fa-kit-duotone":`fakd`}},At={"Font Awesome Kit":{400:`fak`,normal:`fak`},"Font Awesome Kit Duotone":{400:`fakd`,normal:`fakd`}},jt={kit:{fak:`fa-kit`},"kit-duotone":{fakd:`fa-kit-duotone`}},Mt={kit:{kit:`fak`},"kit-duotone":{"kit-duotone":`fakd`}},Nt,Pt={GROUP:`duotone-group`,SWAP_OPACITY:`swap-opacity`,PRIMARY:`primary`,SECONDARY:`secondary`},Ft=[`fa-classic`,`fa-duotone`,`fa-sharp`,`fa-sharp-duotone`,`fa-thumbprint`,`fa-whiteboard`,`fa-notdog`,`fa-notdog-duo`,`fa-chisel`,`fa-etch`,`fa-graphite`,`fa-jelly`,`fa-jelly-fill`,`fa-jelly-duo`,`fa-slab`,`fa-slab-press`,`fa-slab-press-duo`,`fa-slab-duo`,`fa-mosaic`,`fa-pixel`,`fa-vellum`,`fa-utility`,`fa-utility-duo`,`fa-utility-fill`];Nt={},T(T(T(T(T(T(T(T(T(T(Nt,`classic`,`Classic`),`duotone`,`Duotone`),`sharp`,`Sharp`),`sharp-duotone`,`Sharp Duotone`),`chisel`,`Chisel`),`etch`,`Etch`),`graphite`,`Graphite`),`jelly`,`Jelly`),`jelly-duo`,`Jelly Duo`),`jelly-fill`,`Jelly Fill`),T(T(T(T(T(T(T(T(T(T(Nt,`mosaic`,`Mosaic`),`notdog`,`Notdog`),`notdog-duo`,`Notdog Duo`),`pixel`,`Pixel`),`slab`,`Slab`),`slab-duo`,`Slab Duo`),`slab-press`,`Slab Press`),`slab-press-duo`,`Slab Press Duo`),`thumbprint`,`Thumbprint`),`utility`,`Utility`),T(T(T(T(Nt,`utility-duo`,`Utility Duo`),`utility-fill`,`Utility Fill`),`vellum`,`Vellum`),`whiteboard`,`Whiteboard`),T(T({},`kit`,`Kit`),`kit-duotone`,`Kit Duotone`);var It={classic:{"fa-brands":`fab`,"fa-duotone":`fad`,"fa-light":`fal`,"fa-regular":`far`,"fa-solid":`fas`,"fa-thin":`fat`},duotone:{"fa-regular":`fadr`,"fa-light":`fadl`,"fa-thin":`fadt`},sharp:{"fa-solid":`fass`,"fa-regular":`fasr`,"fa-light":`fasl`,"fa-thin":`fast`},"sharp-duotone":{"fa-solid":`fasds`,"fa-regular":`fasdr`,"fa-light":`fasdl`,"fa-thin":`fasdt`},slab:{"fa-regular":`faslr`},"slab-press":{"fa-regular":`faslpr`},"slab-duo":{"fa-regular":`fasldr`},"slab-press-duo":{"fa-regular":`faslpdr`},pixel:{"fa-regular":`fapr`},mosaic:{"fa-solid":`fams`},vellum:{"fa-solid":`favs`},whiteboard:{"fa-semibold":`fawsb`},thumbprint:{"fa-light":`fatl`},notdog:{"fa-solid":`fans`},"notdog-duo":{"fa-solid":`fands`},etch:{"fa-solid":`faes`},graphite:{"fa-thin":`fagt`},jelly:{"fa-regular":`fajr`},"jelly-fill":{"fa-regular":`fajfr`},"jelly-duo":{"fa-regular":`fajdr`},chisel:{"fa-regular":`facr`},utility:{"fa-semibold":`fausb`},"utility-duo":{"fa-semibold":`faudsb`},"utility-fill":{"fa-semibold":`faufsb`}},Lt={classic:[`fas`,`far`,`fal`,`fat`,`fad`],duotone:[`fadr`,`fadl`,`fadt`],sharp:[`fass`,`fasr`,`fasl`,`fast`],"sharp-duotone":[`fasds`,`fasdr`,`fasdl`,`fasdt`],slab:[`faslr`],"slab-press":[`faslpr`],"slab-duo":[`fasldr`],"slab-press-duo":[`faslpdr`],pixel:[`fapr`],mosaic:[`fams`],vellum:[`favs`],whiteboard:[`fawsb`],thumbprint:[`fatl`],notdog:[`fans`],"notdog-duo":[`fands`],etch:[`faes`],graphite:[`fagt`],jelly:[`fajr`],"jelly-fill":[`fajfr`],"jelly-duo":[`fajdr`],chisel:[`facr`],utility:[`fausb`],"utility-duo":[`faudsb`],"utility-fill":[`faufsb`]},Rt={classic:{fab:`fa-brands`,fad:`fa-duotone`,fal:`fa-light`,far:`fa-regular`,fas:`fa-solid`,fat:`fa-thin`},duotone:{fadr:`fa-regular`,fadl:`fa-light`,fadt:`fa-thin`},sharp:{fass:`fa-solid`,fasr:`fa-regular`,fasl:`fa-light`,fast:`fa-thin`},"sharp-duotone":{fasds:`fa-solid`,fasdr:`fa-regular`,fasdl:`fa-light`,fasdt:`fa-thin`},slab:{faslr:`fa-regular`},"slab-press":{faslpr:`fa-regular`},"slab-duo":{fasldr:`fa-regular`},"slab-press-duo":{faslpdr:`fa-regular`},pixel:{fapr:`fa-regular`},mosaic:{fams:`fa-solid`},vellum:{favs:`fa-solid`},whiteboard:{fawsb:`fa-semibold`},thumbprint:{fatl:`fa-light`},notdog:{fans:`fa-solid`},"notdog-duo":{fands:`fa-solid`},etch:{faes:`fa-solid`},graphite:{fagt:`fa-thin`},jelly:{fajr:`fa-regular`},"jelly-fill":{fajfr:`fa-regular`},"jelly-duo":{fajdr:`fa-regular`},chisel:{facr:`fa-regular`},utility:{fausb:`fa-semibold`},"utility-duo":{faudsb:`fa-semibold`},"utility-fill":{faufsb:`fa-semibold`}},zt=`fa.fas.far.fal.fat.fad.fadr.fadl.fadt.fab.fass.fasr.fasl.fast.fasds.fasdr.fasdl.fasdt.faslr.faslpr.fasldr.faslpdr.fapr.fams.favs.fawsb.fatl.fans.fands.faes.fagt.fajr.fajfr.fajdr.facr.fausb.faudsb.faufsb`.split(`.`).concat(Ft,[`fa-solid`,`fa-regular`,`fa-light`,`fa-thin`,`fa-duotone`,`fa-brands`,`fa-semibold`]),Bt=[`solid`,`regular`,`light`,`thin`,`duotone`,`brands`,`semibold`],Vt=[1,2,3,4,5,6,7,8,9,10],Ht=Vt.concat([11,12,13,14,15,16,17,18,19,20]),Ut=[].concat(k(Object.keys(Lt)),Bt,[`aw`,`fw`,`pull-left`,`pull-right`],[`2xs`,`xs`,`sm`,`lg`,`xl`,`2xl`,`beat`,`beat-fade`,`border`,`bounce`,`buzz`,`canvas-square`,`canvas-roomy`,`fade`,`flip-360`,`flip-both`,`flip-horizontal`,`flip-vertical`,`flip`,`float`,`inverse`,`jello`,`layers`,`layers-bottom-left`,`layers-bottom-right`,`layers-counter`,`layers-text`,`layers-top-left`,`layers-top-right`,`li`,`pull-end`,`pull-start`,`pulse`,`rotate-180`,`rotate-270`,`rotate-90`,`rotate-by`,`shake`,`spin-pulse`,`spin-reverse`,`spin`,`spin-snap`,`spin-snap-4`,`spin-snap-8`,`stack-1x`,`stack-2x`,`stack`,`swing`,`ul`,`wag`,`width-auto`,`width-fixed`,Pt.GROUP,Pt.SWAP_OPACITY,Pt.PRIMARY,Pt.SECONDARY],Vt.map(function(e){return`${e}x`}),Ht.map(function(e){return`w-${e}`})),Wt={"Font Awesome 5 Free":{900:`fas`,400:`far`},"Font Awesome 5 Pro":{900:`fas`,400:`far`,normal:`far`,300:`fal`},"Font Awesome 5 Brands":{400:`fab`,normal:`fab`},"Font Awesome 5 Duotone":{900:`fad`}},B=`___FONT_AWESOME___`,Gt=16,Kt=`fa`,qt=`svg-inline--fa`,V=`data-fa-i2svg`,Jt=`data-fa-pseudo-element`,Yt=`data-fa-pseudo-element-pending`,Xt=`data-prefix`,Zt=`data-icon`,Qt=`fontawesome-i2svg`,$t=`async`,en=[`HTML`,`HEAD`,`STYLE`,`SCRIPT`],tn=[`::before`,`::after`,`:before`,`:after`],nn=function(){try{return!0}catch{return!1}}();function rn(e){return new Proxy(e,{get:function(e,t){return t in e?e[t]:e[L]}})}var an=O({},De);an[L]=O(O(O(O({},{"fa-duotone":`duotone`}),De[L]),Dt.kit),Dt[`kit-duotone`]);var on=rn(an),sn=O({},Tt);sn[L]=O(O(O(O({},{duotone:`fad`}),sn[L]),Mt.kit),Mt[`kit-duotone`]);var cn=rn(sn),ln=O({},Rt);ln[L]=O(O({},ln[L]),jt.kit);var un=rn(ln),dn=O({},It);dn[L]=O(O({},dn[L]),kt.kit),rn(dn);var fn=Te,pn=`fa-layers-text`,mn=Ee;rn(O({},St));var hn=[`class`,`data-prefix`,`data-icon`,`data-fa-transform`,`data-fa-mask`],gn=Oe,_n=[].concat(k(Ot),k(Ut)),vn=P.FontAwesomeConfig||{};function yn(e){var t=F.querySelector(`script[`+e+`]`);if(t)return t.getAttribute(e)}function bn(e){return e===``?!0:e===`false`?!1:e===`true`||e}F&&typeof F.querySelector==`function`&&[[`data-family-prefix`,`familyPrefix`],[`data-css-prefix`,`cssPrefix`],[`data-family-default`,`familyDefault`],[`data-style-default`,`styleDefault`],[`data-replacement-class`,`replacementClass`],[`data-auto-replace-svg`,`autoReplaceSvg`],[`data-auto-add-css`,`autoAddCss`],[`data-search-pseudo-elements`,`searchPseudoElements`],[`data-search-pseudo-elements-warnings`,`searchPseudoElementsWarnings`],[`data-search-pseudo-elements-full-scan`,`searchPseudoElementsFullScan`],[`data-observe-mutations`,`observeMutations`],[`data-mutate-approach`,`mutateApproach`],[`data-keep-original-source`,`keepOriginalSource`],[`data-measure-performance`,`measurePerformance`],[`data-show-missing-icons`,`showMissingIcons`]].forEach(function(e){var t=pe(e,2),n=t[0],r=t[1],i=bn(yn(n));i!=null&&(vn[r]=i)});var xn={styleDefault:`solid`,familyDefault:L,cssPrefix:Kt,replacementClass:qt,autoReplaceSvg:!0,autoAddCss:!0,searchPseudoElements:!1,searchPseudoElementsWarnings:!0,searchPseudoElementsFullScan:!1,observeMutations:!0,mutateApproach:`async`,keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};vn.familyPrefix&&(vn.cssPrefix=vn.familyPrefix);var H=O(O({},xn),vn);H.autoReplaceSvg||(H.observeMutations=!1);var U={};Object.keys(xn).forEach(function(e){Object.defineProperty(U,e,{enumerable:!0,set:function(t){H[e]=t,Sn.forEach(function(e){return e(U)})},get:function(){return H[e]}})}),Object.defineProperty(U,"familyPrefix",{enumerable:!0,set:function(e){H.cssPrefix=e,Sn.forEach(function(e){return e(U)})},get:function(){return H.cssPrefix}}),P.FontAwesomeConfig=U;var Sn=[];function Cn(e){return Sn.push(e),function(){Sn.splice(Sn.indexOf(e),1)}}var W=Gt,G={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function wn(e){if(e&&I){var t=F.createElement(`style`);t.setAttribute(`type`,`text/css`),t.innerHTML=e;for(var n=F.head.childNodes,r=null,i=n.length-1;i>-1;i--){var a=n[i],o=(a.tagName||``).toUpperCase();[`STYLE`,`LINK`].indexOf(o)>-1&&(r=a)}return F.head.insertBefore(t,r),e}}var Tn=`0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`;function En(){for(var e=12,t=``;e-->0;)t+=Tn[Math.random()*62|0];return t}function Dn(e){for(var t=[],n=(e||[]).length>>>0;n--;)t[n]=e[n];return t}function On(e){return e.classList?Dn(e.classList):(e.getAttribute(`class`)||``).split(` `).filter(function(e){return e})}function kn(e){return`${e}`.replace(/&/g,`&amp;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}function An(e){return Object.keys(e||{}).reduce(function(t,n){return t+`${n}="${kn(e[n])}" `},``).trim()}function jn(e){return Object.keys(e||{}).reduce(function(t,n){return t+`${n}: ${e[n].trim()};`},``)}function Mn(e){return e.size!==G.size||e.x!==G.x||e.y!==G.y||e.rotate!==G.rotate||e.flipX||e.flipY}function Nn(e){var t=e.transform,n=e.containerWidth,r=e.iconWidth;return{outer:{transform:`translate(${n/2} 256)`},inner:{transform:`${`translate(${t.x*32}, ${t.y*32}) `} ${`scale(${t.size/16*(t.flipX?-1:1)}, ${t.size/16*(t.flipY?-1:1)}) `} ${`rotate(${t.rotate} 0 0)`}`},path:{transform:`translate(${r/2*-1} -256)`}}}function Pn(e){var t=e.transform,n=e.width,r=n===void 0?Gt:n,i=e.height,a=i===void 0?Gt:i,o=e.startCentered,s=o!==void 0&&o,c=``;return c+=s&&Ce?`translate(${t.x/W-r/2}em, ${t.y/W-a/2}em) `:s?`translate(calc(-50% + ${t.x/W}em), calc(-50% + ${t.y/W}em)) `:`translate(${t.x/W}em, ${t.y/W}em) `,c+=`scale(${t.size/W*(t.flipX?-1:1)}, ${t.size/W*(t.flipY?-1:1)}) `,c+=`rotate(${t.rotate}deg) `,c}var Fn=`:root, :host {
  --fa-font-solid: normal 900 1em/1 'Font Awesome 7 Free';
  --fa-font-regular: normal 400 1em/1 'Font Awesome 7 Free';
  --fa-font-light: normal 300 1em/1 'Font Awesome 7 Pro';
  --fa-font-thin: normal 100 1em/1 'Font Awesome 7 Pro';
  --fa-font-duotone: normal 900 1em/1 'Font Awesome 7 Duotone';
  --fa-font-duotone-regular: normal 400 1em/1 'Font Awesome 7 Duotone';
  --fa-font-duotone-light: normal 300 1em/1 'Font Awesome 7 Duotone';
  --fa-font-duotone-thin: normal 100 1em/1 'Font Awesome 7 Duotone';
  --fa-font-brands: normal 400 1em/1 'Font Awesome 7 Brands';
  --fa-font-sharp-solid: normal 900 1em/1 'Font Awesome 7 Sharp';
  --fa-font-sharp-regular: normal 400 1em/1 'Font Awesome 7 Sharp';
  --fa-font-sharp-light: normal 300 1em/1 'Font Awesome 7 Sharp';
  --fa-font-sharp-thin: normal 100 1em/1 'Font Awesome 7 Sharp';
  --fa-font-sharp-duotone-solid: normal 900 1em/1 'Font Awesome 7 Sharp Duotone';
  --fa-font-sharp-duotone-regular: normal 400 1em/1 'Font Awesome 7 Sharp Duotone';
  --fa-font-sharp-duotone-light: normal 300 1em/1 'Font Awesome 7 Sharp Duotone';
  --fa-font-sharp-duotone-thin: normal 100 1em/1 'Font Awesome 7 Sharp Duotone';
  --fa-font-slab-regular: normal 400 1em/1 'Font Awesome 7 Slab';
  --fa-font-slab-press-regular: normal 400 1em/1 'Font Awesome 7 Slab Press';
  --fa-font-slab-duo-regular: normal 400 1em/1 'Font Awesome 7 Slab Duo';
  --fa-font-slab-press-duo-regular: normal 400 1em/1 'Font Awesome 7 Slab Press Duo';
  --fa-font-pixel-regular: normal 400 1em/1 'Font Awesome 7 Pixel';
  --fa-font-mosaic-solid: normal 900 1em/1 'Font Awesome 7 Mosaic';
  --fa-font-vellum-solid: normal 900 1em/1 'Font Awesome 7 Vellum';
  --fa-font-whiteboard-semibold: normal 600 1em/1 'Font Awesome 7 Whiteboard';
  --fa-font-thumbprint-light: normal 300 1em/1 'Font Awesome 7 Thumbprint';
  --fa-font-notdog-solid: normal 900 1em/1 'Font Awesome 7 Notdog';
  --fa-font-notdog-duo-solid: normal 900 1em/1 'Font Awesome 7 Notdog Duo';
  --fa-font-etch-solid: normal 900 1em/1 'Font Awesome 7 Etch';
  --fa-font-graphite-thin: normal 100 1em/1 'Font Awesome 7 Graphite';
  --fa-font-jelly-regular: normal 400 1em/1 'Font Awesome 7 Jelly';
  --fa-font-jelly-fill-regular: normal 400 1em/1 'Font Awesome 7 Jelly Fill';
  --fa-font-jelly-duo-regular: normal 400 1em/1 'Font Awesome 7 Jelly Duo';
  --fa-font-chisel-regular: normal 400 1em/1 'Font Awesome 7 Chisel';
  --fa-font-utility-semibold: normal 600 1em/1 'Font Awesome 7 Utility';
  --fa-font-utility-duo-semibold: normal 600 1em/1 'Font Awesome 7 Utility Duo';
  --fa-font-utility-fill-semibold: normal 600 1em/1 'Font Awesome 7 Utility Fill';
}

.svg-inline--fa {
  box-sizing: content-box;
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
  width: var(--fa-width, 1.25em);
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285714em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left,
.svg-inline--fa .fa-pull-start {
  float: inline-start;
  margin-inline-end: var(--fa-pull-margin, 0.3em);
}
.svg-inline--fa.fa-pull-right,
.svg-inline--fa .fa-pull-end {
  float: inline-end;
  margin-inline-start: var(--fa-pull-margin, 0.3em);
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  inset-inline-start: calc(-1 * var(--fa-li-width, 2em));
  inset-block-start: 0.25em; /* syncing vertical alignment with Web Font rendering */
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: var(--fa-width, 1.25em);
}
.fa-layers .svg-inline--fa {
  inset: 0;
  margin: auto;
  position: absolute;
  transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-counter-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: calc(10 / 16 * 1em); /* converts a 10px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 10 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 10 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-xs {
  font-size: calc(12 / 16 * 1em); /* converts a 12px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 12 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 12 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-sm {
  font-size: calc(14 / 16 * 1em); /* converts a 14px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 14 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 14 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-lg {
  font-size: calc(20 / 16 * 1em); /* converts a 20px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 20 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 20 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-xl {
  font-size: calc(24 / 16 * 1em); /* converts a 24px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 24 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 24 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-2xl {
  font-size: calc(32 / 16 * 1em); /* converts a 32px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 32 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 32 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-width-auto {
  --fa-width: auto;
}

.fa-fw,
.fa-width-fixed {
  --fa-width: 1.25em;
}

.fa-canvas-square {
  padding-block: 0.125em;
  margin-block-end: -0.125em;
}

.fa-canvas-roomy {
  padding-block: 0.25em;
  padding-inline: 0.125em;
  margin-block-end: -0.25em;
  box-sizing: content-box;
}

.fa-ul {
  list-style-type: none;
  margin-inline-start: var(--fa-li-margin, 2.5em);
  padding-inline-start: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  inset-inline-start: calc(-1 * var(--fa-li-width, 2em));
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

/* Heads Up: Bordered Icons will not be supported in the future!
  - This feature will be deprecated in the next major release of Font Awesome (v8)!
  - You may continue to use it in this version *v7), but it will not be supported in Font Awesome v8.
*/
/* Notes:
* --@{v.$css-prefix}-border-width = 1/16 by default (to render as ~1px based on a 16px default font-size)
* --@{v.$css-prefix}-border-padding =
  ** 3/16 for vertical padding (to give ~2px of vertical whitespace around an icon considering it's vertical alignment)
  ** 4/16 for horizontal padding (to give ~4px of horizontal whitespace around an icon)
*/
.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.0625em);
  box-sizing: var(--fa-border-box-sizing, content-box);
  padding: var(--fa-border-padding, 0.1875em 0.25em);
}

.fa-pull-left,
.fa-pull-start {
  float: inline-start;
  margin-inline-end: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right,
.fa-pull-end {
  float: inline-end;
  margin-inline-start: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  animation-name: fa-beat;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  animation-name: fa-bounce;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  animation-name: fa-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-beat-fade {
  animation-name: fa-beat-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-flip {
  animation-name: fa-flip;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1.5s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-flip-360 {
  animation-name: fa-flip-360;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  animation-name: fa-shake;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 0.75s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  animation-name: fa-spin;
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, steps(8));
}

.fa-spin-snap {
  animation-name: fa-spin-snap;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 3s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-snap-4 {
  animation-name: fa-spin-snap-4;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2.4s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-snap-8 {
  animation-name: fa-spin-snap-8;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 4s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-buzz {
  animation-name: fa-buzz;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 0.6s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-wag {
  animation-name: fa-wag;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 0.9s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-out);
  transform-origin: bottom center;
}

.fa-float {
  animation-name: fa-float;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 3s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
  will-change: transform;
}

.fa-swing {
  animation-name: fa-swing;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1.2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-out);
  transform-origin: top center;
}

.fa-jello {
  animation-name: fa-jello;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 0.9s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-out);
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
  .fa-bounce,
  .fa-fade,
  .fa-beat-fade,
  .fa-flip,
  .fa-flip-360,
  .fa-pulse,
  .fa-shake,
  .fa-spin,
  .fa-spin-pulse,
  .fa-buzz,
  .fa-float,
  .fa-jello,
  .fa-spin-snap,
  .fa-spin-snap-4,
  .fa-spin-snap-8,
  .fa-swing,
  .fa-wag {
    animation: none !important;
    transition: none !important;
  }
}
@keyframes fa-beat {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(calc(1.25 * var(--fa-beat-scale, 1.25)));
  }
  45% {
    transform: scale(calc(1.22 * var(--fa-beat-scale, 1.22)));
  }
  65% {
    transform: scale(calc(1.25 * var(--fa-beat-scale, 1.25)));
  }
  90% {
    transform: scale(1);
  }
}
@keyframes fa-bounce {
  0% {
    transform: scale(1, 1) translateY(0);
    animation-timing-function: var(--fa-animation-timing);
  }
  14% {
    transform: scale(var(--fa-bounce-start-scale-x, 1.06), var(--fa-bounce-start-scale-y, 0.94)) translateY(var(--fa-bounce-anticipation, 3px));
    animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
  }
  32% {
    transform: scale(var(--fa-bounce-jump-scale-x, 0.94), var(--fa-bounce-jump-scale-y, 1.12)) translateY(calc(-1 * var(--fa-bounce-height, 0.5em)));
    animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
  }
  52% {
    transform: scale(1, 1) translateY(calc(-1 * var(--fa-bounce-height, 0.5em) * 1.1));
    animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
  }
  70% {
    transform: scale(var(--fa-bounce-land-scale-x, 1.06), var(--fa-bounce-land-scale-y, 0.92)) translateY(0);
    animation-timing-function: cubic-bezier(0.33, 0.33, 0.66, 1);
  }
  85% {
    transform: scale(0.98, 1.04) translateY(calc(-2px * var(--fa-bounce-rebound, 1)));
    animation-timing-function: cubic-bezier(0.33, 0, 0.66, 1);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-fade {
  0% {
    opacity: 1;
    transform: scale(1);
    animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
  }
  40% {
    opacity: var(--fa-fade-opacity, 0.4);
    transform: scale(0.98);
    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes fa-beat-fade {
  0% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
    animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
  }
  25% {
    opacity: calc(var(--fa-beat-fade-opacity, 0.4) + 0.4);
    transform: scale(var(--fa-beat-fade-scale, 1.28));
    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
  }
  45% {
    opacity: 1;
    transform: scale(var(--fa-beat-fade-scale, 1.25));
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
  65% {
    opacity: calc(var(--fa-beat-fade-opacity, 0.4) + 0.4);
    transform: scale(var(--fa-beat-fade-scale, 1.28));
    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
  }
  100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
  }
}
@keyframes fa-flip {
  0% {
    transform: perspective(2em) scale(1) rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), 0deg);
    animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
  }
  8% {
    transform: perspective(2em) scale(var(--fa-flip-anticipation-scale, 0.95)) rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), 0deg);
    animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
  }
  35% {
    transform: perspective(2em) scale(1) rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), calc(var(--fa-flip-angle, -360deg) * 0.6));
    animation-timing-function: linear;
  }
  65% {
    transform: perspective(2em) scale(1) rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), calc(var(--fa-flip-angle, -360deg) * 0.5));
    animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
  }
  92% {
    transform: perspective(2em) scale(1) rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), calc(var(--fa-flip-angle, -360deg) * var(--fa-flip-overshoot, 1.04)));
    animation-timing-function: cubic-bezier(0.33, 0, 0.66, 1);
  }
  100% {
    transform: perspective(2em) scale(1) rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -360deg));
  }
}
@keyframes fa-flip-360 {
  0% {
    transform: perspective(2em) scale(1) rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), 0deg);
    animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
  }
  8% {
    transform: perspective(2em) scale(var(--fa-flip-anticipation-scale, 0.95)) rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), 0deg);
    animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
  }
  50% {
    transform: perspective(2em) scale(1) rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), calc(var(--fa-flip-angle, -360deg) * 0.6));
    animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
  }
  80% {
    transform: perspective(2em) scale(1) rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), calc(var(--fa-flip-angle, -360deg) * var(--fa-flip-overshoot, 1.04)));
    animation-timing-function: cubic-bezier(0.33, 0, 0.66, 1);
  }
  100% {
    transform: perspective(2em) scale(1) rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -360deg));
  }
}
@keyframes fa-shake {
  0% {
    transform: rotate(0deg);
    animation-timing-function: cubic-bezier(0.2, 0, 0.8, 1);
  }
  8% {
    transform: rotate(35deg) translateX(1px);
    animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
  }
  20% {
    transform: rotate(-22deg) translateX(-1px);
    animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
  }
  35% {
    transform: rotate(15deg) translateX(1px);
    animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
  }
  50% {
    transform: rotate(-9deg);
    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
  }
  65% {
    transform: rotate(5deg);
    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
  }
  78% {
    transform: rotate(-3deg);
    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
  }
  90% {
    transform: rotate(1deg);
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
  100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes fa-spin-snap {
  0% {
    transform: rotate(0deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  12% {
    transform: rotate(60deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  16.67% {
    transform: rotate(60deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  28.67% {
    transform: rotate(120deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  33.33% {
    transform: rotate(120deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  45.33% {
    transform: rotate(180deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: rotate(180deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  62% {
    transform: rotate(240deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  66.67% {
    transform: rotate(240deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  78.67% {
    transform: rotate(300deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  83.33% {
    transform: rotate(300deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  95.33% {
    transform: rotate(360deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes fa-spin-snap-4 {
  0% {
    transform: rotate(0deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  15% {
    transform: rotate(90deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  25% {
    transform: rotate(90deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  40% {
    transform: rotate(180deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: rotate(180deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  65% {
    transform: rotate(270deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  75% {
    transform: rotate(270deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  90% {
    transform: rotate(360deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes fa-spin-snap-8 {
  0% {
    transform: rotate(0deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  9% {
    transform: rotate(45deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  12.5% {
    transform: rotate(45deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  21.5% {
    transform: rotate(90deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  25% {
    transform: rotate(90deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  34% {
    transform: rotate(135deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  37.5% {
    transform: rotate(135deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  46.5% {
    transform: rotate(180deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: rotate(180deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  59% {
    transform: rotate(225deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  62.5% {
    transform: rotate(225deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  71.5% {
    transform: rotate(270deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  75% {
    transform: rotate(270deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  84% {
    transform: rotate(315deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  87.5% {
    transform: rotate(315deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  96.5% {
    transform: rotate(360deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes fa-buzz {
  0% {
    transform: translateX(0) rotate(0deg);
    animation-timing-function: cubic-bezier(0.1, 0, 0.9, 1);
  }
  5% {
    transform: translateX(var(--fa-buzz-distance, 4px)) rotate(0.5deg);
  }
  10% {
    transform: translateX(calc(-1 * var(--fa-buzz-distance, 4px))) rotate(-0.5deg);
  }
  15% {
    transform: translateX(var(--fa-buzz-distance, 4px)) rotate(0.3deg);
  }
  20% {
    transform: translateX(calc(-1 * var(--fa-buzz-distance, 4px))) rotate(-0.3deg);
  }
  25% {
    transform: translateX(calc(var(--fa-buzz-distance, 4px) * 0.7)) rotate(0.2deg);
  }
  30% {
    transform: translateX(calc(-1 * var(--fa-buzz-distance, 4px) * 0.7)) rotate(-0.2deg);
  }
  35% {
    transform: translateX(calc(var(--fa-buzz-distance, 4px) * 0.4)) rotate(0.1deg);
  }
  40% {
    transform: translateX(0) rotate(0deg);
  }
  100% {
    transform: translateX(0) rotate(0deg);
  }
}
@keyframes fa-wag {
  0% {
    transform: rotate(0deg);
    animation-timing-function: cubic-bezier(0.2, 0, 0.6, 1);
  }
  12% {
    transform: rotate(var(--fa-wag-angle, 12deg));
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
  24% {
    transform: rotate(2deg);
    animation-timing-function: cubic-bezier(0.2, 0, 0.6, 1);
  }
  36% {
    transform: rotate(calc(var(--fa-wag-angle, 12deg) * 0.85));
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
  48% {
    transform: rotate(1deg);
    animation-timing-function: cubic-bezier(0.2, 0, 0.6, 1);
  }
  58% {
    transform: rotate(calc(var(--fa-wag-angle, 12deg) * 0.6));
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
  68% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-float {
  0% {
    transform: translateY(0) translateX(0) rotate(0deg) scale(var(--fa-float-squash-x, 1.02), var(--fa-float-squash-y, 0.98));
    animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
  }
  15% {
    transform: translateY(calc(-0.4 * var(--fa-float-height, 6px))) translateX(var(--fa-float-drift, 1px)) rotate(var(--fa-float-tilt, 1deg)) scale(1, 1);
    animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
  }
  35% {
    transform: translateY(calc(-1 * var(--fa-float-height, 6px))) translateX(0) rotate(0deg) scale(var(--fa-float-stretch-x, 0.98), var(--fa-float-stretch-y, 1.03));
    animation-timing-function: cubic-bezier(0.5, 0, 0.5, 0);
  }
  50% {
    transform: translateY(calc(-0.92 * var(--fa-float-height, 6px))) translateX(calc(-0.5 * var(--fa-float-drift, 1px))) rotate(calc(-0.5 * var(--fa-float-tilt, 1deg))) scale(0.995, 1.01);
    animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
  }
  70% {
    transform: translateY(calc(-0.3 * var(--fa-float-height, 6px))) translateX(calc(-1 * var(--fa-float-drift, 1px))) rotate(calc(-1 * var(--fa-float-tilt, 1deg))) scale(1, 1);
    animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
  }
  90% {
    transform: translateY(calc(0.05 * var(--fa-float-height, 6px))) translateX(0) rotate(0deg) scale(var(--fa-float-squash-x, 1.02), var(--fa-float-squash-y, 0.98));
    animation-timing-function: cubic-bezier(0.33, 0, 0.66, 1);
  }
  100% {
    transform: translateY(0) translateX(0) rotate(0deg) scale(var(--fa-float-squash-x, 1.02), var(--fa-float-squash-y, 0.98));
  }
}
@keyframes fa-swing {
  0% {
    transform: rotate(0deg);
    animation-timing-function: cubic-bezier(0.2, 0, 0.8, 1);
  }
  8% {
    transform: rotate(var(--fa-swing-angle, 22deg));
    animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
  }
  18% {
    transform: rotate(calc(-1 * var(--fa-swing-angle, 22deg) * 0.85));
    animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
  }
  28% {
    transform: rotate(calc(var(--fa-swing-angle, 22deg) * 0.65));
    animation-timing-function: cubic-bezier(0.35, 0, 0.65, 1);
  }
  38% {
    transform: rotate(calc(-1 * var(--fa-swing-angle, 22deg) * 0.45));
    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
  }
  48% {
    transform: rotate(calc(var(--fa-swing-angle, 22deg) * 0.25));
    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
  }
  56% {
    transform: rotate(calc(-1 * var(--fa-swing-angle, 22deg) * 0.1));
    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
  }
  64% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-jello {
  0% {
    transform: scale(1, 1);
    animation-timing-function: cubic-bezier(0.2, 0, 0.8, 1);
  }
  12% {
    transform: scale(var(--fa-jello-scale-x, 1.15), calc(2 - var(--fa-jello-scale-x, 1.15)));
    animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
  }
  24% {
    transform: scale(calc(2 - var(--fa-jello-scale-y, 1.12)), var(--fa-jello-scale-y, 1.12));
    animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
  }
  36% {
    transform: scale(calc(1 + (var(--fa-jello-scale-x, 1.15) - 1) * 0.5), calc(2 - (1 + (var(--fa-jello-scale-x, 1.15) - 1) * 0.5)));
    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
  }
  48% {
    transform: scale(calc(2 - (1 + (var(--fa-jello-scale-y, 1.12) - 1) * 0.3)), calc(1 + (var(--fa-jello-scale-y, 1.12) - 1) * 0.3));
    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
  }
  58% {
    transform: scale(1.02, 0.98);
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
  68% {
    transform: scale(1, 1);
  }
  100% {
    transform: scale(1, 1);
  }
}
.fa-rotate-90 {
  transform: rotate(90deg);
}

.fa-rotate-180 {
  transform: rotate(180deg);
}

.fa-rotate-270 {
  transform: rotate(270deg);
}

.fa-flip-horizontal {
  transform: scale(-1, 1);
}

.fa-flip-vertical {
  transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  transform: scale(-1, -1);
}

.fa-rotate-by {
  transform: rotate(var(--fa-rotate-angle, 0));
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.svg-inline--fa.fa-inverse {
  fill: var(--fa-inverse, #fff);
}

.fa-stack {
  display: inline-block;
  height: 2em;
  line-height: 2em;
  position: relative;
  vertical-align: middle;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.svg-inline--fa.fa-stack-1x {
  --fa-width: 1.25em;
  height: 1em;
  width: var(--fa-width);
}
.svg-inline--fa.fa-stack-2x {
  --fa-width: 2.5em;
  height: 2em;
  width: var(--fa-width);
}

.fa-stack-1x,
.fa-stack-2x {
  inset: 0;
  margin: auto;
  position: absolute;
  z-index: var(--fa-stack-z-index, auto);
}`;function In(){var e=Kt,t=qt,n=U.cssPrefix,r=U.replacementClass,i=Fn;if(n!==e||r!==t){var a=RegExp(`\\.${e}\\-`,`g`),o=RegExp(`\\--${e}\\-`,`g`),s=RegExp(`\\.${t}`,`g`);i=i.replace(a,`.${n}-`).replace(o,`--${n}-`).replace(s,`.${r}`)}return i}var Ln=!1;function Rn(){U.autoAddCss&&!Ln&&(wn(In()),Ln=!0)}var zn={mixout:function(){return{dom:{css:In,insertCss:Rn}}},hooks:function(){return{beforeDOMElementCreation:function(){Rn()},beforeI2svg:function(){Rn()}}}},K=P||{};K[B]||(K[B]={}),K[B].styles||(K[B].styles={}),K[B].hooks||(K[B].hooks={}),K[B].shims||(K[B].shims=[]);var q=K[B],Bn=[],Vn=function(){F.removeEventListener(`DOMContentLoaded`,Vn),Hn=1,Bn.map(function(e){return e()})},Hn=!1;I&&(Hn=(F.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(F.readyState),Hn||F.addEventListener(`DOMContentLoaded`,Vn));function Un(e){I&&(Hn?setTimeout(e,0):Bn.push(e))}function Wn(e){var t=e.tag,n=e.attributes,r=n===void 0?{}:n,i=e.children,a=i===void 0?[]:i;return typeof e==`string`?kn(e):`<${t} ${An(r)}>${a.map(Wn).join(``)}</${t}>`}function Gn(e,t,n){if(e&&e[t]&&e[t][n])return{prefix:t,iconName:n,icon:e[t][n]}}var Kn=function(e,t){return function(n,r,i,a){return e.call(t,n,r,i,a)}},qn=function(e,t,n,r){var i=Object.keys(e),a=i.length,o=r===void 0?t:Kn(t,r),s,c,l;for(n===void 0?(s=1,l=e[i[0]]):(s=0,l=n);s<a;s++)c=i[s],l=o(l,e[c],c,e);return l};function Jn(e){return k(e).length===1?e.codePointAt(0).toString(16):null}function Yn(e){return Object.keys(e).reduce(function(t,n){var r=e[n];return r.icon?t[r.iconName]=r.icon:t[n]=r,t},{})}function Xn(e,t){var n=(arguments.length>2&&arguments[2]!==void 0?arguments[2]:{}).skipHooks,r=n!==void 0&&n,i=Yn(t);typeof q.hooks.addPack==`function`&&!r?q.hooks.addPack(e,Yn(t)):q.styles[e]=O(O({},q.styles[e]||{}),i),e===`fas`&&Xn(`fa`,t)}var Zn=q.styles,Qn=q.shims,$n=Object.keys(un),er=$n.reduce(function(e,t){return e[t]=Object.keys(un[t]),e},{}),tr=null,nr={},rr={},ir={},ar={},or={};function sr(e){return~_n.indexOf(e)}function cr(e,t){var n=t.split(`-`),r=n[0],i=n.slice(1).join(`-`);return r===e&&i!==``&&!sr(i)?i:null}var lr=function(){var e=function(e){return qn(Zn,function(t,n,r){return t[r]=qn(n,e,{}),t},{})};nr=e(function(e,t,n){return t[3]&&(e[t[3]]=n),t[2]&&t[2].filter(function(e){return typeof e==`number`}).forEach(function(t){e[t.toString(16)]=n}),e}),rr=e(function(e,t,n){return e[n]=n,t[2]&&t[2].filter(function(e){return typeof e==`string`}).forEach(function(t){e[t]=n}),e}),or=e(function(e,t,n){var r=t[2];return e[n]=n,r.forEach(function(t){e[t]=n}),e});var t=`far`in Zn||U.autoFetchSvg,n=qn(Qn,function(e,n){var r=n[0],i=n[1],a=n[2];return i===`far`&&!t&&(i=`fas`),typeof r==`string`&&(e.names[r]={prefix:i,iconName:a}),typeof r==`number`&&(e.unicodes[r.toString(16)]={prefix:i,iconName:a}),e},{names:{},unicodes:{}});ir=n.names,ar=n.unicodes,tr=gr(U.styleDefault,{family:U.familyDefault})};Cn(function(e){tr=gr(e.styleDefault,{family:U.familyDefault})}),lr();function ur(e,t){return(nr[e]||{})[t]}function dr(e,t){return(rr[e]||{})[t]}function J(e,t){return(or[e]||{})[t]}function fr(e){return ir[e]||{prefix:null,iconName:null}}function pr(e){var t=ar[e],n=ur(`fas`,e);return t||(n?{prefix:`fas`,iconName:n}:null)||{prefix:null,iconName:null}}function Y(){return tr}var mr=function(){return{prefix:null,iconName:null,rest:[]}};function hr(e){var t=L,n=$n.reduce(function(e,t){return e[t]=`${U.cssPrefix}-${t}`,e},{});return xt.forEach(function(r){(e.includes(n[r])||e.some(function(e){return er[r].includes(e)}))&&(t=r)}),t}function gr(e){var t=(arguments.length>1&&arguments[1]!==void 0?arguments[1]:{}).family,n=t===void 0?L:t,r=on[n][e];if(n===R&&!e)return`fad`;var i=cn[n][e]||cn[n][r],a=e in q.styles?e:null;return i||a||null}function _r(e){var t=[],n=null;return e.forEach(function(e){var r=cr(U.cssPrefix,e);r?n=r:e&&t.push(e)}),{iconName:n,rest:t}}function vr(e){return e.sort().filter(function(e,t,n){return n.indexOf(e)===t})}var yr=zt.concat(Et);function br(e){var t=(arguments.length>1&&arguments[1]!==void 0?arguments[1]:{}).skipLookups,n=t!==void 0&&t,r=null,i=vr(e.filter(function(e){return yr.includes(e)})),a=vr(e.filter(function(e){return!yr.includes(e)})),o=pe(i.filter(function(e){return r=e,!ke.includes(e)}),1)[0],s=o===void 0?null:o,c=hr(i),l=O(O({},_r(a)),{},{prefix:gr(s,{family:c})});return O(O(O({},l),wr({values:e,family:c,styles:Zn,config:U,canonical:l,givenPrefix:r})),xr(n,r,l))}function xr(e,t,n){var r=n.prefix,i=n.iconName;if(e||!r||!i)return{prefix:r,iconName:i};var a=t===`fa`?fr(i):{},o=J(r,i);return i=a.iconName||o||i,r=a.prefix||r,r===`far`&&!Zn.far&&Zn.fas&&!U.autoFetchSvg&&(r=`fas`),{prefix:r,iconName:i}}var Sr=xt.filter(function(e){return e!==L||e!==R}),Cr=Object.keys(Rt).filter(function(e){return e!==L}).map(function(e){return Object.keys(Rt[e])}).flat();function wr(e){var t=e.values,n=e.family,r=e.canonical,i=e.givenPrefix,a=i===void 0?``:i,o=e.styles,s=o===void 0?{}:o,c=e.config,l=c===void 0?{}:c,u=n===R,d=t.includes(`fa-duotone`)||t.includes(`fad`),f=l.familyDefault===`duotone`,p=r.prefix===`fad`||r.prefix===`fa-duotone`;return!u&&(d||f||p)&&(r.prefix=`fad`),(t.includes(`fa-brands`)||t.includes(`fab`))&&(r.prefix=`fab`),!r.prefix&&Sr.includes(n)&&(Object.keys(s).find(function(e){return Cr.includes(e)})||l.autoFetchSvg)&&(r.prefix=wt.get(n).defaultShortPrefixId,r.iconName=J(r.prefix,r.iconName)||r.iconName),(r.prefix===`fa`||a===`fa`)&&(r.prefix=Y()||`fas`),r}var Tr=function(){function e(){C(this,e),this.definitions={}}return le(e,[{key:`add`,value:function(){var e=this,t=[...arguments].reduce(this._pullDefinitions,{});Object.keys(t).forEach(function(n){e.definitions[n]=O(O({},e.definitions[n]||{}),t[n]),Xn(n,t[n]);var r=un[L][n];r&&Xn(r,t[n]),lr()})}},{key:`reset`,value:function(){this.definitions={}}},{key:`_pullDefinitions`,value:function(e,t){var n=t.prefix&&t.iconName&&t.icon?{0:t}:t;return Object.keys(n).map(function(t){var r=n[t],i=r.prefix,a=r.iconName,o=r.icon,s=o[2];e[i]||(e[i]={}),s.length>0&&s.forEach(function(t){typeof t==`string`&&(e[i][t]=o)}),e[i][a]=o}),e}}])}(),Er=[],X={},Dr={},Or=Object.keys(Dr);function kr(e,t){var n=t.mixoutsTo;return Er=e,X={},Object.keys(Dr).forEach(function(e){Or.indexOf(e)===-1&&delete Dr[e]}),Er.forEach(function(e){var t=e.mixout?e.mixout():{};if(Object.keys(t).forEach(function(e){typeof t[e]==`function`&&(n[e]=t[e]),M(t[e])===`object`&&Object.keys(t[e]).forEach(function(r){n[e]||(n[e]={}),n[e][r]=t[e][r]})}),e.hooks){var r=e.hooks();Object.keys(r).forEach(function(e){X[e]||(X[e]=[]),X[e].push(r[e])})}e.provides&&e.provides(Dr)}),n}function Ar(e,t){var n=[...arguments].slice(2);return(X[e]||[]).forEach(function(e){t=e.apply(null,[t].concat(n))}),t}function Z(e){var t=[...arguments].slice(1);(X[e]||[]).forEach(function(e){e.apply(null,t)})}function Q(){var e=arguments[0],t=Array.prototype.slice.call(arguments,1);return Dr[e]?Dr[e].apply(null,t):void 0}function jr(e){e.prefix===`fa`&&(e.prefix=`fas`);var t=e.iconName,n=e.prefix||Y();if(t)return t=J(n,t)||t,Gn(Mr.definitions,n,t)||Gn(q.styles,n,t)}var Mr=new Tr,$={noAuto:function(){U.autoReplaceSvg=!1,U.observeMutations=!1,Z(`noAuto`)},config:U,dom:{i2svg:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return I?(Z(`beforeI2svg`,e),Q(`pseudoElements2svg`,e),Q(`i2svg`,e)):Promise.reject(Error(`Operation requires a DOM of some kind.`))},watch:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=e.autoReplaceSvgRoot;U.autoReplaceSvg===!1&&(U.autoReplaceSvg=!0),U.observeMutations=!0,Un(function(){Nr({autoReplaceSvgRoot:t}),Z(`watch`,e)})}},parse:{icon:function(e){if(e===null)return null;if(M(e)===`object`&&e.prefix&&e.iconName)return{prefix:e.prefix,iconName:J(e.prefix,e.iconName)||e.iconName};if(Array.isArray(e)&&e.length===2){var t=e[1].indexOf(`fa-`)===0?e[1].slice(3):e[1],n=gr(e[0]);return{prefix:n,iconName:J(n,t)||t}}if(typeof e==`string`&&(e.indexOf(`${U.cssPrefix}-`)>-1||e.match(fn))){var r=br(e.split(` `),{skipLookups:!0});return{prefix:r.prefix||Y(),iconName:J(r.prefix,r.iconName)||r.iconName}}if(typeof e==`string`){var i=Y();return{prefix:i,iconName:J(i,e)||e}}}},library:Mr,findIconDefinition:jr,toHtml:Wn},Nr=function(){var e=(arguments.length>0&&arguments[0]!==void 0?arguments[0]:{}).autoReplaceSvgRoot,t=e===void 0?F:e;(Object.keys(q.styles).length>0||U.autoFetchSvg)&&I&&U.autoReplaceSvg&&$.dom.i2svg({node:t})};function Pr(e,t){return Object.defineProperty(e,"abstract",{get:t}),Object.defineProperty(e,"html",{get:function(){return e.abstract.map(function(e){return Wn(e)})}}),Object.defineProperty(e,"node",{get:function(){if(I){var t=F.createElement(`div`);return t.innerHTML=e.html,t.children}}}),e}function Fr(e){var t=e.children,n=e.main,r=e.mask,i=e.attributes,a=e.styles,o=e.transform;if(Mn(o)&&n.found&&!r.found){var s={x:n.width/n.height/2,y:.5};i.style=jn(O(O({},a),{},{"transform-origin":`${s.x+o.x/16}em ${s.y+o.y/16}em`}))}return[{tag:`svg`,attributes:i,children:t}]}function Ir(e){var t=e.prefix,n=e.iconName,r=e.children,i=e.attributes,a=e.symbol,o=a===!0?`${t}-${U.cssPrefix}-${n}`:a;return[{tag:`svg`,attributes:{style:`display: none;`},children:[{tag:`symbol`,attributes:O(O({},i),{},{id:o}),children:r}]}]}function Lr(e){return[`aria-label`,`aria-labelledby`,`title`,`role`].some(function(t){return t in e})}function Rr(e){var t=e.icons,n=t.main,r=t.mask,i=e.prefix,a=e.iconName,o=e.transform,s=e.symbol,c=e.maskId,l=e.extra,u=e.watchable,d=u!==void 0&&u,f=r.found?r:n,p=f.width,m=f.height,ee=[U.replacementClass,a?`${U.cssPrefix}-${a}`:``].filter(function(e){return l.classes.indexOf(e)===-1}).filter(function(e){return e!==``||!!e}).concat(l.classes).join(` `),h={children:[],attributes:O(O({},l.attributes),{},{"data-prefix":i,"data-icon":a,class:ee,role:l.attributes.role||`img`,viewBox:`0 0 ${p} ${m}`})};!Lr(l.attributes)&&!l.attributes[`aria-hidden`]&&(h.attributes[`aria-hidden`]=`true`),d&&(h.attributes[V]=``);var g=O(O({},h),{},{prefix:i,iconName:a,main:n,mask:r,maskId:c,transform:o,symbol:s,styles:O({},l.styles)}),_=r.found&&n.found?Q(`generateAbstractMask`,g)||{children:[],attributes:{}}:Q(`generateAbstractIcon`,g)||{children:[],attributes:{}},v=_.children,y=_.attributes;return g.children=v,g.attributes=y,s?Ir(g):Fr(g)}function zr(e){var t=e.content,n=e.width,r=e.height,i=e.transform,a=e.extra,o=e.watchable,s=o!==void 0&&o,c=O(O({},a.attributes),{},{class:a.classes.join(` `)});s&&(c[V]=``);var l=O({},a.styles);Mn(i)&&(l.transform=Pn({transform:i,startCentered:!0,width:n,height:r}),l[`-webkit-transform`]=l.transform);var u=jn(l);u.length>0&&(c.style=u);var d=[];return d.push({tag:`span`,attributes:c,children:[t]}),d}function Br(e){var t=e.content,n=e.extra,r=O(O({},n.attributes),{},{class:n.classes.join(` `)}),i=jn(n.styles);i.length>0&&(r.style=i);var a=[];return a.push({tag:`span`,attributes:r,children:[t]}),a}var Vr=q.styles;function Hr(e){var t=e[0],n=e[1],r=pe(e.slice(4),1)[0],i=null;return i=Array.isArray(r)?{tag:`g`,attributes:{class:`${U.cssPrefix}-${gn.GROUP}`},children:[{tag:`path`,attributes:{class:`${U.cssPrefix}-${gn.SECONDARY}`,fill:`currentColor`,d:r[0]}},{tag:`path`,attributes:{class:`${U.cssPrefix}-${gn.PRIMARY}`,fill:`currentColor`,d:r[1]}}]}:{tag:`path`,attributes:{fill:`currentColor`,d:r}},{found:!0,width:t,height:n,icon:i}}var Ur={found:!1,width:512,height:512};function Wr(e,t){!nn&&!U.showMissingIcons&&e&&console.error(`Icon with name "${e}" and prefix "${t}" is missing.`)}function Gr(e,t){var n=t;return t===`fa`&&U.styleDefault!==null&&(t=Y()),new Promise(function(r,i){if(n===`fa`){var a=fr(e)||{};e=a.iconName||e,t=a.prefix||t}if(e&&t&&Vr[t]&&Vr[t][e]){var o=Vr[t][e];return r(Hr(o))}Wr(e,t),r(O(O({},Ur),{},{icon:U.showMissingIcons&&e&&Q(`missingIconAbstract`)||{}}))})}var Kr=function(){},qr=U.measurePerformance&&Se&&Se.mark&&Se.measure?Se:{mark:Kr,measure:Kr},Jr=`FA "7.3.1"`,Yr=function(e){return qr.mark(`${Jr} ${e} begins`),function(){return Xr(e)}},Xr=function(e){qr.mark(`${Jr} ${e} ends`),qr.measure(`${Jr} ${e}`,`${Jr} ${e} begins`,`${Jr} ${e} ends`)},Zr={begin:Yr,end:Xr},Qr=function(){};function $r(e){return typeof(e.getAttribute?e.getAttribute(V):null)==`string`}function ei(e){var t=e.getAttribute?e.getAttribute(Xt):null,n=e.getAttribute?e.getAttribute(Zt):null;return t&&n}function ti(e){return e&&e.classList&&e.classList.contains&&e.classList.contains(U.replacementClass)}function ni(){return U.autoReplaceSvg===!0?si.replace:si[U.autoReplaceSvg]||si.replace}function ri(e){return F.createElementNS(`http://www.w3.org/2000/svg`,e)}function ii(e){return F.createElement(e)}function ai(e){var t=(arguments.length>1&&arguments[1]!==void 0?arguments[1]:{}).ceFn,n=t===void 0?e.tag===`svg`?ri:ii:t;if(typeof e==`string`)return F.createTextNode(e);var r=n(e.tag);return Object.keys(e.attributes||[]).forEach(function(t){r.setAttribute(t,e.attributes[t])}),(e.children||[]).forEach(function(e){r.appendChild(ai(e,{ceFn:n}))}),r}function oi(e){var t=` ${e.outerHTML} `;return t=`${t}Font Awesome fontawesome.com `,t}var si={replace:function(e){var t=e[0];if(t.parentNode){if(e[1].forEach(function(e){t.parentNode.insertBefore(ai(e),t)}),t.getAttribute(V)===null&&U.keepOriginalSource){var n=F.createComment(oi(t));t.parentNode.replaceChild(n,t)}else t.remove()}},nest:function(e){var t=e[0],n=e[1];if(~On(t).indexOf(U.replacementClass))return si.replace(e);var r=RegExp(`${U.cssPrefix}-.*`);if(delete n[0].attributes.id,n[0].attributes.class){var i=n[0].attributes.class.split(` `).reduce(function(e,t){return t===U.replacementClass||t.match(r)?e.toSvg.push(t):e.toNode.push(t),e},{toNode:[],toSvg:[]});n[0].attributes.class=i.toSvg.join(` `),i.toNode.length===0?t.removeAttribute(`class`):t.setAttribute(`class`,i.toNode.join(` `))}var a=n.map(function(e){return Wn(e)}).join(`
`);t.setAttribute(V,``),t.innerHTML=a}};function ci(e){e()}function li(e,t){var n=typeof t==`function`?t:Qr;if(e.length===0)n();else{var r=ci;U.mutateApproach===$t&&(r=P.requestAnimationFrame||ci),r(function(){var t=ni(),r=Zr.begin(`mutate`);e.map(t),r(),n()})}}var ui=!1;function di(){ui=!0}function fi(){ui=!1}var pi=null;function mi(e){if(xe&&U.observeMutations){var t=e.treeCallback,n=t===void 0?Qr:t,r=e.nodeCallback,i=r===void 0?Qr:r,a=e.pseudoElementsCallback,o=a===void 0?Qr:a,s=e.observeMutationsRoot,c=s===void 0?F:s;pi=new xe(function(e){if(!ui){var t=Y();Dn(e).forEach(function(e){if(e.type===`childList`&&e.addedNodes.length>0&&!$r(e.addedNodes[0])&&(U.searchPseudoElements&&o(e.target),n(e.target)),e.type===`attributes`&&e.target.parentNode&&U.searchPseudoElements&&o([e.target],!0),e.type===`attributes`&&$r(e.target)&&~hn.indexOf(e.attributeName)){if(e.attributeName===`class`&&ei(e.target)){var r=br(On(e.target)),a=r.prefix,s=r.iconName;e.target.setAttribute(Xt,a||t),s&&e.target.setAttribute(Zt,s)}else ti(e.target)&&i(e.target)}})}}),I&&pi.observe(c,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function hi(){pi&&pi.disconnect()}function gi(e){var t=e.getAttribute(`style`),n=[];return t&&(n=t.split(`;`).reduce(function(e,t){var n=t.split(`:`),r=n[0],i=n.slice(1);return r&&i.length>0&&(e[r]=i.join(`:`).trim()),e},{})),n}function _i(e){var t=e.getAttribute(`data-prefix`),n=e.getAttribute(`data-icon`),r=e.innerText===void 0?``:e.innerText.trim(),i=br(On(e));return i.prefix||=Y(),t&&n&&(i.prefix=t,i.iconName=n),i.iconName&&i.prefix?i:(i.prefix&&r.length>0&&(i.iconName=dr(i.prefix,e.innerText)||ur(i.prefix,Jn(e.innerText))),!i.iconName&&U.autoFetchSvg&&e.firstChild&&e.firstChild.nodeType===Node.TEXT_NODE&&(i.iconName=e.firstChild.data),i)}function vi(e){return Dn(e.attributes).reduce(function(e,t){return e.name!==`class`&&e.name!==`style`&&(e[t.name]=t.value),e},{})}function yi(){return{iconName:null,prefix:null,transform:G,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function bi(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},n=_i(e),r=n.iconName,i=n.prefix,a=n.rest,o=vi(e),s=Ar(`parseNodeAttributes`,{},e);return O({iconName:r,prefix:i,transform:G,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:a,styles:t.styleParser?gi(e):[],attributes:o}},s)}var xi=q.styles;function Si(e){var t=U.autoReplaceSvg===`nest`?bi(e,{styleParser:!1}):bi(e);return~t.extra.classes.indexOf(pn)?Q(`generateLayersText`,e,t):Q(`generateSvgReplacementMutation`,e,t)}function Ci(){return[].concat(k(Et),k(zt))}function wi(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!I)return Promise.resolve();var n=F.documentElement.classList,r=function(e){return n.add(`${Qt}-${e}`)},i=function(e){return n.remove(`${Qt}-${e}`)},a=U.autoFetchSvg?Ci():ke.concat(Object.keys(xi));a.includes(`fa`)||a.push(`fa`);var o=[`.${pn}:not([${V}])`].concat(a.map(function(e){return`.${e}:not([${V}])`})).join(`, `);if(o.length===0)return Promise.resolve();var s=[];try{s=Dn(e.querySelectorAll(o))}catch{}if(s.length>0)r(`pending`),i(`complete`);else return Promise.resolve();var c=Zr.begin(`onTree`),l=s.reduce(function(e,t){try{var n=Si(t);n&&e.push(n)}catch(e){nn||e.name===`MissingIcon`&&console.error(e)}return e},[]);return new Promise(function(e,n){Promise.all(l).then(function(n){li(n,function(){r(`active`),r(`complete`),i(`pending`),typeof t==`function`&&t(),c(),e()})}).catch(function(e){c(),n(e)})})}function Ti(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;Si(e).then(function(e){e&&li([e],t)})}function Ei(e){return function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=(t||{}).icon?t:jr(t||{}),i=n.mask;return i&&=(i||{}).icon?i:jr(i||{}),e(r,O(O({},n),{},{mask:i}))}}var Di=function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=t.transform,r=n===void 0?G:n,i=t.symbol,a=i!==void 0&&i,o=t.mask,s=o===void 0?null:o,c=t.maskId,l=c===void 0?null:c,u=t.classes,d=u===void 0?[]:u,f=t.attributes,p=f===void 0?{}:f,m=t.styles,ee=m===void 0?{}:m;if(e){var h=e.prefix,g=e.iconName,_=e.icon;return Pr(O({type:`icon`},e),function(){return Z(`beforeDOMElementCreation`,{iconDefinition:e,params:t}),Rr({icons:{main:Hr(_),mask:s?Hr(s.icon):{found:!1,width:null,height:null,icon:{}}},prefix:h,iconName:g,transform:O(O({},G),r),symbol:a,maskId:l,extra:{attributes:p,styles:ee,classes:d}})})}},Oi={mixout:function(){return{icon:Ei(Di)}},hooks:function(){return{mutationObserverCallbacks:function(e){return e.treeCallback=wi,e.nodeCallback=Ti,e}}},provides:function(e){e.i2svg=function(e){var t=e.node,n=t===void 0?F:t,r=e.callback;return wi(n,r===void 0?function(){}:r)},e.generateSvgReplacementMutation=function(e,t){var n=t.iconName,r=t.prefix,i=t.transform,a=t.symbol,o=t.mask,s=t.maskId,c=t.extra;return new Promise(function(t,l){Promise.all([Gr(n,r),o.iconName?Gr(o.iconName,o.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(function(o){var l=pe(o,2),u=l[0],d=l[1];t([e,Rr({icons:{main:u,mask:d},prefix:r,iconName:n,transform:i,symbol:a,maskId:s,extra:c,watchable:!0})])}).catch(l)})},e.generateAbstractIcon=function(e){var t=e.children,n=e.attributes,r=e.main,i=e.transform,a=e.styles,o=jn(a);o.length>0&&(n.style=o);var s;return Mn(i)&&(s=Q(`generateAbstractTransformGrouping`,{main:r,transform:i,containerWidth:r.width,iconWidth:r.width})),t.push(s||r.icon),{children:t,attributes:n}}}},ki={mixout:function(){return{layer:function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=t.classes,r=n===void 0?[]:n;return Pr({type:`layer`},function(){Z(`beforeDOMElementCreation`,{assembler:e,params:t});var n=[];return e(function(e){Array.isArray(e)?e.map(function(e){n=n.concat(e.abstract)}):n=n.concat(e.abstract)}),[{tag:`span`,attributes:{class:[`${U.cssPrefix}-layers`].concat(k(r)).join(` `)},children:n}]})}}}},Ai={mixout:function(){return{counter:function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=t.title,r=n===void 0?null:n,i=t.classes,a=i===void 0?[]:i,o=t.attributes,s=o===void 0?{}:o,c=t.styles,l=c===void 0?{}:c;return Pr({type:`counter`,content:e},function(){return Z(`beforeDOMElementCreation`,{content:e,params:t}),Br({content:e.toString(),title:r,extra:{attributes:s,styles:l,classes:[`${U.cssPrefix}-layers-counter`].concat(k(a))}})})}}}},ji={mixout:function(){return{text:function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=t.transform,r=n===void 0?G:n,i=t.classes,a=i===void 0?[]:i,o=t.attributes,s=o===void 0?{}:o,c=t.styles,l=c===void 0?{}:c;return Pr({type:`text`,content:e},function(){return Z(`beforeDOMElementCreation`,{content:e,params:t}),zr({content:e,transform:O(O({},G),r),extra:{attributes:s,styles:l,classes:[`${U.cssPrefix}-layers-text`].concat(k(a))}})})}}},provides:function(e){e.generateLayersText=function(e,t){var n=t.transform,r=t.extra,i=null,a=null;if(Ce){var o=parseInt(getComputedStyle(e).fontSize,10),s=e.getBoundingClientRect();i=s.width/o,a=s.height/o}return Promise.resolve([e,zr({content:e.innerHTML,width:i,height:a,transform:n,extra:r,watchable:!0})])}}},Mi=RegExp(`"`,`ug`),Ni=[1105920,1112319],Pi=O(O(O(O({},{FontAwesome:{normal:`fas`,400:`fas`}}),Ct),Wt),At),Fi=Object.keys(Pi).reduce(function(e,t){return e[t.toLowerCase()]=Pi[t],e},{}),Ii=Object.keys(Fi).reduce(function(e,t){var n=Fi[t];return e[t]=n[900]||k(Object.entries(n))[0][1],e},{});function Li(e){return Jn(k(e.replace(Mi,``))[0]||``)}function Ri(e){var t=e.getPropertyValue(`font-feature-settings`).includes(`ss01`),n=e.getPropertyValue(`content`).replace(Mi,``),r=n.codePointAt(0),i=r>=Ni[0]&&r<=Ni[1],a=n.length===2&&n[0]===n[1];return i||a||t}function zi(e,t){var n=e.replace(/^['"]|['"]$/g,``).toLowerCase(),r=parseInt(t),i=isNaN(r)?`normal`:r;return(Fi[n]||{})[i]||Ii[n]}function Bi(e,t){var n=`${Yt}${t.replace(`:`,`-`)}`;return new Promise(function(r,i){if(e.getAttribute(n)!==null)return r();var a=Dn(e.children).filter(function(e){return e.getAttribute(Jt)===t})[0],o=P.getComputedStyle(e,t),s=o.getPropertyValue(`font-family`),c=s.match(mn),l=o.getPropertyValue(`font-weight`),u=o.getPropertyValue(`content`);if(a&&!c)return e.removeChild(a),r();if(c&&u!==`none`&&u!==``){var d=o.getPropertyValue(`content`),f=zi(s,l),p=Li(d),m=c[0].startsWith(`FontAwesome`),ee=Ri(o),h=ur(f,p),g=h;if(m){var _=pr(p);_.iconName&&_.prefix&&(h=_.iconName,f=_.prefix)}if(h&&!ee&&(!a||a.getAttribute(Xt)!==f||a.getAttribute(Zt)!==g)){e.setAttribute(n,g),a&&e.removeChild(a);var v=yi(),y=v.extra;y.attributes[Jt]=t,Gr(h,f).then(function(i){var a=Rr(O(O({},v),{},{icons:{main:i,mask:mr()},prefix:f,iconName:g,extra:y,watchable:!0})),o=F.createElementNS(`http://www.w3.org/2000/svg`,`svg`);t===`::before`?e.insertBefore(o,e.firstChild):e.appendChild(o),o.outerHTML=a.map(function(e){return Wn(e)}).join(`
`),e.removeAttribute(n),r()}).catch(i)}else r()}else r()})}function Vi(e){return Promise.all([Bi(e,`::before`),Bi(e,`::after`)])}function Hi(e){return e.parentNode!==document.head&&!~en.indexOf(e.tagName.toUpperCase())&&!e.getAttribute(Jt)&&(!e.parentNode||e.parentNode.tagName!==`svg`)}var Ui=function(e){return!!e&&tn.some(function(t){return e.includes(t)})},Wi=function(e){if(!e)return[];var t=new Set,n=e.split(/,(?![^()]*\))/).map(function(e){return e.trim()});n=n.flatMap(function(e){return e.includes(`(`)?e:e.split(`,`).map(function(e){return e.trim()})});var r=w(n),i;try{for(r.s();!(i=r.n()).done;){var a=i.value;if(Ui(a)){var o=tn.reduce(function(e,t){return e.replace(t,``)},a);o!==``&&o!==`*`&&t.add(o)}}}catch(e){r.e(e)}finally{r.f()}return t};function Gi(e){var t=arguments.length>1&&arguments[1]!==void 0&&arguments[1];if(I){var n;if(t)n=e;else if(U.searchPseudoElementsFullScan)n=e.querySelectorAll(`*`);else{var r=new Set,i=w(document.styleSheets),a;try{for(i.s();!(a=i.n()).done;){var o=a.value;try{var s=w(o.cssRules),c;try{for(s.s();!(c=s.n()).done;){var l=c.value,u=w(Wi(l.selectorText)),d;try{for(u.s();!(d=u.n()).done;){var f=d.value;r.add(f)}}catch(e){u.e(e)}finally{u.f()}}}catch(e){s.e(e)}finally{s.f()}}catch(e){U.searchPseudoElementsWarnings&&console.warn(`Font Awesome: cannot parse stylesheet: ${o.href} (${e.message})
If it declares any Font Awesome CSS pseudo-elements, they will not be rendered as SVG icons. Add crossorigin="anonymous" to the <link>, enable searchPseudoElementsFullScan for slower but more thorough DOM parsing, or suppress this warning by setting searchPseudoElementsWarnings to false.`)}}}catch(e){i.e(e)}finally{i.f()}if(!r.size)return;var p=Array.from(r).join(`, `);try{n=e.querySelectorAll(p)}catch{}}return new Promise(function(e,t){var r=Dn(n).filter(Hi).map(Vi),i=Zr.begin(`searchPseudoElements`);di(),Promise.all(r).then(function(){i(),fi(),e()}).catch(function(){i(),fi(),t()})})}}var Ki={hooks:function(){return{mutationObserverCallbacks:function(e){return e.pseudoElementsCallback=Gi,e}}},provides:function(e){e.pseudoElements2svg=function(e){var t=e.node,n=t===void 0?F:t;U.searchPseudoElements&&Gi(n)}}},qi=!1,Ji={mixout:function(){return{dom:{unwatch:function(){di(),qi=!0}}}},hooks:function(){return{bootstrap:function(){mi(Ar(`mutationObserverCallbacks`,{}))},noAuto:function(){hi()},watch:function(e){var t=e.observeMutationsRoot;qi?fi():mi(Ar(`mutationObserverCallbacks`,{observeMutationsRoot:t}))}}}},Yi=function(e){return e.toLowerCase().split(` `).reduce(function(e,t){var n=t.toLowerCase().split(`-`),r=n[0],i=n.slice(1).join(`-`);if(r&&i===`h`)return e.flipX=!0,e;if(r&&i===`v`)return e.flipY=!0,e;if(i=parseFloat(i),isNaN(i))return e;switch(r){case`grow`:e.size+=i;break;case`shrink`:e.size-=i;break;case`left`:e.x-=i;break;case`right`:e.x+=i;break;case`up`:e.y-=i;break;case`down`:e.y+=i;break;case`rotate`:e.rotate+=i}return e},{size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0})},Xi={mixout:function(){return{parse:{transform:function(e){return Yi(e)}}}},hooks:function(){return{parseNodeAttributes:function(e,t){var n=t.getAttribute(`data-fa-transform`);return n&&(e.transform=Yi(n)),e}}},provides:function(e){e.generateAbstractTransformGrouping=function(e){var t=e.main,n=e.transform,r=e.containerWidth,i=e.iconWidth,a={outer:{transform:`translate(${r/2} 256)`},inner:{transform:`${`translate(${n.x*32}, ${n.y*32}) `} ${`scale(${n.size/16*(n.flipX?-1:1)}, ${n.size/16*(n.flipY?-1:1)}) `} ${`rotate(${n.rotate} 0 0)`}`},path:{transform:`translate(${i/2*-1} -256)`}};return{tag:`g`,attributes:O({},a.outer),children:[{tag:`g`,attributes:O({},a.inner),children:[{tag:t.icon.tag,children:t.icon.children,attributes:O(O({},t.icon.attributes),a.path)}]}]}}}},Zi={x:0,y:0,width:`100%`,height:`100%`};function Qi(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return e.attributes&&(e.attributes.fill||t)&&(e.attributes.fill=`black`),e}function $i(e){return e.tag===`g`?e.children:[e]}kr([zn,Oi,ki,Ai,ji,Ki,Ji,Xi,{hooks:function(){return{parseNodeAttributes:function(e,t){var n=t.getAttribute(`data-fa-mask`),r=n?br(n.split(` `).map(function(e){return e.trim()})):mr();return r.prefix||=Y(),e.mask=r,e.maskId=t.getAttribute(`data-fa-mask-id`),e}}},provides:function(e){e.generateAbstractMask=function(e){var t=e.children,n=e.attributes,r=e.main,i=e.mask,a=e.maskId,o=e.transform,s=r.width,c=r.icon,l=i.width,u=i.icon,d=Nn({transform:o,containerWidth:l,iconWidth:s}),f={tag:`rect`,attributes:O(O({},Zi),{},{fill:`white`})},p=c.children?{children:c.children.map(Qi)}:{},m={tag:`g`,attributes:O({},d.inner),children:[Qi(O({tag:c.tag,attributes:O(O({},c.attributes),d.path)},p))]},ee={tag:`g`,attributes:O({},d.outer),children:[m]},h=`mask-${a||En()}`,g=`clip-${a||En()}`,_={tag:`mask`,attributes:O(O({},Zi),{},{id:h,maskUnits:`userSpaceOnUse`,maskContentUnits:`userSpaceOnUse`}),children:[f,ee]},v={tag:`defs`,children:[{tag:`clipPath`,attributes:{id:g},children:$i(u)},_]};return t.push(v,{tag:`rect`,attributes:O({fill:`currentColor`,"clip-path":`url(#${g})`,mask:`url(#${h})`},Zi)}),{children:t,attributes:n}}}},{provides:function(e){var t=!1;P.matchMedia&&(t=P.matchMedia(`(prefers-reduced-motion: reduce)`).matches),e.missingIconAbstract=function(){var e=[],n={fill:`currentColor`},r={attributeType:`XML`,repeatCount:`indefinite`,dur:`2s`};e.push({tag:`path`,attributes:O(O({},n),{},{d:`M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z`})});var i=O(O({},r),{},{attributeName:`opacity`}),a={tag:`circle`,attributes:O(O({},n),{},{cx:`256`,cy:`364`,r:`28`}),children:[]};return t||a.children.push({tag:`animate`,attributes:O(O({},r),{},{attributeName:`r`,values:`28;14;28;28;14;28;`})},{tag:`animate`,attributes:O(O({},i),{},{values:`1;0;1;1;0;1;`})}),e.push(a),e.push({tag:`path`,attributes:O(O({},n),{},{opacity:`1`,d:`M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z`}),children:t?[]:[{tag:`animate`,attributes:O(O({},i),{},{values:`1;0;0;0;0;1;`})}]}),t||e.push({tag:`path`,attributes:O(O({},n),{},{opacity:`0`,d:`M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z`}),children:[{tag:`animate`,attributes:O(O({},i),{},{values:`0;0;1;1;0;0;`})}]}),{tag:`g`,attributes:{class:`missing`},children:e}}}},{hooks:function(){return{parseNodeAttributes:function(e,t){var n=t.getAttribute(`data-fa-symbol`);return e.symbol=n===null?!1:n===``||n,e}}}}],{mixoutsTo:$}),$.noAuto,$.config;var ea=$.library,ta=$.dom
/*!
* Font Awesome Free 7.3.1 by @fontawesome - https://fontawesome.com
* License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
* Copyright 2026 Fonticons, Inc.
*/
;$.parse,$.findIconDefinition,$.toHtml,$.icon,$.layer,$.text,$.counter,ea.add({faChartBar:{prefix:`fas`,iconName:`chart-bar`,icon:[512,512,[`bar-chart`],`f080`,`M32 32c17.7 0 32 14.3 32 32l0 336c0 8.8 7.2 16 16 16l400 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L80 480c-44.2 0-80-35.8-80-80L0 64C0 46.3 14.3 32 32 32zm96 64c0-17.7 14.3-32 32-32l192 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-192 0c-17.7 0-32-14.3-32-32zm32 80l128 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-128 0c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 112l256 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-256 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z`]},faCheckCircle:{prefix:`fas`,iconName:`circle-check`,icon:[512,512,[61533,`check-circle`],`f058`,`M256 512a256 256 0 1 1 0-512 256 256 0 1 1 0 512zM374 145.7c-10.7-7.8-25.7-5.4-33.5 5.3L221.1 315.2 169 263.1c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l72 72c5 5 11.8 7.5 18.8 7s13.4-4.1 17.5-9.8L379.3 179.2c7.8-10.7 5.4-25.7-5.3-33.5z`]},faInfoCircle:{prefix:`fas`,iconName:`circle-info`,icon:[512,512,[`info-circle`],`f05a`,`M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM224 160a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm-8 64l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24z`]},faHeart:{prefix:`fas`,iconName:`heart`,icon:[512,512,[128153,128154,128155,128156,128420,129293,129294,129505,9829,10084,61578],`f004`,`M241 87.1l15 20.7 15-20.7C296 52.5 336.2 32 378.9 32 452.4 32 512 91.6 512 165.1l0 2.6c0 112.2-139.9 242.5-212.9 298.2-12.4 9.4-27.6 14.1-43.1 14.1s-30.8-4.6-43.1-14.1C139.9 410.2 0 279.9 0 167.7l0-2.6C0 91.6 59.6 32 133.1 32 175.8 32 216 52.5 241 87.1z`]}}),ta.watch(),document.querySelector(`[data-current-year]`).textContent=new Date().getFullYear();