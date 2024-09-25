/**
 * @author: gaoweixuan
 * @since: 2023-11-12
 */
import type { App, Component } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import SvgButton from '@/components//SvgButton/index.vue'

const components: { [name: string]: Component } = {
  SvgIcon,
  SvgButton,
}

export default {
  install(app: App) {
    /**
     * 自定义组件注册
     */
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key])
    })

    /**
     * 注册el-icon
     */
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
