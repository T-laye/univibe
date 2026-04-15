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
	registrations: Array<{
		id: string;
		eventId: string;
		title: string;
		date: string;
		time: string;
		location: string;
		ticketTier: string;
		status: string;
		qrCode: string;
	}>;
	favorites: Array<{
		id: string;
		title: string;
		date: string;
		image?: string;
	}>;
}

export interface UserRegistration {
	email: string;
	password: string;
	fullName: string;
	university?: string;
	phone?: string;
}
