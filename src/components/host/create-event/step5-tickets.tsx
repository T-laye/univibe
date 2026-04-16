"use client";

import { useState } from "react";
import { Plus, Trash2, Ticket } from "lucide-react";
import type { TicketTypeInput } from "@/lib/validations/host";

interface Step5TicketsProps {
	tickets: TicketTypeInput[];
	onChange: (tickets: TicketTypeInput[]) => void;
}

const BLANK_TICKET: TicketTypeInput = {
	name: "",
	description: "",
	price: 0,
	quantity: undefined,
	maxPerOrder: 10,
	isActive: true,
};

export function Step5Tickets({ tickets, onChange }: Step5TicketsProps) {
	const [unlimitedMap, setUnlimitedMap] = useState<Record<number, boolean>>({});

	const add = () => onChange([...tickets, { ...BLANK_TICKET }]);

	const remove = (i: number) => onChange(tickets.filter((_, idx) => idx !== i));

	const update = (i: number, patch: Partial<TicketTypeInput>) => {
		const next = [...tickets];
		next[i] = { ...next[i], ...patch };
		onChange(next);
	};

	const toggleUnlimited = (i: number, unlimited: boolean) => {
		setUnlimitedMap((m) => ({ ...m, [i]: unlimited }));
		update(i, { quantity: unlimited ? undefined : 100 });
	};

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<div>
					<h3 className="font-semibold">Ticket Types</h3>
					<p className="text-xs text-muted-foreground mt-0.5">
						Create one or more ticket types for this event
					</p>
				</div>
				<button
					type="button"
					onClick={add}
					className="inline-flex items-center gap-1.5 rounded-xl border border-primary/40 bg-primary/8 px-3 py-2 text-xs font-semibold text-primary hover:bg-primary/15 transition"
				>
					<Plus size={14} /> Add ticket
				</button>
			</div>

			{tickets.length === 0 && (
				<div className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border p-10 text-center">
					<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
						<Ticket size={22} />
					</div>
					<div>
						<p className="font-medium">No tickets yet</p>
						<p className="text-xs text-muted-foreground mt-0.5">
							Add at least one ticket type to continue
						</p>
					</div>
				</div>
			)}

			{tickets.map((ticket, i) => (
				<div
					key={i}
					className="rounded-2xl border border-border bg-background/60 p-5 space-y-4"
				>
					<div className="flex items-center justify-between">
						<span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
							Ticket {i + 1}
						</span>
						<button
							type="button"
							onClick={() => remove(i)}
							className="text-destructive/60 hover:text-destructive transition"
						>
							<Trash2 size={15} />
						</button>
					</div>

					<div className="grid gap-4 sm:grid-cols-2">
						<div>
							<label className="mb-1.5 block text-xs font-semibold">
								Ticket Name
							</label>
							<input
								value={ticket.name}
								onChange={(e) => update(i, { name: e.target.value })}
								placeholder="e.g. General Admission, VIP..."
								className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary"
							/>
						</div>
						<div>
							<label className="mb-1.5 block text-xs font-semibold">
								Price
							</label>
							<div className="relative">
								<span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
									$
								</span>
								<input
									type="number"
									min={0}
									value={ticket.price}
									onChange={(e) =>
										update(i, { price: parseFloat(e.target.value) || 0 })
									}
									placeholder="0.00"
									className="w-full rounded-xl border border-border bg-background pl-7 pr-3 py-2.5 text-sm outline-none transition focus:border-primary"
								/>
							</div>
							{ticket.price === 0 && (
								<p className="mt-1 text-[10px] text-emerald-500 font-medium">
									Free ticket
								</p>
							)}
						</div>
					</div>

					<div>
						<label className="mb-1.5 block text-xs font-semibold">
							Description{" "}
							<span className="text-muted-foreground font-normal">
								(optional)
							</span>
						</label>
						<input
							value={ticket.description ?? ""}
							onChange={(e) => update(i, { description: e.target.value })}
							placeholder="What's included with this ticket?"
							className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary"
						/>
					</div>

					<div className="grid gap-4 sm:grid-cols-2">
						<div>
							<label className="mb-1.5 block text-xs font-semibold">
								Available Quantity
							</label>
							<div className="flex gap-2 mb-2">
								{(["limited", "unlimited"] as const).map((t) => (
									<button
										key={t}
										type="button"
										onClick={() => toggleUnlimited(i, t === "unlimited")}
										className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
											(t === "unlimited") === !!unlimitedMap[i]
												? "border-primary bg-primary/10 text-primary"
												: "border-border text-muted-foreground"
										}`}
									>
										{t}
									</button>
								))}
							</div>
							{!unlimitedMap[i] && (
								<input
									type="number"
									min={1}
									value={ticket.quantity ?? ""}
									onChange={(e) =>
										update(i, {
											quantity: parseInt(e.target.value) || undefined,
										})
									}
									placeholder="e.g. 100"
									className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary"
								/>
							)}
						</div>
						<div>
							<label className="mb-1.5 block text-xs font-semibold">
								Max per Order
							</label>
							<input
								type="number"
								min={1}
								max={20}
								value={ticket.maxPerOrder}
								onChange={(e) =>
									update(i, { maxPerOrder: parseInt(e.target.value) || 1 })
								}
								className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary"
							/>
							<p className="mt-1 text-[10px] text-muted-foreground">
								Max tickets one person can buy
							</p>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
