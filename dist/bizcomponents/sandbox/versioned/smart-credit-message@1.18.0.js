/* version: 1.18.0 */
window.crc=function(e){function n(n){for(var r,o,l=n[0],u=n[1],c=n[2],f=0,d=[];f<l.length;f++)({}).hasOwnProperty.call(i,o=l[f])&&i[o]&&d.push(i[o][0]),i[o]=0;for(r in u)({}).hasOwnProperty.call(u,r)&&(e[r]=u[r]);for(s&&s(n);d.length;)d.shift()();return a.push.apply(a,c||[]),t()}function t(){for(var e,n=0;n<a.length;n++){for(var t=a[n],r=!0,l=1;l<t.length;l++)0!==i[t[l]]&&(r=!1);r&&(a.splice(n--,1),e=o(o.s=t[0]))}return e}var r={},i={1:0},a=[];function o(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,o),t.l=!0,t.exports}o.m=e,o.c=r,o.d=function(e,n,t){o.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,n){if(1&n&&(e=o(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(o.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)o.d(t,r,function(n){return e[n]}.bind(null,r));return t},o.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(n,"a",n),n},o.o=function(e,n){return{}.hasOwnProperty.call(e,n)},o.p="";var l=("undefined"!=typeof self?self:this).webpackJsonpcrc=("undefined"!=typeof self?self:this).webpackJsonpcrc||[],u=l.push.bind(l);l.push=n,l=l.slice();for(var c=0;c<l.length;c++)n(l[c]);var s=u;return a.push([156,0]),t()}({156:function(e,n,t){"use strict";t.r(n),t.d(n,"setupMessage",(function(){return O}));var r=t(1),i=t(31),a=t(39),o=t(12),l=t.n(o),u=t(3),c=t(10),s=t.n(c),f=t(36),d=t.n(f),p=(t(85),t(37),t(38),t(13));t(2),t(20),Object(p.a)((function(e,n,t){return n.getElementsByClassName(e+"__"+t)[0]})),Object(p.a)((function(e,n){var t=document.createElement("style");t.textContent=n,e.insertBefore(t,e.firstChild)})),Object(p.a)((function(e,n){if(Array.isArray(n))n.forEach((function(n){return e.appendChild(n)}));else if(n instanceof HTMLElement)e.appendChild(n);else if("string"==typeof n){var t=document.createElement("span");t.innerHTML=n,e.appendChild(t)}else!1===n&&e.parentNode.removeChild(e)})),Object(p.a)((function(e,n){if(Array.isArray(n))[].concat(n).reverse().forEach((function(n){return e.insertBefore(n,e.firstChild)}));else if(n instanceof HTMLElement)e.insertBefore(n,e.firstChild);else if("string"==typeof n){var t=document.createElement("span");t.innerHTML=n,e.insertBefore(t,e.firstChild)}else!1===n&&e.parentNode.removeChild(e)}));var m=Object(p.a)((function(e,n,t,r){if(void 0===t&&(t="PayPal Credit"),void 0===r&&(r=""),Array.isArray(n))n.forEach((function(n){return m(e,n,t)}));else if("string"==typeof n){var i=new Image;i.alt=t,i.className="message__logo",i.src=n,r&&(i.srcset=r),e.appendChild(i)}else if("object"==typeof n){var a=n.src,o=n.dimensions,l=o[0],u=o[1],c=new Image;c.src=a,c.alt=t;var s=document.createElement("div");s.className="message__logo message__logo--svg";var f=document.createElement("canvas");f.height=u,f.width=l,s.appendChild(c),s.appendChild(f),e.appendChild(s)}else e.parentNode.removeChild(e)}),2),y=function(e){if(!e)return"NONE";var n,t=s()(d()(e.children),(function(n){return"none"!==function(e){var n;return null==e||null==(n=e.ownerDocument)?void 0:n.defaultView}(e).getComputedStyle(n).getPropertyValue("display")}));return t?(n=t.classList,(s()(["xsmall","small","medium","large","xlarge"],(function(e){return n.contains("tag--"+e)}))||"NONE").toUpperCase()):"NONE"};function g(e){if(!e)return"headline:NONE::subheadline:NONE::disclaimer:NONE";var n=[e.querySelector(".message__headline"),e.querySelector(".message__subheadline"),e.querySelector(".message__disclaimer")],t=n[1],r=n[2];return"headline:"+y(n[0])+"::subheadline:"+y(t)+"::disclaimer:"+y(r)}var h=t(159),b=t(163),v=function(){var e,n=Object(i.b)(),t=n.amount,o=n.currency,c=n.buyerCountry,s=n.style,f=n.offer,d=n.payerId,p=n.clientId,m=n.merchantId,y=n.onClick,v=n.onReady,O=n.onHover,j=n.onMarkup,_=n.resize,w=Object(a.b)(),C=w.markup,N=w.meta,E=w.parentStyles,S=w.warnings,M=w.setServerData,k=Object(u.i)({width:0,height:0}),P=Object(u.i)(),x=function(){"function"==typeof O&&O({meta:N})};return Object(u.f)((function(){"function"==typeof j&&j({meta:N,styles:E,warnings:S})}),[E,S,C]),Object(u.f)((function(){"function"==typeof v&&v({meta:N,activeTags:g(P.current)})}),[N.messageRequestId]),Object(b.b)((function(){var e=P.current.offsetWidth,n=P.current.offsetHeight;k.current.width===e&&k.current.height===n?_({width:e,height:n}):k.current={width:e,height:n}})),Object(b.a)((function(){var e=l()({message_request_id:N.messageRequestId,amount:t,currency:o,buyer_country:c,style:s,credit_type:f,payer_id:d,client_id:p,merchant_id:m}).filter((function(e){return Boolean(e[1])})).reduce((function(e,n){var t=n[1];return e+"&"+n[0]+"="+encodeURIComponent("object"==typeof t?JSON.stringify(t):t)}),"").slice(1);Object(h.b)("GET",window.location.origin+"/credit-presentment/renderMessage?"+e).then((function(e){var n,t,r,i,a=e.data;M({markup:null!=(n=a.markup)?n:C,meta:null!=(t=a.meta)?t:N,parentStyles:null!=(r=a.parentStyles)?r:E,warnings:null!=(i=a.warnings)?i:S})}))}),[t,o,c,JSON.stringify(s),f,d,p,m]),Object(r.g)("button",{type:"button",ref:P,onClick:function(){"function"==typeof y&&y({meta:N})},onMouseOver:x,onFocus:x,"aria-label":"PayPal Credit Message",style:{display:"block",background:"transparent",padding:0,border:"none",outline:"none",textAlign:(null==s||null==(e=s.text)?void 0:e.align)||"left",fontFamily:"inherit",fontSize:"inherit"},innerHTML:C})};function O(e){var n=e.markup,t=e.meta,o=e.parentStyles,l=e.warnings;Object(r.j)(Object(r.g)(i.a,null,Object(r.g)(a.a,{data:{markup:n,meta:t,parentStyles:o,warnings:l}},Object(r.g)(v,null))),document.body)}}});
//# sourceMappingURL=smart-credit-message@1.18.0.js.map