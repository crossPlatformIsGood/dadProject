import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "@/components/PageTitle";
import { ROW_COL } from "@/lib/columns";
import { sanitizeDecimal, sanitizeInteger } from "@/lib/sanitize";
import { loadFormConfig, loadPrintData, savePrintData } from "@/lib/storage";

type NumberParser = (v: string) => number;

type RangeConfig = {
	key: string;
	label: string;
	column: number;
	parser: NumberParser;
	emptyMsg: string;
	numberEmptyMsg: string;
	zeroMsg: string;
};

const RANGES: RangeConfig[] = [
	{
		key: "sixM",
		label: "6 METER",
		column: ROW_COL.SIX_M,
		parser: (v) => parseInt(v, 10),
		emptyMsg: "6M支数不能为空",
		numberEmptyMsg: "6M号码不能为空",
		zeroMsg: "6M 号码不能为0， 要大于等于1",
	},
	{
		key: "threeM",
		label: "3 METER",
		column: ROW_COL.THREE_M,
		parser: (v) => parseInt(v, 10),
		emptyMsg: "3M支数不能为空",
		numberEmptyMsg: "3M号码不能为空",
		zeroMsg: "3M 号码不能为0， 要大于等于1",
	},
	{
		key: "joint",
		label: "JOINT",
		column: ROW_COL.JOINTS,
		parser: (v) => parseInt(v, 10),
		emptyMsg: "Joint支数不能为空",
		numberEmptyMsg: "JOINT号码不能为空",
		zeroMsg: "JOINT号码不能为0， 要大于等于1",
	},
	{
		key: "pen",
		label: "PENETRATION",
		column: ROW_COL.PENETRATION,
		parser: parseFloat,
		emptyMsg: "PENETRATION支数不能为空",
		numberEmptyMsg: "PENETRATION号码不能为空",
		zeroMsg: "PENETRATION 号码不能为0， 要大于等于1",
	},
];

type RangeState = { first: string; last: string; value: string };

const emptyRange: RangeState = { first: "", last: "", value: "" };

const CopyPage = () => {
	const navigate = useNavigate();

	const formConfig = useMemo(loadFormConfig, []);
	const printData = useMemo(loadPrintData, []);

	const [ranges, setRanges] = useState<Record<string, RangeState>>(() =>
		Object.fromEntries(RANGES.map((r) => [r.key, { ...emptyRange }])),
	);

	if (!formConfig) return <>没有该数据</>;
	if (!printData) return <>没有该数据</>;

	const maxNum = formConfig.maxNum;

	const updateRange = (key: string, patch: Partial<RangeState>) => {
		setRanges((prev) => ({ ...prev, [key]: { ...prev[key], ...patch } }));
	};

	const applyRange = (
		table: (string | number)[][],
		state: RangeState,
		cfg: RangeConfig,
	): string | null => {
		const { first, last, value } = state;
		if (first === "" && last === "") return null;

		if (value === "") return cfg.emptyMsg;
		if (first === "" || last === "") return cfg.numberEmptyMsg;

		const firstNum = parseInt(first, 10);
		const lastNum = parseInt(last, 10);

		if (firstNum === 0 || lastNum === 0) return cfg.zeroMsg;
		if (lastNum < firstNum) return `第二个号码少过${first}`;
		if (lastNum > maxNum) return `第二个号码不能大于${maxNum}`;

		const parsedValue = cfg.parser(value);
		for (let i = firstNum - 1; i < lastNum; i++) {
			const row = table[i];
			if (!row) continue;
			row[cfg.column] = parsedValue;
		}
		return null;
	};

	const handleSubmit = () => {
		const table = printData.table.map((row) => [...row]);

		for (const cfg of RANGES) {
			const error = applyRange(table, ranges[cfg.key], cfg);
			if (error) {
				alert(error);
				return;
			}
		}

		savePrintData({ ...printData, table });
		navigate("/newform");
	};

	const handleIntegerChange = (
		value: string,
		key: string,
		field: keyof RangeState,
	) => {
		const sanitized = sanitizeInteger(value);
		if (sanitized !== null) updateRange(key, { [field]: sanitized });
	};

	const handleDecimalChange = (
		value: string,
		key: string,
		field: keyof RangeState,
	) => {
		const sanitized = sanitizeDecimal(value);
		if (sanitized !== null) updateRange(key, { [field]: sanitized });
	};

	const inputClass =
		"bg-white border border-gray-300 rounded-md px-2 py-1.5 w-[100px] focus:outline-none focus:ring-2 focus:ring-blue-300";

	return (
		<div>
			<PageTitle summary={false} />
			<div className="max-w-xl mx-auto space-y-4">
				{RANGES.map((cfg) => {
					const isDecimal = cfg.key === "pen";
					const state = ranges[cfg.key];
					const onValue = (v: string) =>
						isDecimal
							? handleDecimalChange(v, cfg.key, "value")
							: handleIntegerChange(v, cfg.key, "value");

					return (
						<div key={cfg.key} className="flex items-center gap-3">
							<span className="font-medium text-sm text-gray-700 w-[110px] text-right shrink-0">
								{cfg.label}
							</span>
							<input
								type="number"
								aria-label={`${cfg.label} first pile`}
								className={inputClass}
								value={state.first}
								onChange={(e) =>
									handleIntegerChange(e.target.value, cfg.key, "first")
								}
							/>
							<span className="text-gray-400">—</span>
							<input
								type="number"
								aria-label={`${cfg.label} last pile`}
								className={inputClass}
								value={state.last}
								onChange={(e) =>
									handleIntegerChange(e.target.value, cfg.key, "last")
								}
							/>
							<span className="text-sm text-gray-600">支数=</span>
							<input
								type="number"
								aria-label={`${cfg.label} value`}
								className={inputClass}
								value={state.value}
								onChange={(e) => onValue(e.target.value)}
							/>
						</div>
					);
				})}
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

export default CopyPage;
