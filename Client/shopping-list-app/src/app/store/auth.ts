import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ICurrrentList{
    token: string,
    setToken: (newToken : string) => void,
}

export const useAuthStore = create<ICurrrentList>()(
persist(
    set => ({
        token: "" ,
        setToken: ( newToken : string ) => set( state => ({
            token: newToken
        })),
    }),
    {
        name: "token",
        //partialize: (state) => ({ data: state.data }),
    }
))