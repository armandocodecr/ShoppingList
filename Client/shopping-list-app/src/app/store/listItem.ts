import { create } from 'zustand'
import { ListItemUserDataStore } from '../interface/ListItemInterfaces'

interface ILists{
    dataListItem    : ListItemUserDataStore | null,
    updateListItem  : (newState : ListItemUserDataStore | null) => void,
}

export const useAllListItemStore = create<ILists>(set => 
({
    dataListItem: null,
    updateListItem: ( newState : ListItemUserDataStore | null) => set( state => ({
        dataListItem: newState
    })),
}))