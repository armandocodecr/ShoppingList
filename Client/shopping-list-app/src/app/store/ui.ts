import { create } from 'zustand'

interface IItems{
    showAddCategoryUI       : boolean,
    showAddIteMenu          : boolean,
    isHistoryMenu           : boolean,
    updateMenuState         : (newState : boolean) => void,
    updateHistoryMenuState  : (newState : boolean) => void,
    updateCategoryUIState  : (newState : boolean) => void,
}

export const useUIStore = create<IItems>(set => 
({
    showAddCategoryUI: false,
    showAddIteMenu: false,
    isHistoryMenu: false,
    updateMenuState: ( newState : boolean) => set( state => ({
        showAddIteMenu: newState
    })),
    updateHistoryMenuState: ( newState : boolean) => set( state => ({
        isHistoryMenu: newState
    })),
    updateCategoryUIState: ( newState : boolean) => set( state => ({
        showAddCategoryUI: newState
    })),
}))