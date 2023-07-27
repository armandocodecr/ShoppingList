'use client'
import { ApolloProvider } from '@apollo/client'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { client } from './graphql/client'
import { Toaster } from '@/components/Toaster'

export function ApolloClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}

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
    <html lang="es">
      <Toaster />
      <body className={`${inter.className}`}
      >
        <ApolloClientProvider>
          {children}
        </ApolloClientProvider>
      </body>
    </html>
  )
}