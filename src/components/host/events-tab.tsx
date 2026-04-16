"use client";

import { Calendar, Edit3, MapPin, Users } from "lucide-react";
import type { HostEvent } from "@/types/host";

interface EventsTabProps {
	events: HostEvent[];
}

export function EventsTab({ events }: EventsTabProps) {
	return (
		<div className="space-y-4">
			{events.map((event) => {
				const fill = event.totalCapacity
					? Math.round((event.registeredCount / event.totalCapacity) * 100)
					: 0;

				// In JSX:
				<span className="inline-flex items-center gap-2">
					<Users size={16} /> {event.registeredCount}/{event.totalCapacity}{" "}
					attendees
				</span>;

				return (
					<div
						key={event.id}
						className="rounded-4xl border border-border/70 bg-card p-6"
					>
						<div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
							<div className="flex-1">
								<div className="flex flex-wrap items-center gap-3">
									<h2 className="text-2xl font-semibold">{event.title}</h2>
									<span className="rounded-full px-3 py-1 text-xs font-semibold bg-primary/10 text-primary">
										{event.status}
									</span>
								</div>
								<div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
									<span className="inline-flex items-center gap-2">
										<Calendar size={16} /> {event.date}
									</span>
									<span className="inline-flex items-center gap-2">
										<MapPin size={16} /> {event.location}
									</span>
									<span className="inline-flex items-center gap-2">
										<Users size={16} /> {event.registeredCount}/
										{event.totalCapacity} attendees
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
								<button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border px-4 py-3 text-sm font-medium transition hover:border-primary/40 hover:text-primary">
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
