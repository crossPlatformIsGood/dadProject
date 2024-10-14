import React from "react";

interface PageTitleProps {
  summary?: Boolean;
}

const PageTitle: React.FC<PageTitleProps> = ({ summary = true }) => {
  return (
    <>
      <div className="text-xl font-bold">富財貿易打樁工程</div>
      <div className="text-xl font-bold">
        FOOK CHOY TRADING & PILING ENGINEERING
      </div>
      <div className="text-xs mt-1">
        474, Jalan Nuri Indah 9, Taman Thivy Jaya, 70100 Seremban, N.S.D.K
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
      {summary && (
        <div className="text-base font-bold mt-2">PILING RECORD SUMMARY</div>
      )}
    </>
  );
};

export default PageTitle;
