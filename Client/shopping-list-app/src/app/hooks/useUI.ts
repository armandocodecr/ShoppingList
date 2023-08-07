import { useUIStore } from "../store/";


export function useUI() {

    const { 
        showAddIteMenu, 
        updateMenuState, 
        isHistoryMenu, 
        showAddCategoryUI,
        updateHistoryMenuState,
        updateCategoryUIState,
    } = useUIStore(state => ({
        showAddCategoryUI       : state.showAddCategoryUI,
        showAddIteMenu          : state.showAddIteMenu,
        updateMenuState         : state.updateMenuState,
        isHistoryMenu           : state.isHistoryMenu,
        updateHistoryMenuState  : state.updateHistoryMenuState,
        updateCategoryUIState   : state.updateCategoryUIState,
    }))

    return {

        //Variables
        showAddCategoryUI,
        showAddIteMenu,
        isHistoryMenu,

        //Methods
        updateMenuState,
        updateHistoryMenuState,
        updateCategoryUIState
    }

}