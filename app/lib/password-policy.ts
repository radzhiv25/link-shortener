/**
 * Shared password rules for registration (client + server).
 * Reduces risk from weak / guessable passwords.
 */

const MIN_LENGTH = 6;
const MAX_LENGTH = 10;

/** Very common passwords to reject even if they meet length/complexity */
const COMMON_PASSWORDS = new Set(
  [
    'password',
    'password123',
    'password1',
    '1234567890',
    'qwerty123',
    'admin123',
    'letmein',
    'welcome',
    'welcome123',
    'monkey',
    'dragon',
    'master',
    'login',
    'passw0rd',
    'p@ssw0rd',
  ].map((s) => s.toLowerCase())
);

export type PasswordValidationResult =
  | { ok: true }
  | { ok: false; error: string };

/**
 * Validates password strength. Use on register (API + client).
 */
export function validatePasswordStrength(password: string): PasswordValidationResult {
  if (!password || typeof password !== 'string') {
    return { ok: false, error: 'Password is required.' };
  }
  if (password.length < MIN_LENGTH) {
    return {
      ok: false,
      error: `Password must be at least ${MIN_LENGTH} characters.`,
    };
  }
  if (password.length > MAX_LENGTH) {
    return { ok: false, error: `Password must be at most ${MAX_LENGTH} characters.` };
  }

  if (!/[a-z]/.test(password)) {
    return { ok: false, error: 'Include at least one lowercase letter.' };
  }
  if (!/[A-Z]/.test(password)) {
    return { ok: false, error: 'Include at least one uppercase letter.' };
  }
  if (!/[0-9]/.test(password)) {
    return { ok: false, error: 'Include at least one number.' };
  }
  if (!/[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/.test(password)) {
    return {
      ok: false,
      error: 'Include at least one special character (!@#$%^&* etc.).',
    };
  }

  if (/(.)\1{3,}/.test(password)) {
    return {
      ok: false,
      error: 'Avoid repeating the same character four or more times in a row.',
    };
  }

  const lower = password.toLowerCase();
  if (COMMON_PASSWORDS.has(lower)) {
    return {
      ok: false,
      error: 'This password is too common. Choose a stronger, unique phrase.',
    };
  }

  // Sequential digit runs (weak PIN-style)
  if (/012345|123456|234567|345678|456789|987654|876543|765432|654321/.test(password)) {
    return {
      ok: false,
      error: 'Avoid sequential number patterns (e.g. 123456).',
    };
  }

  return { ok: true };
}

export const PASSWORD_POLICY_HINT = `${MIN_LENGTH}–${MAX_LENGTH} characters with uppercase, lowercase, a number, and a special character. Avoid common words and simple sequences.`;
