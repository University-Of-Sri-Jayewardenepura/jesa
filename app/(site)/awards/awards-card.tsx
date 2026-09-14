"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { awards } from "@/constants/awards";

const TextAnimate = dynamic(
	() => import("@/components/core/text-animate").then((mod) => mod.TextAnimate),
	{ ssr: false },
);

export const AwardsPage: React.FC = () => {
	return (
		<section className="relative px-safe pt-[140px] pb-[120px] md:pt-[148px] md:pb-[136px] lg:pt-[180px] lg:pb-[160px] xl:pb-[162px]">
			<div className="container mx-auto flex flex-col items-center justify-center lg:max-w-5xl">
				<h1 className="relative z-20 max-w-[340px] bg-[linear-gradient(92deg,rgba(255,255,255,0.60)_6.46%,#FFF_22.73%,rgba(255,255,255,1.00)_79.27%,rgba(255,255,255,0.50)_95.93%)] bg-clip-text pb-2 text-center font-title text-[40px] text-transparent leading-[1.125] tracking-tight md:max-w-none md:text-[56px] lg:text-[64px] xl:text-[72px]">
					<span className="bg-[linear-gradient(180deg,rgba(251,191,36,1)_0%,rgba(251,191,36,0)_70%)] bg-clip-text text-white md:text-transparent">
						Awards
					</span>
				</h1>
				<div className="mt-5 max-w-[380px] text-center text-slate-500 tracking-tight md:max-w-[600px] md:text-lg lg:mt-6 lg:text-xl">
					<TextAnimate
						animation="blurInUp"
						by="word"
						delay={0.3}
						duration={0.5}
						once
						startOnView={false}
					>
						Discover eighteen prestigious awards celebrating excellence across
						university life at JESA 2026. Each award recognizes outstanding
						undergraduates for their dedication in leadership, innovation,
						academics, and social responsibility.
					</TextAnimate>
				</div>
			</div>

			<div className="py-16 md:py-28 lg:py-32">
				<div className="flex flex-col items-center gap-6 px-4 md:gap-8 md:px-6 lg:gap-12">
					{awards.map((award, _index) => (
						<div className="pb-4 md:pb-12 lg:pb-24" key={award.id}>
							{award.id === "7" && (
								<div className="flex max-w-7xl flex-col items-center justify-center pb-[6rem] text-center">
									<h2 className="relative z-20 bg-[linear-gradient(92deg,rgba(255,255,255,0.60)_6.46%,#FFF_22.73%,rgba(255,255,255,1.00)_79.27%,rgba(255,255,255,0.50)_95.93%)] bg-clip-text pb-2 text-center font-title text-[32px] text-transparent leading-[1.125] tracking-tight md:text-[40px] lg:text-[48px] xl:text-[56px]">
										<span className="bg-[linear-gradient(180deg,rgba(251,191,36,1)_0%,rgba(251,191,36,0)_70%)] bg-clip-text text-white md:text-transparent">
											Best Employability Skills Achiever (BESA)
										</span>
									</h2>
									<p className="mt-[1rem] max-w-xl text-center text-slate-500 tracking-tight md:text-lg lg:text-xl">
										Dedicated to the most optimistic and brilliant all-rounded
										undergraduate from each faculty. (except for the faculty of
										graduate studies) The winner is excelled in academics,
										sports, and other extracurricular activities.
									</p>
								</div>
							)}

							<div
								className="max-w-7xl rounded-[10px] border border-slate-900 shadow-2xl backdrop-blur-lg"
								style={{ background: "var(--background-card)" }}
							>
								<div className="flex flex-col justify-center p-6 md:flex-row md:p-8">
									<div className="mb-6 flex w-full items-center justify-center md:mb-0 md:w-1/2">
										<Image
											alt={award.name}
											className="h-fit w-[100px] md:w-[180px]"
											height={180}
											priority
											src={award.image}
											width={180}
										/>
									</div>
									<div className="w-full space-y-6 md:w-1/2">
										<div className="space-y-4">
											<div className="flex items-center gap-3">
												<h3 className="bg-[linear-gradient(92deg,rgba(255,255,255,0.60)_6.46%,#FFF_22.73%,rgba(255,255,255,1.00)_79.27%,rgba(255,255,255,0.50)_95.93%)] bg-clip-text font-title text-2xl text-transparent md:text-3xl">
													{award.name}
												</h3>
												{award.id === "17" && (
													<span className="inline-flex h-5 items-center justify-center rounded bg-emerald-500/20 border border-emerald-500/30 px-2 text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
														New
													</span>
												)}
											</div>
											<p className="text-slate-400 text-sm leading-relaxed md:text-base">
												{award.description}
											</p>
										</div>

										<div className="space-y-6">
											{award.sponsors &&
											award.sponsors.filter(
												(sponsor) => sponsor.type === "Platinum",
											).length > 0 ? (
												<div>
													<h4 className="mb-4 font-semibold text-lg text-white">
														Platinum Sponsors
													</h4>
													<div className="flex flex-wrap justify-start gap-4">
														{award.sponsors
															.filter((sponsor) => sponsor.type === "Platinum")
															.map((sponsor) => (
																<Link
																	className="group"
																	href={sponsor.link}
																	key={sponsor.year}
																>
																	<div className="flex flex-col items-center space-y-2">
																		<span className="bg-gradient-to-t from-slate-400 to-slate-200 bg-clip-text font-semibold text-transparent text-xs">
																			{sponsor.year}
																		</span>
																		<Image
																			alt={`Platinum Sponsor ${sponsor.year}`}
																			className="w-[60px] rounded-[4px] shadow-lg transition-transform group-hover:scale-105 md:w-[75px]"
																			height={75}
																			quality={100}
																			src={sponsor.imgSrc}
																			width={75}
																		/>
																	</div>
																</Link>
															))}
													</div>
												</div>
											) : null}

											{award.sponsors && award.sponsors.length > 0 ? (
												<div>
													<h4 className="mb-4 font-semibold text-lg text-white">
														Sponsors of 2025
													</h4>
													<div className="flex flex-wrap justify-start gap-3 md:gap-6">
														{/* Gold Sponsor 2025 */}
														{(() => {
															const goldSponsor = award.sponsors?.find(
																(s) => s.year === 2025 && s.type === "Gold",
															);
															return (
																<Link
																	className="group"
																	href={
																		goldSponsor?.link ||
																		"http://careerskills.sjp.ac.lk/"
																	}
																>
																	<div className="flex flex-col items-center space-y-2">
																		<span className="bg-gradient-to-t from-amber-500 to-amber-300 bg-clip-text font-semibold text-transparent text-xs">
																			2025
																		</span>
																		<Image
																			alt="Gold Sponsor 2025"
																			className="w-[60px] rounded-[4px] shadow-lg transition-transform group-hover:scale-105 md:w-[75px]"
																			height={75}
																			quality={100}
																			src={
																				goldSponsor?.imgSrc ||
																				"/images/companies/csds.png"
																			}
																			width={75}
																		/>
																		<span className="bg-gradient-to-t from-amber-500 to-amber-300 bg-clip-text font-semibold text-transparent text-xs">
																			Gold
																		</span>
																	</div>
																</Link>
															);
														})()}

														{/* Platinum Sponsor 2025 */}
														{(() => {
															const platinumSponsor = award.sponsors?.find(
																(s) => s.year === 2025 && s.type === "Platinum",
															);
															return (
																<Link
																	className="group"
																	href={
																		platinumSponsor?.link ||
																		"http://careerskills.sjp.ac.lk/"
																	}
																>
																	<div className="flex flex-col items-center space-y-2">
																		<span className="bg-gradient-to-t from-slate-400 to-slate-300 bg-clip-text font-semibold text-transparent text-xs">
																			2025
																		</span>
																		<Image
																			alt="Platinum Sponsor 2025"
																			className="w-[70px] rounded-[4px] shadow-lg transition-transform group-hover:scale-105 md:w-[90px]"
																			height={90}
																			quality={100}
																			src={
																				platinumSponsor?.imgSrc ||
																				"/images/companies/csds.png"
																			}
																			width={90}
																		/>
																		<span className="bg-gradient-to-t from-slate-400 to-slate-300 bg-clip-text font-semibold text-transparent text-xs">
																			Platinum
																		</span>
																	</div>
																</Link>
															);
														})()}

														{/* Silver Sponsor 2025 */}
														{(() => {
															const silverSponsor = award.sponsors?.find(
																(s) => s.year === 2025 && s.type === "Silver",
															);
															return (
																<Link
																	className="group"
																	href={
																		silverSponsor?.link ||
																		"http://careerskills.sjp.ac.lk/"
																	}
																>
																	<div className="flex flex-col items-center space-y-2">
																		<span className="bg-gradient-to-t from-slate-300 to-slate-100 bg-clip-text font-semibold text-transparent text-xs">
																			2025
																		</span>
																		<Image
																			alt="Silver Sponsor 2025"
																			className="w-[60px] rounded-[4px] shadow-lg transition-transform group-hover:scale-105 md:w-[75px]"
																			height={75}
																			quality={100}
																			src={
																				silverSponsor?.imgSrc ||
																				"/images/companies/csds.png"
																			}
																			width={75}
																		/>
																		<span className="bg-gradient-to-t from-slate-300 to-slate-100 bg-clip-text font-semibold text-transparent text-xs">
																			Silver
																		</span>
																	</div>
																</Link>
															);
														})()}
													</div>
												</div>
											) : null}
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			<div
				aria-hidden="true"
				className="-z-30 absolute inset-x-0 bottom-0 h-[490px] md:h-[629px] lg:h-[641px] xl:h-[689px]"
			>
				<div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-amber-100/20 opacity-30" />
				<div className="absolute inset-0 z-10 bg-[radial-gradient(closest-side,rgba(251,191,36,0.12),transparent)]" />
			</div>
		</section>
	);
};

export default AwardsPage;
