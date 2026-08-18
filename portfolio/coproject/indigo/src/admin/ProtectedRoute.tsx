import { useState } from "react"
import { Navigate } from 'react-router-dom'
import { Temporal } from "@js-temporal/polyfill";

// type props={
//     children: React.ReactNode;
// }
// {children}:props 와 같음 

export const ProtectedRoute = ({children}:{children:React.ReactNode})=>{

    //1.브라우저 금고(localStorage)에서 로그인정보(userName)를 꺼냄
    const userName = localStorage.getItem('userName');
    //1.금고에서 만료 시간 꺼내기
    const expiryStr = localStorage.getItem('loginExpiry');
    
    //아예 로그인한적이 없거나 만료시간이 없는경우
    if(!userName || !expiryStr){
        alert("관리자 로그인이 필요한 페이지입니다");
        return <Navigate to='/login'replace/>;
    } //🌟replace는 뒤로 가기 했을 때 이상한 페이지로 꼬이는 걸 방지
    
    try{
        //🌟 세션 시간 체크(Temporal사용)
        //2. 문자열로 저장된 만료 시간을 다시 Temporal.Instant 객체로 변환
        const expiryTime = Temporal.Instant.from(expiryStr);

        //3. 지금 현재시간 가져오기 
        const now = Temporal.Now.instant();

        // 4. 시간 비교하기 (now가 expiryTime보다 나중(=크다면) 만료된 것!)
        // A가 시간상 앞이면 -1, 같으면 0, 시간상 더 뒤면(나중) 1을 반환해
        if(Temporal.Instant.compare(now, expiryTime) >= 0){
            alert('세션이 만료되었습니다 안전을 위해 다시 로그인 해주세요 ')
            localStorage.removeItem('userName');
            localStorage.removeItem('loginExpiry');

            return <Navigate to='/login' replace/>
        }
    }catch(err){
        localStorage.removeItem('userName');
        localStorage.removeItem('loginExpiry');
        return <Navigate to='/login' replace/>
    }

    //유효기간이 안 지났다면 무사히 통과 
    //입장권이 있으면 원래 가려던 페이지(childern)으로 들여보내줌
    return(
        <>
        {children}
        </>
    )
}

//설정 초기화 // 개인정보 보호및 보안 인터넷사용기록삭제

//토큰이 있는가(존재여부)? 아직유효한가(만료되진않았나)?

//💡 <Navigate/>: 
// 렌더링(화면 그리기) 과정에서 슥 바꿔치기하며
//  이동할 때 (주로 권한 체크용)
//컴포넌트가 화면에 그려지는(return되는) 순간 즉시 이동
//조건에 맞지 않으면 바로 다른 페이지로 튕겨내고 싶을 때

//💡useNavigate(): 어떤 이벤트(클릭 등)가 발생했을 때
//  함수를 실행해서 이동할 때 (주로 버튼 클릭용)