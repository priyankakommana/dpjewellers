
// import { NextRequest, NextResponse } from 'next/server'

// export function proxy(request: NextRequest) {
//   // Only proxy API calls, not pages
//   if (request.nextUrl.pathname.startsWith('/api/backend')) {
//     const backendUrl = request.nextUrl.pathname.replace('/api/backend', '')
//     const url = new URL(`http://localhost:8080/api${backendUrl}${request.nextUrl.search}`)
//     return NextResponse.rewrite(url)
//   }
//   return NextResponse.next()
// }

// export const config = {
//   matcher: ['/api/backend/:path*'], // IMPORTANT - /gold, /home ni touch cheyadu
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export function middleware(req: NextRequest){
  // Frontend guard - we handle in component, keep middleware light
  return NextResponse.next();
}