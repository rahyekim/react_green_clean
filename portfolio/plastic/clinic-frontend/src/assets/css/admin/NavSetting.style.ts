import styled from "styled-components";
import { BlueButtonTheme, BoxShadow, FlexBetween, FlexCenter, FlexColumn, FlexRow, TransitionAll } from "../Common.style";

export const NavContainer= styled.div`
width: 100%;
min-height: 100vh;
`;
export const PageHeader= styled.header`
${FlexBetween}
margin-bottom: 1.5rem;
`;
export const PageTitle= styled.h1`
margin: 0;
font-size: 1.5rem;
color: #5a5c69;
font-weight: 700;
`;
export const SaveButton= styled.button`
${FlexCenter}
gap: 8px;
border: none;
${BlueButtonTheme}
font-size: 0.9rem;
font-weight: 600;
border-radius: 10px;
padding: 0.6rem 1.2rem;
${BoxShadow}
${TransitionAll}
cursor: pointer;

`;
export const ContentGrid= styled.div`
${FlexColumn} 
gap:1.5rem;
`;
export const Card= styled.div`
background-color: #fff;
border-radius: 10px;
${BoxShadow}
border: 1px solid #e3e6f0;
overflow: hidden;
`;
export const CardHeader= styled.header`
background-color: #f8f9fc;
border-bottom: 1px solid #e3e6f0;
padding: 1rem 1.25rem;
`;
export const CardTitle= styled.h6`
margin: 0;
font-weight: 700;
color: #4e73df;
font-size: 1rem;
`;
export const CardBody= styled.div`
padding: 1.5rem;
color: #858796;
p{
    margin-top: 0;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
}
flex: 1;
display: flex;
flex-direction: column;
justify-content: space-between;

`;
export const RadioGroup= styled.div`
display: flex;
gap: 10px;
margin-bottom: 1.5rem;
`;
export const RadioLabel = styled.label<{$isActive:boolean}>`
cursor: pointer;
${FlexCenter};
gap: 0.5rem;
padding: 0.8rem 1.5rem;
border-radius: 10px;
background-color: #fff;
border: 1px solid #d1d3e2;
color: #858796;
font-weight: 600;
${TransitionAll};
${({$isActive})=> $isActive && `
background-color: #eaecf4;
border: 1px solid #4e73df; 
color: #4e73df;
`}

&:hover{
    background-color:#f8f9fc;
}
`;

export const NavInputWrapper= styled.div`
${FlexColumn}
gap: 0.5rem;
background-color: #f8f9fc ;
padding: 1.5rem;
border-radius: 10px;
border: 1px solid #e3e4f0;
`;

export const NavLabel= styled.label`
font-size: 0.85rem;
font-weight: 700;
color: #5a57a9;


`;
export const NavInput = styled.input`
width: 100%;
padding: 0.7rem 1.2rem;
font-size: 0.9rem;
background-color: #fff;
border: 1px solid #d1d3ee;
border-radius: 10px;
outline: none;
${TransitionAll}
&:focus{
    border-color: #4273df;
}

`;


export const FileInputWrapper= styled.div`
${FlexCenter}
gap: 1.2rem;
.filename{
    font-size: 0.9rem;
    color: #858796;
}
 `;

export const FileInput= styled.input`
display: none;
`;
export const FileLabel= styled.label`
background: #fff;
border: 1px solid #d1d3ee;
padding: 0.5rem 1rem;
border-radius: 0.35rem;
font-size: 0.85rem;
font-weight: 600;
color: #5a5c69;
cursor: pointer;

//텍스트 찌그러짐 방지
white-space: nowrap;
flex-shrink: 0;
&:hover{
    background-color: #eaecf4;
}
`;
export const MenuList= styled.div`
/* 🌟 flex 대신 grid로 변경 */
  display: grid;
  /* 핵심: 화면 너비가 허락하는 한 알아서 3~4개씩 카드를 꽉 채워 배치 (최소 220px 유지) */
grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
gap: 1rem;
background-color: #f8f9fc;
border-radius: 10px;
border: 1px solid #e3e6f0;
${BoxShadow}
padding: 1rem;

@media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

.menu-number{
    font-weight: 900;
    width: 20px;
}
`;
export const MenuItem= styled.div`
${FlexCenter};
gap: 15px;
background-color: #f8f9fc;
border-radius: 8px;
border: 1px dashed #e3e6f0;
padding: 18px;
box-sizing: border-box;
`;
export const DeleteButton= styled.button`
background: transparent;
border-radius: 50%;
border: none;
outline: none;
color: rgba(197, 49, 98, 0.87);
cursor: pointer;
${FlexCenter}
padding: 0.5rem;
${TransitionAll}
&:hover{
    background-color: #fdeaea;
}
`;
export const AddButton= styled.button`
${FlexCenter}
border: none;
border-top: 1px dashed #b7b9cc;
color: #5a5c69;
padding: 0.8rem;
border-radius: 10px;
font-weight: 600;
gap: 0.5rem;
${TransitionAll}
&:hover{
    background-color: #eaecf4;
    color: #858796;
}
`;


// export const = styled.div``;
// export const = styled.div``;
// export const = styled.div``;


export const fileinputwrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;

  /* 🌟 파일이 선택되었을 때와 아닐 때 텍스트 스타일 다르게 주기 */
  .filename {
    font-size: 0.85rem;
    color: #64748b;
    background-color: #f1f3f9;
    padding: 0.4rem 0.8rem;
    border-radius: 0.375rem;
    max-width: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border: 1px dashed #cbd5e1; /* 점선 테두리로 파일 상자 느낌 주기 */
  }
`;

export const fileinput = styled.input`
  display: none;
`;

export const filelabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #ffffff;
  border: 1px solid #cbd5e1;
  padding: 0.55rem 1.1rem;
  border-radius: 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #334155;
  cursor: pointer;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  ${TransitionAll}

  /* 🌟 마우스 올렸을 때 살짝 떠오르는 느낌과 포인트 컬러 */
  &:hover {
    background-color: #f8fafc;
    border-color: #94a3b8;
    color: #0f172a;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  }

  /* 🌟 클릭할 때 꾹 눌리는 손맛 */
  &:active {
    transform: scale(0.98);
  }
`;



/*
<S.FileInputWrapper>
  <S.FileLabel htmlFor="file-upload">
    {/* 업로드 아이콘을 같이 넣어주면 훨씬 예쁩니다 */}
    파일 선택
  </S.FileLabel>
  
  <S.FileInput 
    id="file-upload" 
    type="file" 
    onChange={handleFileChange} 
  />

  {/* 파일이 선택되었을 때만 이름 표시, 안 되었으면 안내문구 */}
  <span className="filename">
    {fileName ? fileName : '선택된 파일 없음'}
  </span>
</S.FileInputWrapper>

 */