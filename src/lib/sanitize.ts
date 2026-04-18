const INTEGER_RE = /^\d*$/;
const LEADING_ZEROS_RE = /^0+(?=\d)/;

export function sanitizeInteger(value: string): string | null {
	if (!INTEGER_RE.test(value)) return null;
	return value.replace(LEADING_ZEROS_RE, "");
}

export function sanitizeDecimal(value: string, maxDecimals = 2): string | null {
	const re = new RegExp(`^\\d*\\.?\\d{0,${maxDecimals}}$`);
	if (!re.test(value)) return null;
	return value.replace(LEADING_ZEROS_RE, "");
}
