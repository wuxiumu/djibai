import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
// import Home from '@/views/Home.vue'   // 新增：导入首页组件
import ProductList from '@/views/ProductList.vue'
import Rental from '@/views/Rental.vue'
import OrderList from '@/views/OrderList.vue'
import UserCenter from '@/views/UserCenter.vue'


const routes = [
    { path: '/login', component: Login },
    { path: '/', component: ProductList },
    { path: '/rental', component: Rental },
    { path: '/orders', component: OrderList },
    { path: '/user', component: UserCenter },
    // ...其它路由
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
