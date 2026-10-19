'use client'
import React, {useRef, useEffect, useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Temporal } from '@js-temporal/polyfill';

import chatReducer from '@/store/chatSlice';
import { RootState, AppDispatch } from '@/store/store'
import {setInputText, setIsLoading, setShowMap, addMessage} from '@/store/chatSlice';
import ReactMarkdown from 'react-markdown'

export default function Chat(){

    const dispatch = useDispatch<AppDispatch>();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const {messages, inputText,isLoading, showMap} = useSelector((state:RootState)=>state.chat);

    useEffect(()=>{
        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth'
        })
    }, [messages])

    //useCallback 훅적용 - 불필요한 함수 재생성 방지
    //(inputText를 의존성 배열에 추가하여 최신값 보장)
    const handleSend= useCallback(async()=>{

        if(!inputText.trim()) return;

        const userQuery = inputText;
        const uniqueId = Temporal.Now.instant().epochMilliseconds;
        const lowerQuery= userQuery.toLowerCase();

        const newUserMessages = {
            id: uniqueId,  //Date.now()
            text:userQuery,
            sender: "user" as const,
        }

        dispatch(addMessage(newUserMessages));
        dispatch(setInputText(''));
        dispatch(setIsLoading(true));

        const isLocationQuery = 
        lowerQuery.includes("맛집")||
        lowerQuery.includes("까페")||
        lowerQuery.includes("추천")||
        lowerQuery.includes("추천")||
        lowerQuery.includes("극장");

        if(isLocationQuery){
            dispatch(setShowMap(true))
        }
 
    
    try{
        const response = await fetch('http://localhost:8000/api/chat',{
            method: "POST",
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: [...messages, newUserMessages]
            })
        });

        if(!response.ok){
            throw new Error('서버 에러 발생')
        }
        const data = await response.json();

        //AI 응답 메시지 추가
        dispatch(
            addMessage({ 
                id: Temporal.Now.instant().epochMilliseconds, 
                text: data.reply, 
                sender: "ai"  as const
            }));

    }catch(err){
        console.error('채팅 전송 실패', err)
    }finally{
        dispatch(setIsLoading(false));
    }
},[inputText, dispatch, messages]);


    //엔터키입력전송
    const handleKeyPress = useCallback((e:React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.key === 'Enter' && !isLoading){
            handleSend();
        }
    },[handleSend, isLoading])
    return(
        <div className="flex justify-center items-center min-h-screen bg-rose-50/50 p-2 sm:p-4">
           <div className={`
                w-full sm:h-[90vh] bg-white shadow-xl shadow-rose-100/50 sm:rounded-3xl flex 
                flex-col overflow-hidden border border-rose-50 transition-all 
                duration-300 ${showMap ? "max-w-[1200px]" : "max-w-[840px]"}`}>
                
                {/* 상단 헤더: 부드러운 로즈 그라데이션 적용 */}
                <header className='flex justify-between items-center px-6 py-4 bg-gradient-to-r from-rose-300 to-pink-500 text-white shadow-sm shrink-0'>
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-xl shadow-inner">
                            💖
                        </div>
                        <div>
                            <h1 className='text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2'>
                                노원구 맛집 & 학원 어시스턴트
                            </h1>
                            <p className='text-xs text-rose-100 font-medium'>무엇이든 물어보세요!</p>
                        </div>
                    </div>
                    
                    <div className="text-xs bg-white/20 backdrop-blur-sm px-3.5 py-1.5 rounded-full font-semibold shadow-inner text-white border border-white/20">
                        {showMap ? '🗺️ 지도 ON' : '💬 채팅 모드'}
                    </div>
                </header>

                <div className="flex-1 flex flex-col sm:flex-row overflow-hidden bg-rose-50/20">
                    
                    {/* 1) 채팅 영역 */}
                    <div className={`flex-1 flex flex-col h-full overflow-hidden ${showMap ? "sm:w-1/2 border-r border-rose-100" : "w-full"}`}>
                        
                        {/* 대화 내용 스크롤 박스 */}
                        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex items-end space-x-2 ${
                                        msg.sender === "user" ? "justify-end" : "justify-start"
                                    }`}
                                >
                                    {/* AI 프로필 아바타 */}
                                    {msg.sender === "ai" && (
                                        <div className="w-9 h-9 rounded-2xl bg-rose-100 flex items-center justify-center shrink-0 shadow-sm border border-rose-200">
                                            <span className="text-rose-600 text-xs font-bold">bot</span>
                                        </div>
                                    )}

                                    {/* 메시지 말풍선 */}
                                    <div
                                        className={`max-w-[80%] sm:max-w-[75%] px-4 py-3 rounded-2xl text-sm sm:text-base leading-relaxed shadow-sm ${
                                            msg.sender === "user"
                                                ? "bg-rose-500 text-white rounded-br-sm"
                                                : "bg-white text-slate-700 border border-rose-100 rounded-bl-sm shadow-rose-50/50"
                                        }`}
                                    >
                                        <div className="prose prose-sm max-w-none">
                                            <ReactMarkdown>{msg.text}</ReactMarkdown>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* 로딩 애니메이션 */}
                            {isLoading && (
                                <div className="flex items-end space-x-2 justify-start">
                                    <div className="w-9 h-9 rounded-2xl bg-rose-100 flex items-center justify-center shrink-0 shadow-sm border border-rose-200">
                                        <span className="text-rose-600 text-xs font-bold">bot</span>
                                    </div>
                                    <div className="bg-white border border-rose-100 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                        <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                        <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce"></div>
                                        <span className="text-xs text-rose-400 ml-1 font-semibold">고민 중...</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* 하단 메시지 입력 폼 */}
                        <div className="p-4 bg-white border-t border-rose-100 flex items-center space-x-3 shrink-0">
                            <input
                                type="text"
                                className="flex-1 bg-rose-50/40 border border-rose-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 focus:bg-white transition text-slate-700 placeholder-rose-300"
                                placeholder="맛집이나 학원을 물어보세요! (예: 노원구 맛집)"
                                value={inputText}
                                onChange={(e) => dispatch(setInputText(e.target.value))}
                                onKeyPress={handleKeyPress}
                            />
                            <button
                                onClick={handleSend}
                                disabled={isLoading}
                                className="inline-flex bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 disabled:opacity-50 text-white px-6 py-3.5 rounded-full text-sm font-bold transition-all duration-300 shadow-md shadow-rose-200 shrink-0 cursor-pointer items-center justify-center"
                            >
                                전송 ✨
                            </button>
                        </div>
                    </div>

                    {/* 2) 지도 연동 영역 */}
                    {showMap && (
                        <div className="w-full sm:w-1/2 h-64 sm:h-full bg-rose-50/40 relative flex flex-col items-center justify-center p-6 text-center border-t sm:border-t-0 sm:border-l border-rose-100 animate-fadeIn">
                            <div className="absolute inset-0 bg-rose-50/50 flex flex-col items-center justify-center p-6">
                                <div className="text-5xl mb-3 animate-bounce">📍</div>
                                <h3 className="text-base font-bold text-slate-700">카카오맵 위치 연동 구역</h3>
                                <p className="text-xs text-slate-500 mt-1 max-w-sm leading-relaxed">
                                    추천된 맛집과 학원 위치가 지도 마커로 예쁘게 표시됩니다.
                                </p>
                                
                                <button
                                    onClick={() => dispatch(setShowMap(false))}
                                    className="mt-5 bg-white hover:bg-rose-50 text-rose-500 border border-rose-200 px-4 py-2 rounded-xl text-xs font-semibold transition shadow-sm cursor-pointer"
                                >
                                    ✕ 지도 닫기
                                </button>
                            </div>
                        </div>
                    )}
                </div>
           </div>
        </div>
    )

    
}