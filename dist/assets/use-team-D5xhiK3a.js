import{r as o,u}from"./index-q_5Tqw1q.js";import{u as m}from"./use-api-DWFDTJE-.js";import{a as l}from"./map-util-BcGf2YPr.js";const g=()=>{const[i,a]=o.useState(!1),[e,t]=o.useState([]),{enqueueSnackbar:r}=u(),{get:c}=m(),s=o.useCallback(async()=>{a(!0);try{const n=await c("/teams");n.statusCode===200?t(n.data.teams):r(n.error??n.message??"Unknown error",{variant:"error"})}catch(n){r(n.message,{variant:"error"})}finally{a(!1)}},[c,r]);return o.useEffect(()=>{s()},[c,r,s]),{teams:e,isLoading:i,onFetchTeams:s}},k=i=>{const{isLoading:a,teams:e,onFetchTeams:t}=g(),r=o.useMemo(()=>l(e,"id"),[e]),c=o.useMemo(()=>r.get(i.toString()),[r,i]);return{isLoading:a,teamDetail:c,onFetchTeamDetail:t}},T=()=>{const[i,a]=o.useState(!1),{enqueueSnackbar:e}=u(),{post:t}=m(),r=o.useCallback(async c=>{a(!0);try{const s=await t("/teams",c);s.statusCode===200?e("Tạo mới thành công",{variant:"success"}):e(s.error??s.message??"Unknown error",{variant:"error"})}catch(s){e(s.message??"Unknown error",{variant:"error"})}finally{a(!1)}},[e,a,t]);return{isLoading:i,onCreateNewTeam:r}},y=()=>{const[i,a]=o.useState(!1),{enqueueSnackbar:e}=u(),{post:t}=m(),r=o.useCallback(async(c,s)=>{a(!0);try{const n=await t("/teams",{...s,id:c});n.statusCode===200?e("Cập nhật thành công",{variant:"success"}):e(n.error??n.message??"Unknown error",{variant:"error"})}catch(n){e(n.message??"Unknown error",{variant:"error"})}finally{a(!1)}},[e,a,t]);return{isLoading:i,onUpdateTeam:r}},h=()=>{const[i,a]=o.useState(!1),{enqueueSnackbar:e}=u(),{remove:t}=m();return{deleteTeamById:o.useCallback(async c=>{a(!0);try{const s=await t("/teams",{id:c});s.statusCode===200?e("Xóa thành công",{variant:"success"}):e(s.error??s.message??"Unknown error",{variant:"error"})}catch(s){e(s.message??"Unknown error",{variant:"error"})}finally{a(!1)}},[t,e,a]),isLoading:i}};export{h as a,T as b,k as c,y as d,g as u};
