'use client'
import { useList } from "@/app/hooks";
import { Checkbox } from "../UI";
import { ListItemUserData } from "@/app/interface/ListItemInterfaces";

interface Props{
    item: ListItemUserData
}

export function ContentListsItemsMenu({ item }: Props) {

    const { onChangeQuanity } = useList()
    
    return (
        <div className="self-start w-full">
            <h3 className="text-base text-slate-400">{ item.category }</h3>
            {
                item.items.map((itemList) => (
                    <div key={String(itemList.item.name)} className="flex h-auto w-full mt-5 justify-between items-center break-words">
                        <Checkbox isChecked={ itemList.completed! } id={ itemList.item.id } category={ item.category } />
                        <p className="text-lg text-slate-50 w-[50%] pl-2">{ itemList.item.name }</p>
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