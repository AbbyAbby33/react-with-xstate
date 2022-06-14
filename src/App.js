import logo from './logo.svg';
import './App.css';

import { useMachine } from '@xstate/react';
import { createMachine } from 'xstate';

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

	const [state, send] = useMachine(navFocusMachine);

	console.log(state); // 'green'

	return (
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
				<button onClick={() => {console.log('狀態機目前狀態--state.value', state.value)}}>狀態機目前狀態</button>
			</div>
		</div>
	);
}

export default App;
