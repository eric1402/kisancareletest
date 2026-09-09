import { Logo } from "@/components/Logo";

export function PageLoader({ message = "Loading your farm data..." }: { message?: string }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 py-16 animate-dash-1">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-kc-green/10 blur-2xl animate-pulse" />
        <div className="relative animate-float-3d">
          <Logo size="lg" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-kc-green animate-bounce [animation-delay:0ms]" />
          <span className="h-2 w-2 rounded-full bg-kc-green animate-bounce [animation-delay:150ms]" />
          <span className="h-2 w-2 rounded-full bg-kc-green animate-bounce [animation-delay:300ms]" />
        </div>
        <p className="text-sm font-medium text-kc-muted animate-pulse">{message}</p>
      </div>
    </div>
  );
}

export function InlineSkeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl bg-gray-100 ${className}`} />;
}
