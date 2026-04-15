"use client";

export function DashboardTabs({
	activeTab,
	setActiveTab,
}: {
	activeTab: string;
	setActiveTab: (tab: "registered" | "favorites" | "settings") => void;
}) {
	return (
		<div className="flex gap-2 mb-10 bg-muted p-1 rounded-xl w-fit">
			{[
				{ key: "registered", label: "Registered" },
				{ key: "favorites", label: "Favorites" },
				{ key: "settings", label: "Settings" },
			].map((tab) => (
				<button
					key={tab.key}
					onClick={() =>
						setActiveTab(tab.key as "registered" | "favorites" | "settings")
					}
					className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
						activeTab === tab.key
							? "bg-background shadow text-foreground"
							: "text-muted-foreground hover:text-foreground"
					}`}
				>
					{tab.label}
				</button>
			))}
		</div>
	);
}