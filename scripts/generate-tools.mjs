import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录路径（ES 模块兼容）
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 工具配置映射
const toolsConfig = {
  'token-generator': {
    icon: 'Shuffle',
    category: 'generator',
    featured: true,
  },
  'hash-text': {
    icon: 'Hash',
    category: 'crypto',
    featured: true,
  },
  bcrypt: {
    icon: 'Shield',
    category: 'crypto',
    featured: true,
  },
  'uuids-generator': {
    icon: 'Fingerprint',
    category: 'generator',
    featured: false,
  },
  'ulid-generator': {
    icon: 'Snowflake',
    category: 'generator',
    featured: false,
  },
  'encrypt-decrypt-text': {
    icon: 'Lock',
    category: 'crypto',
    featured: false,
  },
  'bip39-generator': {
    icon: 'QrCode',
    category: 'generator',
    featured: false,
  },
  'hmac-generator': {
    icon: 'MessageSquare',
    category: 'crypto',
    featured: false,
  },
  'rsa-key-pair-generator': {
    icon: 'Key',
    category: 'generator',
    featured: false,
  },
  'password-strength-analyzer': {
    icon: 'Target',
    category: 'security',
    featured: false,
  },
  'keycode-info': {
    icon: 'Keyboard',
    category: 'utility',
    featured: false,
  },
  'html-wysiwyg-editor': {
    icon: 'FileText',
    category: 'utility',
    featured: false,
  },
};

// 扫描已实现的工具
function scanImplementedTools() {
  const appDir = path.join(__dirname, '../app/[locale]');
  const implementedTools = [];

  try {
    const items = fs.readdirSync(appDir);

    for (const item of items) {
      const itemPath = path.join(appDir, item);
      const stat = fs.statSync(itemPath);

      // 检查是否是目录且包含 page.tsx
      if (stat.isDirectory() && item !== 'globals.css') {
        const pagePath = path.join(itemPath, 'page.tsx');
        if (fs.existsSync(pagePath)) {
          // 检查是否在工具配置中
          if (toolsConfig[item]) {
            implementedTools.push({
              id: item,
              ...toolsConfig[item],
            });
          }
        }
      }
    }

    return implementedTools;
  } catch (error) {
    console.error('扫描工具目录失败:', error);
    return [];
  }
}

// 生成工具数据文件
function generateToolsData() {
  const implementedTools = scanImplementedTools();

  // 获取所有用到的图标
  const icons = [...new Set(implementedTools.map((tool) => tool.icon))];

  // 生成 TypeScript 文件
  const tsContent = `// 此文件由脚本自动生成，请勿手动修改
import { 
  ${icons.join(',\n  ')}
} from 'lucide-react';

export interface Tool {
  id: string;
  icon: React.ComponentType;
  category: string;
  featured: boolean;
  href: string;
}

export const implementedTools: Tool[] = [
${implementedTools
  .map(
    (tool) => `  {
    id: "${tool.id}",
    icon: ${tool.icon},
    category: "${tool.category}",
    featured: ${tool.featured},
    href: "/${tool.id}"
  }`
  )
  .join(',\n')}
];

export const categories = Array.from(new Set(implementedTools.map(tool => tool.category)));
`;

  // 写入文件
  const outputPath = path.join(__dirname, '../lib/tools-data.ts');
  fs.writeFileSync(outputPath, tsContent);

  console.log(`✅ 生成工具数据文件: ${outputPath}`);
  console.log(`📊 发现 ${implementedTools.length} 个已实现的工具:`);
  implementedTools.forEach((tool) => {
    console.log(`   - ${tool.id} (${tool.category}${tool.featured ? ', 特色' : ''})`);
  });
}

// 运行脚本
generateToolsData();
