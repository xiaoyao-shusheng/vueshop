<template>
  <div class="table-bg">
    <el-table :data="bannerlist" border row-key="id">
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="title" label="轮播图名称" align="center"></el-table-column>

      <el-table-column label="图片" align="center">
        <template slot-scope="scope">
          <img style="width:80px" v-if="scope.row.img" :src="scope.row.img | pixImg" alt />
          <span v-else>暂无图片</span>
          <span></span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status==1">启用</el-tag>
          <el-tag type="warning" v-if="scope.row.status==2">禁用</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作">
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
import { delBanner, getBanner } from "@/request/banner";
export default {
  data() {
    return {
      bannerlist: []
    };
  },

  mounted() {
    this.getlist();
  },
  created() {},

  methods: {
    async getlist() {
      let res = await getBanner();
      this.bannerlist = res;
    },

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
          let res = await delBanner(id);
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.getlist(); // 重新获取列表！
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(() => {});
    }
  },
  computed: {},

  components: {}
};
</script>
<style scoped>
</style>