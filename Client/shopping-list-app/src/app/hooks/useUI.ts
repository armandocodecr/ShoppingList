'use client'
import { useUIStore } from "../store/";
import { useEffect, useState } from 'react';

export function useUI() {

    const { updateMenuState, updateHistoryMenuState, updateCategoryUIState,
    } = useUIStore(state => ({
        updateMenuState         : state.updateMenuState,
        updateHistoryMenuState  : state.updateHistoryMenuState,
        updateCategoryUIState   : state.updateCategoryUIState,
    }))

    const addItemMenuStore = useUIStore(state => state.showAddItem)
    const addCategoryMenuStore = useUIStore(state => state.showAddCategoryUI)
    const addHistoryMenuStore = useUIStore(state => state.isHistoryMenu)

    const [showAddCategoryUIState, setShowAddCategoryUIState] = useState<boolean>(false)
    const [showAddItemMenuState, setShowAddItemMenuState] = useState<boolean>(false)
    const [isHistoryMenuState, setIsHistoryMenu] = useState<boolean>(false)

    useEffect(() => {
        setShowAddCategoryUIState(addCategoryMenuStore)
    }, [addCategoryMenuStore])

    useEffect(() => {
        setShowAddItemMenuState(addItemMenuStore)
    }, [addItemMenuStore])

    useEffect(() => {
        setIsHistoryMenu(addHistoryMenuStore)
    }, [addHistoryMenuStore])
    

    return {

        //Variables
        showAddCategoryUIState,
        showAddItemMenuState,
        isHistoryMenuState,

        //Methods
        updateMenuState,
        updateHistoryMenuState,
        updateCategoryUIState
    }

}