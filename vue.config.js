const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
      styles: {
        configFile: 'src/assets/styles/style.scss',
      },
		}
  },

  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @use "@/assets/styles/variables" as *;
          @use "@/assets/styles/mixins" as *;
        `
      }
    }
  }
})
