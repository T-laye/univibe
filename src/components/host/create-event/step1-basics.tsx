"use client";

import type { UseFormReturn } from "react-hook-form";
import type { CreateEventInput } from "@/lib/validations/host";
import { useWatch } from "react-hook-form";
import { useState } from "react";

const EVENT_CATEGORIES = [
	"Technology",
	"Religious",
	"Music",
	"Arts & Culture",
	"Sports",
	"Business",
	"Health & Wellness",
	"Education",
	"Food & Drink",
	"Networking",
	"Other",
];

const EVENT_TITLE_SUGGESTIONS = [
	"Annual Tech Summit",
	"Campus Music Fest",
	"Career Fair",
	"Hackathon",
	"Art Exhibition",
	"Sports Day",
	"Cultural Night",
];

interface Step1Props {
	form: UseFormReturn<CreateEventInput>;
}

export function Step1Basics({ form }: Step1Props) {
    const [customTitle, setCustomTitle] = useState("");
	const {
		register,
		setValue,
		formState: { errors },
	} = form;

	const title = useWatch({
		control: form.control,
		name: "title",
	});

	const category = useWatch({
		control: form.control,
		name: "category",
	});

	const isCustomTitle = title === "custom";

	return (
		<div className="space-y-8">
			{/* Title */}
			<div>
				<label className="mb-2 block text-sm font-semibold">Event Title</label>

				<div className="grid grid-cols-2 gap-2 sm:grid-cols-4 mb-3">
					{EVENT_TITLE_SUGGESTIONS.map((t) => (
						<button
							key={t}
							type="button"
							onClick={() =>
								setValue("title", t, {
									shouldDirty: true,
									shouldValidate: true,
								})
							}
							className={`rounded-xl border px-3 py-2 text-xs font-medium transition-all ${
								title === t
									? "border-primary bg-primary/10 text-primary"
									: "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
							}`}
						>
							{t}
						</button>
					))}

					{/* "Custom" chip */}
					<button
						type="button"
						onClick={() =>
							setValue("title", "custom", {
								shouldDirty: true,
							})
						}
						className={`rounded-xl border px-3 py-2 text-xs font-medium transition-all ${
							isCustomTitle
								? "border-primary bg-primary/10 text-primary"
								: "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
						}`}
					>
						Custom
					</button>
				</div>

				{/* Always show input when nothing is pre-selected or when custom */}
				{isCustomTitle && (
					<input
						value={customTitle}
						onChange={(e) => {
							setCustomTitle(e.target.value);
							setValue("title", e.target.value, {
								shouldDirty: true,
								shouldValidate: true,
							});
						}}
						placeholder="Enter custom event title..."
						className="w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
					/>
				)}

				{errors.title && (
					<p className="mt-1.5 text-sm text-destructive">
						{errors.title.message}
					</p>
				)}
			</div>

			{/* Category */}
			<div>
				<label className="mb-2 block text-sm font-semibold">Category</label>

				<div className="flex flex-wrap gap-2">
					{EVENT_CATEGORIES.map((cat) => (
						<button
							key={cat}
							type="button"
							onClick={() =>
								setValue("category", cat, {
									shouldDirty: true,
									shouldValidate: true,
								})
							}
							className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all ${
								category === cat
									? "border-primary bg-primary text-primary-foreground"
									: "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
							}`}
						>
							{cat}
						</button>
					))}
				</div>

				{/* Custom category input — uses the same "category" field, shown when "Other" selected */}
				{category === "Other" && (
					<input
						{...register("category")}
						placeholder="Enter custom category..."
						className="mt-3 w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
					/>
				)}

				{errors.category && (
					<p className="mt-1.5 text-sm text-destructive">
						{errors.category.message}
					</p>
				)}
			</div>
		</div>
	);
}
