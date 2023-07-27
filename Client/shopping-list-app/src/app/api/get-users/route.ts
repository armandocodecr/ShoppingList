import { client } from '@/app/graphql/client';
import { getLists } from '@/app/graphql/queries';
import { NextResponse } from 'next/server';

export async function GET() {

    try {
      
      // Ejecuta la query utilizando el método 'query' de Apollo Client
      const result = client
      .query({
        query: getLists,
      })
      .then((result) => {
        // Maneja la respuesta de la query aquí
        console.log(result)
        return result;
      })

      return NextResponse.json((await result).data)

    } catch (error) {
      // Maneja los errores aquí
      console.error(error);
      return new Response('Internal Server Error', { status: 500 })
    }

      
}