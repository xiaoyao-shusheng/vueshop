<template>
  <el-dialog
    :title="info.isAdd ? '添加角色':'修改角色'"
    :visible.sync="info.isShow"
    width="40%"
    @close="cancel()"
  >
    <!-- 表单 -->
    <el-form :model="forminfo" ref="form" label-width="140px" :rules="rules">
      <el-form-item label="角色名称" prop="rolename">
        <el-input v-model="forminfo.rolename" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="角色权限 " prop="menu">
        <el-tree
          :check-strictly="checkStrictly"
          ref="tree"
          node-key="id"
          :data="menulist"
          show-checkbox
          default-expand-all
          :props="{children:'children',label:'title'}"
        ></el-tree>
      </el-form-item>
      <el-form-item label="角色状态">
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
import { addRole, editRole } from "@/request/role";

let defaultItem = {
  rolename: "",
  menus: "",
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
      forminfo: { ...defaultItem },
      rules: {
        // 验证规则对象！
        rolename: [{ required: true, message: "必填项", trigger: "blur" }],
        menu: [{ required: true, message: "必填项", trigger: "blur" }]
      },
      checkStrictly: false // false表示父子关联！ true表示父子不关联！
    };
  },
  computed: {
    ...mapGetters({
      menulist: "menu/menulist"
    })
  },
  created() {},
  mounted() {
    if (!this.menulist.length) {
      this.get_menu_list();
    }
  },
  methods: {
    ...mapActions({
      get_menu_list: "menu/get_menu_list",
      get_role_list: "role/get_role_list"
    }),
    setinfo(val) {
      // 将数据赋给默认defaultItem; 赋给表单
      //将权限节点,回显到树中去
      let idarr = val.menus.split(",");
      if (idarr[0]) {
        this.checkStrictly = true; // 父子互不关联！
        // 等到节点渲染完成再做某个事情！ this.$nextTick(()=>{  等到vue把节点渲染完成再做某些事情！ })
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys(idarr);
          this.checkStrictly = false; // 又要父子互相关联！
        });
      }
      defaultItem = { ...val }; //点击添加的时候把他存起来

      this.forminfo = { ...val }; //把存起来的值赋给表单 显示出来
    },
    async submit() {
      // 获取树形控件选中的节点！
      let idarr = this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys());
      if (idarr.length) {
        this.forminfo.menus = idarr;
      } else {
        this.$message.warning("请选择权限");
        return;
      }

      //表单验证
      this.$refs.form.validate(async vaid => {
        if (vaid) {
          let res;
          if (this.info.isAdd) {
            // 添加还是修改
            res = await addRole(this.forminfo);
            console.log(res);
          } else {
            res = await editRole(this.forminfo);
          }
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.info.isShow = false;
            this.get_role_list(); //重新获取角色列表

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
        this.$refs.tree.setCheckedKeys([]);
      } else {
        this.setinfo({ ...defaultItem });
      }
    },
    cancel() {
      this.$refs.tree.setCheckedKeys([]), (this.forminfo = { ...resetItem });
    }
  },
  components: {}
};
</script>
<style scoped>
</style>