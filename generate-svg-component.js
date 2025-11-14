/**
 * svg-to-vue.js
 * * Node.js 脚本：跑一下这个，能把 SVG 转成 Vue 组件，顺便生成一个动态加载的 index.vue。
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs/promises');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

// --- 配置路径 ---
const SVG_DIR = path.resolve(__dirname, 'src/assets/svg');
const OUTPUT_DIR = path.resolve(__dirname, 'src/components/j-c-svg');
const INDEX_FILE_PATH = path.join(OUTPUT_DIR, 'index.vue');

// 存一下所有生成的组件名，index.vue 要用
const componentNames = [];

/**
 * 把文件名转成 Vue 组件名 (格式: svgPascalCase)。
 * @param {string} filename SVG 文件名
 * @returns {string} 转换后的组件名 (例如: esim-list.svg -> svgEsimList)
 */
function toVueComponentName(filename) {
  // 移除 .svg 后缀
  const baseName = path.parse(filename).name;

  // 按 - _ . 或空格拆分，全转小写
  const parts = baseName.toLowerCase().split(/[-._\s]/);

  // 把 'esim', 'list' 转成 'Esim', 'List'
  const camelCased = parts
    .map((part) => {
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(''); // 拼接成 'EsimList'

  // 加上 'svg' 前缀，变成 'svgEsimList'
  return `svg${camelCased}`;
}

/**
 * 组装单个 Vue 组件的 .vue 文件内容
 * @param {string} svgContent 经过处理的 SVG 内容字符串
 * @param {string} componentName Vue 组件名
 * @returns {string} 完整的 Vue 组件字符串
 */
function generateSvgComponent(svgContent, componentName) {
  // 找到 <svg 标签，给它塞上 :style="cStyle"
  const templateContent = svgContent.replace(
    /<svg\s/i, // 匹配 <svg 开头 (不区分大小写)
    '<svg :style="cStyle" ' // 插入 :style
  );

  // Vue 组件模板字符串
  return `${`
<template>
${templateContent}
</template>

<script lang="ts">
import { defineComponent, computed, CSSProperties } from 'vue';

export default defineComponent({
  // 组件名
  name: '${componentName}',

  props: {
    // 颜色 props
    color: {
      type: String,
      default: 'currentColor', // 默认用 'currentColor'，跟着父元素走
    },
    // 尺寸 props
    size: {
      type: [String, Number],
      default: '24px', // 默认 24px
    },
    // 额外的样式，方便覆盖
    style: {
      type: [String, Object] as any, // 允许 String 或 CSSProperties
      default: () => ({}),
    },
  },

  setup(props) {
    // 计算最终的 style
    const cStyle = computed(() => {
      // 如果 size 是数字，自动加上 'px'
      const sizeValue = typeof props.size === 'number' ? \`\${props.size}px\` : props.size;
      const baseStyle: CSSProperties = {
        width: sizeValue,
        height: sizeValue,
        fill: props.color,
        stroke: props.color,
        color: props.color,
      };

      // 合并外部传进来的 style，它的优先级更高
      return { ...baseStyle, ...(props.style as CSSProperties) };
    });

    return {
      cStyle,
    };
  },
});
</script>
`.trim()}\n`;
}

/**
 * 生成 index.vue，这个文件用来动态加载所有图标
 * @param {string[]} names 所有生成的 SVG 组件名称数组
 */
async function generateIndexComponent(names) {
  console.log('\n开始生成 index.vue...');

  if (names.length === 0) {
    console.log('没找到组件名，index.vue 这次就不生成了。');
    return;
  }

  // 1. 生成 Import 语句
  const importStatements = names
    .map(
      (name) =>
        // 用 defineAsyncComponent 动态引入，搞按需加载
        `const ${name} = defineAsyncComponent(() => import('./${name}.vue'));`
    )
    .join('\n');

  // 2. 生成组件 Map
  // 把 'svgEsimList' 映射成 'esimlist'，外面用的时候传 'esimlist' 就行
  const componentMapEntries = names
    .map((name) => {
      // 移除 'svg' 前缀，首字母小写
      const key = name.startsWith('svg') ? name.slice(3).toLowerCase() : name.toLowerCase();
      return `  '${key}': ${name},`;
    })
    .join('\n');

  // 3. 完整的 index.vue 模板
  const indexContent = `${`
<template>
  <component :is="activeComponent" :color="color" :size="size" :style="style" />
</template>

<script lang="ts">
import { defineComponent, computed, defineAsyncComponent } from 'vue';

// --- 动态导入所有 SVG 组件 ---
${importStatements}

// 组件映射表：'name' prop值 -> 对应组件
const componentMap: any = {
${componentMapEntries}
};

export default defineComponent({
  name: 'jCsvg',

  inheritAttrs: false,

  props: {
    // 动态组件的名称，比如 'developer', 'esimlist'
    name: {
      type: String,
      required: true,
      validator: (val: string) => Object.keys(componentMap).includes(val.toLowerCase()),
    },
    // 颜色和尺寸 Prop 透传给内部 SVG 组件
    color: String,
    size: [String, Number],
    style: [String, Object],
  },

  setup(props, { attrs }) {
    // 根据 props.name 动态找组件
    const activeComponent = computed(() => {
      const componentKey = props.name.toLowerCase();
      const component = componentMap[componentKey];

      if (!component) {
        // 找不到组件就报个错
        console.error(\`[JCSvgIcon Error]: Component "\${props.name}" not found in map.\`);
      }
      return component;
    });

    return {
      activeComponent,
    };
  },
});
</script>
`.trim()}\n`;

  try {
    await fs.writeFile(INDEX_FILE_PATH, indexContent);
    console.log(`index.vue 生成好了: ${INDEX_FILE_PATH}`);
  } catch (err) {
    console.error(`生成 index.vue 失败了:`, err.message);
  }
}

/**
 * 清理输出目录，把老的 .vue 文件都删了
 */
async function cleanOutputDirectory() {
  console.log('\n开始清理旧的 .vue 文件...');
  try {
    const files = await fs.readdir(OUTPUT_DIR);
    const vueFiles = files.filter((file) => file.endsWith('.vue'));

    if (vueFiles.length === 0) {
      console.log('目标目录是空的，不用清理。');
      return;
    }

    for (const file of vueFiles) {
      const filePath = path.join(OUTPUT_DIR, file);
      await fs.unlink(filePath); // 删掉文件
    }
    console.log(`删掉了 ${vueFiles.length} 个旧文件。`);
  } catch (error) {
    // 目录不存在，也正常，下一步会创建
    if (error.code !== 'ENOENT') {
      console.error('清理目录失败:', error.message);
    } else {
      console.log('目标目录还不存在，跳过清理。');
    }
  }
}

/**
 * 主函数，跑起来
 */
async function processSvgs() {
  console.log('开始执行 SVG 转换 Vue 组件任务...');
  console.log(`SVG 源目录: ${SVG_DIR}`);
  console.log(`Vue 组件输出目录: ${OUTPUT_DIR}`);

  try {
    // 1. 确保输出目录存在
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    // 2. 先清理一遍旧文件
    await cleanOutputDirectory();

    // 3. 读 SVG 目录
    const files = await fs.readdir(SVG_DIR);
    // 过滤出 .svg 文件
    const svgFiles = files.filter((file) => file.endsWith('.svg'));

    if (svgFiles.length === 0) {
      console.log(`在 ${SVG_DIR} 没找到 .svg 文件，不干活了。`);
      return;
    }

    console.log(`\n找到了 ${svgFiles.length} 个 SVG 文件，开整...`);

    // 4. 循环处理
    for (const filename of svgFiles) {
      const svgFilePath = path.join(SVG_DIR, filename);
      const componentName = toVueComponentName(filename);

      // 存一下组件名，后面生成 index.vue 要用
      componentNames.push(componentName);

      const vueFileName = `${componentName}.vue`;
      const outputFilePath = path.join(OUTPUT_DIR, vueFileName);

      try {
        // 读 SVG 文件内容
        let svgContent = await fs.readFile(svgFilePath, 'utf8');

        // 删掉 XML 头和 DOCTYPE
        svgContent = svgContent.replace(/<\?xml[^>]*\?>\s*/i, '');
        svgContent = svgContent.replace(/<!DOCTYPE[^>]*>\s*/i, '');
        svgContent = svgContent.trim(); // 去掉前后空格

        // 生成 Vue 组件内容
        const vueComponentContent = generateSvgComponent(svgContent, componentName);

        // 写入 .vue 文件
        await fs.writeFile(outputFilePath, vueComponentContent);
        console.log(`转换成功: ${filename} -> ${vueFileName}`);
      } catch (err) {
        console.error(`处理 ${filename} 失败:`, err.message);
      }
    }

    // 5. 生成 index.vue
    await generateIndexComponent(componentNames);

    console.log('\n全部搞定！');
  } catch (error) {
    console.error('出大错了 (读写目录失败):', error.message);
  }
}

// 运行脚本
processSvgs();