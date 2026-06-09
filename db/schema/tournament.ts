import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const tournament = sqliteTable('tournament', {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),

    name: text('name').notNull()
});

export type Tournament = typeof tournament.$inferSelect;