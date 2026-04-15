export interface AdminOverviewData {
	totalUsers: number;
	totalEvents: number;
	totalRevenue: number;
	pendingModeration: number;
	recentUsers: AdminUserRecord[];
	recentEvents: Array<{
		id: string;
		title: string;
		hostName: string;
		date: string;
		status: string;
	}>;
}

export interface AdminUserRecord {
	id: string;
	email: string;
	fullName: string | null;
	university: string | null;
	role: string;
	kycStatus: string | null;
	createdAt: string;
	isActive: boolean;
}

export interface ModerationItem {
	id: string;
	type: "event" | "user" | "review";
	content: string;
	reportedBy: string;
	reason: string;
	status: "pending" | "approved" | "rejected";
	createdAt: string;
}
