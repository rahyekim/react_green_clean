
import { text } from "node:stream/consumers";
import styled from "styled-components";

export const TopBarContainer = styled.nav`

height: 4.375rem; //70px
display: flex;
align-items: center;
justify-content: space-between;

padding: 0 1.5rem;
background-color: #fff;
box-shadow: 0 0.15rem 1.75rem 0 rgba(58,59,69,0.15);
margin-bottom: 1.5rem;

flex-shrink: 0; 
// 🌟 "내용물이 아무리 많아져도 나(TopBar)는 절대 찌그러지지 마라!" 고정!


`;

export const TopBarSearch = styled.form`

/* display: inline-block; 옛유물..*/
display: flex;           /* 👈 변경! */
align-items: center;     /* 세로 중앙 정렬 */
margin-left: 1rem; //토글버튼과의 공간
margin-right: auto; //남는 공간을 모두 차지해서 오른쪽 요소들을 끝으로 밀어냄
/*현재는 두개라 상관없지만 중요.
❄️margin-right:auto => 남는 공간만큼 커져라:오른쪽에 남는 모든 여백을 내가 다 밀어내서 차지하겠다!
|버튼|       |검색|        |사용자| : justify-space-between
|버튼|검색|----------------|사용자| ❄️  maring:auto 더 우선순위 강력크!
*/
`;

export const TopBarNavBar = styled.ul`
display: flex;
align-items: center;
list-style: none;
margin: 0;
padding: 0; /* ul 기본 패딩 제거 */
/* <ul> 태그는 브라우저 기본값으로 왼쪽 패딩(padding-left: 40px) */
`;

export const TopBarSearchInput= styled.input.attrs({type:"text"})` //선택자 input[type="text"]
padding: 10px 15px;
width: 250px;
border-radius: 8px;
border: 1px solid #e5e7eb;
outline: none;
transition: all 0.3s ease-in-out;

&:focus {   
    
    background-color: #fff;
    border-color: #6366f1; 
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1); 
  }
`;
export const SearchResultWrap= styled.div`

margin-top: 30px;

h3{
    border-bottom: 2px solid #333;
    padding-bottom: 10px;
}
`;

export const SearchUserResultWrap= styled.div`

margin-top: 20px;

h5{
    color: #0d6efd;
}
`;

export const SearchBlogResultWrap= styled.div`

margin-top: 20px;

h5{
    color: #198754; 
}
`;
export const Datespan= styled.span`
color: #888;
margin-right: 10px;
`;

export const SearchQResultWrap= styled.div`
margin-top: 20px;

h5{
    color: #dc3545; 
}
`;

// export const = styled.div``;
// export const = styled.div``;
// export const = styled.div``;
// export const = styled.div``;