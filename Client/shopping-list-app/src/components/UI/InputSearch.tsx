'use client'
import { SearchIcon } from "@/app/assets/icons";
import { useInputsState } from "@/app/hooks";
import { InputComponent } from "./InputComponent";

export function InputSearch() {

    const { inputValue, updateInputValue } = useInputsState();
    
    return(
        <div className="w-80 h-12 bg-[#1b243b] rounded-xl flex justify-between py-2 px-3 items-center shadow-xl">
            <SearchIcon />
            <InputComponent 
                className="w-[85%] bg-transparent pl-3 outline-none text-slate-50"
                typeInput="text"
                placeholder="Search"
                value={inputValue}
                onChangeFunction={(ev) => updateInputValue(ev.target.value)}
            />
        </div>
    )

}