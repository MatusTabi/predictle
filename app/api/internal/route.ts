import { syncMatchesFromSportsDb } from '@/backend/matches/service';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    // const authHeader = request.headers.get('authorization');

    // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    //     return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    // }

    try {
        await syncMatchesFromSportsDb();
        return NextResponse.json(
            { message: 'Sync completed successfully' },
            { status: 200 },
        );
    } catch (error) {
        console.error('Error during sync:', error);
        return NextResponse.json(
            {
                message: 'Sync failed',
                error: error instanceof Error ? error.message : String(error),
            },
            { status: 500 },
        );
    }
}
