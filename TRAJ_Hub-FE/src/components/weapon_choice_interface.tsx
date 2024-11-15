// react
import { useState } from 'react';

// functions
import { SplitRifle } from '../config/helpers'

// variables
import * as weapons from '../config/variables'

interface WeaponChoiceInterfaceProps {
    weaponType: string | null;
    setWeaponType: (setWeaponType: string) => void;
    parameterList: string[]
    addRemoveParameter: (addParameter: string) => void;
    reset: () => void;
    fetchData: (fetchData: boolean) => void
}

export default function WeaponChoiceInterface(props: WeaponChoiceInterfaceProps) {

  // variables
  const [isBalanced, setIsBalanced] = useState<boolean>(false);

  const splitRifle = (str: string) => {
      return SplitRifle(str)
    }

  const changeBuildMode = () => {
    setIsBalanced(!isBalanced)
  }

  return (
    <div className='relative w-full'>
      <header className='flex w-full m-2 p-1 justify-around border border-blue-700'>
        <div className='flex w-1/2 justify-center '>
        <h1>
          Choose your weapon type.
        </h1>
        </div>
        <div className='flex w-1/2 justify-center items-center'>
        {/* <button onClick={changeBuildMode}>Build Mode: {isBalanced? 'Balanced': 'Custom'}</button> */}
        <div className='relative flex w-40 h-full rounded-full justify-between items-center py-1 px-2 bg-purple-800'>
          {isBalanced ? 'Balanced': null}
          <div 
            className={`block h-5/6 w-1/2 rounded-full bg-gray-500  `}
            onClick={changeBuildMode}>
          </div>
          {isBalanced? null : 'Custom'}
        </div>
        </div>
      </header>
      <article className='flex w-full'>
        <section className='flex-col w-1/2'>
          {weapons.weapontypes.map((wtype: string, index) => (
            <button
              key={index}
              className={`flex m-1 py-1 px-2 rounded-xl ${props.weaponType === wtype ? 'bg-green-600': 'bg-none'} bg-opacity-40`}
              onClick={() => {
                props.setWeaponType(wtype);
              }}
            >
              <p>{splitRifle(wtype)}</p>
            </button>
          ))}
        </section>

        <section className={`flex-col w-1/2 justify-items-center ${isBalanced? 'hidden': 'flex'}`}>
          {weapons.parameters.map((param: string, index) => (
            <button
              key={index}
              className={`flex justify-between m-1 py-1 px-2 w-40 rounded-xl ${!props.parameterList.includes(param) ? 'bg-none': 'bg-green-600'} bg-opacity-40`}
              onClick={() => {
                props.addRemoveParameter(param);
              }}
            >
              <p>{param}</p>
              <p>{props.parameterList.includes(param) ? props.parameterList.indexOf(param) + 1 : null}</p>
            </button>
          ))}
        </section>
      </article>

      <section className='flex w-full  justify-around'>
        <div className='flex w-1/2 justify-center border border-red-700'>
        <button
          onClick={() => {
            props.fetchData(isBalanced);
          }}
        >
          submit
        </button>
        </div>
        <div className='flex w-1/2 justify-center border border-blue-700'>
        <button
          onClick={() => {
            props.reset();
          }}
        >
          Reset
        </button>
        </div>
      </section>
    </div>
  )
}