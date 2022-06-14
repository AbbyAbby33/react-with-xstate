import { createMachine } from 'xstate';

const navFocusMachine = createMachine({
    id: 'navFocus',
    initial: '0',
    states: {
        '0': {
            on: {
                COMPLETED: '1',
                EXPIRED: '2',
            },
        },
        '1': {
            on: {
                EXECUTION: '0',
                EXPIRED: '2',
            },
        },
        '2': {
            on: {
                EXECUTION: '0',
                COMPLETED: '1',
            },
        },
    },
});

export default navFocusMachine;
