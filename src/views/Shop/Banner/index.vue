<template>
  <div>
    <el-button type="primary" @click="add">添加轮播</el-button>
    <!-- 列表组件 -->
    <v-list @edit="edit" ref="list"></v-list>
    <!-- 添加/修改组件 -->
    <v-info :info="info" ref="dialog" @update="update"></v-info>
  </div>
</template>

<script>
import VInfo from "./vinfo";
import VList from "./vlist";
export default {
  data() {
    return {
      info: {
        isShow: false,
        isAdd: false
      }
    };
  },
  created() {},
  methods: {
    update() {
      // 通知list组件，重新获取列表
      this.$refs.list.getlist();
    },

    add() {
      this.info.isShow = true;
      this.info.isAdd = true;
    },
    edit(val) {
      this.info.isShow = true;
      this.info.isAdd = false;
      // 调用弹框组件的setinfo方法！
      this.$refs.dialog.setinfo(val);
    }
  },
  components: {
    VList,
    VInfo
  }
};
</script>
<style scoped>
</style>