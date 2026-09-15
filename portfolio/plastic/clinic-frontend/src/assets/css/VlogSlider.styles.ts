'use client'

import styled from 'styled-components';

export const MAIN_COLOR = '#ffe6f0'; //배경용 연한핑크
export const POINT_COLOR = '#ff1493'; //포인터용
export const TEXT_COLOR = '#111';

export const VlogSection= styled.section`
padding: 3.75rem 1.25rem;
background-color: ${MAIN_COLOR};
width: 100%;
min-height: 100%;
`;
export const VlogInner = styled.div`
max-width: 1200px;
width: 100%;
margin: 0 auto;
`;
export const VlogHeader= styled.div`
border-bottom: 2px solid ${TEXT_COLOR};
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 2.15rem;
padding-bottom: 1rem;
`;
export const VlogTitleGroup= styled.div`
display: flex;
align-items:center;
`;
export const VlogMainTitle= styled.h2`
font-size: 2.2rem;
font-weight: 900;
color: ${TEXT_COLOR};
margin: 0;
`;
export const VlogControls= styled.div`
display: flex;
justify-content: center;
align-items: center;
gap: 10px;
`;
export const VlogViewMoreBtn= styled.button`
border: 1px solid ${TEXT_COLOR};
outline: none;
background: transparent;
border-radius: 15px;
padding: 0.42rem 1.14rem;
font-size: 0.93rem;
font-weight: 600;
color: ${TEXT_COLOR};
cursor: pointer;

transition: all 0.2s ease-in-out;
&:hover{
    background-color: ${TEXT_COLOR};
    color: white;
}
`;
export const VlogArrowBtn= styled.button`
width: 2.29rem;
height: 2.29rem;
background-color: ${TEXT_COLOR};
color: #eee;
border-radius: 50%;
border: none;
font-size: 1rem;
cursor: pointer;

display: flex;
justify-content: center;
align-items: center;

transition: background-color 0.2s ;
&:hover{
    background-color: #333;
}
`;

export const VlogSliderWrapper= styled.div`
display: flex;
gap: 20px;
padding-bottom: 1.43rem;

overflow-x: auto;
scroll-behavior: smooth;

//💘크로스브라우징
&::-webkit-scrollbar{
    display: none;
}
-ms-overflow-style: none;
scrollbar-width: none;

`;
export const VlogCard= styled.div`
min-width: 17.14rem; //240px;
background-color: #fff;
flex-shrink: 0; //💘
cursor: pointer;
box-shadow: 0 4px 10px rgba(0,0,0,.5);

`;
export const VlogImageWrapper= styled.div`
position: relative;
width: 100%;
height: 10rem;
overflow: hidden;

&:hover img{
    transform: scale(1.05);
}
img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}
`;
export const VlogInfo= styled.div`
padding: 1.1rem;
`;
export const VlogDesc= styled.p`
margin: 0;
font-size: 1rem;
color: #333;
font-weight: 500;
line-height: 1.3;

//💘3종세트
white-space: nowrap;
text-overflow: ellipsis;
overflow: hidden;
`;

// export const = styled.div``;
// export const = styled.div``;
// export const = styled.div``;
