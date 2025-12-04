/* 自动生成颜色 SCSS 变量的脚本 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取颜色配置
const colorsPath = path.join(__dirname, 'src/config/colors.json');
const colors = JSON.parse(fs.readFileSync(colorsPath, 'utf-8'));

// 动态生成 SCSS 变量
const scssVariables = Object.entries(colors)
  .map(([key, value]) => `$${key}: ${value};`)
  .join('\n');

// 动态生成 $custom-colors map
const customColorsMap = Object.keys(colors)
  .map((key) => `  '${key}': $${key},`)
  .join('\n');

// 生成 SCSS 内容
const scssContent = `// ============================================
// 此文件由 generate-colors.js 自动生成
// 请勿手动修改，修改 src/config/colors.json 后运行 npm run build:colors
// ============================================

/* 颜色变量 */
${scssVariables}

/* 颜色映射 */
$custom-colors: (
${customColorsMap}
);
`;

// 写入 SCSS 文件
const outputPath = path.join(__dirname, 'src/css/lib/_vars-color.scss');
fs.writeFileSync(outputPath, scssContent, 'utf-8');

console.log('Colors SCSS file generated successfully!');