import { z } from "zod";

export const signInSchema = z.object({
	email: z.string().email("Enter a valid email address"),
	password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signUpApiSchema = z.object({
	fullName: z.string().min(2),
	email: z.string().email(),
	university: z.string().min(2),
	phone: z.string().min(10).max(20),
	password: z.string().min(8),
	role: z.enum(["user", "host"]).default("user"),
});

export const signUpSchema = z
	.object({
		fullName: z.string().min(2),
		email: z.string().email(),
		university: z.string().min(2),
		phone: z.string().min(10, "Enter a valid phone number").max(20),
		password: z.string().min(8),
		confirmPassword: z.string().min(8),
		role: z.enum(["user", "host"]).default("user"),
	})
	.refine((value) => value.password === value.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export const updateProfileSchema = z.object({
	fullName: z.string().min(2, "Full name must be at least 2 characters"),
	university: z.string().min(2, "University is required"),
	avatarUrl: z.string().url().nullable().optional(),
});
