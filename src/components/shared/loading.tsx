import { Logo } from './logo'

export function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8 flex justify-center">
          <div className="animate-bounce">
            <Logo size="lg" href="" showText={true} />
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Loading</h2>
          <p className="text-muted-foreground">Please wait while we prepare everything for you...</p>
          <div className="flex justify-center gap-2 mt-8">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
