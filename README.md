# 🛠️ Developer Toolkit

A comprehensive collection of 44 developer tools built with Next.js 15, featuring crypto utilities, format converters, generators, and web development tools. Perfect for developers who need quick access to common development utilities with a beautiful, responsive interface.

## ✨ Features

### 🔐 Crypto & Security Tools

- **Token Generator** - Generate secure random tokens with custom options
- **Hash Text** - Create MD5, SHA-1, SHA-256, SHA-512 and other hash functions
- **Bcrypt** - Hash and verify passwords with bcrypt algorithm
- **Text Encrypt/Decrypt** - Secure text encryption and decryption with AES, TripleDES, Rabbit, RC4
- **HMAC Generator** - Generate HMAC signatures with various hash algorithms
- **RSA Key Pair Generator** - Create RSA public/private key pairs
- **Password Strength Analyzer** - Analyze password security and crack time estimation
- **Basic Auth Generator** - Generate HTTP Basic Authentication headers

### 🔧 Converter Tools

- **Base64 String Encode/Decode** - Convert strings to/from Base64 encoding
- **Base64 File Converter** - Convert files to Base64 and decode back to files
- **Case Converter** - Convert text between different cases (camelCase, snake_case, etc.)
- **Date Time Converter** - Convert between different date and time formats
- **Integer Base Converter** - Convert numbers between binary, octal, decimal, hexadecimal
- **Roman Numeral Converter** - Convert between Arabic numbers and Roman numerals
- **Text to ASCII Binary** - Convert text to ASCII codes and binary representation
- **Text to NATO Alphabet** - Convert text to NATO phonetic alphabet
- **Text to Unicode** - Convert text to Unicode code points and escape sequences

### 📄 Format Converters

- **JSON to YAML** - Convert JSON data to YAML format
- **JSON to TOML** - Convert JSON data to TOML format
- **JSON to XML** - Convert JSON data to XML format
- **YAML to JSON** - Convert YAML data to JSON format
- **YAML to TOML** - Convert YAML data to TOML format
- **TOML to JSON** - Convert TOML data to JSON format
- **TOML to YAML** - Convert TOML data to YAML format
- **XML to JSON** - Convert XML data to JSON format
- **Markdown to HTML** - Convert Markdown text to HTML
- **JSON Diff** - Compare two JSON objects and visualize differences

### 🆔 ID & Token Generators

- **UUID Generator** - Generate various versions of UUIDs
- **ULID Generator** - Generate Universally Unique Lexicographically Sortable Identifiers
- **BIP39 Passphrase Generator** - Generate mnemonic phrases for crypto wallets
- **OTP Code Generator** - Generate Time-based One-Time Password (TOTP) codes

### 🌐 Web Development Tools

- **HTML Entities Encoder/Decoder** - Encode and decode HTML entities
- **URL Encoder/Decoder** - Encode and decode URLs and URL components
- **URL Parser** - Parse URLs and extract components
- **User Agent Parser** - Parse user agent strings and extract device info
- **Device Info** - Get information about your device and browser
- **HTTP Status Codes** - Reference for all HTTP status codes
- **JWT Parser** - Parse and decode JSON Web Tokens
- **MIME Types** - Lookup MIME types and file extensions
- **Open Graph Generator** - Generate Open Graph meta tags

### 🛠️ Utility Tools

- **Color Picker** - Pick colors and convert between formats (HEX, RGB, HSL, HSV)
- **HTML WYSIWYG Editor** - Rich text editor for HTML content
- **Keycode Info** - Get JavaScript keycode information
- **List Converter** - Convert between different list formats

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

We currently have **44 tools** across **6 categories**:

### 🔐 Crypto & Security (8 tools)

| Tool                       | Description                   | Route                         |
| -------------------------- | ----------------------------- | ----------------------------- |
| Token Generator            | Generate secure random tokens | `/token-generator`            |
| Hash Text                  | Create various hash functions | `/hash-text`                  |
| Bcrypt                     | Password hashing with bcrypt  | `/bcrypt`                     |
| Encrypt/Decrypt Text       | Secure text encryption        | `/encrypt-decrypt-text`       |
| HMAC Generator             | Generate HMAC signatures      | `/hmac-generator`             |
| RSA Key Pair Generator     | Generate RSA keys             | `/rsa-key-pair-generator`     |
| Password Strength Analyzer | Analyze password strength     | `/password-strength-analyzer` |
| Basic Auth Generator       | Generate HTTP Basic Auth      | `/basic-auth-generator`       |

