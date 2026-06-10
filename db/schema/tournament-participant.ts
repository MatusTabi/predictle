import {
    integer,
    sqliteTable,
    text,
    uniqueIndex,
} from 'drizzle-orm/sqlite-core';
import { users } from './auth';
import { tournament } from './tournament';

export const tournamentParticipant = sqliteTable(
    'tournament_participant',
    {
        id: text('id')
            .primaryKey()
            .$defaultFn(() => crypto.randomUUID()),
        userId: text('userId')
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
        tournamentId: text('tournamentId')
            .notNull()
            .references(() => tournament.id, { onDelete: 'cascade' }),

        correctWinners: integer('correctWinners').default(0),
        correctScores: integer('correctScores').default(0),
        totalPredictions: integer('totalPredictions').default(0),
        points: integer('points').default(0),
    },
    (table) => [
        uniqueIndex('tournament_participant_user_tournament_unique').on(
            table.userId,
            table.tournamentId,
        ),
    ],
);

export type TournamentParticipant = typeof tournamentParticipant.$inferSelect;
