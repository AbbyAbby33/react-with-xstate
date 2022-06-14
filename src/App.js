import React, { createContext } from 'react';
import './App.css';
import ComponentA from './ComponentA';
import ComponentB from './ComponentB';
import { useInterpret } from '@xstate/react';
import operateItemMachine from './machines/operateItemMachine';
import navFocusMachine from './machines/navFocusMachine';

export const GlobalStateContext = createContext({});

function App() {

	const operateItemService = useInterpret(operateItemMachine);
	const navFocusMachineService = useInterpret(navFocusMachine);

	return (
		<GlobalStateContext.Provider value={{ operateItemService, navFocusMachineService }}>
			<ComponentA />
			<ComponentB />
		</GlobalStateContext.Provider>

	);
}

export default App;
