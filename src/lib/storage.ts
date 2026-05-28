import formSchema, {
	type FormConfig,
	type PrintData,
	printDataSchema,
} from "@/schemas/FormSchema";

const FORM_KEY = "formD";
const PRINT_KEY = "printData";

function read<T>(key: string, parser: (raw: unknown) => T | null): T | null {
	try {
		const raw = sessionStorage.getItem(key);
		if (!raw) return null;
		return parser(JSON.parse(raw));
	} catch {
		return null;
	}
}

function write(key: string, value: unknown): void {
	try {
		sessionStorage.setItem(key, JSON.stringify(value));
	} catch (e) {
		console.error(`sessionStorage write failed for ${key}`, e);
	}
}

export function loadFormConfig(): FormConfig | null {
	return read(FORM_KEY, (raw) => {
		const parsed = formSchema.safeParse(raw);
		return parsed.success ? parsed.data : null;
	});
}

export function saveFormConfig(config: FormConfig): void {
	write(FORM_KEY, config);
}

export function loadPrintData(): PrintData | null {
	return read(PRINT_KEY, (raw) => {
		const parsed = printDataSchema.safeParse(raw);
		return parsed.success ? parsed.data : null;
	});
}

export function savePrintData(data: PrintData): void {
	write(PRINT_KEY, data);
}

export function clearPrintData(): void {
	try {
		sessionStorage.removeItem(PRINT_KEY);
	} catch (e) {
		console.error(`sessionStorage remove failed for ${PRINT_KEY}`, e);
	}
}
