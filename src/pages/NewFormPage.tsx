import PageTitle from "@/components/PageTitle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewFormPage = () => {
  const navigate = useNavigate();
  const formInfo = localStorage.getItem("formD");
  const converttoJsonFormPage = formInfo ? JSON.parse(formInfo) : "";

  const printData = localStorage.getItem("printData");
  const convertedToJsonPrintData = printData && JSON.parse(printData);
  const rows = [];
  if (converttoJsonFormPage === "") return <div>No form</div>;

  const x = converttoJsonFormPage.maxNum - converttoJsonFormPage.minNum;
  const [values, setValues] = useState<number[][]>(
    convertedToJsonPrintData?.table ||
      Array.from({ length: x + 1 }, () => Array(5).fill(""))
  );
  const [project, setProject] = useState(
    convertedToJsonPrintData?.project ?? ""
  );
  const [project2, setProject2] = useState(
    convertedToJsonPrintData?.project2 ?? ""
  );
  const [pile, setPile] = useState(convertedToJsonPrintData?.pile ?? "");

  let setx = converttoJsonFormPage.minNum;
  for (let i = 0; i <= x; i++) {
    const cells = [];
    for (let j = 0; j < 5; j++) {
      if (j === 0) {
        cells.push(<td key={j}>{setx}</td>);
        setx++;
      } else if (j === 4) {
        cells.push(
          <td key={j}>
            <input
              type="number"
              name="mm"
              autoComplete="off"
              className="bg-white border"
              pattern="^\d+(?:\.\d{1,2})?$"
              value={values[i][j]}
              onChange={(e) =>
                handleDecimalChange(parseFloat(e.target.value), i, j)
              }
            />
          </td>
        );
      } else {
        cells.push(
          <td key={j}>
            <input
              type="number"
              name="mm"
              autoComplete="off"
              className="bg-white border"
              value={values[i][j]}
              onChange={(e) => handleChange(parseInt(e.target.value), i, j)}
            />
          </td>
        );
      }
    }
    rows.push(<tr key={i}>{cells}</tr>);
  }

  const handleChange = (value: any, rowIndex: number, colIndex: number) => {
    const regex = /^\d*$/; // Only digits (no negative or decimal)
    if (regex.test(value)) {
      const newValues = [...values];
      newValues[rowIndex][colIndex] = value;
      setValues(newValues);
    }
  };

  const handleDecimalChange = (
    value: any,
    rowIndex: number,
    colIndex: number
  ) => {
    const regex = /^\d*\.?\d{0,2}$/; //2 decimal

    if (regex.test(value)) {
      const newValues = [...values];
      newValues[rowIndex][colIndex] = value;
      setValues(newValues);
    }
  };

  const getSaveArray = () => {
    // Define your logic for saving data here
    const mmValues = values.map((rows) =>
      rows.map((row) => (row.toString() === "" ? 0 : row))
    );
    const printData = {
      project,
      project2,
      pile,
      table: mmValues,
    };

    localStorage.setItem("printData", JSON.stringify(printData));
    navigate("/print");
  };

  const getCopy = () => {
    // Define your logic for copying data here
    const mmValues = values.map((rows) =>
      rows.map((row) => (row.toString() === "" ? 0 : row))
    );
    const printData = {
      project,
      project2,
      pile,
      table: mmValues,
    };
    localStorage.setItem("printData", JSON.stringify(printData));
    navigate("/copy");
  };

  return (
    <div>
      <form>
        <PageTitle/>
        <div className="flex space-x-2.5 justify-center mt-3">
          <div>PROJECT: </div>
          <input
            type="text"
            maxLength={100}
            name="p1"
            className="bg-white border w-[470px]"
            value={project}
            onChange={(e) => {
              setProject(e.target.value);
            }}
          />
        </div>
        <div className="pl-[83px] mt-2.5">
          <input
            type="text"
            maxLength={100}
            className="bg-white border w-[470px]"
            value={project2}
            onChange={(e) => {
              setProject2(e.target.value);
            }}
          />
        </div>

        <div className="flex space-x-2.5 mt-2.5 justify-center pr-[26px]">
          <div>SIZE OF PILE: </div>
          <input
            type="text"
            maxLength={100}
            className="bg-white border w-[470px]"
            value={pile}
            onChange={(e) => {
              setPile(e.target.value);
            }}
          />
        </div>

        <table border={10} align="center" className="border-collapse mt-5">
          <thead>
            <tr>
              <th>PILE NO</th>
              <th>PILE LENGTEHS 6 METER</th>
              <th>PILE LENGTEHS 3 METER</th>
              <th>JOINTS NO</th>
              <th className="uppercase">{converttoJsonFormPage.role}</th>
            </tr>
          </thead>

          <tbody>{rows}</tbody>
        </table>
        <div className="text-center pt-5 flex justify-center">
          <input
            className="bg-amber-300 px-8 py-2 cursor-pointer"
            type="button"
            value="保存"
            onClick={getSaveArray}
          />
          <div style={{ marginLeft: "10px", marginRight: "10px" }}></div>
          <input
            className="bg-amber-300 px-8 py-2 cursor-pointer"
            type="button"
            value="复制"
            onClick={getCopy}
          />
        </div>
      </form>
    </div>
  );
};

export default NewFormPage;
