import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import {resolve} from 'path';

export default defineConfig({
    plugins: [
        vue(),
        dts({
            rollupTypes: true,
            tsconfigPath: './tsconfig.json'
        })
    ],
    resolve: {
        alias: {
            'src': resolve(__dirname, 'src'),
            'components': resolve(__dirname, 'src/components'),
        }
    },
    build: {
        lib: {
            // 指定打包入口文件，即我们前面创建的 index.js
            entry: resolve(__dirname, 'src/index.ts'),
            // 包名，对应 package.json 中的 name
            name: 'rtcpt',
            // 打包后的文件名
            fileName: (format) => `rtcpt.${format}.js`,
        },
        rollupOptions: {
            // 确保外部化处理那些不想打包进库的依赖
            // Quasar 和 Vue 是最常见的外部依赖
            external: ['vue', 'quasar'],
            output: {
                // 在 UMD/IIFE 构建模式下，为外部化的依赖提供全局变量
                globals: {
                    vue: 'Vue',
                    quasar: 'Quasar',
                },
            },
        },
    },
});
