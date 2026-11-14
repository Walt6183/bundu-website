import { NextRequest, NextResponse } from 'next/server'

// Wartungsmodus: auf false setzen und pushen, um die Seite wieder freizugeben.
const maintenanceMode = true

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (
    pathname.startsWith('/studio') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/maintenance') ||
    pathname.startsWith('/_next')
  ) {
    return NextResponse.next()
  }
  if (maintenanceMode) {
    const url = request.nextUrl.clone()
    url.pathname = '/maintenance'
    return NextResponse.rewrite(url)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
