import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { DashboardShell } from './DashboardShell';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect('/login');

  return (
    <div className="flex min-h-screen flex-col bg-background md:flex-row">
      <DashboardShell
        userEmail={session.user.email ?? null}
        userName={session.user.name ?? null}
      />
      <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
