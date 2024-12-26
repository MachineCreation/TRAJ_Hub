// react
import { useState } from 'react';

// components
import { BooleanToggle } from './boolean-toggle';

// functions
import { ToTitleCase } from '../config/helpers'

// variables
import * as weapons from '../config/variables'

interface WeaponChoiceInterfaceProps {
    weaponType: string | null;
    setWeaponType: (setWeaponType: string) => void;
    parameterList: string[]
    addRemoveParameter: (addParameter: string) => void;
    reset: () => void;
    fetchData: (fetchData: string) => void
    gunfighter: boolean;
    setgunfighter: (setGunfighter: boolean) => void;
}

export default function WeaponChoiceInterface(props: WeaponChoiceInterfaceProps) {

  // variables
  const [isBalanced, setIsBalanced] = useState<boolean>(false);
  const [mode, setMode] = useState<string>('custom');

  const changeBuildMode = () => {
    setIsBalanced(!isBalanced)
    isBalanced? (setMode('custom')):(setMode('balanced'))
  }

  const Gunfighter = () => {
    props.setgunfighter(!props.gunfighter)
    // console.log(props.gunfighter);
  };


  return (
    <div className='relative w-full text-xl'>
      <header className='flex flex-col-reverse sm:flex-row m-2 p-3 justify-around items-center rounded-xl border-x-2'>
        <div className='flex sm:w-1/2 justify-center items-center text-center'>
          <h1>
            Choose your weapon type.
          </h1>
        </div>
        <div className='flex w-1/2 m-5 justify-center items-center'>
          <BooleanToggle 
            ifTrue='Balanced'
            height='h-10'
            width='w-48'
            IO={isBalanced}
            changeMode={changeBuildMode}
          />
        </div>
        <div className='flex w-1/2 m-5 justify-center items-center'>
          <BooleanToggle 
            ifTrue='Gunfighter'
            height='h-10'
            width='w-48'
            IO={props.gunfighter}
            changeMode={Gunfighter}
          />
        </div>
      </header>

      <article className='flex flex-col sm:flex-row m-2 rounded-xl border-x-2'>
        <section className='flex-col sm:w-1/2 justify-items-center sm:justify-items-start border-b-2 sm:border-none border-orange-500'>
          {weapons.weapontypes.map((wtype: string, index) => (
            <button
              key={`wtype${index}`}
              className={`flex m-1 py-1 px-2 rounded-xl ${props.weaponType === wtype ? 'bg-green-600': 'bg-none'} bg-opacity-40 text-left`}
              onClick={() => {
                props.setWeaponType(wtype);
              }}
            >
              <p>{ToTitleCase(wtype)}</p>
            </button>
          ))}
        </section>

        <section className={`flex-col sm:w-1/2 items-center sm:items-start ${isBalanced? 'hidden': 'flex'}`}>
          <p className='m-2 p-2 border-b-2 border-blue-500'>
            Choose parameters in order of importance
          </p>
          {weapons.parameters.map((param: string, index) => (
            <button
              key={`param${index}`}
              className={`relative flex flex-wrap justify-between m-1 py-1 px-2 w-40 rounded-xl ${!props.parameterList.includes(param) ? 'bg-none': 'bg-green-600'} bg-opacity-40`}
              onClick={() => {
                props.addRemoveParameter(param);
              }}
            >
              <p>
                {/* <span className="relative text-[.7rem] align-top mr-2">?</span> */}
                {param}
              </p>
              <p>{props.parameterList.includes(param) ? props.parameterList.indexOf(param) + 1 : <span className='text-red-600'>X</span>}</p>
              <div className='absolute hidden'>
                poop
              </div>
            </button>
          ))}
        </section>
      </article>

      <section className='flex m-2 p-3 justify-around rounded-xl border-x-2'>
        <div className='flex w-1/2 justify-center items-center'>
        <button
          className='py-1 px-[calc(5vw)] rounded-xl bg-green-500'
          onClick={() => {
            props.fetchData(mode);
          }}
          disabled={(isBalanced && props.weaponType) || (!isBalanced && props.weaponType && props.parameterList.length == 5)? false: true}
        >
          submit
        </button>
        </div>
        <div className='flex w-1/2 justify-center items-center'>
        <button
          className='py-1 px-[calc(5vw)] rounded-xl bg-yellow-500'
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