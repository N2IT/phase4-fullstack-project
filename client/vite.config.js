import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'; // Ensure this import is at the top

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // build: {
  //   assetsDir: "static",
  // },
  server: {
    // changes our vite to launch out of port 3000
    port: 3000,
    // this allows the app to be accessed from outside the localhost 
    cors:true,
    // we write our fetches to /api/route and it will go through this proxy
    // PROXY ONLY WORKS IN DEVELOPMENT AND WONT WORK IN PRODUCTION/DEPLOYED
    proxy: {
      "/api":{
        // we can adjust the target based on our backend port
        target: "http://127.0.0.1:5000",
        changeOrigin:true,
        secure: false,
        rewrite: (path)=>path.replace(/^\/api/,"")
      }
    }
  }
})