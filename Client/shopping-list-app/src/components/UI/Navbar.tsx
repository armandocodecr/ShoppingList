"use client"
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { Back, BurgerMenu, LogoSVG, Statistics } from "@/app/assets/icons";
import { ButtonCart } from "./ButtonCart";


export function Navbar() {

    return(
        <nav className="sidebar flex-col h-full bg-[#1b243b] flex justify-between items-center py-7">
            <LogoSVG />
            <div className="flex flex-col gap-11">
                <Tippy content="Items" placement="right">
                    <button>
                        <BurgerMenu />
                    </button>
                </Tippy>
                <Tippy content="History" placement="right">
                    <button>
                        <Back />
                    </button>
                </Tippy>
                <Tippy content="Statistics" placement="right">
                    <button>
                        <Statistics />
                    </button>
                </Tippy>
            </div>
            <ButtonCart />
        </nav>
    )

}