'use client'
import { DeleteIcon } from "@/app/assets/icons"
import { useItems } from "@/app/hooks"
import { IPropertyItems } from "@/app/interface/DataInterface"

interface Props {
    Items           : IPropertyItems[],
    addItemsToList  : (category: string, itemName: string, idItem: string) => void,
}

export function CardItem({ Items, addItemsToList }: Props) {

    const { handleDeleteItemsInDB } = useItems()

    return(
        <div className="w-full h-auto flex flex-col gap-10">
            {
               Items && (
                Items.map( (item: IPropertyItems, i) => (
                    <div key={item.category} className="w-full h-auto flex flex-col">
                        <h2 className="text-white text-xl tracking-wide">{ item.category }</h2>
                        <div className="w-full flex gap-4">
                            {
                                item.items.map( (dataItem, index) => (
                                    <div 
                                        key={`${item.category}-${index}`} 
                                        className="bg-[#1b243b] grid grid-cols-[40px_minmax(125px,_1fr)_25px] min-w-[20%] h-auto items-center p-4 mt-5 rounded-lg shadow-xl"
                                    >
                                        <button
                                            onClick={() => handleDeleteItemsInDB( item, dataItem.name, i, dataItem.id )}
                                        >
                                            <DeleteIcon />
                                        </button>
                                        <h3 className="text-white tracking-wide">{ dataItem.name }</h3>
                                        <button 
                                            className="bg-transparent text-xl text-slate-50 self-end"
                                            onClick={() => addItemsToList(item.category, String(dataItem.name), dataItem.id)}
                                        >
                                            +
                                        </button>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )) 
               )
            }
        </div>
    )

}