import React, { createContext } from 'react';
import './App.css';
import ComponentA from './ComponentA';
import ComponentB from './ComponentB';
import { useInterpret } from '@xstate/react';
import operateItemMachine from './operateItemMachine';

export const GlobalStateContext = createContext({});

function App() {

	const operateItemService = useInterpret(operateItemMachine);

	return (
		<GlobalStateContext.Provider value={{ operateItemService }}>
			<ComponentA />
			<ComponentB />
		</GlobalStateContext.Provider>

	);
}

export default App;
