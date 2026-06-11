'use client';

import { cn } from '@/lib/utils';
import { Award, Gavel, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const links = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Tournament', href: '/tournament', icon: Award },
    { name: 'Rules', href: '#', icon: Gavel },
];

const Links = () => {
    const pathName = usePathname();

    return (
        <nav className="hidden items-center gap-x-1 md:flex">
            {links.map(({ name, href }) => {
                const isActive = pathName.startsWith(href);

                return (
                    <Link
                        key={name}
                        href={href}
                        className={cn(
                            'group relative flex items-center gap-x-2 rounded-lg px-3 py-2 font-bold text-xl transition-colors select-none',
                            isActive
                                ? 'text-foreground'
                                : 'text-foreground/70 hover:text-foreground',
                        )}
                    >
                        {name}
                    </Link>
                );
            })}
        </nav>
    );
};

export default Links;
