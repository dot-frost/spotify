import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req){
    const token = await getToken({req, secret:process.env.JWT_SECRET});

    const { url } = req;

    // Allow the request if the following is true...
    // 1) Its a request for next-auth session & provider fetching
    // 2) the token is exists
    if (url.includes('/api/auth') || token){
        return NextResponse.next()
    }

    // Redirect them to login if they dont have token AND are requesting a protected route
    if (!token && url !== '/login'){
        return NextResponse.redirect('/login')
    }
}