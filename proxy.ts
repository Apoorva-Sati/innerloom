import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET!)

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('x-pathname', pathname)

  if (
    pathname === '/admin/login' ||
    pathname === '/api/admin/login'
  ) {
    return NextResponse.next({ request: { headers: requestHeaders } })
  }

  if (pathname.startsWith('/admin') || pathname.startsWith('/studio')) {
    const token = req.cookies.get('admin_token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }

    try {
      await jwtVerify(token, secret)
      return NextResponse.next({ request: { headers: requestHeaders } })
    } catch {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
  }

  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ['/admin', '/admin/:path*', '/studio', '/studio/:path*'],
}
