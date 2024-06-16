import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewFormPage = () => {
  const navigate = useNavigate();
  const formInfo = localStorage.getItem("formD");
  const converttoJsonFormPage = JSON.parse(formInfo ?? "");

  const printData = localStorage.getItem("printData");
  const convertedToJsonPrintData = printData && JSON.parse(printData);
  const rows = [];
  if (converttoJsonFormPage === "") return <div>No form</div>;

  const x = converttoJsonFormPage.maxNum - converttoJsonFormPage.minNum;
  const [values, setValues] = useState<string[][]>(
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
      } else {
        cells.push(
          <td key={j}>
            <input
              type="text"
              name="mm"
              autoComplete="off"
              className="bg-white border"
              value={values[i][j]}
              onChange={(e) => handleChange(e.target.value, i, j)}
            />
          </td>
        );
      }
    }
    rows.push(<tr key={i}>{cells}</tr>);
  }

  const handleChange = (value: string, rowIndex: number, colIndex: number) => {
    const newValues = [...values];
    newValues[rowIndex][colIndex] = value;
    setValues(newValues);
  };

  const getSaveArray = async () => {
    // Define your logic for saving data here
    const mmValues = values.map((rows) =>
      rows.map((row) => (row === "" ? 0 : row))
    );

    const printData = {
      project,
      project2,
      pile,
      table: mmValues,
    };
    await localStorage.setItem("printData", JSON.stringify(printData));
    navigate("/print");
  };

  const getCopy = async () => {
    // Define your logic for copying data here
    const mmValues = values.map((rows) =>
      rows.map((row) => (row === "" ? 0 : row))
    );
    const printData = {
      project,
      project2,
      pile,
      table: mmValues,
    };
    await localStorage.setItem("printData", JSON.stringify(printData));
    navigate("/copy");
  };

  return (
    <div>
      <form>
        <div className="text-2xl font-bold">富財貿易打樁工程</div>
        <div className="text-2xl font-bold">
          FOOK CHOY TRADING & PILING ENGINEERING
        </div>
        <div className="text-xs">
          474,Jalan Nuri Indah 9,Taman Thivy Jaya,70100 Seremban,N.S.D.K
        </div>
        <div className="text-xs">(Co.No. 000805830-K)</div>
        <div className="text-xs flex space-x-5 justify-center items-center">
          <div>
            <span className="font-bold"> Tel: </span>
            <span>012-6367702</span>
          </div>
          <div>
            <span className="font-bold"> Email: </span>
            <span>fookchoy327@yahoo.com.my</span>
          </div>
        </div>
        <div className="text-base font-bold">PILING RECORD SUMMARY</div>
        <div className="flex space-x-2.5 justify-center">
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
