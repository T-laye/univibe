import { getSupabaseBrowserClient } from '@/lib/supabase'

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: BodyInit | object | null
  auth?: boolean
}

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export async function apiClient<T>(path: string, options: RequestOptions = {}) {
  const headers = new Headers(options.headers)

  let body = options.body
  if (body && typeof body === 'object' && !(body instanceof FormData)) {
    headers.set('Content-Type', 'application/json')
    body = JSON.stringify(body)
  }

  if (options.auth) {
    const supabase = getSupabaseBrowserClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (session?.access_token) {
      headers.set('Authorization', `Bearer ${session.access_token}`)
    }
  }

  const response = await fetch(path, {
    ...options,
    headers,
    body: body as BodyInit | null | undefined,
  })

  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    throw new ApiError(payload?.error ?? 'Something went wrong', response.status)
  }

  return payload as T
}
