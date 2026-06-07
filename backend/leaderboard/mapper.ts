import { TournamentParticipant } from '@/db';
import { TournamentParticipantDTO } from './types';

export const tournamentParticipantEntityToDTOList = (
    entities: TournamentParticipant[],
): TournamentParticipantDTO[] => {
    return entities.map((entity) => ({
        ...entity,
    }));
};
