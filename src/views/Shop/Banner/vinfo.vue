<template>
  <el-dialog
    :title="info.isAdd ? '添加轮播':'修改轮播'"
    :visible.sync="info.isShow"
    width="40%"
    @close="cancel()"
  >
    <!-- 表单 -->
    <el-form :model="forminfo" ref="form" label-width="140px" :rules="rules">
      <el-form-item label="轮播图名称" prop="title">
        <el-input v-model="forminfo.title" placeholder="请输入轮播图名称"></el-input>
      </el-form-item>
      <el-form-item label="轮播图图片" prop="img">
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
import { addBanner, editBanner } from "@/request/banner";

let defaultItem = {
  title: "",
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
        title: [{ required: true, message: "必填项", trigger: "blur" }],
        img: [{ required: true, message: "必填项", trigger: "blur" }]
      },
      filelist: [], // [{name:'',url:''}]
      options: []
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
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

      // 将数据赋给默认defaultItem; 赋给表单
      defaultItem = { ...val }; //点击添加的时候把他存起来
      this.forminfo = { ...val }; //把存起来的值赋给表单 显示出来
    },
    async submit() {
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

            res = await addBanner(fd);
          } else {
            res = await editBanner(fd);
          }
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.info.isShow = false;
            this.$parent.update(); //调用父组件的update方法,去更新列表

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
    }
  },
  components: {}
};
</script>
<style scoped>
</style>