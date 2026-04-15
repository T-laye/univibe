import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

interface ComboboxProps {
	options: Array<{ label: string; value: string }>;
	value: string;
	onValueChange: (value: string) => void;
	placeholder?: string;
	className?: string;
}

export function Combobox({
	options,
	value,
	onValueChange,
	placeholder = "Select an option...",
	className,
}: ComboboxProps) {
	const [open, setOpen] = React.useState(false);
	const [searchInput, setSearchInput] = React.useState("");

	const filteredOptions = options.filter((option) =>
		option.label.toLowerCase().includes(searchInput.toLowerCase()),
	);

	const selectedLabel =
		options.find((option) => option.value === value)?.label || placeholder;

	return (
		<PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
			<PopoverPrimitive.Trigger asChild>
				<button
					type="button"
					onClick={() => setOpen(!open)}
					className={cn(
						"w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary flex items-center justify-between",
						className,
					)}
				>
					<span
						className={cn(value ? "text-foreground" : "text-muted-foreground")}
					>
						{selectedLabel}
					</span>
					<ChevronsUpDown className="w-4 h-4 opacity-50" />
				</button>
			</PopoverPrimitive.Trigger>
			<PopoverPrimitive.Content className="w-(--radix-popover-trigger-width) p-0 border border-border rounded-lg bg-card shadow-md z-100">
				<div className="p-2">
					<input
						placeholder="Search..."
						value={searchInput}
						onChange={(e) => setSearchInput(e.target.value)}
						className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
					/>
				</div>
				<div className="max-h-64 overflow-y-auto">
					{filteredOptions.length === 0 ? (
						<div className="px-3 py-2 text-sm text-muted-foreground text-center">
							No results found
						</div>
					) : (
						filteredOptions.map((option) => (
							<button
								key={option.value}
								type="button"
								onClick={() => {
									onValueChange(option.value);
									setOpen(false);
									setSearchInput("");
								}}
								className="w-full px-3 py-2 text-left text-sm hover:bg-accent focus:bg-accent focus:outline-none flex items-center justify-between"
							>
								{option.label}
								{value === option.value && (
									<Check className="w-4 h-4 text-primary" />
								)}
							</button>
						))
					)}
				</div>
			</PopoverPrimitive.Content>
		</PopoverPrimitive.Root>
	);
}
