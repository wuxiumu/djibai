import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
// 如果有全局样式，可以在这里引入
// import './styles/global.css'

// 1. 创建应用实例
const app = createApp(App)

// 2. 加载全局插件
app.use(createPinia({
    // 开发阶段建议开启严格模式，发现 state 误用
    strict: process.env.NODE_ENV !== 'production'
}))
app.use(router)

// 3. 挂载到 DOM（注意挂载点 id 必须和 public/index.html 保持一致）
app.mount('#app')

// 4. 生产环境可以在这里挂载全局错误处理、性能埋点等
// app.config.errorHandler = (err, vm, info) => {
//   // 全局错误上报逻辑
// }