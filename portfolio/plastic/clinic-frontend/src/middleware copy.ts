import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

//이 함수는 사용자가 페이지를 이동할 때마다 서버에서 먼저 실행
//위치 src안! 가장최상단!
export default function middleware(request:NextRequest){

    const {pathname}= request.nextUrl;
    const token= request.cookies.get('admin_token')?.value;

    //1. 사용자가 접속하려는 주소가 '/admin' 으로 시작하는지 확인
    if(pathname === '/admin' || pathname === '/admin/login'){
    //토큰 있다면 (로그인 된 상태) 대시 보드로 튕김
        if(token){
            return NextResponse.redirect(new URL('/admin/root', request.url));     
        }
        return NextResponse.next();//통과(들어와)
    }

    //'/admin/' 뒤에 하위 주소가 붙은 진짜 관리자 페이지들만 깐깐하게 검사
    if(pathname.startsWith('/admin/')) {
        if(!token){
         return NextResponse.redirect(new URL('/admin', request.url));        
        }
    }
    //토큰이 있거나 관리자 페이지가 아니라면 그대로 통과
    return NextResponse.next();
}
//성능최적화: 🌟미들웨어가 /admin 경로에서만 작동🌟하도록 범위지정
export const config = {
    matcher: ['/admin/:path*']
}


//💘nextUrl: 객체 (Object)
// :URL과 관련된 여러 가지 정보(도메인, 경로, 쿼리 스트링 등)를 한가득 담고 있는 객체(Object)
//💙request.url :문자열 (String)

//🌟 new URL(새로운경로, 기준이되는전체주소) :
// 두번쨰인자에서 domain만 쏙 빼옴

