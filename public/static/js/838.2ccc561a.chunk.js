"use strict";(self.webpackChunkrick_react_two=self.webpackChunkrick_react_two||[]).push([[838],{1980:function(t,e,r){var n=r(1087),c=r(7406),a=r(3329);e.Z=function(t){var e,r=t.contact;return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("div",{className:"list-product__image",children:(0,a.jsx)(n.rU,{to:""+"/contact/".concat(r._id),children:(0,a.jsx)("img",{src:(null===r||void 0===r||null===(e=r.img)||void 0===e?void 0:e.url)||c.ou,className:"img-fluid img__circle",alt:""})})}),(0,a.jsxs)("div",{className:"list-product__content",children:[(0,a.jsx)("h3",{className:"title",children:(0,a.jsx)(n.rU,{to:""+"/contact/".concat(r._id),children:r.category})}),(0,a.jsx)("span",{className:"category",children:r.company}),(0,a.jsx)("span",{className:"category",children:r.jobTitle})]})]})}},4503:function(t,e,r){var n=r(3329);e.Z=function(t){var e=t.onClick,r=t.disabled,c=t.isLoading,a=t.children,s=t.className;return(0,n.jsx)("button",{className:"flex align-center justify-center ".concat(s),disabled:r||c,onClick:function(){e&&e()},children:c?(0,n.jsx)("div",{className:"spinner-border",role:"status",children:(0,n.jsx)("span",{className:"visually-hidden",children:"Loading..."})}):a})}},9838:function(t,e,r){r.r(e),r.d(e,{default:function(){return E}});var n=r(4165),c=r(5861),a=r(885),s=r(2791),i=r(1087),o=r(9434),u=r(8948),l=r(1734),p=r(1980),d=r(7425),h=r(9892),f=r(7480),m=r(5074),v=r(9185),x=r(4350),N=function(){var t=(0,c.Z)((0,n.Z)().mark((function t(e,r){var c;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,v.Z.createContactsPurchase(r);case 3:(c=t.sent)&&e((0,x.P)(c)),t.next=10;break;case 7:throw t.prev=7,t.t0=t.catch(0),t.t0;case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e,r){return t.apply(this,arguments)}}(),g=r(2598),_=r(4503),y=r(3329),E=function(){var t=(0,o.v9)((function(t){return t.cart})).contactCart,e=(0,o.v9)((function(t){return t.user})).currentUser,r=(0,s.useState)(!1),v=(0,a.Z)(r,2),x=v[0],E=v[1],C=(0,o.I0)(),Z=function(){var e=(0,c.Z)((0,n.Z)().mark((function e(){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(E(!0),b()){e.next=4;break}return E(!1),e.abrupt("return",f.Z.error("Not enough credits",{position:"top-center"}));case 4:return e.prev=4,e.next=7,N(C,t);case 7:return(0,h.p8)(C),e.abrupt("return",f.Z.success("Contact purchased",{position:"top-center"}));case 11:return e.prev=11,e.t0=e.catch(4),e.abrupt("return",f.Z.error("Cannot purchase contact",{position:"top-center"}));case 14:return e.prev=14,E(!1),e.finish(14);case 17:case"end":return e.stop()}}),e,null,[[4,11,14,17]])})));return function(){return e.apply(this,arguments)}}(),b=function(){var r=t.reduce((function(t,e){return t+e.price}),0);return e.credits>=m.Y.getContactValueInCredit(r)};return(0,y.jsxs)("div",{className:"body-wrapper space-pb--120 backgrounds__white-top",children:[(0,y.jsx)(l.aG,{pageTitle:"Cart"}),t&&t.length>=1?(0,y.jsxs)(s.Fragment,{children:[t&&t.length>=1&&t.map((function(t){return(0,y.jsxs)("div",{className:"list-product border-bottom--medium",children:[(0,y.jsx)(p.Z,{contact:t}),(0,y.jsxs)("div",{className:"flex align-center gap--25",children:[(0,y.jsxs)("div",{className:"list-product__price",children:[(0,y.jsxs)("h2",{children:[t.price,"$"]}),(0,y.jsx)("p",{children:"22.07.23"})]}),(0,y.jsx)("button",{className:"list-product__button icon-color__error",onClick:function(){return e=t._id,void(0,h.w)(C,e);var e},children:(0,y.jsx)(d.GnT,{})})]})]},t._id)})),(0,y.jsx)("div",{className:"grand-total",children:(0,y.jsx)("div",{className:"container",children:(0,y.jsx)("div",{className:"row",children:(0,y.jsxs)("div",{className:"col-12",children:[(0,y.jsxs)("h4",{className:"grand-total-title",children:["Credits: ",(0,y.jsxs)("span",{children:[e.credits,"$"]})]}),(0,y.jsxs)("h4",{className:"grand-total-title",children:["Total Contacts: ",(0,y.jsx)("span",{children:t.length})]}),(0,y.jsxs)("h4",{className:"grand-total-title",children:["Total Price: ",(0,y.jsxs)("span",{children:[t.length?t.reduce((function(t,e){return t+e.price}),0).toFixed(2):Number(2).toFixed(2),"$"]})]}),(0,y.jsx)(_.Z,{className:"button button__h-60",onClick:Z,isLoading:x,children:g.j.PROCEED_TO_CHECKOUT})]})})})})]}):(0,y.jsxs)("div",{className:"no-items-found",children:[(0,y.jsx)("div",{className:"no-items-found__image",children:(0,y.jsx)(u.Q,{src:"/assets/img/icons/cart.svg"})}),(0,y.jsx)("div",{className:"no-items-found__content",children:(0,y.jsxs)("p",{children:["No Items in the cart."," ",(0,y.jsx)(i.rU,{to:"/shop",children:"Add Some"})]})})]})]})}},9185:function(t,e,r){r.d(e,{Z:function(){return G}});var n=r(4165),c=r(5861),a=r(7406),s=r(6943),i=r(3144),o=r(5671),u=r(2370),l=(0,i.Z)((function t(e){(0,o.Z)(this,t),this._id=e[u.B._ID],this.fullname=e[u.B.FULLNAME],this.imgUrl=e[u.B.IMG_URL]})),p="desc",d="img",h="jobTitle",f="price",m="inStock",v="name",x="familyName",N="emails",g="mobile",_="phone",y="linkedinLink",E="agent",C="category",Z="country",b="company",k="_id",w="createdAt",T="transactionHistory",j=(0,i.Z)((function t(e){(0,o.Z)(this,t),this.emails=[],this._id=e[k],this.desc=e[p],this.img=e[d],this.jobTitle=e[h],this.price=e[f],this.inStock=e[m],this.name=e[v],this.familyName=e[x],this.mobile=e[g],this.phone=e[_],this.linkedinLink=e[y],this.category=e[C],this.country=e[Z],this.company=e[b],this.createdAt=e[w],this.transactionHistory=e[T],this.agent=e[E]?new l(e[E]):null,this.emails=e[N]||[]})),I=(0,i.Z)((function t(e,r){(0,o.Z)(this,t),this.createdAt=new Date,this.contact=new j(e),this.priceInCredit=e.price/a.No,this.userId=r})),A=(0,i.Z)((function t(){(0,o.Z)(this,t)}));A.EMPTY_STRING="",A.TITLE="title",A.CATEGORY="category",A.CATEGORIES="categories",A.JOBTITLE="jobTitle",A.COUNTRY="country",A.NAME="name",A.FAMILY_NAME="familyName",A.DESC="desc",A.PRICE="price",A.IN_STOCK="inStock",A.EMAIL="email",A.PHONE="phone",A.LINKEDIN_LINK="linkedinLink",A.COMPANY="company",A._ID="_id",A.IMG_URL="imgUrl",A.IMG="img",A.COMPANIES="companies",A.JOB_TITLES="jobTitles",A.TERRITORIES="territories",A.EXPENSES="expenses",A.INCOME="income",A.PERMISSIONS="permissions",A.AGENT="agent",A.USER="user",A.IS_APPROVED="isApproved",A.CREATED_AT="createdAt",A.UPDATED_AT="updatedAt",A.BUYER="buyer",A.CONTACT_NAME="contactName",A.CONTACT_COMPANY="contactCompany",A.CONTACT_TITLE="contactTitle",A.IS_ACTIVE="isActive",A.GENDER="gender",A.EMAIL_TYPE="emailType",A.EMAIL_URL="emailUrl",A.OK="ok",A.FULLNAME="fullname",A.USERNAME="username",A.ACTION="action",A.APPROVE_STATUS="approveStatus";var L=(0,i.Z)((function t(e){(0,o.Z)(this,t),this.userId=e[u.B._ID],this.imgUrl=e[u.B.IMG_URL],this.fullname=e[u.B.FULLNAME]})),R=(0,i.Z)((function t(e){var r=e.credit,n=e.type,c=e.user;(0,o.Z)(this,t),this.createdAt=new Date,this.userInfo=new L(c),this.type=n,this.creditId=r[A._ID],this.creditName=r.name,this.creditQuantity=r.quantity,this.packagePrice=r.price})),U=r(7265),O=r(2202),S={query:function(){return P.apply(this,arguments)},createCreditTransaction:function(t){return M.apply(this,arguments)}};function P(){return P=(0,c.Z)((0,n.Z)().mark((function t(){var e,r,c=arguments;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=c.length>0&&void 0!==c[0]?c[0]:{},t.prev=1,t.next=4,U.Rc.get(a.PC.default,e);case 4:if("ok"!==(r=t.sent).status){t.next=9;break}return t.abrupt("return",r.content);case 9:return t.abrupt("return",{error:"Cannot get credits transactions"});case 10:t.next=15;break;case 12:throw t.prev=12,t.t0=t.catch(1),t.t0;case 15:case"end":return t.stop()}}),t,null,[[1,12]])}))),P.apply(this,arguments)}function M(){return(M=(0,c.Z)((0,n.Z)().mark((function t(e){var r;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r={user:O.W.getLoggedinUser(),credit:e,type:"credit_purchase"},t.abrupt("return",D(r));case 2:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function D(t){var e=t.user,r=t.credit,n=t.type;return new R({credit:r,user:e,type:n})}r(5074);var G={query:function(){return B.apply(this,arguments)},create:function(t){return F.apply(this,arguments)},createOne:function(t){return Y.apply(this,arguments)},createContactsPurchase:function(t){return K.apply(this,arguments)},removeContact:function(t,e){return H.apply(this,arguments)}};function B(){return B=(0,c.Z)((0,n.Z)().mark((function t(){var e,r=arguments;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r.length>0&&void 0!==r[0]?r[0]:{},t.prev=1,t.next=4,U.Rc.get(a.DG.default);case 4:if("ok"!==(e=t.sent).status){t.next=9;break}return t.abrupt("return",e.content);case 9:return t.abrupt("return",new Error("Cannot get territories"));case 10:t.next=15;break;case 12:throw t.prev=12,t.t0=t.catch(1),t.t0;case 15:case"end":return t.stop()}}),t,null,[[1,12]])}))),B.apply(this,arguments)}function Y(){return(Y=(0,c.Z)((0,n.Z)().mark((function t(e){var r,c;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,S.createCreditTransaction(e);case 3:return r=t.sent,t.next=6,U.Rc.post("".concat(a.DG.default,"/create"),[r]);case 6:if("ok"!==(c=t.sent).status){t.next=11;break}return t.abrupt("return",c.content);case 11:throw new Error("Couldn't purchase credit");case 12:t.next=17;break;case 14:throw t.prev=14,t.t0=t.catch(0),t.t0;case 17:case"end":return t.stop()}}),t,null,[[0,14]])})))).apply(this,arguments)}function F(){return(F=(0,c.Z)((0,n.Z)().mark((function t(e){var r,c;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Promise.all(e.map((function(t){return S.createCreditTransaction(t)})));case 3:return r=t.sent,t.next=6,U.Rc.post("".concat(a.DG.default,"/create"),r);case 6:if("ok"!==(c=t.sent).status){t.next=11;break}return t.abrupt("return",c.content);case 11:throw new Error("Couldn't create territory");case 12:t.next=17;break;case 14:throw t.prev=14,t.t0=t.catch(0),t.t0;case 17:case"end":return t.stop()}}),t,null,[[0,14]])})))).apply(this,arguments)}function K(){return(K=(0,c.Z)((0,n.Z)().mark((function t(e){var r,c,i,o;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,r=O.W.getLoggedinUser()._id,c=V(e,r),i={transactions:c,userId:r,type:s.A.contactPurchase},t.next=6,U.Rc.post(a.DG.contact,i);case 6:if("ok"!==(o=t.sent).status){t.next=11;break}return t.abrupt("return",o.content);case 11:throw new Error("Cannot purchase");case 12:t.next=17;break;case 14:throw t.prev=14,t.t0=t.catch(0),t.t0;case 17:case"end":return t.stop()}}),t,null,[[0,14]])})))).apply(this,arguments)}function H(){return(H=(0,c.Z)((0,n.Z)().mark((function t(e,r){var c,i;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,c={userId:r,transactionId:e,type:s.A.contactRemove},t.next=4,U.Rc.post(a.DG.remove,c);case 4:return i=t.sent,t.abrupt("return",i.status);case 8:throw t.prev=8,t.t0=t.catch(0),t.t0;case 11:case"end":return t.stop()}}),t,null,[[0,8]])})))).apply(this,arguments)}function V(t,e){return t.map((function(t){return function(t,e){return new I(t,e)}(t,e)}))}},9892:function(t,e,r){r.d(e,{g:function(){return c},p8:function(){return s},w:function(){return a}});var n=r(302),c=function(t,e){t((0,n.UJ)(e))},a=function(t,e){t((0,n.EI)(e))},s=function(t){t((0,n.sp)())}}}]);
//# sourceMappingURL=838.2ccc561a.chunk.js.map