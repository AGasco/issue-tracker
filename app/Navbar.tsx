'use client';
import { Box } from '@radix-ui/themes';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ImAidKit } from 'react-icons/im';

const Navbar = () => {
  const path = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' }
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <ImAidKit />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={classnames({
                'text-zinc-900': link.href === path,
                'text-zinc-500': link.href !== path,
                'hover:text-zinc-800 transition-colors': true
              })}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === 'authenticated' && (
          <Link href="/api/auth/signout">Log out</Link>
        )}
        {status === 'unauthenticated' && (
          <Link href="/api/auth/signin">Login</Link>
        )}
      </Box>
    </nav>
  );
};

export default Navbar;
