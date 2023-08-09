import { useEffect } from "react";
import { IItemsToTremo, IListsToTremo } from "../interface/ListInterfaces";
import { useAllItems } from "../store";
import { useAllListsStore } from "../store/lists";
import { useList } from "./useList";


export function useStatistics(){

    const { dataLists, dataListsByCreationDate, updateListsByCreationDate } = useAllListsStore((state) => ({
        dataLists                : state.dataLists,
        dataListsByCreationDate  : state.dataListsByCreationDate,
        updateListsByCreationDate: state.updateListsByCreationDate,
    }));

  const { dataItemsToStatistics, updateItemsToStatistics, dataCategoriesToStatistics, updateCategoriesToStatistics } = useAllItems((state) => ({
        dataItemsToStatistics        : state.dataItemsToStatistics,
        dataCategoriesToStatistics   : state.dataCategoriesToStatistics,
        updateItemsToStatistics      : state.updateItemsToStatistics,
        updateCategoriesToStatistics : state.updateCategoriesToStatistics
  }));

  const { getListsToHistoryAndStatistics } = useList();

  useEffect(() => {
    getListsToHistoryAndStatistics();
  }, []);

  useEffect(() => {
    if (!dataLists) return;

    //const infoItemsList: [] | IListSorted[] = dataLists.infoItemsList;
    const itemsArrayToTremor: any[] = dataLists.flatMap((currList) =>
      currList.infoItemsList.flatMap((currItemList) =>
        currItemList.items.map((currItem) => ({
          ItemName     : currItem.item.name,
          itemValue    : currItem.quantity,
          CategoryName : currItem.item.category.name,
          categoryValue: 1,
        }))
      )
    );

    let groupedItems: { [key: string]: IItemsToTremo } = {};
    let groupedCategories: { [key: string]: IItemsToTremo } = {};
    
    const listsArrayToTremor: IListsToTremo[] = dataLists.map((currList) =>({
      date        : currList.createdMonthAt,
      amount: currList.infoItemsList.length
    }));

    itemsArrayToTremor.forEach((item) => {
      if (groupedItems[item.ItemName]) {
        groupedItems[item.ItemName].value += item.itemValue;
      } else {
        groupedItems[item.ItemName] = { 
            name  : item.ItemName,
            value : item.itemValue
         };
      }
    });

    itemsArrayToTremor.forEach((item) => {
      if (groupedCategories[item.CategoryName]) {
        groupedCategories[item.CategoryName].value += 1;
      } else {
        groupedCategories[item.CategoryName] = { 
            name  : item.CategoryName,
            value : item.categoryValue
         };
      }
    });

    updateListsByCreationDate(listsArrayToTremor)
    updateCategoriesToStatistics(Object.values(groupedCategories))
    updateItemsToStatistics(Object.values(groupedItems));
  }, [dataLists]);

    return{

        dataItemsToStatistics,
        dataCategoriesToStatistics,
        dataListsByCreationDate,

    }

}