import { useUIStore } from "../store/";


export function useUI() {

    const { showAddIteMenu, updateMenuState, isHistoryMenu, updateHistoryMenuState } = useUIStore(state => ({
        showAddIteMenu          : state.showAddIteMenu,
        updateMenuState         : state.updateMenuState,
        isHistoryMenu           : state.isHistoryMenu,
        updateHistoryMenuState  : state.updateHistoryMenuState
    }))

    return {

        //Variables
        showAddIteMenu,
        isHistoryMenu,

        //Methods
        updateMenuState,
        updateHistoryMenuState
    }

}