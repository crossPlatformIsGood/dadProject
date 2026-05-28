import type { ReactNode } from "react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./printpage.css";
import PageTitle from "@/components/PageTitle";
import { PRINT_COL } from "@/lib/columns";
import { loadFormConfig, loadPrintData } from "@/lib/storage";

type Cell = string | number;

function toNumber(value: Cell): number {
	const n = typeof value === "number" ? value : Number.parseFloat(value);
	return Number.isFinite(n) ? n : 0;
}

function hasDecimalBeyondOne(rows: Cell[][]): boolean {
	for (const row of rows) {
		const pen = row[PRINT_COL.PENETRATION];
		if (pen === undefined) continue;
		const str = String(pen);
		const dotIdx = str.indexOf(".");
		if (dotIdx !== -1 && str.length - dotIdx - 1 > 1) return true;
	}
	return false;
}

function sumRows(rows: Cell[][]): Cell[] {
	if (rows.length === 0) return [];
	const decimals = hasDecimalBeyondOne(rows) ? 2 : 1;
	const width = rows[0].length;
	const totals = new Array<number>(width).fill(0);

	for (const row of rows) {
		for (let i = 0; i < width; i++) {
			if (i === PRINT_COL.NO || i === PRINT_COL.PILE_NO) continue;
			totals[i] += toNumber(row[i]);
		}
	}

	return totals.map((total, i) => {
		if (i === PRINT_COL.PILE_NO) return "";
		if (i === PRINT_COL.PENETRATION) return total.toFixed(decimals);
		return total;
	});
}

const PrintPage = () => {
	const navigate = useNavigate();
	const formConfig = useMemo(loadFormConfig, []);
	const printData = useMemo(loadPrintData, []);

	if (!formConfig) return <>没有该数据</>;
	if (!printData) return <>没有该数据</>;

	const showPileNo = !!formConfig.showPileNo;
	const { project, project2, pile, date, table } = printData;

	const printedRows: Cell[][] = table.map((row, i) => [
		formConfig.minNum + i,
		...row,
	]);

	const totals = sumRows(printedRows);

	const renderDataRow = (row: Cell[], rowIndex: number): ReactNode => (
		<tr key={`row-${rowIndex}`} className="even:bg-gray-50">
			<td className="text-xs text-center font-medium text-gray-700">
				{row[PRINT_COL.NO]}
			</td>
			{showPileNo && (
				<td className="text-xs text-center">{row[PRINT_COL.PILE_NO]}</td>
			)}
			<td className="text-xs text-center">{row[PRINT_COL.SIX_M]}</td>
			<td className="text-xs text-center">{row[PRINT_COL.THREE_M]}</td>
			<td className="text-xs text-center">{row[PRINT_COL.JOINTS]}</td>
			<td className="text-xs text-center">{row[PRINT_COL.PENETRATION]}</td>
		</tr>
	);

	return (
		<div>
			<PageTitle />
			{date && (
				<div className="max-w-2xl mx-auto text-end mb-1">
					<span className="font-bold text-sm">DATE: </span>
					<span className="underline">{date}</span>
				</div>
			)}
			<div className="max-w-2xl mx-auto space-y-1 mb-4">
				<div className="text-start">
					<span className="font-bold text-sm">PROJECT: </span>
					<span className="underline">{project}</span>
				</div>
				{project2 && (
					<div className="text-start pl-[85px] underline">{project2}</div>
				)}
				<div className="text-start">
					<span className="font-bold text-sm">SIZE OF PILE: </span>
					<span className="underline">{pile}</span>
				</div>
			</div>

			<table className="my-2.5 mx-auto">
				<thead>
					<tr className="bg-gray-100 text-xs">
						<th>NO.</th>
						{showPileNo && <th>PILE NO</th>}
						<th>PILE LENGTHS 6 METER</th>
						<th>PILE LENGTHS 3 METER</th>
						<th>JOINTS NO</th>
						<th className="uppercase">{formConfig.role}</th>
					</tr>
				</thead>
				<tbody>
					{printedRows.map(renderDataRow)}
					<tr className="bg-amber-50 border-t-2 border-gray-400">
						<td className="font-bold text-sm">Total :</td>
						{showPileNo && <td />}
						<td className="font-bold text-sm text-center">
							{totals[PRINT_COL.SIX_M]}
						</td>
						<td className="font-bold text-sm text-center">
							{totals[PRINT_COL.THREE_M]}
						</td>
						<td className="font-bold text-sm text-center">
							{totals[PRINT_COL.JOINTS]}
						</td>
						<td className="font-bold text-sm text-center">
							{totals[PRINT_COL.PENETRATION]}
						</td>
					</tr>
				</tbody>
			</table>

			<div className="flex justify-center gap-3 mb-10">
				<button
					type="button"
					id="p"
					onClick={() => window.print()}
					className="bg-amber-400 hover:bg-amber-500 text-gray-800 font-medium px-8 py-2 rounded-md cursor-pointer transition-colors"
				>
					Print
				</button>
				<button
					type="button"
					id="e"
					onClick={() => navigate("/newform")}
					className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-8 py-2 rounded-md cursor-pointer transition-colors"
				>
					修改
				</button>
			</div>
		</div>
	);
};

export default PrintPage;
