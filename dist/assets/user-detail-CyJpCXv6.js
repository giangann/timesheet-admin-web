import{g as B,f as E,k as V,s as X,_ as j,h as L,r as c,i as K,l as H,j as e,n as q,o as z,u as J,p as Q,D as Y,T as v,B as I,b as U,H as Z}from"./index-CiyAc5l9.js";import{C as ee}from"./config-global-ClKwKbZP.js";import{u as te}from"./index.esm-CKNsy_kw.js";import{u as ae}from"./use-api-CDdvI0gq.js";import{u as se}from"./use-team-CrauW6BN.js";import{a as re,b as ie}from"./use-user-H15zXjPe.js";import{C as ne,G as u}from"./Grid-DiL9jkRp.js";import{T as m,F as R,I as W,S as P}from"./TextField-DAHlXdg2.js";import{a as oe}from"./colorManipulator-C07o6-h5.js";import{L as le}from"./LoadingButton-cyYOQG9v.js";function de(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function ue(t){return parseFloat(t)}function he(t){return B("MuiSkeleton",t)}E("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const ce=["animation","className","component","height","style","variant","width"];let C=t=>t,D,N,F,M;const me=t=>{const{classes:a,variant:s,animation:r,hasChildren:i,width:h,height:l}=t;return z({root:["root",s,r,i&&"withChildren",i&&!h&&"fitContent",i&&!l&&"heightAuto"]},he,a)},pe=V(D||(D=C`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),xe=V(N||(N=C`
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
`)),fe=X("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,a)=>{const{ownerState:s}=t;return[a.root,a[s.variant],s.animation!==!1&&a[s.animation],s.hasChildren&&a.withChildren,s.hasChildren&&!s.width&&a.fitContent,s.hasChildren&&!s.height&&a.heightAuto]}})(({theme:t,ownerState:a})=>{const s=de(t.shape.borderRadius)||"px",r=ue(t.shape.borderRadius);return j({display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:oe(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em"},a.variant==="text"&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${r}${s}/${Math.round(r/.6*10)/10}${s}`,"&:empty:before":{content:'"\\00a0"'}},a.variant==="circular"&&{borderRadius:"50%"},a.variant==="rounded"&&{borderRadius:(t.vars||t).shape.borderRadius},a.hasChildren&&{"& > *":{visibility:"hidden"}},a.hasChildren&&!a.width&&{maxWidth:"fit-content"},a.hasChildren&&!a.height&&{height:"auto"})},({ownerState:t})=>t.animation==="pulse"&&L(F||(F=C`
      animation: ${0} 2s ease-in-out 0.5s infinite;
    `),pe),({ownerState:t,theme:a})=>t.animation==="wave"&&L(M||(M=C`
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
    `),xe,(a.vars||a).palette.action.hover)),_=c.forwardRef(function(a,s){const r=K({props:a,name:"MuiSkeleton"}),{animation:i="pulse",className:h,component:l="span",height:n,style:o,variant:g="text",width:b}=r,p=H(r,ce),x=j({},r,{animation:i,component:l,variant:g,hasChildren:!!p.children}),f=me(x);return e.jsx(fe,j({as:l,ref:s,className:q(f.root,h),ownerState:x},p,{style:j({width:b,height:n},o)}))}),ge=()=>{const[t,a]=c.useState(!1),[s,r]=c.useState([]),{enqueueSnackbar:i}=J(),{get:h}=ae(),l=c.useCallback(async()=>{a(!0);try{const n=await h("/roles");n.statusCode===200?r(n.data.roles):i(n.error??n.message??"Unknown error",{variant:"error"})}catch(n){i(n.message,{variant:"error"})}finally{a(!1)}},[h,i]);return c.useEffect(()=>{l()},[h,i,l]),{roles:s,isLoading:t,onFetchRoles:l}};function T(t,a,s){return t.map(r=>({text:String(r[a]),value:String(r[s])}))}function $(t,a){return t===!0||Array.isArray(t)?a:Object.fromEntries(Object.keys(t).map(s=>[s,$(t[s],a[s])]))}function be(){var y,w,S;const t=Q(),a=c.useMemo(()=>parseInt((t==null?void 0:t.id)??"0",10),[t]),{handleSubmit:s,register:r,formState:i,reset:h}=te(),{onUpdateUser:l}=re(),{isLoading:n,userDetail:o,onFetchUserDetail:g}=ie(a),{isLoading:b,teams:p}=se(),{isLoading:x,roles:f}=ge(),A=c.useMemo(()=>T(p,"name","id"),[p]),k=c.useMemo(()=>T(f,"name","id"),[f]);console.log({roleOpts:k});const G=c.useCallback(async d=>{const O={...$(i.dirtyFields,d)};await l(a,O),g(),h()},[l,g,a,i,h]);return e.jsxs(Y,{children:[n&&e.jsx(v,{children:"...loading"}),!n&&!o&&e.jsx(v,{color:"red",children:"Không có thông tin!"}),!n&&o&&e.jsxs(e.Fragment,{children:[e.jsx(I,{display:"flex",alignItems:"center",mb:5,children:e.jsx(v,{variant:"h4",flexGrow:1,children:o.name})}),e.jsx(ne,{children:e.jsxs(I,{p:{xs:2,sm:4},children:[e.jsxs(u,{container:!0,spacing:2,children:[e.jsx(u,{item:!0,xs:12,md:4,xl:3,children:e.jsx(m,{...r("name"),defaultValue:o.name,label:"Tên",placeholder:"Nhập tên",fullWidth:!0,InputLabelProps:{shrink:!0},sx:{mb:3}})}),e.jsx(u,{item:!0,xs:12,md:4,xl:3,children:e.jsx(m,{...r("email"),defaultValue:o.email,label:"Email",placeholder:"Nhập email",fullWidth:!0,InputLabelProps:{shrink:!0},sx:{mb:3}})}),e.jsx(u,{item:!0,xs:12,md:4,xl:3,children:e.jsx(m,{...r("address"),defaultValue:o.address,label:"Địa chỉ",placeholder:"Nhập địa chỉ",fullWidth:!0,InputLabelProps:{shrink:!0},sx:{mb:3}})}),e.jsx(u,{item:!0,xs:12,md:4,xl:3,children:e.jsx(m,{...r("phone"),defaultValue:o.phone,label:"Số điện thoại",placeholder:"Nhập số điện thoại",fullWidth:!0,InputLabelProps:{shrink:!0},sx:{mb:3}})}),e.jsxs(u,{item:!0,xs:12,md:4,xl:3,children:[b&&e.jsx(_,{variant:"rounded",height:56,width:"100%"}),!b&&e.jsxs(R,{fullWidth:!0,children:[e.jsx(W,{id:"team-id-label",children:"Phòng ban"}),e.jsx(P,{...r("team"),label:"Phòng ban",labelId:"team-id-label",id:"team-id",fullWidth:!0,defaultValue:o.team.id.toString(),sx:{mb:3},children:A.map(d=>e.jsx(U,{value:d.value,children:d.text},d.value))})]})]}),e.jsxs(u,{item:!0,xs:12,md:4,xl:3,children:[x&&e.jsx(_,{variant:"rounded",height:56,width:"100%"}),!x&&e.jsxs(R,{fullWidth:!0,children:[e.jsx(W,{id:"role-code-label",children:"Chức vụ"}),e.jsx(P,{...r("role"),label:"Chức vụ",labelId:"role-code-label",id:"role-code",fullWidth:!0,defaultValue:((S=(w=(y=f.filter(d=>d.code===o.roleCode))==null?void 0:y[0])==null?void 0:w.id)==null?void 0:S.toString())??"null",sx:{mb:3},children:k.map(d=>e.jsx(U,{value:d.value,children:d.text},d.value))})]})]}),e.jsx(u,{item:!0,xs:12,md:4,xl:3,children:e.jsx(m,{...r("identifyCard"),defaultValue:o.identifyCard,label:"Số CCCD",placeholder:"Nhập số CCCD",fullWidth:!0,InputLabelProps:{shrink:!0},sx:{mb:3}})}),e.jsx(u,{item:!0,xs:12,md:4,xl:3,children:e.jsx(m,{...r("password"),label:"Mật khẩu",placeholder:"Nhập mật khẩu mới",fullWidth:!0,InputLabelProps:{shrink:!0},sx:{mb:3}})})]}),e.jsx(u,{container:!0,spacing:2,mt:{xs:1,md:2},children:e.jsx(u,{item:!0,xs:12,md:4,xl:3,children:e.jsx(le,{fullWidth:!0,size:"large",type:"submit",color:"inherit",variant:"contained",disabled:!i.isDirty,onClick:s(G),children:"Lưu"})})})]})})]})]})}function We(){return e.jsxs(e.Fragment,{children:[e.jsx(Z,{children:e.jsxs("title",{children:[" ",`Chi tiết nhân viên - ${ee.appName}`]})}),e.jsx(be,{})]})}export{We as default};
