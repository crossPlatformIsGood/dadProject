import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/Button";
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

const inputClass =
	"bg-white border border-gray-300 rounded-md px-2 py-1.5 w-[110px] tabular-nums focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors";

const CopyPage = () => {
	const navigate = useNavigate();

	const formConfig = useMemo(loadFormConfig, []);
	const printData = useMemo(loadPrintData, []);

	const [ranges, setRanges] = useState<Record<string, RangeState>>(() =>
		Object.fromEntries(RANGES.map((r) => [r.key, { ...emptyRange }])),
	);
	const [errors, setErrors] = useState<Record<string, string | null>>({});

	if (!formConfig) return <>没有该数据</>;
	if (!printData) return <>没有该数据</>;

	const maxNum = formConfig.maxNum;

	const updateRange = (key: string, patch: Partial<RangeState>) => {
		setRanges((prev) => ({ ...prev, [key]: { ...prev[key], ...patch } }));
		setErrors((prev) => (prev[key] ? { ...prev, [key]: null } : prev));
	};

	const validateRange = (
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

		return null;
	};

	const applyRange = (
		table: (string | number)[][],
		state: RangeState,
		cfg: RangeConfig,
	) => {
		const { first, last, value } = state;
		if (first === "" && last === "") return;
		const firstNum = parseInt(first, 10);
		const lastNum = parseInt(last, 10);
		const parsedValue = cfg.parser(value);
		for (let i = firstNum - 1; i < lastNum; i++) {
			const row = table[i];
			if (!row) continue;
			row[cfg.column] = parsedValue;
		}
	};

	const handleSubmit = () => {
		const nextErrors: Record<string, string | null> = {};
		for (const cfg of RANGES) {
			nextErrors[cfg.key] = validateRange(ranges[cfg.key], cfg);
		}
		setErrors(nextErrors);

		if (Object.values(nextErrors).some((e) => e !== null)) return;

		const table = printData.table.map((row) => [...row]);
		for (const cfg of RANGES) {
			applyRange(table, ranges[cfg.key], cfg);
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

	return (
		<div>
			<PageTitle summary={false} />
			<div className="max-w-xl mx-auto">
				<div className="rounded-lg border border-gray-200 bg-white shadow-sm p-6 space-y-5">
					{RANGES.map((cfg, index) => {
						const isDecimal = cfg.key === "pen";
						const state = ranges[cfg.key];
						const error = errors[cfg.key];
						const onValue = (v: string) =>
							isDecimal
								? handleDecimalChange(v, cfg.key, "value")
								: handleIntegerChange(v, cfg.key, "value");

						return (
							<div
								key={cfg.key}
								className={
									index > 0 ? "pt-5 border-t border-gray-100" : undefined
								}
							>
								<div className="flex items-center gap-3">
									<span className="font-medium text-sm text-gray-700 w-[110px] text-right shrink-0">
										{cfg.label}
									</span>
									<input
										type="number"
										aria-label={`${cfg.label} first pile`}
										aria-invalid={!!error}
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
										aria-invalid={!!error}
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
										aria-invalid={!!error}
										className={inputClass}
										value={state.value}
										onChange={(e) => onValue(e.target.value)}
									/>
								</div>
								{error && (
									<p
										role="alert"
										data-testid={`error-${cfg.key}`}
										className="mt-2 ml-[122px] text-sm font-medium text-red-600"
									>
										⚠ {error}
									</p>
								)}
							</div>
						);
					})}
				</div>

				<div className="flex justify-center gap-3 pt-6">
					<Button size="xl" type="button" onClick={handleSubmit}>
						OK 确认
					</Button>
					<Button
						size="xl"
						variant="ghost-outline"
						type="button"
						onClick={() => navigate("/newform")}
					>
						返回
					</Button>
				</div>
			</div>
		</div>
	);
};

export default CopyPage;
