'use client'
import { ButtonComponent } from "@/components/UI";
import { LogoSVG, ShoppingUndrawIcon } from "./assets/icons";
import { useRouter } from "next/navigation";

export default async function Home() {

  const { push } = useRouter()
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-image">

      <figure className="flex items-center gap-3 absolute top-5">
        <LogoSVG />
        <h2 className="text-xl font-bold text-slate-50 tracking-tighter">ShoppingList App</h2>
      </figure>

      <figure className="w-full flex items-center justify-center break-words gap-20">
        <div className="w-auto">
        <h1 className="w-full text-6xl font-bold text-slate-50 tracking-tighter">Your perfect shop list: <br/> Buy, check and enjoy</h1>
          <ButtonComponent 
            typeButton="button" 
            text="Let's start" 
            onClickFunction={() => push('/login') }
            className="bg-[#EE7B25] scale-100 px-10 py-4 font-bold text-slate-50 tracking-tighter 
            text-4xl mt-9 rounded-xl  transition-all duration-300 hover:scale-[1.1] landing-button" 
          />
        </div>
        <picture>
          <ShoppingUndrawIcon width="350" height="300"  />
        </picture>
      </figure>

    </main>
  )
}
