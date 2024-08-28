'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ImAidKit } from 'react-icons/im';
import classnames from 'classnames';

const Navbar = () => {
  const path = usePathname();
  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' }
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <ImAidKit />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            href={link.href}
            key={link.href}
            className={classnames({
              'text-zinc-900': link.href === path,
              'text-zinc-500': link.href !== path,
              'hover:text-zinc-800 transition-colors': true
            })}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
