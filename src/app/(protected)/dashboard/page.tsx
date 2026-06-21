import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const session = await auth();
  const subscription = await prisma.subscription.findUnique({
    where: { userId: session?.user?.id ?? "" },
  });
  const orgs = await prisma.membership.count({
    where: { userId: session?.user?.id ?? "" },
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <p className="mt-2 text-muted-foreground">
        Welcome back, {session?.user?.name ?? "User"}!
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>Account information</CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Name</dt>
                <dd>{session?.user?.name ?? "—"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Email</dt>
                <dd>{session?.user?.email ?? "—"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">User ID</dt>
                <dd className="font-mono text-xs">
                  {session?.user?.id ?? "—"}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
            <CardDescription>Billing & plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <span className="font-medium capitalize">
                  {subscription?.status.toLowerCase() ?? "Free"}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                nativeButton={false}
                render={<Link href="/billing" />}
              >
                Manage billing
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Teams</CardTitle>
            <CardDescription>Organizations ({orgs})</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              size="sm"
              nativeButton={false}
              render={<Link href="/dashboard/teams" />}
            >
              Manage teams
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold">Getting Started</h2>
        <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
          <li>&bull; Define your Prisma models in prisma/schema.prisma</li>
          <li>&bull; Run npx prisma migrate dev to apply changes</li>
          <li>&bull; Configure Stripe products and set price IDs in .env</li>
          <li>&bull; Set up Resend for email delivery</li>
          <li>&bull; Build your features</li>
          <li>&bull; Deploy to Railway</li>
        </ul>
      </div>
    </div>
  );
}
