import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import {resolve} from 'path';

export default defineConfig({
    plugins: [
        vue(),
        dts({
            // 合并所有类型声明到单个文件，减小体积
            rollupTypes: true,
            tsconfigPath: './tsconfig.json',
            // 优化类型文件生成
            insertTypesEntry: true,
            copyDtsFiles: false,
            // 排除不必要的文件
            exclude: ['**/*.spec.ts', '**/*.test.ts', '**/tests/**'],
            // 静态导入，提升性能
            staticImport: true,
            // 清理输出目录
            cleanVueFileName: true,
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
        // 启用压缩 (esbuild 更快，terser 更小)
        minify: 'esbuild',
        // CSS 压缩
        cssMinify: true,
        // 启用 source map (可选，用于调试)
        sourcemap: false,
        lib: {
            // 指定打包入口文件
            entry: {
                index: resolve(__dirname, 'src/index.ts'),
                charts: resolve(__dirname, 'src/charts.ts'),
                'rtcpt-styles': resolve(__dirname, 'src/rtcpt-styles.js'),
            },
            // 包名，对应 package.json 中的 name
            name: 'rtcpt',
            // 打包后的文件名
            fileName: (format, entryName) => {
                if (entryName === 'rtcpt-styles') {
                    return 'rtcpt-styles.js';
                }
                if (entryName === 'charts') {
                    return `charts.${format}.js`;
                }
                return `rtcpt.${format}.js`;
            },
        },
        cssCodeSplit: true, // 允许分割 CSS，按需加载
        rollupOptions: {
            // 确保外部化处理那些不想打包进库的依赖
            external: ['vue', 'quasar', 'chart.js', 'chart.js/auto'],
            output: {
                // 在 UMD/IIFE 构建模式下，为外部化的依赖提供全局变量
                globals: {
                    vue: 'Vue',
                    quasar: 'Quasar',
                    'chart.js': 'Chart',
                    'chart.js/auto': 'Chart',
                },
                // 优化输出文件名
                assetFileNames: (assetInfo) => {
                    // CSS 文件命名
                    if (assetInfo.name?.endsWith('.css')) {
                        return '[name].css';
                    }
                    return 'assets/[name]-[hash][extname]';
                },
            },
            // 启用 Rollup treeshake
            treeshake: {
                moduleSideEffects: 'no-external',
                propertyReadSideEffects: false,
                tryCatchDeoptimization: false,
            },
        },
        // 优化 chunk 大小警告阈值
        chunkSizeWarningLimit: 1000,
    },
    // CSS 优化
    css: {
        postcss: {
            plugins: [
                // 可以添加 autoprefixer, cssnano 等插件
            ],
        },
    },
});
