'use client'

import { useItems } from "@/app/hooks/useItems"

import { Slogan } from "./Slogan"
import { CardItem } from "./CardItem"

import { InputSearch, Loader } from "../UI"

export function ListItems() {
    
    const { dataItems, addItemsToList } = useItems() 
    
  
    return (
        <section className="relative grid grid-rows-[100px,1fr] min-h-screen pl-32 pt-8">
            <div className="w-full h-auto flex gap-80 self-start">
                <Slogan />
                <InputSearch />
            </div>

            {
                dataItems.length === 0 ? (
                        <div className="absolute w-[100%] h-[100%] flex justify-center items-center ">
                            <Loader />
                        </div>
                )
                :(
                    <CardItem Items={dataItems} addItemsToList={addItemsToList} />
                )
            }
        </section>
    )

}