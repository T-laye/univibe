/* eslint-disable @next/next/no-img-element */
"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
	ArrowLeft,
	Calendar,
	Clock,
	Heart,
	MapPin,
	Share2,
	Users,
} from "lucide-react";
import { pageRoutes } from "@/lib/routes";
import { useEvent } from "../../../hooks/public/use-event";
import Header from "../../../components/landing/Header";

export default function EventDetailsPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id: eventId } = use(params);

	const [selectedTier, setSelectedTier] = useState<string | null>(null);
	const [isRegistered, setIsRegistered] = useState(false);
	const [isFavorite, setIsFavorite] = useState(false);

	const eventQuery = useEvent(eventId);
	const event = eventQuery.data;

	console.log(event);

	const capacityPercentage = event
		? (event.registeredCount / event.totalCapacity) * 100
		: 0;

	return (
		<div className="min-h-screen bg-background py-20">
			<Header />

			<div className="max-w-6xl mx-auto px-4 pt-6">
				<Link
					href={pageRoutes.publicRoutes.events}
					className="flex items-center gap-2 text-primary hover:opacity-80 transition w-fit"
				>
					<ArrowLeft size={18} />
					Back to Events
				</Link>
			</div>

			{/* ✅ LOADING */}
			{eventQuery.isLoading && (
				<div className="max-w-6xl mx-auto px-4 py-12 text-muted-foreground">
					Loading event...
				</div>
			)}

			{/* ❌ ERROR */}
			{eventQuery.isError && (
				<div className="max-w-6xl mx-auto px-4 py-12 text-destructive">
					Unable to load this event.
				</div>
			)}

			{/* 🚫 NO EVENT */}
			{!event && !eventQuery.isLoading && !eventQuery.isError && (
				<div className="max-w-6xl mx-auto px-4 py-12 text-muted-foreground">
					Event not found.
				</div>
			)}

			{/* ✅ CONTENT */}
			{event && (
				<>
					{/* HERO */}
					<div className="max-w-6xl mx-auto px-4 mt-4 mb-10">
						<div className="relative h-72 md:h-96 rounded-2xl overflow-hidden group">
							<img
								src={event?.bannerImageUrl ?? "/logos/logo.svg"}
								alt={event.title}
								className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
							/>
							<div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
						</div>
					</div>

					<div className="max-w-6xl mx-auto px-4 pb-12 grid lg:grid-cols-3 gap-10">
						{/* LEFT */}
						<div className="lg:col-span-2">
							<div className="mb-6">
								<div className="flex justify-between items-start gap-4 mb-4">
									<div>
										<span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium mb-3">
											{event.category}
										</span>

										<h1 className="text-3xl md:text-4xl font-bold">
											{event.title}
										</h1>
									</div>

									<div className="flex gap-2">
										<button
											onClick={() => setIsFavorite(!isFavorite)}
											className="p-3 rounded-xl border border-border hover:bg-muted"
										>
											<Heart
												size={20}
												className={
													isFavorite ? "text-red-500 fill-red-500" : ""
												}
											/>
										</button>

										<button className="p-3 rounded-xl border border-border hover:bg-muted">
											<Share2 size={20} />
										</button>
									</div>
								</div>

								{/* INFO */}
								<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
									{[
										{ icon: Calendar, label: "Date", value: (event.eventDate) },
										{ icon: Clock, label: "Time", value: event.time },
										{ icon: MapPin, label: "Location", value: event.location },
										{
											icon: Users,
											label: "Attending",
											value: `${event.registeredCount}/${event.totalCapacity}`,
										},
									].map((item, i) => (
										<div
											key={i}
											className="bg-card border border-border rounded-xl p-4"
										>
											<div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
												<item.icon size={14} />
												{item.label}
											</div>
											<p className="font-semibold text-sm">{item.value}</p>
										</div>
									))}
								</div>

								{/* CAPACITY */}
								<div className="mb-10">
									<div className="flex justify-between text-sm mb-2">
										<span className="text-muted-foreground">Capacity</span>
										<span className="font-medium">
											{Math.round(capacityPercentage)}%
										</span>
									</div>

									<div className="h-2 bg-muted rounded-full overflow-hidden">
										<div
											className={`h-full rounded-full ${
												capacityPercentage > 80
													? "bg-destructive"
													: "bg-primary"
											}`}
											style={{
												width: `${Math.min(capacityPercentage, 100)}%`,
											}}
										/>
									</div>
								</div>
							</div>

							{/* DESCRIPTION */}
							<div>
								<h2 className="text-2xl font-bold mb-4">About Event</h2>
								<p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
									{event.description}
								</p>
							</div>
						</div>

						{/* SIDEBAR */}
						<div>
							<div className="sticky top-24 bg-card border border-border rounded-2xl p-6">
								<h2 className="text-lg font-semibold mb-4">Get Tickets</h2>

								{isRegistered && (
									<div className="mb-4 text-center text-sm bg-primary/10 text-primary p-3 rounded-lg">
										You&apos;re registered 🎉
									</div>
								)}

								<div className="space-y-3 mb-6">
									<button
										onClick={() => setSelectedTier("general")}
										className={`w-full p-4 rounded-xl border ${
											selectedTier === "general"
												? "border-primary bg-primary/10"
												: "border-border"
										}`}
									>
										<div className="flex justify-between mb-1">
											<span>General Admission</span>
											<span className="text-primary font-bold">FREE</span>
										</div>
										<p className="text-xs text-muted-foreground">
											{Math.max(event.totalCapacity - event.registeredCount, 0)}{" "}
											spots left
										</p>
									</button>
								</div>

								<button
									onClick={() => selectedTier && setIsRegistered(true)}
									disabled={!selectedTier || isRegistered}
									className={`w-full py-3 rounded-xl font-semibold ${
										selectedTier && !isRegistered
											? "bg-primary text-primary-foreground"
											: "bg-muted text-muted-foreground"
									}`}
								>
									{isRegistered ? "Already Registered" : "Register Now"}
								</button>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
