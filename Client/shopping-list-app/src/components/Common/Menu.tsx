"use client";

import { AddItem } from "../Items/AddItem";
import { InputSaveList } from "../UI";

import { useList, useUI } from "@/app/hooks";

import { FormikAddItemComponent } from "../Form/FormikAddItemComponent";

import { ContentMenu } from ".";
import { FormikAddCategoryComponent } from "../Form";

export function Menu() {
  const { dataList } = useList();
  const { showAddItemMenuState, updateCategoryUIState, showAddCategoryUIState } = useUI();

  return (
    <section className="menu flex-col bg-transparent h-full flex justify-between items-center">
      {!showAddItemMenuState ? (
        <>
          <div className="w-full bg-[#1b243b] h-full py-10 px-9 flex items-center flex-col gap-10">
            <AddItem />
            <ContentMenu itemsList={dataList?.items} />
          </div>
          <div className="w-full bg-[#16223d] h-36 flex justify-center items-center">
            <InputSaveList />
          </div>
        </>
      ) : (
        <div className="w-full bg-[#1b243b] h-full py-10 px-16 flex items-center flex-col gap-8">
          <h2 className="text-2xl text-slate-50 tracking-wide self-start">
            Add a new item
          </h2>
          <FormikAddItemComponent />
          {
            showAddCategoryUIState 
            ?(
              <div className="flex flex-col gap-8 self-start">
                <h2 className="text-2xl text-slate-50 tracking-wide self-start">
                  Add a new category
                </h2>
                <FormikAddCategoryComponent />
              </div>
            )
            :(
              <button 
                className="h-auto flex justify-center items-center gap-3 self-start"
                onClick={() => updateCategoryUIState(true)}
              > 
                <p className="font-bold text-2xl text-slate-50">+</p>
                <p className="text-2xl text-slate-50">Add category</p>
              </button>
            )
          }
        </div>
      )}
    </section>
  );
}
