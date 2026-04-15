import React from 'react'
import { Reveal } from '../shared/reveal';
import { Award, Headphones, MapPin, Shield } from 'lucide-react';


const trustPoints = [
	{
		icon: Shield,
		title: "Verified hosts",
		description:
			"Every host completes identity checks, which keeps student events safer and more reliable.",
	},
	{
		icon: Award,
		title: "Campus credibility",
		description:
			"Designed for universities and student organizers who need trust, speed, and polish.",
	},
	{
		icon: Headphones,
		title: "Support that shows up",
		description:
			"Hosts and attendees can get help before, during, and after a live event.",
	},
	{
		icon: MapPin,
		title: "Multi-campus reach",
		description:
			"Expand your audience beyond one school while still keeping each community local.",
	},
];

export default function Trust() {
  return (
		<section className="border-t border-border/70 bg-card/35 py-16 md:py-24">
			<div className="mx-auto max-w-7xl px-4 md:px-6">
				<Reveal as="div" className="max-w-2xl">
					<p className="text-sm font-medium uppercase tracking-[0.3em] text-primary/80">
						Trust and scale
					</p>
					<h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
						Safer student events without killing the vibe
					</h2>
				</Reveal>

				<div className="mt-12 grid gap-6 md:grid-cols-2">
					{trustPoints.map((point, index) => {
						const Icon = point.icon;
						return (
							<Reveal
								key={point.title}
								delay={index * 110}
								className="group rounded-[1.75rem] border border-border/70 bg-background/75 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/35"
							>
								<div className="flex items-start gap-4">
									<div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary transition-colors duration-300 group-hover:bg-primary/18">
										<Icon size={24} />
									</div>
									<div>
										<h3 className="text-xl font-semibold">{point.title}</h3>
										<p className="mt-3 leading-7 text-muted-foreground">
											{point.description}
										</p>
									</div>
								</div>
							</Reveal>
						);
					})}
				</div>
			</div>
		</section>
	);
}
