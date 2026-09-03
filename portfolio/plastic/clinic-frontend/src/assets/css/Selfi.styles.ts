import styled from "styled-components";

//슬라이더
export const SlideSection= styled.section`
width: 100%;
padding: 3.75rem 1.25rem;//60px 20px;  
background-color: #ffe6f0;// #ffe5f1;
overflow: hidden;

@media (max-width: 768px) {
padding: 2.5rem 1rem; /* 모바일에서는 여백도 살짝 줄여주면 더 예쁩니다 */
}
`;
export const SlideInner= styled.div`
max-width: 1200px;
width: 100%;
margin: 0 auto; //중앙정렬
`;
export const SlideHeader= styled.div`
display: flex;
justify-content: space-between;
align-items: flex-end; //💗글자아래baseline딱맞추기
margin-bottom: 1.875rem;//30px; 
`;
export const SlideTitleGroup= styled.div`
display: flex;
flex-direction: column;
`;
export const SlideMainTitle = styled.h2`
font-size: 2rem; //32px;
font-weight: 900;
color: #111;
margin: 0;

@media (max-width: 768px) {
    font-size: 1.5rem; // 24px로 축소
  }
`;
export const SlideSubTitle= styled.p`
font-size: 1.125rem;//18px;
color: #888;
margin: 0.3rem 0 0 0;//5px 0 0 0 ;

@media (max-width: 768px) {
    font-size: 0.9375rem; // 약 15px로 축소
}
`;
export const SlideControls= styled.div`
display: flex;
align-items: center;
gap: 10px;
`;
export const SlideViewMoreBtn= styled.button`
background: transparent;
border: 1px solid #222;
border-radius: 20px;
padding: 8px 16px;
font-size: 14px;
font-weight: 600;
cursor: pointer;

transition: all 0.2s ;
&:hover{
    background-color: #181818;
    color: #eee;
}
`;
export const SlideArrowBtn= styled.button`
width: 36px;
height: 36px;
border-radius: 50%;
border: none;
background-color: #181818;
color: #eee;
font-size: 16px;
cursor: pointer;

display: flex;
justify-content: center;
align-items: center;

transition: all 0.2s ;
&:hover{
    background-color: #333;
}
`;
export const SelfieSlideWrapper= styled.div`
display: flex;
gap:20px;
overflow-x: auto;
scroll-behavior: smooth; //💗무조건
padding-bottom: 20px;

&::-webkit-scrollbar{
    display: none;
}
-ms-overflow-style: none;
scrollbar-width: none;

`;

export const SelfieCardOverlay= styled.div`
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0; //inset:0
background: linear-gradient(to bottom,
    rgba(0,0,0,0.3) 0%,
    rgba(0,0,0,0) 30%,
    rgba(0,0,0,0) 60%,
    rgba(0,0,0,0.6) 100%
    );
display: flex;
flex-direction: column;
justify-content: space-between;
padding: 20px;
`;
export const SelfieLikeBadge= styled.div`
color: #fff;
font-size: 0.875rem;//14px;
font-weight: 700;
display: flex;
align-items: center;
gap: 5px;
span{
    color: #ff1493;
    font-size: 18px;
}
`;
export const SelfieViewCount= styled.div`
color: #fff;
font-size:0.95rem;//15px; 
font-weight: 700;
`;

export const Selfied = styled.span`
display: block;
font-size: 0.75rem; //12px;
font-weight: 400;
color: #ccc;
margin-top: 4px;
`;
export const AccentText = styled.span`
color: #e0b1ca;
font-weight: bold;
`;

export const SelfieCard= styled.div`
box-sizing: border-box;
min-width: 20rem;//240px;
flex: 0 0 20rem;//0 0 240px; //무조건고정💗 (width:240보다 안전방법) 
height: 28rem;//340px;
border-radius: 1.5rem;//20px;
position: relative;
overflow: hidden; //💗
flex-shrink: 0;  //💗
cursor: pointer;

img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block; //💙미세공백
}

@media (max-width: 768px) {
min-width: 160px; //💙2차설정 shrink안전장치
flex: 0 0 160px; //💗1차설정 flex-basis=160px
height: 230px; //(비율 1:1.4)
border-radius: 16px;

/* 👇 카드 안의 글자들을 직접 작게 만들어버리기 */
    ${SelfieLikeBadge} {
      font-size: 11px; // 14px였던 걸 11px로
    }
    
    ${SelfieViewCount} {
      font-size: 12px; // 15px였던 걸 12px로
    }

    ${Selfied} {
      font-size: 10px; // 12px였던 걸 10px로
    }

};
`;
