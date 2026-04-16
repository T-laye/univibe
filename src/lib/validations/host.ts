import { z } from "zod";

export const createEventSchema = z
	.object({
		// Step 1 - basics
		title: z.string().min(3, "Title is required"),
		titleCustom: z.string().optional(),
		category: z.string().min(1, "Category is required"),
		categoryCustom: z.string().optional(),

		// Step 2 - location
		locationType: z.enum(["onsite", "virtual"]),
		location: z.string().optional(),
		mapLink: z.string().url().optional().or(z.literal("")),
		virtualPlatform: z.string().optional(),
		virtualLink: z.string().url().optional().or(z.literal("")),

		// Step 3 - details
		description: z.string().min(10, "Description is required"),
		date: z.string().min(1, "Date is required"),
		endDate: z.string().min(1, "Invalid date").optional(),
		startTime: z.string().min(1, "Start time is required"),
		endTime: z.string().optional(),
		durationMinutes: z.number().optional(),
		capacityType: z.enum(["unlimited", "limited"]),
		capacity: z.number().optional(),

		// Step 4 - banner
		bannerImageUrl: z.string().optional(),

		status: z.enum(["draft", "published"]).default("draft"),
	})
	.refine(
		(data) => {
			if (!data.endDate) return true;
			return new Date(data.endDate) >= new Date(data.date);
		},
		{
			message: "End date cannot be before start date",
			path: ["endDate"],
		},
	);

export const ticketTypeSchema = z.object({
	name: z.string().min(1, "Ticket name is required"),
	description: z.string().optional(),
	price: z.number().min(0),
	quantity: z.number().optional(),
	maxPerOrder: z.number().min(1).max(20).default(10),
	isActive: z.boolean().default(true),
});

export type CreateEventInput = z.input<typeof createEventSchema>;
export type CreateEventOutput = z.output<typeof createEventSchema>;
export type TicketTypeInput = z.input<typeof ticketTypeSchema>;
export type TicketTypeOutput = z.output<typeof ticketTypeSchema>;

// import { z } from "zod";

// export const createEventSchema = z.object({
// 	title: z.string().min(3, "Event title must be at least 3 characters"),
// 	description: z.string().min(20, "Description must be at least 20 characters"),
// 	category: z.string().min(2, "Category is required"),
// 	date: z.string().min(1, "Date is required"),
// 	time: z.string().min(1, "Time is required"),
// 	location: z.string().min(3, "Location is required"),
// 	capacity: z.coerce
// 		.number()
// 		.int()
// 		.positive("Capacity must be greater than zero"),
// 	imageUrl: z.string().url().nullable().optional(),
// 	status: z.enum(["draft", "published", "cancelled"]).default("draft"),
// });

// // Input type (what the form fields hold — capacity is a string from the input)
// export type CreateEventInput = z.input<typeof createEventSchema>;

// // Output type (after zod transforms/coerces — capacity is number)
// export type CreateEventOutput = z.output<typeof createEventSchema>;

// export const uploadKycSchema = z.object({
// 	documentType: z.string().min(2, "Document type is required"),
// });
