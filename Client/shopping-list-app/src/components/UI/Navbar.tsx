"use client"
import { useRouter } from 'next/navigation';
import Tippy from '@tippyjs/react';
import Cookies from 'js-cookie';

import 'tippy.js/dist/tippy.css';

import { Back, BurgerMenu, LogoSVG, Statistics, LogoutSVG } from "@/app/assets/icons";
import { ButtonCart } from "./ButtonCart";
import { useAllItems } from '@/app/store';
import { useList } from '@/app/hooks';

export function Navbar() {

    const { push } = useRouter()
    const { updateItems } = useAllItems(state => ({
        updateItems: state.updateItems
    }))
    const { updateState } = useList()


    const Logout = async() =>{
        localStorage.removeItem('currentUIMenu')
        localStorage.removeItem('currentList')
        Cookies.remove('token')
        updateState([])
        updateItems([])
        push('/login')
    }

    return(
        <nav className="sidebar flex-col h-full bg-[#1b243b] flex justify-between items-center py-7">
            <LogoSVG />
            <div className="flex flex-col gap-11">
                <Tippy content="Items" placement="right">
                    <button onClick={() => push('/shoppinglist')}>
                        <BurgerMenu />
                    </button>
                </Tippy>
                <Tippy content="History" placement="right">
                    <button onClick={() => push('/shoppinglist/history')}>
                        <Back />
                    </button>
                </Tippy>
                <Tippy content="Statistics" placement="right">
                    <button onClick={() => push('/shoppinglist/statistics')}>
                        <Statistics />
                    </button>
                </Tippy>
                <Tippy content="Logout" placement="right">
                    <button onClick={Logout}>
                        <LogoutSVG />
                    </button>
                </Tippy>
            </div>
            <ButtonCart />
        </nav>
    )

}