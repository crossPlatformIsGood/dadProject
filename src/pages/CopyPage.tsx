import { useNavigate } from "react-router-dom";
import PageTitle from "@/components/PageTitle";
import { getFormD, getPrintData, setPrintData } from "@/lib/storage";
import { validateRange } from "@/lib/validation";
import {
	type CopySectionDef,
	type CopySectionState,
	type SectionField,
	useCopySections,
} from "./hooks/useCopySections";

const inputClass =
	"bg-white border border-gray-300 rounded-md px-2 py-1.5 w-[100px] focus:outline-none focus:ring-2 focus:ring-blue-300";

const CopyPage = () => {
	const navigate = useNavigate();
	const { sections, state, setField } = useCopySections();

	const formD = getFormD();
	if (!formD) return <>没有该数据</>;
	const printData = getPrintData();
	if (!printData) return <>没有该数据</>;

	const tableList = printData.table as number[][];

	const handleSubmit = () => {
		for (const section of sections) {
			const { first, last, value } = state[section.id];
			const result = validateRange({
				first,
				last,
				value,
				maxNum: formD.maxNum,
				messages: section.messages,
			});

			if (result.kind === "error") {
				alert(result.message);
				return;
			}
			if (result.kind === "skip") continue;

			const numericValue = section.decimal
				? parseFloat(value)
				: parseInt(value, 10);
			for (let i = result.start; i < result.end; i++) {
				tableList[i][section.columnIndex] = numericValue;
			}
		}

		setPrintData({ ...printData, table: tableList });
		navigate("/newform");
	};

	return (
		<div>
			<PageTitle summary={false} />
			<div className="max-w-xl mx-auto space-y-4">
				{sections.map((section) => (
					<SectionRow
						key={section.id}
						section={section}
						value={state[section.id]}
						onChange={(field, raw) => setField(section.id, field, raw)}
					/>
				))}
			</div>

			<div className="flex justify-center gap-3 pt-6">
				<button
					className="bg-amber-400 hover:bg-amber-500 text-gray-800 font-medium px-8 py-2 rounded-md cursor-pointer transition-colors"
					type="button"
					onClick={handleSubmit}
				>
					OK
				</button>
				<button
					className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-8 py-2 rounded-md cursor-pointer transition-colors"
					type="button"
					onClick={() => navigate("/newform")}
				>
					返回
				</button>
			</div>
		</div>
	);
};

type SectionRowProps = {
	section: CopySectionDef;
	value: CopySectionState;
	onChange: (field: SectionField, raw: string) => void;
};

const SectionRow = ({ section, value, onChange }: SectionRowProps) => (
	<div className="flex items-center gap-3">
		<span className="font-medium text-sm text-gray-700 w-[110px] text-right shrink-0">
			{section.label}
		</span>
		<input
			type="number"
			className={inputClass}
			value={value.first}
			onChange={(e) => onChange("first", e.target.value)}
		/>
		<span className="text-gray-400">—</span>
		<input
			type="number"
			className={inputClass}
			value={value.last}
			onChange={(e) => onChange("last", e.target.value)}
		/>
		<span className="text-sm text-gray-600">支数=</span>
		<input
			type="number"
			className={inputClass}
			value={value.value}
			onChange={(e) => onChange("value", e.target.value)}
		/>
	</div>
);

export default CopyPage;
