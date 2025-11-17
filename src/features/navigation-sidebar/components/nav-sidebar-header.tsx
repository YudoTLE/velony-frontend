'use client';

import { CardHeader } from '@shared/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export const NavSidebarHeader = () => {
  return (
    <CardHeader className="p-2 flex justify-center items-center">
      <Link href="/">
        <Image
          src="/images/velony-icon.png"
          alt="Velony Icon"
          width={28}
          height={28}
        />
      </Link>
    </CardHeader>
  );
};
