'use client'

import { useItems } from "@/app/hooks/useItems"

import { Slogan } from "./Slogan"
import { CardItem } from "./CardItem"

import { InputSearch } from "../UI"

export function ListItems() {
    
    const { dataItems, addItemsToList } = useItems() 

    return (
        <section className="relative flex flex-col min-h-screen pl-32 pt-8 pr-8 gap-14">
            <div className="w-full h-auto flex gap-80 self-start">
                <Slogan />
                <InputSearch />
            </div>

            {
                dataItems.length === 0 ? (
                        <div className="absolute w-[100%] h-[100%] flex justify-center items-center pr-36">
                            <h1 className="text-4xl font-bold tracking-tighter text-slate-50">No hay items agregados</h1>
                        </div>
                )
                :(
                    <section className="w-auto flex flex-col gap-12 overflow-auto max-h-[calc(90vh-120px)] ScrollCards pr-4">
                        <CardItem Items={dataItems} addItemsToList={addItemsToList} />
                    </section>
                )
            }
        </section>
    )

}