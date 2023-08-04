'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'

import { useList, useUI } from '@/app/hooks';

import { useListItem } from '@/app/hooks/useListItem';

import { CardListItem } from '@/components/ListItems/CardListItem';

import { ArrowLeftIcon, DateIcon } from '@/app/assets/icons';

export default function ListsBySlug({ params }: any) {

    const { push } = useRouter()
    const { getListItemByID, updateListItem, dataListItem, data } = useListItem()
    const { updateState } = useList()
    const { updateHistoryMenuState } = useUI()

    useEffect(() => {
        getListItemByID( params.slug )

        return () => {
          updateState([])
          updateHistoryMenuState(false)
        }
    }, [])
    
    return (
      <section className="relative flex flex-col min-h-screen pl-32 pt-8 gap-10">
        <div className="w-full h-auto flex self-start">
              <button className='flex items-center gap-3' onClick={() => {
                updateListItem(null)
                push('/shoppinglist/history')
              }}>
                <ArrowLeftIcon />
                <p className='text-[#F9A109] tracking-tighter font-bold'>Back</p>
              </button>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className='text-slate-50 tracking-tighter font-bold text-2xl'>{ dataListItem?.listName }</h1>
          <div className="flex items-center gap-2">
            <DateIcon />
            <h2 className='text-[#C1C1C4]'>{ dataListItem?.createdAt }</h2>
          </div>
        </div>
        <CardListItem dataList={data} />    

      </section>
    )
  }