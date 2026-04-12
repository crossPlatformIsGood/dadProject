import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "@/components/PageTitle";

const NewFormPage = () => {
	const navigate = useNavigate();
	const formInfo = localStorage.getItem("formD");
	const converttoJsonFormPage = formInfo ? JSON.parse(formInfo) : null;

	const printData = localStorage.getItem("printData");
	const convertedToJsonPrintData = printData ? JSON.parse(printData) : null;

	const x = converttoJsonFormPage
		? converttoJsonFormPage.maxNum - converttoJsonFormPage.minNum
		: 0;

	const [values, setValues] = useState<(string | number)[][]>(
		convertedToJsonPrintData?.table ||
			Array.from({ length: x + 1 }, (_, i) => {
			const row = Array(5).fill("");
			row[0] = converttoJsonFormPage ? converttoJsonFormPage.minNum + i : "";
			return row;
		}),
	);
	const [project, setProject] = useState(
		convertedToJsonPrintData?.project ?? "",
	);
	const [project2, setProject2] = useState(
		convertedToJsonPrintData?.project2 ?? "",
	);
	const [pile, setPile] = useState(convertedToJsonPrintData?.pile ?? "");
	const [date, setDate] = useState(convertedToJsonPrintData?.date ?? "");

	if (!converttoJsonFormPage) return <div>No form</div>;

	const rows = [];
	for (let i = 0; i <= x; i++) {
		const cells = [];
		for (let j = 0; j < 5; j++) {
			if (j === 0) {
				cells.push(
					<td key={j}>
						<input
							type="number"
							name="mm"
							autoComplete="off"
							className="bg-white border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
							value={values[i][j]}
							onChange={(e) => handleChange(e.target.value, i, j)}
						/>
					</td>,
				);
			} else if (j === 4) {
				cells.push(
					<td key={j}>
						<input
							type="number"
							name="mm"
							autoComplete="off"
							className="bg-white border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
							pattern="^\d+(?:\.\d{1,2})?$"
							value={values[i][j]}
							onChange={(e) => handleDecimalChange(e.target.value, i, j)}
						/>
					</td>,
				);
			} else {
				cells.push(
					<td key={j}>
						<input
							type="number"
							name="mm"
							autoComplete="off"
							className="bg-white border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
							value={values[i][j]}
							onChange={(e) => handleChange(e.target.value, i, j)}
						/>
					</td>,
				);
			}
		}
		rows.push(
			<tr key={i} className="even:bg-gray-50">
				{cells}
			</tr>,
		);
	}

	const handleChange = (value: string, rowIndex: number, colIndex: number) => {
		const regex = /^\d*$/;
		if (regex.test(value)) {
			// replace 0 to number
			const sanitizedValue = value.replace(/^0+(?=\d)/, "");
			const newValues = values.map((row, i) =>
				i === rowIndex
					? row.map((cell, j) => (j === colIndex ? sanitizedValue : cell))
					: row,
			);
			setValues(newValues);
		}
	};

	const handleDecimalChange = (
		value: string,
		rowIndex: number,
		colIndex: number,
	) => {
		const regex = /^\d*\.?\d{0,2}$/;

		if (regex.test(value)) {
			const sanitizedValue = value.replace(/^0+(?=\d)/, "");
			const newValues = values.map((row, i) =>
				i === rowIndex
					? row.map((cell, j) => (j === colIndex ? sanitizedValue : cell))
					: row,
			);
			setValues(newValues);
		}
	};

	const getSaveArray = () => {
		const mmValues = values.map((rows) =>
			rows.map((row) => (row === "" ? 0 : Number(row))),
		);
		const printData = {
			project,
			project2,
			pile,
			date,
			table: mmValues,
		};

		localStorage.setItem("printData", JSON.stringify(printData));
		navigate("/print");
	};

	const getCopy = () => {
		const mmValues = values.map((rows) =>
			rows.map((row) => (row === "" ? 0 : Number(row))),
		);
		const printData = {
			project,
			project2,
			pile,
			date,
			table: mmValues,
		};
		localStorage.setItem("printData", JSON.stringify(printData));
		navigate("/copy");
	};

	return (
		<div>
			<form>
				<PageTitle />
				<div className="max-w-2xl mx-auto">
					<div className="flex items-center justify-end gap-3 mb-3">
						<span className="font-bold text-sm text-gray-700 shrink-0">
							DATE:
						</span>
						<input
							type="text"
							maxLength={10}
							placeholder="DD/MM/YYYY"
							className="bg-white border border-gray-300 rounded-md px-3 py-1.5 w-[150px] focus:outline-none focus:ring-2 focus:ring-blue-300"
							value={date}
							onChange={(e) => setDate(e.target.value)}
						/>
					</div>
					<div className="space-y-3">
						<div className="flex items-center gap-3">
							<span className="font-bold text-sm text-gray-700 w-[120px] text-right shrink-0">
								PROJECT:
							</span>
							<input
								type="text"
								maxLength={100}
								name="p1"
								className="bg-white border border-gray-300 rounded-md px-3 py-1.5 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
								value={project}
								onChange={(e) => setProject(e.target.value)}
							/>
						</div>
						<div className="flex items-center gap-3">
							<div className="w-[120px] shrink-0" />
							<input
								type="text"
								maxLength={100}
								className="bg-white border border-gray-300 rounded-md px-3 py-1.5 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
								value={project2}
								onChange={(e) => setProject2(e.target.value)}
							/>
						</div>
						<div className="flex items-center gap-3">
							<span className="font-bold text-sm text-gray-700 w-[120px] text-right shrink-0">
								SIZE OF PILE:
							</span>
							<input
								type="text"
								maxLength={100}
								className="bg-white border border-gray-300 rounded-md px-3 py-1.5 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
								value={pile}
								onChange={(e) => setPile(e.target.value)}
							/>
						</div>
					</div>
				</div>

				<table className="border-collapse mx-auto mt-5">
					<thead>
						<tr className="bg-gray-100">
							<th className="text-sm font-semibold text-gray-700">PILE NO</th>
							<th className="text-sm font-semibold text-gray-700">
								PILE LENGTHS 6 METER
							</th>
							<th className="text-sm font-semibold text-gray-700">
								PILE LENGTHS 3 METER
							</th>
							<th className="text-sm font-semibold text-gray-700">JOINTS NO</th>
							<th className="text-sm font-semibold text-gray-700 uppercase">
								{converttoJsonFormPage.role}
							</th>
						</tr>
					</thead>
					<tbody>{rows}</tbody>
				</table>

				<div className="flex justify-center gap-3 pt-5">
					<button
						className="bg-amber-400 hover:bg-amber-500 text-gray-800 font-medium px-8 py-2 rounded-md cursor-pointer transition-colors"
						type="button"
						onClick={getSaveArray}
					>
						保存
					</button>
					<button
						className="bg-amber-400 hover:bg-amber-500 text-gray-800 font-medium px-8 py-2 rounded-md cursor-pointer transition-colors"
						type="button"
						onClick={getCopy}
					>
						复制
					</button>
				</div>
			</form>
		</div>
	);
};

export default NewFormPage;
