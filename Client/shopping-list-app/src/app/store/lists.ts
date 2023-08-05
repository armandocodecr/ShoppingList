import { create } from 'zustand'
import { IListSorted, IListsToTremo } from '../interface/ListInterfaces'

interface ILists{
    dataListsByCreationDate  : IListsToTremo[] | []
    dataLists                : IListSorted[] | [],
    updateLists              : (newState : IListSorted[]) => void,
    updateListsByCreationDate: (newState : IListsToTremo[]) => void,
}

export const useAllListsStore = create<ILists>(set => 
({
    dataLists: [],
    dataListsByCreationDate: [],
    updateLists: ( newState : IListSorted[]) => set( state => ({
        dataLists: newState
    })),
    updateListsByCreationDate: ( newState : IListsToTremo[]) => set( state => ({
        dataListsByCreationDate: newState
    })),
}))