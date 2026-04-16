"use client";

import { Cell, PieChart, Pie, ResponsiveContainer, Tooltip } from "recharts";
import type { UseFormReturn } from "react-hook-form";
import type {  HostDashboard, } from "@/types/host";
import type { UseMutationResult } from "@tanstack/react-query";

const COLORS = ["#2563EB", "#3B82F6", "#60A5FA", "#93C5FD"];
const CHART_STYLE = {
	contentStyle: {
		backgroundColor: "#12121A",
		border: "1px solid #27272E",
		borderRadius: "16px",
	},
};

import type {
	CreateEventInput,
	CreateEventOutput,
} from "@/lib/validations/host";

interface CreateEventTabProps {
	form: UseFormReturn<CreateEventInput, unknown, CreateEventOutput>;
	onSubmit: (e: React.FormEvent) => void;
	mutation: UseMutationResult<unknown, Error, CreateEventOutput>;
	categorySeries?: HostDashboard["categorySeries"];
}

export function CreateEventTab({
	form,
	onSubmit,
	mutation,
	categorySeries = [],
}: CreateEventTabProps) {
	return (
		<div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
			<div className="rounded-4xl border border-border/70 bg-card p-8">
				<h2 className="text-3xl font-semibold tracking-tight">
					Create a new event
				</h2>

				<form onSubmit={onSubmit} className="mt-8 space-y-6">
					{(
						[
							["title", "Event title", "Annual Tech Summit"],
							["category", "Category", "Technology"],
							["location", "Location", "Main Campus Hall A"],
						] as const
					).map(([name, label, placeholder]) => (
						<div key={name}>
							<label className="mb-2 block text-sm font-semibold">
								{label}
							</label>
							<input
								{...form.register(name)}
								placeholder={placeholder}
								className="w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
							/>
							{form.formState.errors[name] && (
								<p className="mt-2 text-sm text-destructive">
									{form.formState.errors[name]?.message}
								</p>
							)}
						</div>
					))}

					<div>
						<label className="mb-2 block text-sm font-semibold">
							Description
						</label>
						<textarea
							{...form.register("description")}
							rows={5}
							placeholder="What should attendees expect?"
							className="w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
						/>
						{form.formState.errors.description && (
							<p className="mt-2 text-sm text-destructive">
								{form.formState.errors.description.message}
							</p>
						)}
					</div>

					<div className="grid gap-4 md:grid-cols-3">
						{(["date", "time"] as const).map((field) => (
							<div key={field}>
								<label className="mb-2 block text-sm font-semibold capitalize">
									{field}
								</label>
								<input
									type={field}
									{...form.register(field)}
									className="w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
								/>
							</div>
						))}
						<div>
							<label className="mb-2 block text-sm font-semibold">
								Capacity
							</label>
							<input
								type="number"
								{...form.register("capacity", { valueAsNumber: true })}
								className="w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
							/>
						</div>
					</div>

					<button
						type="submit"
						disabled={mutation.isPending}
						className="w-full rounded-2xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
					>
						{mutation.isPending ? "Creating event..." : "Create event"}
					</button>
				</form>
			</div>

			<div className="rounded-4xl border border-border/70 bg-card p-6">
				<h3 className="text-xl font-semibold">Category mix</h3>
				<div className="mt-5 h-65">
					<ResponsiveContainer width="100%" height="100%">
						<PieChart>
							<Pie
								data={categorySeries}
								cx="50%"
								cy="50%"
								innerRadius={55}
								outerRadius={82}
								dataKey="value"
							>
								{categorySeries.map((entry, i) => (
									<Cell key={entry.name} fill={COLORS[i % COLORS.length]} />
								))}
							</Pie>
							<Tooltip {...CHART_STYLE} />
						</PieChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
}
