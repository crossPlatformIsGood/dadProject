import type React from "react";

interface PageTitleProps {
	summary?: boolean;
}

const PageTitle: React.FC<PageTitleProps> = ({ summary = true }) => {
	return (
		<header className="mb-6">
			<div className="border-b-4 border-double border-seal pb-3 text-center">
				<div className="font-[var(--font-serif-cn)] text-3xl tracking-[0.35em] text-seal">
					富財貿易打樁工程
				</div>
				<div className="mt-1 font-serif text-base tracking-[0.18em] text-ink uppercase">
					Fook Choy Trading &amp; Piling Engineering
				</div>
				<div className="mt-2 text-[11px] font-serif text-ink/70 leading-relaxed">
					474, Jalan Nuri Indah 9, Taman Thivy Jaya, 70100 Seremban, N.S.D.K
					&nbsp;·&nbsp; Co.No. 000805830-K
				</div>
				<div className="text-[11px] font-serif text-ink/70 flex justify-center gap-6 mt-0.5">
					<span>
						<span className="font-semibold">Tel</span>&nbsp;012-6367702
					</span>
					<span>
						<span className="font-semibold">Email</span>
						&nbsp;fookchoy327@yahoo.com.my
					</span>
				</div>
			</div>
			{summary && (
				<div className="mt-3 text-center">
					<span className="inline-block px-4 py-1 font-serif text-base tracking-[0.3em] text-seal">
						【 PILING RECORD SUMMARY 】
					</span>
				</div>
			)}
		</header>
	);
};

export default PageTitle;