### 🔧 Converter Tools (9 tools)

| Tool                        | Description                 | Route                          |
| --------------------------- | --------------------------- | ------------------------------ |
| Base64 String Encode/Decode | Base64 string conversion    | `/base64-string-encode-decode` |
| Base64 File Converter       | File to Base64 conversion   | `/base64-file-converter`       |
| Case Converter              | Text case conversion        | `/case-converter`              |
| Date Time Converter         | Date/time format conversion | `/date-time-converter`         |
| Integer Base Converter      | Number base conversion      | `/integer-base-converter`      |
| Roman Numeral Converter     | Roman numeral conversion    | `/roman-numeral-converter`     |
| Text to ASCII Binary        | Text to ASCII/binary        | `/text-to-ascii-binary`        |
| Text to NATO Alphabet       | NATO phonetic alphabet      | `/text-to-nato-alphabet`       |
| Text to Unicode             | Unicode conversion          | `/text-to-unicode`             |

### 📄 Format Converters (10 tools)

| Tool             | Description                 | Route               |
| ---------------- | --------------------------- | ------------------- |
| JSON to YAML     | JSON to YAML conversion     | `/json-to-yaml`     |
| JSON to TOML     | JSON to TOML conversion     | `/json-to-toml`     |
| JSON to XML      | JSON to XML conversion      | `/json-to-xml`      |
| JSON Diff        | Compare JSON objects        | `/json-diff`        |
| YAML to JSON     | YAML to JSON conversion     | `/yaml-to-json`     |
| YAML to TOML     | YAML to TOML conversion     | `/yaml-to-toml`     |
| TOML to JSON     | TOML to JSON conversion     | `/toml-to-json`     |
| TOML to YAML     | TOML to YAML conversion     | `/toml-to-yaml`     |
| XML to JSON      | XML to JSON conversion      | `/xml-to-json`      |
| Markdown to HTML | Markdown to HTML conversion | `/markdown-to-html` |

### 🆔 Generators (4 tools)

| Tool                       | Description               | Route                         |
| -------------------------- | ------------------------- | ----------------------------- |
| UUID Generator             | Generate UUIDs            | `/uuids-generator`            |
| ULID Generator             | Generate ULIDs            | `/ulid-generator`             |
| BIP39 Passphrase Generator | Generate mnemonic phrases | `/bip39-passphrase-generator` |
| OTP Code Generator         | Generate TOTP codes       | `/otp-code-generator`         |

### 🌐 Web Tools (9 tools)

| Tool                 | Description                 | Route                   |
| -------------------- | --------------------------- | ----------------------- |
| HTML Entities        | Encode/decode HTML entities | `/html-entities`        |
| URL Encoder/Decoder  | URL encoding/decoding       | `/url-encoder-decoder`  |
| URL Parser           | Parse URL components        | `/url-parser`           |
| User Agent Parser    | Parse user agent strings    | `/user-agent-parser`    |
| Device Info          | Get device information      | `/device-info`          |
| HTTP Status Codes    | HTTP status reference       | `/http-status-codes`    |
| JWT Parser           | Parse JSON Web Tokens       | `/jwt-parser`           |
| MIME Types           | MIME type lookup            | `/mime-types`           |
| Open Graph Generator | Generate OG meta tags       | `/open-graph-generator` |

### 🛠️ Utility Tools (4 tools)

| Tool                | Description             | Route                  |
| ------------------- | ----------------------- | ---------------------- |
| Color Picker        | Color format converter  | `/color-picker`        |
| HTML WYSIWYG Editor | Rich text HTML editor   | `/html-wysiwyg-editor` |
| Keycode Info        | JavaScript keycode info | `/keycode-info`        |
| List Converter      | Convert list formats    | `/list-converter`      |

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

1. **Create the page component in `app/[locale]/your-tool/page.tsx`**
2. **Add translations in `locales/en.json` and `locales/zh.json`**
3. **Run the generation script to update tool data**
   ```bash
   npm run generate:tools
   ```
4. **Choose appropriate icons from Lucide React**
5. **Test your tool in both English and Chinese**

The generation script will automatically scan your new tool and add it to the tools data.

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
