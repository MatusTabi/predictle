import type { Metadata } from 'next';
import { Sora, Geist } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar/navbar';
import { cn } from '@/lib/utils';
import Providers from '@/components/providers';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const sora = Sora({
    variable: '--font-sora',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Predictle',
    description: 'Predict the results',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={cn(
                'h-full',
                'antialiased',
                sora.variable,
                'font-sans',
                geist.variable,
            )}
            suppressHydrationWarning
        >
            <body className="relative min-h-screen flex flex-col">
                <Providers>
                    <Navbar />
                    <main className="flex flex-col flex-1 min-h-0 z-10 inset-0 h-full w-full bg-[linear-gradient(to_right,#73737320_1px,transparent_1px),linear-gradient(to_bottom,#73737320_1px,transparent_1px)] bg-size-[20px_20px]">
                        {children}
                    </main>
                </Providers>
            </body>
        </html>
    );
}
