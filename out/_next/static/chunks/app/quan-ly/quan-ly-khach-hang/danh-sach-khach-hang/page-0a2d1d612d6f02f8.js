(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7367,6237,5017,5332,5479],{68960:function(e,n,t){Promise.resolve().then(t.bind(t,90907))},29417:function(e,n,t){"use strict";t.d(n,{qy:function(){return d},uG:function(){return o},wK:function(){return c}});var a=t(42333),l=t(2265),r=t(92580);let i=r.Hv.customer.root,h={revalidateIfStale:!0,revalidateOnFocus:!0,revalidateOnReconnect:!0};function d(){let{data:e,isLoading:n,error:t,isValidating:d}=(0,a.ZP)(i,r._i,h);return(0,l.useMemo)(()=>({customers:e||[],customersLoading:n,customersError:t,customersValidating:d,customersEmpty:!n&&!(null==e?void 0:e.length)}),[null==e?void 0:e.customers,t,n,d])}async function c(e){let{data:n}=await r.ZP.post(i,e);return n}async function o(e,n){let{data:t}=await r.ZP.patch("".concat(i,"/").concat(e),n);return t}},90907:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return C}});var a=t(57437),l=t(2265),r=t(99149),i=t(84693),h=t(29417),d=t(20501),c=t(35691),o=t(61865),s=t(89701),u=t(13457),m=t(76623),f=t(22079),p=t(137),g=t(91797),_=t(42834),x=t(26337),b=t(8653),v=t(27558);function j(){let{table_selected_row:e,table_open_form:n,setValue:t,onForm:r,onCreateNewRow:i,onUpdateRow:j}=(0,d.S)(),k=!!e,{enqueueSnackbar:w}=(0,b.Ds)(),C=c.Ry().shape({name:c.Z_().required("Bạn chưa nhập t\xean cho kh\xe1ch h\xe0ng !"),phone:c.Z_().required("Bạn chưa nhập số điện thoại cho kh\xe1ch h\xe0ng !"),address:c.Z_()}),Z=(0,l.useMemo)(()=>({name:(null==e?void 0:e.name)||"",phone:(null==e?void 0:e.phone)||"",address:(null==e?void 0:e.address)||""}),[e]),N=(0,o.cI)({resolver:(0,s.X)(C),defaultValues:Z}),{reset:y,handleSubmit:T,formState:{isSubmitting:A}}=N;(0,l.useEffect)(()=>{y(Z)},[y,e,Z]);let W=T(async n=>{try{if(k){let t=await (0,h.uG)(e.id,n);j(t),w("Đ\xe3 cập nhật dữ liệu kh\xe1ch h\xe0ng !")}else{let e=await (0,h.wK)(n);i(e),w("Đ\xe3 th\xeam dữ liệu kh\xe1ch h\xe0ng mới !")}y(),E()}catch(e){console.log(e),w(e.message[0]||e.message||"Đ\xe3 c\xf3 lỗi xảy ra !  Vui l\xf2ng thử lại !",{variant:"error"})}}),E=(0,l.useCallback)(()=>{t("table_selected_row",null),r(!1),y()},[r,t,y]);return(0,a.jsx)(f.Z,{fullWidth:!0,maxWidth:"sm",open:n,onClose:E,children:(0,a.jsxs)(v.ZP,{methods:N,onSubmit:W,children:[(0,a.jsx)(g.Z,{children:k?"Cập nhật dữ liệu kh\xe1ch h\xe0ng":"Th\xeam dữ liệu kh\xe1ch h\xe0ng mới"}),(0,a.jsx)(x.Z,{children:(0,a.jsxs)(u.Z,{spacing:2,children:[(0,a.jsx)(v.jY,{label:"T\xean kh\xe1ch h\xe0ng :",required:!0,children:(0,a.jsx)(v.au,{name:"name",label:"Nhập t\xean kh\xe1ch h\xe0ng",placeholder:"L\xea Thanh T\xf9ng..."})}),(0,a.jsx)(v.jY,{label:"Số điện thoại kh\xe1ch h\xe0ng :",required:!0,children:(0,a.jsx)(v.au,{name:"phone",label:"Nhập số điện thoại kh\xe1ch h\xe0ng",placeholder:"0945 855 878..."})}),(0,a.jsx)(v.jY,{label:"Địa chỉ kh\xe1ch h\xe0ng :",children:(0,a.jsx)(v.au,{multiline:!0,rows:2,name:"address",label:"Nhập địa chỉ kh\xe1ch h\xe0ng...",placeholder:"138 Mậu Th\xe2n, Ninh Kiều, Cần Thơ..."})})]})}),(0,a.jsxs)(_.Z,{children:[(0,a.jsx)(m.Z,{variant:"outlined",onClick:E,children:"Huỷ bỏ"}),(0,a.jsx)(p.Z,{type:"submit",color:"primary",variant:"contained",loading:A,children:k?"Cập nhật dữ liệu":"Th\xeam dữ liệu mới"})]})]})})}var k=t(41689);let w=[{field:"id",headerName:"Id",filterable:!1},{field:"name",headerName:"T\xean kh\xe1ch h\xe0ng",flex:1,minWidth:270,hideable:!1,renderCell:e=>e.row.name},{field:"phone",headerName:"Số điện thoại",flex:1,minWidth:270,renderCell:e=>e.row.phone},{field:"address",headerName:"Địa chỉ",flex:1,minWidth:270,renderCell:e=>e.row.address},{field:"point",headerName:"Điểm t\xedch luỹ",flex:1,minWidth:270,renderCell:e=>"".concat(e.row.point," điểm")},{type:"date",field:"createdAt",headerName:"Thời gian tạo",headerAlign:"center",align:"center",filterable:!1,flex:1,minWidth:200,valueFormatter:e=>(0,k.Mu)(e.value.createdAt),renderCell:e=>(0,k.zM)(e.row.createdAt)},{type:"date",field:"updatedAt",headerName:"Cập nhật gần nhất",headerAlign:"center",align:"center",filterable:!1,flex:1,minWidth:200,valueFormatter:e=>(0,k.Mu)(e.value.updatedAt),renderCell:e=>(0,k.zM)(e.row.updatedAt)}];function C(){let{customers:e}=(0,h.qy)(),{setValues:n}=(0,d.S)();return(0,l.useEffect)(()=>{n({table_data:e,table_column:w,table_selected:[],table_export_data:e.map(e=>({id:e.id,"T\xean kh\xe1ch h\xe0ng":e.name})),table_config:{table_name:"customers",add_data:!0,add_multi_data:!1,export_data:!0,selected_data:!0,delete_multi:!0,change_status_multi:!1,active_row:!1,edit_row:!0,delete_row:!0}})},[e]),(0,a.jsxs)(i.jx,{hasContent:!0,roles:["teacher"],children:[(0,a.jsx)(r.Z,{}),(0,a.jsx)(j,{})]})}}},function(e){e.O(0,[1425,2771,1396,4549,7212,6672,1923,7133,38,8324,1597,7709,2290,5243,9321,3864,7041,3840,2971,4938,1744],function(){return e(e.s=68960)}),_N_E=e.O()}]);