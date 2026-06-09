import { faker } from '@faker-js/faker';
import * as schema from './schema';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

const main = async () => {
    const client = createClient({
        url: process.env.DATABASE_URL!,
        authToken: process.env.DATABASE_AUTH_TOKEN,
    });
    const db = drizzle(client, { schema });

    console.log('Seeding database...');

    await db.delete(schema.users);
    await db.delete(schema.tournament);
    await db.delete(schema.tournamentParticipant);

    await seedUsers(db);
    await seedTournaments(db);
    await seedTournamentParticipants(db);
    console.log('Database seeded successfully!');
};

const seedUsers = async (db: ReturnType<typeof drizzle>) => {
    for (let i = 0; i < 3; i++) {
        await db.insert(schema.users).values({
            id: faker.string.uuid(),
            name: faker.person.fullName(),
            email: faker.internet.email(),
            image: faker.image.avatar(),
        });
    }
};

const seedTournaments = async (db: ReturnType<typeof drizzle>) => {
    for (let i = 0; i < 3; i++) {
        await db.insert(schema.tournament).values({
            id: faker.string.uuid(),
            name: `Tournament ${i + 1}`,
            category: faker.word.noun(),
            startDate: faker.date.future().toISOString(),
        });
    }
};

const seedTournamentParticipants = async (db: ReturnType<typeof drizzle>) => {
    const users = await db.select().from(schema.users);
    const tournaments = await db.select().from(schema.tournament);

    for (const tournament of tournaments) {
        for (const user of users) {
            await db.insert(schema.tournamentParticipant).values({
                id: faker.string.uuid(),
                userId: user.id,
                tournamentId: tournament.id,
                correctWinners: faker.number.int({ min: 0, max: 10 }),
                correctScores: faker.number.int({ min: 0, max: 10 }),
                totalPredictions: faker.number.int({ min: 0, max: 20 }),
                points: faker.number.int({ min: 0, max: 100 }),
            });
        }
    }
};

(async () => {
    try {
        await main();
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        process.exit();
    }
})();
