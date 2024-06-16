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

  const handleSubmit = () => {
    console.log(sixMFirst);
    console.log(sixMLast);
    if (sixMFirst !== "" || sixMLast !== "") {
      if (sixMFirst === "" || sixMLast === "" || sixValue === "")
        return alert("6M号码不能为空");
      else if (parseInt(sixMFirst) === 0 || parseInt(sixMLast) === 0)
        return alert("6M 号码不能为0， 要大于等于1");
      else if (parseInt(sixMLast) < parseInt(sixMFirst))
        return alert("第二个号码少过" + sixMFirst);
    }

    if (threeMFirst !== "" || threeMLast !== "") {
      if (threeMFirst === "" || threeMLast === "" || threeValue === "")
        return alert("3M号码不能为空");
      else if (parseInt(threeMFirst) === 0 || parseInt(threeMLast) === 0)
        return alert("3M 号码不能为0， 要大于等于1");
      else if (parseInt(threeMLast) < parseInt(threeMFirst))
        return alert("第二个号码少过" + threeMFirst);
    }

    if (jFirst !== "" || jLast !== "") {
      if (jFirst === "" || jLast === "" || jValue === "")
        return alert("JOINT号码不能为空");
      else if (parseInt(jFirst) === 0 || parseInt(jLast) === 0)
        return alert("JOINT号码不能为0， 要大于等于1");
      else if (parseInt(jLast) < parseInt(jFirst))
        return alert("第二个号码少过" + jFirst);
    }

    if (pFirst !== "" || pLast !== "") {
      if (pFirst === "" || pLast === "" || pValue === "")
        return alert("JOINT号码不能为空");
      else if (parseInt(pFirst) === 0 || parseInt(pFirst) === 0)
        return alert("PENETRATION 号码不能为0， 要大于等于1");
      else if (parseInt(pLast) < parseInt(pFirst))
        return alert("第二个号码少过" + pFirst);
    }
  };
  return (
    <div>
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
              onChange={(e) => setSixValue(e.target.value)}
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
              onChange={(e) => setThreeValue(e.target.value)}
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
              onChange={(e) => setJValue(e.target.value)}
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
              onChange={(e) => setPValue(e.target.value)}
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
