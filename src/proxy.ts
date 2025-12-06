import type { NextRequest } from 'next/server';
import { deleteCookie, getCookie } from './services/auth/tokenHandlers';
import { getNewAccessToken } from './services/auth/auth.service';
import { NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';

export async function proxy(request: NextRequest) {

    const hasTokenRefreshedParam = request.nextUrl.searchParams.has('tokenRefreshed');

     // If coming back after token refresh, remove the param and continue
    if (hasTokenRefreshedParam) {
        const url = request.nextUrl.clone();
        url.searchParams.delete('tokenRefreshed');
        return NextResponse.redirect(url);
    }

    const tokenRefreshResult = await getNewAccessToken();

    // If token was refreshed, redirect to same page to fetch with new token
    if (tokenRefreshResult?.tokenRefreshed) {
        const url = request.nextUrl.clone();
        url.searchParams.set('tokenRefreshed', 'true');
        return NextResponse.redirect(url);
    }

//     const accessToken = await getCookie("accessToken") || null;

//     if (accessToken) {
//         const verifiedToken: JwtPayload | string = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET as string);

//         if (typeof verifiedToken === "string") {
//             await deleteCookie("accessToken");
//             await deleteCookie("refreshToken");
//             return NextResponse.redirect(new URL('/login', request.url));
//         }

//     }

//      if (!accessToken) {
//         const loginUrl = new URL("/login", request.url);
//         return NextResponse.redirect(loginUrl);
//     }

    return NextResponse.next();
}

// Protect all pages except API + static files
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)',
  ],
};