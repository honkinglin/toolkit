import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录路径（ES 模块兼容）
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 工具配置映射
const toolsConfig = {
  // 加密工具
  bcrypt: {
    icon: 'Shield',
    category: 'crypto',
    featured: true,
  },
  'hash-text': {
    icon: 'Hash',
    category: 'crypto',
    featured: true,
  },
  'encrypt-decrypt-text': {
    icon: 'Lock',
    category: 'crypto',
    featured: false,
  },
  'hmac-generator': {
    icon: 'MessageSquare',
    category: 'crypto',
    featured: false,
  },
  'rsa-key-pair-generator': {
    icon: 'Key',
    category: 'crypto',
    featured: false,
  },
  'jwt-parser': {
    icon: 'FileJson',
    category: 'crypto',
    featured: false,
  },
  'basic-auth-generator': {
    icon: 'UserCheck',
    category: 'crypto',
    featured: false,
  },
  'otp-code-generator': {
    icon: 'Smartphone',
    category: 'crypto',
    featured: false,
  },

  // 生成器工具
  'token-generator': {
    icon: 'Shuffle',
    category: 'generator',
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
  'bip39-passphrase-generator': {
    icon: 'QrCode',
    category: 'generator',
    featured: false,
  },
  'password-strength-analyzer': {
    icon: 'Target',
    category: 'generator',
    featured: false,
  },
  'open-graph-generator': {
    icon: 'Globe',
    category: 'generator',
    featured: false,
  },

  // 转换工具
  'base64-string-encode-decode': {
    icon: 'Binary',
    category: 'converter',
    featured: true,
  },
  'base64-file-converter': {
    icon: 'File',
    category: 'converter',
    featured: false,
  },
  'case-converter': {
    icon: 'Type',
    category: 'converter',
    featured: false,
  },
  'date-time-converter': {
    icon: 'Clock',
    category: 'converter',
    featured: false,
  },
  'integer-base-converter': {
    icon: 'Calculator',
    category: 'converter',
    featured: false,
  },
  'roman-numeral-converter': {
    icon: 'Crown',
    category: 'converter',
    featured: false,
  },
  'text-to-ascii-binary': {
    icon: 'Binary',
    category: 'converter',
    featured: false,
  },
  'text-to-nato-alphabet': {
    icon: 'Radio',
    category: 'converter',
    featured: false,
  },
  'text-to-unicode': {
    icon: 'Languages',
    category: 'converter',
    featured: false,
  },
  'list-converter': {
    icon: 'List',
    category: 'converter',
    featured: false,
  },

  // 格式转换
  'json-to-yaml': {
    icon: 'FileText',
    category: 'format',
    featured: true,
  },
  'json-to-xml': {
    icon: 'Code',
    category: 'format',
    featured: false,
  },
  'json-to-toml': {
    icon: 'Settings',
    category: 'format',
    featured: false,
  },
  'yaml-to-json': {
    icon: 'FileJson',
    category: 'format',
    featured: false,
  },
  'yaml-to-toml': {
    icon: 'Settings',
    category: 'format',
    featured: false,
  },
  'xml-to-json': {
    icon: 'Code2',
    category: 'format',
    featured: false,
  },
  'toml-to-json': {
    icon: 'FileJson',
    category: 'format',
    featured: false,
  },
  'toml-to-yaml': {
    icon: 'FileText',
    category: 'format',
    featured: false,
  },
  'markdown-to-html': {
    icon: 'FileDown',
    category: 'format',
    featured: false,
  },

  // Web 工具
  'url-encoder-decoder': {
    icon: 'Link',
    category: 'web',
    featured: true,
  },
  'html-entities': {
    icon: 'Code',
    category: 'web',
    featured: false,
  },
  'url-parser': {
    icon: 'LinkIcon',
    category: 'web',
    featured: false,
  },
  'device-info': {
    icon: 'Smartphone',
    category: 'web',
    featured: false,
  },
  'mime-types': {
    icon: 'FileType',
    category: 'web',
    featured: false,
  },
  'user-agent-parser': {
    icon: 'Users',
    category: 'web',
    featured: false,
  },
  'http-status-codes': {
    icon: 'Globe',
    category: 'web',
    featured: false,
  },

  // 实用工具
  'json-diff': {
    icon: 'GitCompare',
    category: 'utility',
    featured: true,
  },
  'color-picker': {
    icon: 'Palette',
    category: 'utility',
    featured: true,
  },
  'keycode-info': {
    icon: 'Keyboard',
    category: 'utility',
    featured: false,
  },
  'html-wysiwyg-editor': {
    icon: 'Edit',
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
