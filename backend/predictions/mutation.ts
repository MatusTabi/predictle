'use client';

import { useMutation } from '@tanstack/react-query';

import { submitPredictionAction, type SubmitPredictionInput } from './action';

export const useSubmitPredictionMutation = () => {
    return useMutation({
        mutationFn: async (payload: SubmitPredictionInput) => {
            return await submitPredictionAction(payload);
        },
    });
};
