import '@sweetalert2/theme-dark/dark.css'

import { useList } from '@/app/hooks';


export function InputSaveList() {

    const { inputSaveListValue, onAddItemToShoppingList, updateSaveListValue } = useList()

    return (
        <div className="w-[80%] h-16 border-2 border-[#3e4966] rounded-lg flex">
            <input 
                className="w-[80%] bg-transparent text-slate-50 pl-5 outline-none" 
                type="text" 
                placeholder="Enter a name"
                value={inputSaveListValue}
                onChange={ev => updateSaveListValue(ev.target.value)} 
            />
            <button 
                className="w-[20%] bg-[#3e4966] rounded-md text-slate-50"
                onClick={onAddItemToShoppingList}
            >
                Save
            </button>
        </div>
    )

}