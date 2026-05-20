import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const leaderboard = sqliteTable('leaderboard', {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    userId: text('userId').notNull(),

    rank: integer('rank').notNull(),
    correctWinners: integer('correctWinners').default(0),
    correctScores: integer('correctScores').default(0),
    totalPredictions: integer('totalPredictions').default(0),
    points: integer('points').default(0),
});
