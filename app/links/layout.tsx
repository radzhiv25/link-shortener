import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { LinksShell } from './LinksShell';

export default async function LinksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect('/login');

  return (
    <div className="flex min-h-screen flex-col bg-background md:flex-row">
      <LinksShell
        userEmail={session.user.email ?? null}
        userName={session.user.name ?? null}
      />
      <main className="flex-1 overflow-auto px-4 py-6 md:px-8 md:py-8 lg:px-10">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  );
}
