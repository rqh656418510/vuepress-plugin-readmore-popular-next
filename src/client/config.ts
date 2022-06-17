import { defineClientConfig } from '@vuepress/client'
import { useReadmore } from './composables'

export default defineClientConfig({
    setup() {
        useReadmore()
    },
})
