"use strict";(self.webpackChunkrick_react_two=self.webpackChunkrick_react_two||[]).push([[34],{4503:function(t,e,r){var n=r(3329);e.Z=function(t){var e=t.onClick,r=t.disabled,a=t.isLoading,c=t.children,s=t.className;return(0,n.jsx)("button",{className:"flex align-center justify-center ".concat(s),disabled:r||a,onClick:function(){e&&e()},children:a?(0,n.jsx)("div",{className:"spinner-border",role:"status",children:(0,n.jsx)("span",{className:"visually-hidden",children:"Loading..."})}):c})}},6034:function(t,e,r){r.r(e),r.d(e,{default:function(){return k}});var n=r(4165),a=r(5861),c=r(885),s=r(2791),i=r(7406),u=r(7265),o={query:function(){return p.apply(this,arguments)}};function p(){return p=(0,a.Z)((0,n.Z)().mark((function t(){var e,r,a=arguments;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=a.length>0&&void 0!==a[0]?a[0]:{},t.prev=1,t.next=4,u.Rc.post(i.s6.default,e);case 4:if("ok"!==(r=t.sent).status){t.next=9;break}return t.abrupt("return",r.content);case 9:return t.abrupt("return",new Error("Cannot get credits"));case 10:t.next=15;break;case 12:throw t.prev=12,t.t0=t.catch(1),t.t0;case 15:case"end":return t.stop()}}),t,null,[[1,12]])}))),p.apply(this,arguments)}var h=r(4503),l=r(9434),d=r(2598),f=r(9185),v=r(4350),m=function(){var t=(0,a.Z)((0,n.Z)().mark((function t(e,r){var a;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,f.Z.createOne(r);case 3:(a=t.sent)&&e((0,v.P)(a)),t.next=10;break;case 7:throw t.prev=7,t.t0=t.catch(0),t.t0;case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e,r){return t.apply(this,arguments)}}(),x=r(7480),y=r(3329),Z=function(t){var e=t.credit,r=(0,s.useState)(),i=(0,c.Z)(r,2),u=i[0],o=(i[1],(0,l.I0)()),p=function(){var t=(0,a.Z)((0,n.Z)().mark((function t(e){return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,m(o,e);case 3:x.Z.success("Credits Added",{position:"top-center"}),t.next=9;break;case 6:t.prev=6,t.t0=t.catch(0),x.Z.error("Cannot purcahse credits",{position:"top-center"});case 9:case"end":return t.stop()}}),t,null,[[0,6]])})));return function(e){return t.apply(this,arguments)}}();return(0,y.jsxs)("div",{className:"credit-wrapper mt-3",children:[(0,y.jsxs)("div",{className:"credit-header",children:[(0,y.jsx)("p",{children:e.name}),(0,y.jsxs)("p",{children:[e.price," $"]})]}),(0,y.jsx)("div",{className:"credit-details_wrapper",children:(0,y.jsxs)("div",{className:"credit-details",children:[(0,y.jsx)("p",{children:d.j.CREDITS}),(0,y.jsx)("p",{children:e.quantity})]})}),(0,y.jsxs)("div",{className:"credit-footer",children:[(0,y.jsx)("p",{children:e.description}),(0,y.jsx)(h.Z,{isLoading:u,onClick:function(){return p(e)},children:d.j.BUY_CREDITS})]})]},e._id)},k=function(){var t=(0,s.useState)([]),e=(0,c.Z)(t,2),r=e[0],i=e[1];(0,s.useEffect)((function(){r.length||u()}),[]);var u=function(){var t=(0,a.Z)((0,n.Z)().mark((function t(){var e;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,o.query();case 3:e=t.sent,i(e),t.next=9;break;case 7:t.prev=7,t.t0=t.catch(0);case 9:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(){return t.apply(this,arguments)}}();return(0,y.jsx)("div",{className:"container",children:(0,y.jsx)("div",{className:"body-wrapper space-pb--120",children:r.map((function(t){return(0,y.jsx)(Z,{credit:t},t._id)}))})})}},9185:function(t,e,r){r.d(e,{Z:function(){return G}});var n=r(4165),a=r(5861),c=r(7406),s=r(6943),i=r(3144),u=r(5671),o=r(2370),p=(0,i.Z)((function t(e){(0,u.Z)(this,t),this._id=e[o.B._ID],this.fullname=e[o.B.FULLNAME],this.imgUrl=e[o.B.IMG_URL]})),h="desc",l="img",d="jobTitle",f="price",v="inStock",m="name",x="familyName",y="emails",Z="mobile",k="phone",w="linkedinLink",E="agent",I="category",N="country",T="company",C="_id",b="createdAt",A="transactionHistory",_=(0,i.Z)((function t(e){(0,u.Z)(this,t),this.emails=[],this._id=e[C],this.desc=e[h],this.img=e[l],this.jobTitle=e[d],this.price=e[f],this.inStock=e[v],this.name=e[m],this.familyName=e[x],this.mobile=e[Z],this.phone=e[k],this.linkedinLink=e[w],this.category=e[I],this.country=e[N],this.company=e[T],this.createdAt=e[b],this.transactionHistory=e[A],this.agent=e[E]?new p(e[E]):null,this.emails=e[y]||[]})),g=(0,i.Z)((function t(e,r){(0,u.Z)(this,t),this.createdAt=new Date,this.contact=new _(e),this.priceInCredit=e.price/c.No,this.userId=r})),R=(0,i.Z)((function t(){(0,u.Z)(this,t)}));R.EMPTY_STRING="",R.TITLE="title",R.CATEGORY="category",R.CATEGORIES="categories",R.JOBTITLE="jobTitle",R.COUNTRY="country",R.NAME="name",R.FAMILY_NAME="familyName",R.DESC="desc",R.PRICE="price",R.IN_STOCK="inStock",R.EMAIL="email",R.PHONE="phone",R.LINKEDIN_LINK="linkedinLink",R.COMPANY="company",R._ID="_id",R.IMG_URL="imgUrl",R.IMG="img",R.COMPANIES="companies",R.JOB_TITLES="jobTitles",R.TERRITORIES="territories",R.EXPENSES="expenses",R.INCOME="income",R.PERMISSIONS="permissions",R.AGENT="agent",R.USER="user",R.IS_APPROVED="isApproved",R.CREATED_AT="createdAt",R.UPDATED_AT="updatedAt",R.BUYER="buyer",R.CONTACT_NAME="contactName",R.CONTACT_COMPANY="contactCompany",R.CONTACT_TITLE="contactTitle",R.IS_ACTIVE="isActive",R.GENDER="gender",R.EMAIL_TYPE="emailType",R.EMAIL_URL="emailUrl",R.OK="ok",R.FULLNAME="fullname",R.USERNAME="username",R.ACTION="action",R.APPROVE_STATUS="approveStatus";var L=(0,i.Z)((function t(e){(0,u.Z)(this,t),this.userId=e[o.B._ID],this.imgUrl=e[o.B.IMG_URL],this.fullname=e[o.B.FULLNAME]})),S=(0,i.Z)((function t(e){var r=e.credit,n=e.type,a=e.user;(0,u.Z)(this,t),this.createdAt=new Date,this.userInfo=new L(a),this.type=n,this.creditId=r[R._ID],this.creditName=r.name,this.creditQuantity=r.quantity,this.packagePrice=r.price})),j=r(7265),O=r(2202),M={query:function(){return D.apply(this,arguments)},createCreditTransaction:function(t){return P.apply(this,arguments)}};function D(){return D=(0,a.Z)((0,n.Z)().mark((function t(){var e,r,a=arguments;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=a.length>0&&void 0!==a[0]?a[0]:{},t.prev=1,t.next=4,j.Rc.get(c.PC.default,e);case 4:if("ok"!==(r=t.sent).status){t.next=9;break}return t.abrupt("return",r.content);case 9:return t.abrupt("return",{error:"Cannot get credits transactions"});case 10:t.next=15;break;case 12:throw t.prev=12,t.t0=t.catch(1),t.t0;case 15:case"end":return t.stop()}}),t,null,[[1,12]])}))),D.apply(this,arguments)}function P(){return(P=(0,a.Z)((0,n.Z)().mark((function t(e){var r;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r={user:O.W.getLoggedinUser(),credit:e,type:"credit_purchase"},t.abrupt("return",U(r));case 2:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function U(t){var e=t.user,r=t.credit,n=t.type;return new S({credit:r,user:e,type:n})}r(5074);var G={query:function(){return B.apply(this,arguments)},create:function(t){return q.apply(this,arguments)},createOne:function(t){return Y.apply(this,arguments)},createContactsPurchase:function(t){return F.apply(this,arguments)},removeContact:function(t,e){return K.apply(this,arguments)}};function B(){return B=(0,a.Z)((0,n.Z)().mark((function t(){var e,r=arguments;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r.length>0&&void 0!==r[0]?r[0]:{},t.prev=1,t.next=4,j.Rc.get(c.DG.default);case 4:if("ok"!==(e=t.sent).status){t.next=9;break}return t.abrupt("return",e.content);case 9:return t.abrupt("return",new Error("Cannot get territories"));case 10:t.next=15;break;case 12:throw t.prev=12,t.t0=t.catch(1),t.t0;case 15:case"end":return t.stop()}}),t,null,[[1,12]])}))),B.apply(this,arguments)}function Y(){return(Y=(0,a.Z)((0,n.Z)().mark((function t(e){var r,a;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,M.createCreditTransaction(e);case 3:return r=t.sent,t.next=6,j.Rc.post("".concat(c.DG.default,"/create"),[r]);case 6:if("ok"!==(a=t.sent).status){t.next=11;break}return t.abrupt("return",a.content);case 11:throw new Error("Couldn't purchase credit");case 12:t.next=17;break;case 14:throw t.prev=14,t.t0=t.catch(0),t.t0;case 17:case"end":return t.stop()}}),t,null,[[0,14]])})))).apply(this,arguments)}function q(){return(q=(0,a.Z)((0,n.Z)().mark((function t(e){var r,a;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Promise.all(e.map((function(t){return M.createCreditTransaction(t)})));case 3:return r=t.sent,t.next=6,j.Rc.post("".concat(c.DG.default,"/create"),r);case 6:if("ok"!==(a=t.sent).status){t.next=11;break}return t.abrupt("return",a.content);case 11:throw new Error("Couldn't create territory");case 12:t.next=17;break;case 14:throw t.prev=14,t.t0=t.catch(0),t.t0;case 17:case"end":return t.stop()}}),t,null,[[0,14]])})))).apply(this,arguments)}function F(){return(F=(0,a.Z)((0,n.Z)().mark((function t(e){var r,a,i,u;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,r=O.W.getLoggedinUser()._id,a=H(e,r),i={transactions:a,userId:r,type:s.A.contactPurchase},t.next=6,j.Rc.post(c.DG.contact,i);case 6:if("ok"!==(u=t.sent).status){t.next=11;break}return t.abrupt("return",u.content);case 11:throw new Error("Cannot purchase");case 12:t.next=17;break;case 14:throw t.prev=14,t.t0=t.catch(0),t.t0;case 17:case"end":return t.stop()}}),t,null,[[0,14]])})))).apply(this,arguments)}function K(){return(K=(0,a.Z)((0,n.Z)().mark((function t(e,r){var a,i;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,a={userId:r,transactionId:e,type:s.A.contactRemove},t.next=4,j.Rc.post(c.DG.remove,a);case 4:return i=t.sent,t.abrupt("return",i.status);case 8:throw t.prev=8,t.t0=t.catch(0),t.t0;case 11:case"end":return t.stop()}}),t,null,[[0,8]])})))).apply(this,arguments)}function H(t,e){return t.map((function(t){return function(t,e){return new g(t,e)}(t,e)}))}}}]);
//# sourceMappingURL=34.fcb085b5.chunk.js.map