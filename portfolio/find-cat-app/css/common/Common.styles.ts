import {css} from "styled-components";

export const MainWhite =css`
background-color: #f1f3f5;
`;

export const deviceSizes = {
    mobile: "576px",
    tablet: "768px",
    desktop: "1024px",
};

export const FlexCenter = css`
display: flex;
justify-content: center;
align-items: center;
`;

export const FlexBetween = css`
display: flex;
justify-content: space-between;
align-items: center;
`;

export const FlexColumn =css`
display: flex;
flex-direction: column;
align-items: center;
`;

export const FlexAlignCenter =css`
display: flex;
align-items: center;
`;



export const  Boxshadow=css`
box-shadow: 0 1px 3px rgba(0,0,0,.05);
`;

export const BoxShadowHover = css`
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
 0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

//은은한 부유감(기본정적)
export const BoxShadowBasic= css`
box-shadow: 0 4px 8px -1px rgba(0, 0, 0, 0.05);
`;

//누르면안쪽으로
export const BoxShadowPressed = css`
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.1);
`;
export const  TransitionAll=css`
transition: all 0.2s ease-in-out;
`;

export const  Ellipsis=css`
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
min-width: 0; //필수⭐️
`;

export const Scrollbar = css`
&::-webkit-scrollbar{
    width: 5px;
}
&::-webkit-scrollbar-track {
    background: transparent; 
    border-radius: 50px;
  }
&::-webkit-scrollbar-thumb{
   background-color: #f1f2f7; 
    border-radius: 50px;
    transition: background-color 0.2s ease;
}
&::-webkit-scrollbar-thumb:hover {
    background-color: #dbddee; 
}
`;

export const NoScroll =css`

/* 크롬, 사파리, 오페라, 엣지 */
&::-webkit-scrollbar{
    display: none;
}
/* 파이어폭스 */
scrollbar-width: none;

/* 익스플로러 구형 엣지 */
-ms-overflow-style: none;
`;

//텍스트 드래그 방지 세트 (User Select)
export const Unselectable = css`
    -webkit-user-select: none; /* 사파리 / 크롬 */
    -moz-user-select: none;    /* 파이어폭스 */
    -ms-user-select: none;     /* 익스플로러 / 구형 엣지 */
    user-select: none;         /* 표준 */
`;

//완벽한 정중앙
export const AbsoluteCenter = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

//이미지꽉채우기 
export const ImageCover = css`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
`;

export const  WebkitBox=css`
display: -webkit-box; //플렉스박스 초기버젼..
-webkit-line-clamp: 2; //보여줄라인수
-webkit-box-orient: vertical;
`;
export const  Maxwidth=css`
max-width: 480px;
`;

export const Bottom0=css`
bottom: 0; left: 0; right: 0;
`;
export const Top0=css`
bottom: 0; left: 0; right: 0;
`;

export const M0auto = css`
margin:0 auto;
`;

// export const  =css``;
// export const  =css``;
// export const  =css``;
// export const  =css``;
// export const  =css``;
// export const  =css``;


