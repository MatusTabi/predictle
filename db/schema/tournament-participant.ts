import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const tournamentParticipant = sqliteTable('tournament_participant', {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    userId: text('userId').notNull().unique(),
    userName: text('userName').notNull(),
    // tournamentId: text('tournamentId').notNull().unique(),

    rank: integer('rank').notNull(),
    correctWinners: integer('correctWinners').default(0),
    correctScores: integer('correctScores').default(0),
    totalPredictions: integer('totalPredictions').default(0),
    points: integer('points').default(0),
});

export type TournamentParticipant = typeof tournamentParticipant.$inferSelect;
