import { Context } from '../context';
import {Experiment, ExperimentName} from './types';


function userIdMod2(context: Context): boolean {
    return context.userId % 2 == 0;
}

export const ShowMembersDefaultExperiment: Experiment<'original' | 'variation'> = {
    experimentName: ExperimentName.ShowMembersDefault,
    variations: [
        {
            condition: (context) => userIdMod2(context),
            name: 'original',
            position: 0
        },
        {
            condition: (context) => !userIdMod2(context),
            name: 'variation',
            position: 1,
        }
    ]
}

export const AddSecretsMoveButtonExperiment: Experiment<'original' | 'variation2'> = {
    experimentName: ExperimentName.ShowMembersDefault,
    variations: [
        {
            condition: (context) => userIdMod2(context),
            name: 'original',
            position: 0
        },
        {
            condition: (context) => !userIdMod2(context),
            name: 'variation2',
            position: 1,
        }
    ]
}