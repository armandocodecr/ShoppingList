
import { ListItems, Menu } from "@/components/Home";
import { Navbar } from "@/components/UI";

export default async function Home() {
  
  return (
    <main className="bg-[#0F172A] flex min-h-screen flex-col items-center justify-center layout">
      <Navbar />
      <ListItems />
      <Menu />
    </main>
  )
}
