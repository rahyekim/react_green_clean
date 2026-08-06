
import styled from 'styled-components';

// export const  = styled.div``;

export const AppWrapper = styled.div`
display: flex;
justify-content: center;
background-color: #333;
min-height: 100vh;
width: 100%;
`;


export const Container = styled.div`
width: 100%;
max-width: 480px; // 480px모바일에서만 768:아이패드pro안맞음=>1024
min-height: 100vh;
position: relative;

background-color: #fff;
padding-bottom:70px;
box-shadow: 0 0 10px rgba(0,0,0,0.15);

@media (max-width:480px){
    width: 100%;
    box-shadow: none;
}
`;

export const Header = styled.header`
display: flex;
justify-content: space-between;
align-items: center;
padding: 16px;
`;

export const Logo = styled.h4`
margin: 0;
font-weight: 700;
color: #f28c28;

`;

export const Banner = styled.section`
background-color: #f5efc1;  //e9f7f4
padding: 24px;
text-align: center;
`;  

export const BannerTitle= styled.h5`
font-weight: bold;
margin-bottom: 8px;
`;

export const BannerSub  = styled.p`
font-size: 13px;
color: #6c757d ;  //#6c757d  
margin: 0;
`;

export const BannerImg  = styled.div`
margin-top: 16px;
height: 120px;
background-color: #f3f3d7; //#d1ece5
border-radius: 10px;
`;

export const QuickMenu  = styled.div`
display: grid;
grid-template-columns: repeat(5,1fr);
padding: 17px;
border-bottom: 1px solid #eee;
`;

export const MenuIconWrapper = styled.div`   //section?
display: flex;
flex-direction: column;
align-items: center;
gap: 4px;
`;
export const IconCircle= styled.div`
width: 50px;
height: 50px;
border-radius: 50%;
background-color: #f1e2ef;
display: flex;
justify-content: center;
align-items: center;
`;
export const MenuText = styled.div`
font-size: 11px; //웹에서 10px이하로 안내려감
`;
export const Section = styled.section<{$bgLight?:boolean}>`
padding: 16px;
background-color: ${({$bgLight})=> $bgLight ? '#f8f9fa': '#fff'};
margin-top: ${({$bgLight})=> $bgLight ? '8px': '0'};
padding-bottom: 20px;
`;

export const  SectionHeader = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 12px;
`;
export const SectionTitle  = styled.h6`
font-weight: bold;
margin: 0;
`;
export const  MoreButton = styled.span`
font-size: 13px;
color: #6c757d;
cursor: pointer;
`;
export const HorizontalScroll  = styled.div`
display: flex;
overflow-x: auto;  //가로 스크롤
white-space: nowrap;
padding-bottom: 10px;
margin-bottom: 8px;
gap: 12px;

/* 크롬, 사파리, 엣지 스크롤바 숨김(::가상요소) */
&::-webkit-scrollbar{ // 스크롤 안보이게 터치로 슉슉!!!!
    display: none;
}
/* 파이어폭스 스크롤바 숨김 (그냥속성으로봄) */
scrollbar-width: none; 
`;
export const RegionCircle = styled.div`
width: 60px;
height: 60px;
border-radius: 50%;
border: 1px solid #fff; //#dee2e6;
background-color: #fcf5e1;

