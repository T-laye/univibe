// import { NextResponse } from 'next/server'
// import { getAuthenticatedProfile, toApiErrorResponse } from '@/lib/api-auth'
// import { createSupabaseAdminClient } from '@/lib/supabase'

// export async function GET(request: Request) {
//   try {
//     const profile = await getAuthenticatedProfile(request)
//     const supabase = createSupabaseAdminClient()

//     const { data, error } = await supabase
//       .from('registrations')
//       .select(
//         `
//           id,
//           event_id,
//           ticket_tier,
//           status,
//           events (
//             title,
//             date,
//             time,
//             location
//           )
//         `
//       )
//       .eq('user_id', profile.id)
//       .order('created_at', { ascending: false })

//     if (error) {
//       return NextResponse.json({ error: error.message }, { status: 400 })
//     }

//     const registrations = (data ?? []).map((registration: any) => ({
//       id: registration.id,
//       eventId: registration.event_id,
//       title: registration.events?.title ?? 'Untitled event',
//       date: registration.events?.date ?? '',
//       time: registration.events?.time ?? '',
//       location: registration.events?.location ?? '',
//       ticketTier: registration.ticket_tier,
//       status: registration.status,
//       qrCode: `UNIVIBE-${registration.id}`,
//     }))

//     return NextResponse.json(registrations)
//   } catch (error) {
//     return toApiErrorResponse(error)
//   }
// }
