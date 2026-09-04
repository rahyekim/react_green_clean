import styled from "styled-components";

//footer
export const SiteFooterWrapper = styled.footer`
background-color: #181818;
padding: 10px 15px 90px 15px ;
width: 100%;
/* display: flex;
justify-content: space-between; ///????
align-items: center;  */
border-top: 1px solid #eee;
`;
export const SiteFooterInner = styled.div`
max-width: 1860px;
width: 100%;
margin: 0 auto;
padding: 10px 15px;
@media (max-width:1024px){
    /////
}
`;
export const SiteFooterTop = styled.div`
display: flex;
justify-content: space-between;
align-items: flex-start;
padding-bottom: 40px;
padding-top: 40px;
margin-bottom: 40px;


@media  (max-width:1024px) {
  flex-direction:column ;
}
`;
export const SiteFooterCs = styled.div`
flex: 1;
`;
export const SiteFooterPhone = styled.div`
color: azure;
font-size: 32px;
font-weight: 900;
letter-spacing: 1px;
margin-bottom: 10px;
`;
export const SiteFooterCsTitle = styled.div`
font-size: 14px;
color: #fff;
font-weight: bold;
`;
export const SiteFooterScheduleWrap = styled.div`
flex: 2;
display: flex;
gap: 60px;

@media  (max-width:768px) {
  flex-direction:column ;
  gap: 20px;
}
`;
export const SiteFooterScheduleBlock = styled.div`
display: flex;
flex-direction: column;
gap: 8px;
`;
export const SiteFooterScheduleTitle = styled.div`
font-size: 14px;
font-weight: bold;
color: #eee;
margin-bottom: 3px;
`;
export const SiteFooterScheduleText = styled.div`
font-size: 13px;
font-weight: bold;
color: #999;
letter-spacing: -0.5px;
`;

export const SiteFooterLocationBtn = styled.button`
flex: 0.5;
height: 48px;
padding: 0 30px;
border: 1px solid #999;
border-radius: 10px;
background-color: transparent;
color: #fff;
font-weight: bold;
font-size: 14px;
cursor: pointer;
white-space: nowrap;
transition: all 0.3s ease-in-out;

&:hover{
    color: #222;
    background-color: rgba(255,255,255,.5) ;
}

@media (max-width:1024px){
    width: 100%;
    margin-top: 30px;
    padding: 10px;
    max-width: 250px;

}
`;
export const SiteFooterBottom = styled.div`
display: flex;
justify-content: space-between;
align-items: flex-end;

padding-top: 20px;
border-top: 0.5px solid #777;

@media (max-width:1024px) {
   flex-direction: column;
   align-items: flex-start;
   gap: 30px;
}
`;
export const SiteFooterCompany= styled.div`
display: flex;
flex-direction: column;
`;
export const SiteFooterCompanyName = styled.h2`
font-size:24px;
font-weight: 800;
margin-bottom: 20px;
color: white;
`;
export const SiteFooterInfoText = styled.p`
margin: 0;
font-size: 14px;
color: #999;
line-height: 1.6; //행간
letter-spacing: 0.3px;
`;
export const SiteFooterBottomRight = styled.div`
display: flex;
flex-direction: column;
align-items: flex-end;
gap: 20px;

@media (max-width:1024px){
    align-items: flex-start;
    width: 100%;
}
`;
export const SiteFooterPolicyWrap = styled.div`
display: flex;
gap: 10px;
`;
export const SiteFooterPolicyBtn = styled.button`
background-color: rgba(255,255,255,.5);
border: 1px solid rgba(255,255,255,.1);
border-radius: 5px;
color: white;
font-size: 12px;
padding: 8px 12px;
cursor: pointer;
transition: all 0.2s ;

&:hover{
    background-color: #333;
    color: #eee;
}
`;
export const SiteFooterFamilyTitle = styled.div`
font-size: 16px;
font-weight: bold;
color: #ccc;
margin-bottom: 20px;
`;
export const SiteFooterFamilyLogos = styled.div`
display: flex;
gap: 15px;
align-items: center;
flex-wrap: wrap;
font-size: 12px;
color: #999;

.logo-placeholder{
    border-radius: 15px;
    border: 1px solid #999;
    padding: 3px 10px;
}

`;

export const FloatingMenuWrapper = styled.div`
position: fixed;
right: 30px;
bottom: 90px;
display: flex;
flex-direction: column;
gap: 15px;
z-index: 999999;

@media (max-width:768px){
    right: 15px;
    bottom: 20px;
    transform: scale(0.85);
}
`;
export const FloatingMenuItem = styled.div`
display: flex;
flex-direction: column;
/* align-items: center; */
gap: 5px;
cursor: pointer;
`;
export const FloatingMenuIcon = styled.div<{ $bgColor: string }>`
width: 60px;
height: 60px;
border-radius: 50%;
display: flex;
justify-content: center;
align-items: center;
background-color: ${({$bgColor})=>$bgColor || 'transparent'};
color: #111;
font-weight: 900;
font-size: 16px;
box-shadow: 0 4px 12px rgba(0,0,0,.5);
transition: transform 0.2s;
&:hover{
    transform: translateY(-5px);
}

svg{
    width: 30px;
    height: 30px;
    color: #fff;
}
`;
export const FloatingMenuText = styled.span`
text-align: center;
font-size: 12px;
color: #fff;
font-weight: bold;
letter-spacing: 0.5px;

background-color: #111;
border-radius: 10px;
border: 1px solid #222;

padding: 3px 8px;
cursor: pointer;
`;