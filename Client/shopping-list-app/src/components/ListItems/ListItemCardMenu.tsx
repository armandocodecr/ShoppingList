import { CancelIcon, CheckSmallIcon } from "@/app/assets/icons";
import { Checkbox } from "../UI";
import { IListItemItems } from "@/app/interface/ListItemInterfaces";
import { useListItem } from "@/app/hooks/useListItem";

interface dataItemList {
    listItemId      : string
    item            : IListItemItems;
    quantity        : number;
    completed       : boolean;
    isChange        : boolean;
}

interface Props {
    itemList: dataItemList
}

export function ListItemCardMenu({ itemList }: Props) {
    
    const { 
        handleQuantityChange, handleConfirmChanges, handleCancelChanges, setCompleted,
        completed, quantity, hasChanges, dataListItem  
    } = useListItem(itemList)
  
    return (
      <div className="flex h-auto w-full mt-5 justify-between items-center break-words">
        <Checkbox
          isChecked={completed!}
          onClickFunction={() => setCompleted(!completed)}
        />
        <p className="text-lg text-slate-50 w-[50%] pl-2">
          {itemList.item.name}
        </p>
        <div className="w-[40%] h-8 bg-transparent text-slate-50 rounded-2xl flex justify-center items-center gap-3">
          <button
            className="h-full px-4 bg-[#121b31] rounded-full self-start"
            onClick={() => handleQuantityChange(-1)}
          >
            -
          </button>
          <p className="text-sm">{quantity}</p>
          <button
            className="h-full px-4 bg-[#121b31] rounded-full self-start"
            onClick={() => handleQuantityChange(1)}
          >
            +
          </button>
          <aside className="min-w-[100px]">
            {hasChanges && !dataListItem?.completed && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCancelChanges}
                >
                  <CancelIcon />
                </button>
                <button
                  onClick={() => handleConfirmChanges(itemList.item.category.name, itemList.item.id)}
                >
                  <CheckSmallIcon />
                </button>
              </div>
            )}
          </aside>
        </div>
      </div>
    );
  }