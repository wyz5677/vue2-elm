// 以过
import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入路由
import routes from './router/router'
// 导入vuex仓库
import store from './store/'
// 导入路由模式  hash模式
import {routerMode} from './config/env'
// 不知道作用  好像是自适应REM
import './config/rem'

Vue.use(VueRouter)
const router = new VueRouter({
	routes,
	// 路由模式
	mode: routerMode,
	// 严格模式
	strict: process.env.NODE_ENV !== 'production',
	// 在vue项目中，如果前一个页面有滚动条的滚动，当路由跳转后发现滚动条的位置还保持在原来的位置，这个就带来了困扰。
	// 其实在vue官网中介绍了scrollBehavior方法，同样可以实现路由跳转之后滚动条滚到顶部。
	scrollBehavior (to, from, savedPosition) {
	    if (savedPosition) {
		    return savedPosition
		} else {
			// 如果之前的页面有保持状态
			if (from.meta.keepAlive) {
				// 就把当前的页面的滚动高度赋值
				from.meta.savedPosition = document.body.scrollTop;
			}
			// 赋值之后返回
		    return { x: 0, y: to.meta.savedPosition || 0 }
		}
	}
})

new Vue({
	router,
	store,
}).$mount('#app')

