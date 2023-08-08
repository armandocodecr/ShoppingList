import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface IItems{
    showAddCategoryUI       : boolean,
    showAddItem             : boolean,
    isHistoryMenu           : boolean,
    updateMenuState         : (newState : boolean) => void,
    updateHistoryMenuState  : (newState : boolean) => void,
    updateCategoryUIState   : (newState : boolean) => void,
}

export const useUIStore = create<IItems>()(
persist(
    set => ({
        showAddCategoryUI: false,
        showAddItem: false,
        isHistoryMenu: false,
        updateMenuState: value => 
        set(() => ({
            showAddItem: value
        })),
        updateHistoryMenuState: value => 
        set(() => ({
            isHistoryMenu: value
        })),
        updateCategoryUIState: value => 
        set(() => ({
            showAddCategoryUI: value
        })),
    }), 
    {
        name: "currentUIMenu",
    }
))