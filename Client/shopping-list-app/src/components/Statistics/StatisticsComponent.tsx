"use client";

import { useEffect } from "react";
import { useList } from "@/app/hooks";
import { useAllListsStore } from "@/app/store/lists";
import { IItemsToTremo, IListsToTremo } from "@/app/interface/ListInterfaces";
import { Card, Title, Flex, Bold, BarList, Text, Grid, Col, AreaChart } from "@tremor/react";
import { useAllItems } from "@/app/store";

export function StatisticsComponent() {
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

  return (
    <section className="relative flex flex-col min-h-screen pl-32 pr-24 pt-16">
      <Grid numItems={1} numItemsSm={2} numItemsLg={2} className="gap-10">
        <Col numColSpan={2} numColSpanLg={1}>
          <Card className="w-full">
            <Title>Top Items</Title>
            <Flex className="mt-4">
              <Text>
                <Bold>Name</Bold>
              </Text>
              <Text>
                <Bold>Amounts</Bold>
              </Text>
            </Flex>
            <BarList data={dataItemsToStatistics} className="mt-2" />
          </Card>
        </Col>
        <Col numColSpan={2} numColSpanLg={1}>
        <Card className="w-full">
            <Title>Top Categories</Title>
            <Flex className="mt-4">
              <Text>
                <Bold>Name</Bold>
              </Text>
              <Text>
                <Bold>Amounts</Bold>
              </Text>
            </Flex>
            <BarList data={dataCategoriesToStatistics} className="mt-2" />
          </Card>
        </Col>
        <Col numColSpan={2} numColSpanSm={2} numColSpanMd={2} numColSpanLg={2}>
        <Card>
          <Title>Monthly Summary</Title>
          <AreaChart
            className="h-72 mt-4"
            data={dataListsByCreationDate}
            index="date"
            categories={["amount"]}
            colors={["indigo", "cyan"]}
          />
          </Card>
        </Col>
      </Grid>
    </section>
  );
}
