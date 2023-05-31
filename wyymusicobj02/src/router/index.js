import {
	createRouter,
	createWebHistory
} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from "@/store/index.js"

const routes = [{
		path: '/',
		name: 'home',
		component: HomeView
	},
	{
		path: '/about',
		name: 'about',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import( /* webpackChunkName: "about" */ '../views/AboutView.vue')
	},
	{
		path: '/listview',
		name: 'lisiview',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import( /* webpackChunkName: "about" */ '../views/ListView.vue')
	},
	{
		path: '/search',
		name: 'search',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import( /* webpackChunkName: "about" */ '../views/Search.vue')
	},
	{
		path: '/me',
		name: 'me',
		//路由生命周期钩子函数从a路由进入b路由之前
		beforeEnter: (to,from, next) => {
				if (store.state.isLogin == true) { 
				next();//已登录
					}else {
					next("/login");
				}
			
		},
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import( /* webpackChunkName: "about" */ '../views/Me.vue')
	},
	{
		path: '/login',
		name: 'login',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import( /* webpackChunkName: "about" */ '../views/Login.vue')
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
