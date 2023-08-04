import "@sweetalert2/theme-dark/dark.css";

import { useRouter } from 'next/navigation'

import { useList, useUI } from "@/app/hooks";
import { useAllListItemStore } from "@/app/store/listItem";

import { removedListInDB, updatedListInDB } from "@/app/database/dbList";

import { ButtonComponent } from "./ButtonComponent";
import { InputComponent } from "./InputComponent";
import Swal from "sweetalert2";

export function InputSaveList() {

  const { push } = useRouter()
  const { inputSaveListValue, onAddItemToShoppingList, updateSaveListValue } = useList();
  const { isHistoryMenu } = useUI();

  const { dataListItem } = useAllListItemStore(state => ({
    dataListItem  : state.dataListItem,
    updateListItem: state.updateListItem
  }))

  const onUpdatedListInDB = async() => {

    if(!dataListItem) return
    Swal.fire({
      title: 'Are you sure to complete this list?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Complete',
      denyButtonText: `Don't complete`,
    }).then(async(result) => {
      if (result.isConfirmed) {
        Swal.fire('Completed!', '', 'success')
        updatedListInDB( dataListItem?.listId, dataListItem?.completed )
      } else if (result.isDenied) {
        Swal.fire('List not completed', '', 'info')
      }
    })

  }

  const onRemovedListInDB = async() => {

    Swal.fire({
      title: 'Are you sure to remove this list?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Remove',
      denyButtonText: `Don't remove`,
    }).then(async(result) => {
      if (result.isConfirmed) {
        Swal.fire('removed!', '', 'success')
        removedListInDB( dataListItem!.listId )
        push('/shoppinglist/history')
      } else if (result.isDenied) {
        Swal.fire('List not removed', '', 'info')
      }
    })

  }

  return (
    <div className={`w-[80%] h-16 ${ !isHistoryMenu && 'border-2 border-[#3e4966]' } rounded-lg flex`}>
      {!isHistoryMenu ? (
        <>
          <InputComponent 
            className="w-[80%] bg-transparent text-slate-50 pl-5 outline-none"
            typeInput="text"
            placeholder="Enter a name"
            value={inputSaveListValue}
            onChangeFunction={(ev) => updateSaveListValue(ev.target.value)}
          />
          <ButtonComponent 
            typeButton="button" 
            className="w-[20%] bg-[#3e4966] rounded-md text-slate-50"
            text="Save"
            onClickFunction={onAddItemToShoppingList}
          />
        </>
      ) : (
        <div className={`w-full flex justify-center`}>
          {
            !dataListItem?.completed
            ?(
              <div className="w-full flex justify-center gap-6">
                <ButtonComponent 
                  typeButton="button" 
                  className="w-[40%] bg-transparent rounded-md text-slate-50 transition duration-500 hover:bg-[#121b31]"
                  text="Delete list"
                  onClickFunction={onRemovedListInDB}
                />
                <ButtonComponent 
                  typeButton="button" 
                  className="w-[50%] bg-[#3e4966] rounded-md text-slate-50" 
                  text="Complete list"
                  onClickFunction={onUpdatedListInDB}
                />
              </div>
            )
            :(
              <div className="w-[80%] flex justify-center items-center border border-green-500 rounded-xl">
                <p className="text-xl text-green-500 font-bold tracking-tighter">Completed list</p>
              </div>
            )
          }
        </div>
      )}
    </div>
  );
}
