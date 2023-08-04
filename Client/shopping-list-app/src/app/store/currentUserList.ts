import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { ListItemUserData } from '../interface/ListItemInterfaces'

interface ICurrrentList{
    items                     : ListItemUserData[] | [],
    setUpdateItems: (newState : ListItemUserData[]) => void,
}

export const useCurrentUserList = create<ICurrrentList>()(
persist(
    set => ({
        items: [] ,
        setUpdateItems: ( newState : ListItemUserData[] ) => set( state => ({
            items: newState
        })),
    }),
    {
        name: "currentList",
    }
))