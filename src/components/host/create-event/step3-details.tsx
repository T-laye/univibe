"use client";

import type { UseFormReturn } from "react-hook-form";
import type { CreateEventInput } from "@/lib/validations/host";
import { useWatch } from "react-hook-form";
import { useEffect } from "react";

interface Step3Props {
	form: UseFormReturn<CreateEventInput>;
}

export function Step3Details({ form }: Step3Props) {
	const {
		register,
		setValue,
		formState: { errors },
	} = form;

	const capacityType = useWatch({
		control: form.control,
		name: "capacityType",
	});

	const startDate = useWatch({
		control: form.control,
		name: "date",
	});

	useEffect(() => {
		if (startDate && !form.getValues("endDate")) {
			setValue("endDate", startDate);
		}
	}, [form, setValue, startDate]);

	return (
		<div className="space-y-6">
			<div>
				<label className="mb-2 block text-sm font-semibold">Description</label>
				<textarea
					{...register("description")}
					rows={4}
					placeholder="What should attendees expect? Describe the agenda, speakers, activities..."
					className="w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary resize-none"
				/>
				{errors.description && (
					<p className="mt-1.5 text-sm text-destructive">
						{errors.description.message}
					</p>
				)}
			</div>

			<div className="grid gap-4 sm:grid-cols-2">
				{/* Start Date */}
				<div>
					<label className="mb-2 block text-sm font-semibold">Start Date</label>
					<input
						type="date"
						{...register("date")}
						className="w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
					/>
					{errors.date && (
						<p className="mt-1.5 text-sm text-destructive">
							{errors.date.message}
						</p>
					)}
				</div>

				{/* End Date */}
				<div>
					<label className="mb-2 block text-sm font-semibold">
						End Date{" "}
						<span className="text-muted-foreground font-normal">
							(optional)
						</span>
					</label>
					<input
						type="date"
						{...register("endDate")}
						min={form.getValues("date") || undefined} // 🔥 prevents earlier date
						className="w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
					/>
				</div>
			</div>
			<div className="grid gap-4 sm:grid-cols-2">
				<div>
					<label className="mb-2 block text-sm font-semibold">Start Time</label>
					<input
						type="time"
						{...register("startTime")}
						className="w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
					/>
					{errors.startTime && (
						<p className="mt-1.5 text-sm text-destructive">
							{errors.startTime.message}
						</p>
					)}
				</div>
				<div>
					<label className="mb-2 block text-sm font-semibold">
						End Time{" "}
						<span className="text-muted-foreground font-normal">
							(optional)
						</span>
					</label>
					<input
						type="time"
						{...register("endTime")}
						className="w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
					/>
				</div>
			</div>

			<div>
				<label className="mb-3 block text-sm font-semibold">Capacity</label>
				<div className="grid grid-cols-2 gap-3 mb-4">
					{(["limited", "unlimited"] as const).map((type) => (
						<button
							key={type}
							type="button"
							onClick={() => {
								setValue("capacityType", type, {
									shouldDirty: true,
									shouldValidate: true,
								});

								// 🔥 reset dependent field
								if (type === "unlimited") {
									setValue("capacity", undefined);
								}
							}}
							className={`rounded-2xl border-2 p-4 text-left transition-all ${
								capacityType === type
									? "border-primary bg-primary/10 text-primary scale-[1.02]"
									: "border-border text-muted-foreground hover:border-primary/30"
							}`}
						>
							<p className="font-semibold capitalize">{type}</p>
							<p className="text-xs opacity-70 mt-0.5">
								{type === "limited"
									? "Set a max attendee count"
									: "No cap on registrations"}
							</p>
						</button>
					))}
				</div>
				{capacityType === "limited" && (
					<input
						type="number"
						min={1}
						{...register("capacity", { valueAsNumber: true })}
						placeholder="e.g. 200"
						className="w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
					/>
				)}
			</div>
		</div>
	);
}
