'use client';
import React,{useState} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import * as S from '@/assets/css/changePw.style'
import usePopup from "@/hooks/usePopup";
import Popup from "@/components/ui/Popup";

export default function ResetPwPage(){

    const router = useRouter();
    const searchParams = useSearchParams();

    const {popupConfig, openPopup, closePopup}=usePopup();
    

    const userId = searchParams.get('userId');

    const [pwData, setPwData] =useState({
        newPW:'', confirmNewPW:''
    })

    const handleChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value}= e.target;
        setPwData(prev=> ({...prev, [name]:value}))
    }

    const handleResetPassword = async(e:React.FormEvent)=>{
        e.preventDefault();

        if (!userId) {
            openPopup('오류','잘못된 접근입니다. 이메일 링크를 다시 확인해 주세요.');
            return;

        }
        if (!pwData.newPW || !pwData.confirmNewPW){
            openPopup('입력 오류','비밀번호를 모두 입력해 주세요.');
            return;
        } 
        if (pwData.newPW !== pwData.confirmNewPW){
            openPopup('비밀번호 오류','비밀번호가 서로 일치하지 않습니다.');
            return;
        } 

        try{
            const res= await fetch('http://127.0.0.1:4000/api/reset-password', {
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    userId:userId,
                    newPW:pwData.newPW
                }),

            })
            const result = await res.json();
            if(res.ok){
                openPopup('성공','비밀번호가 성공적으로 변경되었습니다! 새 비밀번호로 로그인해 주세요.');
                router.push('/admin');
            }else{
                openPopup('변경 실패', result.message || '비밀번호 변경에 실패했습니다.');
            }
        }catch(err){
            console.error('재설정 에러:', err);
            openPopup('서버 오류','서버 오류가 발생했습니다.');
        }
    }

    return(
        <>
       <S.Wrapper>
            <S.Card>
                <S.Header>
                    <S.Title>새 비밀번호 설정</S.Title> 
                    <S.Desc>
                        앞으로 사용할 새로운 비밀번호를 입력해 주세요.
                    </S.Desc>               
                </S.Header>

                <S.Form onSubmit={handleResetPassword}>
                    <S.Input
                        type="password"
                        name="newPW"
                        placeholder='새 비밀번호'
                        value={pwData.newPW}
                        onChange={handleChange}
                    />
                    <S.Input
                        type="password"
                        name="confirmNewPW"
                        placeholder='새 비밀번호 확인'
                        value={pwData.confirmNewPW}
                        onChange={handleChange}
                    />

                    <S.Button type="submit">
                        비밀번호 변경 완료
                    </S.Button>
                </S.Form>   
            </S.Card>
        </S.Wrapper>

        <Popup
        isOpen={popupConfig.isOpen}
        onClose={closePopup}
        title={popupConfig.title}
        onConfirm={popupConfig.onConfirm}
        >{popupConfig.message}</Popup>
        </>
)
}