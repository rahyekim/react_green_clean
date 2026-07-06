import React, { useState, useEffect, useRef } from "react";
// import * as tf from '@tensorflow/tfjs';
// import Plotly from 'plotly.js-dist-min';
const tf = ( window as any).tf;
const Plotly= (window as any).Plotly;

//npm run dev -- --force 캐쉬 무시하고

const Tensorflow:React.FC   = () => {  //FC : 파일 컴포넌트  React.FC 
    //리액트 컴포넌트를 만듦 : 이 컴포넌트가 화면 하나를 담당!
    const  plotRef = useRef<HTMLDivElement>(null) 
    // 이 div를 기억해 Ref.current 주머니..
    const [isTraining, setIsTraining] = useState(true);  //true:학습중...
    //현재 AI가 학습중인지 저장

    useEffect(()=>{ //페이지 열리면 실행 

        //Tensorflow 작업하는 함수를 만듦 why async? 학습을 하는데 시간이 걸린다
        //그래서 기다릴 수 있는 함수 만들어.....
        const runTensorflow = async  () => {

            if (!tf || !Plotly) {
                console.error("Tensorflow 또는 Plotly 라이브러리가 로드되지 않았습니다.");
                return;
            }
            
            //1.학습 데이터 준비
            const xs = tf.tensor([0,1,2,3,4])
            const ys = xs.mul(1.2).add(5); //y=  (1.2)x곱하고 +5
            //ai에게 결과를 알려줌

            //2.선형회귀 모델 정의
            const model = tf.sequential()  //ai모델하나만듦
            model.add( //모델에 layer 층 추가 
                tf.layers.dense( //입력이 출력과 연관된 가장 기본적인 층 
                    {units:1 , inputShape:[1]} //출력이 1개 입력도 하나
                )
            );
            //3.모델 컴파일 (손실함수 및 최적화 설정)
            model.compile({loss: 'meanSquaredError', optimizer: 'sgd'})
            //오차계산 정답에 가까워지는 알고리즘

            //4. 모델학습(await를 사용하여 학습완료 대기)
            await model.fit(xs,ys, {epochs: 500}) // 500번 반복학습 시킴
            //학습이 끝날때 까지 기다려 await
            setIsTraining(false); //학습종료 

            //5 예측 및 데이터 준비.... 그래프용 배열만들기
            const xMax = 10; //10까지예측
            const xArr: number[] = [];
            const yArr: number[] = [];

            for( let x=0 ; x < xMax; x ++){
                const result = model.predict(tf.tensor([x])) as tf.Tensor ;
                //상수 result에 현재모델이 x를 보고 y를 예측이라 텐서로 바꿈
                //3이라면 tensor([3]) ??? 
                const yValue= await result.data(); //.data() : 텐서에서 실제 값 추출

                //배열저장
                xArr.push(x); //x를 저장..
                //예측값 저장
                yArr.push(yValue[0]); 
                
                //텐서는 메모리를 왕창 사용=> 사용끝냇으면 삭제
                
                result.dispose(); //메모리 해제
            }
                //6.결과 시각화
                if(plotRef.current) { //데이터를 그릴 div가 존재하는지 확인
                    const data:Plotly.Data[]=[ //plotly가 사용할 데이터 만듦

                        {x: xArr, y: yArr, mode :'markers', type:'scatter',
                        marker:{color:'blue', size:10}}
                    ];
                //그래프 디자인

                const layout :Partial<Plotly.Layout> = {
                    title: {text:"텐서플로우js 선형회귀 결과"},
                    xaxis:{range:[0,11], title:{text:'x축'}},
                    yaxis:{range:[0,20], title:{text:'y축'}},
                };
                Plotly.newPlot(plotRef.current, data, layout);
            }
            //  Plotly.newPlot(plotRef.current, data, layout);
                
                //메모리 정리를 위해 학습용 데이터 tensor 해제!
                xs.dispose();
                ys.dispose();
            
        };

          runTensorflow(); 
    }, []);


    

    
    return(
        <>
        <h2>출력</h2>
        {isTraining ? (
            <p>모델 학습중 잠시만 기다려주세요</p>
        ) : (
            <p> 학습와료 예측 결과가 그래프에 표시됩니다</p>
        )}
        <div ref={plotRef}/>
        <p>
        <h1>구글에서 만든 딥러닝 프레임워크</h1>
        - 주요특징 -
        (1) 브라우저 내 학습 및 추론 : 서버없이 사용자의 브라우저에서 머신러닝 모델 실행
        (2) GPU 가속 : 브라우저의 WebGL /WebGPU 를 사용하여 하드웨어 가속을 활용 
        복잡한 계산도 빠르게 처리
        (3) 파이선으로 학습된 Tensorflow 모델을 자바스크립트용으로 변환하여 사용 가능
        (4) 전이학습 transfer Learning 이미학습된 모델을 가져와 자바스크립트에서 
        적은 데이터로 재학습 할 수있다.
        
        예제코드에 학습개념
        Tensor : Tf.js 기본데이터의 단위 배열과 유사하지만 GPU 연산에 최적화됨
        Sequential Model: 레이어를 순차적으로 쌓는 가장 기본적인 모델형태
        Dense layer : 모든 입력과 출력이 연결된 전결합층 선형회귀 구현시 사용
        Loss(손실함수) : 모델이 얼마나 틀렸는지 계산
        Optimizer(최적화): 틀린 만큼 모델의 가중치를 수정하는 알고리즘 (예) 예 sgd확률적 경사 하강법
        
        -텐서플로우설치
        npm install @tensorflow/tfjs plotly.js-dist-min

        선형(linear) : 데이터의 관계가 1차 방정식 직선의 형태를 띌 것이라 가정
        회귀(Regression): 데이터들이 아뭉리 흩어져 있어도 결국은 어떤 특정한 평균적인 선(경향성)
        으로 되돌아가려는(회귀하려는) 성질을 으ㅣ미


        수식: y = Wx + b
        x (입력 변수): 우리가 알고 있는 데이터 (예: 집의 평수, 공부한 시간)
        y (출력 변수): 우리가 예측하고 싶은 값 (예: 집의 가격, 시험 점수)
        W (가중치, Weight): 직선의 기울기. x가 y에 얼마나 큰 영향을 미치는지 나타냅니다.
        b (편향, Bias): 직선의 높낮이(y절편). x가 0일 때의 기본값을 의미합니다.
        선형 회귀의 최종 목표는 수많은 x와 y데이터 쌍을 보고, 
        가장 오차가 적은 최적의 W와 b를 찾아내는 것입니다.
        </p>
        </>
        
    );
};

export default Tensorflow;