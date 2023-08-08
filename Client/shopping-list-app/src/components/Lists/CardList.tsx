import { useRouter } from 'next/navigation'

import { useUI } from "@/app/hooks";

import { IListSorted } from "@/app/interface/ListInterfaces";

import { DateIcon, ArrowRigthIcon } from "@/app/assets/icons";

interface Props {
    dataLists: IListSorted[] | []
}

export function CardList( { dataLists }: Props ) {

    const { push } = useRouter()
    const { updateHistoryMenuState, updateMenuState } = useUI()

    return (
        dataLists.map(list => (
            <div key={list.createdMonthAt}>
              <h2 className="text-1xl text-white tracking-wide mt-3 pb-6 capitalize">{ list.createdMonthAt }</h2>
              <div className="flex flex-col gap-7">
                  {
                    list.infoItemsList.map(infoItem => (
                        <section key={infoItem.id} className="w-full flex justify-between h-auto px-4 py-4 bg-[#1b243b] rounded-lg items-center shadow-xl">
                           <h3 className="font-bold tracking-tighter text-slate-50">{ infoItem.name }</h3> 
                           <article className="flex items-center gap-3">
                               <DateIcon />
                               <h3 className="font-bold tracking-tighter text-[#C1C1C4] mr-8">{ infoItem.creadtedAt }</h3>
                               <div 
                                   className={`w-36 h-auto p-1 mr-8 flex justify-center rounded-xl border 
                                   ${infoItem.completed ? 'border-green-500' : 'border-red-500'}`}
                               >
                                   <p 
                                       className={`tracking-tighter ${infoItem.completed ? 'text-green-500' : 'text-red-500'}`}
                                   >
                                       { infoItem.completed ? 'Completed': 'Not completed' }
                                   </p>
                               </div>
                               <button onClick={() => {
                                   push(`/shoppinglist/history/${ infoItem.id }`)
                                   updateMenuState(false)
                                   updateHistoryMenuState(true)
                               }}>
                                   <ArrowRigthIcon />
                               </button>
                           </article>
                        </section>
                    ))
                  }
              </div>
            </div>
         ))
    )

}