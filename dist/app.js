"use strict";var _slicedToArray=function(){function e(e,t){var n=[],r=!0,i=!1,o=void 0;try{for(var s,a=e[Symbol.iterator]();!(r=(s=a.next()).done)&&(n.push(s.value),!t||n.length!==t);r=!0);}catch(e){i=!0,o=e}finally{try{!r&&a.return&&a.return()}finally{if(i)throw o}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();angular.module("bi",["ui.codemirror"]).controller("mainCtrl",["$scope","$http","$timeout",function(e,t,n){e.ref={code:"",processing:!1},e.editorOptions={lineNumbers:!0,theme:"monokai",lineWrapping:!0,height:"auto"},t.get("dist/examples.json").then(function(t){e.ref.examples=t.data.map(function(e){return{name:e}})},function(e){alert("failed loading examples")}),e.load=function(){t.get("examples/"+e.ref.example.name).then(function(t){e.ref.code=t.data},function(e){alert("failed loading example")})},e.run=function(){e.ref.processing=!0,e.ref.output="";var t=new Worker("dist/workers/worker.js");t.postMessage([e.ref.code,e.ref.input]);var r=[],i=void 0;!function t(){e.ref.output=r.join(""),i=n(t,200)}(),t.onmessage=function(o){var s=o.data.split(","),a=_slicedToArray(s,2),l=a[0],u=a[1];"data"===l?r.push(u):"end"===l&&(e.$apply(function(){e.ref.processing=!1,e.ref.output=r.join("")}),n.cancel(i),t.terminate())}},e.clean=function(){e.ref.input="",e.ref.output=""}}]);