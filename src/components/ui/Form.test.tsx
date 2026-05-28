import { render, renderHook, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { describe, expect, it } from "vitest";
import { FormField, FormItem, useFormField } from "./Form";

const Wrapper = ({ children }: { children: ReactNode }) => {
	const methods = useForm({ defaultValues: { name: "" } });
	return (
		<FormProvider {...methods}>
			<FormField
				name="name"
				control={methods.control}
				render={() => <FormItem>{children as React.ReactElement}</FormItem>}
			/>
		</FormProvider>
	);
};

const Probe = () => {
	const field = useFormField();
	return (
		<div>
			<span data-testid="name">{field.name}</span>
			<span data-testid="formItemId">{field.formItemId}</span>
			<span data-testid="formDescriptionId">{field.formDescriptionId}</span>
			<span data-testid="formMessageId">{field.formMessageId}</span>
		</div>
	);
};

describe("useFormField", () => {
	it("returns field metadata when nested in FormField + FormItem", () => {
		render(
			<Wrapper>
				<Probe />
			</Wrapper>,
		);
		expect(screen.getByTestId("name").textContent).toBe("name");
		expect(screen.getByTestId("formItemId").textContent).toMatch(/-form-item$/);
		expect(screen.getByTestId("formDescriptionId").textContent).toMatch(
			/-form-item-description$/,
		);
		expect(screen.getByTestId("formMessageId").textContent).toMatch(
			/-form-item-message$/,
		);
	});

	it("derives ids that share the same prefix", () => {
		render(
			<Wrapper>
				<Probe />
			</Wrapper>,
		);
		const itemId = screen.getByTestId("formItemId").textContent ?? "";
		const prefix = itemId.replace(/-form-item$/, "");
		expect(screen.getByTestId("formDescriptionId").textContent).toBe(
			`${prefix}-form-item-description`,
		);
		expect(screen.getByTestId("formMessageId").textContent).toBe(
			`${prefix}-form-item-message`,
		);
	});

	it("throws when used outside FormProvider", () => {
		expect(() => renderHook(() => useFormField())).toThrow();
	});
});
