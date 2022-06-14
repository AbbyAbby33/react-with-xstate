import React, { useContext } from 'react';
import { useMachine } from '@xstate/react';
import { useActor } from '@xstate/react';
import { createMachine, assign } from 'xstate';
import { GlobalStateContext } from './App';

export default function ComponentB() {

    const globalServices = useContext(GlobalStateContext);
    const [operateItem] = useActor(globalServices.operateItemService);
    const { send } = globalServices.operateItemService;



    return (
        <div>
            {/* <div className='app2'>
                {operateItem.matches('active') && <p>有</p>}
                {operateItem.matches('inactive') && <p>無</p>}
                {operateItem.context.operateItem ? operateItem.context.operateItem : ''}
                <div>
                    <button onClick={() => sendOperateItem('SET', { data: 'Apple' })}>蘋果</button>
                    <button onClick={() => sendOperateItem('SET', { data: 'Orange' })}>橘子</button>
                    <button onClick={() => sendOperateItem('CLEAR')}>清除</button>
                    <button onClick={() => { console.log('狀態機目前狀態--operateItem.value', operateItem.value, 'operateItem.context', operateItem.context) }}>狀態機目前狀態</button>
                </div>
            </div> */}
            <div className='app2'>
                {operateItem.matches('active') && <p>有</p>}
                {operateItem.matches('inactive') && <p>無</p>}
                {operateItem.context.operateItem ? operateItem.context.operateItem : ''}
                <div>
                    <button onClick={() => send('SET', { data: 'Apple' })}>蘋果</button>
                    <button onClick={() => send('SET', { data: 'Orange' })}>橘子</button>
                    <button onClick={() => send('CLEAR')}>清除</button>
                    <button onClick={() => { console.log('狀態機目前狀態--operateItem.value', operateItem.value, 'operateItem.context', operateItem.context) }}>狀態機目前狀態</button>
                </div>
            </div>
        </div>
    )
}
