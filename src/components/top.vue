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
          {{username}}你好
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="togglescreenfull">
            <i class="el-icon-full-screen"></i>
            {{isfull ? '退出全屏':'全屏操作'}}
          </el-dropdown-item>
          <el-dropdown-item @click.native="QUIT">
            <i class="el-icon-switch-button"></i>退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
// 全屏插件
import screenfull from "screenfull";
export default {
  data() {
    return {
      isfull: false
    };
  },
  created() {},
  computed: {
    ...mapState(["iscollspace"]),
    ...mapGetters({ username: "user/username" })
  },
  methods: {
    ...mapMutations({ TOGGLE: "TOGGLE", QUIT: "user/QUIT" }),
    togglescreenfull() {
      if (!screenfull.isEnabled) {
        this.$message.warning("您的浏览器不支持全屏");
        return false;
      }
      this.isfull = !this.isfull;
      screenfull.toggle();
    }
  },
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