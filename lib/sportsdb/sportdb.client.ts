const API_KEY = process.env.SPORTSDB_API_KEY;
const BASE_URL = process.env.SPORTSDB_BASE_URL;

export const sportsDbFetch = async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(`${BASE_URL}/${API_KEY}/${endpoint}`, {
        next: { revalidate: 60 },
    });

    if (!response.ok) {
        throw new Error(
            `Failed to fetch data from SportsDB API: ${response.statusText}`,
        );
    }

    return response.json();
};
