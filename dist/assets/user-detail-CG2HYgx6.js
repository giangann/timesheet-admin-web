import{g as G,a as E,N as M,s as B,_ as j,O as k,r as d,u as K,b as X,j as e,c as q,d as H,H as T,Q as z,K as Q,n as v,B as y,M as w,L as J}from"./index-posuPE9P.js";import{C as Y}from"./config-global-ClKwKbZP.js";import{u as Z,L as ee}from"./index.esm-BrzJbbaV.js";import{u as _}from"./use-api-CTRGMTk2.js";import{a as te,b as ae,C as se,G as c}from"./use-user-CCqmJz6Q.js";import{T as m,F as S,c as L,S as I}from"./TextField-CuCfj_KC.js";import{a as re}from"./colorManipulator-svCFZmFX.js";function ne(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function ie(t){return parseFloat(t)}function oe(t){return G("MuiSkeleton",t)}E("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const le=["animation","className","component","height","style","variant","width"];let C=t=>t,U,R,W,N;const de=t=>{const{classes:a,variant:s,animation:r,hasChildren:i,width:l,height:o}=t;return H({root:["root",s,r,i&&"withChildren",i&&!l&&"fitContent",i&&!o&&"heightAuto"]},oe,a)},ue=M(U||(U=C`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),ce=M(R||(R=C`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`)),he=B("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,a)=>{const{ownerState:s}=t;return[a.root,a[s.variant],s.animation!==!1&&a[s.animation],s.hasChildren&&a.withChildren,s.hasChildren&&!s.width&&a.fitContent,s.hasChildren&&!s.height&&a.heightAuto]}})(({theme:t,ownerState:a})=>{const s=ne(t.shape.borderRadius)||"px",r=ie(t.shape.borderRadius);return j({display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:re(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em"},a.variant==="text"&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${r}${s}/${Math.round(r/.6*10)/10}${s}`,"&:empty:before":{content:'"\\00a0"'}},a.variant==="circular"&&{borderRadius:"50%"},a.variant==="rounded"&&{borderRadius:(t.vars||t).shape.borderRadius},a.hasChildren&&{"& > *":{visibility:"hidden"}},a.hasChildren&&!a.width&&{maxWidth:"fit-content"},a.hasChildren&&!a.height&&{height:"auto"})},({ownerState:t})=>t.animation==="pulse"&&k(W||(W=C`
      animation: ${0} 2s ease-in-out 0.5s infinite;
    `),ue),({ownerState:t,theme:a})=>t.animation==="wave"&&k(N||(N=C`
      position: relative;
      overflow: hidden;

      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);

      &::after {
        animation: ${0} 2s linear 0.5s infinite;
        background: linear-gradient(
          90deg,
          transparent,
          ${0},
          transparent
        );
        content: '';
        position: absolute;
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
    `),ce,(a.vars||a).palette.action.hover)),P=d.forwardRef(function(a,s){const r=K({props:a,name:"MuiSkeleton"}),{animation:i="pulse",className:l,component:o="span",height:n,style:u,variant:f="text",width:g}=r,p=X(r,le),x=j({},r,{animation:i,component:o,variant:f,hasChildren:!!p.children}),b=de(x);return e.jsx(he,j({as:o,ref:s,className:q(b.root,l),ownerState:x},p,{style:j({width:g,height:n},u)}))}),me=()=>{const[t,a]=d.useState(!1),[s,r]=d.useState([]),{enqueueSnackbar:i}=T(),{get:l}=_(),o=d.useCallback(async()=>{a(!0);try{const n=await l("/roles");n.statusCode===200?r(n.data.roles):i(n.error??n.message??"Unknown error",{variant:"error"})}catch(n){i(n.message,{variant:"error"})}finally{a(!1)}},[l,i]);return d.useEffect(()=>{o()},[l,i,o]),{roles:s,isLoading:t,onFetchRoles:o}},pe=()=>{const[t,a]=d.useState(!1),[s,r]=d.useState([]),{enqueueSnackbar:i}=T(),{get:l}=_(),o=d.useCallback(async()=>{a(!0);try{const n=await l("/teams");n.statusCode===200?r(n.data.teams):i(n.error??n.message??"Unknown error",{variant:"error"})}catch(n){i(n.message,{variant:"error"})}finally{a(!1)}},[l,i]);return d.useEffect(()=>{o()},[l,i,o]),{teams:s,isLoading:t,onFetchTeams:o}};function F(t,a,s){return t.map(r=>({text:String(r[a]),value:String(r[s])}))}function D(t,a){return t===!0||Array.isArray(t)?a:Object.fromEntries(Object.keys(t).map(s=>[s,D(t[s],a[s])]))}function xe(){const t=z(),a=d.useMemo(()=>parseInt((t==null?void 0:t.id)??"0",10),[t]),{handleSubmit:s,register:r,formState:i,reset:l}=Z(),{onUpdateUser:o}=te(),{isLoading:n,userDetail:u,onFetchUserDetail:f}=ae(a),{isLoading:g,teams:p}=pe(),{isLoading:x,roles:b}=me(),V=d.useMemo(()=>F(p,"name","id"),[p]),O=d.useMemo(()=>F(b,"name","code"),[b]),$=d.useCallback(async h=>{const A=D(i.dirtyFields,h);await o(a,A),f(),l()},[o,f,a,i,l]);return e.jsxs(Q,{children:[n&&e.jsx(v,{children:"...loading"}),!n&&!u&&e.jsx(v,{color:"red",children:"Không có thông tin!"}),!n&&u&&e.jsxs(e.Fragment,{children:[e.jsx(y,{display:"flex",alignItems:"center",mb:5,children:e.jsx(v,{variant:"h4",flexGrow:1,children:u.name})}),e.jsx(se,{children:e.jsxs(y,{p:{xs:2,sm:4},children:[e.jsxs(c,{container:!0,spacing:2,children:[e.jsx(c,{item:!0,xs:12,md:4,xl:3,children:e.jsx(m,{...r("name"),defaultValue:u.name,label:"Tên",placeholder:"Nhập tên",fullWidth:!0,InputLabelProps:{shrink:!0},sx:{mb:3}})}),e.jsx(c,{item:!0,xs:12,md:4,xl:3,children:e.jsx(m,{...r("email"),defaultValue:u.email,label:"Email",placeholder:"Nhập email",fullWidth:!0,InputLabelProps:{shrink:!0},sx:{mb:3}})}),e.jsx(c,{item:!0,xs:12,md:4,xl:3,children:e.jsx(m,{...r("address"),defaultValue:u.address,label:"Địa chỉ",placeholder:"Nhập địa chỉ",fullWidth:!0,InputLabelProps:{shrink:!0},sx:{mb:3}})}),e.jsx(c,{item:!0,xs:12,md:4,xl:3,children:e.jsx(m,{...r("phone"),defaultValue:u.phone,label:"Số điện thoại",placeholder:"Nhập số điện thoại",fullWidth:!0,InputLabelProps:{shrink:!0},sx:{mb:3}})}),e.jsxs(c,{item:!0,xs:12,md:4,xl:3,children:[g&&e.jsx(P,{variant:"rounded",height:56,width:"100%"}),!g&&e.jsxs(S,{fullWidth:!0,children:[e.jsx(L,{id:"team-id-label",children:"Phòng ban"}),e.jsx(I,{...r("teamId"),label:"Phòng ban",labelId:"team-id-label",id:"team-id",fullWidth:!0,defaultValue:u.team.id.toString(),sx:{mb:3},children:V.map(h=>e.jsx(w,{value:h.value,children:h.text},h.value))})]})]}),e.jsxs(c,{item:!0,xs:12,md:4,xl:3,children:[x&&e.jsx(P,{variant:"rounded",height:56,width:"100%"}),!x&&e.jsxs(S,{fullWidth:!0,children:[e.jsx(L,{id:"role-code-label",children:"Chức vụ"}),e.jsx(I,{...r("roleCode"),label:"Chức vụ",labelId:"role-code-label",id:"role-code",fullWidth:!0,defaultValue:u.roleCode,sx:{mb:3},children:O.map(h=>e.jsx(w,{value:h.value,children:h.text},h.value))})]})]}),e.jsx(c,{item:!0,xs:12,md:4,xl:3,children:e.jsx(m,{...r("identifyCard"),defaultValue:u.identifyCard,label:"Số CCCD",placeholder:"Nhập số CCCD",fullWidth:!0,InputLabelProps:{shrink:!0},sx:{mb:3}})}),e.jsx(c,{item:!0,xs:12,md:4,xl:3,children:e.jsx(m,{...r("password"),label:"Mật khẩu",placeholder:"Nhập mật khẩu mới",fullWidth:!0,InputLabelProps:{shrink:!0},sx:{mb:3}})})]}),e.jsx(c,{container:!0,spacing:2,mt:{xs:1,md:2},children:e.jsx(c,{item:!0,xs:12,md:4,xl:3,children:e.jsx(ee,{fullWidth:!0,size:"large",type:"submit",color:"inherit",variant:"contained",disabled:!i.isDirty,onClick:s($),children:"Lưu"})})})]})})]})]})}function ye(){return e.jsxs(e.Fragment,{children:[e.jsx(J,{children:e.jsxs("title",{children:[" ",`Chi tiết nhân viên - ${Y.appName}`]})}),e.jsx(xe,{})]})}export{ye as default};
