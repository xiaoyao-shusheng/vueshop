webpackJsonp([7],{"5h+d":function(e,t){},dIYS:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("4YfN"),a=i.n(r),n=i("lC5x"),o=i.n(n),s=i("J0Oq"),l=i.n(s),f=i("dKdo"),c={},u={data:function(){return{forminfo:{pid:"",catename:"",img:"",status:1},rules:{catename:[{required:!0,message:"分类名称必须写",trigger:"blur"}],pid:[{required:!0,message:"上级分类必须选",trigger:"blur"}]},categorylist:[],dialogVisible:!1,dialogImageUrl:"",fileList:[]}},created:function(){this.getlist(),this.$route.params.id&&this.getinfo(this.$route.params.id)},methods:{getlist:function(){var e=this;return l()(o.a.mark(function t(){return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(f.d)();case 2:e.categorylist=t.sent;case 3:case"end":return t.stop()}},t,e)}))()},getinfo:function(e){var t=this;return l()(o.a.mark(function i(){var r;return o.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,Object(f.d)(e);case 2:t.forminfo=i.sent,(r=t.forminfo.img?t.$HOST+t.forminfo.img:"")&&t.fileList.push({name:t.forminfo.catename,url:r}),c=a()({},t.forminfo);case 6:case"end":return i.stop()}},i,t)}))()},submit:function(){var e,t=this;this.$refs.forminfo.validate((e=l()(o.a.mark(function e(i){var r,a,n;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!i){e.next=17;break}for(a in r=new FormData,t.forminfo)r.append(a,t.forminfo[a]);if(n=void 0,!t.$route.params.id){e.next=11;break}return r.append("id",t.$route.params.id),e.next=8,Object(f.c)(r);case 8:n=e.sent,e.next=14;break;case 11:return e.next=13,Object(f.a)(r);case 13:n=e.sent;case 14:n&&t.$router.back(),e.next=18;break;case 17:t.$message.warn("验证不通过");case 18:case"end":return e.stop()}},e,t)})),function(t){return e.apply(this,arguments)}))},reset:function(){if(this.$route.params.id){this.forminfo=a()({},c);var e=this.forminfo.img?this.$HOST+this.forminfo.img:"";e&&this.$set(this.fileList,0,{name:this.forminfo.catename,url:e})}else this.$refs.forminfo.resetFields(),this.fileList=[]},handlePictureCardPreview:function(e){this.dialogImageUrl=e.url,this.dialogVisible=!0},fileChange:function(e){this.forminfo.img=e.raw},limitImg:function(){this.$message.warning("分类图片最多添加1个")}},components:{}},m={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("el-row",{staticClass:"bgf"},[i("el-col",{attrs:{span:12,offset:5}},[i("el-form",{ref:"forminfo",attrs:{"label-width":"100px",model:e.forminfo,rules:e.rules}},[i("el-form-item",{attrs:{label:"上级分类",prop:"pid"}},[i("el-select",{attrs:{placeholder:"请选择父级"},model:{value:e.forminfo.pid,callback:function(t){e.$set(e.forminfo,"pid",t)},expression:"forminfo.pid"}},[i("el-option",{attrs:{label:"请选择",value:""}}),e._v(" "),i("el-option",{attrs:{label:"顶级分类",value:0}}),e._v(" "),e._l(e.categorylist,function(e){return i("el-option",{key:e.id,attrs:{label:e.catename,value:e.id}})})],2)],1),e._v(" "),i("el-form-item",{attrs:{label:"分类名称",prop:"catename"}},[i("el-input",{model:{value:e.forminfo.catename,callback:function(t){e.$set(e.forminfo,"catename",t)},expression:"forminfo.catename"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"分类图片",prop:"img"}},[i("el-upload",{attrs:{action:"#","list-type":"picture-card","on-preview":e.handlePictureCardPreview,"file-list":e.fileList,limit:1,"on-change":e.fileChange,"auto-upload":!1,"on-exceed":e.limitImg}},[i("i",{staticClass:"el-icon-plus",attrs:{slot:"default"},slot:"default"})]),e._v(" "),i("el-dialog",{attrs:{visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[i("img",{attrs:{width:"100%",src:e.dialogImageUrl,alt:""}})])],1),e._v(" "),i("el-form-item",{attrs:{label:"状态",prop:"status"}},[i("el-radio",{attrs:{label:1},model:{value:e.forminfo.status,callback:function(t){e.$set(e.forminfo,"status",t)},expression:"forminfo.status"}},[e._v("正常")]),e._v(" "),i("el-radio",{attrs:{label:0},model:{value:e.forminfo.status,callback:function(t){e.$set(e.forminfo,"status",t)},expression:"forminfo.status"}},[e._v("禁用")])],1),e._v(" "),i("el-form-item",[e.$route.params.id?i("el-button",{attrs:{type:"success"},on:{click:e.submit}},[e._v("立即修改")]):i("el-button",{attrs:{type:"primary"},on:{click:e.submit}},[e._v("立即添加")]),e._v(" "),i("el-button",{on:{click:e.reset}},[e._v("重置")])],1)],1)],1)],1)},staticRenderFns:[]};var d=i("C7Lr")(u,m,!1,function(e){i("5h+d")},"data-v-2ab05e8d",null);t.default=d.exports}});
//# sourceMappingURL=7.fdeecb8d27228424cad3.js.map