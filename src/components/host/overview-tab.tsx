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
import type { HostDashboard } from "@/types/host";
import { Shimmer } from "../shared/Shimmer";
import { ChartSkeleton } from "../shared/ChartSkeleton";

const CHART_STYLE = {
	contentStyle: {
		backgroundColor: "#12121A",
		border: "1px solid #27272E",
		borderRadius: "16px",
	},
};

interface OverviewTabProps {
	dashboard?: HostDashboard;
	user: AuthUser;
	isLoading: boolean;
	isError: boolean;
}

export function OverviewTab({
	dashboard,
	user,
	isLoading,
	isError,
}: OverviewTabProps) {
	// console.log(dashboard);

	if (isError) {
		return (
			<div className="rounded-3xl border border-border/70 bg-card p-6 text-center">
				<p className="text-sm text-muted-foreground">
					Failed to load analytics.
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* HERO */}
			<section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
				<div className="rounded-4xl border border-border/70 bg-[linear-gradient(135deg,rgba(37,99,235,0.22),rgba(18,18,26,0.98)_60%)] p-4 sm:p-7">
					{isLoading ? (
						<>
							<Shimmer className="h-4 w-24" />
							<Shimmer className="mt-4 h-6 w-3/4" />

							<div className="mt-8 grid gap-4 sm:grid-cols-3">
								{Array.from({ length: 3 }).map((_, i) => (
									<div key={i} className="space-y-3">
										<Shimmer className="h-4 w-16" />
										<Shimmer className="h-8 w-20" />
									</div>
								))}
							</div>
						</>
					) : (
						<>
							<p className="text-sm uppercase tracking-[0.28em] text-sky-100/70">
								This week
							</p>

							<h2 className="mt-4 text-xl sm:text-3xl font-semibold">
								Your registrations and event operations are now fully
								data-backed.
							</h2>

							<div className="mt-8 grid gap-4 sm:grid-cols-3">
								{[
									["Live events", dashboard?.summary?.totalEvents],
									["Registrations", dashboard?.summary?.totalRegistrations],
									["Revenue", `₦${dashboard?.summary?.totalRevenue}`],
								].map(([label, value]) => (
									<div key={label} className="rounded-3xl bg-white/6 p-4">
										<p className="text-sm text-sky-50/70">{label}</p>
										<p className="mt-4 text-2xl font-semibold">{value}</p>
									</div>
								))}
							</div>
						</>
					)}
				</div>

				{/* ACCOUNT HEALTH */}
				<div className="rounded-3xl border border-border/70 bg-card p-4 sm:p-6">
					{isLoading ? (
						<div className="space-y-3">
							<Shimmer className="h-5 w-32" />
							<div className="grid grid-cols-3 gap-3">
								<Shimmer className="h-12 rounded-lg" />
								<Shimmer className="h-12 rounded-lg" />
								<Shimmer className="h-12 rounded-lg" />
							</div>
						</div>
					) : (
						<>
							{/* HEADER */}
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<ShieldCheck size={18} className="text-primary" />
									<h3 className="text-base sm:text-lg font-semibold">
										Account status
									</h3>
								</div>
							</div>

							{/* CONTENT */}
							<div className="mt-4 grid grid-cols-3 gap-3">
								{/* ROLE */}
								<div className="rounded-xl border border-border/60 p-3 text-center">
									<p className="text-xs text-muted-foreground">Role</p>
									<p className="mt-1 text-sm font-semibold capitalize">
										{user.role}
									</p>
								</div>

								{/* KYC */}
								<div className="rounded-xl border border-border/60 p-3 text-center">
									<p className="text-xs text-muted-foreground">KYC</p>
									<p
										className={`mt-1 text-sm font-semibold capitalize ${
											user.kycStatus === "approved"
												? "text-green-500"
												: user.kycStatus === "pending"
													? "text-yellow-500"
													: "text-muted-foreground"
										}`}
									>
										{user.kycStatus ?? "—"}
									</p>
								</div>

								{/* ATTENDANCE */}
								<div className="rounded-xl border border-border/60 p-3 text-center">
									<p className="text-xs text-muted-foreground">Attendance</p>
									<p className="mt-1 text-sm font-semibold">
										{dashboard?.summary?.avgAttendanceRate ?? 0}%
									</p>
								</div>
							</div>
						</>
					)}
				</div>
			</section>

			{/* STAT CARDS */}
			<section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
				{isLoading
					? Array.from({ length: 4 }).map((_, i) => (
							<div key={i} className="rounded-2xl bg-card p-6">
								<Shimmer className="h-4 w-20 mb-4" />
								<Shimmer className="h-8 w-24" />
							</div>
						))
					: [
							{
								label: "Events",
								value: dashboard?.summary?.totalEvents,
								icon: Calendar,
							},
							{
								label: "Registrations",
								value: dashboard?.summary?.totalRegistrations,
								icon: Users,
							},
							{
								label: "Revenue",
								value: `₦${dashboard?.summary?.totalRevenue}`,
								icon: DollarSign,
							},
							{
								label: "Attendance",
								value: `${dashboard?.summary?.avgAttendanceRate}%`,
								icon: TrendingUp,
							},
						].map(({ label, value, icon: Icon }) => (
							<div key={label} className="rounded-2xl bg-card p-6">
								<div className="flex justify-between">
									<p className="text-sm text-muted-foreground">{label}</p>
									<Icon size={18} />
								</div>
								<p className="mt-4 text-2xl font-semibold">{value}</p>
							</div>
						))}
			</section>

			{/* CHARTS */}
			{isLoading ? (
				<section className="grid gap-6 xl:grid-cols-2">
					<ChartSkeleton />
					<ChartSkeleton />
				</section>
			) : (
				<section className="grid gap-6 xl:grid-cols-2">
					{/* BAR */}
					<div className="rounded-3xl bg-card p-6">
						<h3 className="text-lg font-semibold">
							Registrations vs attendance
						</h3>

						<div className="mt-6 h-72">
							<ResponsiveContainer width="100%" height="100%">
								<BarChart data={dashboard?.registrationSeries}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="name" />
									<YAxis />
									<Tooltip {...CHART_STYLE} />
									<Legend />

									{/* ✅ FIXED */}
									<Bar dataKey="registrations" fill="#2563EB" />
									<Bar dataKey="attended" fill="#10B981" />
								</BarChart>
							</ResponsiveContainer>
						</div>
					</div>

					{/* LINE */}
					<div className="rounded-3xl bg-card p-6">
						<h3 className="text-lg font-semibold">Revenue trend</h3>

						<div className="mt-6 h-72">
							<ResponsiveContainer width="100%" height="100%">
								<LineChart data={dashboard?.revenueSeries}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="month" />
									<YAxis />
									<Tooltip {...CHART_STYLE} />

									<Line type="monotone" dataKey="revenue" stroke="#2563EB" />
								</LineChart>
							</ResponsiveContainer>
						</div>
					</div>
				</section>
			)}
		</div>
	);
}
