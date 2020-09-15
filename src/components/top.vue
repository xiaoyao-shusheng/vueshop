<template>
  <div class="header">
    <div class="lt">
      <el-button
        v-if="iscollspace"
        type="primary"
        size="small"
        class="toggle-btn"
        icon="el-icon-s-unfold"
        @click="TOGGLE"
      ></el-button>
      <el-button
        v-else
        type="primary"
        size="small"
        class="toggle-btn"
        icon="el-icon-s-fold"
        @click="TOGGLE"
      ></el-button>

      <el-breadcrumb separator="/" class="mbx">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
      </el-breadcrumb>

      <el-button
        icon="el-icon-back"
        size="small"
        circle
        v-if="$route.path!='/index'"
        @click="$router.back()"
      ></el-button>
    </div>
    <div>
      <el-dropdown>
        <span class="el-dropdown-link">
          笨比你好!
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <i class="el-icon-full-screen"></i>全屏操作
          </el-dropdown-item>
          <el-dropdown-item>
            <i class="el-icon-switch-button"></i>退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  created() {},
  computed: {
    ...mapState(["iscollspace"])
  },
  methods: { ...mapMutations(["TOGGLE"]) },
  components: {}
};
</script>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  text-align-last: center;
  line-height: 60px;
}

.header .lt {
  display: flex;
  align-items: center;
}

.header .mbx {
  margin: 0 20px;
}
</style>