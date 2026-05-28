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
	"bg-surface border border-rule rounded-sm px-3 py-2 w-[120px] font-serif tabular-nums text-center text-base focus:outline-none focus:ring-2 focus:ring-seal focus:border-seal transition-colors";

const CopyPage = () => {
	const navigate = useNavigate();

	const formConfig = useMemo(loadFormConfig, []);
	const printData = useMemo(loadPrintData, []);

	const [ranges, setRanges] = useState<Record<string, RangeState>>(() =>
		Object.fromEntries(RANGES.map((r) => [r.key, { ...emptyRange }])),
	);
	const [errors, setErrors] = useState<Record<string, string | null>>({});

	if (!formConfig) return <FallbackMessage />;
	if (!printData) return <FallbackMessage />;

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
		<div className="max-w-2xl mx-auto px-4 py-6">
			<PageTitle summary={false} />

			<div className="border-2 border-double border-seal rounded-sm bg-surface shadow-md">
				<div className="border-b border-rule-soft px-6 py-3 text-center font-serif text-sm tracking-[0.3em] text-seal uppercase">
					【 复制数据 / Copy Range 】
				</div>

				<div className="divide-y divide-rule-soft">
					{RANGES.map((cfg) => {
						const isDecimal = cfg.key === "pen";
						const state = ranges[cfg.key];
						const error = errors[cfg.key];
						const errorId = `error-${cfg.key}`;
						const onValue = (v: string) =>
							isDecimal
								? handleDecimalChange(v, cfg.key, "value")
								: handleIntegerChange(v, cfg.key, "value");

						return (
							<section key={cfg.key} className="px-6 py-5">
								<div className="flex items-baseline justify-between mb-3">
									<h3 className="font-serif text-base font-semibold tracking-[0.2em] text-seal uppercase">
										{cfg.label}
									</h3>
									<span className="font-serif text-xs tracking-widest text-ink/60 uppercase">
										Range
									</span>
								</div>

								<div className="flex flex-wrap items-center gap-x-4 gap-y-3">
									<div className="flex items-center gap-2">
										<input
											type="number"
											aria-label={`${cfg.label} first pile`}
											aria-invalid={!!error}
											aria-describedby={error ? errorId : undefined}
											className={inputClass}
											value={state.first}
											onChange={(e) =>
												handleIntegerChange(e.target.value, cfg.key, "first")
											}
										/>
										<span className="text-rule font-serif text-xl">—</span>
										<input
											type="number"
											aria-label={`${cfg.label} last pile`}
											aria-invalid={!!error}
											aria-describedby={error ? errorId : undefined}
											className={inputClass}
											value={state.last}
											onChange={(e) =>
												handleIntegerChange(e.target.value, cfg.key, "last")
											}
										/>
									</div>

									<div className="flex items-center gap-3 ml-auto">
										<span className="font-serif text-sm tracking-wider text-ink/80">
											支数
										</span>
										<input
											type="number"
											aria-label={`${cfg.label} value`}
											aria-invalid={!!error}
											aria-describedby={error ? errorId : undefined}
											className={inputClass}
											value={state.value}
											onChange={(e) => onValue(e.target.value)}
										/>
									</div>
								</div>

								{error && (
									<p
										id={errorId}
										role="alert"
										data-testid={errorId}
										className="mt-3 font-serif text-sm font-medium text-seal"
									>
										⚠ {error}
									</p>
								)}
							</section>
						);
					})}
				</div>
			</div>

			<div className="flex justify-center gap-4 pt-8">
				<Button size="xl" type="button" onClick={handleSubmit}>
					【 OK 确认 】
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
	);
};

const FallbackMessage = () => (
	<div className="min-h-[60vh] flex items-center justify-center font-serif text-ink/70 text-lg">
		没有该数据
	</div>
);

export default CopyPage;
