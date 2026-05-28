import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormTable from "@/components/FormTable";
import PageTitle from "@/components/PageTitle";
import { getFormD, getPrintData, setPrintData } from "@/lib/storage";
import { useFormTable } from "./hooks/useFormTable";

const labelInputClass =
	"bg-white border border-gray-300 rounded-md px-3 py-1.5 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-300";

const NewFormPage = () => {
	const navigate = useNavigate();
	const formD = getFormD();
	const printData = getPrintData();

	const rows = formD ? formD.maxNum - formD.minNum + 1 : 0;
	const { values, setCell, setCellDecimal, toNumericMatrix } = useFormTable({
		rows,
		cols: 5,
		initial: printData?.table,
	});

	const [project, setProject] = useState(printData?.project ?? "");
	const [project2, setProject2] = useState(printData?.project2 ?? "");
	const [pile, setPile] = useState(printData?.pile ?? "");

	if (!formD) return <div>No form</div>;

	const saveAndGo = (path: "/print" | "/copy") => {
		setPrintData({
			project,
			project2,
			pile,
			table: toNumericMatrix(),
		});
		navigate(path);
	};

	return (
		<div>
			<form>
				<PageTitle />
				<div className="space-y-3 max-w-2xl mx-auto">
					<div className="flex items-center gap-3">
						<span className="font-bold text-sm text-gray-700 w-[120px] text-right shrink-0">
							PROJECT:
						</span>
						<input
							type="text"
							maxLength={100}
							name="p1"
							className={labelInputClass}
							value={project}
							onChange={(e) => setProject(e.target.value)}
						/>
					</div>
					<div className="flex items-center gap-3">
						<div className="w-[120px] shrink-0" />
						<input
							type="text"
							maxLength={100}
							className={labelInputClass}
							value={project2}
							onChange={(e) => setProject2(e.target.value)}
						/>
					</div>
					<div className="flex items-center gap-3">
						<span className="font-bold text-sm text-gray-700 w-[120px] text-right shrink-0">
							SIZE OF PILE:
						</span>
						<input
							type="text"
							maxLength={100}
							className={labelInputClass}
							value={pile}
							onChange={(e) => setPile(e.target.value)}
						/>
					</div>
				</div>

				<FormTable
					values={values}
					minNum={formD.minNum}
					roleLabel={formD.role}
					onChange={setCell}
					onDecimalChange={setCellDecimal}
				/>

				<div className="flex justify-center gap-3 pt-5">
					<button
						className="bg-amber-400 hover:bg-amber-500 text-gray-800 font-medium px-8 py-2 rounded-md cursor-pointer transition-colors"
						type="button"
						onClick={() => saveAndGo("/print")}
					>
						保存
					</button>
					<button
						className="bg-amber-400 hover:bg-amber-500 text-gray-800 font-medium px-8 py-2 rounded-md cursor-pointer transition-colors"
						type="button"
						onClick={() => saveAndGo("/copy")}
					>
						复制
					</button>
				</div>
			</form>
		</div>
	);
};

export default NewFormPage;
