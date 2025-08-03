import { SHA1 } from 'crypto-js';

export interface ULASection {
  label: string;
  value: string;
}

export function generateIPv6ULA(macAddress: string): ULASection[] {
  const timestamp = new Date().getTime();
  const hex40bit = SHA1(timestamp + macAddress)
    .toString()
    .substring(30);

  const ula = `fd${hex40bit.substring(0, 2)}:${hex40bit.substring(2, 6)}:${hex40bit.substring(6)}`;

  return [
    {
      label: 'IPv6 ULA:',
      value: `${ula}::/48`,
    },
    {
      label: 'First routable block:',
      value: `${ula}:0::/64`,
    },
    {
      label: 'Last routable block:',
      value: `${ula}:ffff::/64`,
    },
  ];
}
