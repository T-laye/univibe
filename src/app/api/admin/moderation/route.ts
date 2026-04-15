import { NextResponse } from 'next/server'
import { requireRole, toApiErrorResponse } from '@/lib/api-auth'
import { createSupabaseAdminClient } from '@/lib/supabase'

export async function GET(request: Request) {
  try {
    await requireRole(request, ['admin'])
    const supabase = createSupabaseAdminClient()
    const { data: events, error } = await supabase
      .from('events')
      .select('*')
      .in('status', ['draft', 'cancelled'])
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(
      (events ?? []).map((event) => ({
        id: event.id,
        title: event.title,
        host: event.host_id,
        status: event.status === 'cancelled' ? 'flagged' : 'pending',
        date: event.date,
        reason: event.status === 'cancelled' ? 'Cancelled event requires moderation review' : 'Draft event pending publication review',
      }))
    )
  } catch (error) {
    return toApiErrorResponse(error)
  }
}
