import Vue from 'vue'
import Router from 'vue-router'
import store from "@/store"

// 这段代码为了解决 element-ui 同路由强制跳转到同路由报错问题，原因是 element-ui和路由的版本冲突！
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/login',
      component: () => import("@/views/Login"),
      meta: { title: "登录" }
    },
    {
      path: '/',
      component: () => import("@/views/Layout"),//这里会默认解析Layout里面的index(就是大首页) 
      meta: { title: "小U商城后台管理系统" },
      redirect: "/index", //重定向 加载出来的就是他下面配置的子路由 会自动进入子路由
      children: [
        {
          path: "/index", //我是小首页(就是欢迎页面)
          component: () => import("@/views/Index"),
          meta: { title: "后台首页" }
        },
        {
          path: "/role",
          component: () => import("@/views/System/Role"),
          meta: { title: "角色管理" }
        }, {
          path: "/menu",
          component: () => import("@/views/System/Menu"),
          meta: { title: "菜单管理" }
        },
        {
          path: "/user",
          component: () => import("@/views/System/User"),
          meta: { title: "管理员管理" }
        },
        {
          path: "/category",
          component: () => import("@/views/Shop/Category"),
          meta: { title: '分类管理' }
        },
        {
          path: "/specs",
          component: () => import("@/views/Shop/Specs"),
          meta: { title: "规格管理" }
        },
        {
          path: "/goods",
          component: () => import("@/views/Shop/Goods"),
          meta: { title: "商品管理" }
        },
        {
          path: "/member",
          component: () => import("@/views/Shop/Member"),
          meta: { title: "会员管理" }
        },
        {
          path: "/banner",
          component: () => import("@/views/Shop/Banner"),
          meta: { title: "轮播图管理" }
        },
        {
          path: "/seckill",
          component: () => import("@/views/Shop/Seckill"),
          meta: { title: "秒杀管理" }
        },


      ]
    },
  ]
})

router.beforeEach((to, from, next) => {

  if (to.path == "/login") { //1. 要去的地址是登录页面
    document.title = to.meta.title
    next();
  } else {//2. 不是登录页面!就需要判断是否登录了! 登录了才可以访问!
    if (localStorage.getItem("userinfo")) { //登录了!
      let whiteList = store.getters["user/menus_url"];
      whiteList.push('/index')
      if (whiteList.includes(to.path)) {//去的地址在该用户可以访问的地址池中!
        document.title = to.meta.title
        next();
      }
    } else { //没有登录就想访问是直接跳转到登录页面
      next("/login")

    }
  }



})
export default router;
