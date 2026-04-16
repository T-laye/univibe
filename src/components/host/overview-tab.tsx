"use client";

import {
	Calendar,
	DollarSign,
	ShieldCheck,
	TrendingUp,
	Users,
} from "lucide-react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import type { AuthUser } from "@/types/auth";
import { HostDashboard } from "../../types/host";

const CHART_STYLE = {
	contentStyle: {
		backgroundColor: "#12121A",
		border: "1px solid #27272E",
		borderRadius: "16px",
	},
};

interface OverviewTabProps {
	dashboard: HostDashboard;
	user: AuthUser;
}

export function OverviewTab({ dashboard, user }: OverviewTabProps) {
	return (
		<div className="space-y-6">
			{/* Hero + account health */}
			<section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
				<div className="rounded-4xl border border-border/70 bg-[linear-gradient(135deg,rgba(37,99,235,0.22),rgba(18,18,26,0.98)_60%)] p-7 shadow-[0_30px_70px_-40px_rgba(37,99,235,0.55)]">
					<p className="text-sm font-medium uppercase tracking-[0.28em] text-sky-100/70">
						This week
					</p>
					<h2 className="mt-4 text-3xl font-semibold tracking-tight">
						Your registrations and event operations are now fully data-backed.
					</h2>
					<div className="mt-8 grid gap-4 sm:grid-cols-3">
						{[
							["Live events", String(dashboard.summary.totalEvents)],
							["Registrations", String(dashboard.summary.totalRegistrations)],
							["Revenue", `$${dashboard.summary.totalRevenue}`],
						].map(([label, value]) => (
							<div
								key={label}
								className="rounded-3xl border border-white/10 bg-white/6 p-4"
							>
								<p className="text-sm text-sky-50/72">{label}</p>
								<p className="mt-4 text-3xl font-semibold">{value}</p>
							</div>
						))}
					</div>
				</div>

				<div className="rounded-4xl border border-border/70 bg-card p-7">
					<div className="flex items-center gap-3">
						<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
							<ShieldCheck size={22} />
						</div>
						<div>
							<p className="text-sm font-medium uppercase tracking-[0.28em] text-muted-foreground">
								Host health
							</p>
							<h3 className="mt-1 text-xl font-semibold">
								Your account status
							</h3>
						</div>
					</div>
					<div className="mt-6 space-y-4">
						{[
							["Role", user.role],
							["KYC status", user.kycStatus ?? "—"],
							[
								"Avg attendance rate",
								`${dashboard.summary.avgAttendanceRate}%`,
							],
						].map(([label, value]) => (
							<div
								key={label}
								className="rounded-2xl border border-border/70 bg-background/80 p-4"
							>
								<p className="text-sm text-muted-foreground">{label}</p>
								<p className="mt-1 font-medium capitalize">{value}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Stat cards */}
			<section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
				{[
					{
						label: "Live events",
						value: dashboard.summary.totalEvents,
						icon: Calendar,
					},
					{
						label: "Registrations",
						value: dashboard.summary.totalRegistrations,
						icon: Users,
					},
					{
						label: "Revenue",
						value: `$${dashboard.summary.totalRevenue}`,
						icon: DollarSign,
					},
					{
						label: "Attendance rate",
						value: `${dashboard.summary.avgAttendanceRate}%`,
						icon: TrendingUp,
					},
				].map(({ label, value, icon: Icon }) => (
					<div
						key={label}
						className="rounded-[1.75rem] border border-border/70 bg-card p-6"
					>
						<div className="flex items-center justify-between">
							<p className="text-sm text-muted-foreground">{label}</p>
							<div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
								<Icon size={18} />
							</div>
						</div>
						<p className="mt-5 text-3xl font-semibold">{value}</p>
					</div>
				))}
			</section>

			{/* Charts */}
			<section className="grid gap-6 xl:grid-cols-2">
				<div className="rounded-4xl border border-border/70 bg-card p-6">
					<h3 className="text-lg font-semibold">Registrations vs attendance</h3>
					<div className="mt-6 h-75">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={dashboard.registrationSeries}>
								<CartesianGrid strokeDasharray="3 3" stroke="#27272E" />
								<XAxis dataKey="name" stroke="#A0A0A8" />
								<YAxis stroke="#A0A0A8" />
								<Tooltip {...CHART_STYLE} />
								<Legend />
								<Bar
									dataKey="registrations"
									fill="#2563EB"
									radius={[8, 8, 0, 0]}
								/>
								<Bar dataKey="attended" fill="#60A5FA" radius={[8, 8, 0, 0]} />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>

				<div className="rounded-4xl border border-border/70 bg-card p-6">
					<h3 className="text-lg font-semibold">Revenue trend</h3>
					<div className="mt-6 h-75">
						<ResponsiveContainer width="100%" height="100%">
							<LineChart data={dashboard.revenueSeries}>
								<CartesianGrid strokeDasharray="3 3" stroke="#27272E" />
								<XAxis dataKey="month" stroke="#A0A0A8" />
								<YAxis stroke="#A0A0A8" />
								<Tooltip {...CHART_STYLE} />
								<Line
									type="monotone"
									dataKey="revenue"
									stroke="#2563EB"
									strokeWidth={3}
									dot={{ fill: "#2563EB", r: 4 }}
								/>
							</LineChart>
						</ResponsiveContainer>
					</div>
				</div>
			</section>
		</div>
	);
}
