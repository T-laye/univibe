/* src/app/host/page.tsx */
"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { BarChart3, Plus, Ticket, TrendingUp } from "lucide-react";

import { useSignOut } from "@/hooks/auth/use-sign-out";
import { useRequireRole } from "@/hooks/auth/use-require-role";
import { useCreateEvent } from "@/hooks/host/use-create-event";
import { useHostDashboard } from "@/hooks/host/use-host-dashboard";

import { DashboardLayout } from "@/components/shared/dashboard-layout";
import { OverviewTab } from "@/components/host/overview-tab";
import { CreateEventTab } from "@/components/host/create-event/create-event-tab";
import { EventsTab } from "@/components/host/events-tab";
import { AnalyticsTab } from "@/components/host/analytics-tab";

import { useHostStore } from "@/stores/host-store";
import { pageRoutes } from "@/lib/routes";

export default function HostPage() {
  const router = useRouter();

  const { user, isAuthorized, isHydrating } = useRequireRole([
    "host",
    "admin",
  ]);

  const signOutMutation = useSignOut();
  const { activeTab, setActiveTab } = useHostStore();

  const dashboardQuery = useHostDashboard();
  const createEventMutation = useCreateEvent();

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
    [activeTab, setActiveTab]
  );

  if (isHydrating || !isAuthorized || !user) {
    return <div className="min-h-screen bg-background" />;
  }

  const dashboard = dashboardQuery.data;

  // console.log("Dashboard data:", dashboard);

  return (
		<DashboardLayout
			title="Host Command Center"
			subtitle="Track registrations, create events, and monitor performance."
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
			{dashboard && activeTab === "overview" && (
				<OverviewTab
					dashboard={dashboard}
					user={user}
					isLoading={dashboardQuery.isLoading}
					isError={dashboardQuery.isError}
				/>
			)}

			{activeTab === "create" && (
				<CreateEventTab
					mutation={createEventMutation}
					onSuccess={() => setActiveTab("my-events")}
					categorySeries={dashboard?.categorySeries}
				/>
			)}

			{activeTab === "my-events" && (
				<EventsTab
					events={dashboard?.events}
					isLoading={dashboardQuery.isLoading}
					isError={dashboardQuery.isError}
					onRetry={() => dashboardQuery.refetch()}
				/>
			)}

			{activeTab === "analytics" && dashboard && (
				<AnalyticsTab
					dashboard={dashboard}
					isLoading={dashboardQuery.isLoading}
					isError={dashboardQuery.isError}
				/>
			)}
		</DashboardLayout>
	);
}