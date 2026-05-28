import { useState } from "react";
import type { CellValue } from "@/lib/storage";

const INTEGER_REGEX = /^\d*$/;
const DECIMAL_REGEX = /^\d*\.?\d{0,2}$/;

type UseFormTableOptions = {
	rows: number;
	cols: number;
	initial?: CellValue[][];
};

export function useFormTable({ rows, cols, initial }: UseFormTableOptions) {
	const [values, setValues] = useState<CellValue[][]>(
		initial ?? Array.from({ length: rows }, () => Array(cols).fill("")),
	);

	const setCellWith =
		(regex: RegExp) => (value: string, rowIndex: number, colIndex: number) => {
			if (!regex.test(value)) return;
			setValues((prev) =>
				prev.map((row, i) =>
					i === rowIndex
						? row.map((cell, j) => (j === colIndex ? value : cell))
						: row,
				),
			);
		};

	const setCell = setCellWith(INTEGER_REGEX);
	const setCellDecimal = setCellWith(DECIMAL_REGEX);

	const toNumericMatrix = (): CellValue[][] =>
		values.map((row) => row.map((cell) => (cell.toString() === "" ? 0 : cell)));

	return { values, setCell, setCellDecimal, toNumericMatrix };
}
