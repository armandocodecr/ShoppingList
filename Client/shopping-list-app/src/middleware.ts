import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

  const token = request.cookies.getAll("token")[0] || ""

  if( !token || !token.value ) return NextResponse.redirect(new URL('/login', request.url))

}

export const config = {
  matcher: '/shoppinglist/:path*',
}