import { ALGORITHM_DESCRIPTIONS, CLAIM_DESCRIPTIONS } from './jwt-constants';

export interface ParsedClaim {
  claim: string;
  claimDescription?: string;
  value: string;
  friendlyValue?: string;
}

export interface DecodedJWT {
  header: ParsedClaim[];
  payload: ParsedClaim[];
}

export function decodeJwt(jwt: string): DecodedJWT | null {
  // 分割JWT的三个部分
  const parts = jwt.split('.');
  if (parts.length !== 3) {
    return null;
  }

  // 检查是否为有效的 base64 字符串
  if (!isValidBase64Url(parts[0]) || !isValidBase64Url(parts[1])) {
    return null;
  }

  const headerStr = base64UrlDecode(parts[0]);
  const payloadStr = base64UrlDecode(parts[1]);

  if (!headerStr || !payloadStr) {
    return null;
  }

  const rawHeader = parseJSON(headerStr);
  const rawPayload = parseJSON(payloadStr);

  if (!rawHeader || !rawPayload) {
    return null;
  }

  const header = Object.entries(rawHeader).map(([claim, value]) => parseClaim({ claim, value }));
  const payload = Object.entries(rawPayload).map(([claim, value]) => parseClaim({ claim, value }));

  return { header, payload };
}

// 检查是否为有效的 base64url 字符串
function isValidBase64Url(str: string): boolean {
  return /^[A-Za-z0-9_-]+$/.test(str);
}

// 安全的 JSON 解析
function parseJSON(str: string): Record<string, unknown> | null {
  try {
    const result = JSON.parse(str);
    return typeof result === 'object' && result !== null ? result : null;
  } catch {
    return null;
  }
}

// Base64 URL解码函数
function base64UrlDecode(str: string): string | null {
  try {
    // 将Base64 URL编码转换为标准Base64编码
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');

    // 添加填充
    while (base64.length % 4) {
      base64 += '=';
    }

    // 解码
    if (typeof atob !== 'undefined') {
      return atob(base64);
    } else {
      // Node.js环境
      return Buffer.from(base64, 'base64').toString('utf-8');
    }
  } catch {
    return null;
  }
}

function parseClaim({ claim, value }: { claim: string; value: unknown }): ParsedClaim {
  const claimDescription = CLAIM_DESCRIPTIONS[claim];
  const formattedValue =
    typeof value === 'object' && value !== null ? JSON.stringify(value, null, 2) : String(value);
  const friendlyValue = getFriendlyValue({ claim, value });

  return {
    claim,
    claimDescription,
    value: formattedValue,
    friendlyValue,
  };
}

function getFriendlyValue({ claim, value }: { claim: string; value: unknown }): string | undefined {
  // 时间戳类型的声明
  if (['exp', 'nbf', 'iat'].includes(claim)) {
    return formatDate(value);
  }

  // 算法描述
  if (claim === 'alg' && typeof value === 'string') {
    return ALGORITHM_DESCRIPTIONS[value];
  }

  return undefined;
}

function formatDate(value: unknown): string | undefined {
  if (value == null || typeof value !== 'number') {
    return undefined;
  }

  const date = new Date(Number(value) * 1000);

  // 检查日期是否有效
  if (isNaN(date.getTime())) {
    return undefined;
  }

  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}
