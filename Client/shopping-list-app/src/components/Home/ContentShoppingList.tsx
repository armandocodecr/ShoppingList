'use client'
import { DeleteIcon } from "@/app/assets/icons";
import { useList } from "@/app/hooks";
import { IPropertyItems } from "@/app/interface/DataInterface";

interface Props{
    item: IPropertyItems,
    currentIndex: number
}

export function ContentShoppingList({ item, currentIndex }: Props) {

    const { onChangeQuanity, handleDeleteItemsInDB } = useList()
   
    return (
        <div className="self-start w-full">
            <h3 className="text-base text-slate-400">{ item.category }</h3>
            {
                item.items.map((itemName, i) => (
                    <div key={String(itemName.name)} className="flex h-auto w-full mt-5 justify-between items-center break-words">
                        <button onClick={() => handleDeleteItemsInDB(item, itemName.name, currentIndex)}>
                            <DeleteIcon />
                        </button>
                        <p className="text-lg text-slate-50 w-[50%] pl-2">{ itemName.name }</p>
                        <div 
                            className="w-[40%] h-8 bg-transparent text-slate-50 rounded-2xl flex justify-center items-center gap-3"
                        >
                            <button 
                                className="h-full px-4 bg-[#121b31]  rounded-full self-start"
                                onClick={() => onChangeQuanity( itemName, -1, item.category )}
                            >
                                -
                            </button>
                            <p className="text-sm">{ itemName.quantity }</p>
                            <button 
                                className="h-full px-4 bg-[#121b31]  rounded-full self-start"
                                onClick={() => onChangeQuanity( itemName, +1, item.category ) }
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