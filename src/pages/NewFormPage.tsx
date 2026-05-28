import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/Button";
import { ROW_COL, ROW_LENGTH } from "@/lib/columns";
import { sanitizeDecimal, sanitizeInteger } from "@/lib/sanitize";
import { loadFormConfig, loadPrintData, savePrintData } from "@/lib/storage";
import type { PrintData } from "@/schemas/FormSchema";

type Cell = string | number;

const NewFormPage = () => {
	const navigate = useNavigate();

	const formConfig = useMemo(loadFormConfig, []);
	const rowCount = formConfig ? formConfig.maxNum - formConfig.minNum + 1 : 0;
	const existingPrintData = useMemo(() => {
		const data = loadPrintData();
		return data && data.table.length === rowCount ? data : null;
	}, [rowCount]);

	const [values, setValues] = useState<Cell[][]>(
		() =>
			existingPrintData?.table ??
			Array.from({ length: rowCount }, () => Array(ROW_LENGTH).fill("")),
	);
	const [project, setProject] = useState(existingPrintData?.project ?? "");
	const [project2, setProject2] = useState(existingPrintData?.project2 ?? "");
	const [pile, setPile] = useState(existingPrintData?.pile ?? "");
	const [date, setDate] = useState(existingPrintData?.date ?? "");

	if (!formConfig)
		return (
			<div className="min-h-[60vh] flex items-center justify-center font-serif text-ink/70 text-lg">
				没有该数据
			</div>
		);
	const showPileNo = !!formConfig.showPileNo;

	const updateCell = (rowIndex: number, colIndex: number, next: string) => {
		setValues((prev) =>
			prev.map((row, i) =>
				i === rowIndex
					? row.map((cell, j) => (j === colIndex ? next : cell))
					: row,
			),
		);
	};

	const handleIntegerChange = (
		value: string,
		rowIndex: number,
		colIndex: number,
	) => {
		const sanitized = sanitizeInteger(value);
		if (sanitized !== null) updateCell(rowIndex, colIndex, sanitized);
	};

	const handleDecimalChange = (
		value: string,
		rowIndex: number,
		colIndex: number,
	) => {
		const sanitized = sanitizeDecimal(value);
		if (sanitized !== null) updateCell(rowIndex, colIndex, sanitized);
	};

	const buildPrintData = (): PrintData => ({
		project,
		project2,
		pile,
		date,
		table: values.map((row) =>
			row.map((cell, j) =>
				j === ROW_COL.PILE_NO ? cell : cell === "" ? 0 : Number(cell),
			),
		),
	});

	const handleSave = () => {
		savePrintData(buildPrintData());
		navigate("/print");
	};

	const handleCopy = () => {
		savePrintData(buildPrintData());
		navigate("/copy");
	};

	const inputClass =
		"bg-surface border border-rule rounded-sm px-2 py-1 w-full font-serif tabular-nums focus:outline-none focus:ring-2 focus:ring-seal focus:border-seal transition-colors";

	const metaInputClass =
		"bg-surface border border-rule rounded-sm px-3 py-1.5 font-serif focus:outline-none focus:ring-2 focus:ring-seal focus:border-seal transition-colors";

	return (
		<div className="max-w-4xl mx-auto px-4 py-6">
			<form>
				<PageTitle />
				<div className="max-w-2xl mx-auto">
					<div className="flex items-center justify-end gap-3 mb-3">
						<span className="font-serif text-sm font-semibold tracking-wider text-seal shrink-0">
							DATE
						</span>
						<input
							type="text"
							maxLength={10}
							placeholder="DD/MM/YYYY"
							className={`${metaInputClass} w-[150px]`}
							value={date}
							onChange={(e) => setDate(e.target.value)}
						/>
					</div>
					<div className="space-y-3">
						<div className="flex items-center gap-3">
							<span className="font-serif text-sm font-semibold tracking-wider text-seal w-[120px] text-right shrink-0">
								PROJECT
							</span>
							<input
								type="text"
								maxLength={100}
								name="p1"
								className={`${metaInputClass} flex-1`}
								value={project}
								onChange={(e) => setProject(e.target.value)}
							/>
						</div>
						<div className="flex items-center gap-3">
							<div className="w-[120px] shrink-0" />
							<input
								type="text"
								maxLength={100}
								className={`${metaInputClass} flex-1`}
								value={project2}
								onChange={(e) => setProject2(e.target.value)}
							/>
						</div>
						<div className="flex items-center gap-3">
							<span className="font-serif text-sm font-semibold tracking-wider text-seal w-[120px] text-right shrink-0">
								SIZE OF PILE
							</span>
							<input
								type="text"
								maxLength={100}
								className={`${metaInputClass} flex-1`}
								value={pile}
								onChange={(e) => setPile(e.target.value)}
							/>
						</div>
					</div>
				</div>

				<table className="border-collapse mx-auto mt-5 font-serif">
					<thead>
						<tr className="bg-paper-strong border-y-2 border-double border-seal">
							<th className="text-xs font-semibold tracking-wider text-seal uppercase px-2">
								NO.
							</th>
							{showPileNo && (
								<th className="text-xs font-semibold tracking-wider text-seal uppercase px-2">
									PILE NO
								</th>
							)}
							<th className="text-xs font-semibold tracking-wider text-seal uppercase px-2">
								PILE LENGTHS 6 METER
							</th>
							<th className="text-xs font-semibold tracking-wider text-seal uppercase px-2">
								PILE LENGTHS 3 METER
							</th>
							<th className="text-xs font-semibold tracking-wider text-seal uppercase px-2">
								JOINTS NO
							</th>
							<th className="text-xs font-semibold tracking-wider text-seal uppercase px-2">
								{formConfig.role}
							</th>
						</tr>
					</thead>
					<tbody>
						{values.map((row, rowIndex) => (
							<tr
								key={`row-${formConfig.minNum + rowIndex}`}
								className="even:bg-paper-strong/30"
							>
								<td className="text-sm text-center font-semibold text-ink px-2 tabular-nums">
									{formConfig.minNum + rowIndex}
								</td>
								{showPileNo && (
									<td>
										<input
											type="number"
											autoComplete="off"
											aria-label={`Row ${rowIndex + 1} pile number`}
											className={inputClass}
											value={row[ROW_COL.PILE_NO]}
											onChange={(e) =>
												handleIntegerChange(
													e.target.value,
													rowIndex,
													ROW_COL.PILE_NO,
												)
											}
										/>
									</td>
								)}
								<td>
									<input
										type="number"
										autoComplete="off"
										aria-label={`Row ${rowIndex + 1} 6-meter count`}
										className={inputClass}
										value={row[ROW_COL.SIX_M]}
										onChange={(e) =>
											handleIntegerChange(
												e.target.value,
												rowIndex,
												ROW_COL.SIX_M,
											)
										}
									/>
								</td>
								<td>
									<input
										type="number"
										autoComplete="off"
										aria-label={`Row ${rowIndex + 1} 3-meter count`}
										className={inputClass}
										value={row[ROW_COL.THREE_M]}
										onChange={(e) =>
											handleIntegerChange(
												e.target.value,
												rowIndex,
												ROW_COL.THREE_M,
											)
										}
									/>
								</td>
								<td>
									<input
										type="number"
										autoComplete="off"
										aria-label={`Row ${rowIndex + 1} joints count`}
										className={inputClass}
										value={row[ROW_COL.JOINTS]}
										onChange={(e) =>
											handleIntegerChange(
												e.target.value,
												rowIndex,
												ROW_COL.JOINTS,
											)
										}
									/>
								</td>
								<td>
									<input
										type="number"
										autoComplete="off"
										aria-label={`Row ${rowIndex + 1} penetration`}
										pattern="^\d+(?:\.\d{1,2})?$"
										className={inputClass}
										value={row[ROW_COL.PENETRATION]}
										onChange={(e) =>
											handleDecimalChange(
												e.target.value,
												rowIndex,
												ROW_COL.PENETRATION,
											)
										}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				<div className="flex justify-center gap-4 pt-8">
					<Button size="xl" type="button" onClick={handleSave}>
						【 保存打印 】
					</Button>
					<Button size="xl" variant="seal" type="button" onClick={handleCopy}>
						复制
					</Button>
				</div>
			</form>
		</div>
	);
};

export default NewFormPage;
