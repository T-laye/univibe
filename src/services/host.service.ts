import type {
	CreateHostEventPayload,
	HostDashboard,
	HostEvent,
} from "@/types/host";

import { apiClient } from "./api-client";

export const hostService = {
	async getDashboard() {
		return apiClient<HostDashboard>("/api/host/dashboard", {
			method: "GET",
			auth: true,
		});
	},

	async getEvents() {
		return apiClient<HostEvent[]>("/api/host/events", {
			method: "GET",
			auth: true,
		});
	},

	async createEvent(payload: CreateHostEventPayload) {
		return apiClient<HostEvent>("/api/host/events", {
			method: "POST",
			body: payload,
			auth: true,
		});
	},
};
