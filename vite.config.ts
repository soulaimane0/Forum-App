import path from 'node:path'
import type { UserConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import dns from 'dns'

dns.setDefaultResultOrder('verbatim')
const config: UserConfig = {
  resolve: {
    alias: {
      '@': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Components({
      extensions: ['vue'],
      directoryAsNamespace: true,
      dts: true,
      globalNamespaces: ['global'],
      include: [/\.vue$/],
      // resolvers: [
      //   (name) => {
      //     if (name === 'MyCustom')
      //       return path.resolve(__dirname, 'src/CustomResolved.vue').replaceAll('\\', '/')
      //   },
      //   VantResolver(),
        
      // ],
    }),
  ],
  server: {
    host: 'localhost',
    port: 3000
  }
}

export default config