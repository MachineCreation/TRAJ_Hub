

interface BooleanToggleProps {
    ifTrue: string;
    ifFalse: string;
    height: string;
    width: string;
    IO: boolean;
    changeMode: () => void;
}

export const BooleanToggle = ({ifTrue, ifFalse, height, width, IO, changeMode}:BooleanToggleProps) => {


    return (
        <div className={`relative flex ${width} ${height} rounded-full justify-between items-center py-1 px-2 ${IO? 'bg-purple-600': 'bg-green-600'}`}>
          {IO ? ifTrue: null}
          <div 
            className={`block h-5/6 w-1/2 rounded-full ${IO? 'bg-cyan-500': 'bg-purple-500'} cursor-pointer`}
            onClick={changeMode}>
          </div>
          {IO ? null : ifFalse}
        </div>
    )
}