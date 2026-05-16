import {
    sqliteTable,
    text,
    integer,
    uniqueIndex,
} from 'drizzle-orm/sqlite-core';
import { matches } from './match';
import { users } from './auth';

export const predictions = sqliteTable(
    'predictions',
    {
        id: text('id')
            .primaryKey()
            .$defaultFn(() => crypto.randomUUID()),
        userId: text('userId')
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
        matchId: text('matchId')
            .notNull()
            .references(() => matches.id, { onDelete: 'cascade' }),
        homeScore: integer('homeScore').notNull(),
        awayScore: integer('awayScore').notNull(),
        createdAt: text('createdAt')
            .notNull()
            .default(new Date().toISOString()),
    },
    (table) => [
        uniqueIndex('predictions_user_match_unique').on(
            table.userId,
            table.matchId,
        ),
    ],
);

export type Prediction = typeof predictions.$inferSelect;
