(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{178:function(e,t,n){e.exports=n(476)},183:function(e,t,n){},474:function(e,t,n){},476:function(e,t,n){"use strict";n.r(t);var r=n(1),i=n.n(r),a=n(171),o=n.n(a),s=(n(183),n(172)),l=n(173),c=n(176),u=n(174),d=n(177),m=n(87),p=n.n(m),f=(n(52),n(192),n(193),n(195),n(50)),h=n(88),v=n(175),g=n.n(v),b=n(86),y=n(0),w=Object(b.declare)(function(e,t){return e.assertVersion(7),{name:"babel-transform-damu-plugin",inherits:g.a,visitor:{JSXElement:function(e){var t=x(e),n=t.identifier,r=t.statements;e.replaceWith(n),r.reverse().forEach(function(t){M(e.scope.path,t)})},JSXFragment:function(e){var t,n=e.get("children").filter(k).map(function(e){return E(e)}).reduce(function(e,t){var n,r=t.identifier,i=t.statements;return e.identifiers.push(r),(n=e.statements).push.apply(n,Object(h.a)(i)),e},{identifiers:[],statements:[]}),r=n.identifiers,i=n.statements;e.replaceWith((t=r,y.arrayExpression(t))),i.reverse().forEach(function(t){M(e.scope.path,t)})},CallExpression:{exit:function(e){if((i=e.node).callee&&"MemberExpression"===i.callee.type&&i.callee.object&&"Identifier"===i.callee.object.type&&"Damu"===i.callee.object.name&&"Identifier"===i.callee.property.type&&"render"===i.callee.property.name){var t=e.node.arguments,n=t[0],r=t[1];e.replaceWith(j(r,n))}var i}},Program:{exit:function(e){var t=e.scope.bindings.Damu;t&&t.path.remove()}}}}});function E(e,t){switch(e.node.type){case"JSXElement":return x(e,t);case"JSXText":case"StringLiteral":return function(e,t){var n=e.scope.generateUidIdentifier("text"),r=[S(n,y.stringLiteral(e.node.value))];t&&r.push(j(t,n));return{identifier:n,statements:r}}(e,t);case"JSXExpressionContainer":return function(e,t){switch(e.node.expression.type){case"BinaryExpression":return function(e,t){var n=e.scope.generateUidIdentifier("result"),r=[S(n,e.node)];t&&r.push(j(t,n));return{identifier:n,statements:r}}(e.get("expression"),t);case"CallExpression":return function(e,t){if(n=e.node,n.callee&&"MemberExpression"===n.callee.type&&n.callee.property&&"Identifier"===n.callee.property.type&&"map"===n.callee.property.name&&n.arguments&&1===n.arguments.length&&["FunctionExpression","ArrowFunctionExpression"].includes(n.arguments[0].type))return function(e,t){if(function(e){"BlockStatement"!==e.node.type&&e.replaceWith(y.blockStatement([y.returnStatement(e.node)]))}(e.get("arguments.0.body")),t){e.get("callee.property").replaceWith(y.identifier("forEach"));var n=e.get("arguments.0.body.body"),r=n.find(function(e){return"ReturnStatement"===e.node.type});r&&r.replaceWith(j(t,r.node.argument));var i=[y.expressionStatement(e.node)];return{identifier:null,statements:i}}var a=e.scope.generateUidIdentifier("lists"),o=[C(a,e.node)];return{identifier:a,statements:o}}(e,t);var n;var r=e.scope.generateUidIdentifier("result"),i=[C(r,e.node)];t&&i.push(j(t,r));return{identifier:r,statements:i}}(e.get("expression"),t);case"LogicalExpression":return function(e,t){switch(e.node.operator){case"&&":return function(e,t){var n=e.scope.generateUidIdentifier("result"),r=E(e.get("right"),t),i=[D(e.node.left,r.statements)];return{identifier:n,statements:i}}(e,t);case"||":return function(e,t){var n=e.scope.generateUidIdentifier("result"),r=E(e.get("left"),t),i=E(e.get("right"),t),a=[D(e.node.left,r.statements,i.statements)];return{identifier:n,statements:a}}(e,t)}throw new Error("Unknown logical operator: "+e.node.operator)}(e.get("expression"),t);case"ConditionalExpression":return function(e,t){var n=e.scope.generateUidIdentifier("result"),r=E(e.get("consequent"),t),i=E(e.get("alternate"),t),a=[D(e.node.test,r.statements,i.statements)];return{identifier:n,statements:a}}(e.get("expression"),t);default:return E(e.get("expression"),t)}throw new Error("Unknown expression type: "+e.node.expression.type)}(e,t);case"Identifier":case"MemberExpression":return function(e,t){var n=e.node,r=t?[j(t,n)]:[];return{identifier:n,statements:r}}(e,t);default:throw new Error("Unknown element type: "+e.node.type)}}function x(e,t){var n=function e(t){switch(t.type){case"JSXMemberExpression":return e(t.object)+"."+e(t.property);case"JSXIdentifier":return t.name;default:throw new Error("Unknown type: "+t.type)}}(e.node.openingElement.name),r=e.scope.generateUidIdentifier(n),i=[],a=function(e,t){return C(e,y.callExpression(y.memberExpression(y.identifier("document"),y.identifier("createElement")),[y.stringLiteral(t)]))}(r,n);return i.push(a),e.node.openingElement.attributes.map(function(e){return function(e,t,n){var r="JSXExpressionContainer"===n.type?n.expression:n;return y.expressionStatement(y.callExpression(y.memberExpression(e,y.identifier("setAttribute")),[y.stringLiteral(t),r]))}(r,e.name.name,e.value)}).forEach(function(e){return i.push(e)}),e.get("children").filter(k).map(function(e){return E(e,r)}).map(function(e){return e.statements}).forEach(function(e){return i.push.apply(i,Object(h.a)(e))}),t&&i.push(j(t,r)),{identifier:r,statements:i}}function S(e,t){return C(e,y.callExpression(y.memberExpression(y.identifier("document"),y.identifier("createTextNode")),[t]))}function C(e,t){return y.variableDeclaration("const",[y.variableDeclarator(e,t)])}function j(e,t){return"ArrayExpression"===t.type?y.expressionStatement(y.sequenceExpression(t.elements.map(function(t){return j(e,t).expression}))):y.expressionStatement(y.callExpression(y.memberExpression(e,y.identifier("appendChild")),[t]))}function k(e){return!("JSXText"===e.node.type&&""===e.node.value.trim())}function D(e,t,n){var r=t?Array.isArray(t)?t:[t]:[],i=n?Array.isArray(n)?n:[n]:[];return y.ifStatement(e,y.blockStatement(r),n?y.blockStatement(i):null)}function M(e,t){switch(e.node.type){case"ArrowFunctionExpression":case"FunctionExpression":case"FunctionDeclaration":return void e.get("body").unshiftContainer("body",t);default:e.unshiftContainer("body",t)}}var I={simple:"const Damu = require('@damu/damu');\n\nDamu.render(\n  <h1 id=\"title\" height={54}>Hello world</h1>,\n  document.querySelector('#app')\n);",fragment:"const Damu = require('@damu/damu');\n\nDamu.render(\n  <>\n    <h2>The Damu-Madu Project</h2>\n    <p>The Damu-Madu sister project aims to bring the developer experience of writing JSX (XML in JavaScript) without having to use React.</p>\n    <p>JSX is independent of React, you don't have to use React just to use JSX in your development process.</p>\n    <p>The Damu-Madu sister project contains solution for both client render and server render:</p>\n    <ul>\n      <li><a href=\"https://github.com/tanhauhau/madu\">madu</a> - Writing jsx as if html string</li>\n      <li><a href=\"https://github.com/tanhauhau/damu\">damu</a> - Converts jsx to vanilla javascript</li>\n    </ul>\n  </>,\n  document.querySelector('#app')\n);",list:'const Damu = require(\'@damu/damu\');\n\nDamu.render(\n  <div className="body">\n    <h1 className="header">You shall not pass</h1>\n    <ul>\n      <li id="frodo">Frodo Baggins</li>\n      <li id="samwise">Samwise Gamgee</li>\n      <li id="gandalf">Gandalf the Grey</li>\n      <li id="legolas">Legolas</li>\n      <li id="gimli">Gimli</li>\n      <li id="aragorn">Aragorn</li>\n      <li id="boromir">Boromir</li>\n      <li id="meriadoc">Meriadoc</li>\n      <li id="peregrin">Peregrin</li>\n    </ul>\n  </div>,\n  document.querySelector(\'#app\')\n);',map:"const Damu = require('@damu/damu');\n\nDamu.render(\n  <li>\n    {buyers.map(buyer => (\n      <li>\n        {buyer.firstName} - {buyer.lastName}\n        {buyer.followers.map((follower, index) => (\n          <>\n            <li>\n              {index}. {follower.firstName} - {follower.lastName}\n            </li>\n            <li className=\"hidden\">\n              {index % 2 == 0 ? 'odd' : 'even'}\n            </li>\n          </>\n        ))}\n      </li>\n    ))}\n  </li>,\n  document.querySelector('#app')\n);"},J=(n(474),Object.keys(I)),N={$blockScrolling:!0},A={useWorker:!1};var X=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(c.a)(this,Object(u.a)(t).call(this,e))).onChange=function(e){n.setState({value:e,error:null}),n.transpile(e)},n.onChangeTemplate=function(e){var t=I[e.currentTarget.value];n.setState({value:t,error:null}),n.transpile(t)},n.onPreviewModeChange=function(e){n.setState({previewMode:e.currentTarget.value})},n.transpile=function(e){f.transformAsync(e,{plugins:[w]}).then(function(e){var t;if(n.setState({transpiled:(t=e.code,t.split("\n").filter(function(e){return""!==e.trim()}).map(function(e){return/^[\s\t]*(const|document|if)/.test(e)?"\n"+e:e}).join("\n").trim())}),n.iframe){for(;n.iframe.firstChild;)n.iframe.removeChild(n.iframe.firstChild);var r=document.createElement("iframe");n.iframe.appendChild(r);var i=r.contentDocument||r.contentWindow.document;i.open(),i.write(function(e){return'<html>\n    <body>\n      <div id="app" />\n    </body>\n    <script type="text/javascript">'.concat(e,"<\/script>\n  </html>")}(e.code)),i.close()}}).catch(function(e){n.setState({transpiled:"",error:e.message})})},n.onIframeRef=function(e){n.iframe=e},n.state={value:I.simple,transpiled:"",error:null,previewMode:"both"},n}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.transpile(this.state.value)}},{key:"render",value:function(){var e=this.state.previewMode;return i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"navbar"},i.a.createElement("span",null,"Damu Demo"),i.a.createElement("label",null,"Demo: ",i.a.createElement("select",{onChange:this.onChangeTemplate},J.map(function(e){return i.a.createElement("option",{key:e,value:e},e)}))),i.a.createElement("a",{target:"_blank",rel:"noreferrer noopener",href:"https://github.com/tanhauhau/damu"},"View it on Github")),i.a.createElement("div",{className:"App"},i.a.createElement(p.a,{height:"calc(100vh - 50px)",width:"50vw",mode:"jsx",theme:"tomorrow",fontSize:14,onChange:this.onChange,showGutter:!0,name:"editor",value:this.state.value,editorProps:N,tabSize:2,enableBasicAutocompletion:!0,enableLiveAutocompletion:!0,showLineNumbers:!0}),i.a.createElement("div",{className:"preview preview-".concat(e)},i.a.createElement("div",{className:"preview-dashboard"},i.a.createElement("div",null,i.a.createElement("label",null,i.a.createElement("input",{id:"both",value:"both",name:"preview-mode",type:"radio",checked:"both"===e,onChange:this.onPreviewModeChange}),"Both"),i.a.createElement("label",null,i.a.createElement("input",{id:"code",value:"code",name:"preview-mode",type:"radio",checked:"code"===e,onChange:this.onPreviewModeChange}),"Code"),i.a.createElement("label",null,i.a.createElement("input",{id:"html",value:"html",name:"preview-mode",type:"radio",checked:"html"===e,onChange:this.onPreviewModeChange}),"HTML"))),i.a.createElement(p.a,{height:"calc(".concat("code"===e?100:50,"vh - 80px)"),width:"50vw",mode:"javascript",theme:"tomorrow",readOnly:!0,fontSize:14,showGutter:!0,name:"preview",value:this.state.error||this.state.transpiled,editorProps:N,tabSize:2,showLineNumbers:!0,setOptions:A}),i.a.createElement("div",{ref:this.onIframeRef}))))}}]),t}(r.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(i.a.createElement(X,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[178,2,1]]]);
//# sourceMappingURL=main.4f4024bb.chunk.js.map