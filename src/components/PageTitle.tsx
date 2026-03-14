import type React from "react";

interface PageTitleProps {
	summary?: boolean;
}

const PageTitle: React.FC<PageTitleProps> = ({ summary = true }) => {
	return (
		<div className="border-b border-gray-200 pb-3 mb-4">
			<div className="text-xl font-bold text-gray-800">富財貿易打樁工程</div>
			<div className="text-lg font-bold text-gray-700">
				FOOK CHOY TRADING & PILING ENGINEERING
			</div>
			<div className="text-xs mt-1 text-gray-500">
				474, Jalan Nuri Indah 9, Taman Thivy Jaya, 70100 Seremban, N.S.D.K
			</div>
			<div className="text-xs text-gray-500">(Co.No. 000805830-K)</div>
			<div className="text-xs flex space-x-5 justify-center items-center text-gray-500">
				<div>
					<span className="font-bold">Tel: </span>
					<span>012-6367702</span>
				</div>
				<div>
					<span className="font-bold">Email: </span>
					<span>fookchoy327@yahoo.com.my</span>
				</div>
			</div>
			{summary && (
				<div className="text-base font-bold mt-2 text-gray-800">
					PILING RECORD SUMMARY
				</div>
			)}
		</div>
	);
};

export default PageTitle;
