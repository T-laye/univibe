import React from 'react'
import { Reveal } from '../shared/reveal';
import { BarChart3, Calendar, Shield, Ticket, Users } from 'lucide-react';

const hostBenefits = [
	{
		icon: Calendar,
		title: "Flexible event setup",
		description:
			"Schedule single-day or multi-day experiences without messy workarounds.",
	},
	{
		icon: Users,
		title: "Attendee control",
		description:
			"Track registrations, scan arrivals, and manage waitlists from one place.",
	},
	{
		icon: BarChart3,
		title: "Live performance data",
		description:
			"Know what sold, what converted, and where your audience is coming from.",
	},
	{
		icon: Ticket,
		title: "Clean ticketing flow",
		description:
			"Deliver instant confirmation and secure entry without extra tooling.",
	},
];

export default function ForHost() {
  return (
		<section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
			<div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
				<Reveal className="lg:sticky lg:top-28">
					<p className="text-sm font-medium uppercase tracking-[0.3em] text-primary/80">
						For hosts
					</p>
					<h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
						Host with the polish of a full event team
					</h2>
					<p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
						Launch faster, fill seats smarter, and run entry like you planned
						for it all semester.
					</p>

					<div className="mt-8 rounded-[1.75rem] border border-destructive/20 bg-destructive/10 p-6">
						<div className="flex items-start gap-4">
							<Shield className="mt-1 shrink-0 text-destructive" size={22} />
							<div>
								<h3 className="text-lg font-semibold">
									KYC verification is required
								</h3>
								<p className="mt-2 leading-7 text-muted-foreground">
									Hosts verify with a valid university ID so attendees can trust
									who is behind every event they see.
								</p>
							</div>
						</div>
					</div>
				</Reveal>

				<div className="grid gap-6 sm:grid-cols-2">
					{hostBenefits.map((benefit, index) => {
						const Icon = benefit.icon;
						return (
							<Reveal
								key={benefit.title}
								delay={index * 110}
								className="group rounded-[1.75rem] border border-border/70 bg-card/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/35"
							>
								<div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-primary/12 text-primary transition-colors duration-300 group-hover:bg-primary/18">
									<Icon size={22} />
								</div>
								<h3 className="mt-5 text-xl font-semibold">{benefit.title}</h3>
								<p className="mt-3 leading-7 text-muted-foreground">
									{benefit.description}
								</p>
							</Reveal>
						);
					})}
				</div>
			</div>
		</section>
	);
}
