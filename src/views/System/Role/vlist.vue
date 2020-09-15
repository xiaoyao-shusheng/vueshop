<template>
  <div class="table-bg">
    <el-table :data="rolelist" border>
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="rolename" label="角色名称" align="center"></el-table-column>

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
            @click="del(scope.row.id)"
            size="small"
            icon="el-icon-delete"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { delRole } from "@/request/role";
export default {
  data() {
    return {};
  },

  mounted() {
    if (!this.rolelist.length) {
      this.get_role_list();
    }
  },
  created() {},

  methods: {
    ...mapActions({ get_role_list: "role/get_role_list" }),

    edit(val) {
      this.$emit("edit", { ...val });
      console.log(val); //自动获取的数据
    },
    async del(id) {
      this.$confirm("确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await delRole(id);
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.get_role_list(); // 重新获取列表！
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(() => {});
    }
  },
  computed: {
    ...mapGetters({ rolelist: "role/rolelist" })
  },

  components: {}
};
</script>
<style scoped>
</style>