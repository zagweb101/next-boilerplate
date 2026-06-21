import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 px-4 py-24 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Next Boilerplate
      </h1>
      <p className="max-w-xl text-lg text-muted-foreground">
        Production-ready starter with Next.js, Prisma, PostgreSQL, Auth.js,
        Tailwind CSS, shadcn/ui, and Railway deployment.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        {session ? (
          <Button size="lg" render={<Link href="/dashboard" />}>
            Go to Dashboard
          </Button>
        ) : (
          <>
            <Button size="lg" render={<Link href="/register" />}>
              Get Started
            </Button>
            <Button size="lg" variant="outline" render={<Link href="/login" />}>
              Sign In
            </Button>
          </>
        )}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
        {[
          "Next.js 16 (App Router)",
          "Prisma + PostgreSQL",
          "Auth.js v5 (Google + Credentials)",
          "Tailwind CSS v4",
          "shadcn/ui (Base UI)",
          "Zod validation",
          "Dark mode",
          "Toast notifications",
          "Rate limiting",
          "GitHub Actions CI/CD",
          "Railway deploy ready",
          "Dockerfile included",
        ].map((feature) => (
          <div
            key={feature}
            className="rounded-lg border border-border bg-card px-3 py-2 text-muted-foreground"
          >
            {feature}
          </div>
        ))}
      </div>
    </div>
  );
}
