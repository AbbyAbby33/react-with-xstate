import logo from './logo.svg';
import './App.css';

import { useMachine } from '@xstate/react';
import { createMachine, assign } from 'xstate';

function App() {

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
						actions: (context, event) => {
							console.log('setItem...context', context, 'event', event);
							assign({ operateItem: event.data });
						},
					}
				}
			},
			'active': {
				on: {
					CLEAR: {
						target: 'inactive',
						actions: () => {
							assign({ operateItem: null });
						},
					},
					SET: {
						target: 'active',
						actions: (context, event) => {
							console.log('setItem...context', context, 'event', event);
							assign({ operateItem: event.data });
						},
					}
				},
			},
		}
	});

	const [state, send] = useMachine(navFocusMachine);
	const [operateItem, sendOperateItem] = useMachine(operateItemMachine);

	// console.log(state);
	// console.log(operateItem);

	return (
		<>
			<div>
				{/** 所處狀態 */}
				{state.matches('0') && <p>執行中</p>}
				{state.matches('1') && <p>已完成</p>}
				{state.matches('2') && <p>已過期</p>}
				<div>
					{/** 更改狀態 */}
					<button onClick={() => send('EXECUTION')}>執行中</button>
					<button onClick={() => send('COMPLETED')}>已完成</button>
					<button onClick={() => send('EXPIRED')}>已過期</button>
					<button onClick={() => { console.log('狀態機目前狀態--state.value', state.value) }}>狀態機目前狀態</button>
				</div>
			</div>
			<div>
				{/** 所處狀態 */}
				{operateItem.matches('active') && <p>有</p>}
				{operateItem.matches('inactive') && <p>無</p>}
				{operateItem.context.operateItem ? operateItem.context.operateItem : ''}
				<div>
					{/** 更改狀態 */}
					<button onClick={() => sendOperateItem('SET', { data: 'Apple' })}>蘋果</button>
					<button onClick={() => sendOperateItem('SET', { data: 'Orange' })}>橘子</button>
					<button onClick={() => sendOperateItem('CLEAR')}>清除</button>
					<button onClick={() => { console.log('狀態機目前狀態--operateItem.value', operateItem.value, 'operateItem.context', operateItem.context) }}>狀態機目前狀態</button>
				</div>
			</div>
		</>

	);
}

export default App;
