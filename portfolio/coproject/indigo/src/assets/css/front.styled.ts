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



//weare
export const Weli = styled.li`

width: 100%;
margin-bottom: 10px;

`;
