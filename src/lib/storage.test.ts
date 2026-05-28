import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
	getFormD,
	getPrintData,
	type PrintData,
	setPrintData,
} from "./storage";

describe("storage", () => {
	beforeEach(() => {
		localStorage.clear();
	});
	afterEach(() => {
		localStorage.clear();
	});

	describe("getFormD", () => {
		it("returns null when key missing", () => {
			expect(getFormD()).toBeNull();
		});

		it("parses stored JSON", () => {
			localStorage.setItem(
				"formD",
				JSON.stringify({ maxNum: 10, minNum: 1, role: "MM" }),
			);
			expect(getFormD()).toEqual({ maxNum: 10, minNum: 1, role: "MM" });
		});

		it("throws on malformed JSON (preserves original behavior)", () => {
			localStorage.setItem("formD", "{not json");
			expect(() => getFormD()).toThrow();
		});
	});

	describe("getPrintData", () => {
		it("returns null when missing", () => {
			expect(getPrintData()).toBeNull();
		});

		it("parses stored JSON", () => {
			const data: PrintData = {
				project: "A",
				project2: "B",
				pile: "P1",
				table: [[1, 2, 3, 4, 5]],
			};
			localStorage.setItem("printData", JSON.stringify(data));
			expect(getPrintData()).toEqual(data);
		});
	});

	describe("setPrintData", () => {
		it("writes JSON-stringified value to printData key", () => {
			const data: PrintData = {
				project: "X",
				project2: "Y",
				pile: "Z",
				table: [["", 0]],
			};
			setPrintData(data);
			expect(localStorage.getItem("printData")).toBe(JSON.stringify(data));
		});

		it("round-trips through getPrintData", () => {
			const data: PrintData = {
				project: "p",
				project2: "p2",
				pile: "pi",
				table: [[1, 2]],
			};
			setPrintData(data);
			expect(getPrintData()).toEqual(data);
		});
	});
});
