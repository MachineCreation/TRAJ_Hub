

interface BooleanToggleProps {
    ifTrue: string;
    height: string;
    width: string;
    IO: boolean;
    changeMode: () => void;
}

export const BooleanToggle = ({ifTrue, height, width, IO, changeMode}:BooleanToggleProps) => {


    return (
        <div className={`relative flex ${width} ${height} p-2 rounded-full justify-between items-center py-1 px-2 ${!IO? 'bg-purple-600': 'bg-green-600'}`}>
          {IO ? 'ON': null}
          <div 
            className={`block h-5/6 w-[70%] px-2 rounded-full content-center align-middle ${!IO? 'bg-cyan-500': 'bg-purple-500'} text-center text-[80%] cursor-pointer`}
            onClick={changeMode}>
              {ifTrue}
          </div>
          {IO ? null : 'OFF'}
        </div>
    )
}