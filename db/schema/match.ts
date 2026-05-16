import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const matches = sqliteTable('matches', {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    externalId: text('externalId').unique().notNull(),

    homeTeam: text('homeTeam').notNull(),
    awayTeam: text('awayTeam').notNull(),

    homeScore: integer('homeScore').default(0),
    awayScore: integer('awayScore').default(0),

    date: text('date').notNull(),
    time: text('time').notNull(),

    strGroup: text('group'),
});

export type Match = typeof matches.$inferSelect;
