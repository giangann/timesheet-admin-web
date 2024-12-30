function u(r,n){return r===!0||Array.isArray(r)?n:Object.fromEntries(Object.keys(r).map(t=>[t,u(r[t],n[t])]))}export{u as d};
