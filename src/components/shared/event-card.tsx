/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Calendar, MapPin, Users } from "lucide-react";
import { pageRoutes } from "@/lib/routes";

interface EventCardProps {
	id: string;
	title: string;
	date: string;
	time: string;
	location: string;
	image: string;
	category: string;
	attendees: number;
	capacity: number;
}

export function EventCard({
	id,
	title,
	date,
	time,
	location,
	image,
	category,
	attendees,
	capacity,
}: EventCardProps) {
	const capacityPercentage = (attendees / capacity) * 100;
	const isNearlyFull = capacityPercentage > 80;

	return (
		<Link href={pageRoutes.publicRoutes.eventDetails(id)}>
			<div className="bg-card rounded-lg overflow-hidden hover:border-primary border border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer h-full">
				{/* Event Image */}
				{/* <div className="relative w-full h-40 bg-muted overflow-hidden">
					<img
						src={image}
						alt={title}
						className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
					/>
					<div className="absolute top-3 right-3">
						<span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
							{category}
						</span>
					</div>
					{isNearlyFull && (
						<div className="absolute top-3 left-3">
							<span className="bg-destructive text-destructive-foreground text-xs font-semibold px-2 py-1 rounded">
								Nearly Full
							</span>
						</div>
					)}
				</div> */}
				<div className="relative w-full h-44 overflow-hidden">
					<img
						src={image || "/logos/logo.svg"}
						alt={title}
						className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
					/>

					<div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

					<div className="absolute bottom-3 left-3 text-white text-xs font-medium px-3 py-1 rounded-full bg-white/20 backdrop-blur">
						{category}
					</div>

					{isNearlyFull && (
						<div className="absolute top-3 left-3">
							<span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
								Almost Full
							</span>
						</div>
					)}
				</div>

				{/* Event Content */}
				<div className="p-4">
					<h3 className="font-bold text-foreground line-clamp-2 mb-3">
						{title}
					</h3>

					{/* Date and Time */}
					<div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
						<Calendar size={16} />
						<span>{date}</span>
						<span>•</span>
						<span>{time}</span>
					</div>

					{/* Location */}
					<div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
						<MapPin size={16} />
						<span className="line-clamp-1">{location}</span>
					</div>

					{/* Attendees */}
					<div className="mb-3">
						<div className="flex items-center justify-between mb-1">
							<div className="flex items-center gap-1 text-muted-foreground text-sm">
								<Users size={14} />
								<span>
									{attendees} / {capacity} attendees
								</span>
							</div>
						</div>
						<div className="w-full h-2 bg-muted rounded-full overflow-hidden">
							<div
								className={`h-full rounded-full transition-all duration-300 ${
									isNearlyFull ? "bg-destructive" : "bg-primary"
								}`}
								style={{ width: `${Math.min(capacityPercentage, 100)}%` }}
							/>
						</div>
					</div>

					{/* CTA Button */}
					<button className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition">
						View Event →
					</button>
					{attendees > capacity * 0.7 && (
						<span className="text-xs text-yellow-500 font-semibold">
							🔥 Trending
						</span>
					)}
					{/* <button className="w-full py-2 px-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-opacity-90 transition text-sm">
						View Details
					</button> */}
				</div>
			</div>
		</Link>
	);
}

export function EventCardSkeleton() {
	return (
		<div className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
			<div className="h-40 bg-muted" />

			<div className="p-4 space-y-3">
				<div className="h-4 bg-muted rounded w-3/4" />
				<div className="h-3 bg-muted rounded w-1/2" />
				<div className="h-3 bg-muted rounded w-2/3" />

				<div className="h-2 bg-muted rounded w-full" />

				<div className="h-8 bg-muted rounded w-full" />
			</div>
		</div>
	);
}
