'use client';

import { useId, useState, type ComponentProps } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type PasswordFieldProps = Omit<ComponentProps<typeof Input>, 'type'> & {
  id?: string;
};

export function PasswordField({ className, id: idProp, ...props }: PasswordFieldProps) {
  const uid = useId();
  const id = idProp ?? uid;
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Input
        id={id}
        type={show ? 'text' : 'password'}
        className={cn('pr-10', className)}
        {...props}
      />
      <button
        type="button"
        className="absolute right-0 top-0 flex h-9 w-9 cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        onClick={() => setShow((s) => !s)}
        tabIndex={-1}
        aria-label={show ? 'Hide password' : 'Show password'}
        aria-controls={id}
      >
        {show ? <EyeOff className="size-4" aria-hidden /> : <Eye className="size-4" aria-hidden />}
      </button>
    </div>
  );
}
