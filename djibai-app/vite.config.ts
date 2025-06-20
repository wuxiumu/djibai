import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// 你可以在这里拓展更多 vite 插件，比如 svg、mock、自动按需引入等
// import { viteMockServe } from 'vite-plugin-mock'
// import Components from 'unplugin-vue-components/vite'

export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    // viteMockServe({ supportTs: true }),
    // Components({ /* ... */ }),
  ],
  resolve: {
    alias: [
      // 支持 @ 代表 src 目录
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      // 可按需拓展其它 alias
      // { find: '@components', replacement: fileURLToPath(new URL('./src/components', import.meta.url)) }
    ]
  },
  // 推荐加一点通用 server 配置（比如本地端口、open、跨域等）
  server: {
    port: 5173,
    open: true,
    // cors: true, // 一般用不到，跨域推荐接口端解决
  },
  // build: {
  //   outDir: 'dist',
  //   sourcemap: false,
  // },
  // 可以加注释，方便团队维护
}))