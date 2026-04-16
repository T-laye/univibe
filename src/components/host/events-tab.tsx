"use client";

import {
	Calendar,
	Edit3,
	MapPin,
	Users,
	CalendarX,
	AlertCircle,
	Plus,
    Clock,
} from "lucide-react";
import type { HostEvent } from "@/types/host";
import { useHostStore } from "../../stores/host-store";
import { formatEventParts } from "../../utils/helpers";

interface EventsTabProps {
	events?: HostEvent[];
	isLoading?: boolean;
	isError?: boolean;
	onRetry?: () => void;
}

export function EventsTab({
	events,
	isLoading,
	isError,
	onRetry,
}: EventsTabProps) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { activeTab, setActiveTab } = useHostStore();

	console.log(events);

	// 🔄 LOADING STATE
	if (isLoading) {
		return (
			<div className="space-y-4">
				{Array.from({ length: 3 }).map((_, i) => (
					<div
						key={i}
						className="animate-pulse rounded-4xl border border-border/70 bg-card p-6"
					>
						<div className="h-6 w-1/3 rounded bg-muted" />
						<div className="mt-4 h-4 w-1/2 rounded bg-muted" />
						<div className="mt-6 h-2 w-full rounded bg-muted" />
					</div>
				))}
			</div>
		);
	}

	// ❌ ERROR STATE
	if (isError) {
		return (
			<div className="flex flex-col items-center justify-center rounded-4xl border border-destructive/40 bg-card p-12 text-center">
				<div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
					<AlertCircle size={28} />
				</div>

				<h2 className="mt-6 text-2xl font-semibold">Failed to load events</h2>

				<p className="mt-2 text-sm text-muted-foreground">
					Something went wrong while fetching your events.
				</p>

				<button
					onClick={onRetry}
					className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
				>
					Retry
				</button>
			</div>
		);
	}

	// 💤 EMPTY STATE
	if (!events || events.length === 0) {
        
		return (
			<div className="flex flex-col items-center justify-center rounded-4xl max-sm:mt-20 sm:border border-dashed border-border/70 sm:bg-card sm:p-12 text-center">
				<div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
					<CalendarX size={28} />
				</div>

				<h2 className="mt-6 text-2xl font-semibold">No events yet</h2>

				<p className="mt-2 max-w-md text-sm text-muted-foreground">
					You haven&apos;t created any events yet. Start by creating your first
					event.
				</p>
				<button
					onClick={() => setActiveTab("create")}
					className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:bg-primary/90 mt-10"
				>
					<Plus size={18} /> New event
				</button>
			</div>
		);
	}

	// ✅ DATA STATE
	return (
		<div className="space-y-4">
			{events.map((event) => {
                const {date} = formatEventParts(event.date)
				const fill =
					event.totalCapacity > 0
						? Math.round((event.registeredCount / event.totalCapacity) * 100)
						: 0;

				return (
					<div
						key={event.id}
						className="rounded-4xl border border-border/70 bg-card p-6"
					>
						<div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
							<div className="flex-1">
								<div className="flex flex-wrap items-center gap-3">
									<h2 className="text-2xl font-semibold line-clamp-1">
										{event.title}
									</h2>
									<span className="rounded-full px-3 py-1 text-xs font-semibold bg-primary/10 text-primary">
										{event.status}
									</span>
								</div>

								<div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
									<span className="inline-flex items-center gap-2">
										<Calendar size={16} /> {date}
									</span>
									<span className="inline-flex items-center gap-2">
										<Clock size={16} /> {event.time}
									</span>

									<span className="inline-flex items-center gap-2 line-clamp-1">
										<MapPin size={16} /> {event.location}
									</span>

									<span className="inline-flex items-center gap-2">
										<Users size={16} /> {event.registeredCount}/
										{event.totalCapacity}
									</span>
								</div>

								<div className="mt-5 max-w-xl">
									<div className="mb-2 flex items-center justify-between text-sm">
										<span className="text-muted-foreground">
											Capacity filled
										</span>
										<span className="font-medium">{fill}%</span>
									</div>

									<div className="h-2 rounded-full bg-muted">
										<div
											className="h-2 rounded-full bg-primary"
											style={{ width: `${fill}%` }}
										/>
									</div>
								</div>
							</div>

							<div className="flex flex-col gap-3 lg:items-end">
								<p className="text-2xl font-semibold">
									₦{event.revenue.toLocaleString()}
								</p>
								<p className="text-sm text-muted-foreground">Revenue</p>

								<button className="inline-flex items-center gap-2 rounded-2xl border border-border px-4 py-3 text-sm font-medium hover:border-primary/40 hover:text-primary">
									<Edit3 size={16} /> Edit event
								</button>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
