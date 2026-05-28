import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { saveFormConfig, savePrintData } from "@/lib/storage";
import CopyPage from "./CopyPage";

const navigateMock = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
	const actual = await importOriginal<typeof import("react-router-dom")>();
	return {
		...actual,
		useNavigate: () => navigateMock,
	};
});

vi.mock("@/components/PageTitle", () => ({
	default: () => <h1>PageTitle</h1>,
}));

const seedStorage = () => {
	saveFormConfig({ minNum: 1, maxNum: 10 });
	savePrintData({
		project: "P",
		project2: "",
		pile: "",
		date: "",
		table: Array.from({ length: 10 }, () => Array(5).fill(0)),
	});
};

const renderPage = () =>
	render(
		<MemoryRouter>
			<CopyPage />
		</MemoryRouter>,
	);

describe("CopyPage", () => {
	beforeEach(() => {
		sessionStorage.clear();
		navigateMock.mockReset();
	});
	afterEach(() => {
		sessionStorage.clear();
	});

	it("shows fallback when form config missing", () => {
		render(
			<MemoryRouter>
				<CopyPage />
			</MemoryRouter>,
		);
		expect(screen.getByText("没有该数据")).toBeInTheDocument();
	});

	it("submits with no input and navigates to /newform", async () => {
		seedStorage();
		renderPage();
		const user = userEvent.setup();
		await user.click(screen.getByRole("button", { name: "确认" }));
		expect(navigateMock).toHaveBeenCalledWith("/newform");
	});

	it("shows inline error (not alert) when last < first", async () => {
		seedStorage();
		renderPage();
		const user = userEvent.setup();

		const firstInput = screen.getByLabelText("6 METER first pile");
		const lastInput = screen.getByLabelText("6 METER last pile");
		const valueInput = screen.getByLabelText("6 METER value");

		await user.type(firstInput, "5");
		await user.type(lastInput, "3");
		await user.type(valueInput, "1");
		await user.click(screen.getByRole("button", { name: "确认" }));

		expect(screen.getByTestId("error-sixM")).toHaveTextContent(
			"第二个号码少过5",
		);
		expect(navigateMock).not.toHaveBeenCalled();
	});

	it("clears the inline error after the user edits the section", async () => {
		seedStorage();
		renderPage();
		const user = userEvent.setup();

		const firstInput = screen.getByLabelText("6 METER first pile");
		const lastInput = screen.getByLabelText("6 METER last pile");
		const valueInput = screen.getByLabelText("6 METER value");

		await user.type(firstInput, "5");
		await user.type(lastInput, "3");
		await user.type(valueInput, "1");
		await user.click(screen.getByRole("button", { name: "确认" }));
		expect(screen.getByTestId("error-sixM")).toBeInTheDocument();

		await user.clear(lastInput);
		await user.type(lastInput, "7");
		expect(screen.queryByTestId("error-sixM")).not.toBeInTheDocument();
	});

	it("flags 'last > maxNum' against the configured maxNum", async () => {
		seedStorage();
		renderPage();
		const user = userEvent.setup();

		await user.type(screen.getByLabelText("3 METER first pile"), "1");
		await user.type(screen.getByLabelText("3 METER last pile"), "11");
		await user.type(screen.getByLabelText("3 METER value"), "5");
		await user.click(screen.getByRole("button", { name: "确认" }));

		expect(screen.getByTestId("error-threeM")).toHaveTextContent(
			"第二个号码不能大于10",
		);
	});

	it("返回 button navigates back to /newform", async () => {
		seedStorage();
		renderPage();
		const user = userEvent.setup();
		await user.click(screen.getByRole("button", { name: "返回" }));
		expect(navigateMock).toHaveBeenCalledWith("/newform");
	});
});
