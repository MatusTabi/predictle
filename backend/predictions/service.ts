import { createPrediction } from './repository';
import { PredictionRequestDTO } from './types';

export const submitPrediction = async (prediction: PredictionRequestDTO) => {
    return await createPrediction(prediction);
};
