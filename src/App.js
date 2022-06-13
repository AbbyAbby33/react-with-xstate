import logo from './logo.svg';
import './App.css';

import { useMachine } from '@xstate/react';
import { createMachine } from 'xstate';

function App() {

	const navFocusMachine = createMachine({
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
	// EXECUTION: 'EXECUTION',
	// COMPLETED: 'COMPLETED',
	// EXPIRED: 'EXPIRED',
	const [state, send] = useMachine(navFocusMachine);

	console.log(state); // 'green'


	return (
		<div>
			{/** 所處狀態 */}
			{state.matches('0') && <p>execution</p>}
			{state.matches('1') && <p>completed</p>}
			{state.matches('2') && <p>expired</p>}
			{state.matches('3') && <p>初始狀態</p>}
			<div>
				{/** 更改狀態 */}
				<button onClick={() => send('EXECUTION')}>執行中</button>
				<button onClick={() => send('COMPLETED')}>已完成</button>
				<button onClick={() => send('EXPIRED')}>已過期</button>
			</div>
		</div>
	);
}

export default App;
