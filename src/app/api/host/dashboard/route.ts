import { NextResponse } from 'next/server'
import { requireRole, toApiErrorResponse } from '@/lib/api-auth'
import { createSupabaseAdminClient } from '@/lib/supabase'

export async function GET(request: Request) {
  try {
    const profile = await requireRole(request, ['host', 'admin'])
    const supabase = createSupabaseAdminClient()

    const [{ data: events, error: eventsError }, { data: registrations, error: registrationsError }] =
      await Promise.all([
        supabase.from('events').select('*').eq('host_id', profile.id),
        supabase
          .from('registrations')
          .select(
            `
              id,
              event_id,
              price,
              status,
              created_at,
              events!inner (
                host_id,
                category
              )
            `
          )
          .eq('events.host_id', profile.id),
      ])

    if (eventsError || registrationsError) {
      return NextResponse.json(
        { error: eventsError?.message ?? registrationsError?.message ?? 'Unable to fetch host dashboard' },
        { status: 400 }
      )
    }

    const totalRevenue = (registrations ?? []).reduce((sum: number, item: any) => sum + Number(item.price ?? 0), 0)
    const totalRegistrations = (registrations ?? []).length
    const totalEvents = (events ?? []).length
    const attendanceRate =
      totalEvents === 0
        ? 0
        : Math.round(
            ((events ?? []).reduce((sum, event) => sum + (event.capacity ? event.registered / event.capacity : 0), 0) /
              totalEvents) *
              100
          )

    const eventsByMonth = new Map<string, number>()
    const revenueByMonth = new Map<string, number>()
    const categoryCounts = new Map<string, number>()

    for (const event of events ?? []) {
      const eventMonth = new Date(event.date).toLocaleString('en-US', { month: 'short' })
      eventsByMonth.set(eventMonth, (eventsByMonth.get(eventMonth) ?? 0) + event.registered)
      categoryCounts.set(event.category, (categoryCounts.get(event.category) ?? 0) + 1)
    }

    for (const registration of (registrations ?? []) as Array<{ created_at: string; price: number }>) {
      const month = new Date(registration.created_at).toLocaleString('en-US', { month: 'short' })
      revenueByMonth.set(month, (revenueByMonth.get(month) ?? 0) + Number(registration.price ?? 0))
    }

    const hostEvents = (events ?? []).map((event) => ({
      id: event.id,
      title: event.title,
      description: event.description,
      category: event.category,
      date: event.date,
      time: event.time,
      location: event.location,
      capacity: event.capacity,
      registered: event.registered,
      status: event.status,
      revenue: (registrations ?? [])
        .filter((item: any) => item.event_id === event.id)
        .reduce((sum: number, item: any) => sum + Number(item.price ?? 0), 0),
      imageUrl: event.image_url,
    }))

    return NextResponse.json({
      summary: {
        totalEvents,
        totalRegistrations,
        totalRevenue,
        avgAttendanceRate: attendanceRate,
      },
      events: hostEvents,
      registrationSeries: Array.from(eventsByMonth.entries()).map(([name, registrations]) => ({
        name,
        registrations,
        attended: Math.round(registrations * 0.82),
      })),
      revenueSeries: Array.from(revenueByMonth.entries()).map(([month, revenue]) => ({
        month,
        revenue,
      })),
      categorySeries: Array.from(categoryCounts.entries()).map(([name, value]) => ({
        name,
        value,
      })),
    })
  } catch (error) {
    return toApiErrorResponse(error)
  }
}
