import { Context, getContext } from "../context";
import React from 'react';
import { Experiment, ExtractVariations, ExperimentName } from './types';
import { AddMembersExperiment } from './constants';

const Experiments = {
    [ExperimentName.AddMembers]: AddMembersExperiment,
    [ExperimentName.Test]: AddMembersExperiment
}

type ExperimentVariations = {
    [Property in keyof typeof Experiments]: ExtractVariations<typeof Experiments[Property]>
}

export type ExperimentationProvider = {
    getActiveVariation: <T extends ExperimentName>(experimentName: T) => ExperimentVariations[T];
    useVariation: <T extends ExperimentName>(experimentName: T, variation: ExperimentVariations[T]) => boolean;
};

function resolveVariation<T>(userContext: Context, experiment: Experiment<T>): T {

    const variations = experiment.variations;
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

    // TODO
    const [cachedVariations, setCachedVariations] = React.useState<ExperimentVariations>({} as ExperimentVariations);

    //  TODO ideally this returns back the union type i.e. 'original' | 'variation'
    function getActiveVariation<T extends ExperimentName>(experimentName: T): ExperimentVariations[T] {
        if (experimentName in cachedVariations) {
            return cachedVariations[experimentName];
        }

        const experiment = Experiments[experimentName];

        const result = resolveVariation(userContext, experiment);
        setCachedVariations({
            ...cachedVariations,
            [experimentName]: result,
        })
        return result;
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