import { Reveal } from "../shared/reveal";


const steps = [
	{
		title: "Create your profile",
		description:
			"Sign up with your student email and set your campus preferences.",
	},
	{
		title: "Verify once",
		description:
			"Complete KYC to unlock trusted hosting and safer event attendance.",
	},
	{
		title: "Discover and RSVP",
		description:
			"Filter by vibe, faculty, location, and time to find your scene.",
	},
	{
		title: "Walk in with your code",
		description: "Show your QR ticket and get through the gate in seconds.",
	},
];


export default function How() {
  return (
		<section
			id="how"
			className="border-y border-border/70 bg-card/35 py-16 md:py-24"
		>
			<div className="mx-auto max-w-7xl px-4 md:px-6">
				<Reveal as="div" className="text-center">
					<p className="text-sm font-medium uppercase tracking-[0.3em] text-primary/80">
						How it works
					</p>
					<h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
						From sign-up to sold-out nights in four moves
					</h2>
				</Reveal>

				<div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
					{steps.map((step, index) => (
						<Reveal
							key={step.title}
							delay={index * 110}
							className="rounded-[1.75rem] border border-border/70 bg-background/70 p-6"
						>
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/12 text-lg font-semibold text-primary">
								{index + 1}
							</div>
							<h3 className="mt-5 text-xl font-semibold">{step.title}</h3>
							<p className="mt-3 leading-7 text-muted-foreground">
								{step.description}
							</p>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}
