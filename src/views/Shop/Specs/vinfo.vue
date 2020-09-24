<template>
  <el-dialog
    :title="info.isAdd ? '添加规格':'修改规格'"
    :visible.sync="info.isShow"
    width="40%"
    @close="cancel()"
  >
    <!-- 表单 -->
    <el-form :model="forminfo" ref="form" label-width="140px" :rules="rules">
      <el-form-item label="属性名" prop="specsname">
        <el-input v-model="forminfo.specsname" placeholder="请输入属性名"></el-input>
      </el-form-item>

      <el-form-item label="属性值" prop>
        <label v-for="(item,index) in list" :key="index">
          <el-input
            style="display:inline-block;width:260px;margin-bottom:10px;"
            v-model="item.value"
            placeholder="请输入属性值"
          ></el-input>
          <el-button type="primary" v-if="index==0" @click="addAttrs">添加属性</el-button>
          <el-button type="danger" v-else @click="delAttrs(index)">删除属性</el-button>
        </label>
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
import { addSpecs, editSpecs } from "@/request/specs";

let defaultItem = {
  specsname: "",
  attrs: "",
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
      rules: {
        // 验证规则对象！
        specsname: [{ required: true, message: "必填项", trigger: "blur" }]
      }
    };
  },
  computed: {},
  created() {},

  methods: {
    ...mapActions({
      get_specs_list: "specs/get_specs_list"
    }),
    addAttrs() {
      this.list.push({ value: "" });
    },
    delAttrs(idx) {
      this.list.splice(idx, 1);
    },
    setinfo(val) {
      // 将数据赋给默认defaultItem; 赋给表单
      this.list = val.attrs.map(v => ({
        value: v
      }));
      defaultItem = { ...val };
      this.forminfo = { ...val }; //把存起来的值赋给表单 显示出来
    },
    async submit() {
      // 获取树形控件选中的节点！
      if (!this.list.every(val => val.value)) {
        //根据是否输入值返回false或者true
        this.$message.waining("请输入规格值");
        return;
      }
      this.forminfo.attrs = this.list.map(val => val.value); //遍历数组赋值给attrs
      this.forminfo.attrs = this.forminfo.attrs.join(","); //转换格式,因为要求只能提交字符串
      //表单验证
      this.$refs.form.validate(async vaid => {
        if (vaid) {
          let res;
          if (this.info.isAdd) {
            // 添加还是修改
            res = await addSpecs(this.forminfo);
          } else {
            res = await editSpecs(this.forminfo);
          }
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.info.isShow = false;
            this.get_specs_list(); //重新获取角色列表

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