import { Context } from '../context';

export enum ExperimentName {
    ShowMembersDefault = "showMembersDefault",
    MoveAddSecretsButton = "MoveAddSecretsButton",
    Test = "test"
}

export type VariationCondition = (context: Context) => boolean;
export type Variation<T> = {
    condition: VariationCondition;
    name: T;
    position: number;
};

export type Experiment<T> = {
    experimentName: ExperimentName;
    variations: [Variation<T>, ...Variation<T>[]]
}

export type ExtractVariations<Exp> = Exp extends Experiment<infer T> ? T : never;

type Test = ExtractVariations<number>
type Test2 = ExtractVariations<Experiment<ExperimentName.ShowMembersDefault>>
