var brainfuckCompiler=function(n){"use strict";function r(n,r,t){return{1:n>1?n+t:t,0:"","-1":n<-1?-n+r:r}[Math.sign(n)]}function t(n){return n.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")}function e(n){return Object.keys(n).reduce(function(r,t){return r[t]=n[t],r},{})}function i(n,r){return Object.keys(r||{}).reduce(function(n,t){return n[t]=r[t],n},n)}var u=",.[]<>+-".split(""),o={clean:new RegExp("[^"+t(u.join(""))+"]","g"),value:/[\+\-]+/g,pointer:/[\<\>]+/g,instruction:/[0-9]*./g},c={memorySize:3e4,bits:8,maxInstructions:0};return n.exports.config=function(n){return"undefined"==typeof n?e(c):void i(c,n)},n.exports.compile=function(n,t){var u=i(e(c),t),a=(n+"").replace(o.clean,""),f=a.replace(/\[\-\]/g,"z").replace(o.value,function(n){var t={"+":1,"-":-1},e=n.split("").reduce(function(n,r){return n+t[r]},0);return r(e,"-","+")}).replace(o.pointer,function(n){var t={">":1,"<":-1},e=n.split("").reduce(function(n,r){return n+t[r]},0);return r(e,"<",">")}),p={",":function(){return"m[p]=i();"},".":function(){return"o(m[p]);"},"[":function(){return"while(m[p]){"},"]":function(){return"}"},"<":function(n){return"p-="+n+";while(p<0)p+=l;"},">":function(n){return"p+="+n+";while(p>=l)p-=l;"},"+":function(n){return"m[p]+="+n+";"},"-":function(n){return"m[p]-="+n+";"},z:function(){return"m[p]=0;"}},s=function(n,r){var t=u.maxInstructions>0?"if(!--c)return;":"";return[t,p[n](r)].join("")},l={c:function(n){return n.maxInstructions>0?"let c="+n.maxInstructions+";":""},l:function(n){return["let l=",n.memorySize,";"].join("")},m:function(n){var r={8:"Uint8Array",16:"Uint16Array",32:"Uint32Array"};return["let m=new ",r[n.bits]||r[8],"(l);"].join("")},p:function(){return"let p=0;"},o:function(){return"let o=output||(()=>0);"},i:function(){return"let i=input||(()=>0);"}},m=Object.keys(l).map(function(n){return l[n](u)});(f.match(o.instruction)||[]).map(function(n){var r=+n.slice(0,-1)||1,t=n.slice(-1);m.push(s(t,r))});var d=new Function(["input","output"],m.join(""));return{run:function(n,r){var t=void 0,e=void 0,i=[];return"string"==typeof n?(n=n.split(""),t=function(){var r=n.shift();return r?r.charCodeAt(0):0}):"function"==typeof n&&(t=n),"function"!=typeof r&&(r=function(){return 0}),e=function(n){var t=String.fromCharCode(n);r(n,t),i.push(t)},d(t,e),i.join("")},toString:function(){return d.toString()}}},n.exports}({exports:{}});