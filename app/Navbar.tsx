import Link from 'next/link';
import { ImAidKit } from 'react-icons/im';

const Navbar = () => {
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
            className="text-zinc-500 hover:text-zinc-800 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
