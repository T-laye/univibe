export const queryKeys = {
  auth: {
    session: ['auth', 'session'] as const,
  },
  user: {
    dashboard: ['user', 'dashboard'] as const,
    profile: ['user', 'profile'] as const,
    registrations: ['user', 'registrations'] as const,
  },
  host: {
    dashboard: ['host', 'dashboard'] as const,
    events: ['host', 'events'] as const,
  },
  admin: {
    overview: ['admin', 'overview'] as const,
    users: ['admin', 'users'] as const,
    moderation: ['admin', 'moderation'] as const,
  },
  public: {
    events: ['public', 'events'] as const,
    eventDetails: (id: string) => ['public', 'events', id] as const,
  },
}
