'use client'
import { useEffect } from "react"

import { useAllListsStore } from "@/app/store/lists"

import { Loader } from "../UI"

import { useList } from "@/app/hooks"
import { CardList } from "./CardList"

export function ListsComponent() {
    
    const { dataLists } = useAllListsStore(state => ({
        dataLists: state.dataLists,
    }))
    const { getListsToHistory } = useList()

    useEffect(() => {
      
        getListsToHistory()

    }, [])
    
  
    return (
        <section className="relative flex flex-col gap-12 min-h-screen pl-32 pt-8 pr-20">
            <div className="w-full h-auto flex gap-80 self-start">
                <h1 className="text-2xl text-white tracking-wide mt-3">Shopping history</h1>
            </div>

            {
                dataLists.length === 0 ? (
                        <div className="absolute w-[80%] h-[100%] flex justify-center items-center">
                            <Loader />
                        </div>
                )
                :(
                    <CardList dataLists={ dataLists } />
                )
            }
        </section>
    )

}