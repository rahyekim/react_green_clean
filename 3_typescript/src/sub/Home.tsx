import { useState, useEffect } from "react";

export default function Home (){

    const[isRunning, setIsRunning]=useState(false);//타이머멈춤으로시작
    const[timeLeft, setTimeLeft]= useState(0)// 0

    useEffect(()=>{
        if(!isRunning) return ;
        //timeLeft가 0 타이머를 종료하는 로직 useEffect최상단으로 올리면 더안전
        //타이머(setInterval)를 만들기 '직전'에 만나면 엉?이미0이네
        // setInterval함수자체를 실행X ..타이머만들필요없네 종료하게됨
        //0.001초차이로 생길수 있는 유령 타이머 생성 원천 차단
        if(timeLeft<=0){  
            setIsRunning(false);
            setTimeLeft(0);
            return;
        }

        const timer = setInterval(()=>{
            setTimeLeft(prev=>prev-1)
        },1000)
        return ()=>clearInterval(timer);
        
    },[isRunning, timeLeft]) 
    //💡 timeLeft도 감시: 렌더링 isRunning true면 그동안 한번도 안쳐다봄
    //timeLeft<0 되면 타이머종료로직을 위로 옮겨서 감시해야함

    const handleSetTimer = (minutes:number)=>{
        setTimeLeft(minutes*60); 
        setIsRunning(true); //시간 누르면 바로 타이머시작!

    }
    //5분추가
    const handleAddFiveMinutes = ()=>{
        setTimeLeft(prev=> prev+300);
        if(!isRunning&& timeLeft==0) setIsRunning(true); 
    }

    const handleCancle = ()=>{
        setIsRunning(false);
        setTimeLeft(0);
    }

    //시간 포맷팅
    const formatTime =(seconds:number)=>{
        const hours= Math.floor(seconds / 3600);
        const minutes = Math.floor(seconds / 60);
        const second = seconds % 60;

        const h= String(hours).padStart(2,'0')
        const m= String(minutes).padStart(2,'0')
        const s= String(second).padStart(2,'0')
        return `${h} : ${m} : ${s}`

    }
    return(
        <>
        <h2>수면타이머</h2>
        <h3>{timeLeft > 0 
        ? `남은시간 💡 ${formatTime(timeLeft)}`
        : "타이머를 설정해주세요"}</h3>
        <div style={{marginBottom:"10px"}}>
            <button onClick={()=>handleSetTimer(15)}>15분</button>
            <button onClick={()=>handleSetTimer(30)}>30분</button>
            <button onClick={()=>handleSetTimer(60)}>1시간</button>
        </div>

        <div>
            <button onClick={handleAddFiveMinutes}>+5분추가</button>
            <button onClick={handleCancle}>취소</button>
        </div>
        
        </>
    )

}