import { scoreFinishedTournamentMatches } from '@/backend/scoring/service';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret) {
        const authHeader = request.headers.get('authorization');

        if (authHeader !== `Bearer ${cronSecret}`) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 },
            );
        }
    }

    try {
        const result = await scoreFinishedTournamentMatches();

        return NextResponse.json(
            {
                message: 'Scoring completed successfully',
                ...result,
            },
            { status: 200 },
        );
    } catch (error) {
        console.error('Error during scoring:', error);

        return NextResponse.json(
            {
                message: 'Scoring failed',
                error: error instanceof Error ? error.message : String(error),
            },
            { status: 500 },
        );
    }
}
