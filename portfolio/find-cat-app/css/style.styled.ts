
import { PlayArrow } from '@mui/icons-material';
import styled, {css} from 'styled-components';

// export * from '@/app/missing/Missing.style'

// export const  = styled.div``;

import { Bottom0, Boxshadow, BoxShadowBasic, BoxShadowHover, Ellipsis, FlexAlignCenter, FlexBetween, FlexCenter, FlexColumn, TransitionAll, WebkitBox } from './common/Common.styles';

//✨가로 중앙 left: 50%; && transform: translateX(-50%);
//✨세로 중앙 top: 50%; && transform: translateY(-50%);

export const  CardGrid=styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(180px,1fr)) ;
gap:12px;
padding:0 15px;
`;
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
margin: 0 auto; /* 💡 화면 정중앙에 고정되도록 설정 */

@media (max-width:480px){
    width: 100%;
    box-shadow: none;
}
`;

export const Header = styled.header`
//🌟 헤더 고정
position: fixed;
width: 100%;
max-width: 480px;
z-index: 999;
box-sizing: border-box;

//🔥화면 정중앙 배치공식(내가 최대치 크기 정했을때)
top:0;  //화면 맨 위에 고정 fixed면 꼭🌟
left: 50%;
transform: translateX(-50%);

background-color: #fff;

display: flex;
justify-content: space-between;
align-items: center;
padding: 16px 20px; 

border-bottom: 1px solid #eee;
`;

export const Logo = styled.h4`
margin: 0;
font-weight: 700;
color: #f28c28;
`;

// export const Container = styled.div`
//   width: 100%;
//   max-width: 480px;
//   min-height: 100vh;
//   background-color: #fff;
//   position: relative;
//   padding-bottom: 70px;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
//   margin: 0 auto; /* 💡 화면 정중앙에 고정되도록 설정 */

//   @media (max-width: 480px) {
//     width: 100%;
//     box-shadow: none;
//   }
// `;


// export const Header = styled.header`
// position: sticky;
//   top: 0;
//   z-index: 99999;
//   width: 100%;
//   box-sizing: border-box;
//   padding: 16px 20px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   background-color: #fff;
//   max-width: 480px;
//   margin: 0 auto;
// `;

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
cursor: pointer;

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
margin-bottom: 8px;
`;
export const  MoreButton = styled.span`
font-size: 13px;
color: #6c757d;
cursor: pointer;
`;
export const HorizontalScroll  = styled.div`
display: flex;
overflow-x: auto;  //🌟가로 스크롤
white-space: nowrap; //🌟
padding-bottom: 10px;
margin-bottom: 8px;
gap: 12px;

/* 🌟크롬, 사파리, 엣지 스크롤바 숨김(::가상요소) */
&::-webkit-scrollbar{ // 스크롤 안보이게 터치로 슉슉!!!!
    display: none;
}
/* 🌟파이어폭스 스크롤바 숨김 (그냥속성으로봄) */
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
width: 200px;
border-radius: 15px;
box-shadow: 0 2px 6px rgba(0,0,0,0.08);
flex-shrink: 0;
display: flex;
flex-direction: column;
background-color: #fff;
overflow: hidden;
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
//🌟🔥 헤더 고정 
position: fixed;
width: 100%;
max-width: 480px;
z-index: 999;
box-sizing: border-box;

//🔥화면 정중앙 배치공식(내가 최대치 크기 정했을때)
top:0; //🌟화면 맨 위에 고정 fixed면 꼭🌟
left: 50%;
transform: translateX(-50%);

background-color: #fff;

display: flex;
justify-content: space-between;
align-items: center;
padding: 15px 10px;

border-bottom: 1px solid #ccc;

@media (max-width: 480px){
  max-width: 480px;
}

@media (max-width: 440px){
  max-width: 440px;
}

@media (max-width: 430px){
  max-width: 430px;
}
//390 280 .... 까지....
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

//🌟🌟🌟 추가 🌟🌟🌟🌟
type ButtonVariant = 'kakao' | 'local' | 'primary' ;
//컴포넌트가 받을 Props 정의
interface BtnProps {
    $variant: ButtonVariant;
    $mainColor?: string; 
    $width?:string;
    $radius?:string;
    $padding?:string;
}
//variant별 스타일 객체 매핑
const variantStyles = { //색상,테마 결정
    kakao:css`
    background-color: #fee500;
    color: #181818;
    border: 0px solid #fee500;
    `,
    local:css`
    background-color: #eee;
    color: #333;
    border: 0px solid #fff;
    `,
    primary:css<BtnProps>`
    background-color: ${({$mainColor})=> $mainColor || '#f7e790'};
    color: #222;
    border: 1px solid ${({$mainColor})=> $mainColor || '#f7e790'};
    `
}

