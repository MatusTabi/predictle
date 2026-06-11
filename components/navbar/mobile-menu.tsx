'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import Rank from '@/components/sidebar/rank';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { links } from './links';

const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathName = usePathname();

    return (
        <div className="lg:hidden">
            <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isOpen}
                onClick={() => setIsOpen((current) => !current)}
            >
                {isOpen ? <X /> : <Menu />}
            </Button>

            {isOpen && (
                <div className="absolute left-0 top-16 w-full border-b border-inverse-on-surface bg-background/95 px-4 py-4 shadow-lg backdrop-blur-xl">
                    <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-4">
                        <div className="rounded-lg bg-primary-container p-4">
                            <Rank />
                        </div>

                        <nav className="flex flex-col gap-2">
                            {links.map(({ name, href, icon: Icon }) => {
                                const isActive = pathName.startsWith(href);

                                return (
                                    <Link
                                        key={name}
                                        href={href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            'flex items-center gap-x-3 rounded-lg px-3 py-3 text-lg font-medium text-foreground/70 transition-colors hover:text-foreground',
                                            isActive &&
                                                'bg-surface-container-high text-primary-foreground',
                                        )}
                                    >
                                        <Icon className="h-5 w-5" />
                                        {name}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MobileMenu;
