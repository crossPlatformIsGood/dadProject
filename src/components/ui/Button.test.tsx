import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
	it("renders children inside a button element by default", () => {
		render(<Button>Click</Button>);
		const btn = screen.getByRole("button", { name: "Click" });
		expect(btn.tagName).toBe("BUTTON");
	});

	it("applies the default amber variant when no variant set", () => {
		render(<Button>OK</Button>);
		const btn = screen.getByRole("button", { name: "OK" });
		expect(btn.className).toMatch(/bg-amber-400/);
	});

	it("applies the ghost-outline variant", () => {
		render(<Button variant="ghost-outline">Cancel</Button>);
		const btn = screen.getByRole("button", { name: "Cancel" });
		expect(btn.className).toMatch(/border-gray-300/);
		expect(btn.className).not.toMatch(/bg-amber-400/);
	});

	it("applies the xl size", () => {
		render(<Button size="xl">Submit</Button>);
		const btn = screen.getByRole("button", { name: "Submit" });
		expect(btn.className).toMatch(/h-12/);
		expect(btn.className).toMatch(/text-base/);
	});

	it("forwards arbitrary className without dropping variants", () => {
		render(<Button className="custom-x">Hi</Button>);
		const btn = screen.getByRole("button", { name: "Hi" });
		expect(btn.className).toMatch(/custom-x/);
		expect(btn.className).toMatch(/bg-amber-400/);
	});

	it("renders as the child element when asChild is true", () => {
		render(
			<Button asChild>
				<a href="/somewhere">Link</a>
			</Button>,
		);
		const link = screen.getByRole("link", { name: "Link" });
		expect(link.tagName).toBe("A");
		expect(link.className).toMatch(/bg-amber-400/);
	});

	it("respects disabled prop", () => {
		render(<Button disabled>Off</Button>);
		const btn = screen.getByRole("button", { name: "Off" });
		expect(btn).toBeDisabled();
		expect(btn.className).toMatch(/disabled:cursor-not-allowed/);
	});

	it("forwards ref to the underlying element", () => {
		const refHolder: { current: HTMLButtonElement | null } = { current: null };
		render(
			<Button
				ref={(el) => {
					refHolder.current = el;
				}}
			>
				R
			</Button>,
		);
		expect(refHolder.current).toBeInstanceOf(HTMLButtonElement);
	});
});
