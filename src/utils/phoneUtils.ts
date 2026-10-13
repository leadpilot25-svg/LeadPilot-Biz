
export function formatPhoneForWhatsApp(
  phoneStr: string,
  fallbackCountryCode: string = '91'
): string {
  if (!phoneStr) return '';

  const trimmed = String(phoneStr).trim();
  const digits = extractDigits(trimmed);
  if (!digits) return '';

  const cleanCc = extractDigits(fallbackCountryCode) || '91';

  // Explicit international format: preserve the supplied country code.
  if (trimmed.startsWith('+')) {
    return digits;
  }

  // International dialing prefix, such as 0091.
  if (trimmed.startsWith('00') && digits.length > 10) {
    return digits.slice(2);
  }

  // Indian domestic number with a leading zero.
  if (digits.length === 11 && digits.startsWith('0')) {
    return `${cleanCc}${digits.slice(1)}`;
  }

  // Indian number already stored with +91 / 91.
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits;
  }

  // US / Canada number already stored with +1 / 1.
  if (digits.length === 11 && digits.startsWith('1')) {
    return digits;
  }

  // Local 10-digit number: use the selected country code.
  if (digits.length === 10) {
    return `${cleanCc}${digits}`;
  }

  // Do not guess a country code for an unknown number.
  return digits;
}
