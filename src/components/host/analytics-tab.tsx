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

const COLORS = ["#2563EB", "#3B82F6", "#60A5FA", "#93C5FD"];
const CHART_STYLE = {
	contentStyle: {
		backgroundColor: "#12121A",
		border: "1px solid #27272E",
		borderRadius: "16px",
	},
};

interface AnalyticsTabProps {
	dashboard: HostDashboard;
}

export function AnalyticsTab({ dashboard }: AnalyticsTabProps) {
	return (
		<div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
			<div className="rounded-4xl border border-border/70 bg-card p-6">
				<h3 className="text-xl font-semibold">Category mix</h3>
				<div className="mt-6 h-80">
					<ResponsiveContainer width="100%" height="100%">
						<PieChart>
							<Pie
								data={dashboard.categorySeries}
								cx="50%"
								cy="50%"
								labelLine={false}
								label={({ name, value }) => `${name} ${value}`}
								outerRadius={88}
								dataKey="value"
							>
								{dashboard.categorySeries.map((entry, i) => (
									<Cell key={entry.name} fill={COLORS[i % COLORS.length]} />
								))}
							</Pie>
							<Tooltip {...CHART_STYLE} />
						</PieChart>
					</ResponsiveContainer>
				</div>
			</div>

			<div className="rounded-4xl border border-border/70 bg-card p-6">
				<h3 className="text-xl font-semibold">Revenue by month</h3>
				<div className="mt-6 h-80">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart data={dashboard.revenueSeries}>
							<CartesianGrid strokeDasharray="3 3" stroke="#27272E" />
							<XAxis dataKey="month" stroke="#A0A0A8" />
							<YAxis stroke="#A0A0A8" />
							<Tooltip {...CHART_STYLE} />
							<Bar dataKey="revenue" fill="#2563EB" radius={[8, 8, 0, 0]} />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
}
