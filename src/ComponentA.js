import React, { useContext } from 'react';
import { useActor } from '@xstate/react';
import { GlobalStateContext } from './App';

export default function ComponentA() {

    const globalServices = useContext(GlobalStateContext);

    const [operateItem] = useActor(globalServices.operateItemService);
    const { send } = globalServices.operateItemService;

    const [aa] = useActor(globalServices.navFocusMachineService);
    const send2 = globalServices.navFocusMachineService.send;

    return (
        <div>
            <div className='app1'>
                {aa.matches('0') && <p>0</p>}
                {aa.matches('1') && <p>1</p>}
                {aa.matches('2') && <p>2</p>}
                <div>
                    <button onClick={() => send2('EXECUTION')}>執行中</button>
                    <button onClick={() => send2('COMPLETED')}>已完成</button>
                    <button onClick={() => send2('EXPIRED')}>已過期</button>
                    {/* <button onClick={() => { console.log('狀態機目前狀態--operateItem.value', operateItem.value, 'operateItem.context', operateItem.context) }}>狀態機目前狀態</button> */}
                </div>

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
