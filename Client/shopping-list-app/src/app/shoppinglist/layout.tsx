'use client'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '../globals.css'

import { Navbar } from '@/components/UI'
import { Menu } from '@/components/Common'

export const metadata: Metadata = {
  title: 'ShoppingList',
  description: 'ShoppingList te ayudará a organizar tus listas de compras',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
        <section className="bg-[#0F172A] flex min-h-screen flex-col items-center justify-center layout">
            <Navbar />
            {children}
            <Menu />
        </section>
  )
}