"use client";

import type React from "react";

const CTA: React.FC = () => {
	return (
		<section className="cta relative px-safe pt-[124px] pb-[120px] md:pt-[142px] md:pb-[136px] lg:pt-[232px] lg:pb-[160px] xl:pt-[180px] xl:pb-[162px]">
			<div className="container mx-auto flex flex-col items-center justify-center lg:max-w-5xl">
				<h2 className="cta-title">
					Ready to Shine <br className="block lg:hidden" /> Among the Best?
				</h2>
				<p className="mt-5 max-w-[262px] text-center text-slate-500 tracking-tight md:max-w-none md:text-lg lg:mt-6 lg:text-xl">
					Be part of the legacy.
					<br className="block md:hidden" /> Look at the past and wait for your
					chance to shine.
				</p>
				{/* <div className="relative flex justify-center">
					<div className="mt-5 w-fit md:mt-6 lg:mt-8">
						<CtaButton
							href="/register/2026"
							size="lg"
							className="h-12 px-8 text-base md:h-14 md:px-10 md:text-lg"
							shimmer
						>
							Register Now
						</CtaButton>
					</div>
				</div> */}
			</div>
			<div
				aria-hidden="true"
				className="-z-30 absolute inset-x-0 bottom-0 h-[490px] md:h-[629px] lg:h-[641px] xl:h-[689px]"
			>
				<div className="absolute inset-0 z-0 opacity-30" />
				<div className="absolute inset-0 z-10" />
			</div>
		</section>
	);
};

export default CTA;
