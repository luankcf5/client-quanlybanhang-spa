"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9087],{91574:function(n,t,e){e.r(t),e.d(t,{AuthContext:function(){return a}});let a=(0,e(2265).createContext)({})},84693:function(n,t,e){e.d(t,{a1:function(){return l},Ak:function(){return h},jx:function(){return A}});var a=e(57437),o=e(2265),r=e(74941),c=e(35998),i=e(25822),s=e(39255);function l(n){let{children:t}=n,{loading:e}=(0,s.E)();return(0,a.jsx)(a.Fragment,{children:e?(0,a.jsx)(i.c,{}):(0,a.jsx)(u,{children:t})})}function u(n){let{children:t}=n,e=(0,c.tv)(),{authenticated:i,method:l}=(0,s.E)(),[u,h]=(0,o.useState)(!1),d=(0,o.useCallback)(()=>{if(i)h(!0);else{let n=new URLSearchParams({returnTo:window.location.pathname}).toString(),t="".concat(r.H.auth.login,"?").concat(n);e.replace(t)}},[i,l,e]);return((0,o.useEffect)(()=>{d()},[]),u)?(0,a.jsx)(a.Fragment,{children:t}):null}function h(n){let{children:t}=n,{loading:e}=(0,s.E)();return(0,a.jsx)(a.Fragment,{children:e?(0,a.jsx)(i.c,{}):(0,a.jsx)(d,{children:t})})}function d(n){let{children:t}=n,e=(0,c.tv)(),i=(0,c.lr)().get("returnTo")||r.H.dashboard.staff.list,{authenticated:l}=(0,s.E)(),u=(0,o.useCallback)(()=>{l&&e.replace(i)},[l,i,e]);return(0,o.useEffect)(()=>{u()},[u]),(0,a.jsx)(a.Fragment,{children:t})}var p=e(21135),g=e(88938),m=e(85269),f=e(45243),x=e(7722);function A(n){let{hasContent:t,roles:e,children:o,sx:r}=n;return void 0===e||e.includes("teacher")?(0,a.jsxs)(a.Fragment,{children:[" ",o," "]}):t?(0,a.jsxs)(g.Z,{component:x.NM,sx:{textAlign:"center",mt:12,...r},children:[(0,a.jsx)(p.m.div,{variants:(0,x.Wp)().in,children:(0,a.jsx)(m.Z,{variant:"h3",sx:{mb:2},children:"Quyền truy cập bị từ chối !"})}),(0,a.jsx)(p.m.div,{variants:(0,x.Wp)().in,children:(0,a.jsx)(m.Z,{sx:{color:"text.secondary"},children:"Bạn kh\xf4ng c\xf3 quyền truy cập trang n\xe0y ! Vui l\xf2ng li\xean hệ quản trị vi\xean !"})}),(0,a.jsx)(p.m.div,{variants:(0,x.Wp)().in,children:(0,a.jsx)(f.E,{sx:{height:260,my:{xs:5,sm:10}}})})]}):null}},39255:function(n,t,e){e.d(t,{E:function(){return r}});var a=e(2265),o=e(91574);let r=()=>{let n=(0,a.useContext)(o.AuthContext);if(!n)throw Error("useAuthContext context must be use inside AuthProvider");return n}},45174:function(n,t,e){e.d(t,{Z:function(){return l}});var a=e(57437),o=e(2265),r=e(58553),c=e(79245),i=e(41101),s=e(89975),l=(0,o.forwardRef)((n,t)=>{let{ratio:e,overlay:o,disabledEffect:l=!1,alt:u,src:h,afterLoad:d,delayTime:p,threshold:g,beforeLoad:m,delayMethod:f,placeholder:x,wrapperProps:A,scrollPosition:D,effect:y="blur",visibleByDefault:v,wrapperClassName:b,useIntersectionObserver:j,sx:R,...S}=n,H=(0,i.Z)(),B=!!o&&{"&:before":{content:"''",top:0,left:0,width:1,height:1,zIndex:1,position:"absolute",background:o||(0,s.Fq)(H.palette.grey[900],.48)}},O=(0,a.jsx)(c.Z,{component:r.LazyLoadImage,alt:u,src:h,afterLoad:d,delayTime:p,threshold:g,beforeLoad:m,delayMethod:f,placeholder:x,wrapperProps:A,scrollPosition:D,visibleByDefault:v,effect:l?void 0:y,useIntersectionObserver:j,wrapperClassName:b||"component-image-wrapper",placeholderSrc:l?"/assets/transparent.png":"/assets/placeholder.svg",sx:{width:1,height:1,objectFit:"cover",verticalAlign:"bottom",...!!e&&{top:0,left:0,position:"absolute"}}});return(0,a.jsx)(c.Z,{ref:t,component:"span",className:"component-image",sx:{overflow:"hidden",position:"relative",verticalAlign:"bottom",display:"inline-block",...!!e&&{width:1},"& span.component-image-wrapper":{width:1,height:1,verticalAlign:"bottom",backgroundSize:"cover !important",...!!e&&{pt:function(){let n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"1/1";return({"4/3":"calc(100% / 4 * 3)","3/4":"calc(100% / 3 * 4)","6/4":"calc(100% / 6 * 4)","4/6":"calc(100% / 4 * 6)","16/9":"calc(100% / 16 * 9)","9/16":"calc(100% / 9 * 16)","21/9":"calc(100% / 21 * 9)","9/21":"calc(100% / 9 * 21)","1/1":"100%"})[n]}(e)}},...B,...R},...S,children:O})})},25822:function(n,t,e){e.d(t,{a:function(){return h},c:function(){return l}});var a=e(57437),o=e(21135),r=e(2265),c=e(89975),i=e(79245),s=e(32305);function l(n){let{sx:t,...e}=n,[l,u]=(0,r.useState)(!1);return((0,r.useEffect)(()=>{u(!0)},[]),l)?(0,a.jsx)(i.Z,{sx:{right:0,width:1,bottom:0,height:1,zIndex:9998,display:"flex",position:"absolute",alignItems:"center",justifyContent:"center",bgcolor:"background.default",...t},...e,children:(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(o.m.div,{animate:{scale:[1,.9,.9,1,1],opacity:[1,.48,.48,1,1]},transition:{duration:2,ease:"easeInOut",repeatDelay:1,repeat:1/0},children:(0,a.jsx)(s.Z,{disabledLink:!0,sx:{width:64,height:64}})}),(0,a.jsx)(i.Z,{component:o.m.div,animate:{scale:[1.6,1,1,1.6,1.6],rotate:[270,0,0,270,270],opacity:[.25,1,1,1,.25],borderRadius:["25%","25%","50%","50%","25%"]},transition:{ease:"linear",duration:3.2,repeat:1/0},sx:{width:100,height:100,position:"absolute",border:n=>"solid 3px ".concat((0,c.Fq)(n.palette.primary.dark,.24))}}),(0,a.jsx)(i.Z,{component:o.m.div,animate:{scale:[1,1.2,1.2,1,1],rotate:[0,270,270,0,0],opacity:[1,.25,.25,.25,1],borderRadius:["25%","25%","50%","50%","25%"]},transition:{ease:"linear",duration:3.2,repeat:1/0},sx:{width:120,height:120,position:"absolute",border:n=>"solid 8px ".concat((0,c.Fq)(n.palette.primary.dark,.24))}})]})}):null}var u=e(54755);function h(n){let{sx:t,...e}=n;return(0,a.jsx)(i.Z,{sx:{width:1,flexGrow:1,minHeight:1,display:"flex",alignItems:"center",justifyContent:"center",...t},...e,children:(0,a.jsx)(u.Z,{color:"primary",sx:{width:1,maxWidth:"100%"}})})}},32305:function(n,t,e){e.d(t,{Z:function(){return s}});var a=e(57437),o=e(2265),r=e(25210),c=e(79245),i=e(64720),s=(0,o.forwardRef)((n,t)=>{let{disabledLink:e=!1,sx:o,...s}=n,l=(0,a.jsx)(c.Z,{component:"img",src:"/logo/iit_logo.png",sx:{width:40,height:40,cursor:"pointer",...o}});return e?l:(0,a.jsx)(r.Z,{component:i.r,href:"/",sx:{display:"contents"},children:l})})},63854:function(n,t,e){e.d(t,{F:function(){return r},z:function(){return c}});var a=e(22135),o=e(41101);function r(n,t,e){let r=(0,o.Z)(),c=(0,a.Z)(r.breakpoints.up(t)),i=(0,a.Z)(r.breakpoints.down(t)),s=(0,a.Z)(r.breakpoints.between(t,e)),l=(0,a.Z)(r.breakpoints.only(t));return"up"===n?c:"down"===n?i:"between"===n?s:l}function c(){let n=(0,o.Z)();return[...n.breakpoints.keys].reverse().reduce((t,e)=>{let o=(0,a.Z)(n.breakpoints.up(e));return!t&&o?e:t},null)||"xs"}},76944:function(n,t,e){e.d(t,{Z:function(){return m}});var a=e(57437),o=e(79245),r=e(25210),c=e(13457),i=e(18687),s=e(85269),l=e(41101),u=e(89975),h=e(63854),d=e(69112),p=e(32305),g=e(45174);function m(n){let{children:t}=n,e=(0,l.Z)(),m=(0,h.F)("up","md");return(0,a.jsxs)(c.Z,{flexGrow:1,spacing:10,alignItems:"center",justifyContent:"center",sx:{height:"100vh",position:"relative",...(0,d.v3)({color:(0,u.Fq)(e.palette.background.default,"light"===e.palette.mode?.88:.94),imgUrl:"/assets/background/overlay_4.jpg"})},children:[(0,a.jsx)(p.Z,{sx:{zIndex:9,position:"absolute",top:16,left:16}}),(0,a.jsx)(i.Z,{elevation:3,sx:{width:1,mx:"auto",maxWidth:{xs:"auto",md:920},minWidth:{xs:"auto",md:920},p:{xs:4,md:8}},children:(0,a.jsxs)(o.Z,{display:"grid",gridTemplateColumns:{xs:"repeat(1, 1fr)",md:"repeat(2, 1fr)"},gap:5,children:[m&&(0,a.jsx)(g.Z,{src:"/assets/images/sale_hero.png"}),t]})}),(0,a.jsxs)(s.Z,{variant:"subtitle2",component:"div",sx:{position:"absolute",bottom:16,right:16},children:["\xa9 2024 Bản quyền thuộc về",(0,a.jsxs)(r.Z,{href:"https://iit.vn",target:"_blank",children:[" ","c\xf4ng ty cổ phần IIT"," "]})]})]})}},64720:function(n,t,e){e.d(t,{r:function(){return i}});var a=e(57437),o=e(2265),r=e(61396),c=e.n(r),i=(0,o.forwardRef)((n,t)=>{let{...e}=n;return(0,a.jsx)(c(),{ref:t,...e})})},35998:function(n,t,e){e.d(t,{jD:function(){return a.usePathname},tv:function(){return a.useRouter},lr:function(){return a.useSearchParams}});var a=e(24033);e(67100)},67100:function(n,t,e){e.d(t,{X:function(){return o}});var a=e(24033);function o(n){let t=!(arguments.length>1)||void 0===arguments[1]||arguments[1],e=(0,a.usePathname)(),o=n.startsWith("#"),r="/"===n?"/":"".concat(n,"/"),c=!o&&e===r,i=!o&&e.includes(r);return t?i:c}},74941:function(n,t,e){e.d(t,{H:function(){return o}});let a={DASHBOARD:"/quan-ly"},o={page403:"/error/403",page404:"/error/404",page500:"/error/500",auth:{login:"/dang-nhap",register:"/dang-ky"},dashboard:{root:"".concat(a.DASHBOARD),sale:{root:"".concat(a.DASHBOARD,"/ban-hang")},account:{root:"".concat(a.DASHBOARD,"/quan-ly-tai-khoan"),list:"".concat(a.DASHBOARD,"/quan-ly-tai-khoan/danh-sach-tai-khoan")},staff:{root:"".concat(a.DASHBOARD,"/quan-ly-nhan-vien"),list:"".concat(a.DASHBOARD,"/quan-ly-nhan-vien/danh-sach-nhan-vien")},logsystem:{root:"".concat(a.DASHBOARD,"/nhat-ky-he-thong"),login:"".concat(a.DASHBOARD,"/nhat-ky-he-thong/nhat-ky-truy-cap"),search:"".concat(a.DASHBOARD,"/nhat-ky-he-thong/tra-cuu-tai-khoan")},permission:{root:"".concat(a.DASHBOARD,"/quan-ly-chuc-nang"),group:"".concat(a.DASHBOARD,"/quan-ly-chuc-nang/cac-nhom-chuc-nang"),list:"".concat(a.DASHBOARD,"/quan-ly-chuc-nang/danh-sach-chuc-nang")},role:{root:"".concat(a.DASHBOARD,"/quan-ly-quyen-han"),list:"".concat(a.DASHBOARD,"/quan-ly-quyen-han/danh-sach-quyen-han"),grant:"".concat(a.DASHBOARD,"/quan-ly-quyen-han/cap-quyen-nguoi-dung")},table:{root:"".concat(a.DASHBOARD,"/quan-ly-phong-ban"),list:"".concat(a.DASHBOARD,"/quan-ly-phong-ban/danh-sach-phong-ban")},product:{root:"".concat(a.DASHBOARD,"/quan-ly-san-pham"),category:"".concat(a.DASHBOARD,"/quan-ly-san-pham/danh-muc-san-pham"),list:"".concat(a.DASHBOARD,"/quan-ly-san-pham/danh-sach-san-pham")},voucher:{root:"".concat(a.DASHBOARD,"/quan-ly-giam-gia"),list:"".concat(a.DASHBOARD,"/quan-ly-giam-gia/danh-sach-giam-gia")},customer:{root:"".concat(a.DASHBOARD,"/quan-ly-khach-hang"),list:"".concat(a.DASHBOARD,"/quan-ly-khach-hang/danh-sach-khach-hang")},order:{root:"".concat(a.DASHBOARD,"/quan-ly-don-hang"),list:"".concat(a.DASHBOARD,"/quan-ly-don-hang/danh-sach-don-hang"),cancel:"".concat(a.DASHBOARD,"/quan-ly-don-hang/danh-sach-da-huy")},exam:{root:"".concat(a.DASHBOARD,"/online-exam"),start:"".concat(a.DASHBOARD,"/online-exam/start"),list:"".concat(a.DASHBOARD,"/online-exam/list"),questions:"".concat(a.DASHBOARD,"/online-exam/questions")},transcript:{root:"".concat(a.DASHBOARD,"/transcript"),total:"".concat(a.DASHBOARD,"/transcript/total")},class:"".concat(a.DASHBOARD,"/class"),student:"".concat(a.DASHBOARD,"/student")}}}}]);