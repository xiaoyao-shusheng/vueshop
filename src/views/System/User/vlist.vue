<template>
  <div class="table-bg">
    <el-table :data="userlist" border>
      <el-table-column prop="uid" label="UID" width="320" align="center"></el-table-column>
      <el-table-column prop="username" label="管理员名称" align="center"></el-table-column>

      <el-table-column label="管理员角色" align="center">
        <template slot-scope="scope">
          <el-tag type="success">{{scope.row.rolename}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status==1">启用</el-tag>
          <el-tag type="warning" v-if="scope.row.status==2">禁用</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="修改">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="edit(scope.row)"
            size="small"
            circle
          ></el-button>
          <el-button
            type="danger"
            @click="del(scope.row.uid)"
            size="small"
            icon="el-icon-delete"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    ></el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { delUser } from "@/request/user";
export default {
  data() {
    return {};
  },

  mounted() {
    if (!this.userlist.length) {
      this.get_user_list();
    }
  },
  created() {},

  methods: {
    ...mapActions({ get_user_list: "user/get_user_list" }),
    ...mapActions({ page: "user/SET_page" }),
    ...mapActions({ size: "user/SET_size" }),

    edit(val) {
      this.$emit("edit", { ...val });
      // console.log(val); //自动获取的数据
    },
    async del(uid) {
      this.$confirm("确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await delUser(uid);
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.get_user_list(); // 重新获取列表！
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(() => {});
    }
  },
  computed: {
    ...mapGetters({ userlist: "user/userlist" })
  },

  components: {}
};
</script>
<style scoped>
</style>