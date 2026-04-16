/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { getAuthenticatedProfile } from "@/lib/api-auth";
import { createSupabaseAdminClient } from "@/lib/supabase";

export async function POST(req: Request) {
	const profile = await getAuthenticatedProfile(req);
	const { documentUrl }: { documentUrl: string } = await req.json();

	const supabase = createSupabaseAdminClient();
	await (supabase as any)
		.from("users")
		.update({
			kyc_document_url: documentUrl,
			kyc_status: "pending",
			kyc_submitted_at: new Date().toISOString(),
		})
		.eq("id", profile.id);

	return NextResponse.json({ success: true });
}
