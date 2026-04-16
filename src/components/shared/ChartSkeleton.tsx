import { Shimmer } from "./Shimmer";

export function ChartSkeleton({ height = 300 }: { height?: number }) {
	return (
		<div
			className="relative w-full rounded-2xl border border-border/70 bg-card p-6"
			style={{ height }}
		>
			{/* Title */}
			<Shimmer className="h-5 w-40 mb-6" />

			{/* Chart area */}
			<div className="h-[80%] w-full">
				<Shimmer className="h-full w-full rounded-xl" />
			</div>
		</div>
	);
}
