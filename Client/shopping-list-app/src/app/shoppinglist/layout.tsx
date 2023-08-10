'use client'
import '../globals.css'

import { Navbar } from '@/components/UI'
import { Menu } from '@/components/Common'
import { ApolloProvider } from '@apollo/client'
import { initializeApollo } from '../graphql/client'

const client = initializeApollo();

export function ApolloClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
        <section className="bg-[#0F172A] flex min-h-screen flex-col items-center justify-center layout">
            <ApolloClientProvider>
              <Navbar />
              {children}
              <Menu />
            </ApolloClientProvider>
        </section>
  )
}