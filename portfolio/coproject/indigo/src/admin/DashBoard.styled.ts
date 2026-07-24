
import styled from "styled-components";

export const PageHeader = styled.div`

display: flex;
align-items: center;
justify-content: space-between;
margin-bottom: 1.5rem;
h1{
    font-size: 1.75rem;
    font-weight: 400;
    color:#5a5c69;
    margin: 0;
}
`;
//⭐그리드 GridRow & CardColumn
export const GridRow = styled.div`

display: flex;
flex-wrap: wrap;
margin-right: -0.75rem; //컬럼의 padding(0.75rem)만큼 다시 당겨주는 것
margin-left: -0.75rem; 
//⭐컬럼 padding 보정:카드가 전체 컨테이너 양 끝에 딱 닿게
`;

export const CardColumn = styled.div`

flex: 0 0 25%;
/* grow:0 여유공간이 있어도 커지지 않고
shrink:0 공간이 부족해도 줄어들지 않고 
basis: 25% 기본 너비는 부모의 25% */

max-width: 25%; // 1200px이상은 카드4개
padding-right: 0.75rem;
padding-left: 0.75rem;
margin-bottom: 1.5rem;

@media (max-width:1200px) {flex: 0 0 50%; max-width:50%;} 
// 768~1200 태블릿 :카드 2개
@media (max-width:768px) {flex: 0 0 100%; max-width:100%;}
//모바일 768이하는 카드 1개
`;

export const StatCard = styled.div<{borderColor:string}>`

position: relative;
display: flex;
flex-direction: column;
min-width: 0; /* Flexbox 찌그러짐 방지용 필수: 내용물을 보호하려는 고집(최소 크기 제한)을 0px로 리셋-> 카드틀 유지*/
//flex디폴트가 min-width:auto(최소너비를 꽉 잡고있음)=> 터짐..상자 바깥으로 삐져나가는 버그를 막아주는 강력한 안전장치
word-wrap: break-word; //장문이 나왔을때 끊어줘..
background-color: #fff;
background-clip: border-box; //하얀 배경색이 테두리 끝까지 깔끔하게 채워지도록 하는 배경 설정
border: 1px solid #e3e6f0;
border-radius: 0.35rem;
border-left: 0.25rem solid ${props=> props.borderColor};
box-shadow: 0 0.15rem 1.75rem 0 rgba(58,59,69,0.15);
height: 100%;
padding: 0.5rem 0;
`;


export const CardBody = styled.div`

flex: 1 1 auto;  //세로 높이를 균일하게 맞추기 위한 핵심 기술(세로 높이 100% 팽창용 스위치)
//부모 높이가 커졌을 때 세로로 남는 빈 공간을 꽉 채워서(grow) 내용물을 수직 정중앙에
padding: 1.25rem;
display: flex; 
justify-content: space-between;
align-items: center;

`;

/* 🔥flex: 1
flex-direction: row (가로) 상태일 때 flex: 1 ➔ 가로 너비(Width)를 늘림
flex-direction: column (세로) 상태일 때 flex: 1 ➔ 세로 높이(Height)를 늘림
 */


//📝🔥 join 가입-> ☑️로그인
export const Background = styled.div`

background-color: #4e73df;
background-image: linear-gradient(180deg, #4e73df 10%, #224abe 100%);
background-size: cover;
min-height: 100vh ;
display: flex;
align-items: center;
justify-content: center;
`;

//📬 다음 우편번호 모달 배경(어둡게 처리)
export const ModalBackground = styled.div`

position: fixed; 
top:0; left:0;   //왼쪽위 시작점.. 화면 전체 덮기
width: 100%;
height:100%;
background: rgba(0,0,0,0.5); //반투명
display: flex;
align-items: center;
justify-content: center; //모달을 정중앙에
z-index: 999;

`;

//📨 다음 우편번호 컴포넌트를 감싸는 박스 
export const PostcodeWrapper = styled.div`

width: 400px;
max-width: 90%;
background: #fff;
padding: 20px;
border-radius: 8px;
box-shadow: 0 4px 12px rgba(0,0,0,0.2);
/* 닫기 버튼을 감싸는 영역 */
.close-btn-wrap{
    text-align: right;
    margin-bottom: 10px;
}
`;





