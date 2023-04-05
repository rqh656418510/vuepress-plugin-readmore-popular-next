import { defineClientConfig } from '@vuepress/client'
import { useReadmorePlugin } from './composables/index.js'

export default defineClientConfig({
    setup() {
        useReadmorePlugin()
    },
})
