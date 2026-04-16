import type { CreateEventOutput } from "@/lib/validations/host";

export type CreateHostEventPayload = CreateEventOutput;

export interface HostEvent {
	id: string;
	title: string;
	description: string;
	category: string;
	eventDate: string; // was: date
	date: string; // keep for display convenience
	time: string;
	location: string;
	totalCapacity: number; // was: capacity
	registeredCount: number; // was: registered
	attendedCount: number;
	status: "draft" | "published" | "cancelled";
	revenue: number;
	bannerImageUrl?: string | null; // was: imageUrl
}

// export interface CreateHostEventPayload {
// 	title: string;
// 	description: string;
// 	category: string;
// 	date: string;
// 	time: string;
// 	location: string;
// 	capacity: number;
// 	status?: "draft" | "published";
// 	imageUrl?: string;
// }

// export interface HostDashboardData {
// 	host: {
// 		id: string;
// 		email: string;
// 		fullName: string | null;
// 		university: string | null;
// 		phone: string | null;
// 		role: string;
// 		avatarUrl: string | null;
// 		kycStatus: string | null;
// 		kycDocumentUrl: string | null;
// 		createdAt: string;
// 	};
// 	stats: {
// 		eventsCreated: number;
// 		totalRevenue: number;
// 		averageRating: number;
// 	};
// 	recentEvents: HostEvent[];
// }

export type HostDashboardData = HostDashboard // alias for backwards compat

export interface HostDashboard {
	summary: {
		totalEvents: number;
		totalRegistrations: number;
		totalRevenue: number;
		avgAttendanceRate: number;
	};

	events: HostEvent[];

	registrationSeries: {
		name: string;
		registrations: number;
		attended: number;
	}[];

	revenueSeries: {
		month: string;
		revenue: number;
	}[];

	categorySeries: {
		name: string;
		value: number;
	}[];
}
