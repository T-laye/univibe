"use client";

import { useWatch } from "react-hook-form";
import { MapPin, Video } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import type { CreateEventInput } from "@/lib/validations/host";

const VIRTUAL_PLATFORMS = [
	"Zoom",
	"Google Meet",
	"Microsoft Teams",
	"Webex",
	"Other",
];

interface Step2Props {
	form: UseFormReturn<CreateEventInput>;
}

export function Step2Location({ form }: Step2Props) {
	const {
		register,
		setValue,
		formState: { errors },
	} = form;
	
    const locationType = useWatch({
			control: form.control,
			name: "locationType",
		});

		const virtualPlatform = useWatch({
			control: form.control,
			name: "virtualPlatform",
		});

	return (
		<div className="space-y-6">
			{/* Location type toggle */}
			<div>
				<label className="mb-3 block text-sm font-semibold">Event Type</label>
				<div className="grid grid-cols-2 gap-3">
					{(["onsite", "virtual"] as const).map((type) => (
						<button
							key={type}
							type="button"
							onClick={() => {
								setValue("locationType", type, {
									shouldDirty: true,
									shouldValidate: true,
								});

								if (type === "onsite") {
									setValue("virtualPlatform", undefined);
									setValue("virtualLink", "");
								} else {
									setValue("location", "");
									setValue("mapLink", "");
								}
							}}
							className={`flex items-center gap-3 rounded-2xl border-2 p-4 transition-all active:scale-[1.02] ${
								locationType === type
									? "border-primary bg-primary/8 text-primary"
									: "border-border text-muted-foreground hover:border-primary/30"
							}`}
						>
							{type === "onsite" ? <MapPin size={20} /> : <Video size={20} />}
							<div className="text-left">
								<p className="font-semibold capitalize">{type}</p>
								<p className="text-xs opacity-70">
									{type === "onsite" ? "Physical venue" : "Online event"}
								</p>
							</div>
						</button>
					))}
				</div>
			</div>

			{locationType === "onsite" && (
				<>
					<div>
						<label className="mb-2 block text-sm font-semibold">
							Venue / Address
						</label>
						<input
							{...register("location")}
							placeholder="Main Campus Hall A, Building B..."
							className="w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
						/>
						{errors.location && (
							<p className="mt-1.5 text-sm text-destructive">
								{errors.location.message}
							</p>
						)}
					</div>
					<div>
						<label className="mb-2 block text-sm font-semibold">
							Google Maps Link{" "}
							<span className="text-muted-foreground font-normal">
								(optional)
							</span>
						</label>
						<input
							{...register("mapLink")}
							placeholder="https://maps.google.com/..."
							className="w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
						/>
					</div>
				</>
			)}

			{locationType === "virtual" && (
				<>
					<div>
						<label className="mb-3 block text-sm font-semibold">Platform</label>
						<div className="flex flex-wrap gap-2">
							{VIRTUAL_PLATFORMS.map((p) => (
								<button
									key={p}
									type="button"
									onClick={() =>
										setValue("virtualPlatform", p, {
											shouldDirty: true,
											shouldValidate: true,
										})
									}
									className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all ${
										virtualPlatform === p
											? "border-primary bg-primary text-primary-foreground"
											: "border-border text-muted-foreground hover:border-primary/40"
									}`}
								>
									{p}
								</button>
							))}
						</div>
					</div>
					<div>
						<label className="mb-2 block text-sm font-semibold">
							Meeting Link{" "}
							<span className="text-muted-foreground font-normal">
								(optional)
							</span>
						</label>
						<input
							{...register("virtualLink")}
							placeholder="https://zoom.us/j/..."
							className="w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
						/>
					</div>
				</>
			)}
		</div>
	);
}
