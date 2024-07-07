import PageTitle from "@/components/PageTitle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const converttoJsonFormInfo = JSON.parse(formInfo ?? "");
  const printData = localStorage.getItem("printData");
  if (!printData) return <>没有该数据</>;
  const convertedToJsonPrintData = JSON.parse(printData);
  const tableList: number[][] = convertedToJsonPrintData.table;
  const project = convertedToJsonPrintData.project;
  const project2 = convertedToJsonPrintData.project2;
  const pile = convertedToJsonPrintData.pile;

  const handleSubmit = () => {
    const maxNum = converttoJsonFormInfo.maxNum;

    if (sixMFirst !== "" || sixMLast !== "") {
      if (sixValue === "") return alert("6M支数不能为空");
      if (sixMFirst === "" || sixMLast === "") return alert("6M号码不能为空");
      else if (parseInt(sixMFirst) === 0 || parseInt(sixMLast) === 0)
        return alert("6M 号码不能为0， 要大于等于1");
      else if (parseInt(sixMLast) < parseInt(sixMFirst))
        return alert("第二个号码少过" + sixMFirst);
      else if (parseInt(sixMLast) > maxNum)
        return alert("第二个号码不能大于" + maxNum);

      const total: number = parseInt(sixMLast);
      const startedNumber: number = parseInt(sixMFirst) - 1;

      for (let i = startedNumber; i < total; i++) {
        tableList[i][1] = parseInt(sixValue);
      }
    }

    if (threeMFirst !== "" || threeMLast !== "") {
      if (threeValue === "") return alert("3M支数不能为空");
      if (threeMFirst === "" || threeMLast === "")
        return alert("3M号码不能为空");
      else if (parseInt(threeMFirst) === 0 || parseInt(threeMLast) === 0)
        return alert("3M 号码不能为0， 要大于等于1");
      else if (parseInt(threeMLast) < parseInt(threeMFirst))
        return alert("第二个号码少过" + threeMFirst);
      else if (parseInt(threeMLast) > maxNum)
        return alert("第二个号码不能大于" + maxNum);

      const total: number = parseInt(threeMLast);
      const startedNumber: number = parseInt(threeMFirst) - 1;

      for (let i = startedNumber; i < total; i++) {
        tableList[i][2] = parseInt(threeValue);
      }
    }

    if (jFirst !== "" || jLast !== "") {
      if (jValue === "") return alert("Joint支数不能为空");
      if (jFirst === "" || jLast === "") return alert("JOINT号码不能为空");
      else if (parseInt(jFirst) === 0 || parseInt(jLast) === 0)
        return alert("JOINT号码不能为0， 要大于等于1");
      else if (parseInt(jLast) < parseInt(jFirst))
        return alert("第二个号码少过" + jFirst);
      else if (parseInt(jLast) > maxNum)
        return alert("第二个号码不能大于" + maxNum);

      const total: number = parseInt(jLast);
      const startedNumber: number = parseInt(jFirst) - 1;

      for (let i = startedNumber; i < total; i++) {
        tableList[i][3] = parseInt(jValue);
      }
    }

    if (pFirst !== "" || pLast !== "") {
      if (pValue === "") return alert("PENETRATION支数不能为空");
      if (pFirst === "" || pLast === "") return alert("JOINT号码不能为空");
      else if (parseInt(pFirst) === 0 || parseInt(pFirst) === 0)
        return alert("PENETRATION 号码不能为0， 要大于等于1");
      else if (parseInt(pLast) < parseInt(pFirst))
        return alert("第二个号码少过" + pFirst);
      else if (parseInt(pLast) > maxNum)
        return alert("第二个号码不能大于" + maxNum);

      const total: number = parseInt(pLast);
      const startedNumber: number = parseInt(pFirst) - 1;

      for (let i = startedNumber; i < total; i++) {
        tableList[i][4] = parseInt(pValue);
      }
    }
    const printData = {
      project,
      project2,
      pile,
      table: tableList,
    };

    localStorage.setItem("printData", JSON.stringify(printData));
    navigate("/newform");
  };

  const handleDecimalChange = (value: any) => {
    const regex = /^\d*\.?\d{0,2}$/; //2 decimal

    if (regex.test(value)) {
      setPValue(value);
    }
  };

  const handleChange = (value: any, setValue: any) => {
    const regex = /^\d*$/; // Only digits (no negative or decimal)
    if (regex.test(value)) {
      setValue(value);
    }
  };

  return (
    <div>
      <PageTitle summary={false} />
      <div className="w-[600px] m-auto">
        <div className="flex space-x-5 items-center mt-5">
          <div className="flex items-center space-x-2">
            <span>6 METER</span>
            <input
              type="number"
              maxLength={100}
              className="bg-white border w-[100px]"
              value={sixMFirst}
              onChange={(e) => setSixMFirst(e.target.value)}
            />
          </div>
          <div>-</div>
          <div>
            <input
              type="number"
              maxLength={100}
              className="bg-white border w-[100px]"
              value={sixMLast}
              onChange={(e) => setSixMLast(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <span>支数=</span>
            <input
              type="number"
              maxLength={100}
              className="bg-white border w-[100px]"
              value={sixValue}
              onChange={(e) =>
                handleChange(parseInt(e.target.value), setSixValue)
              }
            />
          </div>
        </div>

        <div className="flex space-x-5 items-center mt-5">
          <div className="flex items-center space-x-2">
            <span>3 METER</span>
            <input
              type="number"
              maxLength={100}
              className="bg-white border w-[100px]"
              value={threeMFirst}
              onChange={(e) => setThreeMFirst(e.target.value)}
            />
          </div>
          <div>-</div>
          <div>
            <input
              type="number"
              maxLength={100}
              className="bg-white border w-[100px]"
              value={threeMLast}
              onChange={(e) => setThreeMLast(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <span>支数=</span>
            <input
              type="number"
              maxLength={100}
              className="bg-white border w-[100px]"
              value={threeValue}
              onChange={(e) =>
                handleChange(parseInt(e.target.value), setThreeValue)
              }
            />
          </div>
        </div>

        <div className="flex space-x-5 items-center mt-5">
          <div className="flex items-center space-x-2">
            <span>JOINT</span>
            <input
              type="number"
              maxLength={100}
              className="bg-white border w-[100px]"
              value={jFirst}
              onChange={(e) => setJFirst(e.target.value)}
            />
          </div>
          <div>-</div>
          <div>
            <input
              type="number"
              maxLength={100}
              className="bg-white border w-[100px]"
              value={jLast}
              onChange={(e) => setJLast(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <span>支数=</span>
            <input
              type="number"
              maxLength={100}
              className="bg-white border w-[100px]"
              value={jValue}
              onChange={(e) =>
                handleChange(parseInt(e.target.value), setJValue)
              }
            />
          </div>
        </div>

        <div className="flex space-x-5 items-center mt-5">
          <div className="flex items-center space-x-2">
            <span>PENETRATION</span>
            <input
              type="number"
              maxLength={100}
              className="bg-white border w-[100px]"
              value={pFirst}
              onChange={(e) => setPFirst(e.target.value)}
            />
          </div>
          <div>-</div>
          <div>
            <input
              type="number"
              maxLength={100}
              className="bg-white border w-[100px]"
              value={pLast}
              onChange={(e) => setPLast(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <span>支数=</span>
            <input
              type="number"
              maxLength={100}
              className="bg-white border w-[100px]"
              value={pValue}
              onChange={(e) => handleDecimalChange(parseFloat(e.target.value))}
            />
          </div>
        </div>
      </div>
      <div className="text-center pt-5 flex justify-center">
        <input
          className="bg-amber-300 px-8 py-2 cursor-pointer"
          type="button"
          value="OK"
          onClick={handleSubmit}
        />
        <div style={{ marginLeft: "10px", marginRight: "10px" }}></div>
        <input
          className="bg-amber-300 px-8 py-2 cursor-pointer"
          type="button"
          value="返回"
          onClick={() => navigate("/newform")}
        />
      </div>
    </div>
  );
};

export default CopyPage;
