<template>
  <div class="table-bg">
    <el-table :data="menulist" border row-key="id" :tree-props="{children: 'children'}">
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="title" label="菜单名称" align="center"></el-table-column>
      <el-table-column prop="url" label="菜单地址" align="center"></el-table-column>
      <el-table-column label="图标" align="center">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.type==1">目录</el-tag>
          <el-tag type="warning" v-if="scope.row.type==2">菜单</el-tag>
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
import { delMenu, addMenu, editMenu } from "@/request/menu";
export default {
  data() {
    return {};
  },

  mounted() {
    if (!this.menulist.length) {
      this.get_menu_list();
    }
  },
  created() {},

  methods: {
    ...mapActions({ get_menu_list: "menu/get_menu_list" }),

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
          let res = await delMenu(id);
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.get_menu_list(); // 重新获取列表！
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(() => {});
    }
  },
  computed: {
    ...mapGetters({ menulist: "menu/menulist" })
  },

  components: {}
};
</script>
<style scoped>
</style>