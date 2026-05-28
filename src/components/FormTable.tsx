import type { CellValue } from "@/lib/storage";

type FormTableProps = {
	values: CellValue[][];
	minNum: number;
	roleLabel: string;
	onChange: (value: string, rowIndex: number, colIndex: number) => void;
	onDecimalChange: (value: string, rowIndex: number, colIndex: number) => void;
};

const cellInputClass =
	"bg-white border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-300";

const FormTable = ({
	values,
	minNum,
	roleLabel,
	onChange,
	onDecimalChange,
}: FormTableProps) => {
	return (
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
						{roleLabel}
					</th>
				</tr>
			</thead>
			<tbody>
				{values.map((row, i) => (
					<tr key={i} className="even:bg-gray-50">
						{row.map((cell, j) =>
							j === 0 ? (
								<td key={j} className="text-center font-medium text-gray-700">
									{minNum + i}
								</td>
							) : (
								<td key={j}>
									<input
										type="number"
										name="mm"
										autoComplete="off"
										className={cellInputClass}
										pattern={j === 4 ? "^\\d+(?:\\.\\d{1,2})?$" : undefined}
										value={cell}
										onChange={(e) =>
											j === 4
												? onDecimalChange(e.target.value, i, j)
												: onChange(e.target.value, i, j)
										}
									/>
								</td>
							),
						)}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default FormTable;
