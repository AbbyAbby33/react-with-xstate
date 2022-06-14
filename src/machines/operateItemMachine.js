import { createMachine, assign } from 'xstate';

const operateItemMachine = createMachine({
    id: 'operateItem',
    initial: 'inactive',
    // 擴展狀態
    context: {
        operateItem: null,
    },
    states: {
        'inactive': {
            on: {
                SET: {
                    target: 'active',
                    actions: ['setItem'],
                    // actions function可以直接寫在這裡
                    // actions: (context, event) => {
                    // 	console.log('setItem...context', context, 'event', event);
                    // 	assign({ operateItem: event.data });
                    // },
                }
            }
        },
        'active': {
            on: {
                CLEAR: {
                    target: 'inactive',
                    actions: ['clearItem'],
                    // actions: () => {
                    //     assign({ operateItem: null });
                    // },
                },
                SET: {
                    target: 'active',
                    actions: ['setItem'],
                }
            },
        },
    }
}, {
    actions: {
        // 不能這樣寫，沒辦法更新context
        // setItem: (context, event) => {
        // 	console.log('setItem...context', context, 'event', event);
        // 	assign({ operateItem: event.data });
        // },
        // 要這樣寫
        setItem: assign({
            operateItem: (context, event) => event.data,
        }),
        clearItem: assign({
            operateItem: (context, event) => null,
        }),
    }
});

export default operateItemMachine;
