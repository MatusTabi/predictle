'use client';

import Rank from './rank';
import { links } from '../navbar/links';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
    const pathName = usePathname();

    return (
        <section className="hidden w-1/5 min-w-60 flex-none self-stretch bg-primary-container border-e border-inverse-on-surface p-4 lg:flex lg:flex-col lg:gap-4">
            <Rank />
            <nav className="flex flex-col gap-2">
                {links.map(({ name, href, icon: Icon }) => {
                    const isActive = pathName.startsWith(href);

                    return (
                        <Link
                            key={name}
                            href={href}
                            className={cn(
                                'flex items-center gap-x-2 rounded-lg px-3 py-2 font-medium text-lg text-foreground/70 hover:text-foreground transition-colors',
                                isActive &&
                                    'bg-surface-container-high text-primary-foreground',
                            )}
                        >
                            <Icon className="h-5 w-5 inline" />
                            {name}
                        </Link>
                    );
                })}
            </nav>
        </section>
    );
};

export default Sidebar;
