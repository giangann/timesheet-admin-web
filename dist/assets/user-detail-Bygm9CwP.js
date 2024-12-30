import{g as A,f as O,k as _,s as E,_ as j,h as L,r as m,i as H,l as X,j as e,n as K,o as q,u as z,p as J,D as Q,T as v,B as S,b as I,H as Y}from"./index-q_5Tqw1q.js";import{C as Z}from"./config-global-ClKwKbZP.js";import{u as ee}from"./index.esm-DVunts-Q.js";import{u as te}from"./use-api-DWFDTJE-.js";import{u as se}from"./use-team-D5xhiK3a.js";import{a as ae,b as re}from"./use-user-lIwTuig1.js";import{d as ie}from"./format-field-values-D8fEPtxi.js";import{C as ne,G as l}from"./Grid-CdEE13BC.js";import{T as c,F as P,I as U,S as W}from"./TextField-DUkHxIjn.js";import{a as le}from"./colorManipulator-ChlBrSf2.js";import{L as oe}from"./LoadingButton-CrnBcsNN.js";import"./map-util-BcGf2YPr.js";function de(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function ue(t){return parseFloat(t)}function he(t){return A("MuiSkeleton",t)}O("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const ce=["animation","className","component","height","style","variant","width"];let C=t=>t,R,N,F,V;const me=t=>{const{classes:s,variant:r,animation:a,hasChildren:i,width:h,height:d}=t;return q({root:["root",r,a,i&&"withChildren",i&&!h&&"fitContent",i&&!d&&"heightAuto"]},he,s)},pe=_(R||(R=C`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),xe=_(N||(N=C`
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
`)),fe=E("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,s)=>{const{ownerState:r}=t;return[s.root,s[r.variant],r.animation!==!1&&s[r.animation],r.hasChildren&&s.withChildren,r.hasChildren&&!r.width&&s.fitContent,r.hasChildren&&!r.height&&s.heightAuto]}})(({theme:t,ownerState:s})=>{const r=de(t.shape.borderRadius)||"px",a=ue(t.shape.borderRadius);return j({display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:le(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em"},s.variant==="text"&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${a}${r}/${Math.round(a/.6*10)/10}${r}`,"&:empty:before":{content:'"\\00a0"'}},s.variant==="circular"&&{borderRadius:"50%"},s.variant==="rounded"&&{borderRadius:(t.vars||t).shape.borderRadius},s.hasChildren&&{"& > *":{visibility:"hidden"}},s.hasChildren&&!s.width&&{maxWidth:"fit-content"},s.hasChildren&&!s.height&&{height:"auto"})},({ownerState:t})=>t.animation==="pulse"&&L(F||(F=C`
      animation: ${0} 2s ease-in-out 0.5s infinite;
    `),pe),({ownerState:t,theme:s})=>t.animation==="wave"&&L(V||(V=C`
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
    `),xe,(s.vars||s).palette.action.hover)),D=m.forwardRef(function(s,r){const a=H({props:s,name:"MuiSkeleton"}),{animation:i="pulse",className:h,component:d="span",height:o,style:n,variant:b="text",width:g}=a,p=X(a,ce),x=j({},a,{animation:i,component:d,variant:b,hasChildren:!!p.children}),f=me(x);return e.jsx(fe,j({as:d,ref:r,className:K(f.root,h),ownerState:x},p,{style:j({width:g,height:o},n)}))}),be=()=>{const[t,s]=m.useState(!1),[r,a]=m.useState([]),{enqueueSnackbar:i}=z(),{get:h}=te(),d=m.useCallback(async()=>{s(!0);try{const o=await h("/roles");o.statusCode===200?a(o.data.roles):i(o.error??o.message??"Unknown error",{variant:"error"})}catch(o){i(o.message,{variant:"error"})}finally{s(!1)}},[h,i]);return m.useEffect(()=>{d()},[h,i,d]),{roles:r,isLoading:t,onFetchRoles:d}};function M(t,s,r){return t.map(a=>({text:String(a[s]),value:String(a[r])}))}function ge(){var k,y,w;const t=J(),s=m.useMemo(()=>parseInt((t==null?void 0:t.id)??"0",10),[t]),{handleSubmit:r,register:a,formState:i,reset:h}=ee(),{onUpdateUser:d}=ae(),{isLoading:o,userDetail:n,onFetchUserDetail:b}=re(s),{isLoading:g,teams:p}=se(),{isLoading:x,roles:f}=be(),B=m.useMemo(()=>M(p,"name","id"),[p]),T=m.useMemo(()=>M(f,"name","id"),[f]),$=m.useCallback(async u=>{const G={...ie(i.dirtyFields,u)};await d(s,G),b(),h()},[d,b,s,i,h]);return e.jsxs(Q,{children:[o&&e.jsx(v,{children:"...loading"}),!o&&!n&&e.jsx(v,{color:"red",children:"Không có thông tin!"}),!o&&n&&e.jsxs(e.Fragment,{children:[e.jsx(S,{display:"flex",alignItems:"center",mb:5,children:e.jsx(v,{variant:"h4",flexGrow:1,children:n.name})}),e.jsx(ne,{children:e.jsxs(S,{p:{xs:2,sm:4},children:[e.jsxs(l,{container:!0,spacing:2,children:[e.jsx(l,{item:!0,xs:12,md:4,xl:3,children:e.jsx(c,{...a("name"),defaultValue:n.name,label:"Tên",placeholder:"Nhập tên",fullWidth:!0,InputLabelProps:{shrink:!0},sx:{mb:3}})}),e.jsx(l,{item:!0,xs:12,md:4,xl:3,children:e.jsx(c,{...a("email"),defaultValue:n.email,label:"Email",placeholder:"Nhập email",fullWidth:!0,InputLabelProps:{shrink:!0},sx:{mb:3}})}),e.jsx(l,{item:!0,xs:12,md:4,xl:3,children:e.jsx(c,{...a("address"),defaultValue:n.address,label:"Địa chỉ",placeholder:"Nhập địa chỉ",fullWidth:!0,InputLabelProps:{shrink:!0},sx:{mb:3}})}),e.jsx(l,{item:!0,xs:12,md:4,xl:3,children:e.jsx(c,{...a("phone"),defaultValue:n.phone,label:"Số điện thoại",placeholder:"Nhập số điện thoại",fullWidth:!0,InputLabelProps:{shrink:!0},sx:{mb:3}})}),e.jsxs(l,{item:!0,xs:12,md:4,xl:3,children:[g&&e.jsx(D,{variant:"rounded",height:56,width:"100%"}),!g&&e.jsxs(P,{fullWidth:!0,children:[e.jsx(U,{id:"team-id-label",children:"Phòng ban"}),e.jsx(W,{...a("team"),label:"Phòng ban",labelId:"team-id-label",id:"team-id",fullWidth:!0,defaultValue:n.team.id.toString(),sx:{mb:3},children:B.map(u=>e.jsx(I,{value:u.value,children:u.text},u.value))})]})]}),e.jsxs(l,{item:!0,xs:12,md:4,xl:3,children:[x&&e.jsx(D,{variant:"rounded",height:56,width:"100%"}),!x&&e.jsxs(P,{fullWidth:!0,children:[e.jsx(U,{id:"role-code-label",children:"Chức vụ"}),e.jsx(W,{...a("role"),label:"Chức vụ",labelId:"role-code-label",id:"role-code",fullWidth:!0,defaultValue:((w=(y=(k=f.filter(u=>u.code===n.roleCode))==null?void 0:k[0])==null?void 0:y.id)==null?void 0:w.toString())??"null",sx:{mb:3},children:T.map(u=>e.jsx(I,{value:u.value,children:u.text},u.value))})]})]}),e.jsx(l,{item:!0,xs:12,md:4,xl:3,children:e.jsx(c,{...a("identifyCard"),defaultValue:n.identifyCard,label:"Số CCCD",placeholder:"Nhập số CCCD",fullWidth:!0,InputLabelProps:{shrink:!0},sx:{mb:3}})}),e.jsx(l,{item:!0,xs:12,md:4,xl:3,children:e.jsx(c,{...a("password"),label:"Mật khẩu",placeholder:"Nhập mật khẩu mới",fullWidth:!0,InputLabelProps:{shrink:!0},sx:{mb:3}})}),e.jsx(l,{item:!0,xs:12,md:4,xl:3,children:e.jsx(c,{...a("salaryCoefficient"),defaultValue:n.salaryCoefficient,label:"Hệ số lương",placeholder:"Nhập hệ số lương",fullWidth:!0,InputLabelProps:{shrink:!0},sx:{mb:3}})})," ",e.jsx(l,{item:!0,xs:12,md:4,xl:3,children:e.jsx(c,{...a("positionBonusCoefficient"),defaultValue:n.positionBonusCoefficient,label:"Hệ số chức vụ",placeholder:"Nhập hệ số chức vụ",fullWidth:!0,InputLabelProps:{shrink:!0},sx:{mb:3}})}),e.jsx(l,{item:!0,xs:12,md:4,xl:3,children:e.jsx(c,{...a("otherBonusCoefficient"),defaultValue:n.otherBonusCoefficient,label:"Phụ cấp khác",placeholder:"Nhập hệ số phụ cấp khác",fullWidth:!0,InputLabelProps:{shrink:!0},sx:{mb:3}})})]}),e.jsx(l,{container:!0,spacing:2,mt:{xs:1,md:2},children:e.jsx(l,{item:!0,xs:12,md:4,xl:3,children:e.jsx(oe,{onClick:r($),disabled:!i.isDirty,loading:i.isSubmitting,fullWidth:!0,size:"large",type:"submit",color:"inherit",variant:"contained",children:"Lưu"})})})]})})]})]})}function Ne(){return e.jsxs(e.Fragment,{children:[e.jsx(Y,{children:e.jsxs("title",{children:[" ",`Chi tiết nhân viên - ${Z.appName}`]})}),e.jsx(ge,{})]})}export{Ne as default};
