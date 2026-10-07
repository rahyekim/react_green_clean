import axios from 'axios';
import { error } from 'node:console';

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

            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
)