import { Context, getContext } from "../context";
import React from 'react';
import { Experiment, ExtractVariations, ExperimentName, Variation } from './types';
import { ShowMembersDefaultExperiment, AddSecretsMoveButtonExperiment} from './constants';

const Experiments = {
    [ExperimentName.ShowMembersDefault]: ShowMembersDefaultExperiment,
    [ExperimentName.MoveAddSecretsButton]: AddSecretsMoveButtonExperiment
}

type ExperimentVariations = {
    [Property in keyof typeof Experiments]: ExtractVariations<typeof Experiments[Property]>
}

export type ExperimentationProvider = {
    getActiveVariation: <T extends ExperimentName>(experimentName: T) => ExperimentVariations[T];
    useVariation: <T extends ExperimentName>(experimentName: T, variation: ExperimentVariations[T]) => boolean;
};

function resolveVariation<T extends ExperimentName>(userContext: Context, experimentName: ExperimentName): ExperimentVariations[T] {
    const experiment = Experiments[experimentName];
    const variations: Variation<any>[] = experiment.variations;

    variations.sort((v1, v2) => v1.position - v2.position);

    const result = variations.find(variation => {
        if (variation.condition(userContext)) {
            return variation.name;
        }
    })

    if (!result) {
        throw new Error("No conditions matched for experiment: " + experiment.experimentName);
    }

    return result.name;
}

export function useExperiments(): ExperimentationProvider {
    const userContext = getContext();

    const [cachedVariations, setCachedVariations] = React.useState<ExperimentVariations>({} as ExperimentVariations);

    function getActiveVariation<T extends ExperimentName>(experimentName: T): ExperimentVariations[T] {
        if (experimentName in cachedVariations) {
            return cachedVariations[experimentName];
        }

        const result = resolveVariation(userContext, experimentName);
        setCachedVariations({
            ...cachedVariations,
            [experimentName]: result,
        })

        return result as ExperimentVariations[T];
    }

    return {
        getActiveVariation,
        useVariation: (experimentName, variation) => {
            const activeVariation = getActiveVariation(experimentName);

            return activeVariation === variation;
        },
    }

}

export { ExperimentName }