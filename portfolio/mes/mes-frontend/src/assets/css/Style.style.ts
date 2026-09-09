import { FS } from './../../../node_modules/next/dist/build/turborepo-access-trace/types.d';
import styled from 'styled-components'
import Link from 'next/link'

export const Container= styled.div`
display: flex;
justify-content: center;
align-items: center;

min-height: 100vh;
padding: 1rem;
background-color: ${props=> props.theme?.colors?.background || '#536692'};


`;
export const Card= styled.div`
display: flex;
width: 100%;
max-width: 1200px;
background-color: #fff;
border-radius: 0.35rem;
box-shadow: 0 0.15rem 1.75rem 0 rgba(58,59,69,.15);
overflow: hidden;
`;
export const ImgColumn= styled.div`
flex: 4; /* width: 41.6667%; */
background: url("/image/selfie1.jpg");
background-position: center;
background-size: cover;
@media (max-width:992px){ //모바일에서숨김
    display: none;
}
`;
export const FormColumn= styled.div`
flex:6; /* width: 58.3333%; */
padding: 3rem;

display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

@media (max-width:992px){ 
    width:100%;
}
`;
export const Title= styled.h1`
text-align: center;
font-size: 1.5rem;
font-weight: 400;
color: #3a3b45;
margin-bottom: 1.5rem;

`;
export const Form= styled.form`
display: flex;
flex-direction: column;
gap: 1rem;
width: 100%;

max-width: 500px;
`;
export const Row= styled.div`
display: flex;
gap: 1rem;

@media (max-width: 768px){
    flex-direction: column;
}
`;
export const Col= styled.div`
flex: 1;
`;
export const Input= styled.input`
width: 100%;
padding: 0.8rem 1rem;
border: 1px solid #d1d3e2;
border-radius: 10rem;
outline: none;
transition: border-color 0.2s ease-in-out;

&:focus{
    border-color: #bac8f3;
    box-shadow: 0 0 0 0.1rem rgba(78,115,223,0.25);
}

&[readonly]{
    background-color: #eaecf4;
}
`;
export const RadioGroup= styled.div`
display: flex;
align-items: center;
gap: 1rem;
padding: 0 1rem;
`;
export const RadioLabel= styled.label`
display: flex;
align-items: center;
gap: 0.3rem;
font-size: 0.9rem;
color: #6e707e;
cursor: pointer;
`;
export const AddressWrapper= styled.div`
display: flex;
gap: 0.5rem;
`;
export const Button= styled.button`
width: 100%;
padding: 0.8rem;
background-color: #4e73df ;
color: white;
border: none; 
border-radius: 10rem;
font-size: 0.9rem;
cursor: pointer;

transition: background-color 0.15s ease-in-out;
&:hover{
  background-color: #2e59d9; 
}
`;
export const SearchButton= styled(Button)`
width: auto;
min-width: 100px;
background-color: #858796;
padding: 4px 8px;

&:hover{
    background-color: #717384;
}
`;
// export const SocialButton = styled.button<{$provider: 'kakao' | 'insta'}>`
// width: 100%;
// padding: 0.8rem;
// /* margin-bottom: 0.5rem; */
// background-color: ${({$provider})=>$provider === 'insta' ? '#e1306c': '#FEE500'};
// color: ${({$provider})=>$provider === 'insta' ? '#eee': '#111'};
// border-radius: 10rem;
// border: none;
// font-size: 0.9rem;
// cursor: pointer;
// text-align: center;

// `;
export const Divider= styled.hr<{$margin?:string}>`
margin: ${props=>props.$margin || '0.5rem'};
border: 0;
border-top: 1px solid rgba(0,0,0,.1);

`;


export const StyledLink= styled(Link)`
font-size: 0.875rem;
text-decoration: none;
/* margin-bottom: 0.5rem; */

&:hover{
    text-decoration: underline;
    color: #224abe;
    text-underline-offset: 2px;
}
`;

