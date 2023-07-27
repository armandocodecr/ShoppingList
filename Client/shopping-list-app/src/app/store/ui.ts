import { create } from 'zustand'

interface IItems{
    showAddIteMenu: boolean,
    updateMenuState: (newState : boolean) => void,
}

export const useUIStore = create<IItems>(set => 
({
    showAddIteMenu: false,
    updateMenuState: ( newState : boolean) => set( state => ({
        showAddIteMenu: newState
    })),
}))