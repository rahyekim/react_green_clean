

/*
1. Styled-Components 수정 (sub.styled.ts)
FileUpload를 그냥 빈 태그가 아니라,
 사용자가 클릭할 수 있는 예쁜 커스텀 버튼 모양으로 만들어줍니다.

// 1. 진짜 파일 input은 화면에서 숨깁니다!
export const HiddenFileInput = styled.input`
    display: none;
`;

// 2. 사용자가 눈으로 보고 누를 예쁜 커스텀 업로드 버튼
export const CustomFileButton = styled.label`
    display: inline-block;
    width: 100%;
    padding: 10px;
    background-color: #007bff; // 파란색 버튼 예시
    color: #ffffff;
    text-align: center;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    margin-top: 10px;
    transition: background-color 0.2s;

    &:hover {
        background-color: #0056b3; // 마우스 올렸을 때 진한 파란색
    }
`;


2. TSX 컴포넌트 적용 (WorkSetting.tsx)
리액트 컴포넌트 안에서는 <label>과 htmlFor(또는 ref)를 활용해 연결하거나,
 <label> 안에
 <input type="file">을 통째로 쏙 집어넣는 가장 쉬운 방법을 쓰면 됩니다.

 {/* 포트폴리오 이미지 업로드 반복문 안쪽 *
<S.DivKey key={img.id}>
    {/* 미리보기 이미지가 있으면 보여주고 없으면 회색 빈박스 보여줌 *
    {img.previewUrl ? (
        <S.Relative>
            <img src={img.previewUrl} alt={`미리보기 ${idx+1}`}/>
            <button onClick={()=>handleRemoveImg(img.id)}>X</button>
        </S.Relative>
    ) : (
        <S.NoneImage>
            이미지 {idx+1}
        </S.NoneImage>
    )}

    {/* 🌟 핵심: label로 input을 감싸거나 연결하기 
    <S.CustomFileButton>
        {img.previewUrl ? "이미지 변경" : "파일 업로드"}
        <S.HiddenFileInput 
            type="file" 
            accept="image/*" // 이미지만 선택 가능하게 제한
            onChange={(e) => handleFileChange(img.id, e)} 
        />
    </S.CustomFileButton>
</S.DivKey>

💡 어떻게 동작하는 건가요?
화면에는 멋지게 디자인된 S.CustomFileButton(label)만 보입니다.

사용자가 이 파란색 버튼을 클릭하면, 그 안에 숨어있던 S.HiddenFileInput(<input type="file">)이 대신 클릭된 것처럼 작동해서 컴퓨터의 파일 창이 뜹니다.

파일을 선택하면 기존에 만드신 handleFileChange 함수가 정상적으로 실행됩니다!
 
 */