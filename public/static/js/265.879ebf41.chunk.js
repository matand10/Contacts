"use strict";(self.webpackChunkrick_react_two=self.webpackChunkrick_react_two||[]).push([[265],{3265:function(e,t,n){n.r(t),n.d(t,{default:function(){return T}});var r,s,a=n(2791),c=n(4270),l=n(8820),o=n(6856),i=n(9434),f=n(7689),u=n(1087),d=["title","titleId"];function h(){return h=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},h.apply(this,arguments)}function m(e,t){if(null==e)return{};var n,r,s=function(e,t){if(null==e)return{};var n,r,s={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(s[n]=e[n]);return s}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(s[n]=e[n])}return s}function C(e,t){var n=e.title,c=e.titleId,l=m(e,d);return a.createElement("svg",h({width:14,height:14,viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":c},l),n?a.createElement("title",{id:c},n):null,r||(r=a.createElement("circle",{cx:6.69336,cy:7.16333,r:6.61322,fill:"#F1F1F1"})),s||(s=a.createElement("path",{d:"M6.6932 3.46814C6.82103 3.46814 6.94363 3.51892 7.03402 3.60931C7.12441 3.6997 7.17519 3.82229 7.17519 3.95013V6.68138H9.90644C10.0343 6.68138 10.1569 6.73216 10.2473 6.82255C10.3376 6.91294 10.3884 7.03553 10.3884 7.16336C10.3884 7.29119 10.3376 7.41379 10.2473 7.50418C10.1569 7.59457 10.0343 7.64535 9.90644 7.64535H7.17519V10.3766C7.17519 10.5044 7.12441 10.627 7.03402 10.7174C6.94363 10.8078 6.82103 10.8586 6.6932 10.8586C6.56537 10.8586 6.44278 10.8078 6.35239 10.7174C6.262 10.627 6.21122 10.5044 6.21122 10.3766V7.64535H3.47996C3.35213 7.64535 3.22954 7.59457 3.13915 7.50418C3.04876 7.41379 2.99798 7.29119 2.99798 7.16336C2.99798 7.03553 3.04876 6.91294 3.13915 6.82255C3.22954 6.73216 3.35213 6.68138 3.47996 6.68138H6.21122V3.95013C6.21122 3.82229 6.262 3.6997 6.35239 3.60931C6.44278 3.51892 6.56537 3.46814 6.6932 3.46814Z",fill:"#A6A7A8"})))}var j=a.forwardRef(C),w=(n.p,n(8155)),p=n(2598),v=n(3329),x=function(){var e=(0,i.v9)((function(e){return e.user})).currentUser,t=(0,f.s0)(),n=[{url:w.T.CONTACTS_EXPENSES,icon:(0,v.jsx)(l.Duv,{})},{url:w.T.CONTACTS_INCOME,icon:(0,v.jsx)(l.y1n,{})},{url:w.T.CONTACTS_RECOMMANDED,icon:(0,v.jsx)(l.y5j,{})},{url:w.T.WISHLIST,icon:(0,v.jsx)(o.v7D,{})},{url:w.T.CREDIT,icon:(0,v.jsx)(l.Lfi,{}),class:"plus"}];return(0,v.jsx)("div",{className:"wallet-card-section",children:(0,v.jsxs)("div",{className:"wallet-card",children:[(0,v.jsx)("div",{className:"balance",children:(0,v.jsxs)("div",{className:"left",children:[(0,v.jsxs)("h2",{className:"title",children:[p.j.CREDITS," ",(0,v.jsx)(j,{})]}),(0,v.jsxs)("h1",{className:"total",onClick:function(){t(w.T.CREDIT)},children:[null===e||void 0===e?void 0:e.credits,"$"]})]})}),(0,v.jsx)("div",{className:"wallet-footer scrollable-wrapper",children:n.map((function(e){return(0,v.jsx)("div",{className:"item",children:(0,v.jsx)(u.rU,{to:e.url,children:(0,v.jsx)("div",{className:"icon-wrapper ".concat((null===e||void 0===e?void 0:e.class)||""),children:e.icon})})},e.url)}))})]})})},b=n(5074),y=n(2202),g=n(7310),N=function(){var e,t=(0,i.v9)((function(e){return e.user})).currentUser,n=null===(e=b.Y.getMostRecentObject(y.W.getContactPurchaseType(t)))||void 0===e?void 0:e.createdAt;return(0,v.jsxs)("div",{className:"contact-list--wrapper",children:[(0,v.jsxs)("div",{className:"contact-list__sub-header",children:[(0,v.jsx)("span",{children:p.j.MY_ORDERS}),n&&(0,v.jsx)("span",{children:b.Y.getFormattedDate(new Date(n))})]}),y.W.getContactPurchaseType(t).map((function(e,t){return(0,v.jsx)(g.Z,{contact:e.contact},t)}))]})},O=n(8502),T=function(){return(0,v.jsxs)(a.Fragment,{children:[(0,v.jsx)(c.q,{children:(0,v.jsx)("style",{children:'\n            @font-face {\n              font-family: "Consolas";\n              font-weight: bold;\n              font-style: normal;\n              src: url('.concat("/assets/fonts/Consolas.eot",");\n              src: url(").concat("/assets/fonts/Consolas.eot?#iefix",')\n              format("embedded-opentype"),\n              url(').concat("/assets/fonts/Consolas.woff2",')\n              format("woff2"),\n              url(').concat("/assets/fonts/Consolas.woff",') format("woff"),\n              url(').concat("/assets/fonts/Consolas.ttf",')\n              format("truetype"),\n              url(').concat("/assets/fonts/Consolas.svg#Consolas",')\n              format("svg");\n            }\n\n            @font-face {\n              font-family: "Merriweather-Black";\n              font-weight: bold;\n              font-style: normal;\n              src: url(').concat("/assets/fonts/Merriweather-Black.eot",");\n              src: url(").concat("/assets/fonts/Merriweather-Black.eot?#iefix",')\n              format("embedded-opentype"),\n              url(').concat("/assets/fonts/Merriweather-Black.woff2",')\n              format("woff2"),\n              url(').concat("/assets/fonts/Merriweather-Black.woff",') format("woff"),\n              url(').concat("/assets/fonts/Merriweather-Black.ttf",')\n              format("truetype"),\n              url(').concat("/assets/fonts/Merriweather-Black.svg#Merriweather-Black",')\n              format("svg");\n            }\n          \n          ')})}),(0,v.jsxs)("div",{className:"space-pb--50",children:[(0,v.jsx)(x,{}),(0,v.jsxs)("div",{className:"backgrounds__white-top",children:[(0,v.jsx)(O.Z,{title:p.j.NEW_CONTACTS,filters:{recentAdded:1},count:5}),(0,v.jsx)(N,{})]})]})]})}}}]);
//# sourceMappingURL=265.879ebf41.chunk.js.map