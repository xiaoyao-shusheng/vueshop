<template>
  <el-dialog title="修改信息" :visible.sync="info.isShow" width="40%" @close="cancel()">
    <!-- 表单 -->
    <el-form :model="forminfo" ref="form" label-width="140px">
      <el-form-item label="会员名" prop="nickname">
        <el-input v-model="forminfo.nickname" readonly placeholder="会员名"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="forminfo.phone" readonly placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="forminfo.password" placeholder="密码"></el-input>
      </el-form-item>

      <el-form-item label="会员状态">
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
// 导入  添加和修改的 请求封装方法！
import { editMember } from "@/request/member";

let defaultItem = {
  nickname: "",
  phone: "",
  password: "",
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
      forminfo: { ...defaultItem }
    };
  },
  computed: {},
  created() {},

  methods: {
    setinfo(val) {
      // 将数据赋给默认defaultItem; 赋给表单
      val.password = "";
      defaultItem = { ...val }; //点击添加的时候把他存起来
      this.forminfo = { ...val }; //把存起来的值赋给表单 显示出来
    },
    async submit() {
      //表单验证
      this.$refs.form.validate(async vaid => {
        if (vaid) {
          let res;
          res = await editMember(this.forminfo);
          console.log(res);
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.info.isShow = false;
            this.$emit("update"); //重新获取角色列表

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
      this.setinfo({ ...defaultItem });
    },
    cancel() {
      this.forminfo = { ...resetItem };
    }
  },
  components: {}
};
</script>
<style scoped>
</style>