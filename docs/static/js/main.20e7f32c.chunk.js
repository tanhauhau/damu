(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{223:function(e,t,n){e.exports=n(550)},228:function(e,t,n){},25:function(e,t,n){e.exports={App:"_3HGgo8YmsRzzR-43XGuiVo",navbar:"gBnLqs9WpuhQyk5qcuBFE",brand:"_1ANlngfxtlZL_wfXyTiiOt",preview:"_1g_0nYQynQCg9NHI5earA",previewDashboard:"_2dc8blJjyeHHcxcYajKPbp","preview-html":"_2I0726fxMFLvUluQZyK_h2","preview-both":"_1XiMwV8qMU22Ph0eS3Pi0D","preview-code":"_8wfWpLf3i2rFaC1LnaJXO"}},48:function(e,t,n){e.exports={App:"_2MqrEPH7wRGTUnAVXplCQU",title:"_24SQRvaGQXqT_X5Wyx2Ndf",subtitle:"m60etY5PtB6SdZqnydOx6",button:"_36HiqEt255U7c_x1fj-oiL"}},548:function(e,t,n){},550:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n.n(r),i=n(217),o=n.n(i),s=(n(228),n(71)),c=n(72),l=n(74),u=n(73),m=n(75),p=n(552),d=n(553),f=n(554),h=n(551),v=n(48),g=n.n(v);function y(){return a.a.createElement("div",{className:g.a.App},a.a.createElement("div",null,a.a.createElement("h1",{className:g.a.title},"Damu"),a.a.createElement("h2",{className:g.a.subtitle},"A React Compiler"),a.a.createElement(h.a,{to:"/repl"},a.a.createElement("button",{className:g.a.button},"REPL"))))}var b=n(555),E=n(218),w=n.n(E),x=n(114),S=n.n(x),N=(n(79),n(239),n(240),n(242),n(69)),C=n(115),D=n(219),M=n.n(D),O=n(70),k=n(0),R=n(24),j=A(function(e,t){(t=Array.isArray(t)?t:[t]).forEach(function(t){e.appendChild(t)})}),_=A(function(e,t){(t=Array.isArray(t)?t:[t]).forEach(function(t){"function"===typeof t.render&&(t=t.render()),e.appendChild(t)})});function A(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return Object(R.parseSync)(t.join("").toString()).program.body[0]}var P={APPEND_CHILDREN:Symbol("__has_appendChildren__"),APPEND_COMPONENT:Symbol("__has_appendComponent__")};function J(e,t){(function(e){return e.findParent(function(e){return e.isProgram()})}(e))[t]=!0}var L=["abort","blur","canplay","canplaythrough","cancel","change","click","close","compositionend","compositionstart","compositionupdate","contextmenu","copy","cut","dblclick","auxclick","drag","dragend","dragenter","dragexit","dragleave","dragover","dragstart","drop","durationchange","emptied","encrypted","ended","error","focus","gotpointercapture","input","invalid","keydown","keypress","keyup","load","loadstart","loadeddata","loadedmetadata","lostpointercapture","mousedown","mousemove","mouseout","mouseover","mouseup","paste","pause","play","playing","pointercancel","pointerdown","pointerenter","pointerleave","pointermove","pointerout","pointerover","pointerup","progress","ratechange","reset","scroll","seeked","seeking","selectionchange","stalled","submit","suspend","textInput","timeupdate","toggle","touchcancel","touchend","touchmove","touchstart","animationend","animationiteration","animationstart","transitionend","volumechange","waiting","wheel"],I=new Map;function X(e,t,n){return k.expressionStatement(k.callExpression(k.memberExpression(e,k.identifier("setAttribute")),[k.stringLiteral(t),n]))}I.set("className",function(e,t){return k.expressionStatement(k.assignmentExpression("=",k.memberExpression(e,k.identifier("className")),t))}),I.set("style",function(e,t){switch(t.type){case"ObjectExpression":return function(e,t){return t.properties.map(function(t){var n=t.key,r=t.value;return k.expressionStatement(k.assignmentExpression("=",k.memberExpression(k.memberExpression(e,k.identifier("style")),n),function(e){if("NumericLiteral"===e.type)return k.stringLiteral(e.value+"px");return e}(r)))})}(e,t);case"StringLiteral":return function(e,t){return X(e,"style",t)}(e,t)}}),I.set(/^on[A-Z]\S+$/,function(e,t,n){var r=!1,a=t.slice(2).toLowerCase();if(!L.includes(a)){if(!L.includes(a.replace("capture","")))return X(e,t,n);a=a.replace("capture",""),r=!0}return k.expressionStatement(k.callExpression(k.memberExpression(e,k.identifier("addEventListener")),[k.stringLiteral(a),n,r&&k.booleanLiteral(r)].filter(Boolean)))});var U=Object(O.declare)(function(e,t){return e.assertVersion(7),{name:"babel-transform-damu-plugin",inherits:M.a,visitor:{JSXElement:function(e){var t=W(e),n=t.identifier,r=t.statements;e.replaceWith(n),r.forEach(function(t){z(e,t)})},JSXFragment:function(e){var t,n=e.get("children").filter(G).map(function(e){return T(e)}).reduce(function(e,t){var n,r=t.identifier,a=t.statements;return e.identifiers.push(r),(n=e.statements).push.apply(n,Object(C.a)(a)),e},{identifiers:[],statements:[]}),r=n.identifiers,a=n.statements;e.replaceWith((t=r,k.arrayExpression(t))),a.forEach(function(t){z(e,t)})},CallExpression:{enter:function(e){e.has("arguments.0.type")&&["ArrowFunctionExpression","FunctionExpression"].includes(e.get("arguments.0.type").node)&&q(e.get("arguments.0.body"))},exit:function(e){if((a=e.node).callee&&"MemberExpression"===a.callee.type&&a.callee.object&&"Identifier"===a.callee.object.type&&"ReactDOM"===a.callee.object.name&&"Identifier"===a.callee.property.type&&"render"===a.callee.property.name){var t=e.node.arguments,n=t[0],r=t[1];e.replaceWith(H(r,n,e))}var a}},ImportDeclaration:function(e){["react","react-dom"].includes(e.node.source.value)&&e.remove()},Program:{exit:function(e){[e.scope.bindings.React,e.scope.bindings.ReactDOM].forEach(function(e){e&&e.path.remove()}),e[P.APPEND_CHILDREN]&&(e[P.APPEND_COMPONENT]?e.pushContainer("body",_):e.pushContainer("body",j))}}}}});function T(e,t){switch(e.node.type){case"JSXElement":return W(e,t);case"JSXText":case"StringLiteral":return function(e,t){var n=e.scope.generateUidIdentifier("text"),r=[F(n,k.stringLiteral(e.node.value))];t&&r.push(H(t,n,e));return{identifier:n,statements:r}}(e,t);case"JSXExpressionContainer":return function(e,t){switch(e.node.expression.type){case"BinaryExpression":return function(e,t){var n=e.scope.generateUidIdentifier("result"),r=[F(n,e.node)];t&&r.push(H(t,n,e));return{identifier:n,statements:r}}(e.get("expression"),t);case"CallExpression":return function(e,t){if(n=e.node,n.callee&&"MemberExpression"===n.callee.type&&n.callee.property&&"Identifier"===n.callee.property.type&&"map"===n.callee.property.name&&n.arguments&&1===n.arguments.length&&["FunctionExpression","ArrowFunctionExpression"].includes(n.arguments[0].type))return function(e,t){if(q(e.get("arguments.0.body")),t){e.get("callee.property").replaceWith(k.identifier("forEach"));var n=e.get("arguments.0.body.body"),r=n.find(function(e){return"ReturnStatement"===e.node.type});r&&r.replaceWith(H(t,r.node.argument,e));var a=[k.expressionStatement(e.node)];return{identifier:null,statements:a}}var i=e.scope.generateUidIdentifier("lists"),o=[B(i,e.node)];return{identifier:i,statements:o}}(e,t);var n;var r=e.scope.generateUidIdentifier("result"),a=[B(r,e.node)];t&&a.push(H(t,r,e));return{identifier:r,statements:a}}(e.get("expression"),t);case"LogicalExpression":return function(e,t){switch(e.node.operator){case"&&":return function(e,t){var n=e.scope.generateUidIdentifier("result"),r=T(e.get("right"),t),a=[Q(e.node.left,r.statements)];return{identifier:n,statements:a}}(e,t);case"||":return function(e,t){var n=e.scope.generateUidIdentifier("result"),r=T(e.get("left"),t),a=T(e.get("right"),t),i=[Q(e.node.left,r.statements,a.statements)];return{identifier:n,statements:i}}(e,t)}throw new Error("Unknown logical operator: "+e.node.operator)}(e.get("expression"),t);case"ConditionalExpression":return function(e,t){var n=e.scope.generateUidIdentifier("result"),r=T(e.get("consequent"),t),a=T(e.get("alternate"),t),i=[Q(e.node.test,r.statements,a.statements)];return{identifier:n,statements:i}}(e.get("expression"),t);default:return T(e.get("expression"),t)}throw new Error("Unknown expression type: "+e.node.expression.type)}(e,t);case"Identifier":case"MemberExpression":return function(e,t){var n=e.node,r=t?[H(t,n,e)]:[];return{identifier:n,statements:r}}(e,t);default:throw new Error("Unknown element type: "+e.node.type)}}function W(e,t){var n=function e(t){switch(t.type){case"JSXMemberExpression":return e(t.object)+"."+e(t.property);case"JSXIdentifier":return t.name;default:throw new Error("Unknown type: "+t.type)}}(e.node.openingElement.name),r=e.scope.generateUidIdentifier(n);if(J(e,P.APPEND_COMPONENT),/^[A-Z]/.test(n)){var a=[k.expressionStatement(k.assignmentExpression("=",r,k.newExpression(k.identifier(n),[])))];return{identifier:r,statements:a}}var i=[],o=function(e,t){return B(e,k.callExpression(k.memberExpression(k.identifier("document"),k.identifier("createElement")),[k.stringLiteral(t)]))}(r,n);return i.push(o),e.node.openingElement.attributes.map(function(e){return function(e,t,n,r){var a="JSXExpressionContainer"===n.type?n.expression:n,i=!0,o=!1,s=void 0;try{for(var c,l=I.keys()[Symbol.iterator]();!(i=(c=l.next()).done);i=!0){var u=c.value;if("string"===typeof u&&t===u)return I.get(u)(e,a);if("function"===typeof u.test&&u.test(t))return I.get(u)(e,t,a)}}catch(m){o=!0,s=m}finally{try{i||null==l.return||l.return()}finally{if(o)throw s}}return X(e,t,a)}(r,e.name.name,e.value)}).forEach(function(e){return i.push(e)}),e.get("children").filter(G).map(function(e){return T(e,r)}).map(function(e){return e.statements}).forEach(function(e){return i.push.apply(i,Object(C.a)(e))}),t&&i.push(H(t,r,e)),{identifier:r,statements:i}}function q(e){return"BlockStatement"!==e.node.type&&e.replaceWith(k.blockStatement([k.returnStatement(e.node)])),e}function F(e,t){return B(e,k.callExpression(k.memberExpression(k.identifier("document"),k.identifier("createTextNode")),[t]))}function B(e,t){return k.variableDeclaration("const",[k.variableDeclarator(e,t)])}function H(e,t,n){return J(n,P.APPEND_CHILDREN),k.expressionStatement(k.callExpression(k.identifier("__damu__appendChildren"),[e,t]))}function G(e){return!("JSXText"===e.node.type&&""===e.node.value.trim())}function Q(e,t,n){var r=t?Array.isArray(t)?t:[t]:[],a=n?Array.isArray(n)?n:[n]:[];return k.ifStatement(e,k.blockStatement(r),n?k.blockStatement(a):null)}function z(e,t){var n=e.scope.path;switch(n.node.type){case"ArrowFunctionExpression":case"FunctionExpression":case"FunctionDeclaration":case"ClassMethod":n=n.get("body")}for(var r=n.get("body"),a=e;a&&!r.includes(a);)a=a.parentPath;a?a.insertBefore(t):n.unshiftContainer("body",t)}var V=n(220),Y=n.n(V),Z=n(78),$=n.n(Z),K=n(25),ee=n.n(K),te=Object.keys($.a),ne={$blockScrolling:!0},re={useWorker:!1};function ae(e){return e=decodeURIComponent(e.slice(1)),te.includes(e)?e:"01 simple"}var ie=function(e){function t(e){var n;Object(s.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).onChange=function(e){n.setState({value:e,error:null}),n.transpile(e)},n.onChangeTemplate=function(e){n.props.history.replace(n.props.location.pathname+"#"+e.currentTarget.value)},n.onChangeDemo=function(e){var t=$.a[e];n.setState({selectedDemo:e,value:t,error:null}),n.transpile(t)},n.onPreviewModeChange=function(e){n.setState({previewMode:e.currentTarget.value})},n.transpile=function(e){N.transformAsync(e,{plugins:[Y.a,U]}).then(function(e){var t;if(n.setState({transpiled:(t=e.code,t.split("\n").filter(function(e){return""!==e.trim()}).map(function(e){return/^[\s\t]*(const|document|if|function)/.test(e)?"\n"+e:e}).join("\n").trim())}),n.iframe){for(;n.iframe.firstChild;)n.iframe.removeChild(n.iframe.firstChild);var r=document.createElement("iframe");n.iframe.appendChild(r);var a=r.contentDocument||r.contentWindow.document;a.open(),a.write(function(e){return'<html>\n    <body>\n      <div id="app" />\n    </body>\n    <script type="text/javascript">'.concat(e,"<\/script>\n  </html>")}(e.code)),a.close()}}).catch(function(e){if(console.error(e),n.setState({transpiled:"",error:e.message}),n.iframe)for(;n.iframe.firstChild;)n.iframe.removeChild(n.iframe.firstChild)})},n.onIframeRef=function(e){n.iframe=e};var r=ae(e.location.hash);return n.state={value:$.a[r],selectedDemo:r,transpiled:"",error:null,previewMode:"both"},n}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.transpile(this.state.value)}},{key:"componentDidUpdate",value:function(e){e.location.hash!==this.props.location.hash&&this.onChangeDemo(ae(this.props.location.hash))}},{key:"render",value:function(){var e=this,t=this.state.previewMode;return a.a.createElement(w.a,{minWidth:600},function(n){return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:ee.a.navbar},a.a.createElement(h.a,{to:"/",className:ee.a.brand},"Damu"),a.a.createElement("label",null,"Demo: ",a.a.createElement("select",{onChange:e.onChangeTemplate,value:e.state.selectedDemo},te.map(function(e){return a.a.createElement("option",{key:e,value:e},e)}))),a.a.createElement("a",{target:"_blank",rel:"noreferrer noopener",href:"https://github.com/tanhauhau/damu"},"View it on Github")),a.a.createElement("div",{className:ee.a.App},a.a.createElement(S.a,{height:n?"calc(100vh - 50px)":"80vh",width:n?"50vw":"100vw",mode:"jsx",theme:"tomorrow",fontSize:14,onChange:e.onChange,showGutter:!0,name:"editor",value:e.state.value,editorProps:ne,tabSize:2,enableBasicAutocompletion:!0,enableLiveAutocompletion:!0,showLineNumbers:!0}),a.a.createElement("div",{className:ee.a.preview+" "+ee.a["preview-"+t]},a.a.createElement("div",{className:ee.a.previewDashboard},a.a.createElement("div",null,a.a.createElement("label",null,a.a.createElement("input",{id:"both",value:"both",name:"preview-mode",type:"radio",checked:"both"===t,onChange:e.onPreviewModeChange}),"Both"),a.a.createElement("label",null,a.a.createElement("input",{id:"code",value:"code",name:"preview-mode",type:"radio",checked:"code"===t,onChange:e.onPreviewModeChange}),"Code"),a.a.createElement("label",null,a.a.createElement("input",{id:"html",value:"html",name:"preview-mode",type:"radio",checked:"html"===t,onChange:e.onPreviewModeChange}),"HTML"))),a.a.createElement(S.a,{height:"calc(".concat("code"===t?100:50,"vh - 80px)"),width:n?"50vw":"100vw",mode:"javascript",theme:"tomorrow",readOnly:!0,fontSize:14,showGutter:!0,name:"preview",value:e.state.error||e.state.transpiled,editorProps:ne,tabSize:2,showLineNumbers:!0,setOptions:re}),a.a.createElement("div",{ref:e.onIframeRef}))))})}}]),t}(r.Component);var oe=Object(b.a)(ie),se=(n(548),function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return a.a.createElement(p.a,{basename:"/damu"},a.a.createElement(d.a,null,a.a.createElement(a.a.Fragment,null,a.a.createElement(f.a,{path:"/",exact:!0,component:y}),a.a.createElement(f.a,{path:"/repl",exact:!0,component:oe}))))}}]),t}(r.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(a.a.createElement(se,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},78:function(e,t){e.exports={"01 simple":"import React from 'react';\nimport ReactDOM from 'react-dom';\n\nReactDOM.render(\n  <h1 id=\"title\" height={54}>\n    Hello world\n  </h1>,\n  document.querySelector('#app')\n);\n","02 fragment":"import React from 'react';\nimport ReactDOM from 'react-dom';\n\nReactDOM.render(\n  <>\n    <h2>The Damu-Madu Project</h2>\n    <p>\n      The Damu-Madu sister project aims to bring the developer experience of\n      writing JSX (XML in JavaScript) without having to use React.\n    </p>\n    <p>\n      JSX is independent of React, you don't have to use React just to use JSX\n      in your development process.\n    </p>\n    <p>\n      The Damu-Madu sister project contains solution for both client render and\n      server render:\n    </p>\n    <ul>\n      <li>\n        <a href=\"https://github.com/tanhauhau/madu\">madu</a> - Writing jsx as if\n        html string\n      </li>\n      <li>\n        <a href=\"https://github.com/tanhauhau/damu\">damu</a> - Converts jsx to\n        vanilla javascript\n      </li>\n    </ul>\n  </>,\n  document.querySelector('#app')\n);\n","03 list":'import React from \'react\';\nimport ReactDOM from \'react-dom\';\n\nReactDOM.render(\n  <div className="body">\n    <h1 className="header">You shall not pass</h1>\n    <ul>\n      <li id="frodo">Frodo Baggins</li>\n      <li id="samwise">Samwise Gamgee</li>\n      <li id="gandalf">Gandalf the Grey</li>\n      <li id="legolas">Legolas</li>\n      <li id="gimli">Gimli</li>\n      <li id="aragorn">Aragorn</li>\n      <li id="boromir">Boromir</li>\n      <li id="meriadoc">Meriadoc</li>\n      <li id="peregrin">Peregrin</li>\n    </ul>\n  </div>,\n  document.querySelector(\'#app\')\n);\n',"04 map":"import React from 'react';\nimport ReactDOM from 'react-dom';\n\nconst buyers = [\n  {\n    firstName: 'James',\n    lastName: 'Steven',\n    followers: [{ firstName: 'James', lastName: 'Steven' }],\n  },\n  {\n    firstName: 'James',\n    lastName: 'Steven',\n    followers: [\n      { firstName: 'James', lastName: 'Steven' },\n      { firstName: 'James', lastName: 'Steven' },\n    ],\n  },\n  {\n    firstName: 'James',\n    lastName: 'Steven',\n    followers: [\n      { firstName: 'James', lastName: 'Steven' },\n      { firstName: 'James', lastName: 'Steven' },\n      { firstName: 'James', lastName: 'Steven' },\n    ],\n  },\n  {\n    firstName: 'James',\n    lastName: 'Steven',\n    followers: [\n      { firstName: 'James', lastName: 'Steven' },\n      { firstName: 'James', lastName: 'Steven' },\n      { firstName: 'James', lastName: 'Steven' },\n      { firstName: 'James', lastName: 'Steven' },\n    ],\n  },\n];\n\nReactDOM.render(\n  <ul>\n    {buyers.map(buyer => (\n      <li>\n        {buyer.firstName + ' - ' + buyer.lastName}\n        {buyer.followers.map((follower, index) => (\n          <>\n            <li>\n              {index + '. ' + follower.firstName + ' - ' + follower.lastName}\n            </li>\n            <li className=\"hidden\">{index % 2 == 0 ? 'odd' : 'even'}</li>\n          </>\n        ))}\n      </li>\n    ))}\n  </ul>,\n  document.querySelector('#app')\n);\n","05 events":"import React from 'react';\nimport ReactDOM from 'react-dom';\n\nReactDOM.render(\n  <div\n    style={{\n      cursor: 'pointer',\n      padding: 10,\n      border: '1px solid black',\n      display: 'inline-block',\n    }}\n    onClick={() => {\n      alert('Hello Damu!');\n    }}\n  >\n    Click Me\n  </div>,\n  document.querySelector('#app')\n);\n","06 component":"import React from 'react';\nimport ReactDOM from 'react-dom';\n\nclass CounterApp extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      counter: 0,\n    };\n  }\n\n  onIncrement = () => {\n    this.setState({ counter: this.state.counter + 1 });\n  };\n  onDecrement = () => {\n    this.setState({ counter: this.state.counter - 1 });\n  };\n\n  render() {\n    return (\n      <div>\n        <div>{'counter: ' + this.state.counter}</div>\n        <button onClick={this.onIncrement}>+</button>\n        <button onClick={this.onDecrement}>-</button>\n      </div>\n    );\n  }\n}\n\nReactDOM.render(<CounterApp />, document.querySelector('#app'));\n"}}},[[223,2,1]]]);
//# sourceMappingURL=main.20e7f32c.chunk.js.map