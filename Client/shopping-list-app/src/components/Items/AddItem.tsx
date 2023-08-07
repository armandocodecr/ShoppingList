'use client'
import { BattleSVG } from "@/app/assets/icons";
import { ButtonComponent } from "../UI";
import { useUI } from "@/app/hooks";

export function AddItem() {

    const { showAddIteMenu, updateMenuState } = useUI()

    const onChangeShowMenuState = async() => {
        updateMenuState(!showAddIteMenu)
    }

    return(
        <div className="w-full bg-[#5f3655] h-36 rounded-xl flex p-4 gap-5">
            <BattleSVG width="75" height="auto" />
            <div className="w-auto h-full flex flex-col justify-center gap-4">
                <h2 className="text-slate-50 font-bold tracking-wide md:text-sm lg:text-lg">Didn’t find what you need?</h2>
                <ButtonComponent
                     className="w-full text-black bg-slate-50 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                     typeButton="button"
                     text="Add item"
                     onClickFunction={onChangeShowMenuState}
                />
            </div>
        </div>
    )

}