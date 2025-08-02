export interface PasswordStrengthResult {
  passwordLength: number;
  entropy: number;
  charsetLength: number;
  score: number;
  crackDurationFormatted: string;
  crackTimeSeconds: number;
}

// 字符集定义
const CHARSET_SIZES = {
  lowercase: 26,
  uppercase: 26,
  numbers: 10,
  symbols: 32, // 常见符号
  extendedSymbols: 65, // 扩展符号集
};

// 计算字符集大小
function getCharsetLength(password: string): number {
  let charsetSize = 0;
  
  if (/[a-z]/.test(password)) {
    charsetSize += CHARSET_SIZES.lowercase;
  }
  
  if (/[A-Z]/.test(password)) {
    charsetSize += CHARSET_SIZES.uppercase;
  }
  
  if (/[0-9]/.test(password)) {
    charsetSize += CHARSET_SIZES.numbers;
  }
  
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]/.test(password)) {
    charsetSize += CHARSET_SIZES.symbols;
  }
  
  // 检查是否有其他特殊字符
  if (/[^\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]/.test(password)) {
    charsetSize += CHARSET_SIZES.extendedSymbols;
  }
  
  return Math.max(charsetSize, 1);
}

// 计算熵值
function calculateEntropy(password: string): number {
  if (!password) return 0;
  
  const charsetSize = getCharsetLength(password);
  const passwordLength = password.length;
  
  // 熵 = log2(字符集大小^密码长度)
  return passwordLength * Math.log2(charsetSize);
}

// 格式化破解时间
function formatCrackTime(seconds: number): string {
  if (seconds === 0) return 'Instantly';
  
  const units = [
    { name: 'year', seconds: 365 * 24 * 60 * 60, plural: 'years' },
    { name: 'month', seconds: 30 * 24 * 60 * 60, plural: 'months' },
    { name: 'day', seconds: 24 * 60 * 60, plural: 'days' },
    { name: 'hour', seconds: 60 * 60, plural: 'hours' },
    { name: 'minute', seconds: 60, plural: 'minutes' },
    { name: 'second', seconds: 1, plural: 'seconds' },
  ];
  
  for (const unit of units) {
    const value = Math.floor(seconds / unit.seconds);
    if (value >= 1) {
      const unitName = value === 1 ? unit.name : unit.plural;
      
      // 如果时间很大，使用科学计数法
      if (value >= 1e12) {
        return `${(value / 1e12).toFixed(1)} trillion ${unitName}`;
      } else if (value >= 1e9) {
        return `${(value / 1e9).toFixed(1)} billion ${unitName}`;
      } else if (value >= 1e6) {
        return `${(value / 1e6).toFixed(1)} million ${unitName}`;
      } else if (value >= 1e3) {
        return `${(value / 1e3).toFixed(1)} thousand ${unitName}`;
      } else {
        return `${value} ${unitName}`;
      }
    }
  }
  
  return 'Less than a second';
}

// 计算破解时间评分 (0-100)
function calculateScore(crackTimeSeconds: number): number {
  if (crackTimeSeconds === 0) return 0;
  
  // 使用对数评分，基于破解时间
  const logTime = Math.log10(crackTimeSeconds);
  
  // 评分规则：
  // < 1秒: 0分
  // 1秒-1分钟: 0-20分
  // 1分钟-1小时: 20-40分
  // 1小时-1天: 40-60分
  // 1天-1年: 60-80分
  // > 1年: 80-100分
  
  if (logTime < 0) return 0; // < 1秒
  if (logTime < 1.78) return Math.min(20, logTime * 11.2); // < 1分钟
  if (logTime < 3.56) return 20 + Math.min(20, (logTime - 1.78) * 11.2); // < 1小时
  if (logTime < 4.93) return 40 + Math.min(20, (logTime - 3.56) * 14.6); // < 1天
  if (logTime < 7.5) return 60 + Math.min(20, (logTime - 4.93) * 7.8); // < 1年
  
  return Math.min(100, 80 + (logTime - 7.5) * 4); // > 1年
}

export function getPasswordCrackTimeEstimation(options: { password: string }): PasswordStrengthResult {
  const { password } = options;
  
  if (!password) {
    return {
      passwordLength: 0,
      entropy: 0,
      charsetLength: 0,
      score: 0,
      crackDurationFormatted: 'Instantly',
      crackTimeSeconds: 0,
    };
  }
  
  const passwordLength = password.length;
  const charsetLength = getCharsetLength(password);
  const entropy = calculateEntropy(password);
  
  // 计算可能的组合数
  const possibleCombinations = Math.pow(charsetLength, passwordLength);
  
  // 假设每秒可以尝试 1 billion (10^9) 次
  const attemptsPerSecond = 1e9;
  
  // 平均需要尝试一半的组合数
  const averageAttempts = possibleCombinations / 2;
  const crackTimeSeconds = averageAttempts / attemptsPerSecond;
  
  const crackDurationFormatted = formatCrackTime(crackTimeSeconds);
  const score = calculateScore(crackTimeSeconds);
  
  return {
    passwordLength,
    entropy,
    charsetLength,
    score,
    crackDurationFormatted,
    crackTimeSeconds,
  };
}