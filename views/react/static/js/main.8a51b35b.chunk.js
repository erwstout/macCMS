(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{172:function(e,n,t){e.exports=t(410)},410:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),i=t(42),c=t.n(i),o=t(58),s=t(59),l=t(64),m=t(60),u=t(65),d=t(412),p=t(413),g=t(95),h=t.n(g),b=t(61),f=t(160),E=t.n(f),w=t(161),y=t.n(w),j=Object(b.createMuiTheme)({palette:{primary:E.a,secondary:y.a},typography:{useNextVariants:!0}}),O=t(171),v=t(165),C=t.n(v),x=t(166),S=t.n(x),N=t(167),P=t.n(N),k=t(97),q=t.n(k),M=t(168),B=t.n(M),I=t(98),T=t(67),U=function(e){function n(){return Object(o.a)(this,n),Object(l.a)(this,Object(m.a)(n).apply(this,arguments))}return Object(u.a)(n,e),Object(s.a)(n,[{key:"render",value:function(){var e=this.props.classes;return r.a.createElement("div",{className:e.root},r.a.createElement(C.a,{className:e.loginContainer},r.a.createElement(S.a,{variant:"h4"},"MacCMS Login"),r.a.createElement(P.a,null),r.a.createElement(I.b,{initialValues:{username:"",password:""},validationSchema:function(){return T.Object().shape({username:T.string().required("Username is required"),password:T.string().required("Password is required")})},onSubmit:function(e,n){n.setSubmitting;document.getElementById("login-form").submit()},render:function(n){n.isSubmitting;return r.a.createElement(I.a,{method:"POST",action:"/mac-cms/login",id:"login-form"},r.a.createElement("div",{className:e.formContainer},r.a.createElement(q.a,{id:"username",name:"username",placeholder:"Username",className:e.input,inputProps:{"aria-label":"Username"}}),r.a.createElement(q.a,{id:"password",name:"password",type:"password",placeholder:"Password",className:e.input,inputProps:{"aria-label":"Password"}})),r.a.createElement(B.a,{variant:"contained",color:"primary",type:"submit"},"Login"))}})))}}]),n}(a.Component),H=Object(b.withStyles)(function(e){return{"@global":{html:{margin:0,padding:0},body:{margin:0,padding:0}},root:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",minHeight:"100vh",width:"100%",backgroundColor:e.palette.secondary.light},loginContainer:Object(O.a)({},e.mixins.gutters(),{paddingTop:2*e.spacing.unit,paddingBottom:2*e.spacing.unit,width:"100%",maxWidth:600}),input:{margin:e.spacing.unit,width:"100%"},formContainer:{margin:"18px 0"}}})(U),J=function(e){function n(){return Object(o.a)(this,n),Object(l.a)(this,Object(m.a)(n).apply(this,arguments))}return Object(u.a)(n,e),Object(s.a)(n,[{key:"render",value:function(){return r.a.createElement(h.a,{theme:j},r.a.createElement(d.a,null,r.a.createElement("div",null,r.a.createElement(p.a,{exact:!0,path:"/mac-cms/",render:function(){return r.a.createElement("div",null,"Hello CMS!")}}),r.a.createElement(p.a,{exact:!0,path:"/mac-cms/login",render:function(){return r.a.createElement(H,null)}}))))}}]),n}(a.Component);c.a.render(r.a.createElement(J,null),document.getElementById("root"))}},[[172,2,1]]]);
//# sourceMappingURL=main.8a51b35b.chunk.js.map