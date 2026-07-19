import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? `${error.status} — ${error.statusText}`
    : error instanceof Error
      ? error.message
      : "An unexpected error occurred.";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10">
        <AlertTriangle className="h-8 w-8 text-destructive" />
      </div>
      <h1 className="mt-6 font-display text-3xl font-bold tracking-tight">Something went wrong</h1>
      <p className="mt-2 max-w-md text-muted-foreground">{message}</p>
      <div className="mt-8 flex gap-3">
        <Button variant="premium" onClick={() => window.location.reload()}>
          <RefreshCw className="h-4 w-4" /> Reload
        </Button>
        <Button asChild variant="outline">
          <Link to="/">
            <Home className="h-4 w-4" /> Go home
          </Link>
        </Button>
      </div>
    </div>
  );
}
