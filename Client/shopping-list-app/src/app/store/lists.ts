import { create } from 'zustand'
import { IListSorted } from '../interface/ListInterfaces'

interface ILists{
    dataLists   : IListSorted[] | [],
    updateLists : (newState : IListSorted[]) => void,
}

export const useAllListsStore = create<ILists>(set => 
({
    dataLists: [],
    updateLists: ( newState : IListSorted[]) => set( state => ({
        dataLists: newState
    })),
}))