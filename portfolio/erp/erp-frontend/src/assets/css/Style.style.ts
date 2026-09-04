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
max-width: 1000px;
margin: 0 auto;
background-color: #eee;
border: 1px solid  #e0e0e0;
border-radius: 20px;
box-shadow: 0 4px 6px rgba(0,0,0,.5);

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
export const Tooltip= styled.div`

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


`;

// export const = styled.div``;
// export const = styled.div``;
// export const = styled.div``;
// export const = styled.div``;
// export const = styled.div``;
// export const = styled.div``;
// export const = styled.div``;