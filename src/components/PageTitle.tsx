import type React from "react";

interface PageTitleProps {
	summary?: boolean;
}

const PageTitle: React.FC<PageTitleProps> = ({ summary = true }) => {
	return (
		<header className="mb-8 text-center">
			<h1 className="text-2xl font-semibold text-ink">富財貿易打樁工程</h1>
			<p className="mt-1 text-sm font-medium text-ink-soft tracking-wide">
				Fook Choy Trading &amp; Piling Engineering
			</p>
			<p className="mt-3 text-xs text-ink-soft">
				474, Jalan Nuri Indah 9, Taman Thivy Jaya, 70100 Seremban, N.S.D.K
				&nbsp;·&nbsp; Co.No. 000805830-K
			</p>
			<p className="text-xs text-ink-soft flex justify-center gap-5 mt-1">
				<span>Tel&nbsp;012-6367702</span>
				<span>fookchoy327@yahoo.com.my</span>
			</p>
			{summary && (
				<p className="mt-4 text-sm font-medium text-ink">
					Piling Record Summary
				</p>
			)}
		</header>
	);
};

export default PageTitle;
