export function Shimmer({ className = "" }: { className?: string }) {
	return (
		<div
			className={`relative overflow-hidden rounded-lg bg-muted ${className}`}
		>
			{/* <div className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-white/10 to-transparent bg-size-[200%_100%]" /> */}
			<div className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-white/10 dark:via-white/5 to-transparent bg-size-[200%_100%]" />
		</div>
	);
}
