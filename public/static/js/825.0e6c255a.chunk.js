"use strict";(self.webpackChunkrick_react_two=self.webpackChunkrick_react_two||[]).push([[825],{2825:function(e,t,n){n.r(t);var r=n(4165),c=n(5861),s=n(885),a=n(2791),i=n(9383),o=n(7689),u=n(7406),l=n(8948),p=n(9434),d=n(5733),h=n(1734),f=n(6943),v=n(9892),m=n(3329);t.default=function(){var e,t=(0,p.v9)((function(e){return e.user})).currentUser,n=(0,p.v9)((function(e){return e.cart})).contactCart,x=(0,a.useState)(null),j=(0,s.Z)(x,2),b=j[0],w=j[1],N=(0,a.useState)(!1),g=(0,s.Z)(N,2),y=g[0],k=g[1],Z=(0,a.useState)(!0),C=(0,s.Z)(Z,2),_=C[0],S=C[1],E=(0,a.useState)(!1),I=(0,s.Z)(E,2),B=I[0],R=I[1],U=(0,a.useState)(!1),A=(0,s.Z)(U,2),T=A[0],D=A[1],q=(0,o.UO)().id,J=(0,p.I0)();(0,a.useEffect)((function(){F(),Q()}),[]),(0,a.useEffect)((function(){P()}),[n]);var P=function(){if(n.length&&b){var e=n.find((function(e){return e._id===b._id}));D(!!e)}},Q=function(){if(t){var e=!!t.contactTransactions.find((function(e){return e.type===f.A.contactPurchase&&e.contact._id===q}));R(e)}else R(!1)},F=function(){var e=(0,c.Z)((0,r.Z)().mark((function e(){var t;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,i.Z.getById(q);case 3:t=e.sent,L(t),w(t),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:return e.prev=11,S(!1),e.finish(11);case 14:case"end":return e.stop()}}),e,null,[[0,8,11,14]])})));return function(){return e.apply(this,arguments)}}(),L=function(e){if(t){var n=t.favorites.find((function(t){return t._id===e._id}));k(!!n)}},M=function(){var e=(0,c.Z)((0,r.Z)().mark((function e(){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(0,v.g)(J,b);case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return _||!b?(0,m.jsx)(h.p9,{}):(0,m.jsxs)("div",{className:"body-wrapper space-pb--120",children:[(0,m.jsx)("div",{className:"product-image-slider-wrapper space-pb--30 space-mb--30",children:(0,m.jsx)("div",{className:"product-image-single swiper-slide",children:(0,m.jsx)("img",{src:(null===b||void 0===b||null===(e=b.img)||void 0===e?void 0:e.url)||u.ou,className:"img-fluid",alt:""})})}),(0,m.jsx)("div",{className:"product-content-header-area border-bottom--thick space-pb--30",children:(0,m.jsx)("div",{className:"container",children:(0,m.jsx)("div",{className:"row",children:(0,m.jsx)("div",{className:"col-12",children:(0,m.jsxs)("div",{className:"product-content-header",children:[(0,m.jsxs)("div",{className:"product-content-header__main-info",children:[B&&(0,m.jsxs)("h3",{className:"title",children:["Name: ",(0,m.jsxs)("span",{className:"info",children:[b.name," ",b.familyName]})]}),(0,m.jsxs)("h3",{className:"title",children:["Category: ",(0,m.jsx)("span",{className:"info",children:b.category})]}),(0,m.jsxs)("h3",{className:"title",children:["Company: ",(0,m.jsx)("span",{className:"info",children:b.company})]}),(0,m.jsxs)("h3",{className:"title",children:["Job Title: ",(0,m.jsx)("span",{className:"info",children:b.jobTitle})]}),(0,m.jsx)("div",{className:"price",children:(0,m.jsx)("span",{className:"discounted-price",children:"$".concat(b.price)})})]}),(0,m.jsx)("div",{className:"product-content-header__wishlist-info text-center",children:(0,m.jsx)(l.Q,{src:"/assets/img/icons/heart-dark.svg"})})]})})})})}),(0,m.jsx)("div",{className:"product-content-description border-bottom--thick space-pt--25 space-pb--25",children:(0,m.jsx)("div",{className:"container",children:(0,m.jsx)("div",{className:"row",children:(0,m.jsxs)("div",{className:"col-12",children:[(0,m.jsxs)("p",{className:"space-mb--25",children:["Description: ",b.desc]}),(0,m.jsx)("h4",{className:"space-mb--5",children:"Information"}),(0,m.jsxs)("p",{children:["To Bangladesh from seller via china. Shipping ",(0,m.jsx)("br",{})," method online."]})]})})})}),(0,m.jsx)("div",{className:"product-content-safety border-bottom--thick space-pt--15 space-pb--15",children:(0,m.jsx)("div",{className:"container",children:(0,m.jsx)("div",{className:"row",children:(0,m.jsx)("div",{className:"col-12",children:(0,m.jsxs)("h4",{children:[(0,m.jsx)(l.Q,{src:"/assets/img/icons/security.svg"})," ","Secure Payment Method."]})})})})}),(0,m.jsxs)("div",{className:"shop-product-button",children:[(0,m.jsx)("button",{className:"wishlist",disabled:!y,onClick:B?function(){}:function(e){y?((0,d.r7)(J,e,t),k(!1)):((0,d.a3)(J,e,t),k(!0))},children:B||y?"Feedback":"Add to favorites"}),(0,m.jsx)("button",{className:"cart",onClick:B?function(){}:M,children:B?"Download":T?"Already in cart":"Add to cart"})]})]})}},9383:function(e,t,n){n.d(t,{Z:function(){return i}});var r=n(4165),c=n(5861),s=n(7406),a=n(7265),i={query:function(){return o.apply(this,arguments)},getById:function(e){return u.apply(this,arguments)},getUserContactSales:function(e){return l.apply(this,arguments)},queryByCategory:function(e){return p.apply(this,arguments)},getLastCreatedContacts:function(){return d.apply(this,arguments)}};function o(){return o=(0,c.Z)((0,r.Z)().mark((function e(){var t,n,c=arguments;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=c.length>0&&void 0!==c[0]?c[0]:{},e.prev=1,e.next=4,a.Rc.post(s.tp.get,t);case 4:if("ok"!==(n=e.sent).status){e.next=9;break}return e.abrupt("return",n.content);case 9:return e.abrupt("return",new Error("Cannot get contacts"));case 10:e.next=15;break;case 12:throw e.prev=12,e.t0=e.catch(1),e.t0;case 15:case"end":return e.stop()}}),e,null,[[1,12]])}))),o.apply(this,arguments)}function u(){return(u=(0,c.Z)((0,r.Z)().mark((function e(t){var n;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,a.Rc.get("".concat(s.tp.getById,"/").concat(t));case 3:if("ok"===(n=e.sent).status){e.next=8;break}throw new Error("Cannot find contact");case 8:return e.abrupt("return",n.content);case 9:e.next=14;break;case 11:throw e.prev=11,e.t0=e.catch(0),e.t0;case 14:case"end":return e.stop()}}),e,null,[[0,11]])})))).apply(this,arguments)}function l(){return(l=(0,c.Z)((0,r.Z)().mark((function e(t){var n;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,a.Rc.post("".concat(s.tp.getByUser),{userId:t});case 3:if("ok"!==(n=e.sent).status){e.next=8;break}return e.abrupt("return",n.content);case 8:return e.abrupt("return",new Error("Cannot get contacts sales"));case 9:e.next=14;break;case 11:throw e.prev=11,e.t0=e.catch(0),e.t0;case 14:case"end":return e.stop()}}),e,null,[[0,11]])})))).apply(this,arguments)}function p(){return(p=(0,c.Z)((0,r.Z)().mark((function e(t){var n;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,a.Rc.get("".concat(s.tp.get,"/").concat(t));case 3:return n=e.sent,e.abrupt("return",n);case 7:throw e.prev=7,e.t0=e.catch(0),e.t0;case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}function d(){return(d=(0,c.Z)((0,r.Z)().mark((function e(){var t;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,a.Rc.get("".concat(s.tp.new,"/10?DESC"));case 3:return t=e.sent,e.abrupt("return",t);case 7:throw e.prev=7,e.t0=e.catch(0),e.t0;case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}},9892:function(e,t,n){n.d(t,{g:function(){return c},p8:function(){return a},w:function(){return s}});var r=n(302),c=function(e,t){e((0,r.UJ)(t))},s=function(e,t){e((0,r.EI)(t))},a=function(e){e((0,r.sp)())}}}]);
//# sourceMappingURL=825.0e6c255a.chunk.js.map