interface StepIndicatorProps {
	steps: string[];
	current: number;
}

export function StepIndicator({ steps, current }: StepIndicatorProps) {
	return (
		<div className="flex items-center gap-0 mb-8">
			{steps.map((label, i) => {
				const done = i < current;
				const active = i === current;
				return (
					<div key={label} className="flex items-center flex-1 last:flex-none">
						<div className="flex flex-col items-center gap-1.5">
							<div
								className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold border-2 transition-all duration-300 ${
									done
										? "bg-primary border-primary text-primary-foreground"
										: active
											? "border-primary text-primary bg-primary/10"
											: "border-border text-muted-foreground bg-background"
								}`}
							>
								{done ? (
									<svg width="12" height="12" viewBox="0 0 12 12" fill="none">
										<path
											d="M2 6l3 3 5-5"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								) : (
									i + 1
								)}
							</div>
							<span
								className={`text-[10px] font-medium whitespace-nowrap hidden sm:block ${active ? "text-primary" : done ? "text-foreground" : "text-muted-foreground"}`}
							>
								{label}
							</span>
						</div>
						{i < steps.length - 1 && (
							<div
								className={`flex-1 h-px mx-2 mb-4 transition-all duration-500 ${done ? "bg-primary" : "bg-border"}`}
							/>
						)}
					</div>
				);
			})}
		</div>
	);
}
