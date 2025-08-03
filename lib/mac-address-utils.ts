export const macAddressValidationRules = [
  {
    message: 'Invalid MAC address',
    validator: (value: string) => value.trim().match(/^([0-9A-Fa-f]{2}[:-]){2,5}([0-9A-Fa-f]{2})$/),
  },
];

export const partialMacAddressValidationRules = [
  {
    message: 'Invalid partial MAC address',
    validator: (value: string) => value.trim().match(/^([0-9a-f]{2}[:\-. ]){0,5}([0-9a-f]{0,2})$/i),
  },
];

export function isValidMacAddress(value: string): boolean {
  return macAddressValidationRules[0].validator(value) !== null;
}

export function isValidPartialMacAddress(value: string): boolean {
  return partialMacAddressValidationRules[0].validator(value) !== null;
}

export function getVendorValue(address: string): string {
  return address.trim().replace(/[.:-]/g, '').toUpperCase().substring(0, 6);
}
