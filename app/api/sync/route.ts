import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const isCron = request.headers.get('x-vercel-cron') === '1';

    if (!isCron) {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/internal`, {
        headers: {
            Authorization: `Bearer ${process.env.CRON_SECRET}`,
        },
        cache: 'no-store',
    });

    if (!response.ok) {
        return NextResponse.json(
            { message: 'Cron failed: ' + response.statusText },
            { status: 500 },
        );
    }

    return NextResponse.json({ message: 'Sync started' }, { status: 200 });
}
