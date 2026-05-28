export type FormD = {
	maxNum: number;
	minNum: number;
	role: string;
};

export type CellValue = string | number;

export type PrintData = {
	project: string;
	project2: string;
	pile: string;
	table: CellValue[][];
};

const FORM_D_KEY = "formD";
const PRINT_DATA_KEY = "printData";

export function getFormD(): FormD | null {
	const raw = localStorage.getItem(FORM_D_KEY);
	if (!raw) return null;
	return JSON.parse(raw) as FormD;
}

export function getPrintData(): PrintData | null {
	const raw = localStorage.getItem(PRINT_DATA_KEY);
	if (!raw) return null;
	return JSON.parse(raw) as PrintData;
}

export function setPrintData(data: PrintData): void {
	localStorage.setItem(PRINT_DATA_KEY, JSON.stringify(data));
}
