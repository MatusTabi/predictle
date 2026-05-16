import z from 'zod';

export const MatchSchema = z.object({
    idEvent: z.string(),
    strHomeTeam: z.string().max(100),
    strAwayTeam: z.string().max(100),
    intHomeScore: z.string().nullable(),
    intAwayScore: z.string().nullable(),
    strTimeLocal: z.string(),
    dateEventLocal: z.string(),
});

export const MatchSchemaResponse = z.object({
    events: z.array(MatchSchema),
});

export type MatchSchema = z.infer<typeof MatchSchema>;

export type MatchType = z.infer<typeof MatchSchemaResponse>;
