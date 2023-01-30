import React from 'react';
import { Context, getContext } from "../context";
import { AddSecretsMoveButtonExperiment, ShowMembersDefaultExperiment } from './constants';
import { ExperimentName, ExtractVariations, Variation } from './types';

const Experiments = {
    [ExperimentName.ShowMembersDefault]: ShowMembersDefaultExperiment,
    [ExperimentName.MoveAddSecretsButton]: AddSecretsMoveButtonExperiment
}

type ExperimentVariations = {
    [Property in keyof typeof Experiments]: ExtractVariations<typeof Experiments[Property]>
}

function resolveVariation<T extends ExperimentName>(userContext: Context, experimentName: T): ExperimentVariations[T] {
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

type ExperimentLoader<T extends ExperimentName> = {
    getActiveVariation: (experimentName: T) => ExperimentVariations[T];
    variationIsActive: (variation: ExperimentVariations[T]) => boolean;
}

export type ExperimentationProvider = {
    experiment: <T extends ExperimentName>(experimentName: T) => ExperimentLoader<T>
};


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

        return result;
    }

    function buildLoader<T extends ExperimentName>(experimentName: T): ExperimentLoader<T>  {
        return {
            getActiveVariation: () => {
               return getActiveVariation(experimentName);
            },
            variationIsActive: (variation) => {
                const activeVariation = getActiveVariation(experimentName);

                return activeVariation === variation;
            }
        }
    }

    return {
        experiment: (experimentName) =>  buildLoader(experimentName),
    }

}

export { ExperimentName };
