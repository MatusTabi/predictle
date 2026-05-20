type User = {
    id: string;
    rank: number;
    name: string;
    avatarUrl?: string;

    correctWinners: number;
    correctScores: number;
    totalPredictions: number;
    totalPoints: number;
};

const sampleUsers: User[] = [
    {
        id: '1',
        rank: 1,
        name: 'Alice',
        avatarUrl: 'https://i.pravatar.cc/150?img=1',
        correctWinners: 8,
        correctScores: 5,
        totalPredictions: 10,
        totalPoints: 85,
    },
    {
        id: '2',
        rank: 2,
        name: 'Bob',
        avatarUrl: 'https://i.pravatar.cc/150?img=2',
        correctWinners: 7,
        correctScores: 4,
        totalPredictions: 10,
        totalPoints: 70,
    },
    {
        id: '3',
        rank: 3,
        name: 'Charlie',
        avatarUrl: 'https://i.pravatar.cc/150?img=3',
        correctWinners: 6,
        correctScores: 3,
        totalPredictions: 10,
        totalPoints: 60,
    },
    {
        id: '4',
        rank: 4,
        name: 'David',
        avatarUrl: 'https://i.pravatar.cc/150?img=4',
        correctWinners: 5,
        correctScores: 2,
        totalPredictions: 10,
        totalPoints: 50,
    },
];

export type { User };
export { sampleUsers };
