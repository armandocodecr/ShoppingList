import { create } from 'zustand'

export interface IInputSearch{
    inputValue          : string,
    inputSaveListValue  : string,
    updateInputValue    : (newState : string) => void,
    updateSaveListValue : (newState : string) => void
}

export const useInputs = create<IInputSearch>(set => 
({
    inputValue: "" ,
    inputSaveListValue: "",
    updateInputValue: ( newState : string) => set( state => ({
        inputValue: newState
    })),
    updateSaveListValue: ( newState : string) => set( state => ({
        inputSaveListValue: newState
    }))
}))