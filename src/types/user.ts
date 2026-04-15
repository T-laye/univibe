export interface UserDashboardData {
	profile: {
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
		eventsAttended: number;
		eventsHosted: number;
		totalSpent: number;
	};
	recentEvents: Array<{
		id: string;
		title: string;
		date: string;
		status: "upcoming" | "past";
	}>;
}

export interface UserRegistration {
	email: string;
	password: string;
	fullName: string;
	university?: string;
	phone?: string;
}
