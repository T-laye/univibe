import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { AuthUser } from "@/types/auth";
import type { Database } from "@/types/database";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error("Missing Supabase public environment variables");
}

let browserClient: SupabaseClient<Database> | undefined;

export const getSupabaseBrowserClient = () => {
	if (!browserClient) {
		browserClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
			auth: {
				persistSession: true,
				autoRefreshToken: true,
			},
		});
	}

	return browserClient;
};

export const createSupabaseServerClient = (accessToken?: string) =>
	createClient<Database>(supabaseUrl, supabaseAnonKey, {
		global: accessToken
			? {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			: undefined,
		auth: {
			persistSession: false,
			autoRefreshToken: false,
		},
	});

export const createSupabaseAdminClient = () => {
	if (!supabaseServiceRoleKey) {
		throw new Error("Missing Supabase service role key");
	}

	return createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
		auth: {
			persistSession: false,
			autoRefreshToken: false,
		},
	});
};

// type UserProfileRow = Database["public"]["Tables"]["users"]["Row"];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapProfileToAuthUser = (profile: any): AuthUser => ({
    id: profile.id,
    email: profile.email,
    fullName: profile.full_name ?? "",
    university: profile.university ?? "",
    phone: profile.phone_number ?? null,
    role: profile.role ?? "user",
    avatarUrl: profile.profile_picture_url ?? null,
    kycStatus: profile.kyc_status ?? null,
    kycDocumentUrl: profile.kyc_document_url ?? null,
    createdAt: profile.created_at,
});

// Add this to your mapProfileToAuthUser if role/phone_number are missing from the DB type
// export const mapProfileToAuthUser = (profile: UserProfileRow): AuthUser => ({
// 	id: profile.id,
// 	email: profile.email,
// 	fullName: profile.full_name,
// 	university: profile.university,
// 	phone: profile.phone_number ?? null,
// 	role: profile.role ?? "user",
// 	avatarUrl: profile.profile_picture_url ?? null,
// 	kycStatus: profile.kyc_status ?? null,
// 	kycDocumentUrl: profile.kyc_document_url ?? null,
// 	createdAt: profile.created_at,
// });

// export const mapProfileToAuthUser = (profile: UserProfileRow): AuthUser => ({
// 	id: profile.id,
// 	email: profile.email,
// 	fullName: profile.full_name,
// 	university: profile.university,
// 	phone: profile.phone_number,
// 	role: profile.role, // Default role since it's not stored in DB
// 	avatarUrl: profile.profile_picture_url,
// 	kycStatus: profile.kyc_status,
// 	kycDocumentUrl: profile.kyc_document_url,
// 	createdAt: profile.created_at,
// });
