export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <h1 className="mb-4 text-3xl font-bold text-blue-600">FlowDesk</h1>

      <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />

      <p className="mt-4 text-gray-500">Preparing your workspace...</p>
    </div>
  );
}
