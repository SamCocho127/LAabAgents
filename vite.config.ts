import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const apiProxyTarget = 'http://127.0.0.1:5219'

const proxyConfig = {
  '/login': {
    target: apiProxyTarget,
    changeOrigin: true,
    secure: false,
  },
  '/api': {
    target: apiProxyTarget,
    changeOrigin: true,
    secure: false,
  },
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const useProxy = !env.VITE_API_URL

  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: 5173,
      strictPort: false,
      proxy: useProxy ? proxyConfig : undefined,
    },
    preview: {
      port: 4173,
      proxy: proxyConfig,
    },
  }
})