display: flex;
justify-content: center;
align-items: center;
flex-shrink: 0;  //🌟스크롤에 찌그러지지않게 고정
span{
    font-size: 12px;
}
`;
export const AnimalCard  = styled.div`
width: 160px;
border-radius: 15px;
box-shadow: 0 2px 6px rgba(0,0,0,0.08);
flex-shrink: 0;
display: flex;
flex-direction: column;
background-color: #fff;
`;

export const CardImg  = styled.img`
width: 100%;
height: 160px;
object-fit: cover;
border-radius: 15px 15px 0 0; //🌟상단만 둥글게 
`;
export const  CardBody= styled.div`
padding: 12px;
`;
export const CardTitle  = styled.p`
font-weight: bold;
font-size: 13px;
margin: 0 0 4px 0;
overflow: hidden; //
text-overflow: ellipsis; //🌟 길어지면 ... 축약해줌
`;

export const  CardDescription = styled.p`
font-size: 11px;
color: #6c757d;
margin: 0;
overflow: hidden;
text-overflow: ellipsis;
`;
export const  StatusText = styled.div`
width: 100%;
text-align: center;
padding: 20px;
font-size: 14px;
color: #6c757d;
`;
export const  StatBox = styled.div`
display: flex;
justify-content: space-between;
background-color: #fff;
border-radius: 8px;
padding: 16px;
box-shadow: 0 1px 4px rgba(0,0,0,0.05);
`;
export const  StatItem= styled.div`
font-size: 13px;
`;
export const StatLabel  = styled.span<{$color:string}>`
font-weight: bold;
color: ${({$color})=> $color};
margin-right: 5px;
`;
export const BottomNav  = styled.div`
//고정으로 외우면됨 세뚜임
position: fixed; //🌟
bottom: 0;
width: 100%;
max-width: 480px;

display: flex;
justify-content: space-around;//🌟
align-items: center;

background-color: #fff;
border-top: 1px solid #dee2e6;
padding: 8px 0;
z-index: 1000; //🌟
`;
export const  NavItem = styled.div<{$active?:boolean}>`
display: flex;
flex-direction: column;
align-items: center;
color: ${({$active})=>$active ? "#f28c28" : "#6c757d" };
cursor: pointer;
span {
    font-size: 10px;
    margin-top: 4px;
}
`;
export const TopFlexBasic = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
padding: 15px 10px;
margin-bottom: 30px;

border-bottom: 1px solid #ccc;
`;

//플렉스 칸을 중심으로
export const Column = styled.div`
display: flex;
flex-direction: column;
gap: 15px;
padding: 60px 20px 0px 20px; //상 우 하 좌 
`;

export const BasicLayout = styled.div`
padding: 15px 10px;
`;

export const Back = styled.span`
cursor: pointer; //스크롤 없어서 포인터보이게
color: #999;
transition: all 0.5s;

&:hover{
    color: #333;
}
`;
//title
export const H5Bold  = styled.h5`
font-weight: 600;
letter-spacing: -0.03rem; //🌟 우리나라글자는 자간을 줘야
color: #333; //✨검정색보단 약간 검정색이 조아...

`;
export const H3Bold  = styled.h3`
font-weight: 700;
letter-spacing: -0.03rem; 
color: #333;
`;

export const  None= styled.div`
width: 40px;
height: auto;
`;
export const TextCenter = styled.div`
text-align: center;
margin-top: 30px;
`;

export const  KaKaoBtn= styled.button`
background-color: #fee500;
color: #181818;
padding: 15px;
border-radius: 8px;
border: 0px solid #fee500;
font-weight: bold;

display: flex;
justify-content: center;
align-items: center;
gap: 10px;
opacity: 0.9;
cursor: pointer;
transition: all 0.3s;

&:hover{
    opacity: 1;
}
`;

export const  LocalBtn= styled.button`
background-color: #eee;
color: #333;
padding: 15px;
border-radius: 8px;
border: 1px solid #fff;
font-weight: bold;

display: flex;
justify-content: center;
align-items: center;
gap: 10px;

opacity: 0.9;
cursor: pointer;
transition: all 0.3s;

&:hover{
    opacity: 1;
}
`;
export const MemberInfo  = styled.div`
margin-top: 30px;

`;

export const BtnEndWrap = styled.div`
display: flex;
justify-content: flex-end;

width: 100%;
`;
// export const  = styled.div``;
// export const  = styled.div``;
// export const  = styled.div``;
// export const  = styled.div``;
// export const  = styled.div``;


