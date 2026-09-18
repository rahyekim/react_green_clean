import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export default function middleware(request:NextRequest){

    const {pathname} = request.nextUrl;
    const token = request.cookies.get('admin_token')?.value;

    if(request.nextUrl.pathname.startsWith('/admin') && pathname !== '/admin'){
        if(!token){
            return NextResponse.redirect(new URL('/admin', request.url));
        }
    }

    if(pathname === '/admin' && token){
        return NextResponse.redirect(new URL('/admin/root', request.url));
    }

    return NextResponse.next();
}


export const config ={
    matcher: ['/admin/:path*']
}