import { useUIStore } from "../store/";


export function useUI() {

    const { showAddIteMenu, updateMenuState } = useUIStore(state => ({
        showAddIteMenu: state.showAddIteMenu,
        updateMenuState: state.updateMenuState
    }))

    return {

        //Variables
        showAddIteMenu,

        //Methods
        updateMenuState

    }

}