export const LinkWrapper= styled.div`
display: flex;
justify-content: center;
align-items: flex-start;
gap: 0.3rem;
color: #4e73df ;
margin-top: 0.5rem;
`;
// export const = styled.div``;
// export const = styled.div``;
// export const = styled.div``;


export const CheckboxWrapper = styled.div`
display: flex;
align-items: center;
gap: 0.5rem;
padding-left: 0.5rem;
margin-bottom: 0.5rem;
`;

export const CheckboxLabel= styled.label`
font-size: 0.8rem;
color: #6e707e;
cursor: pointer;
`;


export const SocialButton= styled.button<{$provider:'google'|'insta'}>`
width: 100%;
padding: 0.8rem;
/* margin-bottom: 0.5rem; */
background-color: ${({$provider})=>$provider === 'google' ? '#e1306c': '#FEE500'};
color: ${({$provider})=>$provider === 'google' ? '#eee': '#111'};
border-radius: 10rem;
border: none;
font-size: 0.9rem;
cursor: pointer;
text-align: center;

`;


// mypage 레이아웃
export const CalendarLayout = styled.div`
  // 좌우 패널을 가로로 배치하고 간격을 주는 
  display: flex;
  gap: 24px;

  @media (max-width:1024px){
    flex-direction: column;
}
`;

export const LeftPanel = styled.div`
  // 왼쪽 고정형 사이드바 영역  (모바일에서는 100%)
width: 320px;
flex-shrink: 0;

  @media (max-width:768px) {
   width : 100% ; //반응형레이아웃 pc화면전까지(세로정렬일때)
  }
`;

export const RightPanel = styled.div`
  // 오른쪽 본문 영역  (남은 공간 유연하게 차지)
  flex: 1;
  min-width: 0;
`;

// sidebar 내부 컴포넌트
export const AsideContainer = styled.div`
  // 사이드바 내부 전체를 감싸는 세로 정렬 박스 
width: 100%;
height: 100%;
padding: 24px 0;

display: flex;
flex-direction: column;

background-color:#fff;
`;

export const MenuSection = styled.div`
margin-bottom: 24px;
`;

export const SectionTitle = styled.h3`
  // 섹션 제목(카테고리명) 
color: #94a3b8;
font-size: 0.75rem;  
font-weight: 700;
margin-bottom: 5px;
padding: 0px 24px;
letter-spacing: 0.05em;
`;

export const MenuList = styled.ul`
  // 기본 리스트 스타일을 제거하는 메뉴 목록 
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const MenuItem = styled(Link)`
  // 라우터 링크를 활용한 개별 메뉴 아이템  (호버 효과 포함)
display: block;
padding: 10px 24px;
color: #475569;
font-size: 0.95rem;
font-weight: 500;
text-decoration: none;
transition: background-color 0.2s ease, color 0.2s ease;

  &:hover{
    color: #2563eb;
    background-color: #f1f5f9;
    border-right: 3px solid #2563eb;
  }
`;

//calendar 캘린더달력
export const CalTopMargin = styled.div`
  // 캘린더 상단 여백 껍데기
  margin-top: 1rem;
  
`;

export const CalWrapper = styled.div`
  // 캘린더 전체를 감싸는 메인 카드 박스 껍데기 (최대 너비, 그림자, 둥근 모서리 등)
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;

  background-color: #eee;
  border-radius: 20px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 6px rgba(0,0,0,.2);
`;

export const CalHeader = styled.h2`
  // 캘린더 상단 연도/월 타이틀 껍데기 (가운데 정렬)
  text-align: center;
  font-size:25px; 
  font-weight:700;
  margin-bottom:1.5rem; 
  color:#333;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const Grid = styled.div`
  // 7열 그리드 레이아웃 껍데기
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr)); //💙💘
  gap: 8px;

  //minmax(최소값0:min-width:0 👍✨, 최대값1fr:균등하게쫙쫙늘어남) =
  
`;

export const Dayname = styled.div`
  // 요일 이름(일~토) 표시 영역 껍데기 (첫째 주 일요일, 토요일 색상 분기)
  text-align: center;
  font-size: 1rem;
  padding-bottom: 10px;

  &:nth-child(1){
    color: #ff4d4f;
  }

  &:nth-child(7){
    color: #1890ff;
  }
