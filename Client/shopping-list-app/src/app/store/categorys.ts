import { create } from 'zustand'
import { ICategoryData } from '../interface/CategoryInterface'

interface IItems{
    categoryStore: ICategoryData[] | [],
    selectCategory: string,
    setSelectCategory: (newState : string) => void,
    setCategoryStore: (newState : ICategoryData[]) => void,
}

export const useCategoryStore = create<IItems>(set => 
({
    categoryStore: [],
    selectCategory: "",
    setCategoryStore: ( newState : ICategoryData[]) => set( state => ({
        categoryStore: newState
    })),
    setSelectCategory: ( newState : string) => set( state => ({
        selectCategory: newState
    })),
}))