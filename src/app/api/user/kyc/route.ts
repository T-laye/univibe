/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { getAuthenticatedProfile, toApiErrorResponse } from "@/lib/api-auth";
import { createSupabaseAdminClient } from "@/lib/supabase";
import { uploadToCloudinary } from "@/lib/cloudinary-upload";

export async function POST(req: Request) {
	try {
		const profile = await getAuthenticatedProfile(req);

		const formData = await req.formData();
		const file = formData.get("file") as File | null;

		if (!file) {
			return NextResponse.json({ error: "No file provided" }, { status: 400 });
		}

		if (file.size > 5 * 1024 * 1024) {
			return NextResponse.json(
				{ error: "File too large (max 5MB)" },
				{ status: 400 },
			);
		}

		// Upload to Cloudinary
		const documentUrl = await uploadToCloudinary(file);

		const supabase = createSupabaseAdminClient();

		const { error: updateError } = await (supabase as any)
			.from("users")
			.update({
				kyc_document_url: documentUrl,
				kyc_status: "pending",
				updated_at: new Date().toISOString(),
			})
			.eq("id", profile.id);

		if (updateError) {
			return NextResponse.json({ error: updateError.message }, { status: 400 });
		}

		return NextResponse.json({ success: true, documentUrl });
	} catch (error) {
		return toApiErrorResponse(error);
	}
}

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { NextResponse } from "next/server";
// import { getAuthenticatedProfile, toApiErrorResponse } from "@/lib/api-auth";
// import { createSupabaseAdminClient } from "@/lib/supabase";

// export async function POST(req: Request) {
// 	try {
// 		const profile = await getAuthenticatedProfile(req);

// 		const formData = await req.formData();
// 		const file = formData.get("file") as File | null;

// 		if (!file) {
// 			return NextResponse.json({ error: "No file provided" }, { status: 400 });
// 		}

// 		// Optional: file size limit (5MB)
// 		if (file.size > 5 * 1024 * 1024) {
// 			return NextResponse.json(
// 				{ error: "File too large (max 5MB)" },
// 				{ status: 400 },
// 			);
// 		}

// 		const supabase = createSupabaseAdminClient();

// 		// Create unique file path
// 		const fileExt = file.name.split(".").pop();
// 		const filePath = `${profile.id}/kyc-${Date.now()}.${fileExt}`;

// 		// Convert File → Buffer
// 		const arrayBuffer = await file.arrayBuffer();
// 		const buffer = new Uint8Array(arrayBuffer);

// 		// Upload to Supabase Storage
// 		const { error: uploadError } = await supabase.storage
// 			.from("kyc-documents")
// 			.upload(filePath, buffer, {
// 				contentType: file.type,
// 				upsert: false,
// 			});

// 		if (uploadError) {
// 			return NextResponse.json({ error: uploadError.message }, { status: 400 });
// 		}

// 		// Get public URL
// 		const { data: urlData } = supabase.storage
// 			.from("kyc-documents")
// 			.getPublicUrl(filePath);

// 		const documentUrl = urlData.publicUrl;

// 		// Update user record
// 		const { error: updateError } = await (supabase as any)
// 			.from("users")
// 			.update({
// 				kyc_document_url: documentUrl,
// 				kyc_status: "pending",
// 				updated_at: new Date().toISOString(),
// 			})
// 			.eq("id", profile.id);

// 		if (updateError) {
// 			return NextResponse.json({ error: updateError.message }, { status: 400 });
// 		}

// 		return NextResponse.json({
// 			success: true,
// 			documentUrl,
// 		});
// 	} catch (error) {
// 		return toApiErrorResponse(error);
// 	}
// }

// // /* eslint-disable @typescript-eslint/no-explicit-any */
// // import { NextResponse } from "next/server";
// // import { getAuthenticatedProfile, toApiErrorResponse } from "@/lib/api-auth";
// // import { createSupabaseAdminClient } from "@/lib/supabase";

// // export async function POST(req: Request) {
// // 	try {
// // 		const profile = await getAuthenticatedProfile(req);

// // 		const formData = await req.formData();
// // 		const file = formData.get("file") as File;

// // 		if (!file) {
// // 			return NextResponse.json({ error: "No file provided" }, { status: 400 });
// // 		}

// // 		const supabase = createSupabaseAdminClient();

// // 		const fileExt = file.name.split(".").pop();
// // 		const filePath = `${profile.id}/kyc-${Date.now()}.${fileExt}`;

// // 		// Convert file → buffer
// // 		const arrayBuffer = await file.arrayBuffer();
// // 		const buffer = new Uint8Array(arrayBuffer);

// // 		// Upload to storage
// // 		const { error: uploadError } = await supabase.storage
// // 			.from("kyc-documents")
// // 			.upload(filePath, buffer, {
// // 				contentType: file.type,
// // 				upsert: false,
// // 			});

// // 		if (uploadError) {
// // 			return NextResponse.json({ error: uploadError.message }, { status: 400 });
// // 		}

// // 		// Get public/signed URL
// // 		const { data: urlData } = supabase.storage
// // 			.from("kyc-documents")
// // 			.getPublicUrl(filePath);

// // 		const documentUrl = urlData.publicUrl;

// // 		// Update user record
// // 		const { error: updateError } = await (supabase as any)
// // 			.from("users")
// // 			.update({
// // 				kyc_document_url: documentUrl,
// // 				kyc_status: "pending",
// // 			})
// // 			.eq("id", profile.id);

// // 		if (updateError) {
// // 			return NextResponse.json({ error: updateError.message }, { status: 400 });
// // 		}

// // 		return NextResponse.json({
// // 			success: true,
// // 			documentUrl,
// // 		});
// // 	} catch (error) {
// // 		return toApiErrorResponse(error);
// // 	}
// // }
