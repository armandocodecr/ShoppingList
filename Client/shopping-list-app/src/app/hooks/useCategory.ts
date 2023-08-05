'use client'
import { ChangeEvent, useEffect } from "react"

import { useUI } from "./useUI"
import { useCategoryStore } from "../store/categorys"

import { getCategorysFromServer } from '../database/dbCategorys';
import { IDataFromServer } from "../interface/DataInterface";



export function useCategory(){

    const { showAddIteMenu, updateMenuState } = useUI()
    const { categoryStore, setCategoryStore, selectCategory, setSelectCategory } = useCategoryStore(state => ({
        categoryStore    : state.categoryStore,
        setCategoryStore : state.setCategoryStore,
        selectCategory   : state.selectCategory,
        setSelectCategory: state.setSelectCategory
    }))

    const handleSelectChange = ( e: ChangeEvent<HTMLSelectElement> ) => {
        setSelectCategory(e.target.value);
    };

    const onCloseAddItemMenu = () => updateMenuState( !showAddIteMenu ) 

    const getAllCategorys = async() => {
        const dataCategorys: IDataFromServer = await getCategorysFromServer()

        if( !dataCategorys.ok ) return
        setCategoryStore(dataCategorys.data)
    }

    useEffect(() => {
        getAllCategorys()
    }, [])

    return{

        //Methods
        onCloseAddItemMenu,
        handleSelectChange,

        //Variables
        categoryStore,
        selectCategory,
        getAllCategorys,

    }

}