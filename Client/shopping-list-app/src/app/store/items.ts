import { create } from 'zustand'
import { IPropertyItems } from '../interface/DataInterface'
import { IItemsToTremo } from '../interface/ListInterfaces'

interface IItems{
    dataItemsToStatistics           : IItemsToTremo[] | [],
    dataCategoriesToStatistics      : IItemsToTremo[] | [],
    dataItems                       : IPropertyItems[] | [],
    updateItems                     : (newState : IPropertyItems[]) => void,
    updateItemsToStatistics         : (newState : IItemsToTremo[]) => void,
    updateCategoriesToStatistics    : (newState : IItemsToTremo[]) => void,
}

export const useAllItems = create<IItems>(set => 
({
    dataItemsToStatistics: [],
    dataCategoriesToStatistics: [],
    dataItems: [],
    errorMessage: "",
    updateItems: ( newState : IPropertyItems[]) => set( state => ({
        dataItems: newState
    })),
    updateItemsToStatistics: ( newState : IItemsToTremo[]) => set( state => ({
        dataItemsToStatistics: newState
    })),
    updateCategoriesToStatistics: ( newState : IItemsToTremo[]) => set( state => ({
        dataCategoriesToStatistics: newState
    })),
}))