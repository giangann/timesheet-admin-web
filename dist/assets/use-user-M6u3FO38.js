import{r as t,u as i,q as p}from"./index-C8lk817k.js";import{a as U}from"./map-util-BcGf2YPr.js";import{u as l}from"./use-api--dau0ow6.js";const f=()=>{const[c,r]=t.useState(!1),[a,e]=t.useState([]),{enqueueSnackbar:n}=i(),{get:o}=l(),u=t.useCallback(async()=>{r(!0);try{const s=await o("/users",{...p});s.statusCode===200&&e(s.data.users)}catch(s){n(s.message,{variant:"error"})}finally{r(!1)}},[o,n]);return t.useEffect(()=>{u()},[o,n,u]),{users:a,isLoading:c,refetchUsers:u}},S=c=>{const{isLoading:r,users:a,refetchUsers:e}=f(),n=t.useMemo(()=>U(a,"id"),[a]),o=t.useMemo(()=>n.get(c.toString()),[n,c]);return{isLoading:r,userDetail:o,onFetchUserDetail:e}},b=()=>{const[c,r]=t.useState(!1),{put:a}=l(),{enqueueSnackbar:e}=i();return{onUpdateUser:t.useCallback(async(o,u)=>{r(!0);try{const s=await a("/users",{id:o},u);s.statusCode===200?e("Cập nhật thành công",{variant:"success"}):e(s.error??s.message??"Unknown error",{variant:"error"})}catch(s){e(s.message,{variant:"error"})}finally{r(!1)}},[a,e]),isSubmitting:c}};export{b as a,S as b,f as u};