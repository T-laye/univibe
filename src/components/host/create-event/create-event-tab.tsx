"use client";

import { useState } from "react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { createEventSchema } from "@/lib/validations/host";
import type {
	CreateEventInput,
	CreateEventOutput,
	TicketTypeInput,
} from "@/lib/validations/host";
import type { HostDashboard } from "@/types/host";
import type { UseMutationResult } from "@tanstack/react-query";
import { Step1Basics } from "./step1-basics";
import { Step2Location } from "./step2-location";
import { Step3Details } from "./step3-details";
import { Step4Banner } from "./step4-banner";
import { Step5Tickets } from "./step5-tickets";
import { StepIndicator } from "./step-indicator";

const STEPS = ["Basics", "Location", "Details", "Banner", "Tickets"];

interface CreateEventTabProps {
	mutation: UseMutationResult<unknown, Error, CreateEventOutput>;
	onSuccess: () => void;
	categorySeries?: HostDashboard["categorySeries"];
}

export function CreateEventTab({ mutation, onSuccess }: CreateEventTabProps) {
	const [step, setStep] = useState(0);
	const [tickets, setTickets] = useState<TicketTypeInput[]>([]);

	const form = useForm<CreateEventInput>({
		resolver: zodResolver(createEventSchema),
		defaultValues: {
			title: "",
			category: "",
			locationType: "onsite",
			location: "",
			mapLink: "",
			virtualPlatform: "",
			virtualLink: "",
			description: "",
			date: "",
			startTime: "",
			endTime: "",
			capacityType: "limited",
			capacity: 100,
			bannerImageUrl: "",
			status: "draft",
		},
	});

	const next = async () => {
		// Validate only the current step's fields
		const stepFields: (keyof CreateEventInput)[][] = [
			["title", "category"],
			["locationType", "location"],
			["description", "date", "startTime"],
			[],
			[],
		];
		const valid = await form.trigger(
			stepFields[step] as (keyof CreateEventInput)[],
		);
		if (!valid) return;
		setStep((s) => Math.min(s + 1, STEPS.length - 1));
	};

	const back = () => setStep((s) => Math.max(s - 1, 0));

	const onSubmit = form.handleSubmit(async (values) => {
		if (tickets.length === 0) {
			toast.error("Add at least one ticket type");
			return;
		}
		try {
			await mutation.mutateAsync({ ...values, tickets } as CreateEventOutput);
			toast.success("Event created!");
			form.reset();
			setTickets([]);
			setStep(0);
			onSuccess();
		} catch (err) {
			toast.error(
				err instanceof Error ? err.message : "Failed to create event",
			);
		}
	});

	return (
		<div className="max-w-2xl mx-auto">
			<div className="rounded-4xl sm:border border-border/70 sm:bg-card sm:p-8">
				<h2 className="text-2xl font-semibold tracking-tight mb-6">
					Create a new event
				</h2>

				<StepIndicator steps={STEPS} current={step} />

				<div className="min-h-90">
					{step === 0 && <Step1Basics form={form} />}
					{step === 1 && <Step2Location form={form} />}
					{step === 2 && <Step3Details form={form} />}
					{step === 3 && <Step4Banner form={form} />}
					{step === 4 && (
						<Step5Tickets tickets={tickets} onChange={setTickets} />
					)}
				</div>

				<div className="mt-8 flex items-center justify-between gap-3 border-t border-border/60 pt-6">
					<button
						type="button"
						onClick={back}
						disabled={step === 0}
						className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition hover:text-foreground disabled:opacity-30"
					>
						<ChevronLeft size={16} /> Back
					</button>

					<div className="flex gap-2">
						{step < STEPS.length - 1 ? (
							<button
								type="button"
								onClick={next}
								className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
							>
								Next <ChevronRight size={16} />
							</button>
						) : (
							<div className="flex gap-2">
								<button
									type="button"
									onClick={() => {
										form.setValue("status", "draft");
										onSubmit();
									}}
									disabled={mutation.isPending}
									className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold transition hover:border-primary/40 disabled:opacity-50"
								>
									Save draft
								</button>
								<button
									type="button"
									onClick={() => {
										form.setValue("status", "published");
										onSubmit();
									}}
									disabled={mutation.isPending}
									className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
								>
									{mutation.isPending ? "Publishing..." : "Publish event"}
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
