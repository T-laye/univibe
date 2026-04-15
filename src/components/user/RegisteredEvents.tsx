import { Calendar, QrCode } from "lucide-react";

export function RegisteredEvents({ registrations }: { registrations: { id: string; title: string; date: string; time: string; status: string; ticketTier: string }[] }) {
	if (!registrations.length) {
		return (
			<div className="p-10 border border-border rounded-xl text-center text-muted-foreground bg-card">
				You haven’t registered for any events yet.
			</div>
		);
	}

	return (
		<div className="grid gap-6">
			{registrations.map((event: { id: string; title: string; date: string; time: string; status: string; ticketTier: string }) => (
				<div
					key={event.id}
					className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg transition"
				>
					<div className="flex flex-col md:flex-row justify-between gap-6">
						<div>
							<h3 className="text-lg font-semibold mb-2">{event.title}</h3>

							<div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
								<span className="flex items-center gap-1">
									<Calendar size={16} />
									{event.date} • {event.time}
								</span>

								<span className="px-2 py-1 bg-primary/10 text-primary rounded-full capitalize">
									{event.status}
								</span>

								<span>{event.ticketTier}</span>
							</div>
						</div>

						<button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg">
							<QrCode size={18} />
							View QR
						</button>
					</div>
				</div>
			))}
		</div>
	);
}