import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

function SidebarItem({ children, link }) {
  const router = useRouter();
  const isActive = link === router.asPath;
  return (
    <li className={isActive ? 'active' : ''}>
      <Link href={link}>{children}</Link>
    </li>
  );
}

export default SidebarItem;
