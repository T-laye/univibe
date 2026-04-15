import { NextResponse } from "next/server";
import { getAuthenticatedProfile, toApiErrorResponse } from "@/lib/api-auth";
import { createSupabaseAdminClient } from "@/lib/supabase";

interface Registration {
	id: string;
	event_id: string;
	ticket_tier: string;
	status: string;
	event_date: string;
	events: {
		title: string;
		event_date: string;
		time: string;
		location: string;
		end_date: string;
		banner_image_url: string;
	} | null;
}

export async function GET(request: Request) {
	try {
		const profile = await getAuthenticatedProfile(request);
		const supabase = createSupabaseAdminClient();

		const { data, error } = await supabase
			.from("registrations")
			.select(
				`
    id,
    event_id,
    ticket_tier,
    status,
    events (
      title,
      event_date,
      end_date,
      location,
      banner_image_url
    )
  `,
			)
			.eq("user_id", profile.id)
			.order("registration_date", { ascending: false }); // 👈 ALSO FIX THIS

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 400 });
		}

		// console.log(error);

		const registrations = (data ?? []).map((registration: Registration) => ({
			id: registration.id,
			eventId: registration.event_id,
			title: registration.events?.title ?? "Untitled event",
			date: registration.events?.event_date ?? "", // ✅ FIXED
			time: "", // ❌ you don’t have time column
			location: registration.events?.location ?? "",
			ticketTier: registration.ticket_tier,
			status: registration.status,
			qrCode: `UNIVIBE-${registration.id}`,
		}));

		return NextResponse.json({
			profile,
			registrations,
			favorites: [],
		});
	} catch (error) {
		return toApiErrorResponse(error);
	}
}
