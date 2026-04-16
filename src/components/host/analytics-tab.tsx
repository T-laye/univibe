"use client";

import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	PieChart,
	Pie,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import type { HostDashboard } from "@/types/host";

const COLORS = ["#2563EB", "#10B981", "#F59E0B", "#EF4444"];

const CHART_STYLE = {
	contentStyle: {
		backgroundColor: "#12121A",
		border: "1px solid #27272E",
		borderRadius: "12px",
		fontSize: "12px",
	},
};

interface AnalyticsTabProps {
	dashboard: HostDashboard;
	isLoading?: boolean;
	isError?: boolean;
}

export function AnalyticsTab({
	dashboard,
	isLoading,
	isError,
}: AnalyticsTabProps) {
	// 🔴 ERROR STATE
	if (isError) {
		return (
			<div className="rounded-3xl border border-border/70 bg-card p-6 text-center">
				<p className="text-sm text-muted-foreground">
					Failed to load analytics.
				</p>
			</div>
		);
	}

	if (isLoading) return <AnalyticsSkeleton />;

	// 🟡 EMPTY STATE
	if (!dashboard.categorySeries?.length && !dashboard.revenueSeries?.length) {
		return (
			<div className="rounded-3xl border border-border/70 bg-card p-8 text-center">
				<p className="text-sm text-muted-foreground">No analytics data yet.</p>
				<p className="text-xs text-muted-foreground mt-1">
					Create events to start seeing insights.
				</p>
			</div>
		);
	}

	return (
		<div className="grid gap-4 sm:gap-6 grid-cols-1 xl:grid-cols-[0.9fr_1.1fr]">
			{/* CATEGORY */}
			<div className="rounded-3xl border border-border/70 bg-card p-4 sm:p-6">
				<h3 className="text-base sm:text-lg font-semibold">Category mix</h3>

				<div className="mt-4 h-60 sm:h-72">
					{!dashboard.categorySeries?.length ? (
						<div className="h-full flex items-center justify-center text-sm text-muted-foreground">
							No category data
						</div>
					) : (
						<ResponsiveContainer width="100%" height="100%">
							<PieChart>
								<Pie
									data={dashboard.categorySeries}
									innerRadius={45}
									outerRadius={80}
									dataKey="value"
								>
									{dashboard.categorySeries.map((entry, i) => (
										<Cell key={i} fill={COLORS[i % COLORS.length]} />
									))}
								</Pie>
								<Tooltip {...CHART_STYLE} />
							</PieChart>
						</ResponsiveContainer>
					)}
				</div>
			</div>

			{/* REVENUE */}
			<div className="rounded-3xl border border-border/70 bg-card p-4 sm:p-6">
				<h3 className="text-base sm:text-lg font-semibold">Revenue by month</h3>

				<div className="mt-4 h-60 sm:h-72 md:h-80">
					{!dashboard.revenueSeries?.length ? (
						<div className="h-full flex items-center justify-center text-sm text-muted-foreground">
							No revenue data
						</div>
					) : (
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={dashboard.revenueSeries}>
								<CartesianGrid strokeDasharray="3 3" stroke="#27272E" />
								<XAxis dataKey="month" stroke="#A0A0A8" />
								<YAxis stroke="#A0A0A8" />
								<Tooltip {...CHART_STYLE} />
								<Bar dataKey="revenue" fill="#10B981" />
							</BarChart>
						</ResponsiveContainer>
					)}
				</div>
			</div>
		</div>
	);
}

function AnalyticsSkeleton() {
	return (
		<div className="grid gap-4 sm:gap-6 grid-cols-1 xl:grid-cols-[0.9fr_1.1fr]">
			{[1, 2].map((i) => (
				<div
					key={i}
					className="rounded-3xl border border-border/70 bg-card p-4 sm:p-6"
				>
					<div className="h-5 w-40 bg-muted animate-pulse rounded mb-4" />
					<div className="h-60 sm:h-72 bg-muted/50 animate-pulse rounded-xl" />
				</div>
			))}
		</div>
	);
}
