import axios from 'axios';
/*import { api } from '@/utils/axios';

 axios.get 대신 api.get을 사용!
   -> 요청 보낼 때 자동으로 localStorage 토큰이 헤더에 쏙 들어감
   -> 1시간 지나서 401 에러 나면 알아서 로그아웃 처리됨
*/

export const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials:true,
})

// 🌟 요청(Request) 인터셉터: API를 보내기 전에 가로채서 토큰 장착!
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if(token){
            config.headers['Authorization']= `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

//// 🌟 응답(Response) 인터셉터 설정
api.interceptors.response.use(
    response=> {
        //성공적인 응답이면 그대로 통과
        return response;
    },
    error =>{
        // 백엔드에서 401(Unauthorized) 코드를 보냈다면 (토큰 만료/인증 실패)
        if(error.response && error.response.status===401){
            alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');

            //로컬스토리지 찌꺼지(만료된토큰과 유저정보)청소
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            delete axios.defaults.headers.common['Authorization'];

            // 로그인 페이지로 강제 이동
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
)