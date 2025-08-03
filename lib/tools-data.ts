// 此文件由脚本自动生成，请勿手动修改
import { 
  File,
  Binary,
  UserCheck,
  Shield,
  QrCode,
  Type,
  Calculator,
  Palette,
  Clock,
  Smartphone,
  Lock,
  Hash,
  MessageSquare,
  Code,
  Edit,
  Globe,
  Network,
  Expand,
  Archive,
  GitCompare,
  Table,
  Settings,
  FileText,
  FileJson,
  Keyboard,
  List,
  Shuffle,
  Search,
  FileDown,
  FileType,
  Target,
  Crown,
  Key,
  Database,
  Image,
  Radio,
  Languages,
  Snowflake,
  Link,
  LinkIcon,
  Users,
  Fingerprint,
  Wifi,
  Code2
} from 'lucide-react';

export interface Tool {
  id: string;
  icon: React.ComponentType;
  category: string;
  featured: boolean;
  href: string;
}

export const implementedTools: Tool[] = [
  {
    id: "base64-file-converter",
    icon: File,
    category: "converter",
    featured: false,
    href: "/base64-file-converter"
  },
  {
    id: "base64-string-encode-decode",
    icon: Binary,
    category: "converter",
    featured: true,
    href: "/base64-string-encode-decode"
  },
  {
    id: "basic-auth-generator",
    icon: UserCheck,
    category: "crypto",
    featured: false,
    href: "/basic-auth-generator"
  },
  {
    id: "bcrypt",
    icon: Shield,
    category: "crypto",
    featured: true,
    href: "/bcrypt"
  },
  {
    id: "bip39-passphrase-generator",
    icon: QrCode,
    category: "generator",
    featured: false,
    href: "/bip39-passphrase-generator"
  },
  {
    id: "case-converter",
    icon: Type,
    category: "converter",
    featured: false,
    href: "/case-converter"
  },
  {
    id: "chmod-calculator",
    icon: Calculator,
    category: "utility",
    featured: false,
    href: "/chmod-calculator"
  },
  {
    id: "color-picker",
    icon: Palette,
    category: "utility",
    featured: true,
    href: "/color-picker"
  },
  {
    id: "crontab-expression-generator",
    icon: Clock,
    category: "utility",
    featured: false,
    href: "/crontab-expression-generator"
  },
  {
    id: "date-time-converter",
    icon: Clock,
    category: "converter",
    featured: false,
    href: "/date-time-converter"
  },
  {
    id: "device-info",
    icon: Smartphone,
    category: "web",
    featured: false,
    href: "/device-info"
  },
  {
    id: "encrypt-decrypt-text",
    icon: Lock,
    category: "crypto",
    featured: false,
    href: "/encrypt-decrypt-text"
  },
  {
    id: "hash-text",
    icon: Hash,
    category: "crypto",
    featured: true,
    href: "/hash-text"
  },
  {
    id: "hmac-generator",
    icon: MessageSquare,
    category: "crypto",
    featured: false,
    href: "/hmac-generator"
  },
  {
    id: "html-entities",
    icon: Code,
    category: "web",
    featured: false,
    href: "/html-entities"
  },
  {
    id: "html-wysiwyg-editor",
    icon: Edit,
    category: "utility",
    featured: false,
    href: "/html-wysiwyg-editor"
  },
  {
    id: "http-status-codes",
    icon: Globe,
    category: "web",
    featured: false,
    href: "/http-status-codes"
  },
  {
    id: "integer-base-converter",
    icon: Calculator,
    category: "converter",
    featured: false,
    href: "/integer-base-converter"
  },
  {
    id: "ipv4-address-converter",
    icon: Network,
    category: "network",
    featured: false,
    href: "/ipv4-address-converter"
  },
  {
    id: "ipv4-network-calculator",
    icon: Calculator,
    category: "network",
    featured: false,
    href: "/ipv4-network-calculator"
  },
  {
    id: "ipv4-range-expander",
    icon: Expand,
    category: "network",
    featured: false,
    href: "/ipv4-range-expander"
  },
  {
    id: "ipv6-ula-generator",
    icon: Globe,
    category: "network",
    featured: false,
    href: "/ipv6-ula-generator"
  },
  {
    id: "json-beautify-format",
    icon: Code,
    category: "format",
    featured: false,
    href: "/json-beautify-format"
  },
  {
    id: "json-compress",
    icon: Archive,
    category: "format",
    featured: false,
    href: "/json-compress"
  },
  {
    id: "json-diff",
    icon: GitCompare,
    category: "utility",
    featured: true,
    href: "/json-diff"
  },
  {
    id: "json-to-csv",
    icon: Table,
    category: "format",
    featured: false,
    href: "/json-to-csv"
  },
  {
    id: "json-to-toml",
    icon: Settings,
    category: "format",
    featured: false,
    href: "/json-to-toml"
  },
  {
    id: "json-to-xml",
    icon: Code,
    category: "format",
    featured: false,
    href: "/json-to-xml"
  },
  {
    id: "json-to-yaml",
    icon: FileText,
    category: "format",
    featured: true,
    href: "/json-to-yaml"
  },
  {
    id: "jwt-parser",
    icon: FileJson,
    category: "crypto",
    featured: false,
    href: "/jwt-parser"
  },
  {
    id: "keycode-info",
    icon: Keyboard,
    category: "utility",
    featured: false,
    href: "/keycode-info"
  },
  {
    id: "list-converter",
    icon: List,
    category: "converter",
    featured: false,
    href: "/list-converter"
  },
  {
    id: "mac-address-generator",
    icon: Shuffle,
    category: "network",
    featured: false,
    href: "/mac-address-generator"
  },
  {
    id: "mac-address-lookup",
    icon: Search,
    category: "network",
    featured: false,
    href: "/mac-address-lookup"
  },
  {
    id: "markdown-to-html",
    icon: FileDown,
    category: "format",
    featured: false,
    href: "/markdown-to-html"
  },
  {
    id: "mime-types",
    icon: FileType,
    category: "web",
    featured: false,
    href: "/mime-types"
  },
  {
    id: "open-graph-generator",
    icon: Globe,
    category: "generator",
    featured: false,
    href: "/open-graph-generator"
  },
  {
    id: "otp-code-generator",
    icon: Smartphone,
    category: "crypto",
    featured: false,
    href: "/otp-code-generator"
  },
  {
    id: "password-strength-analyzer",
    icon: Target,
    category: "generator",
    featured: false,
    href: "/password-strength-analyzer"
  },
  {
    id: "qr-code-generator",
    icon: QrCode,
    category: "utility",
    featured: false,
    href: "/qr-code-generator"
  },
  {
    id: "roman-numeral-converter",
    icon: Crown,
    category: "converter",
    featured: false,
    href: "/roman-numeral-converter"
  },
  {
    id: "rsa-key-pair-generator",
    icon: Key,
    category: "crypto",
    featured: false,
    href: "/rsa-key-pair-generator"
  },
  {
    id: "sql-beautify-format",
    icon: Database,
    category: "format",
    featured: false,
    href: "/sql-beautify-format"
  },
  {
    id: "svg-placeholder-generator",
    icon: Image,
    category: "utility",
    featured: false,
    href: "/svg-placeholder-generator"
  },
  {
    id: "text-to-ascii-binary",
    icon: Binary,
    category: "converter",
    featured: false,
    href: "/text-to-ascii-binary"
  },
  {
    id: "text-to-nato-alphabet",
    icon: Radio,
    category: "converter",
    featured: false,
    href: "/text-to-nato-alphabet"
  },
  {
    id: "text-to-unicode",
    icon: Languages,
    category: "converter",
    featured: false,
    href: "/text-to-unicode"
  },
  {
    id: "token-generator",
    icon: Shuffle,
    category: "generator",
    featured: true,
    href: "/token-generator"
  },
  {
    id: "toml-to-json",
    icon: FileJson,
    category: "format",
    featured: false,
    href: "/toml-to-json"
  },
  {
    id: "toml-to-yaml",
    icon: FileText,
    category: "format",
    featured: false,
    href: "/toml-to-yaml"
  },
  {
    id: "ulid-generator",
    icon: Snowflake,
    category: "generator",
    featured: false,
    href: "/ulid-generator"
  },
  {
    id: "url-encoder-decoder",
    icon: Link,
    category: "web",
    featured: true,
    href: "/url-encoder-decoder"
  },
  {
    id: "url-parser",
    icon: LinkIcon,
    category: "web",
    featured: false,
    href: "/url-parser"
  },
  {
    id: "user-agent-parser",
    icon: Users,
    category: "web",
    featured: false,
    href: "/user-agent-parser"
  },
  {
    id: "uuids-generator",
    icon: Fingerprint,
    category: "generator",
    featured: false,
    href: "/uuids-generator"
  },
  {
    id: "wifi-qr-code-generator",
    icon: Wifi,
    category: "utility",
    featured: false,
    href: "/wifi-qr-code-generator"
  },
  {
    id: "xml-to-json",
    icon: Code2,
    category: "format",
    featured: false,
    href: "/xml-to-json"
  },
  {
    id: "yaml-to-json",
    icon: FileJson,
    category: "format",
    featured: false,
    href: "/yaml-to-json"
  },
  {
    id: "yaml-to-toml",
    icon: Settings,
    category: "format",
    featured: false,
    href: "/yaml-to-toml"
  }
];

export const categories = Array.from(new Set(implementedTools.map(tool => tool.category)));