`;


//💘visibility(마우스이벤트차단)+opacity(부드러운효과)
export const Tooltip = styled.div`
  // 툴팁 영역 껍데기
  font-size: 0.7rem;
  opacity: 0;
  position: absolute;
  bottom: 110%;
  left: 50%;
  transform: translateX(-50%);
  visibility: hidden; //자리미리확보
  background-color: gray;
  border-radius: 10px;
  padding: 5px;
  color: #fff;
  z-index: 10;
  transition: all 0.2s ease;
  
`;

interface DayCellProps {
    $isEmpty?: boolean;
    $isToday?: boolean;
    $isHoliday?: boolean;
    $isSunday?: boolean;
    $isSaturday?: boolean;
}

export const DayCell = styled.div<DayCellProps>`
  // 개별 날짜 칸 껍데기 (빈 칸 여부, 오늘, 공휴일, 주말에 따른 조건부 스타일링)
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  white-space: nowrap;

  min-height: 80px;
  border-radius: 10px;
  background-color: ${({$isEmpty})=>$isEmpty ? 'transparent': '#fefefe'}; 
  font-size:1rem;
  transition: all 0.3s ;
  pointer-events: ${({$isEmpty})=> $isEmpty ? 'none': 'auto'};
  //💘빈셀(Empty Cell)클릭(1일시작전)=> 모달, hover 효과발생 버그 방지

  color: ${({$isHoliday, $isSunday, $isSaturday})=> {
    if($isHoliday || $isSunday) return "#ff4d4f";
    if($isSaturday) return "#1890ff";
    return '#333'
  }};

  &:hover{
  background-color:${({ $isEmpty }) => ($isEmpty ? "transparent" : "#f8e3e3")};
  }

${({ $isToday }) =>
  $isToday &&
  `
    // font-weight: bold;
    // span {
    //   background-color: #4e73df;
    //   color: white;
    //   border-radius: 50%;
    //   padding: 2px 8px;
    // }

    background-color: #fff3ed;
    color: #ff6b6b;
    font-weight: bold;
    border: 1px dashed #ff6b6b;
`}

&:hover ${Tooltip} {
  opacity:1;
  visibility:visible;
}
  
  
`;

//일정모달 
export const ModalOverlay= styled.div`
position: fixed;
top:0;
left: 0; 
right: 0;
bottom: 0; //inset:0
width: 100%;
height: 100%;
background-color: rgba(0,0,0,.5);
display: flex;
justify-content: center;
align-items: center;
z-index: 10;
`;
export const ModalContainer= styled.div`
background-color: #eee;
max-width: 400px;
width: 100%;
padding: 24px;
border-radius: 20px;
box-shadow: 0 4px 12px rgba(0,0,0,.2);

`;
export const ModalHeader= styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 1rem;
`;
export const ModalTitle= styled.h3`
margin: 0;
font-size: 1.2rem;
font-weight: 700;
color: #333;
`;
export const CloseButton= styled.button`
transform: rotate(45deg);
font-size: 2rem;
color: #666;
border: none;
font-weight: 300;
line-height: 1; //회전 중심을 잡고 여백을 없애기 위해 유지 추천!
cursor: pointer;

width: 25px;
height: 25px;
border-radius: 50%;
background-color: #ddd;
display: flex;
justify-content: center;
align-items: center;

transition: all 0.2s;
&:hover{
  color: #111;
  background-color: #fff;
}
`;
export const ModalBody= styled.div``;

export const FormGroup= styled.div`
display: flex;
flex-direction: column;
gap: 10px;
margin-bottom: 1.3rem;
`;
export const Select= styled.select``;
export const TextArea= styled.textarea`
resize: none;
border: none;
outline: none;
border-radius: 16px;
height: 80px;
padding: 15px;
  border: 1px solid transparent;


&:focus{
  /* box-shadow: 0 2px 6px rgba(0,0,0,.2); */
  border: 1px solid #bac8f3;
}
`;
export const ButtonGroup= styled.div`
display: flex;
justify-content: flex-end;
gap: 8px;
`;

