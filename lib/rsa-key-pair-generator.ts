import forge from 'node-forge';

export interface RSAKeyPairOptions {
  bits: number;
}

export interface RSAKeyPair {
  publicKeyPem: string;
  privateKeyPem: string;
}

export async function generateKeyPair(options: RSAKeyPairOptions): Promise<RSAKeyPair> {
  return new Promise((resolve, reject) => {
    try {
      // 验证位数
      if (options.bits < 256 || options.bits > 16384 || options.bits % 8 !== 0) {
        throw new Error('Bits should be 256 <= bits <= 16384 and be a multiple of 8');
      }

      // 生成密钥对
      forge.pki.rsa.generateKeyPair(
        {
          bits: options.bits,
          workers: -1, // 使用 Web Workers（如果可用）
        },
        (err, keyPair) => {
          if (err) {
            reject(err);
            return;
          }

          try {
            // 转换为 PEM 格式
            const publicKeyPem = forge.pki.publicKeyToPem(keyPair.publicKey);
            const privateKeyPem = forge.pki.privateKeyToPem(keyPair.privateKey);

            resolve({
              publicKeyPem,
              privateKeyPem,
            });
          } catch (error) {
            reject(error);
          }
        }
      );
    } catch (error) {
      reject(error);
    }
  });
}

export function validateBits(bits: number): string | null {
  if (bits < 256 || bits > 16384) {
    return 'Bits should be between 256 and 16384';
  }
  if (bits % 8 !== 0) {
    return 'Bits should be a multiple of 8';
  }
  return null;
}