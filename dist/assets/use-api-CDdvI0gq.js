import{aq as l,r,ar as A,as as H,at as m,au as h,av as k,aw as w}from"./index-CiyAc5l9.js";const y=()=>{const{token:a}=l(),o=r.useCallback(async(s,t)=>{const e=new Headers;return e.append("Authorization",`Bearer ${a}`),A(s,t,e)},[a]),c=r.useCallback(async(s,t)=>{const e=new Headers;return e.append("Authorization",`Bearer ${a}`),H(s,t,e)},[a]),u=r.useCallback(async(s,t,e)=>{const n=new Headers;return n.append("Authorization",`Bearer ${a}`),m(s,t,e,n)},[a]),p=r.useCallback(async(s,t)=>{const e=new Headers;return e.append("Authorization",`Bearer ${a}`),h(s,t,e)},[a]),i=r.useCallback(async s=>{const t=new Headers;return t.append("Authorization",`Bearer ${a}`),k(s,t)},[a]),d=r.useCallback(async(s,t)=>{const e=new Headers;return e.append("Authorization",`Bearer ${a}`),w(s,t,e)},[a]);return{get:o,post:c,put:u,remove:p,getFile:i,postFormData:d}};export{y as u};