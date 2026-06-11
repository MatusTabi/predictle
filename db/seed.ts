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

    await db.delete(schema.predictions);
    await db.delete(schema.matches);
    await db.delete(schema.tournamentParticipant);
    await db.delete(schema.users);
    await db.delete(schema.tournament);

    await seedUsers(db);
    await seedTournaments(db);
    await seedMatches(db);
    await seedTournamentParticipants(db);
    console.log('Database seeded successfully!');
};

const seedUsers = async (db: ReturnType<typeof drizzle>) => {
    for (let i = 0; i < 6; i++) {
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
        const name = `Tournament ${i + 1}`;

        await db.insert(schema.tournament).values({
            id: faker.string.uuid(),
            name,
            slug: name.toLowerCase().replaceAll(' ', '-'),
            category: faker.word.noun(),
            startDate: faker.date.future().toISOString(),
        });
    }
};

const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

const seedMatches = async (db: ReturnType<typeof drizzle>) => {
    const tournaments = await db.select().from(schema.tournament);
    const dateOffsets = [-1, 0, 1];

    for (const tournament of tournaments) {
        for (const offset of dateOffsets) {
            const date = new Date();
            date.setDate(date.getDate() + offset);

            for (let i = 0; i < 2; i++) {
                await db.insert(schema.matches).values({
                    id: faker.string.uuid(),
                    externalId: `${tournament.slug}-${offset}-${i}`,
                    homeTeam: faker.location.country(),
                    awayTeam: faker.location.country(),
                    homeScore: null,
                    awayScore: null,
                    date: formatDate(date),
                    time: `${String(18 + i).padStart(2, '0')}:00:00`,
                    tournamentId: tournament.id,
                    strGroup: `Group ${i + 1}`,
                });
            }
        }
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
