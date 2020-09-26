<template>
  <el-dialog
    :title="info.isAdd ? '添加商品':'修改商品'"
    :visible.sync="info.isShow"
    width="65%"
    @close="cancel()"
  >
    <el-form :model="forminfo" ref="form" label-width="100px" :rules="rules">
      <!-- Tab切换 -->

      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="first">
          <el-row>
            <el-col :span="12" :offset="5">
              <el-form-item label="一级分类" prop="first_cateid">
                <el-select v-model="forminfo.first_cateid" placeholder="请选择" @change="topChange">
                  <el-option
                    v-for="item in catelist"
                    :key="item.id"
                    :label="item.catename"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="二级分类" prop="second_cateid">
                <el-select v-model="forminfo.second_cateid" placeholder="请选择">
                  <el-option
                    v-for="item in secondlist"
                    :key="item.id"
                    :label="item.catename"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="商品名称" prop="goodsname">
                <el-input v-model="forminfo.goodsname" placeholder="请输入商品名称"></el-input>
              </el-form-item>
              <el-form-item label="商品价格" prop="price">
                <el-input v-model="forminfo.price" placeholder="请输入商品价格"></el-input>
              </el-form-item>
              <el-form-item label="市场价格" prop="market_price">
                <el-input v-model="forminfo.market_price" placeholder="请输入市场价格"></el-input>
              </el-form-item>
              <el-form-item label="商品图片" prop="img">
                <el-upload
                  action
                  :auto-upload="false"
                  list-type="picture-card"
                  :limit="1"
                  :on-preview="see"
                  :on-change="change"
                  :file-list="filelist"
                  :on-remove="remove"
                >
                  <i slot="default" class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible" title="查看图片" :append-to-body="true">
                  <img width="100%" :src="dialogImageUrl" alt />
                </el-dialog>
              </el-form-item>

              <el-form-item label="商品规格" prop="specsid">
                <el-select v-model="forminfo.specsid" @change="specsChange" placeholder="请选择">
                  <el-option
                    v-for="item in specslist"
                    :key="item.id"
                    :label="item.specsname"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="商品属性值" prop="specsattr">
                <el-select v-model="forminfo.specsattr" multiple placeholder="请选择">
                  <el-option
                    v-for="item in attrslist"
                    :key="item"
                    :label="item"
                    :value="item"
                    multiple
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="详细描述" name="second" prop="description">
          <el-row>
            <el-col :span="8">
              <el-form-item label="是否新品">
                <el-switch v-model="forminfo.isnew" :active-value="1" :inactive-value="2"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否热卖">
                <el-switch v-model="forminfo.ishot" :active-value="1" :inactive-value="2"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="状态">
                <el-switch v-model="forminfo.status" :active-value="1" :inactive-value="2"></el-switch>
              </el-form-item>
            </el-col>
            <el-col>
              <!-- uploadImgUrl="#"  一旦写了，就可以上传本地图片！而且是自动上传！ -->
              <vue-wangeditor ref="wangeditor" width="100%" height="400" id="editor"></vue-wangeditor>
              <br />
              <br />
              <br />
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <!-- 按钮 -->
      <el-row>
        <el-col :span="8" :offset="7">
          <el-form-item label>
            <el-button type="primary" @click="submit">提交</el-button>
            <el-button type="warning" @click="reset">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
// 导入编辑器
import vueWangeditor from "vue-wangeditor";
import { mapActions, mapGetters } from "vuex";
import { addGoods, editGoods } from "@/request/goods";

