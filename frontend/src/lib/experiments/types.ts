import { Context } from '../context';

export enum ExperimentName {
    ShowMembersDefault = "showMembersDefault",
    Test = "ddd"
}

export type VariationCondition = (context: Context) => boolean;
export type Variation<T> = {
    condition: VariationCondition;
    name: T;
    position: number;
};

export type Experiment<T> = {
    experimentName: ExperimentName;
    // variations: [Variation<T>, ...Variation<T>[]]
    variations: Variation<T>[];
}

export type ExtractVariations<Exp> = Exp extends Experiment<infer T> ? T : never;


