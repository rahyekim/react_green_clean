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
margin: ${props=>props.$margin || '1.5rem'};
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
`;

//---------------여기까지 Member 회원가입이랑 같음---------------------------

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


export const SocialButton= styled(Button)<{$provider:'google'|'insta'}>`
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

&:hover {
    color: #eee;
  }
`;

export const Description= styled.div`
text-align: center;
font-size: 0.875rem;
color: #6e707e;
margin-bottom: 1.5rem;
line-height: 1.5;
`;


//calendar캘린더
export const CalTopMargin= styled.div`
margin-top: 2rem; 
`;
export const CalWrapper= styled.div`
width: 100%;
max-width: 600px;
margin: 0 auto;
background-color: #eee;
border: 1px solid  #e0e0e0;
border-radius: 20px;
box-shadow: 0 4px 6px rgba(0,0,0,.4);

padding: 40px 20px 30px 20px; ////
`;
export const CalHeader= styled.h2`
text-align: center;
font-size: 32px; 
font-weight: 700;
margin: 0;
margin-bottom: 1.5rem;
color: #333;
`;
export const Grid= styled.div`
display: grid;
grid-template-columns: repeat(7, 1fr);
gap: 8px;
`;
export const Dayname= styled.div`
text-align: center;
font-size: 1rem;
padding-bottom: 10px;

//부모 안에서 n번째에 있는 자식 요소
&:nth-child(1){
    color: #ff4d4f;
}

&:nth-child(7){
    color: #1890ff;
}

`;

//🔹툴팁🔸
export const Tooltip= styled.div`
  visibility: hidden;
  position: absolute;
  bottom: 110%; //맨위 바깥으로 10%더띄움
  left: 50%;
  transform: translateX(-50%); //가운데정렬
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  text-align: center;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  white-space: nowrap;
  z-index: 10;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
`;
export const DayHeader= styled.div`
display: flex;
align-items: flex-start;
gap: 2px;
/* width: 100%; //이거하면 날짜가 첫머리로감 */ 
`;
interface DayCellProps{
    $isEmpty?:boolean;
    $isToday?:boolean;
    $isHoliday?:boolean;
    $isSunday?:boolean;
    $isSaturday?:boolean;
}
export const DayCell= styled.div<DayCellProps>`
position: relative;
display: flex;
flex-direction: column;
align-items: center;
height: 80px;
border-radius: 8px;
border: 1px solid #eee;
font-size: 1.2rem;
background-color: ${({$isEmpty})=>$isEmpty ? 'transparent': '#eee2e2'}; //#fafafa
pointer-events: ${({$isEmpty})=>$isEmpty ? 'none':'auto'};

color: ${({$isHoliday, $isSunday, $isSaturday})=>{
    if($isHoliday || $isSunday ) return '#ff4d4f';
    if($isSaturday) return '#1890ff';
    return '#333';
}};

font-weight: ${({$isToday})=>$isToday ? 'bold':'normal'};
border: ${({$isToday})=>$isToday ? '2px dashed #4e73df': '1px solid transparent'};

transition: background-color 0.2s ;
&:hover{
    background-color: ${({$isEmpty})=>$isEmpty ? "transparent":'#f8dced'}; //#f0f0f0
}
cursor: pointer;

//🔹툴팁 자식🔸
&:hover ${Tooltip} {
    visibility: visible;
    opacity: 1;
  }

`;
//mypage
export const CalendarLayout= styled.div`
display:flex;
gap: 24px;

@media (max-width:1024px){
    flex-direction: column;
}
`;
export const LeftPanel= styled.div`
width: 320px;
flex-shrink: 0;
//PC 화면 (> 1024px): 너비 320px의 고정형 사이드바
//모바일/태블릿 화면 (≤ 1024px): 너비 100%로 퍼져서 화면을 시원하게 채우는 박스
@media (max-width:1024px){
    width: 100%; ///🌟반응형 레이아웃(세로 정렬)
} 
`;
export const RightPanel= styled.div`
flex: 1;
min-width: 0;
`;

//sidebar
export const AsideContainer= styled.div`
width: 100%;
height: 100%;
padding: 24px 0;
display: flex;
flex-direction: column; 
background-color:#fff;
`;
export const MenuSection= styled.div`
margin-bottom: 24px;
`;
export const SectionTitle= styled.h3`
padding: 0px 24px;
font-size: 0.75rem;  
font-weight: 700;
margin-bottom: 8px;
letter-spacing: 0.05em; //em
`;
export const MenuList= styled.ul`
list-style: none;
padding: 0;
margin: 0;

`;
export const MenuItem= styled(Link)`
display: block;
padding: 10px 24px;
color: #475569;
text-decoration: none;
font-size: 0.95rem;
font-weight: 500;
transition: background-color 0.2s ease, color 0.2s ease;

&:hover{
    background-color: #f1f5f9;
    color: #2563eb;
    border-right: 3px solid #2563eb;
}
`;

//일정모달 
export const ModalOverlay= styled.div`
position: fixed;
width: 100%; 
height: 100%;
inset: 0; // top, right, bottom, left 모두 0 (꽉 채우기)
z-index: 999;
background-color: rgba(0,0,0,.7);

