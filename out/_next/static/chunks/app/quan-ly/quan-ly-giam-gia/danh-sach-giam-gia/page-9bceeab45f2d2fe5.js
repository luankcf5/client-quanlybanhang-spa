(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1695,5017,5332,6237,5479],{62564:function(e,t,n){Promise.resolve().then(n.bind(n,27856))},63477:function(e,t,n){"use strict";n.d(t,{$:function(){return u},Mz:function(){return d},wX:function(){return o}});var i=n(42333),r=n(2265),l=n(92580);let a=l.Hv.voucher.root,c={revalidateIfStale:!0,revalidateOnFocus:!0,revalidateOnReconnect:!0};function d(){let{data:e,isLoading:t,error:n,isValidating:d}=(0,i.ZP)(a,l._i,c);return(0,r.useMemo)(()=>({vouchers:e||[],vouchersLoading:t,vouchersError:n,vouchersValidating:d,vouchersEmpty:!t&&!(null==e?void 0:e.length)}),[null==e?void 0:e.vouchers,n,t,d])}async function u(e){let{data:t}=await l.ZP.post(a,e);return t}async function o(e,t){let{data:n}=await l.ZP.patch("".concat(a,"/").concat(e),t);return n}},27856:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return M}});var i=n(57437),r=n(2265),l=n(99149),a=n(84693),c=n(63477),d=n(20501),u=n(35691),o=n(61865),s=n(89701),h=n(55303),m=n(19045),p=n(13457),g=n(76623),f=n(22079),v=n(85269),b=n(137),x=n(91797),_=n(42834),j=n(26337),Z=n(81679),w=n(8653),C=n(27558);function N(){let{table_selected_row:e,table_open_form:t,setValue:n,onForm:l,onCreateNewRow:a,onUpdateRow:N}=(0,d.S)(),y=!!e,{enqueueSnackbar:A}=(0,w.Ds)(),E=u.Ry().shape({name:u.Z_().required("Bạn chưa nhập t\xean cho m\xe3 giảm gi\xe1 !")}),M=(0,r.useMemo)(()=>({name:(null==e?void 0:e.name)||"",percent:(null==e?void 0:e.percent)||"",price:(null==e?void 0:e.price)||""}),[e]),k=(0,o.cI)({resolver:(0,s.X)(E),defaultValues:M}),{reset:P,setValue:V,handleSubmit:S,formState:{isSubmitting:T}}=k;(0,r.useEffect)(()=>{P(M)},[P,e,M]);let W=S(async t=>{try{if(y){let n=await (0,c.wX)(e.id,{...t});N(n),A("Đ\xe3 cập nhật dữ liệu m\xe3 giảm gi\xe1 !")}else{let e=await (0,c.$)({...t});console.log(t,e),a(e),A("Đ\xe3 th\xeam dữ liệu m\xe3 giảm gi\xe1 mới !")}P(),I()}catch(e){console.log(e),A(e.message[0]||e.message||"Đ\xe3 c\xf3 lỗi xảy ra !  Vui l\xf2ng thử lại !",{variant:"error"})}}),I=(0,r.useCallback)(()=>{n("table_selected_row",null),l(!1),P()},[l,n,P]),[O,q]=(0,r.useState)("price"),z=(0,r.useCallback)((e,t)=>{V("price",""),V("percent",""),q(t)},[V]);return(0,i.jsx)(f.Z,{fullWidth:!0,maxWidth:"sm",open:t,onClose:I,children:(0,i.jsxs)(C.ZP,{methods:k,onSubmit:W,children:[(0,i.jsx)(x.Z,{children:y?"Cập nhật dữ liệu m\xe3 giảm gi\xe1":"Th\xeam dữ liệu m\xe3 giảm gi\xe1 mới"}),(0,i.jsx)(j.Z,{children:(0,i.jsxs)(p.Z,{spacing:2,children:[(0,i.jsx)(C.jY,{label:"T\xean m\xe3 giảm gi\xe1 :",required:!0,children:(0,i.jsx)(C.au,{name:"name",label:"Nhập t\xean m\xe3 giảm gi\xe1",placeholder:"VOUCHER01..."})}),(0,i.jsxs)(m.Z,{value:O,onChange:z,children:[(0,i.jsx)(h.Z,{label:"Giảm gi\xe1 trực tiếp",value:"price"}),(0,i.jsx)(h.Z,{label:"Giảm gi\xe1 theo phần trăm",value:"percent"})]}),"price"===O&&(0,i.jsx)(C.jY,{label:"Nhập gi\xe1 giảm :",required:!0,children:(0,i.jsx)(C.au,{name:"price",type:"number",label:"Nhập gi\xe1 giảm",placeholder:"100000...",onChange:e=>{V("price",Number(e.target.value),{shouldValidate:!0}),V("percent",null)},InputProps:{endAdornment:(0,i.jsx)(Z.Z,{position:"start",children:(0,i.jsx)(v.Z,{variant:"subtitle2",children:"VNĐ"})})}})}),"percent"===O&&(0,i.jsx)(C.jY,{label:"Nhập phần trăm giảm :",required:!0,children:(0,i.jsx)(C.au,{name:"percent",type:"number",label:"Nhập phần trăm giảm",placeholder:"100000...",onChange:e=>{V("percent",Number(e.target.value),{shouldValidate:!0}),V("price",null)},InputProps:{endAdornment:(0,i.jsx)(Z.Z,{position:"start",children:(0,i.jsx)(v.Z,{variant:"subtitle2",children:"%"})})}})})]})}),(0,i.jsxs)(_.Z,{children:[(0,i.jsx)(g.Z,{variant:"outlined",onClick:I,children:"Huỷ bỏ"}),(0,i.jsx)(b.Z,{type:"submit",color:"primary",variant:"contained",loading:T,children:y?"Cập nhật dữ liệu":"Th\xeam dữ liệu mới"})]})]})})}var y=n(65128),A=n(41689);let E=[{field:"id",headerName:"Id",filterable:!1},{field:"name",headerName:"T\xean m\xe3 giảm gi\xe1",flex:1,minWidth:270,hideable:!1,renderCell:e=>e.row.name},{field:"price",headerName:"Gi\xe1 trị giảm gi\xe1",flex:1,minWidth:270,renderCell:e=>e.row.price?(0,y.e_)(e.row.price):"".concat(e.row.percent,"%")},{type:"date",field:"createdAt",headerName:"Thời gian tạo",headerAlign:"center",align:"center",filterable:!1,flex:1,minWidth:200,valueFormatter:e=>(0,A.Mu)(e.value.createdAt),renderCell:e=>(0,A.zM)(e.row.createdAt)},{type:"date",field:"updatedAt",headerName:"Cập nhật gần nhất",headerAlign:"center",align:"center",filterable:!1,flex:1,minWidth:200,valueFormatter:e=>(0,A.Mu)(e.value.updatedAt),renderCell:e=>(0,A.zM)(e.row.updatedAt)}];function M(){let{vouchers:e}=(0,c.Mz)(),{setValues:t}=(0,d.S)();return(0,r.useEffect)(()=>{t({table_data:e,table_column:E,table_selected:[],table_export_data:e.map(e=>({id:e.id,"T\xean m\xe3 giảm gi\xe1":e.name})),table_config:{table_name:"vouchers",add_data:!0,add_multi_data:!1,export_data:!0,selected_data:!0,delete_multi:!0,change_status_multi:!1,active_row:!1,edit_row:!0,delete_row:!0}})},[e]),(0,i.jsxs)(a.jx,{hasContent:!0,roles:["teacher"],children:[(0,i.jsx)(l.Z,{}),(0,i.jsx)(N,{})]})}}},function(e){e.O(0,[1425,2771,1396,4549,7212,6672,1923,7133,38,8324,1597,7709,7868,2290,5243,9321,3864,7041,3840,2971,4938,1744],function(){return e(e.s=62564)}),_N_E=e.O()}]);