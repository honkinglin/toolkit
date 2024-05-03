# 🛠️ Developer Toolkit

A comprehensive collection of developer tools built with Next.js 15, featuring crypto utilities, generators, and analyzers. Perfect for developers who need quick access to common development tools.

## ✨ Features

### 🔐 Crypto & Security Tools
- **Token Generator** - Generate secure tokens for authentication
- **Hash Text** - Create MD5, SHA-1, SHA-256, and other hash functions
- **Bcrypt** - Hash and verify passwords with bcrypt
- **Text Encrypt/Decrypt** - Secure text encryption and decryption
- **HMAC Generator** - Generate HMAC signatures
- **RSA Key Pair Generator** - Create RSA public/private key pairs
- **Password Strength Analyzer** - Analyze and improve password security
- **PDF Signature Checker** - Verify PDF digital signatures

### 🆔 ID Generators
- **UUID Generator** - Generate version 4 UUIDs
- **ULID Generator** - Generate Universally Unique Lexicographically Sortable Identifiers

### 🔑 Blockchain Tools
- **BIP39 Passphrase Generator** - Generate mnemonic phrases for crypto wallets

## 🎨 Features

- **🌙 Dark/Light Mode** - Toggle between themes
- **📱 Responsive Design** - Works on all devices
- **⚡ Fast Performance** - Built with Next.js 15 and React 19
- **🎯 Type Safe** - Full TypeScript support
- **♿ Accessible** - Following WCAG guidelines
- **🌍 International** - Multi-language support with next-intl

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/honkinglin/toolkit.git
   cd toolkit
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Available Tools

### Crypto Tools
| Tool | Description | Route |
|------|-------------|-------|
| Token Generator | Generate secure random tokens | `/token-generator` |
| Hash Text | Create various hash functions | `/hash-text` |
| Bcrypt | Password hashing with bcrypt | `/bcrypt` |
| Encrypt/Decrypt | Secure text encryption | `/encrypt-decrypt-text` |
| HMAC Generator | Generate HMAC signatures | `/hmac-generator` |
| RSA Key Pair | Generate RSA keys | `/rsa-key-pair-generator` |
| Password Analyzer | Analyze password strength | `/password-strength-analyzer` |
| PDF Signature | Check PDF signatures | `/pdf-signature-checker` |

### ID Generators
| Tool | Description | Route |
|------|-------------|-------|
| UUID Generator | Generate UUIDs | `/uuids-generator` |
| ULID Generator | Generate ULIDs | `/ulid-generator` |

### Blockchain Tools
| Tool | Description | Route |
|------|-------------|-------|
| BIP39 Generator | Generate mnemonic phrases | `/bip39-passphrase-generator` |

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-tool
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing new tool'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-tool
   ```
5. **Open a Pull Request**

### Adding New Tools

1. **Create a new route in `lib/routes.ts`**
2. **Add translations in `locales/*.json`**
3. **Create the page component in `app/[locale]/your-tool/page.tsx`**
4. **Add appropriate icons from Lucide React**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Lucide](https://lucide.dev/) for the icon set
- [Next.js](https://nextjs.org/) team for the amazing framework
- [Vercel](https://vercel.com/) for hosting and deployment

## 📧 Contact

- **GitHub**: [@honkinglin](https://github.com/honkinglin)
- **Repository**: [https://github.com/honkinglin/toolkit](https://github.com/honkinglin/toolkit)

---

<div align="center">
  <p>Made with ❤️ for developers</p>
  <p>
    <a href="https://github.com/honkinglin/toolkit">⭐ Star this repo</a>
    •
    <a href="https://github.com/honkinglin/toolkit/issues">🐛 Report Bug</a>
    •
    <a href="https://github.com/honkinglin/toolkit/issues">💡 Request Feature</a>
  </p>
</div>