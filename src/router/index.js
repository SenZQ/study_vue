import Vue from 'vue'
import VueRouter from 'vue-router'

// page
import article from "../views/article/index.vue";
import friend  from "../views/friend/index.vue";
import index   from "../views/index/index.vue";
import info    from "../views/info/index.vue";
import login   from "../views/login/index.vue";
// import resume  from "../views/resume/index.vue";
import send    from "../views/send/index.vue";

Vue.use(VueRouter)

const routes = [
	{
		path: "/login",
		name: "login",
		component: login
	},
	{
		path: "/",
		name: "index",
		component: index
	},
	{
		path: "/info",
		name: "info",
		component: info
	},
	{
		path: "/send",
		name: "send",
		component: send
	},
	{
		path: "/article/:num",
		name: "article",
		component: article
	},
	{
		path: "/friend/:id",
		name: "friend",
		component: friend
	},
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
