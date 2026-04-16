"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
import { BarChart3, Plus, Ticket, TrendingUp } from "lucide-react";
// import { toast } from "sonner";
import { useSignOut } from "@/hooks/auth/use-sign-out";
import { useRequireRole } from "@/hooks/auth/use-require-role";
import { useCreateEvent } from "@/hooks/host/use-create-event";
import { useHostDashboard } from "@/hooks/host/use-host-dashboard";
import { pageRoutes } from "@/lib/routes";
// import {
// 	CreateEventInput,
// 	CreateEventOutput,
// 	createEventSchema,
// } from "@/lib/validations/host";
import { DashboardLayout } from "@/components/shared/dashboard-layout";
import { useHostStore } from "@/stores/host-store";
import { OverviewTab } from "../../components/host/overview-tab";
import { CreateEventTab } from "../../components/host/create-event/create-event-tab";
import { EventsTab } from "../../components/host/events-tab";
import { AnalyticsTab } from "../../components/host/analytics-tab";

export default function HostPage() {
	const router = useRouter();
	const { user, isAuthorized, isHydrating } = useRequireRole(["host", "admin"]);
	const signOutMutation = useSignOut();
	const { activeTab, setActiveTab } = useHostStore();
	const dashboardQuery = useHostDashboard();
	const createEventMutation = useCreateEvent();

	// type FormValues = z.infer<typeof createEventSchema>;

// 	const form = useForm<CreateEventInput, unknown, CreateEventOutput>({
// 		resolver: zodResolver(createEventSchema),
// 		defaultValues: {
// 			title: "",
// 			description: "",
// 			category: "",
// 			date: "",
//       startTime: "",
// endTime:''
// 			location: "",
// 			capacity: 100,
// 			status: "draft",
// 			imageUrl: null,
// 		},
// 	});

	const sidebarItems = useMemo(
		() => [
			{
				id: "overview",
				label: "Overview",
				icon: <BarChart3 size={20} />,
				active: activeTab === "overview",
				onClick: () => setActiveTab("overview"),
			},
			{
				id: "my-events",
				label: "My Events",
				icon: <Ticket size={20} />,
				active: activeTab === "my-events",
				onClick: () => setActiveTab("my-events"),
			},
			{
				id: "create",
				label: "Create Event",
				icon: <Plus size={20} />,
				active: activeTab === "create",
				onClick: () => setActiveTab("create"),
			},
			{
				id: "analytics",
				label: "Analytics",
				icon: <TrendingUp size={20} />,
				active: activeTab === "analytics",
				onClick: () => setActiveTab("analytics"),
			},
		],
		[activeTab, setActiveTab],
	);

	if (isHydrating || !isAuthorized || !user) {
		return <div className="min-h-screen bg-background" />;
	}

	// const onSubmit = form.handleSubmit(async (values: CreateEventOutput) => {
	// 	await createEventMutation.mutateAsync(values);
	// });

	const dashboard = dashboardQuery.data;

	return (
		<DashboardLayout
			title="Host Command Center"
			subtitle="Track registrations, create new events, and monitor your event portfolio."
			userName={user.fullName || ""}
			userEmail={user.email}
			userPic={user.avatarUrl || ""}
			roleLabel="Host Dashboard"
			sidebarItems={sidebarItems}
			onLogout={async () => {
				await signOutMutation.mutateAsync();
				router.push(pageRoutes.publicRoutes.home);
			}}
			actions={
				<button
					onClick={() => setActiveTab("create")}
					className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:bg-primary/90"
				>
					<Plus size={18} /> New event
				</button>
			}
		>
			{/* {dashboardQuery.isLoading && (
				<p className="text-muted-foreground text-lg animate-pulse">
					Loading...
				</p>
			)}
			{dashboardQuery.isError && (
				<p className="text-destructive text-lg">Unable to load dashboard.</p>
			)} */}
			{dashboard && activeTab === "overview" && (
				<OverviewTab
					isError={dashboardQuery.isError}
					dashboard={dashboard}
					user={user}
					isLoading={dashboardQuery.isLoading}
				/>
			)}
			{activeTab === "create" && (
				<CreateEventTab
					mutation={createEventMutation}
					onSuccess={() => setActiveTab("my-events")}
					categorySeries={dashboard?.categorySeries}
				/>
			)}
			{dashboard && activeTab === "my-events" && (
				// <EventsTab events={dashboard.events} />
				<EventsTab
					events={dashboard?.events}
					isLoading={dashboardQuery.isLoading}
					isError={dashboardQuery.isError}
					onRetry={() => dashboardQuery.refetch()}
				/>
			)}
			{dashboard && activeTab === "analytics" && (
				<AnalyticsTab
					isLoading={dashboardQuery.isLoading}
					isError={dashboardQuery.isError}
					dashboard={dashboard}
				/>
			)}
		</DashboardLayout>
	);
}
