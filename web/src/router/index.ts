import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
// 路由异步加载组件
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/About.vue")
  },
  {
    path: "/test",
    name: "test",
    component: () => import("../views/test/index.vue")
  },
  {
    path: "/gobang",
    name: "gobang",
    component: () => import("../views/Gobang.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/admin/Login.vue")
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../views/admin/Admin.vue")
  }
];

const router = new VueRouter({
  mode: "hash",
  routes
});

export default router;
