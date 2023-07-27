import { create } from 'zustand'
import { IDataError, IPropertyItems } from '../interface/DataInterface'

interface IItems{
    dataItems: IPropertyItems[] | [],
    updateItems: (newState : IPropertyItems[]) => void,
}

export const useAllItems = create<IItems>(set => 
({
    dataItems: [],
    errorMessage: "",
    updateItems: ( newState : IPropertyItems[]) => set( state => ({
        dataItems: newState
    })),
}))