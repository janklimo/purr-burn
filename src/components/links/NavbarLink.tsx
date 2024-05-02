import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface Props {
  href: string;
  children: ReactNode;
}

const NavbarLink: FC<Props> = ({ href, children }) => {
  const pathname = usePathname();
  const isCurrent = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        isCurrent ? 'bg-accent text-black' : 'text-white hover:bg-hl-light',
        'inline-flex items-center rounded-md py-2 px-3 mx-1 text-sm font-medium transition-all',
      )}
      aria-current={isCurrent ? 'page' : undefined}
    >
      {children}
    </Link>
  );
};

export default NavbarLink;
