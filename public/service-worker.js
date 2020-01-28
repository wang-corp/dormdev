try{self["workbox:core:5.0.0-rc.1"]&&_()}catch(e){}const e=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}try{self["workbox:routing:5.0.0-rc.1"]&&_()}catch(e){}const s=e=>e&&"object"==typeof e?e:{handle:e};class n{constructor(e,t,n="GET"){this.handler=s(t),this.match=e,this.method=n}}class i extends n{constructor(e,t,s){super(({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)},t,s)}}const r=e=>{const t=new URL(String(e),location.href);return t.origin===location.origin?t.pathname:t.href};class a{constructor(){this.t=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map(e=>{"string"==typeof e&&(e=[e]);const t=new Request(...e);return this.handleRequest({request:t})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;let n,{params:i,route:r}=this.findMatchingRoute({url:s,request:e,event:t}),a=r&&r.handler;if(!a&&this.s&&(a=this.s),a){try{n=a.handle({url:s,request:e,event:t,params:i})}catch(e){n=Promise.reject(e)}return n instanceof Promise&&this.i&&(n=n.catch(n=>this.i.handle({url:s,request:e,event:t}))),n}}findMatchingRoute({url:e,request:t,event:s}){const n=this.t.get(t.method)||[];for(const i of n){let n,r=i.match({url:e,request:t,event:s});if(r)return n=r,Array.isArray(r)&&0===r.length?n=void 0:r.constructor===Object&&0===Object.keys(r).length?n=void 0:"boolean"==typeof r&&(n=void 0),{route:i,params:n}}return{}}setDefaultHandler(e){this.s=s(e)}setCatchHandler(e){this.i=s(e)}registerRoute(e){this.t.has(e.method)||this.t.set(e.method,[]),this.t.get(e.method).push(e)}unregisterRoute(e){if(!this.t.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this.t.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this.t.get(e.method).splice(s,1)}}let c;const o=()=>(c||(c=new a,c.addFetchListener(),c.addCacheListener()),c),h={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},u=e=>[h.prefix,e,h.suffix].filter(e=>e&&e.length>0).join("-"),l=e=>e||u(h.precache),f=e=>e||u(h.runtime);function d(e){e.then(()=>{})}const w=new Set;class p{constructor(e,t,{onupgradeneeded:s,onversionchange:n}={}){this.o=null,this.h=e,this.u=t,this.l=s,this.p=n||(()=>this.close())}get db(){return this.o}async open(){if(!this.o)return this.o=await new Promise((e,t)=>{let s=!1;setTimeout(()=>{s=!0,t(new Error("The open request was blocked and timed out"))},this.OPEN_TIMEOUT);const n=indexedDB.open(this.h,this.u);n.onerror=()=>t(n.error),n.onupgradeneeded=e=>{s?(n.transaction.abort(),n.result.close()):"function"==typeof this.l&&this.l(e)},n.onsuccess=()=>{const t=n.result;s?t.close():(t.onversionchange=this.p.bind(this),e(t))}}),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,s){return await this.getAllMatching(e,{query:t,count:s})}async getAllKeys(e,t,s){return(await this.getAllMatching(e,{query:t,count:s,includeKeys:!0})).map(e=>e.key)}async getAllMatching(e,{index:t,query:s=null,direction:n="next",count:i,includeKeys:r=!1}={}){return await this.transaction([e],"readonly",(a,c)=>{const o=a.objectStore(e),h=t?o.index(t):o,u=[],l=h.openCursor(s,n);l.onsuccess=()=>{const e=l.result;e?(u.push(r?e:e.value),i&&u.length>=i?c(u):e.continue()):c(u)}})}async transaction(e,t,s){return await this.open(),await new Promise((n,i)=>{const r=this.o.transaction(e,t);r.onabort=()=>i(r.error),r.oncomplete=()=>n(),s(r,e=>n(e))})}async g(e,t,s,...n){return await this.transaction([t],s,(s,i)=>{const r=s.objectStore(t),a=r[e].apply(r,n);a.onsuccess=()=>i(a.result)})}close(){this.o&&(this.o.close(),this.o=null)}}p.prototype.OPEN_TIMEOUT=2e3;const g={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[e,t]of Object.entries(g))for(const s of t)s in IDBObjectStore.prototype&&(p.prototype[s]=async function(t,...n){return await this.g(s,t,e,...n)});try{self["workbox:expiration:5.0.0-rc.1"]&&_()}catch(e){}const y=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class m{constructor(e){this.m=e,this.o=new p("workbox-expiration",1,{onupgradeneeded:e=>this.v(e)})}v(e){const t=e.target.result.createObjectStore("cache-entries",{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1}),(async e=>{await new Promise((t,s)=>{const n=indexedDB.deleteDatabase(e);n.onerror=()=>{s(n.error)},n.onblocked=()=>{s(new Error("Delete blocked"))},n.onsuccess=()=>{t()}})})(this.m)}async setTimestamp(e,t){const s={url:e=y(e),timestamp:t,cacheName:this.m,id:this.q(e)};await this.o.put("cache-entries",s)}async getTimestamp(e){return(await this.o.get("cache-entries",this.q(e))).timestamp}async expireEntries(e,t){const s=await this.o.transaction("cache-entries","readwrite",(s,n)=>{const i=s.objectStore("cache-entries").index("timestamp").openCursor(null,"prev"),r=[];let a=0;i.onsuccess=()=>{const s=i.result;if(s){const n=s.value;n.cacheName===this.m&&(e&&n.timestamp<e||t&&a>=t?r.push(s.value):a++),s.continue()}else n(r)}}),n=[];for(const e of s)await this.o.delete("cache-entries",e.id),n.push(e.url);return n}q(e){return this.m+"|"+y(e)}}class v{constructor(e,t={}){this.N=!1,this.R=!1,this.L=t.maxEntries,this._=t.maxAgeSeconds,this.m=e,this.U=new m(e)}async expireEntries(){if(this.N)return void(this.R=!0);this.N=!0;const e=this._?Date.now()-1e3*this._:0,t=await this.U.expireEntries(e,this.L),s=await self.caches.open(this.m);for(const e of t)await s.delete(e);this.N=!1,this.R&&(this.R=!1,d(this.expireEntries()))}async updateTimestamp(e){await this.U.setTimestamp(e,Date.now())}async isURLExpired(e){if(this._){return await this.U.getTimestamp(e)<Date.now()-1e3*this._}return!1}async delete(){this.R=!1,await this.U.expireEntries(1/0)}}const b=(e,t)=>e.filter(e=>t in e),q=async({cacheName:e,request:t,event:s,matchOptions:n,plugins:i=[]})=>{const r=await self.caches.open(e),a=await R({plugins:i,request:t,mode:"read"});let c=await r.match(a,n);for(const t of i)if("cachedResponseWillBeUsed"in t){const i=t.cachedResponseWillBeUsed;c=await i.call(t,{cacheName:e,event:s,matchOptions:n,cachedResponse:c,request:a})}return c},N=async({request:e,response:t,event:s,plugins:n=[]})=>{let i=t,r=!1;for(let t of n)if("cacheWillUpdate"in t){r=!0;const n=t.cacheWillUpdate;if(i=await n.call(t,{request:e,response:i,event:s}),!i)break}return r||(i=i&&200===i.status?i:void 0),i||null},R=async({request:e,mode:t,plugins:s=[]})=>{const n=b(s,"cacheKeyWillBeUsed");let i=e;for(const e of n)i=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:i}),"string"==typeof i&&(i=new Request(i));return i},x={put:async({cacheName:e,request:s,response:n,event:i,plugins:a=[],matchOptions:c})=>{const o=await R({plugins:a,request:s,mode:"write"});if(!n)throw new t("cache-put-with-no-response",{url:r(o.url)});let h=await N({event:i,plugins:a,response:n,request:o});if(!h)return;const u=await self.caches.open(e),l=b(a,"cacheDidUpdate");let f=l.length>0?await q({cacheName:e,matchOptions:c,request:o}):null;try{await u.put(o,h)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of w)await e()}(),e}for(let t of l)await t.cacheDidUpdate.call(t,{cacheName:e,event:i,oldResponse:f,newResponse:h,request:o})},match:q},L=async({request:e,fetchOptions:s,event:n,plugins:i=[]})=>{if("string"==typeof e&&(e=new Request(e)),n instanceof FetchEvent&&n.preloadResponse){const e=await n.preloadResponse;if(e)return e}const r=b(i,"fetchDidFail"),a=r.length>0?e.clone():null;try{for(let t of i)if("requestWillFetch"in t){const s=t.requestWillFetch,i=e.clone();e=await s.call(t,{request:i,event:n})}}catch(e){throw new t("plugin-error-request-will-fetch",{thrownError:e})}let c=e.clone();try{let t;t="navigate"===e.mode?await fetch(e):await fetch(e,s);for(const e of i)"fetchDidSucceed"in e&&(t=await e.fetchDidSucceed.call(e,{event:n,request:c,response:t}));return t}catch(e){for(const t of r)await t.fetchDidFail.call(t,{error:e,event:n,originalRequest:a.clone(),request:c.clone()});throw e}};try{self["workbox:strategies:5.0.0-rc.1"]&&_()}catch(e){}const E={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};let U;async function X(e,t){const s=e.clone(),n={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},i=t?t(n):n,r=function(){if(void 0===U){const e=new Response("");if("body"in e)try{new Response(e.body),U=!0}catch(e){U=!1}U=!1}return U}()?s.body:await s.blob();return new Response(r,i)}try{self["workbox:precaching:5.0.0-rc.1"]&&_()}catch(e){}function A(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:n}=e;if(!n)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const i=new URL(n,location.href),r=new URL(n,location.href);return i.searchParams.set("__WB_REVISION__",s),{cacheKey:i.href,url:r.href}}class j{constructor(e){this.m=l(e),this.X=new Map,this.A=new Map,this.j=new Map}addToCacheList(e){const s=[];for(const n of e){"string"==typeof n?s.push(n):n&&void 0===n.revision&&s.push(n.url);const{cacheKey:e,url:i}=A(n),r="string"!=typeof n&&n.revision?"reload":"default";if(this.X.has(i)&&this.X.get(i)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this.X.get(i),secondEntry:e});if("string"!=typeof n&&n.integrity){if(this.j.has(e)&&this.j.get(e)!==n.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:i});this.j.set(e,n.integrity)}if(this.X.set(i,e),this.A.set(i,r),s.length>0){const e="Workbox is precaching URLs without revision "+`info: ${s.join(", ")}\nThis is generally NOT safe. `+"Learn more at https://bit.ly/wb-precache";console.warn(e)}}}async install({event:e,plugins:t}={}){const s=[],n=[],i=await self.caches.open(this.m),r=await i.keys(),a=new Set(r.map(e=>e.url));for(const[e,t]of this.X)a.has(t)?n.push(e):s.push({cacheKey:t,url:e});const c=s.map(({cacheKey:s,url:n})=>{const i=this.j.get(s),r=this.A.get(n);return this.W({cacheKey:s,cacheMode:r,event:e,integrity:i,plugins:t,url:n})});return await Promise.all(c),{updatedURLs:s.map(e=>e.url),notUpdatedURLs:n}}async activate(){const e=await self.caches.open(this.m),t=await e.keys(),s=new Set(this.X.values()),n=[];for(const i of t)s.has(i.url)||(await e.delete(i),n.push(i.url));return{deletedURLs:n}}async W({cacheKey:e,url:s,cacheMode:n,event:i,plugins:r,integrity:a}){const c=new Request(s,{integrity:a,cache:n,credentials:"same-origin"});let o,h=await L({event:i,plugins:r,request:c});for(const e of r||[])"cacheWillUpdate"in e&&(o=e);if(!(o?await o.cacheWillUpdate({event:i,request:c,response:h}):h.status<400))throw new t("bad-precaching-response",{url:s,status:h.status});h.redirected&&(h=await X(h)),await x.put({event:i,plugins:r,response:h,request:e===s?c:new Request(e),cacheName:this.m,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this.X}getCachedURLs(){return[...this.X.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this.X.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.m)).match(s)}}createHandler(e=!0){return async({request:s})=>{try{const e=await this.matchPrecache(s);if(e)return e;throw new t("missing-precache-entry",{cacheName:this.m,url:s.url})}catch(t){if(e)return fetch(s);throw t}}}createHandlerBoundToURL(e,s=!0){if(!this.getCacheKeyForURL(e))throw new t("non-precached-url",{url:e});const n=this.createHandler(s),i=new Request(e);return()=>n({request:i})}}let W;const B=()=>(W||(W=new j),W);const F=(e,t)=>{const s=B().getURLsToCacheKeys();for(const n of function*(e,{ignoreURLParametersMatching:t,directoryIndex:s,cleanURLs:n,urlManipulation:i}={}){const r=new URL(e,location.href);r.hash="",yield r.href;const a=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some(e=>e.test(s))&&e.searchParams.delete(s);return e}(r,t);if(yield a.href,s&&a.pathname.endsWith("/")){const e=new URL(a.href);e.pathname+=s,yield e.href}if(n){const e=new URL(a.href);e.pathname+=".html",yield e.href}if(i){const e=i({url:r});for(const t of e)yield t.href}}(e,t)){const e=s.get(n);if(e)return e}};let G=!1;const T=e=>{G||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:n}={})=>{const i=l();self.addEventListener("fetch",r=>{const a=F(r.request.url,{cleanURLs:s,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:n});if(!a)return;let c=self.caches.open(i).then(e=>e.match(a)).then(e=>e||fetch(a));r.respondWith(c)})})(e),G=!0)},K=[],M={get:()=>K,add(e){K.push(...e)}},P=e=>{const t=B(),s=M.get();e.waitUntil(t.install({event:e,plugins:s}).catch(e=>{throw e}))},Y=e=>{const t=B();e.waitUntil(t.activate())};var O;self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),O={},(e=>{B().addToCacheList(e),e.length>0&&(self.addEventListener("install",P),self.addEventListener("activate",Y))})([{url:"_next/static/WXLG7XNtlhAiwN03BYEFp/pages/_app.js",revision:"95b045e86729346bc1830f2496b983a1"},{url:"_next/static/WXLG7XNtlhAiwN03BYEFp/pages/_error.js",revision:"5b999e94869c61b3aa7932262e9b6748"},{url:"_next/static/WXLG7XNtlhAiwN03BYEFp/pages/about.js",revision:"52186b05474f85df72372750505ba364"},{url:"_next/static/WXLG7XNtlhAiwN03BYEFp/pages/index.js",revision:"c70abf8db27000e60de084017794749e"},{url:"_next/static/WXLG7XNtlhAiwN03BYEFp/pages/learning.js",revision:"919b87a28aec7d8b4f4ba18034e4c9d6"},{url:"_next/static/WXLG7XNtlhAiwN03BYEFp/pages/learning/algorithms.js",revision:"1027a2063bf1f221146a7b69f4a09e53"},{url:"_next/static/WXLG7XNtlhAiwN03BYEFp/pages/learning/design.js",revision:"b77b96510bc25f12f69dff4d3dfbbb9c"},{url:"_next/static/WXLG7XNtlhAiwN03BYEFp/pages/learning/frontend.js",revision:"771213bc8f2f13d2657c5d518775f514"},{url:"_next/static/WXLG7XNtlhAiwN03BYEFp/pages/mission.js",revision:"5cb575643aa169abfbe0e23bc2d8a5be"},{url:"_next/static/WXLG7XNtlhAiwN03BYEFp/pages/platform.js",revision:"762d32a49c56bf6f3ad47430671111e3"},{url:"_next/static/WXLG7XNtlhAiwN03BYEFp/pages/resources.js",revision:"cc4bb254590292f330180e210ea9188f"},{url:"_next/static/WXLG7XNtlhAiwN03BYEFp/pages/resources/jobs.js",revision:"3a1f804a4321f29e669de6387fc5e8a2"},{url:"_next/static/WXLG7XNtlhAiwN03BYEFp/pages/survey.js",revision:"f37d7a736ae5856c3ce2a6c58b0c2c2a"},{url:"_next/static/WXLG7XNtlhAiwN03BYEFp/pages/tools.js",revision:"6b336e7d49ce46f5db98b24d3914c4f9"},{url:"_next/static/WXLG7XNtlhAiwN03BYEFp/pages/tools/cloud.js",revision:"226066af0e0c935d3284b1eade4c4503"},{url:"_next/static/WXLG7XNtlhAiwN03BYEFp/pages/tools/prototyping.js",revision:"dd8759a49c6cd92c0271c4245d705433"},{url:"_next/static/WXLG7XNtlhAiwN03BYEFp/pages/tools/workflow.js",revision:"f6e9920a5cec6c96a90c9c66edf369e6"},{url:"_next/static/chunks/commons.a5da7f9a3a2a14f7465c.js",revision:"9a30b8830a4193a89d9d25917eb50281"},{url:"_next/static/runtime/main-081946384d0b0848d0a5.js",revision:"d52452f80164c5372037b8f5cc99951f"},{url:"_next/static/runtime/polyfills-e8d67e0dc900152e0efc.js",revision:"5ad1fff4ee8aa39db6738d442dbfb23d"},{url:"_next/static/runtime/webpack-08f7b238829422e3b9b2.js",revision:"f5e6e2fca3144cc944812cfa3547f475"}]),T(O),((e,s,r)=>{let a;if("string"==typeof e){const t=new URL(e,location.href);a=new n(({url:e})=>e.href===t.href,s,r)}else if(e instanceof RegExp)a=new i(e,s,r);else if("function"==typeof e)a=new n(e,s,r);else{if(!(e instanceof n))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});a=e}o().registerRoute(a)})(/^https?.*/,new class{constructor(e={}){if(this.m=f(e.cacheName),e.plugins){let t=e.plugins.some(e=>!!e.cacheWillUpdate);this.B=t?e.plugins:[E,...e.plugins]}else this.B=[E];this.F=e.networkTimeoutSeconds||0,this.G=e.fetchOptions,this.T=e.matchOptions}async handle({event:e,request:s}){const n=[],i=[];let r;if(this.F){const{id:t,promise:a}=this.K({request:s,event:e,logs:n});r=t,i.push(a)}const a=this.M({timeoutId:r,request:s,event:e,logs:n});i.push(a);let c=await Promise.race(i);if(c||(c=await a),!c)throw new t("no-response",{url:s.url});return c}K({request:e,logs:t,event:s}){let n;return{promise:new Promise(t=>{n=setTimeout(async()=>{t(await this.P({request:e,event:s}))},1e3*this.F)}),id:n}}async M({timeoutId:e,request:t,logs:s,event:n}){let i,r;try{r=await L({request:t,event:n,fetchOptions:this.G,plugins:this.B})}catch(e){i=e}if(e&&clearTimeout(e),i||!r)r=await this.P({request:t,event:n});else{const e=r.clone(),s=x.put({cacheName:this.m,request:t,response:e,event:n,plugins:this.B});if(n)try{n.waitUntil(s)}catch(e){}}return r}P({event:e,request:t}){return x.match({cacheName:this.m,request:t,event:e,matchOptions:this.T,plugins:this.B})}}({cacheName:"offlineCache",plugins:[new class{constructor(e={}){var t;this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:s,cachedResponse:n})=>{if(!n)return null;let i=this.Y(n);const r=this.O(s);d(r.expireEntries());const a=r.updateTimestamp(t.url);if(e)try{e.waitUntil(a)}catch(e){}return i?n:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{const s=this.O(e);await s.updateTimestamp(t.url),await s.expireEntries()},this.D=e,this._=e.maxAgeSeconds,this.C=new Map,e.purgeOnQuotaError&&(t=()=>this.deleteCacheAndMetadata(),w.add(t))}O(e){if(e===f())throw new t("expire-custom-caches-only");let s=this.C.get(e);return s||(s=new v(e,this.D),this.C.set(e,s)),s}Y(e){if(!this._)return!0;const t=this.k(e);return null===t||t>=Date.now()-1e3*this._}k(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[e,t]of this.C)await self.caches.delete(e),await t.delete();this.C=new Map}}({maxEntries:200,purgeOnQuotaError:!0})]}),"GET");
//# sourceMappingURL=service-worker.js.map