let defaultItem = {
  first_cateid: "",
  second_cateid: "",
  goodsname: "",
  price: "",
  market_price: "",
  description: "",
  specsid: "",
  specsattr: "",
  isnew: 2,
  ishot: 2,
  img: "",
  status: 1 //状态1正常2禁用
};
let resetItem = { ...defaultItem };
export default {
  props: {
    info: {
      type: Object,
      default: {
        isShow: false,
        isAdd: true
      }
    }
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      forminfo: { ...defaultItem },
      rules: {
        // 验证规则对象！
        first_cateid: [{ required: true, message: "必填项", trigger: "blur" }],
        second_cateid: [{ required: true, message: "必填项", trigger: "blur" }],
        goodsname: [{ required: true, message: "必填项", trigger: "blur" }],
        price: [{ required: true, message: "必填项", trigger: "blur" }],
        market_price: [{ required: true, message: "必填项", trigger: "blur" }],
        description: [{ required: true, message: "必填项", trigger: "blur" }],
        specsid: [{ required: true, message: "必填项", trigger: "blur" }],
        specsattr: [{ required: true, message: "必填项", trigger: "blur" }],
        img: [{ required: true, message: "必填项", trigger: "blur" }]
      },
      filelist: [], // [{name:'',url:''}]
      activeName: "first",
      secondlist: [],
      attrslist: []
    };
  },
  computed: {
    ...mapGetters({
      catelist: "category/catelist",
      specslist: "specs/specslist"
    })
  },
  created() {},
  mounted() {
    if (!this.catelist.length) {
      this.get_category_list();
    }
    if (!this.specslist.length) {
      this.get_specs_list();
    }
  },
  methods: {
    topChange(id) {
      //一级分类变化
      this.secondlist = [];
      this.forminfo.second_cateid = "";
      // id就是选中的ID，根据这个ID遍历一级分类数组，找出其对应的chilren就是二级分类列表！
      this.catelist.forEach(val => {
        if (val.id == id) {
          this.secondlist = val.children;
        }
      });
    },
    specsChange(id) {
      // 规格名发生变化
      this.attrslist = [];
      this.forminfo.specsattr = [];
      this.specslist.forEach(val => {
        if (val.id == id) {
          this.attrslist = val.attrs;
        }
      });
    },
    see(file) {
      this.dialogImageUrl = file.url; //js生成的预览地址
      this.dialogVisible = true;
    },
    change(file, fileList) {
      this.forminfo.img = file.raw; //file.raw是原生文件信息!
    },

    remove(file, fileList) {
      this.forminfo.img = "";
    },

    ...mapActions({
      get_category_list: "category/get_category_list",
      get_specs_list: "specs/get_specs_list",
      get_goods_list: "goods/get_goods_list"
    }),
    setinfo(val) {
      //提取图片地址信息
      if (val.img) {
        this.filelist = [
          {
            name: val.catename,
            url: this.$host + val.img
          }
        ];
      }
      val.children ? delete val.children : "";
      this.topChange(val.first_cateid);
      this.specsChange(val.specsid);
      "firstcatename" in val ? delete val.firstcatename : ""; //in方法 判断这个里面是否有这个值  返回true和false
      "secondcatename" in val ? delete val.secondcatename : "";
      // 手动设置编辑器的内容
      this.$nextTick(() => {
        //$nextTick 等页面代码加载完成
        this.$refs.wangeditor.setHtml(val.description);
      });

      // 将数据赋给默认defaultItem; 赋给表单
      defaultItem = { ...val }; //点击添加的时候把他存起来
      this.forminfo = { ...val }; //把存起来的值赋给表单 显示出来
    },
    async submit() {
      // 文章正文！
      this.forminfo.description = this.$refs.wangeditor.getHtml();
      //表单验证
      this.$refs.form.validate(async vaid => {
        if (vaid) {
          let res;
          //提交FormData类型
          let fd = new FormData(); //模拟生成一个表单
          for (let k in this.forminfo) {
            fd.append(k, this.forminfo[k]);
          }
          if (this.info.isAdd) {
            // 添加还是修改

            res = await addGoods(fd);
          } else {
            res = await editGoods(fd);
          }
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.info.isShow = false;
            this.get_goods_list(); //再次获取列表,让仓库的数据保持最新
            this.cancel(); //提交完毕后重置信息 //  // 无论是修改成功还是添加成功，都应该让表单为空！或者弹框关闭的时候
          } else {
            this.$message.error(res.msg);
          }
        }
      });
    },
    reset() {
      if (this.info.isAdd) {
        // 添加时候的重置！
        this.forminfo = { ...resetItem };
      } else {
        // 修改时候的重置！
        this.setinfo({ ...defaultItem });
      }
    },
    cancel() {
      //  // 无论是修改成功还是添加成功，都应该让表单为空！或者弹框关闭的时候！
      this.forminfo = { ...resetItem };
      this.filelist = []; // 设为空，就没有了！
      this.$refs.wangeditor.setHtml(""); //让编辑器重置时为空
    }
  },
  components: {
    vueWangeditor
  }
};
</script>
<style scoped>
</style>