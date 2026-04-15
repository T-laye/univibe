import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase";
import { signUpApiSchema } from "@/lib/validations/auth";
import { ZodError } from "zod";

export async function POST(request: Request) {
	console.log("Signup API route called");
	try {
		const body = await request.json();
		console.log("Request body:", body);
		const payload = signUpApiSchema.parse(body);
		console.log("Parsed payload:", payload);
		const supabase = createSupabaseServerClient();

		const { data, error } = await supabase.auth.signUp({
			email: payload.email,
			password: payload.password,
			options: {
				data: {
					full_name: payload.fullName,
					university: payload.university,
					phone_number: payload.phone,
					role: payload.role,
				},
			},
		});

		console.log("Supabase response:", { data, error });

		if (error) {
			console.log("Supabase error:", error);
			return NextResponse.json({ error: error.message }, { status: 400 });
		}

		console.log("Signup successful, returning response");
		return NextResponse.json(
			{
				message: "Check your email to confirm your account",
				userId: data.user?.id,
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error("Signup API error:", error);
		if (error instanceof ZodError) {
			return NextResponse.json({ error: error.flatten() }, { status: 400 });
		}

		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
