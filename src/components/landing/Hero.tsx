import React from 'react'
import { Reveal } from '../shared/reveal';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import { pageRoutes } from '../../lib/routes';

const stats = [
	{ value: "500+", label: "events launched" },
	{ value: "50K+", label: "students onboarded" },
	{ value: "100+", label: "campuses connected" },
];

export default function Hero() {
  return (
		<section className="relative isolate max-sm:mx-auto">
			<div className="absolute inset-0 -z-10 overflow-hidden">
				<div className="absolute left-1/2 -top-24 h-80 w-88 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.16),rgba(37,99,235,0)_72%)]" />
				<div className="absolute -right-20 top-36 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.12),rgba(59,130,246,0)_70%)]" />
				<div className="absolute -left-20 top-72 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.08),rgba(56,189,248,0)_72%)]" />
				<div className="absolute inset-x-0 top-0 h-128 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.14),transparent_58%)]" />
			</div>

			<div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-10 md:px-6 md:pb-24 md:pt-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
				<div className="relative">
					<Reveal
						className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary shadow-[0_12px_30px_-20px_var(--color-primary)] mt-20"
						variant="down"
					>
						<Sparkles size={16} />
						Campus events, designed to move with student energy
					</Reveal>

					<Reveal
						as="h1"
						delay={120}
						className="mt-6 max-w-3xl text-5xl font-black leading-[0.95] tracking-tight md:text-7xl"
						variant="up"
					>
						Discover what&apos;s happening.
						<span className="block bg-linear-to-r from-primary via-sky-300 to-accent bg-clip-text text-transparent">
							Show up like you belong there.
						</span>
					</Reveal>

					<Reveal
						as="p"
						delay={220}
						className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl max-sm:pr-4"
					>
						Univibes helps students find standout events, hosts manage packed
						nights smoothly, and campuses feel more connected from first RSVP to
						final check-in.
					</Reveal>

					<Reveal
						delay={320}
						className="mt-8 flex flex-col gap-4 sm:flex-row max-sm:pr-4"
					>
						<Link
							href={pageRoutes.publicRoutes.events}
							className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_24px_50px_-28px_var(--color-primary)] transition-all duration-300 hover:-translate-y-1 hover:bg-primary/90 sm:w-fit"
						>
							Explore events
						</Link>
						<Link
							href={pageRoutes.authRoutes.login}
							className="inline-flex items-center justify-center rounded-full border border-border/70 bg-card/88 px-7 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary/40 hover:bg-primary/8 hover:text-primary hover:-translate-y-0.5"
						>
							Start hosting
						</Link>
					</Reveal>

					<Reveal
						delay={420}
						className="mt-10 max-sm:pr-4 grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-3"
						variant="fade"
					>
						{stats.map((stat) => (
							<div
								key={stat.label}
								className="rounded-2xl border border-border/70 bg-card/80 px-4 py-5"
							>
								<div className="text-2xl font-semibold text-foreground">
									{stat.value}
								</div>
								<p className="mt-1 text-sm text-muted-foreground">
									{stat.label}
								</p>
							</div>
						))}
					</Reveal>
				</div>

				<div className="right">
					<div className="card-outer">
						<div className="card-border"></div>
						<div className="card">
							<div className="card-inner">
								<div className="card-header">
									<div>
										<div className="trend-label">Trending this week</div>
										<div className="event-title">
											Sunset Rooftop <br /> Social
										</div>
									</div>
									<div className="live-pill">
										<div className="live-dot"></div>
										Live now
									</div>
								</div>

								<div className="feature-block">
									<div className="feat-tag">Featured event</div>
									<div className="feat-row">
										<p className="feat-desc">
											Live DJ sets, creator booths, food pop-ups, and campus
											communities in one electric night.
										</p>
										<div className="cap-box">
											<div className="cap-label">Capacity</div>
											<div className="cap-val">1,240</div>
										</div>
									</div>
								</div>

								<div className="metrics">
									<div className="metric">
										<div className="m-label">Check-in rate</div>
										<div className="m-val">92%</div>
										<div className="m-sub">QR verification at the gate</div>
									</div>
									<div className="metric">
										<div className="m-label">Campus reach</div>
										<div className="m-val">14 schools</div>
										<div className="m-sub">Cross-campus promotion</div>
									</div>
								</div>

								<div className="info-pills">
									<div className="info-pill">
										<div className="ip-label">Tonight</div>
										<div className="ip-val">8:00 PM</div>
									</div>
									<div className="info-pill">
										<div className="ip-label">Venue</div>
										<div className="ip-val">Skyline Ct.</div>
									</div>
									<div className="info-pill">
										<div className="ip-label">Entry</div>
										<div className="ip-val">QR only</div>
									</div>
								</div>
							</div>
						</div>

						<div className="float-chip">
							<div className="fc-label">New hosts this month</div>
							<div className="fc-val">+128</div>
						</div>
					</div>
				</div>

				{/* <Reveal className="relative" delay={180} variant="zoom">
							<div className="relative mx-auto max-w-xl">
								<div className="absolute inset-0 rounded-4xl bg-linear-to-br from-primary/12 via-transparent to-accent/12 opacity-80" />
								<div className="relative overflow-hidden rounded-4xl border border-border/70 bg-card/94 p-5 shadow-[0_30px_80px_-38px_rgba(15,23,42,0.95)]">
									<div className="rounded-3xl border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))] p-5">
										<div className="flex sm:items-center justify-between max-sm:flex-col">
											<div>
												<p className="text-sm text-muted-foreground">
													Trending this week
												</p>
												<h2 className=" mt-1 text-2xl font-semibold">
													Sunset Rooftop Social
												</h2>
											</div>
											<div className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 w-fit py-1 text-xs font-semibold text-emerald-300">
												Live now
											</div>
										</div>

										<div className="mt-6 rounded-3xl bg-[linear-gradient(135deg,rgba(37,99,235,0.18),rgba(14,165,233,0.05))] p-5">
											<div className="flex flex-col sm:flex-row items-start justify-between gap-4">
												<div>
													<p className="text-sm uppercase tracking-[0.3em] text-sky-200/80">
														Featured event
													</p>
													<p className="mt-3 max-w-sm text-lg font-medium leading-7 text-foreground">
														Live DJ sets, creator booths, food pop-ups, and
														campus communities in one electric night.
													</p>
												</div>
												<div className="rounded-2xl bg-background/70 px-4 py-3 text-right shadow-lg">
													<p className="text-xs text-muted-foreground">
														Capacity
													</p>
													<p className="text-2xl font-semibold">1,240</p>
												</div>
											</div>

											<div className="mt-6 grid gap-3 sm:grid-cols-2">
												<div className="rounded-2xl border border-white/8 bg-background/55 p-4">
													<p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
														Check-in rate
													</p>
													<p className="mt-2 text-2xl font-semibold">92%</p>
													<p className="mt-2 text-sm text-muted-foreground">
														Queues stay short with QR verification at the gate.
													</p>
												</div>
												<div className="rounded-2xl border border-white/8 bg-background/55 p-4">
													<p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
														Campus reach
													</p>
													<p className="mt-2 text-2xl font-semibold">
														14 schools
													</p>
													<p className="mt-2 text-sm text-muted-foreground">
														Cross-campus promotion drives better turnout.
													</p>
												</div>
											</div>
										</div>

										<div className="mt-5 grid gap-3 sm:grid-cols-3">
											{[
												["Tonight", "8:00 PM"],
												["Venue", "Skyline Court"],
												["Entry", "QR only"],
											].map(([label, value]) => (
												<div
													key={label}
													className="rounded-2xl border border-border/70 bg-background/60 px-4 py-3"
												>
													<p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
														{label}
													</p>
													<p className="mt-2 font-medium">{value}</p>
												</div>
											))}
										</div>
									</div>

									<div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-border/70 bg-background px-4 py-3 shadow-xl md:block">
										<p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
											New hosts this month
										</p>
										<p className="mt-1 text-2xl font-semibold">+128</p>
									</div>
								</div>
							</div>
						</Reveal> */}
			</div>
		</section>
	);
}
