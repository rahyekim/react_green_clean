import { Bottom0, Boxshadow, Ellipsis, FlexAlignCenter, FlexBetween, FlexCenter, FlexColumn, NoScroll, TransitionAll, WebkitBox } from "@/css/common/Common.styles";
import styled from "styled-components";


export const BellIconWrapper =styled.div`
cursor: pointer;
`;
export const FilterBar = styled.div`
display:flex;
gap:0.5rem;
padding:0.75rem 1rem;
background-color:#fff;
border-bottom:1px solid #eee;
${NoScroll}
`;
export const FilterButton =styled.button`
${FlexCenter}
gap: 0.25rem;
background-color: #f1f3f5;
border: none;
border-radius: 1.25rem;
font-size: 0.81rem;
padding: 0.375rem 0.75rem;
color: #495057;
white-space: nowrap;
cursor: pointer;
`;

export const  AlertBanner=styled.div`
${FlexBetween}
background-color: #fff;
margin: 0.75rem 1rem;
padding: 0.875rem 1rem;
border-radius: 0.75rem;
${Boxshadow}
`;
export const AlertTitle  =styled.h1`
font-size: 0.875rem;
font-weight: 600;
color: #333;
`;
export const  AlertSub=styled.div`
font-size: 0.68rem;
color: #888;
margin-top: 0.125rem;
`;

interface ToggleProps{$active:boolean;}
export const ToggleSwitch  =styled.div<ToggleProps>`
width: 2.75rem;
height: 1.5rem;  //16:9 이상적
background-color:${props => (props.$active ? '#ff6b00':'#e4e5e7')};
border-radius: 0.75rem;
position: relative;
cursor: pointer;
${TransitionAll}
`;
export const  ToggleThumb=styled.div<ToggleProps>`
width: 1.25rem;
height: 1.25rem;
border-radius: 50%;
background-color: #fff;
position: absolute;
top: 0.125rem;
left: ${props=> props.$active ? '1.375rem' : '0.125rem'};
${TransitionAll}
${Boxshadow}
`;
export const GuideBox =styled.div`
${FlexBetween}
background-color: #fff;
cursor: pointer;
padding: 0.75rem 1rem;
border-radius: 10px;
margin: 0 1rem 1rem 1rem;
`;
export const  GuideText=styled.span`
flex:1;   //??
font-size:0.875rem;
color:#444;
margin-left:0.5rem;
font-weight: 500;
`;

export const  InfoRow=styled.div`
${FlexCenter}
gap: 0.375rem;
margin-bottom: 0.25rem;
`;

//// missing???? 
interface StatusProps {$status:string;}

export const  StatusBadge= styled.span<StatusProps>`
color: white;
font-weight: 700;
background-color: ${ 
props=> props.$status === '실종' ? '#ff4d4f': '#52c41a'};
padding: 0.125rem 0.375rem;
border-radius: 0.25rem;
`;
export const  MetaInfo= styled.div`
font-size: 0.69rem;
color: #666;
margin-bottom: 0.5rem;
white-space: nowrap;
${Ellipsis}
`;
export const  LocationRow= styled.div`
${FlexAlignCenter}
justify-content: flex-start;
gap: 0.25rem;
margin-bottom:0.25rem;
`;
export const  LocationText= styled.div`
font-size:0.6875rem;
line-height: 1.2;
color: #666;
${WebkitBox}
overflow: hidden;
`;
export const DateRow= styled.div`
${FlexCenter}
gap: 0.25rem;
margin-top:0.375rem;
`;
export const DateText= styled.span`
font-size: 0.625rem;
color: #999;

`;
export const LoadingText= styled.div`
text-align: center;
grid-column: span 2; ///🔥열 2칸 합쳐서 혼자써라
padding: 2.5rem;
color: #888;
font-size: 0.8rem;
`;

export const FloatingWriteBtn= styled.button`
position: fixed;
bottom: 5rem;
right: 20%;
background-color: #52c41a;
color: white;
border: none;
border-radius: 1.875rem;
padding: 0.6rem 1.2rem;
${FlexCenter}
gap: 0.375rem;
font-size: 0.875rem;
font-weight: 600;
${Boxshadow}
cursor: pointer;
z-index: 10;
&:focus{
    outline: none;
}
`;
export const NavBottom= styled.div`
position: fixed;
max-width: 480px;
${Bottom0}
margin: 0 auto; //중앙정렬
height: 3.75rem;
background-color: white;
border-top:1px solid #eee;
${FlexAlignCenter}
justify-content: space-around;
z-index: 100;
`;
interface NavItemProps {$active?:boolean;}
export const ItemNav= styled.div<NavItemProps>`
${FlexColumn}
gap:0.125rem;
cursor: pointer;
span{
  font-size: 0.75rem;
  color: ${props=>props.$active ? '#ff7a00': '#888'};
  font-weight:  ${props=>props.$active ? '700': '400'};;
}
`;

export const ImageContainer = styled.div`
position: relative;
width: 100%;
height: 160px;
background-color: #eee;
overflow: hidden;
border-radius: 15px 15px 0 0;
`;

export const BreedName= styled.div`
font-size: 0.8rem;
font-weight: 700;
color: #222;
`;
export const Card= styled.div`
background-color: white;
border-radius: 0.75rem;
${Boxshadow}
overflow: hidden;
`;
// export const = styled.div``;
// export const = styled.div``;
// export const = styled.div``;


// export const  =styled.div``;
// export const  =styled.div``;
// export const  =styled.div``;
// export const  =styled.div``;
