'use client'
import { DeleteIcon } from "@/app/assets/icons";
import { useList, useUI } from "@/app/hooks";
import { ListItemUserData } from "@/app/interface/ListItemInterfaces";

interface Props{
    item        : ListItemUserData,
    currentIndex: number
}

export function ContentShoppingList({ item, currentIndex }: Props) {

    const { onChangeQuanity, handleDeleteItemsInDB } = useList()
    const { isHistoryMenuState } = useUI()

    return (
        <div className="self-start w-full">
            <h3 className="text-base text-slate-400">{ item.category }</h3>
            {
                item.items.map((itemList, i) => (
                    <div key={String(itemList.name)} className="flex h-auto w-full mt-5 justify-between items-center break-words">
                        <button onClick={() => !isHistoryMenuState && handleDeleteItemsInDB(item, itemList.name, currentIndex)} className="flex justify-center">
                            <DeleteIcon />
                        </button>
                        <p className="text-lg text-slate-50 w-[50%] pl-2">{ itemList.name }</p>
                        <div 
                            className="w-[40%] h-8 bg-transparent text-slate-50 rounded-2xl flex justify-center items-center gap-3"
                        >
                            <button 
                                className="h-full px-4 bg-[#121b31]  rounded-full self-start"
                                onClick={() => onChangeQuanity( itemList, -1, item.category )}
                            >
                                -
                            </button>
                            <p className="text-sm">{ itemList.quantity }</p>
                            <button 
                                className="h-full px-4 bg-[#121b31]  rounded-full self-start"
                                onClick={() => onChangeQuanity( itemList, +1, item.category ) }
                            >
                                +
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    )

}