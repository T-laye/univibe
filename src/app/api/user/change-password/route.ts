import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase";

export async function POST(req: Request) {
	const { new: newPassword } = await req.json();

	const supabase = createSupabaseServerClient();

	const { error } = await supabase.auth.updateUser({
		password: newPassword,
	});

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 400 });
	}

	return NextResponse.json({ success: true });
}
