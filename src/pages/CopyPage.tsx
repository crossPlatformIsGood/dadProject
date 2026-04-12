import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "@/components/PageTitle";

const CopyPage = () => {
	const navigate = useNavigate();
	const [sixMFirst, setSixMFirst] = useState("");
	const [sixMLast, setSixMLast] = useState("");
	const [sixValue, setSixValue] = useState("");
	const [threeMFirst, setThreeMFirst] = useState("");
	const [threeMLast, setThreeMLast] = useState("");
	const [threeValue, setThreeValue] = useState("");
	const [jFirst, setJFirst] = useState("");
	const [jLast, setJLast] = useState("");
	const [jValue, setJValue] = useState("");
	const [pFirst, setPFirst] = useState("");
	const [pLast, setPLast] = useState("");
	const [pValue, setPValue] = useState("");
	const formInfo = localStorage.getItem("formD");
	if (!formInfo) return <>没有该数据</>;
	const converttoJsonFormInfo = JSON.parse(formInfo);
	const printData = localStorage.getItem("printData");
	if (!printData) return <>没有该数据</>;
	const convertedToJsonPrintData = JSON.parse(printData);
	const tableList: number[][] = convertedToJsonPrintData.table;
	const project = convertedToJsonPrintData.project;
	const project2 = convertedToJsonPrintData.project2;
	const pile = convertedToJsonPrintData.pile;
	const date = convertedToJsonPrintData.date;

	const handleSubmit = () => {
		const maxNum = converttoJsonFormInfo.maxNum;

		if (sixMFirst !== "" || sixMLast !== "") {
			if (sixValue === "") return alert("6M支数不能为空");
			if (sixMFirst === "" || sixMLast === "") return alert("6M号码不能为空");
			else if (parseInt(sixMFirst, 10) === 0 || parseInt(sixMLast, 10) === 0)
				return alert("6M 号码不能为0， 要大于等于1");
			else if (parseInt(sixMLast, 10) < parseInt(sixMFirst, 10))
				return alert(`第二个号码少过${sixMFirst}`);
			else if (parseInt(sixMLast, 10) > maxNum)
				return alert(`第二个号码不能大于${maxNum}`);

			const total: number = parseInt(sixMLast, 10);
			const startedNumber: number = parseInt(sixMFirst, 10) - 1;

			for (let i = startedNumber; i < total; i++) {
				tableList[i][1] = parseInt(sixValue, 10);
			}
		}

		if (threeMFirst !== "" || threeMLast !== "") {
			if (threeValue === "") return alert("3M支数不能为空");
			if (threeMFirst === "" || threeMLast === "")
				return alert("3M号码不能为空");
			else if (
				parseInt(threeMFirst, 10) === 0 ||
				parseInt(threeMLast, 10) === 0
			)
				return alert("3M 号码不能为0， 要大于等于1");
			else if (parseInt(threeMLast, 10) < parseInt(threeMFirst, 10))
				return alert(`第二个号码少过${threeMFirst}`);
			else if (parseInt(threeMLast, 10) > maxNum)
				return alert(`第二个号码不能大于${maxNum}`);

			const total: number = parseInt(threeMLast, 10);
			const startedNumber: number = parseInt(threeMFirst, 10) - 1;

			for (let i = startedNumber; i < total; i++) {
				tableList[i][2] = parseInt(threeValue, 10);
			}
		}

		if (jFirst !== "" || jLast !== "") {
			if (jValue === "") return alert("Joint支数不能为空");
			if (jFirst === "" || jLast === "") return alert("JOINT号码不能为空");
			else if (parseInt(jFirst, 10) === 0 || parseInt(jLast, 10) === 0)
				return alert("JOINT号码不能为0， 要大于等于1");
			else if (parseInt(jLast, 10) < parseInt(jFirst, 10))
				return alert(`第二个号码少过${jFirst}`);
			else if (parseInt(jLast, 10) > maxNum)
				return alert(`第二个号码不能大于${maxNum}`);

			const total: number = parseInt(jLast, 10);
			const startedNumber: number = parseInt(jFirst, 10) - 1;

			for (let i = startedNumber; i < total; i++) {
				tableList[i][3] = parseInt(jValue, 10);
			}
		}

		if (pFirst !== "" || pLast !== "") {
			if (pValue === "") return alert("PENETRATION支数不能为空");
			if (pFirst === "" || pLast === "")
				return alert("PENETRATION号码不能为空");
			else if (parseInt(pFirst, 10) === 0 || parseInt(pLast, 10) === 0)
				return alert("PENETRATION 号码不能为0， 要大于等于1");
			else if (parseInt(pLast, 10) < parseInt(pFirst, 10))
				return alert(`第二个号码少过${pFirst}`);
			else if (parseInt(pLast, 10) > maxNum)
				return alert(`第二个号码不能大于${maxNum}`);

			const total: number = parseInt(pLast, 10);
			const startedNumber: number = parseInt(pFirst, 10) - 1;

			for (let i = startedNumber; i < total; i++) {
				tableList[i][4] = parseFloat(pValue);
			}
		}
		const printData = {
			project,
			project2,
			pile,
			date,
			table: tableList,
		};

		localStorage.setItem("printData", JSON.stringify(printData));
		navigate("/newform");
	};

	const handleDecimalChange = (value: string) => {
		const regex = /^\d*\.?\d{0,2}$/; //2 decimal

		if (regex.test(value)) {
			// replace 0 to number
			const sanitizedValue = value.replace(/^0+(?=\d)/, "");
			setPValue(sanitizedValue);
		}
	};

	const handleChange = (value: string, setValue: (v: string) => void) => {
		const regex = /^\d*$/; // Only digits (no negative or decimal)
		if (regex.test(value)) {
			// replace 0 to number
			const sanitizedValue = value.replace(/^0+(?=\d)/, "");
			setValue(sanitizedValue);
		}
	};

	const inputClass =
		"bg-white border border-gray-300 rounded-md px-2 py-1.5 w-[100px] focus:outline-none focus:ring-2 focus:ring-blue-300";

	return (
		<div>
			<PageTitle summary={false} />
			<div className="max-w-xl mx-auto space-y-4">
				<div className="flex items-center gap-3">
					<span className="font-medium text-sm text-gray-700 w-[110px] text-right shrink-0">
						6 METER
					</span>
					<input
						type="number"
						className={inputClass}
						value={sixMFirst}
						onChange={(e) => handleChange(e.target.value, setSixMFirst)}
					/>
					<span className="text-gray-400">—</span>
					<input
						type="number"
						className={inputClass}
						value={sixMLast}
						onChange={(e) => handleChange(e.target.value, setSixMLast)}
					/>
					<span className="text-sm text-gray-600">支数=</span>
					<input
						type="number"
						className={inputClass}
						value={sixValue}
						onChange={(e) => handleChange(e.target.value, setSixValue)}
					/>
				</div>

				<div className="flex items-center gap-3">
					<span className="font-medium text-sm text-gray-700 w-[110px] text-right shrink-0">
						3 METER
					</span>
					<input
						type="number"
						className={inputClass}
						value={threeMFirst}
						onChange={(e) => handleChange(e.target.value, setThreeMFirst)}
					/>
					<span className="text-gray-400">—</span>
					<input
						type="number"
						className={inputClass}
						value={threeMLast}
						onChange={(e) => handleChange(e.target.value, setThreeMLast)}
					/>
					<span className="text-sm text-gray-600">支数=</span>
					<input
						type="number"
						className={inputClass}
						value={threeValue}
						onChange={(e) => handleChange(e.target.value, setThreeValue)}
					/>
				</div>

				<div className="flex items-center gap-3">
					<span className="font-medium text-sm text-gray-700 w-[110px] text-right shrink-0">
						JOINT
					</span>
					<input
						type="number"
						className={inputClass}
						value={jFirst}
						onChange={(e) => handleChange(e.target.value, setJFirst)}
					/>
					<span className="text-gray-400">—</span>
					<input
						type="number"
						className={inputClass}
						value={jLast}
						onChange={(e) => handleChange(e.target.value, setJLast)}
					/>
					<span className="text-sm text-gray-600">支数=</span>
					<input
						type="number"
						className={inputClass}
						value={jValue}
						onChange={(e) => handleChange(e.target.value, setJValue)}
					/>
				</div>

				<div className="flex items-center gap-3">
					<span className="font-medium text-sm text-gray-700 w-[110px] text-right shrink-0">
						PENETRATION
					</span>
					<input
						type="number"
						className={inputClass}
						value={pFirst}
						onChange={(e) => handleChange(e.target.value, setPFirst)}
					/>
					<span className="text-gray-400">—</span>
					<input
						type="number"
						className={inputClass}
						value={pLast}
						onChange={(e) => handleChange(e.target.value, setPLast)}
					/>
					<span className="text-sm text-gray-600">支数=</span>
					<input
						type="number"
						className={inputClass}
						value={pValue}
						onChange={(e) => handleDecimalChange(e.target.value)}
					/>
				</div>
			</div>

			<div className="flex justify-center gap-3 pt-6">
				<button
					className="bg-amber-400 hover:bg-amber-500 text-gray-800 font-medium px-8 py-2 rounded-md cursor-pointer transition-colors"
					type="button"
					onClick={handleSubmit}
				>
					OK
				</button>
				<button
					className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-8 py-2 rounded-md cursor-pointer transition-colors"
					type="button"
					onClick={() => navigate("/newform")}
				>
					返回
				</button>
			</div>
		</div>
	);
};

export default CopyPage;
