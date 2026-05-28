import { afterEach, beforeEach, describe, expect, it } from "vitest";
import type { PrintData } from "@/schemas/FormSchema";
import {
	clearPrintData,
	loadFormConfig,
	loadPrintData,
	saveFormConfig,
	savePrintData,
} from "./storage";

const validPrintData: PrintData = {
	project: "P1",
	project2: "P2",
	pile: "PA",
	date: "2026-05-28",
	table: [
		[1, 2, 3, 4, 5],
		["", 0, 0, 0, 0],
	],
};

describe("storage (sessionStorage-backed, zod-validated)", () => {
	beforeEach(() => {
		sessionStorage.clear();
	});
	afterEach(() => {
		sessionStorage.clear();
	});

	describe("loadFormConfig", () => {
		it("returns null when missing", () => {
			expect(loadFormConfig()).toBeNull();
		});

		it("returns null when stored JSON fails schema", () => {
			sessionStorage.setItem("formD", JSON.stringify({ wrong: "shape" }));
			expect(loadFormConfig()).toBeNull();
		});

		it("returns null on malformed JSON (doesn't throw)", () => {
			sessionStorage.setItem("formD", "{not json");
			expect(loadFormConfig()).toBeNull();
		});

		it("returns parsed config when valid", () => {
			saveFormConfig({ minNum: 1, maxNum: 10 });
			expect(loadFormConfig()).toMatchObject({ minNum: 1, maxNum: 10 });
		});
	});

	describe("loadPrintData / savePrintData", () => {
		it("returns null when missing", () => {
			expect(loadPrintData()).toBeNull();
		});

		it("round-trips a valid PrintData", () => {
			savePrintData(validPrintData);
			expect(loadPrintData()).toEqual(validPrintData);
		});

		it("returns null when stored data fails schema", () => {
			sessionStorage.setItem("printData", JSON.stringify({ bogus: true }));
			expect(loadPrintData()).toBeNull();
		});
	});

	describe("clearPrintData", () => {
		it("removes printData key", () => {
			savePrintData(validPrintData);
			clearPrintData();
			expect(sessionStorage.getItem("printData")).toBeNull();
		});

		it("is a no-op when key absent", () => {
			expect(() => clearPrintData()).not.toThrow();
		});
	});
});
