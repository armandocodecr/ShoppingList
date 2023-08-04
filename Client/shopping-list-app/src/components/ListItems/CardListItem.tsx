import { ListItemUserData } from "@/app/interface/ListItemInterfaces"

interface Props {
    dataList: ListItemUserData[] | []
}

export function CardListItem({ dataList }: Props) {

    return(

        dataList?.map(item => (
          <div key={item.category} className="w-full h-auto flex flex-col">
            <h3 className='text-[#C1C1C4]'>{ item.category }</h3>
            <div className="container">
              {
                  item.items.map( (dataItem, index) => (
                      <div 
                          key={`${item.category}-${index}`} 
                          className="bg-[#1b243b] flex w-full h-auto items-center p-4 mt-5 rounded-lg shadow-xl justify-between break-words gap-5"
                      >
                          <h3 className="text-white tracking-tighter w-[80%]">{ dataItem.item.name }</h3>
                          <p className='text-[#F9A109] tracking-tighter'>{`x ${dataItem.quantity}`}</p>
                      </div>
                  ))
              }
                    </div>
          </div>
        ))

    )

}