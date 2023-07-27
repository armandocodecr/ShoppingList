"use client";

import { AddItem } from "./AddItem";
import { InputSaveList } from "../UI";
import { ContentShoppingList } from "./ContentShoppingList";

import { IPropertyItems } from "../../app/interface/DataInterface";

import { useList, useUI } from "@/app/hooks";

import { FormikAddItemComponent } from "../Form/FormikAddItemComponent";

export function Menu() {
  const { dataList } = useList();
  const { showAddIteMenu } = useUI();

  return (
    <section className="menu flex-col bg-transparent h-full flex justify-between items-center">
      {!showAddIteMenu ? (
        <>
          <div className="w-full bg-[#1b243b] h-full py-10 px-16 flex items-center flex-col gap-10">
            <AddItem />
            <h2 className="text-2xl text-slate-50 tracking-wide self-start">
              Shopping list
            </h2>
            {dataList && dataList.items.map((item: IPropertyItems, i) => (
              <ContentShoppingList item={item} key={item.category} currentIndex={i} />
            ))}
          </div>
          <div className="w-full bg-[#16223d] h-36 flex justify-center items-center">
            <InputSaveList />
          </div>
        </>
      ) : (
        <div className="w-full bg-[#1b243b] h-full py-10 px-16 flex items-center flex-col gap-10">
          <h2 className="text-2xl text-slate-50 tracking-wide self-start">
            Add a new item
          </h2>
          <FormikAddItemComponent />
        </div>
      )}
    </section>
  );
}
