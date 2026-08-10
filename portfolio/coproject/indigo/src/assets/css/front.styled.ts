import styled from "styled-components";


// export const = styled.div``;

export const WorkSection= styled.section`

padding: 80px 0;
background-color: #fff;
`;

export const Container = styled.div`
max-width: 1200px;
margin: 0 auto;
padding: 0 20px;
`;

export const SectionTitle = styled.h2`
font-size: 2.5rem;
color: #3f51b5;
margin-bottom: 40px;
font-weight: 400;
text-align: center;
`;

export const  GridWrap = styled.div`
display: grid;
grid-template-columns: repeat(4, 1fr);
gap:0;
`;

export const GridItem =styled.div`
width: 100%;
aspect-ratio: 1/1; //가로세로 1:1비율 유지 정사각형?
`;

export const WorkImg= styled.img`
width: 100%;
height: 100%;
object-fit: cover;
display: block;
`;

export const EmptyState= styled.div`
grid-column: span 4; // 혼자 4칸 차지
text-align: center;
padding: 50px;
color: #999;

`;
// 💡 1. 이미지와 가상 오버레이(::before)를 가지는 태그
export const WorkLink= styled.a`
display: block;
position: relative; /* 자식(::before, .info)의 위치 기준점 */
width: 100%;
height: 100%;
overflow: hidden; /* 이미지 밖으로 오버레이가 안 나가도록 자름 */

/* 3. 가상 배경막 (어두워지거나 색상이 들어오는 덮개) */
&::before{
content:"";
display: block;
position: absolute;
top:0;
left:0;
width: 100%;
height: 100%;
z-index: 10;
background-color: #3f51b5;
opacity: 0;
transition: all 0.3s ease;
}

&:hover{
    &::before{
        opacity: 0.8;
    }

    .info{
        transform: translateY(23px);
        opacity: 1;

        @media (min-width: 768px) {
                transform: translateY(37px);
            }
    }
}
`;
// 💡 2. 호버 시 보여질 텍스트 상자
export const WorkInfo= styled.div`
position: absolute;
top: 0;
left: 23px;
z-index: 20;
opacity: 0;
transition: all 0.3s ease;

h3{
    margin-bottom: 8px;
    font-size: 23px;
    color: #fff;
    font-weight: normal;
}

span{
    font-size: 11px;
    color: #fff;
    font-weight: 300;
}
`;
// export const = styled.div``;




//weare
export const Weli = styled.li`

width: 100%;
margin-bottom: 10px;

`;


//블로그



export const  BlogSection = styled.div`
  margin-top: 77px ;
  
  @media (min-width: 768px){
    margin-top: 124px;
  }
 
`;
export const  BlogList= styled.div`
display: grid;
grid-template-columns: 1fr;
gap: 45px;

@media (min-width: 768px){
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;

  }
@media (min-width: 1024px){
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
}

`;
export const  BlogImg= styled.img`
display: block;
width:100%;
max-width: 100%;
object-fit: cover;     /* 👈 찌그러짐 방지 */
aspect-ratio: 3/ 4;  //👈 이미지 비율 통일
`;
export const  BlogTime  = styled.time`
display: block;
margin:11px 0 10px 0;
font-size: 11px;
color:#9e9e9e;
`;
export const  BlogH3 = styled.h3`
color:#424242;
font-weight: normal;
line-height: 1.6;
`;
//export const   = styled.div``;
