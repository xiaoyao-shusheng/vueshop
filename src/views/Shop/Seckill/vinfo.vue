<template>
  <el-dialog
    :title="info.isAdd ? '添加活动':'修改活动'"
    :visible.sync="info.isShow"
    width="40%"
    @close="cancel()"
  >
    <!-- 表单 -->
    <el-form :model="forminfo" ref="form" label-width="140px" :rules="rules">
      <el-form-item label="活动名称" prop="title">
        <el-input v-model="forminfo.title" placeholder="请输入活动名称"></el-input>
      </el-form-item>
      <el-form-item label="活动时间" prop="begintime">
        <el-date-picker
          v-model="time"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
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
        <el-select v-model="forminfo.second_cateid" placeholder="请选择" @change="childChange">
          <el-option
            v-for="item in secondlist"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择商品" prop="goodsid">
        <el-select v-model="forminfo.goodsid" placeholder="请选择">
          <el-option
            v-for="item in goodlist"
            :key="item.id"
            :label="item.goodsname"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="状态">
        <el-switch v-model="forminfo.status" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>
      <el-form-item label>
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button type="warning" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getFxGoods } from "@/request/goods";
import { addSeck, editSeck } from "@/request/seckill";

let defaultItem = {
  title: "",
  begintime: "",
  endtime: "",
  first_cateid: "",
  second_cateid: "",
  goodsid: "",
  status: 1 // 状态1正常2禁用
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
      forminfo: { ...defaultItem },
      list: [{ value: "" }],
      secondlist: [], // 二级分类
      goodlist: [], //商品列表
      time: [],
      rules: {
        // 验证规则对象！
        title: [{ required: true, message: "必填项", trigger: "blur" }],
        begintime: [{ required: true, message: "必填项", trigger: "blur" }],
        endtime: [{ required: true, message: "必填项", trigger: "blur" }],
        first_cateid: [{ required: true, message: "必填项", trigger: "blur" }],
        second_cateid: [{ required: true, message: "必填项", trigger: "blur" }],
        goodsid: [{ required: true, message: "必填项", trigger: "blur" }]
      }
    };
  },
  mounted() {
    if (!this.catelist.length) {
      this.get_category_list();
    }
  },
  computed: {
    ...mapGetters({
      catelist: "category/catelist"
    })
  },
  created() {},
  //商品列表请求

  methods: {
    async childChange(id) {
      let res = await getFxGoods(
        this.forminfo.first_cateid,
        this.forminfo.second_cateid
      );
      this.goodlist = res;
    },
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
    ...mapActions({
      get_category_list: "category/get_category_list"
    }),

    setinfo(val) {
      // 将数据赋给默认defaultItem; 赋给表单
      defaultItem = { ...val };
      this.forminfo = { ...val }; //把存起来的值赋给表单 显示出来
      /* 时间戳转换为日期对象 */
      this.time = [new Date(val.begintime * 1), new Date(val.endtime * 1)];
      this.catelist.forEach(ele => {
        if (ele.id == val.first_cateid) {
          this.secondlist = ele.children;
        }
      });
      this.childChange();
    },
    async submit() {
      //把时间转换为时间戳提交
      if (!this.time.length) {
        this.$message.warning("请选择活动时间");
        return;
      }
      console.log(this.time);

      this.forminfo.begintime = this.time[0].getTime();
      this.forminfo.endtime = this.time[1].getTime();

      //表单验证
      this.$refs.form.validate(async vaid => {
        if (vaid) {
          let res;
          if (this.info.isAdd) {
            // 添加还是修改
            res = await addSeck(this.forminfo);
          } else {
            res = await editSeck(this.forminfo);
          }
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.info.isShow = false;
            this.$parent.update(); //重新获取列表
            this.cancel();
            //提交完毕后重置信息 //  // 无论是修改成功还是添加成功，都应该让表单为空！或者弹框关闭的时候
            //让复选框为空
          } else {
            this.$message.error(res.msg);
          }
        }
      });
    },
    reset() {
      if (this.info.isAdd) {
        // 添加时候重置
        this.forminfo = { ...resetItem };
      } else {
        this.setinfo({ ...defaultItem });
      }
    },
    cancel() {
      this.forminfo = { ...resetItem };
      this.list = [{ value: "" }];
    }
  },
  components: {}
};
</script>
<style scoped>
</style>