display: flex;
justify-content: center;
align-items: center;
`;
export const ModalContainer= styled.div`
background-color: #eee;
width: 100%;
max-width: 400px;
padding: 24px;
border-radius: 15px;
box-shadow: 0 4px 12px rgba(0,0,0,.2);
`;
export const ModalHeader= styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 1rem;
`;
export const ModalTitle= styled.h3`
font-size: 1.2rem;
font-weight: 800;
color: #333;
margin: 0;
`;

export const ModalBody= styled.div``;

export const CloseButton= styled.button`
/* background: #fff;
width: 20px;
height: 20px;
border: 1px solid #fff;
border-radius: 50%; */
border: none;
font-size:2rem;
font-weight: 300;
line-height: 1;
color: #666;
cursor: pointer;

display: flex;
align-items: center;
justify-content: center;
transform: rotate(45deg); //✨🌟 +를 회전시켜
transition: transform 0.2s ease, color 0.2s ease ;

&:hover{
    color: #111;
    /* border-color: #d1d3e2; */
    transform: rotate(135deg);
}
`;

export const FormGroup= styled.div`
display: flex;
flex-direction: column;
gap: 8px;
margin-bottom: 1.3rem;
`;
export const Select= styled.select`
padding: 8px;
border: 1px solid #d1d3e2;
border-radius: 15px;
outline: none;
font-size: 0.9rem;
padding-left: 20px;
`;
export const TextArea= styled.textarea`
padding: 8px;
border: 1px solid #d1d3e2;
border-radius: 15px;
outline: none;
resize: none; 
height: 80px;
font-size: 0.9rem;
padding-left: 20px;
`;
export const ButtonGroup= styled.div`
display: flex;
justify-content: flex-end;
gap: 8px;
white-space: nowrap;
margin-top: 16px;

& > button{
    width: auto !important;
    min-width: 80px;
    padding: 8px 16px !important;
    flex: none;
}
`;
export const ScheduleList= styled.ul`
list-style: none;
padding: 0 10px;
margin: 16px 0 0 0 ;
max-height: 250px;
overflow-y: auto;
border-top: 1px solid #ddd;

/* 💡 1. 스크롤바 전체 너비 설정 */
  &::-webkit-scrollbar {
    width: 5px; 
  }

  /* 💡 2. 스크롤바 배경 (지나다니는 길) */
  &::-webkit-scrollbar-track {
    background: transparent; 
  }

  /* 💡 3. 스크롤바 막대 (움직이는 바) */
  &::-webkit-scrollbar-thumb {
    background: #d1d3e2; /* 연한 회색빛 막대 */
    border-radius: 3px;  /* 둥글게 처리 */
  }

  /* 💡 4. 마우스 올렸을 때 막대 색상 */
  &::-webkit-scrollbar-thumb:hover {
    background: #b0b3c6; 
  }
`;
export const ScheduleItem= styled.li`
display: flex;
flex-direction: column;
gap: 8px;
padding: 12px 0;
border-bottom: 1px solid #ddd;
`;
export const ScheduleHeader= styled.div`
display: flex;
justify-content: space-between;
align-items: center;
font-size: 0.85rem;
color: #666;
width: 100%;
`;

export const Badge= styled.span<{$status:'대기'|'진행'|'완료'}>`
padding: 4px 8px;
border-radius: 12px;
font-size: 0.75rem;
font-weight: bold;
color: white; 
background-color: ${props=>props.$status === '진행' && '#3d8df6' };
background-color: ${props=>props.$status === '완료' && '#109b81' };
background-color: ${props=>props.$status === '대기' && '#f59e0b' };

`;
export const SmallButton = styled.button`
background-color: transparent;
border: 1px solid #d1d3e2;
border-radius: 8px;
padding: 4px 8px;
font-size: 0.75rem;
cursor: pointer;
`;
export const ScheduleDot= styled.div`
width: 6px;
height: 6px;
background-color: #3d8ef6;
border-radius: 50%;
margin-top: 8px;
`;

//🌟💙🌟커스텀 셀렉트 박스 컨테이너🌟💙🌟
export const CustomSelectContainer= styled.div`
position: relative;
width: 100%;
z-index: 999;

`;
export const SelectTrigger= styled.div`
padding: 10px 12px;
border: 1px solid #d1d3e2;
border-radius: 16px;
background-color: #fff;
font-size: 0.9rem;
cursor: pointer;

display: flex;
justify-content: space-between;
align-items: center;

color: #333;
&:hover{
    border-color: #bac8f3;
}
`;

//💙드롭다운 리스트 영역💙
export const SelectList= styled.ul`
position: absolute;
top: 100%;  
left:0;
width: 100%;
margin: -1px 0 0 0 ;
padding: 0;
list-style: none;
background-color: #fff;
border: 1px solid #e2e8f0;
border-radius: 16px;
box-shadow: 0 4px 12px rgba(0,0,0,.1);
z-index: 50;
overflow: hidden;
`;

interface SelectItemProps{
    $isSelected?:boolean
}
//드롭다운 개별 항목
export const SelectItem= styled.li<SelectItemProps>`
padding: 10px 12px;
font-size: 0.9rem;
cursor: pointer;
color: ${({$isSelected})=>$isSelected ? '#4e73df':'#475569'};
background-color:  ${({$isSelected})=>$isSelected ? '#f8f9fc': 'transparent'};
font-weight:  ${({$isSelected})=>$isSelected ? 'bold': 'normal'};;

&:hover{
    background-color: #f1f5f9;
}
`;

// export const = styled.div``;
// export const = styled.div``;