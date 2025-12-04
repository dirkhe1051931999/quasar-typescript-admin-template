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
        watch: {
            // 配置 watch 选项，确保监听所有依赖
            include: ['src/**'],
        },
        lib: {
            // 指定打包入口文件
            entry: {
                index: resolve(__dirname, 'src/index.ts'),
                style: resolve(__dirname, 'src/style.js'),
            },
            // 包名，对应 package.json 中的 name
            name: 'rtcpt',
            // 打包后的文件名
            fileName: (format, entryName) => {
                if (entryName === 'style') {
                    return 'style.js';
                }
                return `rtcpt.${format}.js`;
            },
        },
        cssCodeSplit: true, // 改为 true，允许分割 CSS
        rollupOptions: {
            // 确保外部化处理那些不想打包进库的依赖
            // Quasar 和 Vue 是最常见的外部依赖
            external: ['vue', 'quasar', 'chart.js', 'chart.js/auto'],
            output: {
                // 在 UMD/IIFE 构建模式下，为外部化的依赖提供全局变量
                globals: {
                    vue: 'Vue',
                    quasar: 'Quasar',
                    'chart.js': 'Chart',
                    'chart.js/auto': 'Chart',
                },
            },
        },
    },
});
