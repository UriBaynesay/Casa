"use strict";(self.webpackChunkcasa=self.webpackChunkcasa||[]).push([[678],{4872:function(s,e,t){t(2791);e.Z=t.p+"static/media/star.523d9e205c20990b0c1b62dddc8cee4b.svg"},6936:function(s,e,t){t.d(e,{l:function(){return o}});var a=t(3504),r=t(2791),n=(t(1549),t(197)),c=t(4872),i=t(8312),l=t(184);function d(s){var e=s.stay,t=s.isUserStayPage,r=(e.reviewScores.rating/100*5).toFixed(2);return(0,l.jsxs)(a.rU,{to:"/stay/details/".concat(e._id),className:"stay-preview-container",children:[(0,l.jsx)("div",{className:"stay-img-container",children:(0,l.jsxs)(n.lr,{showThumbs:!1,showStatus:!1,children:[(0,l.jsx)("div",{children:(0,l.jsx)("img",{src:i.N.getImageUrl(e.imgUrls[0]),alt:"",loading:"lazy"})}),(0,l.jsx)("div",{children:(0,l.jsx)("img",{src:i.N.getImageUrl(e.imgUrls[1]),alt:"",loading:"lazy"})}),(0,l.jsx)("div",{children:(0,l.jsx)("img",{src:i.N.getImageUrl(e.imgUrls[2]),alt:"",loading:"lazy"})})]})}),(0,l.jsxs)("span",{className:"top-summary",children:[(0,l.jsxs)("span",{className:"stay-address",children:[e.address.street," "]}),(0,l.jsxs)("span",{className:"star-rating",children:[r," ",(0,l.jsx)("img",{width:"14px",src:c.Z,alt:""})]})]}),(0,l.jsx)("div",{className:"stay-quick-data",children:e.propertyType}),(0,l.jsx)("div",{className:"stay-quick-data",children:e.roomType}),(0,l.jsxs)("div",{className:"stay-price",children:[(0,l.jsxs)("span",{className:"stay-price",children:["$",e.price.toLocaleString()]})," ",(0,l.jsx)("span",{className:"stay-night",children:"night"})]}),t&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(a.rU,{style:{display:"block"},to:"/stay/edit/".concat(e._id),onClick:function(s){return s.stopPropagation()},children:"Edit"}),(0,l.jsx)(a.rU,{style:{color:"darkred"},to:"/stay/delete/".concat(e._id),children:"Delete"})]})]})}function o(s){var e=s.stays,t=s.isUserStayPage;(0,r.useEffect)((function(){var s=document.querySelectorAll(".dot");return s.forEach((function(s){s.addEventListener("click",a)})),function(){s.forEach((function(s){s.removeEventListener("click",a)}))}}),[]);var a=function(s){s.preventDefault()};return(0,l.jsx)("div",{className:"stay-list-container",children:e.map((function(s){return(0,l.jsx)(d,{stay:s,isUserStayPage:t},s._id)}))})}},2641:function(s,e,t){t.r(e);var a=t(4165),r=t(5861),n=t(885),c=t(2791),i=t(9434),l=t(2506),d=t(8312),o=t(6936),u=t(184);e.default=function(){var s=(0,c.useState)([]),e=(0,n.Z)(s,2),t=e[0],h=e[1],m=(0,i.v9)((function(s){return s.userModule})).user;(0,c.useEffect)((function(){m&&!t.length&&y()}),[m]);var y=function(){var s=(0,r.Z)((0,a.Z)().mark((function s(){var e;return(0,a.Z)().wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return s.prev=0,s.next=3,d.N.query({hostId:m._id});case 3:e=s.sent,h(e),s.next=10;break;case 7:s.prev=7,s.t0=s.catch(0),console.error(s.t0);case 10:case"end":return s.stop()}}),s,null,[[0,7]])})));return function(){return s.apply(this,arguments)}}();return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(l.t,{}),(0,u.jsx)("main",{className:"user-profile main-layout",children:(0,u.jsxs)("section",{className:"user-stays-container",children:[(0,u.jsx)("h2",{children:"Your stays"}),t.length?(0,u.jsx)(o.l,{stays:t,isUserStayPage:!0}):(0,u.jsx)("p",{children:"No stays"})]})})]})}}}]);
//# sourceMappingURL=678.ab674007.chunk.js.map