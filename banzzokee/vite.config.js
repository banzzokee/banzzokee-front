import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
import ViteReact from '@vitejs/plugin-react';
// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [react()],
  // optimizeDeps: {
  //   include: ['firebase'],
  //   allowNodeBuiltins: ['firebase']
  // }

  plugins: [ViteReact()],
  optimizeDeps: {
    include: ['firebase/app', 'firebase/messaging'],
  },
})
