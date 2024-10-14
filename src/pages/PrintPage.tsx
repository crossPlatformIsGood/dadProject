import { useNavigate } from "react-router-dom";
import "./printpage.css";
import PageTitle from "@/components/PageTitle";

const PrintPage = () => {
  const navigate = useNavigate();
  const printData = localStorage.getItem("printData");
  const formInfo = localStorage.getItem("formD");
  const converttoJsonFormInfo = JSON.parse(formInfo ?? "");
  let setx = converttoJsonFormInfo.minNum;

  if (!printData) return <>没有该数据</>;
  const convertedToJsonPrintData = JSON.parse(printData);
  const project = convertedToJsonPrintData.project;
  const project2 = convertedToJsonPrintData.project2;
  const pile = convertedToJsonPrintData.pile;
  const tables = convertedToJsonPrintData.table;
  const displayRows = new Array();
  const rows = new Array();

  function sumArrays(data: any): number[] {
    // Check if the table has any rows
    if (data.length === 0) return [];

    // Initialize the result array with zeros of the same length as the first inner array
    const result = new Array(data[0].length).fill(0);
    // Iterate over each array in the table
    for (const array of data) {
      // Sum the corresponding elements
      for (let i = 0; i < array.length; i++) {
        if (i === 4) {
          result[i] = parseFloat(result[i]) + parseFloat(array[i]);
        } else result[i] += parseInt(array[i]);
      }
    }

    return result;
  }

  tables.map((table: any, tableIndex: number) => {
    const displayCells = new Array();
    const cells = new Array();
    table.map((row: any, index: number) => {
      if (index === 0) {
        displayCells.push(<td key={index} className="text-xs">{setx}</td>);
        cells.push(setx);
        setx++;
      } else {
        displayCells.push(<td key={index} className="text-xs">{row}</td>);
        cells.push(row);
      }
    });

    displayRows.push(<tr key={tableIndex}>{displayCells}</tr>);
    rows.push(cells);
  });

  const results = sumArrays(rows);
  const totalCells = new Array();
  results.map((result: any, index: number) => {
    if (index === 0) totalCells.push(<td key={index}>Total :</td>);
    else totalCells.push(<td key={index}>{result}</td>);
  });
  displayRows.push(<tr key="tt" className="text-xs">{totalCells}</tr>);

  const editPage = () => {
    navigate("/newform");
  };

  return (
    <div className="">
      <PageTitle />
      <div className="text-start pl-[35px] mt-3">
        <span className="font-bold text-sm">PROJECT: </span>
        <span className="underline">{project}</span>
      </div>
      <div className="text-start pl-[118px] underline">{project2}</div>

      <div className="text-start pl-[10px]">
        <span className="font-bold text-sm">SIZE OF PILE: </span>
        <span className="underline">{pile}</span>
      </div>

      <table className="my-2.5 mx-auto">
        <thead>
          <tr className="text-xs">
            <th>PILE NO</th>
            <th>PILE LENGTEHS 6 METER</th>
            <th>PILE LENGTEHS 3 METER</th>
            <th>JOINTS NO</th>
            <th className="uppercase">{converttoJsonFormInfo.role}</th>
          </tr>
        </thead>
        <tbody>{displayRows}</tbody>
      </table>

      <div className="flex justify-center space-x-5 mb-10">
        <div
          id="p"
          onClick={() => window.print()}
          className="bg-amber-300 px-8 py-2 cursor-pointer w-[120px]"
        >
          print
        </div>
        <div
          id="e"
          onClick={editPage}
          className="bg-amber-300 px-8 py-2 cursor-pointer w-[120px]"
        >
          修改
        </div>
      </div>
    </div>
  );
};

export default PrintPage;