export const  BaseBtn= styled.button<BtnProps>`
width: ${({$width})=> $width || '100%'};
box-sizing: border-box;

padding: ${({$padding})=> $padding || "15px"};
border-radius: ${({$radius})=> $radius || "8px"};
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

${({$variant})=> variantStyles[$variant]};
`;

// export const  LocalBtn= styled.button`
// width: 100%;
// background-color: #eee;
// color: #333;
// padding: 15px;
// border-radius: 8px;
// border: 1px solid #fff;
// font-weight: bold;

// display: flex;
// justify-content: center;
// align-items: center;
// gap: 10px;

// opacity: 0.9;
// cursor: pointer;
// transition: all 0.3s;

// &:hover{
//     opacity: 1;
// }
// `;
export const MemberInfo  = styled.div`
margin-top: 30px;

`;

export const BtnBottomWrap = styled.div`
position:fixed;
bottom: 10%;
left:50%;
transform:translateX(-50%);
z-index: 999;

/* 🌟 뼈대가 되는 기본 넓이와 양옆 여백 🌟*/
width: 100%;
max-width: 480px;  
padding: 0 20px; 
box-sizing: border-box;

  /* 💡 1. 480px 이하 기기 */
  @media (max-width: 480px) {
    max-width: 480px;
  }
  
  /* 💡 2. 440px 이하 기기 */
  @media (max-width: 440px) {
    max-width: 440px;
  }

  /* 💡 3. 430px 이하 기기 (아이폰 Pro Max 급) */
  @media (max-width: 430px) {
    max-width: 430px;
  }

  /* 💡 4. 390px 이하 기기 (아이폰 일반 급) */
  @media (max-width: 390px) {
    max-width: 390px;
  }

  /* 💡 5. 280px 이하 기기 (초소형 화면, 갤럭시 폴드 커버화면 등) */
  @media (max-width: 280px) {
    max-width: 280px;
  }

  `;
export const PhotoUpload = styled.div`
width: 100px;
height: 100px;
background-color: #fde0e0; //#eee
border-radius: 10px;
margin: 0 auto;

display: flex;
align-items: center;
justify-content: center;
overflow: hidden;

cursor: pointer;

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
`;
export const PhotoUpBottomText = styled.span`
font-size: 12px;
font-weight: 500;
letter-spacing: -0.03rem; 
color: #333;
`;
export const AlineItemsCenter = styled.div`
display: flex;
align-items: center;
gap: 10px;
margin-bottom: 15px;
`;

export const LayoutPadding = styled.div`
padding: 15px 20px;
`;

//input
export const FormControl = styled.input`
flex: 1;
width: 100%;
padding: 10px;
border: 1px solid #ccc;
border-radius: 10px;

box-shadow: 0 1px 4px rgba(0,0,0,0.1);

`;
export const UpandDown  = styled.span`
cursor: pointer;

font-size: 12px;
color: #888;

`;

export const Terms = styled.div<{$IsOpen:boolean}>`
/* max-height: showTerms ? '150px': '0'; */
max-height: ${({$IsOpen})=> $IsOpen ? '150px': '0'};
overflow:hidden;
transition: max-height 0.3s ease-in-out;
background-color: #f9f9f9;
border-radius: 4px;

`;

export const TermsInner = styled.div`
padding: 10px;
font-size: 12px;
color: #666;
`;
export const LabelGroup = styled.div`
display: flex; 
justify-content: center;
gap: 20px;
width: 100%;
margin-bottom: 15px;

`;
export const Label = styled.div`
display: flex;
gap: 5px;
cursor: pointer;
`;


export const Modal = styled.div`
border: 2px solid #ccc ;
padding: 10px;
margin-top: 10px;
border-radius: 10px;
background-color: #fff;
`;
export const Exit = styled.div`
/* display: flex;
justify-content: flex-end; */
text-align: right;
font-weight: bold;
margin-bottom: 10px;
color: #555;
cursor: pointer;
`;
export const MT30 = styled.div`
margin-top: 30px;
`;
export const MT70 = styled.div`
margin-top: 30px;
`;
export const ModalBg= styled.div`
display: flex;
justify-content: center;

//모달 창을 세로 기준 화면 💡맨 위에서 상하좌우 10vh(화면 높이의 10%)만큼 떨어진 위치
align-items: flex-start;
padding: 10vh;
/* padding-top:10vh => 상단위치만*/ 

position: fixed; //전부0으로 붙어서 전체 꽉 차도록 고정
top:0;
left: 0;
right: 0;
bottom: 0;

background-clip: border-box; //배경색 테두리까지 채우겟다..기본값 생략가능
background-color: rgba(0,0,0,.6);
z-index: 999;

`;
export const ContainerColumn  = styled.div`
display: flex;
flex-direction: column;
height: 100vh;
background-color: white;
width: 100%;
max-width: 480px;

`;
//레이아웃 layout
export const  LoginLayout= styled.div`
padding: 10px 20px 30px 20px;
`;
export const  H2Size20= styled.h2`
font-size: 20px;
font-weight: 500;
margin-bottom: 25px;
color: #111;
`;

