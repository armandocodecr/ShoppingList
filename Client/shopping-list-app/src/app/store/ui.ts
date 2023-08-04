import { create } from 'zustand'

interface IItems{
    showAddIteMenu          : boolean,
    isHistoryMenu           : boolean,
    updateMenuState         : (newState : boolean) => void,
    updateHistoryMenuState  : (newState : boolean) => void,
}

export const useUIStore = create<IItems>(set => 
({
    showAddIteMenu: false,
    isHistoryMenu: false,
    updateMenuState: ( newState : boolean) => set( state => ({
        showAddIteMenu: newState
    })),
    updateHistoryMenuState: ( newState : boolean) => set( state => ({
        isHistoryMenu: newState
    })),
}))