import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

//이 함수는 사용자가 페이지를 이동할 때마다 서버에서 먼저 실행
//위치 src안! 가장최상단!
export default function middleware(request:NextRequest){

    const {pathname}= request.nextUrl;
    const token= request.cookies.get('admin_token')?.value;

    // 로그인을 안 했는데 하위 관리자 페이지(/admin/...)에 들어가려고 할 때
    if(request.nextUrl.pathname.startsWith('/admin') && pathname !== '/admin' ){
        //브라우저 쿠키(Cookies)에 로그인토큰('admin_token')이 있는지 확인

        //토큰이 없다면(로그인 안된 상태)
        if(!token){
            return NextResponse.redirect(new URL('/admin', request.url));
        }
        
    }

    //로그인(토큰있음)했는데 로그인창('/admin')으로 들어가려할때
    if(pathname === '/admin' && token){
        return NextResponse.redirect(new URL('/admin/root', request.url));
    }

    //토큰이 있거나 관리자 페이지가 아니라면 그대로 통과
    return NextResponse.next();

}

//성능최적화: 🌟미들웨어가 /admin 경로에서만 작동🌟하도록 범위지정
export const config = {
    matcher: ['/admin/:path*']
}


//💘nextUrl:URL과 관련된 여러 가지 정보(도메인, 경로, 쿼리 스트링 등)를 한가득 담고 있는 객체(Object)

//💘new URL(새로운경로, 기준이되는전체주소) :두번쨰인자에서 domain만 쏙 빼옴

