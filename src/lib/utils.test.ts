import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
	it("joins simple class names", () => {
		expect(cn("a", "b")).toBe("a b");
	});

	it("filters falsy values", () => {
		expect(cn("a", false, null, undefined, "", "b")).toBe("a b");
	});

	it("resolves conditional objects", () => {
		expect(cn("a", { b: true, c: false })).toBe("a b");
	});

	it("flattens arrays", () => {
		expect(cn(["a", "b"], ["c"])).toBe("a b c");
	});

	it("merges conflicting tailwind classes (last wins)", () => {
		expect(cn("p-2", "p-4")).toBe("p-4");
	});

	it("merges conflicting tailwind color classes", () => {
		expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
	});

	it("keeps non-conflicting tailwind classes", () => {
		expect(cn("p-2", "m-4")).toBe("p-2 m-4");
	});

	it("returns empty string for no args", () => {
		expect(cn()).toBe("");
	});
});
