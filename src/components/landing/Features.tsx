import React from 'react'
import { Reveal } from '../shared/reveal';
import { MapPin, Users, Zap } from 'lucide-react';

const featureCards = [
	{
		icon: MapPin,
		title: "Campus-first discovery",
		description:
			"See the best parties, workshops, worship nights, fairs, and club meetups happening around you.",
	},
	{
		icon: Users,
		title: "Built for community",
		description:
			"Find your people faster with event pages that feel social, not like a cold ticket dashboard.",
	},
	{
		icon: Zap,
		title: "Fast check-in flow",
		description:
			"QR entry, live capacity updates, and real-time confirmations keep the line moving.",
	},
];

export default function Features() {
  return (
		<section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
			<Reveal as="div" className="max-w-2xl">
				<p className="text-sm font-medium uppercase tracking-[0.3em] text-primary/80">
					Why it feels different
				</p>
				<h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
					The event layer your campus has been missing
				</h2>
			</Reveal>

			<div id="features" className="mt-10 grid gap-6 md:grid-cols-3">
				{featureCards.map((feature, index) => {
					const Icon = feature.icon;
					return (
						<Reveal
							key={feature.title}
							delay={index * 120}
							className="group rounded-[1.75rem] border border-border/70 bg-card/65 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_28px_60px_-36px_rgba(37,99,235,0.6)]"
						>
							<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/12 text-primary transition-colors duration-300 group-hover:bg-primary/18">
								<Icon size={24} />
							</div>
							<h3 className="mt-6 text-xl font-semibold">{feature.title}</h3>
							<p className="mt-3 leading-7 text-muted-foreground">
								{feature.description}
							</p>
						</Reveal>
					);
				})}
			</div>
		</section>
	);
}
