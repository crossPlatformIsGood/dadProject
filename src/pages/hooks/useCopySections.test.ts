import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { COPY_SECTIONS, useCopySections } from "./useCopySections";

describe("useCopySections", () => {
	it("initializes all four sections empty", () => {
		const { result } = renderHook(() => useCopySections());
		for (const s of COPY_SECTIONS) {
			expect(result.current.state[s.id]).toEqual({
				first: "",
				last: "",
				value: "",
			});
		}
	});

	it("exposes the four canonical sections in order", () => {
		const { result } = renderHook(() => useCopySections());
		expect(result.current.sections.map((s) => s.id)).toEqual([
			"sixM",
			"threeM",
			"j",
			"p",
		]);
	});

	it("setField updates first/last freely (non-value fields not filtered)", () => {
		const { result } = renderHook(() => useCopySections());
		act(() => {
			result.current.setField("sixM", "first", "abc");
		});
		expect(result.current.state.sixM.first).toBe("abc");
	});

	it("setField('value') rejects non-digit input for integer sections", () => {
		const { result } = renderHook(() => useCopySections());
		act(() => {
			result.current.setField("sixM", "value", "12");
		});
		expect(result.current.state.sixM.value).toBe("12");
		act(() => {
			result.current.setField("sixM", "value", "12.5");
		});
		expect(result.current.state.sixM.value).toBe("12");
	});

	it("setField('value') accepts decimals for the penetration section", () => {
		const { result } = renderHook(() => useCopySections());
		act(() => {
			result.current.setField("p", "value", "1.25");
		});
		expect(result.current.state.p.value).toBe("1.25");
		act(() => {
			result.current.setField("p", "value", "1.255");
		});
		expect(result.current.state.p.value).toBe("1.25");
	});

	it("setField does not cross-contaminate sections", () => {
		const { result } = renderHook(() => useCopySections());
		act(() => {
			result.current.setField("sixM", "first", "1");
		});
		expect(result.current.state.threeM.first).toBe("");
	});
});
