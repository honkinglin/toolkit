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
} from 'lucide-react';

export const CRYPTO_ROUTES = {
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
};

export const cryptoNavigationConfig = {
  titleKey: 'crypto',
  url: '#',
  icon: Shield,
  items: [
    {
      titleKey: 'tokenGenerator',
      url: CRYPTO_ROUTES.TOKEN_GENERATOR,
      icon: Key,
    },
    {
      titleKey: 'hashText',
      url: CRYPTO_ROUTES.HASH_TEXT,
      icon: Hash,
    },
    {
      titleKey: 'bcrypt',
      url: CRYPTO_ROUTES.BCRYPT,
      icon: Shield,
    },
    {
      titleKey: 'uuidsGenerator',
      url: CRYPTO_ROUTES.UUIDS_GENERATOR,
      icon: Copy,
    },
    {
      titleKey: 'ulidGenerator',
      url: CRYPTO_ROUTES.ULID_GENERATOR,
      icon: RefreshCw,
    },
    {
      titleKey: 'encryptDecryptText',
      url: CRYPTO_ROUTES.ENCRYPT_DECRYPT_TEXT,
      icon: Lock,
    },
    {
      titleKey: 'bip39PassphraseGenerator',
      url: CRYPTO_ROUTES.BIP39_PASSPHRASE_GENERATOR,
      icon: Shuffle,
    },
    {
      titleKey: 'hmacGenerator',
      url: CRYPTO_ROUTES.HMAC_GENERATOR,
      icon: GitBranch,
    },
    {
      titleKey: 'rsaKeyPairGenerator',
      url: CRYPTO_ROUTES.RSA_KEY_PAIR_GENERATOR,
      icon: KeyRound,
    },
    {
      titleKey: 'passwordStrengthAnalyzer',
      url: CRYPTO_ROUTES.PASSWORD_STRENGTH_ANALYZER,
      icon: ShieldCheck,
    },
  ],
};
