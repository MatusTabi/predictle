import { syncMatchesFromSportsDb } from '@/backend/matches/service';

export async function GET() {
    await syncMatchesFromSportsDb();

    return new Response(
        JSON.stringify({ message: 'Matches synced successfully' }),
        {
            headers: { 'Content-Type': 'application/json' },
        },
    );
}
