'use client';

import { useQuery } from '@tanstack/react-query';

import type { TournamentsResponse } from './types';
import { getTournamentsAction } from './action';

export const tournamentsQueryKey = ['tournaments'] as const;

export const useTournamentsQuery = (initialData: TournamentsResponse) => {
    return useQuery({
        queryKey: tournamentsQueryKey,
        queryFn: getTournamentsAction,
        initialData,
    });
};
