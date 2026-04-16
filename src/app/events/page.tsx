"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import Header from "../../components/landing/Header";
import {
	EventCard,
	EventCardSkeleton,
} from "../../components/shared/event-card";
import { useEvents } from "../../hooks/public/use-events";

export default function EventsPage() {
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [searchTerm, setSearchTerm] = useState("");
	const eventsQuery = useEvents();

	

	const categories = useMemo(() => {
		const base = ["All"];
		for (const event of eventsQuery.data ?? []) {
			if (!base.includes(event.category)) {
				base.push(event.category);
			}
		}
		return base;
	}, [eventsQuery.data]);

	const filteredEvents = useMemo(() => {
		return (eventsQuery.data ?? []).filter((event) => {
			const matchesCategory =
				selectedCategory === "All" || event.category === selectedCategory;
			const matchesSearch =
				event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				event.location.toLowerCase().includes(searchTerm.toLowerCase());

			return matchesCategory && matchesSearch;
		});
	}, [eventsQuery.data, searchTerm, selectedCategory]);

	return (
		<div className="min-h-screen bg-background pb-20 pt-20">
			<Header />

			<section className="max-w-7xl mx-auto px-4 py-8 md:py-12">
				{/* <section className="max-w-7xl mx-auto px-4 py-12 bg-linear-to-b from-background to-muted/20 rounded-xl"> */}
				<h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
					Upcoming Events
				</h1>
				<p className="text-muted-foreground mb-8">
					Discover and join events happening near you
				</p>

				<div className="flex flex-col gap-4 mb-8">
					<div className="relative">
						<Search
							className="absolute left-3 top-3 text-muted-foreground"
							size={20}
						/>
						<input
							type="text"
							placeholder="Search events by name or location..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
						/>
					</div>

					<div className="flex flex-wrap gap-2 md:gap-3">
						{categories.map((category) => (
							<button
								key={category}
								onClick={() => setSelectedCategory(category)}
								className={`px-4 py-2 rounded-lg font-medium transition ${
									selectedCategory === category
										? "bg-primary text-primary-foreground"
										: "bg-card border border-border text-foreground hover:border-primary"
								}`}
								// className={`px-4 py-2 rounded-full text-sm font-medium transition ${
								// 	selectedCategory === category
								// 		? "bg-primary text-white shadow"
								// 		: "bg-muted hover:bg-muted/70"
								// }`}
							>
								{category}
							</button>
						))}
					</div>
				</div>

				{eventsQuery.isLoading && (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{Array.from({ length: 6 }).map((_, i) => (
							<EventCardSkeleton key={i} />
						))}
					</div>
				)}
				{eventsQuery.isError ? (
					<div className="text-destructive text-center mt-30">
						Unable to load events.
					</div>
				) : null}

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredEvents.length > 0
						? filteredEvents.map((event) => (
								<EventCard
									key={event.id}
									id={event.id}
									title={event.title}
									date={event.date}
									time={event.time}
									location={event.location}
									image={event.bannerImageUrl ?? "/logos/logo.svg"}
									category={event.category}
									attendees={event.registeredCount}
									capacity={event.totalCapacity}
								/>
							))
						: !eventsQuery.isLoading &&
							!eventsQuery.isError && (
								<div className="col-span-full flex flex-col items-center py-16 text-center">
									<div className="text-5xl mb-4">🎟️</div>
									<p className="text-lg font-medium text-foreground">
										No events found
									</p>
									<p className="text-muted-foreground text-sm">
										Try adjusting your search or filters
									</p>
								</div>
								// <div className="col-span-full text-center py-12 mt-10">
								// 	<p className="text-muted-foreground text-lg">
								// 		No events found matching your criteria.
								// 	</p>
								// 	<button
								// 		onClick={() => {
								// 			setSelectedCategory("All");
								// 			setSearchTerm("");
								// 		}}
								// 		className="mt-4 text-primary hover:underline font-medium"
								// 	>
								// 		Reset filters
								// 	</button>
								// </div>
							)}
				</div>
			</section>
		</div>
	);
}
