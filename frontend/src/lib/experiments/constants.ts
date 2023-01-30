import {Experiment, ExperimentName} from './types';



export const AddMembersExperiment: Experiment<'original' | 'variation'> = {
    experimentName: ExperimentName.AddMembers,
    variations: [
        {
            condition: (context) => context.userId % 2 === 0,
            name: 'original',
            position: 0
        },
        {
            condition: (context) => context.userId % 2 === 1,
            name: 'variation',
            position: 1,
        }
    ]
}