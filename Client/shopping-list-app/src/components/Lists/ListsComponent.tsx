"use client";
import { useEffect } from "react";

import { useAllListsStore } from "@/app/store/lists";

import { Loader } from "../UI";

import { useList } from "@/app/hooks";
import { CardList } from "./CardList";

export function ListsComponent() {
  const { dataLists } = useAllListsStore((state) => ({
    dataLists: state.dataLists,
  }));
  const { getListsToHistoryAndStatistics } = useList();

  useEffect(() => {
    getListsToHistoryAndStatistics();
  }, []);

  return (
    <section className="relative flex flex-col pl-32 pr-16 h-auto overflow-hidden">
      {dataLists.length === 0 ? (
        <div className="w-full h-[100%] flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <article className="flex gap-11 flex-col">
          <div className="w-full h-auto flex gap-80 self-start">
            <h1 className="text-2xl text-white tracking-wide mt-3">
              Shopping history
            </h1>
          </div>

          <div className="overflow-auto max-h-[calc(90vh-120px)] ScrollCards pr-4">
            <CardList dataLists={dataLists} />
          </div>
        </article>
      )}
    </section>
  );
}
