import { NextRequest } from "next/server";
import {
	createSupabaseServerClient,
	mapProfileToAuthUser,
} from "@/lib/supabase";
import type { AuthUser } from "@/types/auth";

export class ApiError extends Error {
	status: number;

	constructor(message: string, status: number) {
		super(message);
		this.name = "ApiError";
		this.status = status;
	}
}

export async function getAuthenticatedProfile(
	request: NextRequest | Request,
): Promise<AuthUser> {
	const authorization = request.headers.get("Authorization");
	const accessToken = authorization?.replace("Bearer ", "");

	if (!accessToken) {
		throw new ApiError("No access token provided", 401);
	}

	const supabase = createSupabaseServerClient(accessToken);

	const {
		data: { user },
		error: userError,
	} = await supabase.auth.getUser();

	if (userError || !user) {
		throw new ApiError("Invalid access token", 401);
	}

	const { data: profile, error: profileError } = await supabase
		.from("users")
		.select("*")
		.eq("id", user.id)
		.single();

	if (profileError || !profile) {
		throw new ApiError("User profile not found", 404);
	}

	return mapProfileToAuthUser(profile);
}

export function toApiErrorResponse(error: unknown) {
	if (error instanceof ApiError) {
		return Response.json({ error: error.message }, { status: error.status });
	}

	console.error("Unexpected API error:", error);
	return Response.json({ error: "Internal server error" }, { status: 500 });
}

// src/lib/api-auth.ts

export async function requireRole(
  request: NextRequest | Request,
  allowedRoles: string[],
): Promise<AuthUser> {
  const user = await getAuthenticatedProfile(request);

  if (!allowedRoles.includes(user.role)) {
    throw new ApiError("Insufficient permissions", 403);
  }

  return user; // ✅ FIXED
}

// export async function requireRole(
// 	request: NextRequest | Request,
// 	allowedRoles: string[],
// ): Promise<void> {
// 	const user = await getAuthenticatedProfile(request);

// 	if (!allowedRoles.includes(user.role)) {
// 		throw new ApiError("Insufficient permissions", 403);
// 	}
// }
