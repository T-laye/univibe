/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { getAuthenticatedProfile, toApiErrorResponse } from "@/lib/api-auth";
import { createSupabaseAdminClient } from "@/lib/supabase";

export async function PATCH(req: Request) {
	try {
		const profile = await getAuthenticatedProfile(req);
		const body = await req.json();

		const supabase = createSupabaseAdminClient();

		const { error } = await (supabase as any)
			.from("users" as any)
			.update({
				full_name: body.fullName,
				phone_number: body.phone,
				university: body.university,
				profile_picture_url: body.avatarUrl,
			} as any) // ✅ cast here instead
			.eq("id", profile.id);

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 400 });
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		return toApiErrorResponse(error);
	}
}
