// app/api/test-db/route.ts

export async function GET() {
  return Response.json({
    databaseUrl: process.env.DATABASE_URL?.replace(/:\/\/(.*?):(.*?)@/, "://****:****@"),
  });
}