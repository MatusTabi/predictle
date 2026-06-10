'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { joinTournamentAction } from './action';
import { tournamentsQueryKey } from './query';

export const useJoinTournamentMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: joinTournamentAction,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: tournamentsQueryKey,
            });
        },
    });
};
