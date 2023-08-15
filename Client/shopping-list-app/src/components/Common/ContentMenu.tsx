import { useUI } from "@/app/hooks";

import { ShoppingUndrawIcon } from "@/app/assets/icons";

import { ListItemUserData } from "@/app/interface/ListItemInterfaces";

import { ContentShoppingList } from "../Items";
import { ContentListsItemsMenu } from "../ListItems/ContentListsItemsMenu";

export 

interface Props{
    itemsList: ListItemUserData[] | [] | undefined
}

export function ContentMenu({ itemsList }: Props) {

    const { isHistoryMenuState } = useUI();

    return(
        
            itemsList && itemsList.length !== 0
            ? (
              <div className="w-full self-start flex flex-col gap-10">
                <h2 className="text-2xl text-slate-50 tracking-wide"> Shopping list</h2>
                {
                  itemsList && itemsList.map((item: ListItemUserData, i) => (
                    !isHistoryMenuState
                    ? (
                      <ContentShoppingList item={item} key={item.category} currentIndex={i} />
                    ):
                      <ContentListsItemsMenu ListItem={item} key={item.category} />
                  ))
                }
              </div>
            )
            :(
              <div className="flex flex-col h-full justify-center items-center">
                <h2 className="text-2xl text-slate-50 tracking-wide"> Shopping list</h2>
                <ShoppingUndrawIcon width="245" height="203" className="absolute bottom-28 sm:w-[150px] md:w-[200px] lg:w-[240px]" />
              </div>
            )
          
    )
    
}