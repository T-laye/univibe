"use client";

import { useRequireRole } from "@/hooks/auth/use-require-role";
import { useUserDashboard } from "@/hooks/user/use-user-dashboard";
import Header from "../../components/landing/Header";
import { useUserStore } from "../../stores/user-store";
import { Loading } from "../../components/shared/loading";
import { DashboardTabs } from "../../components/user/DashboardTabs";
import { RegisteredEvents } from "../../components/user/RegisteredEvents";
import { FavoriteEvents } from "../../components/user/FavoriteEvents";
import { SettingsPanel } from "../../components/user/SettingsPanel";
import { DashboardHeader } from "../../components/user/DashboardHeader";

export default function DashboardPage() {
	const { user, isAuthorized, isHydrating } = useRequireRole(["user", "host"]);
	const { activeTab, setActiveTab } = useUserStore();
	const dashboardQuery = useUserDashboard(isAuthorized && !isHydrating);

	if (isHydrating || !isAuthorized || !user) {
		return <Loading />;
	}

	const dashboard = dashboardQuery.data;

	console.log(user);

	return (
		<div className="min-h-screen bg-background">
			<Header />

			{/* 🔥 HEADER */}
			<DashboardHeader user={user} />

			{/* 🔥 CONTENT */}
			<section className="max-w-7xl mx-auto px-4 py-10">
				{/* Tabs */}
				<DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
				{/* <div className="flex gap-2 mb-10 bg-muted p-1 rounded-xl w-fit">
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
				</div> */}

				{/* STATES */}
				{dashboardQuery.isLoading && (
					<div className="text-muted-foreground text-center mt-16">
						Loading dashboard...
					</div>
				)}
				{dashboardQuery.isError && (
					<div className="text-destructive text-center mt-10">
						Something went wrong.
					</div>
				)}

				{!dashboard && !dashboardQuery.isLoading && !dashboardQuery.isError && (
					<div className="text-muted-foreground text-center mt-10">
						No data available.
					</div>
				)}

				{/* 🔥 REGISTERED EVENTS */}
				{dashboard && activeTab === "registered" && (
					<RegisteredEvents registrations={dashboard.registrations} />
				)}

				{/* 🔥 Favorites EVENTS */}
				{dashboard && activeTab === "favorites" && (
					<FavoriteEvents favorites={dashboard.favorites} />
				)}

				{/* 🔥 Settings Panel */}
				{dashboard && activeTab === "settings" && (
					<SettingsPanel profile={dashboard.profile} />
				)}
			</section>
		</div>
	);
}