export const LayoutSpaceBetween  = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
gap: 10px;
`;

//마이페이지 전용 스타일
export const ListItemWrapper = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
padding: 16px 0;
cursor: pointer;
`;
export const ListItemLeft = styled.div`
display: flex;
align-items: center;
gap: 15px;

`;
export const ListItemText = styled.span`
font-size: 15px;
color: #181818;
`;

export const MenuCardBox = styled.div`
flex: 1;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background-color: #fff7ed;
border-radius: 25px;
padding: 20px 0;
cursor: pointer;

`;
export const MenuCardText= styled.div`
font-size: 14px;
font-weight: 500;
color: #333;
margin-top: 8px;
`;
export const List = styled.div`
padding: 0 20px 0px 20px;
`;
export const  H3Size16= styled.h3`
font-size: 16px;
font-weight: bold;
margin-bottom: 15px;
margin-top: 5px;
`;
export const Line = styled.div`
width: 100%;
height: 10px;
background-color: #f5f5f5;
`;
export const LogoutBtn = styled.span`
font-size: 14px;
color: #888;
cursor: pointer;
text-decoration: underline;

`;

//입양 캠페인 전용 스타일
export const  HashTagScroll= styled.div`
display: flex;
gap: 8px;
overflow-x: auto;  //가로 스크롤 
padding-bottom: 12px;
margin-bottom: 10px;

&::-webkit-scrollbar{
  display: none;  //스크롤 안보이게 
}

`;
export const HashTagBtn= styled.button<{$active?:boolean}>`

background-color: ${({$active})=> $active ? "#f6931d" : "#eaecee"};
border: none;
outline: none;
border-radius: 20px;
padding: 6px 14px;
color: ${({$active})=> $active ? '#fff': '#555'};
font-weight: 700;
white-space: nowrap;
cursor: pointer;
transition: all 0.2s ease-in-out;

/* 🔥 이 부분을 추가해서 클릭/포커스 시 생기는 모든 기본 효과 차단 */
&:focus {
    outline: none;
    box-shadow: none;
  }
/*
애니메이션 트랜지션
ease in 가속 =>느리게 시작해서 점점 빨라지는 효과 (퇴장용)
ease out 감속 => 빠르게 시작해서 목적지에 가까워질수록 부드럽게 느려지는 효과 (등장용)
ease in-out 느리게 시작해 중간에 가장 빨라졌다가 끝날 대 부드럽게 멈추는 형태 (짬뽕)
 */
`;

export const  CampaignCard = styled.div`
min-width: 150px;
max-width: 150px;
display: flex;
flex-direction: column;
gap: 8px;
`;
export const CampaignMediaWrap = styled.div`
position: relative;
width: 100%;
/* height: 200px; */
aspect-ratio: 1/1;
border-radius: 12px;
overflow: hidden;
background-color: #f0f0f0;
transition: all 0.3s ease-in-out;
&:hover {
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2); 
  }
`;
export const  CampaignImg= styled.img`
width: 100%;
height: 100%;
object-fit: cover;
cursor: pointer;


`;
export const PlayIconWrap = styled.div`
position: absolute; //영상위에 보여야할때..
bottom: 8px; 
left: 8px;
background: rgba(0,0,0, .6);
border-radius: 50%;

display: flex; 
align-items: center;
justify-content: center;

width: 26px;
height: 26px;
color: white;
`;
export const CampaignTextWrap = styled.div`
display: flex;
flex-direction: column;
gap: 2px;
`;
export const CampaignCardtitle = styled.div`
font-weight: bold;
font-size: 15px ;
color: #111;
//🌟세개 set  
white-space: nowrap;
overflow: hidden; 
text-overflow: ellipsis;
`;
export const CampaignCardDesc = styled.div`
font-size: 13px;
color: #888;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
`;

//thumb 유튜브
export const Thumb  = styled.div`
position: relative;
border-radius: 8px;
overflow: hidden;
aspect-ratio: 16/9;  //fullHD
max-width: 300px;
width: 100%;
/* height: 100%; */
`;
export const VideoThumb = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
display: block;
`;

//icon
export const  YoutubePlayicon= styled(PlayArrow)`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
color: #fff;
font-size: 2.5rem;
opacity: 0.6;

