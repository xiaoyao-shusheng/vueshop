<template>
  <div>
    <h4 class="logo">小U商城后台</h4>
    <!-- 菜单组件 -->

    <el-menu
      class="page-menu"
      background-color="#444"
      text-color="#fff"
      router
      :default-active="$route.path"
      :collapse="iscollspace"
    >
      <el-menu-item index="/index">
        <i class="el-icon-s-home"></i>
        <span slot="title">后台首页</span>
      </el-menu-item>
      <!-- 只要嵌套就是<el-submenu></el-submenu> 
    然后下面会有一个<template slot="title"></template>插槽 代表父级
      -->
      <template v-for="(item,index) in menus">
        <el-menu-item v-if="item.type==2" :index="item.url">
          <i :class="item.icon"></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
        <el-submenu v-else :index="index+''">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </template>
          <el-menu-item :index="val.url" v-for="(val,idx) in item.children" :key="idx">{{val.title}}</el-menu-item>
        </el-submenu>
      </template>
      <!-- <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-tools"></i>
          <span slot="title">系统设置</span>
        </template>
        <el-menu-item index="/menu">菜单管理</el-menu-item>
        <el-menu-item index="/role">角色管理</el-menu-item>
        <el-menu-item index="/user">管理员管理</el-menu-item>
      </el-submenu>-->
      <!-- <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-shopping-bag-2"></i>
          <span slot="title">商城管理</span>
        </template>
        <el-menu-item index="/category">商品分类</el-menu-item>
        <el-menu-item index="/specs">商品规格</el-menu-item>
        <el-menu-item index="/goods">商品管理</el-menu-item>
        <el-menu-item index="/member">会员管理</el-menu-item>
        <el-menu-item index="/banner">轮播图管理</el-menu-item>
        <el-menu-item index="/seckill">秒杀活动</el-menu-item>
      </el-submenu>-->
    </el-menu>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  created() {},
  computed: {
    ...mapState(["iscollspace"]),
    ...mapGetters({ menus: "user/menus" })
  },
  methods: {},
  components: {}
};
</script>
<style scoped>
.logo {
  height: 60px;
  line-height: 60px;
  text-align: center;
  background-color: #666;
  color: #fff;
  letter-spacing: 4px;
  white-space: nowrap;
  overflow: hidden;
}

el-menu el-menu-item:hover {
  background-color: salmon;
}

.page-menu {
  border: none;
}
</style>