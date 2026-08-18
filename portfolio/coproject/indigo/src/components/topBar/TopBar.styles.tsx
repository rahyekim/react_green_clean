
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
    border-color: #4e73df; 
    /* box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);  */
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

//드롭다운
export const UserMenuContainer= styled.div`
position: relative;
display: flex;
align-items: center;
`;
//클릭하는 프로필 영역(이름+사진)
export const UserProfileToggle= styled.div`
display: flex;
align-items: center;
cursor: pointer;
padding: 0.5rem;
color: #858796;
span{
    margin-right: 0.75rem;
    font-size: 0.85rem;
    font-weight: 400;
}
img{
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    object-fit: cover; //
}

&:hover{
    color: #5a5c69;
}
`;

//🔥드롭다운 하얀색 박스🔥
export const DropdownMenu= styled.div<{$isOpen:boolean}>`
/*isOpen이 true일때만 화면에 보이게 해줌 */
display: ${({$isOpen})=>$isOpen ? 'block' : 'none'};
position: absolute;
top: 100%; //부모의 바로 아래
right: 0;  //오른쪽 끝
margin-top: 0.5rem;
padding: 0.5rem 0;
width: 12rem;
background-color: #fff ;
border-radius: 0.35rem ;
box-shadow: 0 0.15rem 1.75rem 0 rgba(58,59,69,0.2);
border: 1px solid #eee;
z-index: 999;
animation: fadein .2s ease-in-out;

@keyframes fadeIn{
    from {   //시작지점
        opacity: 0;  //투명
        transform: translateY(-10px); //위쪽으로 10px둥둥
    } 
    to{ 
        opacity: 1; 
        transform: translateY(0); //제자리로
    }
}
`;
/*


 */

export const DropdownItem= styled.div`
display: flex;
align-items: center;
width: 100%;
padding: 0.5rem 1.5rem;
font-size: 0.85rem;
color: #3a3b45;
cursor: pointer;

i{
    margin-right: 0.75rem;
    color: #d1d3e2;
    font-size: .85rem;
}

&:hover{
    border-radius: 5px;
    /* background-color: #f8f9fc; */
    color: #2e59d9;
    i{
        color: #2e59d9;
    }
}
`;
//메뉴사이의 얇은 실선(구분선)
export const DropdownDivider= styled.div`
height: 0;
margin: 0.5rem 0.5rem;
overflow: hidden;
border-top: 1px solid #eaecf4;
`;
// export const = styled.div``;
// export const = styled.div``;
// export const = styled.div``;