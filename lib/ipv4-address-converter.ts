export { ipv4ToInt, ipv4ToIpv6, isValidIpv4 };

function ipv4ToInt({ ip }: { ip: string }): number {
  if (!isValidIpv4({ ip })) {
    return 0;
  }

  return ip
    .trim()
    .split('.')
    .reduce((acc, part, index) => acc + Number(part) * 256 ** (3 - index), 0);
}

function ipv4ToIpv6({ ip, prefix = '0000:0000:0000:0000:0000:ffff:' }: { ip: string; prefix?: string }): string {
  if (!isValidIpv4({ ip })) {
    return '';
  }

  const parts = ip
    .trim()
    .split('.')
    .map(part => Number.parseInt(part).toString(16).padStart(2, '0'));
  
  // Group pairs and join with ':'
  const hexPairs = [];
  for (let i = 0; i < parts.length; i += 2) {
    hexPairs.push(parts.slice(i, i + 2).join(''));
  }
  
  return prefix + hexPairs.join(':');
}

function isValidIpv4({ ip }: { ip: string }): boolean {
  const cleanIp = ip.trim();
  return /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/.test(cleanIp);
}

// Base converter function for different number bases
export function convertBase({ fromBase, toBase, value }: { fromBase: number; toBase: number; value: string }): string {
  const decimal = parseInt(value, fromBase);
  if (isNaN(decimal)) {
    return '';
  }
  return decimal.toString(toBase);
}
