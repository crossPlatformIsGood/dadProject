import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useFormTable } from "./useFormTable";

describe("useFormTable", () => {
	it("initializes empty matrix of given dimensions", () => {
		const { result } = renderHook(() => useFormTable({ rows: 2, cols: 3 }));
		expect(result.current.values).toEqual([
			["", "", ""],
			["", "", ""],
		]);
	});

	it("uses provided initial matrix when supplied", () => {
		const initial = [
			[1, 2],
			[3, 4],
		];
		const { result } = renderHook(() =>
			useFormTable({ rows: 2, cols: 2, initial }),
		);
		expect(result.current.values).toEqual(initial);
	});

	it("setCell accepts digit-only input", () => {
		const { result } = renderHook(() => useFormTable({ rows: 1, cols: 2 }));
		act(() => result.current.setCell("42", 0, 0));
		expect(result.current.values[0][0]).toBe("42");
	});

	it("setCell rejects non-digit input", () => {
		const { result } = renderHook(() => useFormTable({ rows: 1, cols: 2 }));
		act(() => result.current.setCell("42", 0, 0));
		act(() => result.current.setCell("4.2", 0, 0));
		expect(result.current.values[0][0]).toBe("42");
	});

	it("setCellDecimal accepts up to 2 decimal places", () => {
		const { result } = renderHook(() => useFormTable({ rows: 1, cols: 2 }));
		act(() => result.current.setCellDecimal("1.25", 0, 1));
		expect(result.current.values[0][1]).toBe("1.25");
		act(() => result.current.setCellDecimal("1.256", 0, 1));
		expect(result.current.values[0][1]).toBe("1.25");
	});

	it("setCell only touches the targeted cell", () => {
		const { result } = renderHook(() => useFormTable({ rows: 2, cols: 2 }));
		act(() => result.current.setCell("9", 0, 0));
		expect(result.current.values[0][1]).toBe("");
		expect(result.current.values[1][0]).toBe("");
		expect(result.current.values[1][1]).toBe("");
	});

	it("toNumericMatrix converts blank cells to 0", () => {
		const { result } = renderHook(() => useFormTable({ rows: 1, cols: 3 }));
		act(() => result.current.setCell("5", 0, 1));
		expect(result.current.toNumericMatrix()).toEqual([[0, "5", 0]]);
	});
});
