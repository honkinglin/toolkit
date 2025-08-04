import { ValidationErrorsIBAN } from 'ibantools';

const ibanErrorToMessage = {
  [ValidationErrorsIBAN.NoIBANProvided]: 'No IBAN provided',
  [ValidationErrorsIBAN.NoIBANCountry]: 'No IBAN country',
  [ValidationErrorsIBAN.WrongBBANLength]: 'Wrong BBAN length',
  [ValidationErrorsIBAN.WrongBBANFormat]: 'Wrong BBAN format',
  [ValidationErrorsIBAN.ChecksumNotNumber]: 'Checksum is not a number',
  [ValidationErrorsIBAN.WrongIBANChecksum]: 'Wrong IBAN checksum',
  [ValidationErrorsIBAN.WrongAccountBankBranchChecksum]: 'Wrong account bank branch checksum',
  [ValidationErrorsIBAN.QRIBANNotAllowed]: 'QR-IBAN not allowed',
};

export function getFriendlyErrors(errorCodes: ValidationErrorsIBAN[]): string[] {
  return errorCodes.map((errorCode) => ibanErrorToMessage[errorCode]).filter(Boolean);
}

export interface IbanDetail {
  label: string;
  value: string | boolean | string[] | undefined;
  showCopyButton?: boolean;
  hideOnNil?: boolean;
}