background-color: #888;
border-radius: 50%;
`;
export const  NewsTitle= styled.p`
text-align: center;
margin-top: 6px;
font-size: 0.8rem;
white-space: nowrap;
text-overflow: ellipsis;
overflow: hidden;

`;

//toggle토글 스위치
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
gap: 0.45rem;
margin-bottom: 0.25rem;
`;

//// missing 실종/제보
interface StatusProps {$status:string;}

export const  StatusBadge= styled.span<StatusProps>`
color: white;
font-weight: 600;
background-color: ${ 
props=> props.$status === '실종' ? '#ff4d4f': '#52c41a'};
padding: 0.1rem 0.32rem;
border-radius: 0.25rem;
`;
export const  MetaInfo= styled.div`
text-align: center;
font-size: 0.8rem;
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
font-size:0.73rem;
line-height: 1.3;
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
font-size: 0.7rem;
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

left: 50%; //브라우저 정중앙 기준점
transform: translateX(120px); //정중앙에서 이동!

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
  width: 100%;
  height: 160px;
  background-color: #eee;
  overflow: hidden;
  ${FlexCenter}
`;

export const BreedName= styled.div`
font-size: 0.8rem;
font-weight: 700;
color: #222;
`;

export const Card= styled.div`
background-color: white;
border-radius: 0.75rem;
${BoxShadowBasic}
overflow: hidden;

&:hover{
  ${BoxShadowHover}
}
`;

export const TabContainer=styled.div`
display: flex;
padding: 0 20px;
border-bottom: 1px solid #eee;
background-color: #fff;
`;
export const TabBtn=styled.button<{$active?:boolean}>`
background:none;
border: none;
padding: 15px 5px;
margin-right: 20px;

font-size: 1rem;
font-weight: ${props=> props.$active ? '700' : '400'};
color: ${props=> props.$active ? '#111' : '#888'};
border-bottom: ${props=> props.$active ? '2px solid #000' : '2px solid transparent'};
cursor: pointer;
transition: all 0.2s ease;

&:focus{
    outline: none;
}
`;
export const FilterContainer=styled.div`
padding: 15px 20px;
width: 100%;
display: flex;
gap: 8px;
align-items: center;
overflow-x: auto;
background-color: #fff;

&::-webkit-scrollbar{
    display: none;
}
scrollbar-width: none;
scroll-behavior: smooth;

`;
export const FilterIconBtn=styled.button`
background-color: #fff;
border: 1px solid #ddd;
border-radius: 50%;
width: 35px;
height: 35px;
display: flex;
align-items: center;
justify-content: center;
flex-shrink: 0;
cursor: pointer;
`;
export const FilterSelect =styled.select`
flex-shrink: 0; //overflow x스크롤
padding: 8px 10px;
border: 1px solid #ddd;
border-radius: 20px;
background-color: #fff;
font-size: 0.9rem;
color: #333;
outline: none;
flex-shrink: 0;
cursor: pointer;
`;
export const AlertBanner=styled.div`
background-color: #f8f9fa;
margin: 0 20px 20px;
padding: 15px;
border-radius: 12px;
border: 1px solid #eee;

display: flex;
align-items: center;
justify-content: space-between;
`;
export const AlertInfo =styled.div`
display: flex;
align-items: center;
gap: 12px;

.icon-circle{
    background-color: #e9ecef;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    transition: all 0.3s ease-in-out;
    &:hover{
        color: #ff8c00;
        background-color: #eee;
    }
}

.text-group{
    display: flex;
    flex-direction: column;
    gap: 3px;
    strong{
        font-size: 0.95rem; color: #111;
    }
    span{
        font-size: 0.8rem; color: #888;
    }
}

`;

export const ToggleBtn=styled.button<{$isOn:boolean}>`
width: 48px;
height: 26px;
border-radius: 13px;
border: none;
background-color: ${({$isOn})=> $isOn ? '#ff8c00' : '#ddd'};

position: relative;
cursor: pointer;
transition: background-color 0.3s;

&:focus{
    outline: none;
}

/* 토글스위치 */
.handle{
    width: 22px;
    height: 22px;
    background-color: #fff;
    border-radius: 50%;
    position: absolute;
    top: 2px;
    left: ${({$isOn})=>$isOn ? '24px': '2px'};
    box-shadow: 0px 2px 4px rgba(0,0,0,.2);
    
}
`;

export const Divider=styled.div`
height: 8px;
background-color: #f4f5f7;
width: 100%;
`;
// export const = styled.div``;
// export const = styled.div``;
// export const = styled.div``;

