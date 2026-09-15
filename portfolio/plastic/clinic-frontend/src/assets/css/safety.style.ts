'use client'

import styled from "styled-components"
import { COLORS } from "@/assets/css/theme";

export const SafetySection= styled.section`
background-color: black;
padding: 5.7rem 1.42rem;
width: 100%;
`;
export const SafetyInner= styled.div`
max-width: 1200px;
width: 100%;
margin: 0 auto;
`;
export const SafetyHeader= styled.div`
display: flex;
justify-content: space-between;
align-items: baseline;
margin-bottom: 2.86rem;
`;
export const SafetyTitleGroup= styled.div`
display: flex;
flex-direction: column;
`;
export const SafetyMainTitle= styled.h2`
display: inline-block;
margin: 0;

color: #fff;
font-size: 2.2rem;
font-weight: 900;

border-bottom: 2px solid #fff ;
padding-bottom: 0.7rem;
`;
export const SafetyControls= styled.div`
display: flex;
align-items: center;
gap: 10px;
`;
export const SafetyViewMoreBtn= styled.button`
color: #fff;
border: 1px solid #fff;
background-color: transparent;
border-radius: 20px;
padding: 8px 16px;
font-size: 1rem;
font-weight: 600;
cursor: pointer;

transition: all 0.2s;
&:hover{
    background-color: #eee;
    color: #222;
}

`;
export const SafetyArrowBtn= styled.button`
width: 36px;
height: 36px;
border-radius: 50%;
border: none;
font-size: 16px;
color: #fff;
background-color: #222;
cursor: pointer;
display: flex;
justify-content: center;
align-items: center;

transition: all 0.2s;
&:hover{
    background-color: #444;
}
`;
export const SliderWrapper= styled.div`
display: flex;
gap: 20px;
padding-bottom: 1.4rem;

overflow-x: auto;
scroll-behavior: smooth;

//💘크로스브라우징
&::-webkit-scrollbar{
    display: none;
}
-ms-overflow-style: none;
scrollbar-width:none;
`;
export const SafetyCard= styled.div`
min-width: 300px;
width: 300px;
border-radius: 20px;
overflow: hidden;
position: relative;
flex-shrink: 0; 
cursor: pointer;

&:hover img{
    transform: scale(1.05);
}
`;
export const SafetyImg= styled.img`
width: 100%;
height: 100%;
object-fit: cover;
transition: all 0.3s ease;
`;
export const TextOverlay= styled.div`
position: absolute;
bottom: 0;
left: 0;
background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 100%);
padding: 40px 20px 20px 20px;

display: flex;
flex-direction: column;
justify-content: flex-end;


`;
export const CardTitle= styled.h3`
color: #fff;
font-size: 1.3rem;
line-height: 1.3;
word-break: keep-all;
margin: 0 8px 8px 0;
`;
export const CardDesc= styled.p`
color: #ddd;
font-size: 0.8rem;
line-height: 1.5;
word-break: keep-all; //💘단어 단위로 자연스럽게 줄바꿈
margin: 0;
`;
//export const = styled.div``;
//export const = styled.div``;
//export const = styled.div``;
//export const = styled.div``;
//export const = styled.div``;