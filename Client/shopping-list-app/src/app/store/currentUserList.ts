import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IPropertyItems } from '../interface/DataInterface'

interface ICurrrentList{
    items: IPropertyItems[] | [],
    setUpdateItems: (newState : IPropertyItems[]) => void,
}

export const useCurrentUserList = create<ICurrrentList>()(
persist(
    set => ({
        items: [] ,
        setUpdateItems: ( newState : IPropertyItems[] ) => set( state => ({
            items: newState
        })),
    }),
    {
        name: "currentList",
        //partialize: (state) => ({ data: state.data }),
    }
))