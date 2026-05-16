import { db, Match, matches } from '@/db';
import { MatchSchema } from './schema';
import z from 'zod';
import { sql } from 'drizzle-orm';

export const create = async (match: MatchSchema | MatchSchema[]) => {
    const parsedMatch = z.array(MatchSchema).or(MatchSchema).parse(match);
    const matchesArray = Array.isArray(parsedMatch)
        ? parsedMatch
        : [parsedMatch];

    console.log('Creating matches:', matchesArray);

    const values = matchesArray.map((m) => ({
        externalId: m.idEvent,
        homeTeam: m.strHomeTeam,
        awayTeam: m.strAwayTeam,
        homeScore: m.intHomeScore ? parseInt(m.intHomeScore) : null,
        awayScore: m.intAwayScore ? parseInt(m.intAwayScore) : null,
        time: m.strTimeLocal,
        date: m.dateEventLocal,
    }));

    return await db.transaction(async (tx) => {
        return await tx
            .insert(matches)
            .values(values)
            .onConflictDoUpdate({
                target: matches.externalId,
                set: {
                    time: sql`excluded.time`,
                    date: sql`excluded.date`,
                },
            });
    });
};

export const getAll = async (): Promise<Match[]> => {
    return await db.select().from(matches);
};
