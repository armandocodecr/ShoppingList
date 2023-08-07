'use client'
import { ApolloProvider } from '@apollo/client'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

import { client } from './graphql/client'
import { Toaster } from '@/components/Toaster'

const inter = Inter({ subsets: ['latin'] })

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
    <html lang="es" className='overflow-hidden h-full'>
      <Toaster />
      <body className={`${inter.className}`}
      >
        {children}
      </body>
    </html>
  )
}