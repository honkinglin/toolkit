// 此文件由脚本自动生成，请勿手动修改
import {
  Shield,
  Lock,
  Hash,
  MessageSquare,
  Keyboard,
  Target,
  Key,
  Shuffle,
  Snowflake,
  Fingerprint,
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
    id: 'bcrypt',
    icon: Shield,
    category: 'crypto',
    featured: true,
    href: '/bcrypt',
  },
  {
    id: 'encrypt-decrypt-text',
    icon: Lock,
    category: 'crypto',
    featured: false,
    href: '/encrypt-decrypt-text',
  },
  {
    id: 'hash-text',
    icon: Hash,
    category: 'crypto',
    featured: true,
    href: '/hash-text',
  },
  {
    id: 'hmac-generator',
    icon: MessageSquare,
    category: 'crypto',
    featured: false,
    href: '/hmac-generator',
  },
  {
    id: 'keycode-info',
    icon: Keyboard,
    category: 'utility',
    featured: false,
    href: '/keycode-info',
  },
  {
    id: 'password-strength-analyzer',
    icon: Target,
    category: 'security',
    featured: false,
    href: '/password-strength-analyzer',
  },
  {
    id: 'rsa-key-pair-generator',
    icon: Key,
    category: 'generator',
    featured: false,
    href: '/rsa-key-pair-generator',
  },
  {
    id: 'token-generator',
    icon: Shuffle,
    category: 'generator',
    featured: true,
    href: '/token-generator',
  },
  {
    id: 'ulid-generator',
    icon: Snowflake,
    category: 'generator',
    featured: false,
    href: '/ulid-generator',
  },
  {
    id: 'uuids-generator',
    icon: Fingerprint,
    category: 'generator',
    featured: false,
    href: '/uuids-generator',
  },
];

export const categories = Array.from(new Set(implementedTools.map((tool) => tool.category)));