export const CustomButton= styled.button<{$primary?:boolean}>`
background-color: ${props=>props.$primary ? '#4e73df': '#858796'}  ; //
color: white;
border: none; 
border-radius: 20px;
font-size: 0.9rem;
cursor: pointer;
padding: 4px 12px;
min-width: 60px;
white-space: nowrap;

transition: background-color 0.15s ease-in-out;
&:hover{
  background-color:${props=>props.$primary ? '#2e59d9': '#717384'} 
}
`;

export const ScheduleList= styled.ul`
margin-top: 16px;
border-top: 1px solid #ddd;
max-height: 200px;
overflow-y: auto;
list-style: none;
padding: 0 10px;

//스크롤
&::-webkit-scrollbar{
  width: 5px;
}
&::-webkit-scrollbar-thumb{
  background: #ddd;
  border-radius: 99px;
}

&::-webkit-scrollbar-track{
  background: transparent;
}

&::-webkit-scrollbar-thumb:hover{
  background: #ccc;
}
`;
export const ScheduleItem= styled.li`
padding: 10px;
margin-top: 3px;
border-bottom: 1px solid #ddd;
color: #666;
font-size: 0.75rem;

display: flex;
flex-direction: column;
gap: 6px;

`;
export const ScheduleHeader= styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 10px;
`;
export const Badge= styled.span<{$status:'대기'|'진행'|'완료'}>`
border-radius: 20px;
background-color: ${({$status})=>$status === '대기' ? '#f59e0b' : $status==='진행' ? '#3d8df6' :'#109b81'};
padding: 4px 8px;
color: white;
font-size: 0.7rem;
font-weight: bold;
`;
export const SmallButton = styled.button`
border-radius: 20px;
outline: none;
border: 1px solid #d1d3e2;
font-size: 0.7rem;
padding: 4px 12px;
cursor: pointer;
transition: border-color 0.2s;
&:hover{
  border-color: #777;
}
`;
export const ScheduleDot= styled.div`
width: 12px;
height: 3px;
background-color: pink;
border-radius: 20px;
`;

//
// 🌟💙🌟커스텀 셀렉트 박스 컨테이너🌟💙🌟
export const CustomSelectContainer = styled.div`
  /* 💡 여기에 필요한 위치(position)와 너비, z-index를 채워보세요! */
  position: relative;
  width: 100%;
  z-index: 999;
`;

export const SelectTrigger = styled.div`
  padding: 10px 20px;
  background-color: #fff;
  border-radius: 20px;
  border: 1px solid #d1d3e2;
  font-size: 0.8rem;
  color: #333;
  cursor: pointer;

  display: flex;
  justify-content: space-between;
  &:hover{
      border-color: #bac8f3;

  }
`;

// 💙드롭다운 리스트 영역💙
export const SelectList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;

  padding: 0; //💙
  margin: -1px 0 0 0;

  border-radius: 16px;
  background-color: #fff;
  border: 1px solid #e2e8f0;
  list-style: none;
  box-shadow: 0 4px 6px rgba(0,0,0,.1);
  z-index: 999;
  overflow: hidden;
  cursor: pointer;
`;

interface SelectItemProps {
    $isSelected?: boolean;
}

// 드롭다운 개별 항목
export const SelectItem = styled.li<SelectItemProps>`
  /* 💡 기본 패딩, 폰트 사이즈, cursor 채우기 */
  padding: 10px 20px;
  font-size: 0.85rem;
  color: #475569;
  
  ${({$isSelected})=> $isSelected && `
    color: #4e73df;
    background-color: #f8f9fc;
    font-weight: bold;
  ` } 

  &:hover{
    background-color: #f1f5f9;
  }
`;

export const CircleButton = styled.div`
width: 23px;
height: 23px;
border-radius: 50%;
background-color: pink;
display: flex;
justify-content: center;
align-items: center;
font-weight: 400;
font-size: 20px;
color: #eee;
cursor: pointer;
`;