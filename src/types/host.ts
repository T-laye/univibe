export interface HostEvent {
	id: string;
	title: string;
	description: string;
	date: string;
	location: string;
	capacity: number;
	price: number;
	status: "draft" | "published" | "cancelled";
	hostId: string;
	createdAt: string;
	updatedAt: string;
}

export interface CreateHostEventPayload {
	title: string;
	description: string;
	date: string;
	location: string;
	capacity: number;
	price: number;
}

export interface HostDashboardData {
	host: {
		id: string;
		email: string;
		fullName: string | null;
		university: string | null;
		phone: string | null;
		role: string;
		avatarUrl: string | null;
		kycStatus: string | null;
		kycDocumentUrl: string | null;
		createdAt: string;
	};
	stats: {
		eventsCreated: number;
		totalRevenue: number;
		averageRating: number;
	};
	recentEvents: HostEvent[];
}
