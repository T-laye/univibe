import type { UserRole } from "./database";

export interface AuthUser {
	id: string;
	email: string;
	fullName: string | null;
	university: string | null;
	phone: string | null;
	role: UserRole;
	avatarUrl: string | null;
	kycStatus: string | null;
	kycDocumentUrl: string | null;
	createdAt: string;
}

import type { Session } from "@supabase/supabase-js";

export interface AuthSession {
	session: Session | null;
	user: AuthUser | null;
}

export interface SignInPayload {
	email: string;
	password: string;
}

export interface SignUpPayload {
	email: string;
	password: string;
	fullName: string;
	university: string;
	phone: string;
	role?: "user" | "host";
}

export interface UpdateProfilePayload {
	fullName?: string;
	university?: string;
	phone?: string;
	avatarUrl?: string;
}
