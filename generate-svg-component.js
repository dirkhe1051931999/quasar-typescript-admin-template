/**
 * svg-to-vue.js
 * * Node.js 脚本：将 SVG 转换为 Vue 组件，并生成一个动态加载的 index.vue 组件。
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs/promises');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

// --- 配置路径 ---
const SVG_DIR = path.resolve(__dirname, 'src/assets/svg');
const OUTPUT_DIR = path.resolve(__dirname, 'src/components/j-c-svg');
const INDEX_FILE_PATH = path.join(OUTPUT_DIR, 'index.vue');

// 存储所有生成的组件名称，用于生成 index.vue
const componentNames = [];

/**
 * 将文件名转换为符合 Vue 组件规范的命名 (PascalCase 或 camelCase)。
 * 例如: esim-list.svg -> svgEsimList
 * * @param {string} filename SVG 文件名
 * @returns {string} 转换后的组件名
 */
function toVueComponentName(filename) {
  // 移除文件扩展名
  const baseName = path.parse(filename).name;

  // 替换特殊字符 (如 - _ .) 为空格，然后进行驼峰转换
  const parts = baseName.toLowerCase().split(/[-._\s]/);

  // 将每个部分的首字母大写，并拼接
  const camelCased = parts
    .map((part) => {
      // 如果是第一个部分，首字母不应该大写，除非它是缩写（这里遵循'svgDeveloper'的格式，所以强制第一个字母小写，其余大写）
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join('');

  // 添加 'svg' 前缀，并确保第一个字母小写
  // 转换为 svgEsimList 这种形式
  return `svg${camelCased}`;
}

/**
 * 生成单个 Vue 组件内容
 * * @param {string} svgContent 经过处理的 SVG 内容字符串
 * @param {string} componentName Vue 组件名
 * @returns {string} 完整的 Vue 组件字符串
 */
function generateSvgComponent(svgContent, componentName) {
  // 插入 :style="cStyle" 到 SVG 根标签
  const templateContent = svgContent.replace(
    /<svg\s/i, // 匹配 <svg 开头 (不区分大小写)
    '<svg :style="cStyle" ' // 插入 :style="cStyle"
  );

  // Vue 组件模板
  return `${`
<template>
${templateContent}
</template>

<script lang="ts">
import { defineComponent, computed, CSSProperties } from 'vue';

export default defineComponent({
  // 组件名称基于文件名自动生成
  name: '${componentName}',
  
  props: {
    // 颜色 props，允许外部传入颜色
    color: {
      type: String,
      default: 'currentColor', // 默认使用 currentColor
    },
    // 尺寸 props，允许外部传入尺寸
    size: {
      type: [String, Number],
      default: '24px', // 默认 24px
    },
    // 额外的样式，用于覆盖或添加
    style: {
      type: [String, Object] as any, // 允许 String 或 CSSProperties
      default: () => ({}),
    }
  },

  setup(props) {
    // 计算样式，用于绑定到 SVG 根元素的 :style
    const cStyle = computed(() => {
      const sizeValue = typeof props.size === 'number' ? \`\${props.size}px\` : props.size;
      const baseStyle: CSSProperties = {
        width: sizeValue,
        height: sizeValue,
        fill: props.color,
        stroke: props.color,
        color: props.color,
      };
      
      // 合并外部传入的 style
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
 * 生成 j-c-svg/index.vue 动态组件
 * * @param {string[]} names 所有生成的 SVG 组件名称数组
 */
async function generateIndexComponent(names) {
  console.log(`\n--- 📦 开始生成 index.vue 动态组件 ---`);

  if (names.length === 0) {
    console.log('⚠️ 没有可用的 SVG 组件名，跳过 index.vue 生成。');
    return;
  }

  // 1. 生成 Import 语句列表
  const importStatements = names
    .map(
      (name) =>
        // 使用动态 import，实现按需加载
        `const ${name} = defineAsyncComponent(() => import('./${name}.vue'));`
    )
    .join('\n');

  // 2. 生成 Component Map
  // 将 svgDeveloper 映射到 developer
  const componentMapEntries = names
    .map((name) => {
      // 移除 'svg' 前缀，将首字母小写，作为外部调用的 name prop 值
      const key = name.startsWith('svg') ? name.slice(3).toLowerCase() : name.toLowerCase();
      return `  '${key}': ${name},`;
    })
    .join('\n');

  // 3. 完整的 Vue 组件模板
  const indexContent = `${`
<template>
  <component :is="activeComponent" :color="color" :size="size" :style="style" />
</template>

<script lang="ts">
import { defineComponent, computed, defineAsyncComponent } from 'vue';

// --- 动态导入所有 SVG 组件 ---
${importStatements}

// 组件映射表：'name' prop值 -> 对应组件
const componentMap:any = {
${componentMapEntries}
};

export default defineComponent({
  name: 'JCvgIcon', // 统一的组件名

  // 禁用属性继承，由我们手动透传给动态组件
  inheritAttrs: false,

  props: {
    // 动态组件的名称，如 'developer', 'esimlist'
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
    // 根据 props.name 动态查找对应的组件
    const activeComponent = computed(() => {
      const componentKey = props.name.toLowerCase();
      const component = componentMap[componentKey];

      if (!component) {
        console.error(\`[JCSvgIcon Error]: Component "\${props.name}" not found in map.\`);
      }
      return component;
    });

    return {
      activeComponent,
      // $attrs 会自动包含未声明的props，如 color/size/style，并透传给 <component>
    };
  },
});
</script>
`.trim()}\n`;

  try {
    await fs.writeFile(INDEX_FILE_PATH, indexContent);
    console.log(`✅ index.vue 生成成功: ${INDEX_FILE_PATH}`);
  } catch (err) {
    console.error(`❌ 生成 index.vue 失败:`, err.message);
  }
}

/**
 * 核心处理函数
 */
async function processSvgs() {
  console.log(`--- 🚀 开始转换 SVG 到 Vue 组件 ---`);
  console.log(`输入目录: ${SVG_DIR}`);
  console.log(`输出目录: ${OUTPUT_DIR}`);

  try {
    // 1. 确保输出目录存在
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    // 2. 读取 SVG 目录下的所有文件
    const files = await fs.readdir(SVG_DIR);
    const svgFiles = files.filter((file) => file.endsWith('.svg'));

    if (svgFiles.length === 0) {
      console.log(`❌ 在 ${SVG_DIR} 中未找到任何 SVG 文件。`);
      return;
    }

    console.log(`找到 ${svgFiles.length} 个 SVG 文件，开始转换...`);

    // 3. 循环处理每个 SVG 文件
    for (const filename of svgFiles) {
      const svgFilePath = path.join(SVG_DIR, filename);
      const componentName = toVueComponentName(filename);

      // 记录组件名
      componentNames.push(componentName);

      const vueFileName = `${componentName}.vue`;
      const outputFilePath = path.join(OUTPUT_DIR, vueFileName);

      try {
        // 读取 SVG 内容
        let svgContent = await fs.readFile(svgFilePath, 'utf8');

        // 移除 XML 声明和 DOCTYPE
        svgContent = svgContent.replace(/<\?xml[^>]*\?>\s*/i, '');
        svgContent = svgContent.replace(/<!DOCTYPE[^>]*>\s*/i, '');
        svgContent = svgContent.trim();

        // 生成 Vue 组件内容
        const vueComponentContent = generateSvgComponent(svgContent, componentName);

        // 写入文件
        await fs.writeFile(outputFilePath, vueComponentContent);
        console.log(`✅ 成功转换: ${filename} -> ${vueFileName} (Name: ${componentName})`);
      } catch (err) {
        console.error(`❌ 处理文件 ${filename} 失败:`, err.message);
      }
    }

    // 4. 生成 index.vue 动态组件
    await generateIndexComponent(componentNames);

    console.log(`--- 🎉 所有文件生成完成！ ---`);
  } catch (error) {
    console.error('致命错误 (无法读取目录或创建目录):', error.message);
  }
}

// 运行脚本
processSvgs();