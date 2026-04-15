export const pageRoutes = {
	publicRoutes: {
		home: "/",
		how: "/#how",
		features: "/#features",
		events: "/events",
		eventDetails: (id: string) => `/events/${id}`,
	},
	authRoutes: {
		login: "/auth/login",
		signup: "/auth/signup",
		checkEmail: "/auth/signup/check-email",
	},
	userRoutes: {
		dashboard: "/dashboard",
	},
	hostRoutes: {
		dashboard: "/host",
	},
	adminRoutes: {
		dashboard: "/admin",
	},
} as const;
