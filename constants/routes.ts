import {
  Key,
  Hash,
  Shield,
  Copy,
  RefreshCw,
  Lock,
  Shuffle,
  GitBranch,
  KeyRound,
  ShieldCheck,
  FileText,
  LucideIcon
} from 'lucide-react';

// 路由路径常量
export const ROUTES = {
  CRYPTO: {
    TOKEN_GENERATOR: '/token-generator',
    HASH_TEXT: '/hash-text',
    BCRYPT: '/bcrypt',
    UUIDS_GENERATOR: '/uuids-generator',
    ULID_GENERATOR: '/ulid-generator',
    ENCRYPT_DECRYPT_TEXT: '/encrypt-decrypt-text',
    BIP39_PASSPHRASE_GENERATOR: '/bip39-passphrase-generator',
    HMAC_GENERATOR: '/hmac-generator',
    RSA_KEY_PAIR_GENERATOR: '/rsa-key-pair-generator',
    PASSWORD_STRENGTH_ANALYZER: '/password-strength-analyzer',
    PDF_SIGNATURE_CHECKER: '/pdf-signature-checker',
  }
} as const;

// 路由配置类型
export interface NavItem {
  titleKey: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
}

export interface NavGroup {
  titleKey: string;
  url?: string;
  icon?: LucideIcon;
  items: NavItem[];
}

// 导航配置
export const navigationConfig: NavGroup[] = [
  {
    titleKey: 'crypto',
    url: '#',
    icon: Shield,
    items: [
      {
        titleKey: 'tokenGenerator',
        url: ROUTES.CRYPTO.TOKEN_GENERATOR,
        icon: Key,
      },
      {
        titleKey: 'hashText',
        url: ROUTES.CRYPTO.HASH_TEXT,
        icon: Hash,
      },
      {
        titleKey: 'bcrypt',
        url: ROUTES.CRYPTO.BCRYPT,
        icon: Shield,
      },
      {
        titleKey: 'uuidsGenerator',
        url: ROUTES.CRYPTO.UUIDS_GENERATOR,
        icon: Copy,
      },
      {
        titleKey: 'ulidGenerator',
        url: ROUTES.CRYPTO.ULID_GENERATOR,
        icon: RefreshCw,
      },
      {
        titleKey: 'encryptDecryptText',
        url: ROUTES.CRYPTO.ENCRYPT_DECRYPT_TEXT,
        icon: Lock,
      },
      {
        titleKey: 'bip39PassphraseGenerator',
        url: ROUTES.CRYPTO.BIP39_PASSPHRASE_GENERATOR,
        icon: Shuffle,
      },
      {
        titleKey: 'hmacGenerator',
        url: ROUTES.CRYPTO.HMAC_GENERATOR,
        icon: GitBranch,
      },
      {
        titleKey: 'rsaKeyPairGenerator',
        url: ROUTES.CRYPTO.RSA_KEY_PAIR_GENERATOR,
        icon: KeyRound,
      },
      {
        titleKey: 'passwordStrengthAnalyzer',
        url: ROUTES.CRYPTO.PASSWORD_STRENGTH_ANALYZER,
        icon: ShieldCheck,
      },
      {
        titleKey: 'pdfSignatureChecker',
        url: ROUTES.CRYPTO.PDF_SIGNATURE_CHECKER,
        icon: FileText,
      },
    ],
  },
];

// 其他工具函数保持不变...
export const getAllRoutes = (): string[] => {
  return navigationConfig.flatMap(group => 
    group.items.map(item => item.url).filter(url => url !== '#')
  );
};

export const getRouteInfo = (pathname: string) => {
  for (const group of navigationConfig) {
    const item = group.items.find(item => item.url === pathname);
    if (item) {
      return {
        groupKey: group.titleKey,
        itemKey: item.titleKey,
        group,
        item,
      };
    }
  }
  return null;
};

export const isValidRoute = (pathname: string): boolean => {
  return getAllRoutes().includes(pathname);
};