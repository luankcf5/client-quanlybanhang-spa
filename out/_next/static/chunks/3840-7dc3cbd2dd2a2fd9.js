(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3840],{20067:function(){},72061:function(){},97203:function(e,t,n){"use strict";n.d(t,{Z:function(){return d}});var i=n(57437),a=n(2265),l=n(79245),o=n(41101),c=n(35843),r=n(89975);let s=(0,c.ZP)(l.Z)(e=>{let{theme:t,ownerState:n}=e,i="light"===t.palette.mode,a="filled"===n.variant,l="outlined"===n.variant,o="soft"===n.variant,c={..."default"===n.color&&{...a&&{color:i?t.palette.common.white:t.palette.grey[800],backgroundColor:t.palette.text.primary},...l&&{backgroundColor:"transparent",color:t.palette.text.primary,border:"2px solid ".concat(t.palette.text.primary)},...o&&{color:t.palette.text.secondary,backgroundColor:(0,r.Fq)(t.palette.grey[500],.16)}}},s={..."default"!==n.color&&{...a&&{color:t.palette[n.color].contrastText,backgroundColor:t.palette[n.color].main},...l&&{backgroundColor:"transparent",color:t.palette[n.color].main,border:"2px solid ".concat(t.palette[n.color].main)},...o&&{color:t.palette[n.color][i?"dark":"light"],backgroundColor:(0,r.Fq)(t.palette[n.color].main,.16)}}};return{height:24,minWidth:24,lineHeight:0,borderRadius:6,cursor:"default",alignItems:"center",whiteSpace:"nowrap",display:"inline-flex",justifyContent:"center",textTransform:"capitalize",padding:t.spacing(0,.75),fontSize:t.typography.pxToRem(12),fontWeight:t.typography.fontWeightBold,transition:t.transitions.create("all",{duration:t.transitions.duration.shorter}),...c,...s}});var d=(0,a.forwardRef)((e,t)=>{let{children:n,color:a="default",variant:c="soft",startIcon:r,endIcon:d,sx:h,...u}=e,g=(0,o.Z)(),p={width:16,height:16,"& svg, img":{width:1,height:1,objectFit:"cover"}};return(0,i.jsxs)(s,{ref:t,component:"span",ownerState:{color:a,variant:c},sx:{...r&&{pl:.75},...d&&{pr:.75},...h},theme:g,...u,children:[r&&(0,i.jsxs)(l.Z,{sx:{mr:.75,...p},children:[" ",r," "]}),n,d&&(0,i.jsxs)(l.Z,{sx:{ml:.75,...p},children:[" ",d," "]})]})})},20501:function(e,t,n){"use strict";n.d(t,{S:function(){return i.useTableContext}}),n(80406);var i=n(89107)},89107:function(e,t,n){"use strict";n.r(t),n.d(t,{TableContext:function(){return a},useTableContext:function(){return l}});var i=n(2265);let a=(0,i.createContext)({}),l=()=>{let e=(0,i.useContext)(a);if(!e)throw Error("useTableContext must be use inside TableProvider");return e}},80406:function(e,t,n){"use strict";n.r(t),n.d(t,{TableProvider:function(){return c}});var i=n(57437),a=n(2265),l=n(89107);let o={table_data:[],table_column:[],table_selected:[],table_export_data:[],table_config:{table_name:"",add_data:!1,add_multi_data:!1,export_data:!1,selected_data:!1,delete_multi:!1,change_status_multi:!1,active_row:!1,edit_row:!1,delete_row:!1},table_selected_row:null,table_open_form:!1,table_open_multi_form:!1};function c(e){let{children:t}=e,[n,c]=(0,a.useState)(o),r=(0,a.useCallback)((e,t)=>{c(n=>({...n,[e]:t}))},[c]),s=(0,a.useCallback)(e=>{r("table_data",[e,...n.table_data])},[r,n.table_data]),d=(0,a.useCallback)(e=>{r("table_data",[...e,...n.table_data])},[r,n.table_data]),h=(0,a.useCallback)(e=>{r("table_data",n.table_data.map(t=>t.id===e.id?e:t))},[r,n.table_data]),u=(0,a.useCallback)(e=>{r("table_data",n.table_data.filter(t=>t.id!==e))},[r,n.table_data]),g=(0,a.useCallback)(e=>{r("table_data",n.table_data.filter(t=>!e.includes(t.id)))},[r,n.table_data]),p=(0,a.useCallback)(e=>{r("table_open_form",e)},[r]),x=(0,a.useCallback)(e=>{r("table_open_multi_form",e)},[r]),b=(0,a.useMemo)(()=>({...n,setValue:r,setValues:c,onCreateNewRow:s,onCreateNewManyRow:d,onUpdateRow:h,onDeleteRow:u,onDeleteRows:g,onForm:p,onMultiForm:x}),[n,r,c,s,d,h,u,g,p,x]);return(0,i.jsx)(l.TableContext.Provider,{value:b,children:t})}},99149:function(e,t,n){"use strict";n.d(t,{Z:function(){return K}});var i=n(57437),a=n(2265),l=n(79245),o=n(15133),c=n(13457),r=n(76623),s=n(54986),d=n(78276),h=n(46776),u=n(137),g=n(21321),p=n(26971),x=n(81709),b=n(22750),m=n(69042),k=n(36921),y=n(57543),j=n(27707),C=n(92580),_=n(7504);let f=e=>{let{data:t,name:n,sheet:i,type:a}=e,l=_.P6.book_new(),o=_.P6.json_to_sheet(t);_.P6.book_append_sheet(l,o,i),_.NC(l,"".concat(n).concat(a))};var Z=n(27680),v=n(8653),w=n(89975),S=n(85269);function T(e){let{title:t,imgUrl:n,action:a,filled:o,description:r,sx:s,...d}=e;return(0,i.jsxs)(c.Z,{flexGrow:1,alignItems:"center",justifyContent:"center",sx:{px:3,height:1,...o&&{borderRadius:2,bgcolor:e=>(0,w.Fq)(e.palette.grey[500],.04),border:e=>"dashed 1px ".concat((0,w.Fq)(e.palette.grey[500],.08))},...s},...d,children:[(0,i.jsx)(l.Z,{component:"img",alt:"empty content",src:n||"/assets/icons/empty/ic_content.svg",sx:{width:1,maxWidth:160}}),t&&(0,i.jsx)(S.Z,{variant:"h6",component:"span",sx:{mt:1,color:"text.disabled",textAlign:"center"},children:t}),r&&(0,i.jsx)(S.Z,{variant:"caption",sx:{mt:1,color:"text.disabled",textAlign:"center"},children:r}),a&&a]})}var P=n(17078),D=n(35843),F=n(97292);let M=(0,D.ZP)(F.Z)(e=>{let{theme:t}=e;return{"& .MuiBadge-badge":{right:3,top:5,border:"2px solid ".concat(t.palette.background.paper),padding:"0 4px"}}});var I=n(20501),z=n(41101),R=n(85884),X=n(22734),E=n(45151),A=n(69112),L=n(97203);let B=[{label:"Di chuyển giữa c\xe1c \xf4, c\xe1c h\xe0ng",items:[{keys:"Mũi t\xean tr\xe1i",description:"Di chuyển sang b\xean tr\xe1i giữa c\xe1c \xf4"},{keys:"Mũi t\xean phải",description:"Di chuyển sang b\xean phải giữa c\xe1c \xf4"},{keys:"Mũi t\xean l\xean",description:"Di chuyển l\xean b\xean tr\xean giữa c\xe1c \xf4"},{keys:"Mũi t\xean xuống",description:"Di chuyển xuống b\xean dưới giữa c\xe1c \xf4"},{keys:"Home",description:"Di chuyển đến \xf4 đầu ti\xean của h\xe0ng hiện tại"},{keys:"End",description:"Di chuyển đến \xf4 cuối c\xf9ng của h\xe0ng hiện tại"},{keys:"Ctrl + Home",description:"Di chuyển đến \xf4 đầu ti\xean của h\xe0ng đầu ti\xean"},{keys:"Ctrl + End",description:"Di chuyển đến \xf4 cuối c\xf9ng của h\xe0ng cuối c\xf9ng"},{keys:"Space",description:"Di chuyển h\xe0ng tiếp theo c\xf3 thể k\xe9o đến"},{keys:"Page Up",description:"Di chuyển đến h\xe0ng tiếp theo"},{keys:"Page Down",description:"Di chuyển đến h\xe0ng k\xe9o đến tiếp theo"},{keys:"Space",description:"Mở rộng c\xe1c h\xe0ng con của h\xe0ng hiện tại"}]},{label:"Lựa chọn c\xe1c h\xe0ng dữ liệu",items:[{keys:"Shift + Space",description:"Lựa chọn h\xe0ng hiện tại"},{keys:"Shift + Mũi t\xean l\xean/xuống",description:"Lựa chọn h\xe0ng hiện tại v\xe0 h\xe0ng tr\xean/dưới"},{keys:"Shift + Click v\xe0o h\xe0ng",description:"Lựa chọn h\xe0ng hiện tại tới h\xe0ng được click"},{keys:"Ctrl + A",description:"Lựa chọn tất cả c\xe1c h\xe0ng"},{keys:"Ctrl + C",description:"Sao ch\xe9p c\xe1c h\xe0ng đang được lựa chọn"},{keys:"Ctrl + click v\xe0o h\xe0ng",description:"Mở chế độ lựa chọn nhiều h\xe0ng c\xf9ng l\xfac"},{keys:"Ctrl + click h\xe0ng đang chọn",description:"Bỏ lựa chọn cho h\xe0ng được click"}]},{label:"Sắp xếp c\xe1c h\xe0ng dữ liệu",items:[{keys:"Shift + click v\xe0o t\xean h\xe0ng",description:"Sắp xếp dữ liệu theo t\xean h\xe0ng được click"},{keys:"Ctrl + click v\xe0o t\xean h\xe0ng",description:"Đảo ngược sắp xếp theo t\xean h\xe0ng được click"},{keys:"Enter",description:"Sắp xếp dữ liệu theo t\xean h\xe0ng đang chọn"},{keys:"Shift + Enter",description:"Đảo ngược sắp xếp theo t\xean h\xe0ng đang chọn"}]}];var W=(0,a.memo)(function(){let e=(0,z.Z)(),t=(0,j.k)();return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(r.Z,{size:"small",startIcon:(0,i.jsx)(Z.Z,{icon:"mdi:keyboard-settings"}),onClick:t.onTrue,children:"Ph\xedm"}),(0,i.jsxs)(X.ZP,{anchor:"right",open:t.value,onClose:t.onFalse,slotProps:{backdrop:{invisible:!0}},sx:{["& .".concat(E.Z.paper)]:{...(0,A.uS)({theme:e,bgcolor:e.palette.background.default}),padding:2,width:520}},children:[(0,i.jsx)(S.Z,{variant:"h6",children:"Ph\xedm tắt"}),B.map((e,t)=>(0,i.jsxs)(c.Z,{spacing:1,children:[(0,i.jsx)(S.Z,{variant:"subtitle2",sx:{mt:.5},children:e.label}),e.items.map((e,t)=>(0,i.jsxs)(R.Z,{container:!0,sx:{typography:"caption"},children:[(0,i.jsx)(R.Z,{xs:5,children:(0,i.jsx)(L.Z,{children:e.keys})}),(0,i.jsx)(R.Z,{xs:7,children:e.description})]},"shortcut ".concat(t)))]},"keyboard ".concat(t)))]})]})});let q={id:!1},H=["id","actions"];function K(){let{enqueueSnackbar:e}=(0,v.Ds)(),{setValue:t,table_data:n,table_column:_,table_selected:w,table_export_data:S,table_selected_row:D,table_config:F,onForm:z,onMultiForm:R,onDeleteRow:X,onDeleteRows:E,onUpdateRow:A}=(0,I.S)(),{table_name:L,add_data:B,add_multi_data:K,active_row:N,delete_row:O,edit_row:Q,delete_multi:V,change_status_multi:G}=F,[U,$]=(0,a.useState)(q),J=(0,a.useMemo)(()=>_,[_]),Y=(0,j.k)(),ee=(0,j.k)(),et=(0,a.useCallback)(async()=>{ee.onTrue();try{await C.ZP.delete("".concat(L,"/").concat(D.id)),X(D.id),ee.onFalse(),Y.onFalse(),e("Đ\xe3 xo\xe1 dữ liệu th\xe0nh c\xf4ng !")}catch(t){console.log(t),ee.onFalse(),Y.onFalse(),e("Dữ liệu đang c\xf3 sự r\xe0ng buộc ! Kh\xf4ng thể xo\xe1 !",{variant:"error"})}t("table_selected_row",null)},[D,F,C.ZP,t,X,e]),en=(0,j.k)(),ei=(0,j.k)(),ea=(0,j.k)(),el=(0,a.useCallback)(async()=>{ea.onTrue();try{await C.ZP.delete("".concat(L,"/batch"),{data:w}),E(w),ea.onFalse(),en.onFalse(),e("Đ\xe3 xo\xe1 dữ liệu th\xe0nh c\xf4ng !")}catch(t){console.log(t),ea.onFalse(),en.onFalse(),e("Dữ liệu đang c\xf3 sự r\xe0ng buộc ! Kh\xf4ng thể xo\xe1 !",{variant:"error"})}},[D,w,F,C.ZP,E,e]),eo=(0,a.useCallback)(async t=>{try{let n=await C.ZP.patch("".concat(L,"/active/").concat(t.id),{status:!t.isActive});A(n.data),e("Thay đổi trạng th\xe1i th\xe0nh c\xf4ng !")}catch(t){console.log(t),e(t.message||t.message[0]||"Đ\xe3 c\xf3 lỗi xảy ra !  Vui l\xf2ng thử lại !",{variant:"error"})}},[D,F,C.ZP,A,e]),ec=(0,a.useCallback)(()=>{f({data:S,name:"export",sheet:"Sheet1",type:".xlsx"}),e("Xuất dữ liệu th\xe0nh c\xf4ng !")},[f,S]);return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(o.Z,{children:[(0,i.jsxs)(c.Z,{direction:"row",justifyContent:"space-between",sx:{m:1.5},spacing:1,children:[(0,i.jsxs)(c.Z,{direction:"row",spacing:1,children:[B&&(0,i.jsx)(r.Z,{variant:"contained",color:"primary",size:"small",startIcon:(0,i.jsx)(Z.Z,{icon:"material-symbols-light:add-notes-sharp"}),onClick:()=>z(!0),children:"Th\xeam mới"}),K&&(0,i.jsx)(r.Z,{variant:"contained",color:"primary",size:"small",startIcon:(0,i.jsx)(Z.Z,{icon:"mdi:table-add"}),onClick:()=>R(!0),children:"Import"})]}),(0,i.jsxs)(c.Z,{direction:"row",spacing:1,children:[G&&(0,i.jsx)(d.Z,{title:"Thay đổi trạng th\xe1i",children:(0,i.jsx)(M,{badgeContent:w.length,color:"error",children:(0,i.jsx)(h.Z,{color:"warning",size:"small",disabled:!w.length,onClick:ei.onTrue,children:(0,i.jsx)(Z.Z,{icon:"material-symbols:change-circle"})})})}),V&&(0,i.jsx)(d.Z,{title:"Xo\xe1 c\xe1c lựa chọn",children:(0,i.jsx)(M,{badgeContent:w.length,color:"error",children:(0,i.jsx)(h.Z,{color:"error",size:"small",disabled:!w.length,onClick:en.onTrue,children:(0,i.jsx)(Z.Z,{icon:"material-symbols:delete"})})})})]})]}),(0,i.jsx)(s.Z,{sx:{borderStyle:"dashed"}}),(0,i.jsx)(l.Z,{sx:{height:"calc(100vh - 112px)"},children:(0,i.jsx)(g._$,{checkboxSelection:!0,disableRowSelectionOnClick:!0,rows:n,columns:[...J,{type:"actions",field:"actions",headerName:"H\xe0nh động",align:"right",headerAlign:"right",flex:1,minWidth:120,sortable:!1,filterable:!1,disableColumnMenu:!0,getActions:e=>[(0,i.jsx)(p.u,{showInMenu:!0,icon:(0,i.jsx)(Z.Z,{icon:"fluent-mdl2:sync-status-solid"}),label:"Thay đổi trạng th\xe1i",sx:{color:"info.main"},onClick:()=>eo(e.row),disabled:!N}),(0,i.jsx)(p.u,{showInMenu:!0,icon:(0,i.jsx)(Z.Z,{icon:"solar:pen-bold"}),label:"Chỉnh sửa dữ liệu",sx:{color:"warning.main"},onClick:()=>{t("table_selected_row",e.row),z(!0)},disabled:!Q}),(0,i.jsx)(p.u,{showInMenu:!0,icon:(0,i.jsx)(Z.Z,{icon:"solar:trash-bin-trash-bold"}),label:"Xo\xe1 dữ liệu n\xe0y",sx:{color:"error.main"},onClick:()=>{t("table_selected_row",e.row),Y.onTrue()},disabled:!O})]}],columnVisibilityModel:U,onColumnVisibilityModelChange:e=>$(e),onRowSelectionModelChange:e=>{t("table_selected",n.filter(t=>e.includes(t.id)).map(e=>e.id))},slots:{toolbar:()=>(0,i.jsxs)(x.D,{children:[(0,i.jsx)(b.T,{size:"small",placeholder:"T\xecm kiếm dữ liệu..."}),(0,i.jsx)(l.Z,{sx:{flexGrow:1}}),(0,i.jsx)(m.S,{}),(0,i.jsx)(k.M,{}),(0,i.jsx)(y.L,{}),(0,i.jsx)(r.Z,{size:"small",startIcon:(0,i.jsx)(Z.Z,{icon:"material-symbols:export-notes-rounded"}),onClick:ec,disabled:!S.length,children:"Xuất"}),(0,i.jsx)(W,{})]}),noRowsOverlay:()=>(0,i.jsx)(T,{title:"Kh\xf4ng c\xf3 dữ liệu"}),noResultsOverlay:()=>(0,i.jsx)(T,{title:"Kh\xf4ng t\xecm thấy dữ liệu"})},slotProps:{toolbar:{showQuickFilter:!0},columnsPanel:{getTogglableColumns:()=>J.filter(e=>!H.includes(e.field)).map(e=>e.field)}}})})]}),(0,i.jsx)(P.Q,{open:Y.value,onClose:Y.onFalse,title:"X\xe1c nhận xo\xe1 dữ liệu",content:"Bạn c\xf3 chắc muốn xo\xe1 dữ liệu n\xe0y ? ( Dữ liệu đ\xe3 xo\xe1 kh\xf4ng thể kh\xf4i phục lại )",action:(0,i.jsx)(u.Z,{variant:"contained",color:"error",loading:ee.value,onClick:et,children:"X\xe1c nhận xo\xe1"})}),(0,i.jsx)(P.Q,{open:en.value,onClose:en.onFalse,title:"X\xe1c nhận xo\xe1 c\xe1c dữ liệu",content:"Bạn c\xf3 chắc muốn xo\xe1 ".concat(w.length," dữ liệu n\xe0y ? ( Dữ liệu đ\xe3 xo\xe1 kh\xf4ng thể kh\xf4i phục lại )"),action:(0,i.jsx)(u.Z,{variant:"contained",color:"error",loading:ea.value,onClick:el,children:"X\xe1c nhận xo\xe1"})})]})}}}]);