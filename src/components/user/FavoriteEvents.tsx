/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { pageRoutes } from "@/lib/routes";

export function FavoriteEvents({ favorites }: { favorites: { id: string; image: string; title: string; date: string }[] }) {
	if (!favorites.length) {
		return (
			<div className="p-10 border border-border rounded-xl text-center text-muted-foreground bg-card">
				No saved events yet.
			</div>
		);
	}

	return (
		<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
			{favorites.map((event: { id: string; image: string; title: string; date: string }) => (
				<div
					key={event.id}
					className="bg-card border border-border rounded-xl overflow-hidden"
				>
					{event.image && (
						// eslint-disable-next-line jsx-a11y/alt-text
						<img src={event.image} className="w-full h-40 object-cover" />
					)}

					<div className="p-4">
						<h3 className="font-semibold">{event.title}</h3>
						<p className="text-sm text-muted-foreground">{event.date}</p>

						<Link
							href={pageRoutes.publicRoutes.eventDetails(event.id)}
							className="text-primary text-sm font-medium"
						>
							View details →
						</Link>
					</div>
				</div>
			))}
		</div>
	);
}
