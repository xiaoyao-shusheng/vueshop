<template>
  <el-container class="page">
    <el-aside :width="iscollspace ? '64px' : '220px'" class="page-nav">
      <left />
    </el-aside>
    <el-container class="page-content">
      <el-header class="page-header">
        <top />
      </el-header>
      <el-main class="page-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import left from "@/components/left";
import top from "@/components/top";
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {
    ...mapState(["iscollspace"])
  },
  components: {
    left,
    top
  }
};
</script>
<style scoped>
.page {
  width: 100vw;
  height: 100vh;
}

.page-content {
  height: 100%;
  background-color: #f7f7f7;
}

.page-nav {
  background-color: #1c1f26;
}

.page-header {
  background-color: #fff;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);
}
</style>