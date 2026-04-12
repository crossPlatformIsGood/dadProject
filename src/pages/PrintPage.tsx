import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import "./printpage.css";
import PageTitle from "@/components/PageTitle";

type CellValue = string | number;

const PrintPage = () => {
	const navigate = useNavigate();
	const printData = localStorage.getItem("printData");
	const formInfo = localStorage.getItem("formD");
	if (!formInfo) return <>没有该数据</>;
	const converttoJsonFormInfo = JSON.parse(formInfo);
	let setx = converttoJsonFormInfo.minNum;

	if (!printData) return <>没有该数据</>;
	const convertedToJsonPrintData = JSON.parse(printData);
	const project = convertedToJsonPrintData.project;
	const project2 = convertedToJsonPrintData.project2;
	const pile = convertedToJsonPrintData.pile;
	const date = convertedToJsonPrintData.date;
	const tables: CellValue[][] = convertedToJsonPrintData.table;
	const displayRows: ReactNode[] = [];
	const rows: CellValue[][] = [];

	function sumArrays(data: CellValue[][]): (string | number)[] {
		if (data.length === 0) return [];
		let checkDecimal = 1;
		const result: (string | number)[] = new Array(data[0].length).fill(0);
		for (const array of data) {
			const value = array[4];
			if (typeof value === "number" || typeof value === "string") {
				const str = value.toString();
				if (str.includes(".")) {
					const decimals = str.split(".")[1].length;
					if (decimals > 1) {
						checkDecimal = 2;
						break;
					}
				}
			}
		}

		for (const array of data) {
			for (let i = 0; i < array.length; i++) {
				if (i === 4) {
					const totalValue =
						Number.parseFloat(String(result[i])) +
						Number.parseFloat(String(array[i]));
					result[i] = totalValue.toFixed(checkDecimal);
				} else
					result[i] = Number(result[i]) + Number.parseInt(String(array[i]), 10);
			}
		}

		return result;
	}

	tables.forEach((table: CellValue[], tableIndex: number) => {
		const displayCells: ReactNode[] = [];
		const cells: CellValue[] = [];
		table.forEach((row: CellValue, colIndex: number) => {
			if (colIndex === 0) {
				displayCells.push(
					<td
						key={`cell-${tableIndex}-${colIndex}`}
						className="text-xs text-center font-medium text-gray-700"
					>
						{setx}
					</td>,
				);
				cells.push(setx);
				setx++;
			} else {
				displayCells.push(
					<td
						key={`cell-${tableIndex}-${colIndex}`}
						className="text-xs text-center"
					>
						{row}
					</td>,
				);
				cells.push(row);
			}
		});

		displayRows.push(
			<tr key={`row-${tableIndex}`} className="even:bg-gray-50">
				{displayCells}
			</tr>,
		);
		rows.push(cells);
	});

	const results = sumArrays(rows);
	const totalCells: ReactNode[] = [];
	results.forEach((result: string | number, index: number) => {
		if (index === 0)
			totalCells.push(
				<td key="total-label" className="font-bold text-sm">
					Total :
				</td>,
			);
		else
			totalCells.push(
				<td key={`total-${index}`} className="font-bold text-sm text-center">
					{result}
				</td>,
			);
	});
	displayRows.push(
		<tr key="tt" className="bg-amber-50 border-t-2 border-gray-400">
			{totalCells}
		</tr>,
	);

	const editPage = () => {
		navigate("/newform");
	};

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
						<th>PILE NO</th>
						<th>PILE LENGTHS 6 METER</th>
						<th>PILE LENGTHS 3 METER</th>
						<th>JOINTS NO</th>
						<th className="uppercase">{converttoJsonFormInfo.role}</th>
					</tr>
				</thead>
				<tbody>{displayRows}</tbody>
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
					onClick={editPage}
					className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-8 py-2 rounded-md cursor-pointer transition-colors"
				>
					修改
				</button>
			</div>
		</div>
	);
};

export default PrintPage;
