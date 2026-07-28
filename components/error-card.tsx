import { AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";

interface ErrorCardProps {
  title?: string;
  message: string;
  retryHref?: string;
}

export default function ErrorCard({
  title = "Something went wrong",
  message,
  retryHref,
}: ErrorCardProps) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border bg-card p-8 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 rounded-full bg-destructive/10 p-3">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>

          <h2 className="text-xl font-semibold">{title}</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            {message}
          </p>

          {retryHref && (
            <Link
              href={retryHref}
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}