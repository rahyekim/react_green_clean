
import styled, {keyframes} from "styled-components";

//무한롤링애니메이션(from to 해두됨)

const rolling = keyframes`
0%{
    transform: translateX(0);
}

100%{
    transform: translateX(-50%);
}
`;

export const BannerWrapper = styled.div`
width: 100%;
overflow: hidden;
background:linear-gradient(90deg, #ffe5f1 0%, #ebd4ff 100%);
padding: 14px 0;
display: flex;
`;

export const Track = styled.div`
display: flex; //가로로 나란히 배치
width: fit-content; //🌟내용물 크기에 딱 맞추겠다(원본+복제본)
white-space: nowrap; 
`;

//똑같은 텍스트 그룹 2개 교대 보여주기위한 애니메이션 적용
export const TextGroup= styled.div`
display: flex;
animation: ${rolling} 20s linear infinite;
//무한 루프 애니메이션 
//지속시간 한바퀴도는데 23초 
//linear:일정한 속도 //infinite:무한반복
`;
export const TextItem= styled.span`
font-size: 15px;
font-weight: 800;
color: #fff;
letter-spacing: 1px;
margin-right: 30px;
text-shadow: 2px 2px 10px gray;
`;
// export const = styled.div``;
// export const = styled.div``;
// export const = styled.div``;
// export const = styled.div``;
// export const = styled.div``;
// export const = styled.div``;
