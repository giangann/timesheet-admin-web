import{r as t,u}from"./index-q_5Tqw1q.js";import{u as y}from"./use-api-DWFDTJE-.js";function d(){const[i,s]=t.useState(!1),[a,n]=t.useState([]),{enqueueSnackbar:c}=u(),{get:o}=y(),e=t.useCallback(async()=>{s(!0);try{const r=await o("/base-salary");r.statusCode===200?n(r.data.baseSalaries.content):c(r.error??r.message??"Unknown error",{variant:"error"})}catch(r){c(r.message,{variant:"error"})}finally{s(!1)}},[o,c]);return t.useEffect(()=>{e()},[o,c,e]),{baseSalaries:a,isLoading:i,onFetchBaseSalaries:e}}const g=i=>{const[s,a]=t.useState(!1),[n,c]=t.useState(),{get:o}=y(),{enqueueSnackbar:e}=u(),r=t.useCallback(async()=>{a(!0);try{const l=await o("/base-salary/find-by-id",{id:i});l.statusCode===200?c(l.data.baseSalary):e(l.error??l.message??"Unknown error",{variant:"error"})}catch(l){e(l.message,{variant:"error"})}finally{a(!1)}},[o,e,i]);return t.useEffect(()=>{r()},[r]),{isLoading:s,baseSalaryDetail:n,onFetchBaseSalaryDetail:r}};function b(){const[i,s]=t.useState(!1),{enqueueSnackbar:a}=u(),{post:n}=y(),c=t.useCallback(async o=>{s(!0);try{const e=await n("/base-salary",o);e.statusCode===200?a("Tạo mới thành công",{variant:"success"}):a(e.error??e.message??"Unknown error",{variant:"error"})}catch(e){a(e.message??"Unknown error",{variant:"error"})}finally{s(!1)}},[a,s,n]);return{isLoading:i,onCreateNewBaseSalary:c}}function k(){const[i,s]=t.useState(!1),{enqueueSnackbar:a}=u(),{put:n}=y(),c=t.useCallback(async(o,e)=>{s(!0);try{const r=await n("/base-salary",{id:o},e);r.statusCode===200?a("Cập nhật thành công",{variant:"success"}):a(r.error??r.message??"Unknown error",{variant:"error"})}catch(r){a(r.message??"Unknown error",{variant:"error"})}finally{s(!1)}},[a,s,n]);return{isLoading:i,onUpdateBaseSalary:c}}function m(){const[i,s]=t.useState(!1),{enqueueSnackbar:a}=u(),{remove:n}=y();return{deleteBaseSalaryById:t.useCallback(async o=>{s(!0);try{const e=await n("/base-salary",{id:o});e.statusCode===200?a("Xóa thành công",{variant:"success"}):a(e.error??e.message??"Unknown error",{variant:"error"})}catch(e){a(e.message??"Unknown error",{variant:"error"})}finally{s(!1)}},[n,a,s]),isLoading:i}}export{b as a,m as b,k as c,g as d,d as u};
