(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5086,5017,6237,5332,5479],{6702:function(e,t,n){Promise.resolve().then(n.bind(n,94073))},73318:function(e,t,n){"use strict";n.d(t,{Py:function(){return c},k4:function(){return s},yr:function(){return h}});var r=n(42333),a=n(2265),i=n(92580);let o=i.Hv.category.root,l={revalidateIfStale:!0,revalidateOnFocus:!0,revalidateOnReconnect:!0};function c(){let{data:e,isLoading:t,error:n,isValidating:c}=(0,r.ZP)(o,i._i,l);return(0,a.useMemo)(()=>({categories:e||[],categoriesLoading:t,categoriesError:n,categoriesValidating:c,categoriesEmpty:!t&&!(null==e?void 0:e.length)}),[null==e?void 0:e.categories,n,t,c])}async function s(e){let{data:t}=await i.ZP.post(o,e);return t}async function h(e,t){let{data:n}=await i.ZP.patch("".concat(o,"/").concat(e),t);return n}},41818:function(e,t,n){"use strict";n.d(t,{iu:function(){return c},nM:function(){return h},ry:function(){return s}});var r=n(42333),a=n(2265),i=n(92580);let o=i.Hv.product.root,l={revalidateIfStale:!0,revalidateOnFocus:!0,revalidateOnReconnect:!0};function c(){let{data:e,isLoading:t,error:n,isValidating:c}=(0,r.ZP)(o,i._i,l);return(0,a.useMemo)(()=>({products:e||[],productsLoading:t,productsError:n,productsValidating:c,productsEmpty:!t&&!(null==e?void 0:e.length)}),[null==e?void 0:e.products,n,t,c])}async function s(e){let{data:t}=await i.ZP.post(o,e);return t}async function h(e,t){let{data:n}=await i.ZP.patch("".concat(o,"/").concat(e),t);return n}},64060:function(e,t,n){"use strict";n.d(t,{Z:function(){return h},S:function(){return m}});var r=n(57437),a=n(60443),i=n(59500),o=n(35843),l=n(89975),c=n(69112);let s=(0,o.ZP)("span")(e=>{let{arrow:t,theme:n}=e,r={top:-6.5,transform:"rotate(135deg)"},a={bottom:-6.5,transform:"rotate(-45deg)"},i={left:-6.5,transform:"rotate(45deg)"},o={right:-6.5,transform:"rotate(-135deg)"};return{width:14,height:14,position:"absolute",borderBottomLeftRadius:3.5,clipPath:"polygon(0% 0%, 100% 100%, 0% 100%)",border:"solid 1px ".concat((0,l.Fq)("light"===n.palette.mode?n.palette.grey[500]:n.palette.common.black,.12)),...(0,c.Ls)({color:n.palette.background.paper}),..."top-left"===t&&{...r,left:20},..."top-center"===t&&{...r,left:0,right:0,margin:"auto"},..."top-right"===t&&{...r,right:20},..."bottom-left"===t&&{...a,left:20},..."bottom-center"===t&&{...a,left:0,right:0,margin:"auto"},..."bottom-right"===t&&{...a,right:20},..."left-top"===t&&{...i,top:20},..."left-center"===t&&{...i,top:0,bottom:0,margin:"auto"},..."left-bottom"===t&&{...i,bottom:20},..."right-top"===t&&{...o,top:20},..."right-center"===t&&{...o,top:0,bottom:0,margin:"auto"},..."right-bottom"===t&&{...o,bottom:20}}});function h(e){let{open:t,children:n,arrow:o="top-right",hiddenArrow:l,sx:c,...h}=e,{style:d,anchorOrigin:m,transformOrigin:u}=function(e){let t;switch(e){case"top-left":t={style:{ml:-.75},anchorOrigin:{vertical:"bottom",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"left"}};break;case"top-center":t={style:{},anchorOrigin:{vertical:"bottom",horizontal:"center"},transformOrigin:{vertical:"top",horizontal:"center"}};break;case"top-right":default:t={style:{ml:.75},anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"}};break;case"bottom-left":t={style:{ml:-.75},anchorOrigin:{vertical:"top",horizontal:"left"},transformOrigin:{vertical:"bottom",horizontal:"left"}};break;case"bottom-center":t={style:{},anchorOrigin:{vertical:"top",horizontal:"center"},transformOrigin:{vertical:"bottom",horizontal:"center"}};break;case"bottom-right":t={style:{ml:.75},anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"bottom",horizontal:"right"}};break;case"left-top":t={style:{mt:-.75},anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"}};break;case"left-center":t={anchorOrigin:{vertical:"center",horizontal:"right"},transformOrigin:{vertical:"center",horizontal:"left"}};break;case"left-bottom":t={style:{mt:.75},anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"bottom",horizontal:"left"}};break;case"right-top":t={style:{mt:-.75},anchorOrigin:{vertical:"top",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"right"}};break;case"right-center":t={anchorOrigin:{vertical:"center",horizontal:"left"},transformOrigin:{vertical:"center",horizontal:"right"}};break;case"right-bottom":t={style:{mt:.75},anchorOrigin:{vertical:"bottom",horizontal:"left"},transformOrigin:{vertical:"bottom",horizontal:"right"}}}return t}(o);return(0,r.jsxs)(i.ZP,{open:!!t,anchorEl:t,anchorOrigin:m,transformOrigin:u,slotProps:{paper:{sx:{width:"auto",overflow:"inherit",...d,["& .".concat(a.Z.root)]:{"& svg":{mr:2,flexShrink:0}},...c}}},...h,children:[!l&&(0,r.jsx)(s,{arrow:o}),n]})}var d=n(2265);function m(){let[e,t]=(0,d.useState)(null);return{open:e,onOpen:(0,d.useCallback)(e=>{t(e.currentTarget)},[]),onClose:(0,d.useCallback)(()=>{t(null)},[]),setOpen:t}}},94073:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return M}});var r=n(57437),a=n(2265),i=n(99149),o=n(84693),l=n(41818),c=n(20501),s=n(35691),h=n(61865),d=n(89701),m=n(55303),u=n(19045),p=n(13457),g=n(76623),f=n(22079),b=n(64494),v=n(55594),x=n(85269),j=n(137),y=n(91797),Z=n(42834),k=n(26337),C=n(81679),O=n(27707),_=n(73318),w=n(8653),z=n(64060),N=n(27558);function P(){let{table_selected_row:e,table_open_form:t,setValue:n,onForm:i,onCreateNewRow:o,onUpdateRow:P}=(0,c.S)(),{categories:S}=(0,_.Py)(),q=!!e,{enqueueSnackbar:A}=(0,w.Ds)(),[M,E]=(0,a.useState)("info"),T=(0,a.useCallback)((e,t)=>{E(t)},[]),V=s.Ry().shape({name:s.Z_().required("Bạn chưa nhập t\xean cho sản phẩm !"),code:s.Z_().required("Bạn chưa nhập m\xe3 cho sản phẩm !"),category:s.Z_().required("Bạn chưa chọn danh mục cho sản phẩm !"),price:s.Z_().required("Bạn chưa nhập gi\xe1 cho sản phẩm !"),discount:s.Z_().required("Bạn chưa nhập giảm gi\xe1 cho sản phẩm !"),amount:s.Z_().required("Bạn chưa nhập tồn kho cho sản phẩm !"),description:s.Z_(),image:s.nK().nullable()}),W=(0,a.useMemo)(()=>({name:(null==e?void 0:e.name)||"",code:(null==e?void 0:e.code)||"",category:(null==e?void 0:e.category.id)||"",price:(null==e?void 0:e.price)||0,discount:(null==e?void 0:e.discount)||0,amount:(null==e?void 0:e.amount)||0,description:(null==e?void 0:e.description)||"",image:(null==e?void 0:e.image)||null}),[e]),F=(0,h.cI)({resolver:(0,d.X)(V),defaultValues:W}),{reset:I,watch:Y,handleSubmit:B,setValue:H,formState:{isSubmitting:L}}=F,R=Y();(0,a.useEffect)(()=>{I(W)},[I,e,W]);let D=B(async t=>{try{if(q){let n=await (0,l.nM)(e.id,{...t,categoryId:Number(t.category)});P(n),A("Đ\xe3 cập nhật dữ liệu sản phẩm !")}else{let e=await (0,l.ry)({...t,categoryId:Number(t.category)});o(e),A("Đ\xe3 th\xeam dữ liệu sản phẩm mới !")}I(),G()}catch(e){console.log(e),A(e.message||e.message[0],{variant:"error"})}}),G=(0,a.useCallback)(()=>{n("table_selected_row",null),i(!1),I()},[i,n,I]),Q=(0,a.useCallback)(e=>{let t=e[0],n=Object.assign(t,{preview:URL.createObjectURL(t)});n&&H("image",n,{shouldValidate:!0})},[H]),U=(0,z.S)(),K=(0,z.S)(),X=(0,O.k)(),[J,$]=(0,a.useState)(""),[ee,et]=(0,a.useState)([]);(0,a.useEffect)(()=>{et(S)},[S]);let en=(0,a.useCallback)(async()=>{X.onTrue();try{let e=await (0,_.k4)({name:J,tags:[]});K.onClose();let t=[...ee,e];H("category",e.id),et(t),$(""),X.onFalse(),A("Đ\xe3 th\xeam dữ liệu danh mục mới !")}catch(e){X.onFalse(),A(e.message[0]||e.message||"Đ\xe3 c\xf3 lỗi xảy ra !  Vui l\xf2ng thử lại !",{variant:"error"})}},[J,K,ee,$,et,A]);return(0,r.jsx)(f.Z,{fullWidth:!0,maxWidth:"md",open:t,onClose:G,children:(0,r.jsxs)(N.ZP,{methods:F,onSubmit:D,children:[(0,r.jsx)(y.Z,{children:q?"Cập nhật dữ liệu sản phẩm":"Th\xeam dữ liệu sản phẩm mới"}),(0,r.jsx)(k.Z,{children:(0,r.jsxs)(p.Z,{spacing:2,children:[(0,r.jsxs)(u.Z,{value:M,onChange:T,children:[(0,r.jsx)(m.Z,{label:"Th\xf4ng tin sản phẩm",value:"info"}),(0,r.jsx)(m.Z,{label:"M\xf4 tả sản phẩm",value:"description"}),(0,r.jsx)(m.Z,{label:"H\xecnh ảnh sản phẩm",value:"image"})]}),"info"===M&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(p.Z,{direction:"row",spacing:1,children:[(0,r.jsx)(N.jY,{label:"T\xean sản phẩm :",required:!0,children:(0,r.jsx)(N.au,{name:"name",label:"Nhập t\xean sản phẩm",placeholder:"Quần \xe1o H&M..."})}),(0,r.jsx)(N.jY,{label:"M\xe3 sản phẩm :",required:!0,children:(0,r.jsx)(N.au,{name:"code",label:"Nhập m\xe3 sản phẩm",placeholder:"QA40434..."})})]}),(0,r.jsxs)(p.Z,{direction:"row",spacing:1,children:[(0,r.jsx)(N.jY,{label:"Danh mục sản phẩm :",required:!0,button:(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(g.Z,{size:"small",color:"primary",onClick:K.onOpen,children:"Th\xeam danh mục"}),(0,r.jsx)(z.Z,{open:K.open,onClose:K.onClose,sx:{padding:1,width:320},children:(0,r.jsxs)(p.Z,{spacing:1,children:[(0,r.jsx)(v.Z,{fullWidth:!0,size:"small",placeholder:"Nhập t\xean danh mục",value:J,onChange:e=>$(e.target.value)}),(0,r.jsx)(j.Z,{loading:X.value,variant:"contained",color:"primary",onClick:en,children:"Th\xeam mới"})]})})]}),children:(0,r.jsx)(N.Cc,{name:"category",label:"Chọn danh mục sản phẩm",children:ee.map(e=>(0,r.jsx)(b.Z,{value:e.id,children:e.name},e.id))})}),(0,r.jsx)(N.jY,{label:"Số lượng tồn kho :",required:!0,children:(0,r.jsx)(N.au,{name:"amount",type:"number",label:"Nhập số lượng tồn kho",placeholder:"13...",onChange:e=>H("amount",e.target.value,{shouldValidate:!0})})})]}),(0,r.jsxs)(p.Z,{direction:"row",spacing:1,children:[(0,r.jsx)(N.jY,{label:"Gi\xe1 gốc sản phẩm :",required:!0,children:(0,r.jsx)(N.au,{name:"price",type:"number",label:"Nhập gi\xe1 gốc sản phẩm",placeholder:"100000...",onChange:e=>H("price",e.target.value,{shouldValidate:!0}),InputProps:{endAdornment:(0,r.jsx)(C.Z,{position:"start",children:(0,r.jsx)(x.Z,{variant:"subtitle2",children:"VNĐ"})})}})}),(0,r.jsx)(N.jY,{label:"Gi\xe1 khuyến m\xe3i sản phẩm :",required:!0,button:(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(g.Z,{size:"small",color:"primary",onClick:U.onOpen,children:"Nhập phần trăm"}),(0,r.jsx)(z.Z,{open:U.open,onClose:U.onClose,sx:{padding:1},children:(0,r.jsx)(v.Z,{size:"small",type:"number",placeholder:"Nhập % khuyến m\xe3i",onChange:e=>H("discount",+R.price*(+e.target.value/100)),InputProps:{endAdornment:(0,r.jsx)(C.Z,{position:"start",children:(0,r.jsx)(x.Z,{variant:"subtitle2",children:"%"})})}})})]}),children:(0,r.jsx)(N.au,{name:"discount",type:"number",label:"Nhập gi\xe1 khuyến m\xe3i sản phẩm",placeholder:"50000...",onChange:e=>H("discount",Number(e.target.value),{shouldValidate:!0}),InputProps:{endAdornment:(0,r.jsx)(C.Z,{position:"start",children:(0,r.jsx)(x.Z,{variant:"subtitle2",children:"VNĐ"})})}})})]})]}),"description"===M&&(0,r.jsx)(N.jY,{label:"M\xf4 tả sản phẩm :",required:!0,children:(0,r.jsx)(N.au,{multiline:!0,rows:2,name:"description",label:"Nhập m\xf4 tả sản phẩm...",placeholder:"Đ\xe2y l\xe0 sản phẩm cho c\xe1c mặt h\xe0ng đồ gia dụng..."})}),"image"===M&&(0,r.jsx)(N.jY,{label:"H\xecnh ảnh sản phẩm :",required:!0,children:(0,r.jsx)(N.rd,{name:"image",maxSize:3145728,onDrop:Q,onDelete:()=>H("image",null,{shouldValidate:!0})})})]})}),(0,r.jsxs)(Z.Z,{children:[(0,r.jsx)(g.Z,{variant:"outlined",onClick:G,children:"Huỷ bỏ"}),(0,r.jsx)(j.Z,{type:"submit",color:"primary",variant:"contained",loading:L,children:q?"Cập nhật dữ liệu":"Th\xeam dữ liệu mới"})]})]})})}var S=n(65128),q=n(41689);let A=[{field:"id",headerName:"Id",filterable:!1},{field:"name",headerName:"T\xean sản phẩm",flex:1,minWidth:220,hideable:!1,renderCell:e=>e.row.name},{field:"code",headerName:"M\xe3 sản phẩm",flex:1,minWidth:220,renderCell:e=>e.row.code},{field:"price",headerName:"Gi\xe1 gốc sản phẩm",flex:1,minWidth:220,headerAlign:"center",align:"center",renderCell:e=>(0,S.e_)(e.row.price)},{field:"discount",headerName:"Gi\xe1 khuyến m\xe3i sản phẩm",flex:1,minWidth:220,headerAlign:"center",align:"center",renderCell:e=>(0,S.e_)(e.row.discount)},{field:"amount",headerName:"Số lượng tồn kho",flex:1,minWidth:220,headerAlign:"center",align:"center",renderCell:e=>e.row.amount},{field:"description",headerName:"M\xf4 tả sản phẩm",flex:1,minWidth:220,renderCell:e=>e.row.description},{type:"date",field:"createdAt",headerName:"Thời gian tạo",headerAlign:"center",align:"center",filterable:!1,flex:1,minWidth:200,valueFormatter:e=>(0,q.Mu)(e.value.createdAt),renderCell:e=>(0,q.zM)(e.row.createdAt)},{type:"date",field:"updatedAt",headerName:"Cập nhật gần nhất",headerAlign:"center",align:"center",filterable:!1,flex:1,minWidth:200,valueFormatter:e=>(0,q.Mu)(e.value.updatedAt),renderCell:e=>(0,q.zM)(e.row.updatedAt)}];function M(){let{products:e}=(0,l.iu)(),{setValues:t}=(0,c.S)();return(0,a.useEffect)(()=>{t({table_data:e,table_column:A,table_selected:[],table_export_data:e.map(e=>({id:e.id,"T\xean sản phẩm":e.name})),table_config:{table_name:"products",add_data:!0,add_multi_data:!1,export_data:!0,selected_data:!0,delete_multi:!0,change_status_multi:!1,active_row:!1,edit_row:!0,delete_row:!0}})},[e]),(0,r.jsxs)(o.jx,{hasContent:!0,roles:["teacher"],children:[(0,r.jsx)(i.Z,{}),(0,r.jsx)(P,{})]})}}},function(e){e.O(0,[1425,2771,1396,4549,7212,6672,1923,7133,38,8324,1597,7709,7868,2290,5243,9321,3864,7041,3840,2971,4938,1744],function(){return e(e.s=6702)}),_N_E=e.O()}]);