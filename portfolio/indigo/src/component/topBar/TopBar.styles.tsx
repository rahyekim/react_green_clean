
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

