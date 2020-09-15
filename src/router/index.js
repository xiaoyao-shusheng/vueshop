import Vue from 'vue'
import Router from 'vue-router'


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
          meta: { title: '商品分类' }
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
          meta: { title: "轮播管理" }
        },
        {
          path: "/seckill",
          component: () => import("@/views/Shop/Seckill"),
          meta: { title: "秒杀管理" }
        },
        {
          path: "/specs",
          component: () => import("@/views/Shop/Specs"),
          meta: { title: "商品规格" }
        }

      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next();
})
export default router;
