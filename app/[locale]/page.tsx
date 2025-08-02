import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { 
  Shuffle, 
  Hash, 
  Shield, 
  Fingerprint, 
  Snowflake, 
  Lock, 
  QrCode, 
  MessageSquare,
  Key,
  FileText,
  Calendar,
  RotateCcw,
  Binary,
  FileImage,
  Image
} from "lucide-react";

// 工具数据定义
const tools = [
  {
    id: "token-generator",
    title: "Token 生成器",
    description: "使用您想要的字符，大写或小写字母，数字和/或符号生成随机字符串。",
    icon: Shuffle,
    category: "生成器",
    href: "/token-generator",
    featured: true
  },
  {
    id: "hash-text",
    title: "Hash 文本",
    description: "使用所需的函数哈希文本字符串：MD5、SHA1、SHA256、SHA224、SHA512...",
    icon: Hash,
    category: "加密",
    href: "/hash-text"
  },
  {
    id: "encryption",
    title: "加密",
    description: "使用bcrypt对文本字符串进行哈希和比较。Bcrypt是一个基于Blowfish密码的密码哈希函数...",
    icon: Shield,
    category: "加密",
    href: "/encryption"
  },
  {
    id: "uuid-generator",
    title: "UUIDs 生成器",
    description: "通用唯一标识符（UUID）是一个128位数字，用于标识计算机系统中的信息。可能的UUID数量...",
    icon: Fingerprint,
    category: "生成器",
    href: "/uuid-generator"
  },
  {
    id: "ulid-generator",
    title: "ULID 生成器",
    description: "生成随机的通用唯一一词典可排序标识符（ULID）",
    icon: Snowflake,
    category: "生成器",
    href: "/ulid-generator"
  },
  {
    id: "encrypt-decrypt-text",
    title: "加密/解密文本",
    description: "使用加密算法（如AES、TripleDES、Rabbit或RC4）加密和解密文本明文。",
    icon: Lock,
    category: "加密",
    href: "/encrypt-decrypt-text"
  },
  {
    id: "bip39-generator",
    title: "BIP39密码生成器",
    description: "从现有或随机助记词生成BIP39密码短语，或从密码短语获取助记词。",
    icon: QrCode,
    category: "生成器",
    href: "/bip39-generator"
  },
  {
    id: "hmac-generator",
    title: "Hmac 生成器",
    description: "使用密钥和基于哈希的希希算法计算基于哈希的消息身份验证代码（HMAC）。",
    icon: MessageSquare,
    category: "加密",
    href: "/hmac-generator"
  },
  {
    id: "rsa-key-pair-generator",
    title: "RSA密钥对生成器",
    description: "生成新的随机RSA私钥和公钥pem证书。",
    icon: Key,
    category: "生成器",
    href: "/rsa-key-pair-generator"
  },
  {
    id: "password-strength-analyzer",
    title: "密码强度分析仪",
    description: "使用此密码强度分析器和破解时间估算工具来发现密码的强度。",
    icon: Shield,
    category: "安全",
    href: "/password-strength-analyzer"
  },
  {
    id: "pdf-signature-checker",
    title: "PDF签名检查器",
    description: "验证PDF文件的签名。签名的PDF文件包含一个或多个签名，可用于确定文件的内容在签名后...",
    icon: FileText,
    category: "文档",
    href: "/pdf-signature-checker"
  },
  {
    id: "date-time-converter",
    title: "日期时间转换器",
    description: "将日期和时间转换为各种不同的格式",
    icon: Calendar,
    category: "转换器",
    href: "/date-time-converter"
  },
  {
    id: "integer-base-converter",
    title: "整数基转换器",
    description: "在不同的基数（十进制、十六进制、二进制、八进制、base64...）之间转换数字",
    icon: RotateCcw,
    category: "转换器",
    href: "/integer-base-converter"
  },
  {
    id: "roman-numeral-converter",
    title: "罗马数字转换器",
    description: "将罗马数字换为数字，并将数字转换为罗马数字。",
    icon: Binary,
    category: "转换器",
    href: "/roman-numeral-converter"
  },
  {
    id: "base64-string-converter",
    title: "Base64 字符串编码/解码",
    description: "将字符串编码和解码为其 Base64 格式表示形式即可。",
    icon: FileText,
    category: "转换器",
    href: "/base64-string-converter"
  },
  {
    id: "base64-file-converter",
    title: "Base64 文件转换器",
    description: "将字符串、文件或图像转换为其 Base64 表示形式。",
    icon: FileImage,
    category: "转换器",
    href: "/base64-file-converter"
  }
];

// 获取分类
const categories = Array.from(new Set(tools.map(tool => tool.category)));

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="border-b bg-muted/40">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            开发者工具集合
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            为开发者和技术人员提供的实用工具集合
          </p>
          <p className="text-muted-foreground">
            包含加密解密、数据转换、代码生成等多种实用工具
          </p>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="container mx-auto px-4 py-12">
        {/* 特色工具 */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <span className="text-primary">⭐</span>
            特色工具
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.filter(tool => tool.featured).map((tool) => (
              <ToolCard key={tool.id} tool={tool} featured />
            ))}
          </div>
        </div>

        {/* 按分类展示工具 */}
        {categories.map((category) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tools
                .filter(tool => tool.category === category && !tool.featured)
                .map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
            </div>
          </div>
        ))}

        {/* 统计信息 */}
        <div className="mt-16 pt-8 border-t">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">{tools.length}</div>
              <div className="text-muted-foreground">总工具数</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">{categories.length}</div>
              <div className="text-muted-foreground">工具分类</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">免费使用</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">随时可用</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 工具卡片组件
function ToolCard({ tool, featured = false }: { tool: typeof tools[0], featured?: boolean }) {
  const Icon = tool.icon;
  
  return (
    <Link href={tool.href} className="group">
      <Card className={`h-full transition-all hover:shadow-lg hover:-translate-y-1 ${
        featured ? 'border-primary/50 bg-primary/5' : ''
      }`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                featured ? 'bg-primary/10' : 'bg-muted'
              }`}>
                <Icon className={`h-5 w-5 ${
                  featured ? 'text-primary' : 'text-muted-foreground'
                }`} />
              </div>
              <div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {tool.title}
                </CardTitle>
                <Badge variant="secondary" className="mt-1">
                  {tool.category}
                </Badge>
              </div>
            </div>
            {featured && (
              <Badge variant="default" className="text-xs">
                推荐
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm leading-relaxed">
            {tool.description}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}