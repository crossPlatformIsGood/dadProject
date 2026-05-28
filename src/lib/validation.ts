export type RangeMessages = {
	emptyValue: string;
	emptyNumber: string;
	zeroNumber: string;
	lastLessThanFirst: (first: string) => string;
	lastGreaterThanMax: (maxNum: number) => string;
};

export type RangeInput = {
	first: string;
	last: string;
	value: string;
	maxNum: number;
	messages: RangeMessages;
};

export type RangeResult =
	| { kind: "skip" }
	| { kind: "error"; message: string }
	| { kind: "ok"; start: number; end: number };

export function validateRange({
	first,
	last,
	value,
	maxNum,
	messages,
}: RangeInput): RangeResult {
	if (first === "" && last === "") return { kind: "skip" };

	if (value === "") return { kind: "error", message: messages.emptyValue };
	if (first === "" || last === "")
		return { kind: "error", message: messages.emptyNumber };

	const firstN = parseInt(first, 10);
	const lastN = parseInt(last, 10);

	if (firstN === 0 || lastN === 0)
		return { kind: "error", message: messages.zeroNumber };
	if (lastN < firstN)
		return { kind: "error", message: messages.lastLessThanFirst(first) };
	if (lastN > maxNum)
		return { kind: "error", message: messages.lastGreaterThanMax(maxNum) };

	return { kind: "ok", start: firstN - 1, end: lastN };
}
