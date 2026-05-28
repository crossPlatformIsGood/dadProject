import { describe, expect, it } from "vitest";
import { type RangeMessages, validateRange } from "./validation";

const messages: RangeMessages = {
	emptyValue: "支数不能为空",
	emptyNumber: "号码不能为空",
	zeroNumber: "号码不能为0",
	lastLessThanFirst: (first) => `第二个号码少过${first}`,
	lastGreaterThanMax: (maxNum) => `第二个号码不能大于${maxNum}`,
};

describe("validateRange", () => {
	it("skips when both first and last empty", () => {
		expect(
			validateRange({ first: "", last: "", value: "", maxNum: 10, messages }),
		).toEqual({ kind: "skip" });
	});

	it("errors when value empty but first is set", () => {
		expect(
			validateRange({ first: "1", last: "", value: "", maxNum: 10, messages }),
		).toEqual({ kind: "error", message: "支数不能为空" });
	});

	it("errors when only first set, last empty", () => {
		expect(
			validateRange({ first: "1", last: "", value: "5", maxNum: 10, messages }),
		).toEqual({ kind: "error", message: "号码不能为空" });
	});

	it("errors when first is 0", () => {
		expect(
			validateRange({
				first: "0",
				last: "5",
				value: "1",
				maxNum: 10,
				messages,
			}),
		).toEqual({ kind: "error", message: "号码不能为0" });
	});

	it("errors when last is 0", () => {
		expect(
			validateRange({
				first: "1",
				last: "0",
				value: "1",
				maxNum: 10,
				messages,
			}),
		).toEqual({ kind: "error", message: "号码不能为0" });
	});

	it("errors when last < first", () => {
		expect(
			validateRange({
				first: "5",
				last: "3",
				value: "1",
				maxNum: 10,
				messages,
			}),
		).toEqual({ kind: "error", message: "第二个号码少过5" });
	});

	it("errors when last > maxNum", () => {
		expect(
			validateRange({
				first: "1",
				last: "11",
				value: "1",
				maxNum: 10,
				messages,
			}),
		).toEqual({ kind: "error", message: "第二个号码不能大于10" });
	});

	it("returns ok with start = first - 1 and end = last", () => {
		expect(
			validateRange({
				first: "2",
				last: "5",
				value: "1",
				maxNum: 10,
				messages,
			}),
		).toEqual({ kind: "ok", start: 1, end: 5 });
	});
});
