// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { NextResponse } from "next/server";
// import { getAuthenticatedProfile } from "@/lib/api-auth";
// import { createSupabaseAdminClient } from "@/lib/supabase";

// export async function POST(req: Request) {
// 	const profile = await getAuthenticatedProfile(req);
// 	const { documentUrl } = await req.json();

// 	const supabase = createSupabaseAdminClient();

// 	await supabase
// 		.from("users" as any)
// 		.update({
// 			kyc_document_url: documentUrl,
// 			kyc_status: "pending",
// 			kyc_submitted_at: new Date().toISOString(),
// 		} as any)
// 		.eq("id", profile.id);

// 	return NextResponse.json({ success: true });
// }
