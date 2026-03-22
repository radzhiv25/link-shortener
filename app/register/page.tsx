'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PasswordField } from '@/components/PasswordField';
import { AuthSplitShell } from '@/components/auth/AuthSplitShell';
import { PASSWORD_POLICY_HINT, validatePasswordStrength } from '@/app/lib/password-policy';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    const pw = validatePasswordStrength(password);
    if (!pw.ok) {
      setError(pw.error);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          name: name.trim() || undefined,
          password,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error ?? 'Registration failed');
        return;
      }
      router.push('/login');
      router.refresh();
    } catch {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthSplitShell variant="register">
      <div className="space-y-8">
        <div>
          <Link href="/" className="text-lg font-semibold tracking-tight">
            shrtnr
          </Link>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight md:text-4xl">Create account</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Join to use custom slugs, expiry, and My links.
          </p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name (optional)</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <PasswordField
              id="password"
              placeholder="6–10 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              maxLength={10}
              autoComplete="new-password"
            />
            <p className="text-xs text-muted-foreground leading-relaxed">{PASSWORD_POLICY_HINT}</p>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating account…' : 'Sign up'}
          </Button>
        </form>
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="text-foreground underline-offset-4 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </AuthSplitShell>
  );
}
