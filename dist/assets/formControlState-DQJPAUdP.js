import{r as n}from"./index-CXhcBOst.js";function C({controlled:t,default:r,name:u,state:o="value"}){const{current:e}=n.useRef(t!==void 0),[s,a]=n.useState(r),f=e?t:s,l=n.useCallback(i=>{e||a(i)},[]);return[f,l]}const c=n.createContext(void 0);function v(){return n.useContext(c)}function x({props:t,states:r,muiFormControl:u}){return r.reduce((o,e)=>(o[e]=t[e],u&&typeof t[e]>"u"&&(o[e]=u[e]),o),{})}export{c as F,v as a,x as f,C as u};
