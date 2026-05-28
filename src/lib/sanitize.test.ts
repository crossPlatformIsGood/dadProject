import { describe, expect, it } from "vitest";
import { sanitizeDecimal, sanitizeInteger } from "./sanitize";

describe("sanitizeInteger", () => {
	it("accepts empty string", () => {
		expect(sanitizeInteger("")).toBe("");
	});

	it("accepts digit-only input", () => {
		expect(sanitizeInteger("42")).toBe("42");
	});

	it("rejects decimals", () => {
		expect(sanitizeInteger("4.2")).toBeNull();
	});

	it("rejects letters", () => {
		expect(sanitizeInteger("4a")).toBeNull();
	});

	it("rejects negatives", () => {
		expect(sanitizeInteger("-4")).toBeNull();
	});

	it("strips leading zeros", () => {
		expect(sanitizeInteger("007")).toBe("7");
	});

	it("preserves a single zero", () => {
		expect(sanitizeInteger("0")).toBe("0");
	});
});

describe("sanitizeDecimal", () => {
	it("accepts empty string", () => {
		expect(sanitizeDecimal("")).toBe("");
	});

	it("accepts integer input", () => {
		expect(sanitizeDecimal("12")).toBe("12");
	});

	it("accepts up to 2 decimal places by default", () => {
		expect(sanitizeDecimal("1.25")).toBe("1.25");
	});

	it("rejects more than 2 decimal places by default", () => {
		expect(sanitizeDecimal("1.256")).toBeNull();
	});

	it("honors custom maxDecimals", () => {
		expect(sanitizeDecimal("1.123", 3)).toBe("1.123");
		expect(sanitizeDecimal("1.1234", 3)).toBeNull();
	});

	it("rejects letters", () => {
		expect(sanitizeDecimal("1.2a")).toBeNull();
	});

	it("strips leading zeros while keeping the decimal portion", () => {
		expect(sanitizeDecimal("007.5")).toBe("7.5");
	});

	it("preserves leading 0 before the decimal point", () => {
		expect(sanitizeDecimal("0.5")).toBe("0.5");
	});
});
