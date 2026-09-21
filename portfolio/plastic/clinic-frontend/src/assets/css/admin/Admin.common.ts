import styled from "styled-components";
import { BlueButtonTheme, BoxShadow, ButtonBasic, CircleBtn, FlexBetween, FlexCenter, FlexColumn, FlexWrap, LinearGradient, TransitionAll, Transparent } from "../Common.style";


export const Container= styled.div`
display: flex;
width: 100%;
height: 100vh; 
overflow: hidden; //💘

`;
export const Sidebar= styled.ul<{$isCollapsed:boolean}>`
width: ${({$isCollapsed})=>$isCollapsed ? '6.5rem':'14rem'};
${TransitionAll};
${FlexColumn};
height: 100vh;

${LinearGradient};
margin: 0;
padding: 0;
list-style: none;
color: white;
z-index: 100;

overflow-x: hidden; //💘
overflow-y: auto; //💘
white-space: nowrap;

&::-webkit-scrollbar {
    width: 5px; 
  }

  &::-webkit-scrollbar-track {
    background: transparent; /* 스크롤바 뒷배경은 투명하게 */
  }

  &::-webkit-scrollbar-thumb {
    background: transparent; /* 평소엔 투명하게 숨김 */
    border-radius: 10px; 
    transition: background 0.2s ease;
  }

&:hover {
    &::-webkit-scrollbar {
        background: rgba(255, 255, 255, 0.3);
    }
}
`;
export const SidebarBrand= styled.div<{$isCollapsed:boolean}>`
height: 4.375rem;
${FlexCenter};
font-size:  ${({$isCollapsed})=>$isCollapsed ? '1rem':'1.2rem'};;
font-weight: 800;
letter-spacing: 0.05rem;
border-bottom: 1px solid rgba(255,255,255,.1);
cursor: pointer;

flex-shrink: 0; ///
`;
export const NavItem = styled.li<{$isCollapsed:boolean}>`
display: block;
padding: 1rem 1.5rem;
font-size: 0.85rem;
font-weight: bold;
color:  rgba(255,255,255,.8);
cursor: pointer;

margin: 0;
border-bottom: 1px solid rgba(255,255,255,.1);
${TransitionAll};
display: flex;
align-items: center;
justify-content: ${({$isCollapsed})=>$isCollapsed ? 'center':'flex-start'} ;
gap: 0.8rem;

 &:hover{
    background-color:  rgba(255,255,255,.2);
    color:#fff;
 }

`;

export const ToggleWrapper= styled.div`
display: flex;
justify-content: center;
padding: 1rem;
margin-top: auto; ///💘
`;
export const SidebarToggler= styled.button`
${CircleBtn};
background-color:rgba(255,255,255,.2);
${FlexCenter};
${TransitionAll};

&:hover{
    background-color:  rgba(255,255,255,.3);
}
`;
export const ContentWrapper= styled.div`
${FlexColumn};
flex: 1;
background-color: #f8f9fc;
overflow-x: hidden;
`;
export const Topbar= styled.nav`
height: 4.375rem ;
background-color: #fff;
${FlexBetween};
padding: 0 1.5rem;
z-index: 10;

`;
export const Main= styled.main`
flex: 1;
padding: 1.5rem;
overflow-y: auto; 

&::-webkit-scrollbar {
    display: none;
}

scrollbar-width: none;
-ms-overflow-style: none;
`;

export const LogoutButton= styled.button`
${Transparent}
color: #858796;
border: 1px solid #d1d3e2;
${FlexCenter}
gap: 0.4rem;
${TransitionAll}

&:hover{
background-color: #eaecf4;
color: #3a3b45;
border-color: #b7b9cc;
}
`;

export const TopbarBrand = styled.div`
font-size: 1.2rem;
color: #4e73df;
font-weight: 800;
letter-spacing: 0.05rem;
`;
export const TopbarRight = styled.div`
display: flex;
align-items: center;
gap: 1.2rem;
`;
export const TopbarUser = styled.span`
font-size: 0.9rem;
color: #858796;
font-weight: 600;
`;

//대시보드
export const DashContainer= styled.div`
width: 100%;
`;
export const DashPageTitle= styled.h1`
font-size: 1.5rem;
color: #5a5c69;
font-weight: 700;
margin-bottom: 1.5rem;
`;
export const DashCardGrid= styled.div`
display: grid;
grid-template-columns: repeat(4, 1fr);
gap: 1.5rem;
margin-bottom: 2rem;

@media (max-width:1400px){
  grid-template-columns: repeat(2, 1fr);
}

@media (max-width:768px){
  grid-template-columns: repeat(1, 1fr);
}
`;
export const DashSummaryCard= styled.div<{$borderColor:string}>`
display: flex;
justify-content: space-between;
align-items: flex-start;

background-color: #fff;
border-radius: 0.4rem;
border-left: 0.3rem solid ${props=>props.$borderColor};
${BoxShadow}
padding: 1.25rem;
`;
export const DashCardInfo= styled.div`
${FlexColumn}
gap: 0.2rem;
flex: 1;
`;
export const DashCardLabel= styled.span<{$textColor:string}>`
font-size: 0.9rem;
font-weight: 800;
color: ${props=>props.$textColor};
text-transform: uppercase;
margin-bottom: 0.2rem;
`;
export const DashCardMainValue= styled.span`
font-size: 1.5rem;
font-weight: bold;
color: #5a5c69;
margin-bottom: 0.8rem;
`;
export const DashCardSubGrid= styled.div`
${FlexWrap}; //자동으로 줄바꿈
gap: 0.8rem;
font-size: 0.8rem;
color: #858796;
border-top: 1px solid #eaecf4;
padding-top: 0.8rem;
width: 100%;
`;
export const DashCardSubItem= styled.div`
display: flex;
gap: 0.3rem;
strong{
  color: #5a5c69;
}
`;
export const DashIconWrapper= styled.div`
opacity: 0.65;
margin-top: 0.5rem;
margin-left: 1rem;
`;
export const DashBottom= styled.section`
background-color: #fff;
border-radius: 0.35rem;
${BoxShadow}
border: 1px solid #e3e6f0;
min-height: 300px;
${FlexCenter}
`;
// export const = styled.div``;
// export const = styled.div``;
// export const = styled.div``;
// export const = styled.div``;
// export const = styled.div``;