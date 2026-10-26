import styled, { keyframes, Keyframes } from "styled-components";

import {
  FlexBetween,
  FlexCenter,
  FlexColumn,
} from "@/assets/css/common/Common.style";

export const MAIN_COLOR = "#ecfccb"; // 파스텔 연두톤으로 변경
export const POINT_COLOR = "#84cc16"; // 화사한 연두 포인트
export const TEXT_COLOR = "#292524"; // 부드러운 다크 브라운

//🎯 원형 텍스트 회전 애니메이션
const spin = keyframes`
0%{transform: rotate(0deg);}
100% {transform: rotate(360deg);}
`;

export const EventSection = styled.section`
  background-color: #fafaf9; /* 전체 톤온톤 크림톤 배경에 맞춤 */
  padding: 80px 20px;
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid #f0ede8;
`;
export const EventInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
export const EventHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
`;
export const EventTitleGroup = styled.div`
  ${FlexColumn}
  gap: 4px;
`;
export const EventMainTitle = styled.h2`
  font-size: 32px;
  font-weight: 800;
  color: #292524;
  margin: 0;
`;
export const EventSubTitle = styled.p`
  font-size: 16px;
  color: #78716c;
  margin: 0;
`;
export const EventControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const EventViewMoreBtn = styled.button`
  border: 1px solid #e7e5e4;
  background: #ffffff;
  color: #57534e;
  border-radius: 12px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f4;
    color: #292524;
  }
`;
export const EventArrowBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #ffffff;
  border: 1px solid #e7e5e4;
  font-size: 16px;
  color: #57534e;
  cursor: pointer;
  ${FlexCenter}

  &:hover {
    background-color: #f5f5f4;
    color: #292524;
  }
`;
export const EventSliderWrapper = styled.div`
  display: flex;
  gap: 24px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 30px 10px 20px 20px;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
export const HoverSvg = styled.svg`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 85%;
  height: 85%;
  margin-top: -42.5%;
  margin-left: -42.5%;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease-in-out;
  transform-origin: center center;
`;

export const EventImageWrapper = styled.div`
  width: 100%;
  height: 340px;
  position: relative;
  overflow: hidden;

  border-radius: 0px;
  transition: border-radius 0.3s ease-in-out;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }
`;

export const EventCard = styled.div`
  min-width: 280px;
  width: 280px;
  position: relative;
  flex-shrink: 0;
  cursor: pointer;
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #f0ede8;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.02);

  &:hover ${EventImageWrapper} {
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
  }

  &:hover ${HoverSvg} {
    opacity: 1;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

export const RankBadge = styled.div<{ $bgColor: string; $radius?: string }>`
  position: absolute;
  top: 12px;
  left: 12px;
  width: 40px;
  height: 40px;
  background-color: ${(props) => props.$bgColor};
  z-index: 10;
  color: #3f6212;
  font-size: 18px;
  font-weight: 800;
  ${FlexCenter}
  border-radius: ${(props) => props.$radius || "12px"};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;
export const EventInfo = styled.div<{ $bgColor: string }>`
  background-color: ${(props) => props.$bgColor};
  padding: 16px 20px;
  ${FlexBetween}
`;
export const SurgeryLabel = styled.div`
  background-color: #ecfccb;
  color: #3f6212;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 700;
  border-radius: 8px;
`;
export const EventPrice = styled.div`
  color: #292524;
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -1px;

  span {
    font-size: 14px;
    font-weight: 600;
    margin-left: 2px;
    color: #78716c;
  }
`;

//카테고리나브
export const NavContainer = styled.div`
  ${FlexCenter}
  gap: 16px;
  padding-bottom: 15px;
  margin-top: 40px;
  border-bottom: 1px solid #e7e5e4;
  width: 100%;

  @media (max-width: 768px) {
    justify-content: flex-start;
    overflow-x: auto;
    padding-left: 20px;
    padding-right: 20px;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
export const CategoryItem = styled.div<{ $active: boolean }>`
  ${FlexColumn}
  align-items: center;
  cursor: pointer;
  position: relative;
  min-width: 70px;

  ${({ $active }) =>
    $active &&
    `
&::after{
content:'';
position:absolute;
bottom:-16px;
left:50%;
transform:translateX(-50%);
border-width:0 8px 8px 8px;
border-style:solid;
border-color:transparent transparent #ecfccb transparent;
}
`}
`;
export const ImageBox = styled.div<{ $active: boolean }>`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  margin-bottom: 8px;

  border: ${({ $active }) =>
    $active ? "3px solid #65a30d" : "3px solid transparent"};
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
export const ActiveOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(236, 252, 203, 0.3);
  ${FlexCenter}
  border-radius: 50%;
`;
export const CategoryText = styled.span<{ $active: boolean }>`
  font-size: 13px;
  color: ${({ $active }) => ($active ? "#292524" : "#78716c")};
  font-weight: ${({ $active }) => ($active ? "700" : "500")};
  transition: all 0.2s ease-in-out;
`;

//이벤트팝업
export const PopupContainer = styled.div<{ $top: number; $left: number }>`
  position: fixed;
  top: ${(props) => props.$top}px;
  left: ${(props) => props.$left}px;
  width: 380px;
  background-color: #ffffff;
  border: 1px solid #e7e5e4;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  z-index: 99999;
  overflow: hidden;
  ${FlexColumn}
`;
export const ImageWrapper = styled.div`
  width: 100%;
  position: relative;

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;
export const FormWrapper = styled.div`
  background-color: #ffffff;
  padding: 20px;
`;
export const InputGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  width: 100%;
`;
export const Input = styled.input`
  flex: 1;
  min-width: 0;
  height: 40px;
  padding: 0 12px;
  font-size: 13px;
  border: 1px solid #e7e5e4;
  border-radius: 12px;
  outline: none;
  background-color: #fafaf9;
  color: #292524;

  &::placeholder {
    color: #a8a29e;
  }
  &:focus {
    border-color: #65a30d;
    background-color: #ffffff;
  }
`;
export const SubmitBtn = styled.button`
  flex-shrink: 0;
  width: 80px;
  height: 40px;
  background-color: #ecfccb;
  color: #3f6212;
  font-weight: 700;
  font-size: 13px;
  border: 1px solid #d9f99d;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #d9f99d;
  }
`;
export const PrivacyLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;
export const PrivacyCheckbox = styled.input`
  appearance: none;
  width: 16px;
  height: 16px;
  background-color: #fafaf9;
  border: 1px solid #e7e5e4;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  &:checked {
    background-color: #65a30d;
    border-color: #65a30d;
  }
  &:checked::after {
    content: "✔";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 10px;
  }
`;
export const PrivacyText = styled.span`
  color: #78716c;
  font-size: 12px;
  letter-spacing: -0.5px;
  span {
    color: #57534e;
    text-decoration: underline;
    margin-left: 4px;
    cursor: pointer;
  }
`;
export const FooterWrapper = styled.div`
  background-color: #f5f5f4;
  padding: 12px 20px;
  border-top: 1px solid #e7e5e4;
  ${FlexBetween}
`;
export const CloseLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 13px;
  color: #57534e;
`;
export const CloseCheckbox = styled.input`
  appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid #e7e5e4;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  position: relative;

  &:checked {
    background-color: #65a30d;
    border-color: #65a30d;
  }
  &:checked::after {
    content: "✔";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 10px;
  }
`;
export const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #78716c;
  ${FlexCenter};
  padding: 4px;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #e7e5e4;
    color: #292524;
  }
`;

export const FooterInner = styled.div`
  max-width: 1860px;
  margin: 0 auto;
  padding: 0 40px;
  @media (max-width: 1024px) {
    padding: 0 20px;
  }
`;
export const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 40px;
  border-bottom: 1px solid #e7e5e4;
  margin-bottom: 40px;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 30px;
  }
`;
export const CsInfo = styled.div`
  flex: 1;
`;
export const PhoneNumber = styled.div`
  font-size: 28px;
  font-weight: 800;
  letter-spacing: 0.5px;
  color: #292524;
  margin-bottom: 6px;
`;
export const CsTitle = styled.div`
  font-size: 13px;
  color: #78716c;
  font-weight: 600;
`;
export const ScheduleWrapper = styled.div`
  flex: 2;
  display: flex;
  gap: 60px;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;
export const ScheduleBlock = styled.div`
  ${FlexColumn}
  gap: 6px;
`;
export const ScheduleTitle = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: #292524;
  margin-bottom: 2px;
`;
export const ScheduleText = styled.div`
  font-size: 12px;
  color: #78716c;
  letter-spacing: -0.3px;
`;
export const LocationButton = styled.button`
  flex: 0.5;
  height: 44px;
  padding: 0 24px;
  border: 1px solid #e7e5e4;
  background-color: #ffffff;
  color: #57534e;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  border-radius: 12px;
  &:hover {
    background-color: #f5f5f4;
    color: #292524;
  }
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 40px;
  }
`;
export const CompanyInfo = styled.div`
  ${FlexColumn}
  gap: 8px;
`;
export const CompanyName = styled.h2`
  font-size: 20px;
  font-weight: 800;
  color: #292524;
  margin: 0 0 10px 0;
`;
export const InfoText = styled.p`
  margin: 0;
  font-size: 12px;
  color: #78716c;
  line-height: 1.5;
  letter-spacing: -0.2px;

  span {
    margin: 0 6px;
    color: #d6d3d1;
  }
`;
export const BottomRight = styled.div`
  ${FlexColumn}
  align-items: flex-end;
  gap: 16px;
  @media (max-width: 1024px) {
    align-items: flex-start;
    width: 100%;
  }
`;
export const PolicyButtons = styled.div`
  display: flex;
  gap: 8px;
`;
export const PolicyBtn = styled.button`
  background-color: #ffffff;
  color: #57534e;
  border: 1px solid #e7e5e4;
  padding: 6px 14px;
  font-size: 12px;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background-color: #f5f5f4;
    color: #292524;
  }
`;
export const FamilySiteTitle = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #292524;
  margin-bottom: 8px;
`;
export const FamilySiteLogos = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  .logo-placeholder {
    font-size: 11px;
    color: #78716c;
    border: 1px solid #e7e5e4;
    padding: 4px 10px;
    border-radius: 12px;
    background: #ffffff;
  }
`;

//floating
export const FlaotingMenu = styled.div`
  position: fixed;
  right: 30px;
  bottom: 90px;
  ${FlexColumn}
  gap: 12px;
  z-index: 100;
  @media (max-width: 768px) {
    right: 15px;
    bottom: 20px;
    transform: scale(0.9);
  }
`;
export const FabItem = styled.div`
  ${FlexColumn}
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;
export const FabIcon = styled.div<{ $bgColor: string }>`
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background-color: ${(props) => props.$bgColor};
  ${FlexCenter};
  color: #3f6212;
  font-weight: 800;
  font-size: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0,0,0,0.04);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-3px);
  }

  svg {
    width: 24px;
    height: 24px;
    color: #3f6212;
  }
`;
export const FabText = styled.span`
  background-color: #292524;
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 8px;
  letter-spacing: -0.3px;
`;

//헤더
export const HeaderWraper = styled.header`
  width: 100%;
  background-color: rgba(250, 250, 249, 0.9);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid #e7e5e4;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
`;

export const HeaderInner = styled.div`
  max-width: 1860px;
  margin: 0 auto;
  height: 80px;
  ${FlexBetween};
  padding: 0 40px;

  @media (max-width: 1024px) {
    height: 60px;
    padding: 0 20px;
  }
`;

//로고그룹
export const LogoGroup = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

export const Logo = styled.h1`
  font-family: "Times New Roman", serif;
  font-size: 28px;
  color: #292524;
  margin: 0;
  cursor: pointer;
  font-weight: 800;
`;

//중앙 네비게이션 그룹
export const NavGroup = styled.nav`
  ${FlexCenter};
  gap: 32px;
  flex: 2;

  @media (max-width: 1024px) {
    display: none;
  }
`;
export const NavItem = styled.span<{ $active?: boolean }>`
  font-size: 15px;
  font-weight: ${(props) => (props.$active ? "700" : "500")};
  cursor: pointer;
  color: ${(props) => (props.$active ? "#4d7c0f" : "#57534e")};
  border-bottom: ${(props) =>
    props.$active ? "2px solid #65a30d" : "2px solid transparent"};
  padding-bottom: 4px;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #4d7c0f;
  }
`;
export const UtilGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  flex: 1;

  @media (max-width: 1024px) {
    gap: 6px;
  }
`;
export const PhoneButton = styled.a`
  display: flex;
  align-items: center;
  height: 38px;
  border: 1px solid #e7e5e4;
  border-radius: 12px;
  padding: 0 14px;
  font-size: 13px;
  font-weight: 600;
  color: #57534e;
  text-decoration: none;
  background-color: #fff;
  span {
    color: #4d7c0f;
    margin-left: 6px;
    font-weight: 700;
  }
`;
export const CtaButton = styled.button`
  height: 38px;
  background-color: #ecfccb;
  color: #3f6212;
  border: 1px solid #d9f99d;
  border-radius: 12px;
  padding: 0 18px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #d9f99d;
  }
`;
export const IconButton = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 12px;
  border: 1px solid #e7e5e4;
  background-color: #fff;
  ${FlexCenter};
  cursor: pointer;
  color: #57534e;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f4;
    color: #292524;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

//add
export const DesktopOnly = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  @media (max-width: 1024px) {
    display: none;
  }
`;

//모바일 전용 둥근 라인버튼
export const MobilePillButton = styled.button`
  display: none;

  @media (max-width: 1024px) {
    display: inline-block;
    height: 32px;
    border: 1px solid #e7e5e4;
    border-radius: 12px;
    padding: 0 12px;
    font-size: 12px;
    font-weight: 600;
    color: #57534e;
    background-color: #fff;
    cursor: pointer;
  }
`;

//아디다스버튼
export const HamburgerButton = styled.button`
  display: none;
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
    width: 32px;
    height: 32px;
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
    margin-left: 6px;
  }

  span {
    display: block;
    width: 20px;
    height: 2px;
    background-color: #292524;
    border-radius: 1px;
  }
`;
//캐러셀
export const CarouselSection = styled.section`
  margin-top: 80px;
  position: relative;
  width: 100%;
  max-width: 2440px;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
  border-radius: 0 0 24px 24px;
`;
export const EmblaViewport = styled.div`
  width: 100%;
  overflow: hidden;
`;
export const EmblaContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
export const EmblaSlide = styled.div`
  flex: 0 0 100%;
  min-width: 0;
  width: 100%;
  position: relative;
`;
export const SlideImage = styled.img`
  width: 100%;
  height: 560px;
  object-fit: cover;
  display: block;

  @media (max-width: 768px) {
    height: 380px;
  }
`;

export const NavButton = styled.button<{ $direction: "left" | "right" }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => (props.$direction === "left" ? "left:20px;" : "right:20px;")}
  width:44px;
  height: 44px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  color: #292524;
  border: 1px solid #e7e5e4;
  font-size: 20px;
  cursor: pointer;
  z-index: 20;
  ${FlexCenter};
  transition: all 0.2s;

  &:hover {
    background-color: #ffffff;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    font-size: 16px;
    ${(props) => (props.$direction === "left" ? "left:10px" : "right:10px")}
  }
`;

//퀵바
export const BarWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(250, 250, 249, 0.95);
  border-top: 1px solid #e7e5e4;
  backdrop-filter: blur(8px);
  z-index: 99999;

  @media (max-width: 1024px) {
    display: none;
  }
`;
export const BarInner = styled.div`
  max-width: 1860px;
  margin: 0 auto;
  height: 72px;
  ${FlexCenter}
  gap: 12px;
  padding: 0 20px;
`;
export const Title = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #292524;
  margin-right: 8px;
`;

export const Select = styled.select`
  width: 200px;
  height: 40px;
  background-color: #ffffff;
  border: 1px solid #e7e5e4;
  border-radius: 12px;
  color: #57534e;
  padding: 0 14px;
  font-size: 13px;
  outline: none;
  appearance: none;

  background-image: url('data:image/svg+xml;utf8,<svg fill="%2378716c" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
  background-repeat: no-repeat;
  background-position-x: 95%;
  background-position-y: 50%;

  &:focus {
    border-color: #65a30d;
  }
`;
export const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  margin: 0 8px;
`;
export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`;
export const Checkbox = styled.input`
  appearance: none;
  width: 16px;
  height: 16px;
  background-color: #ffffff;
  border: 1px solid #e7e5e4;
  border-radius: 4px;
  position: relative;
  cursor: pointer;

  &:checked {
    background-color: #65a30d;
    border-color: #65a30d;
  }

  &:checked::after {
    content: "✔";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 10px;
  }
`;
export const AgreeText = styled.span`
  color: #78716c;
  font-size: 12px;
`;
export const DetailLink = styled.span`
  color: #57534e;
  font-size: 12px;
  text-decoration: underline;
  margin-left: 6px;
  cursor: pointer;
  &:hover {
    color: #292524;
  }
`;

//롤링배너
const rolling = keyframes`
0%{
transform: translateX(0);
}
100%{
transform: translateX(-100%);
}
`;

export const BannerWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  background: linear-gradient(90deg, #ecfccb 0%, #fef9c3 50%, #fce7f3 100%);
  padding: 12px 0;
  display: flex;
  border-radius: 16px;
  border: 1px solid #f0ede8;
`;

export const Track = styled.div`
  display: flex;
  white-space: nowrap;
`;

export const TextGroup = styled.div`
  display: flex;
  animation: ${rolling} 25s linear infinite;
`;

export const TextItem = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #3f6212;
  letter-spacing: 0.5px;
  margin-right: 30px;
`;

//서브
export const Wrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: #ffffff;
  border-radius: 24px;
  border: 1px solid #f0ede8;
`;

export const StepContainer = styled.div`
  ${FlexCenter}
  margin-bottom: 40px;
`;

export const Step = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
`;
export const StepNumber = styled.div<{ $active?: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${(props) => (props.$active ? "#65a30d" : "#f5f5f4")};
  color: ${(props) => (props.$active ? "#fff" : "#a8a29e")};
  ${FlexCenter}
  font-size: 12px;
  font-weight: 700;
`;

export const StepText = styled.span<{ $active: boolean }>`
  font-size: 14px;
  font-weight: ${(props) => (props.$active ? "700" : "500")};
  color: ${(props) => (props.$active ? "#292524" : "#a8a29e")};
  text-decoration: ${(props) => (props.$active ? "underline" : "none")};
  text-underline-offset: 4px;
`;
export const StepDivider = styled.div`
  width: 40px;
  height: 1px;
  border-bottom: 1px dashed #d6d3d1;
  margin: 0 12px;
`;
export const CheckAllWrapper = styled.div`
  border-top: 1px solid #e7e5e4;
  border-bottom: 1px solid #e7e5e4;
  padding: 16px 0;
  margin-bottom: 24px;
`;

export const CheckboxInput = styled.input`
  appearance: none;
  width: 18px;
  height: 18px;
  border: 1px solid #e7e5e4;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  position: relative;
  &:checked {
    border-color: #65a30d;
    background-color: #65a30d;
  }
  &:checked::after {
    content: "✔";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 12px;
  }
`;
export const CheckAllText = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: #292524;
`;

export const TermSection = styled.div`
  margin-bottom: 24px;
`;
export const TermHeader = styled.div`
  ${FlexBetween}
  margin-bottom: 10px;
`;
export const TermTitle = styled.span`
  font-size: 14px;
  color: #57534e;
`;
export const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #78716c;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const TermContentBox = styled.div<{ $isOpen: boolean }>`
  display: ${(props) => (props.$isOpen ? "block" : "none")};
  width: 100%;
  height: 140px;
  overflow-y: auto;
  border: 1px solid #e7e5e4;
  border-radius: 12px;
  padding: 16px;
  font-size: 12px;
  color: #78716c;
  background-color: #fafaf9;
  line-height: 1.5;
  white-space: pre-wrap;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 40px;
`;
export const Button = styled.button<{ $variant: "outline" | "solid" }>`
  width: 160px;
  height: 48px;
  font-size: 14px;
  font-weight: 700;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;

  background-color: ${(props) =>
    props.$variant === "outline" ? "#fff" : "#ecfccb"};
  border: 1px solid ${(props) => (props.$variant === "outline" ? "#e7e5e4" : "#d9f99d")};
  color: ${(props) => (props.$variant === "outline" ? "#57534e" : "#3f6212")};

  &:hover {
    background-color: ${(props) =>
      props.$variant === "outline" ? "#f5f5f4" : "#d9f99d"};
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

//회원가입 폼(step 2)
export const PageTitle = styled.h2`
  text-align: center;
  font-size: 24px;
  font-weight: 800;
  color: #292524;
  margin-bottom: 32px;
`;
export const FormContainer = styled.div`
  width: 100%;
  ${FlexColumn}
  gap: 20px;
  margin-top: 16px;
`;
export const FormGroup = styled.div`
  ${FlexColumn}
  gap: 8px;
`;
export const Label = styled.label`
  font-size: 14px;
  font-weight: 700;
  color: #292524;
`;

export const EmailWrapper = styled.div`
  display: flex;
  gap: 8px;
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const SubCheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #57534e;
  cursor: pointer;
  margin-top: 4px;
`;
export const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  height: 44px;
`;
export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #57534e;
  cursor: pointer;
`;
export const RadioInput = styled.input`
  appearance: none;
  width: 18px;
  height: 18px;
  border: 1px solid #e7e5e4;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  position: relative;
  background-color: #fff;
  &:checked {
    border-color: #65a30d;
  }
  &:checked::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #65a30d;
  }
`;

//다음 팝업
export const Dflex = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
`;
export const ModalBG = styled.div`
  position: fixed;
  background-color: rgba(41, 37, 36, 0.4);
  backdrop-filter: blur(4px);
  z-index: 999999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;
export const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 500px;
  z-index: 9999999;
  background-color: #ffffff;
  border-radius: 20px;
  border: 1px solid #e7e5e4;
  box-shadow: 0 16px 32px rgba(0,0,0,0.1);
  overflow: hidden;
`;

export const RightBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 8px;

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: #78716c;
    &:hover { color: #292524; }
  }
`;

//슬라이더
export const SliderSection = styled.section`
  background-color: #fafaf9;
  padding: 60px 20px;
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid #f0ede8;
`;
export const SliderInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
export const SliderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 30px;
`;
export const SliderTitleGroup = styled.div`
  ${FlexColumn}
  gap: 4px;
`;
export const SliderMainTitle = styled.h2`
  font-size: 32px;
  font-weight: 800;
  color: #292524;
  margin: 0;
`;
export const SliderSubTitle = styled.p`
  font-size: 16px;
  color: #78716c;
  margin: 0;
`;
export const SliderControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const SliderViewMoreBtn = styled.button`
  border: 1px solid #e7e5e4;
  background: #ffffff;
  color: #57534e;
  border-radius: 12px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f4;
    color: #292524;
  }
`;
export const SliderArrowBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #ffffff;
  color: #57534e;
  border: 1px solid #e7e5e4;
  font-size: 16px;
  cursor: pointer;
  ${FlexCenter}
  &:hover {
    background-color: #f5f5f4;
    color: #292524;
  }
`;
export const SelfieSliderWrapper = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding-bottom: 20px;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
export const SelfieCard = styled.div`
  min-width: 240px;
  height: 340px;
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  cursor: pointer;
  border: 1px solid #e7e5e4;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
export const SelfieCardOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0) 30%,
    rgba(0, 0, 0, 0) 60%,
    rgba(0, 0, 0, 0.7) 100%
  );
  ${FlexColumn}
  justify-content: space-between;
  padding: 16px;
`;
export const SelfieLikeBadge = styled.div`
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 4px;

  span {
    color: #f472b6;
    font-size: 16px;
  }
`;
export const SelfieViewCount = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  span {
    display: block;
    font-size: 11px;
    font-weight: 400;
    color: #e7e5e4;
    margin-top: 2px;
  }
`;

//footer
export const SiteFooterWrapper = styled.footer`
  background-color: #292524;
  padding: 40px 15px 100px 15px;
  ${FlexBetween}
  border-top: 1px solid #e7e5e4;
  color: #fafaf9;
`;
export const SiteFooterInner = styled.div`
  max-width: 1860px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 1024px) {
    padding: 0 20px;
  }
`;
export const SiteFooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 30px;
  border-bottom: 1px solid #44403c;
  margin-bottom: 30px;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 24px;
  }
`;
export const SiteFooterCs = styled.div`
  flex: 1;
`;
export const SiteFooterPhone = styled.div`
  font-size: 28px;
  font-weight: 800;
  letter-spacing: 0.5px;
  color: #fafaf9;
  margin-bottom: 4px;
`;
export const SiteFooterCsTitle = styled.div`
  font-size: 13px;
  color: #d6d3d1;
  font-weight: 600;
`;
export const SiteFooterScheduleWrap = styled.div`
  flex: 2;
  display: flex;
  gap: 40px;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;
export const SiteFooterScheduleTitle = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: #fafaf9;
  margin-bottom: 4px;
`;
export const SiteFooterScheduleText = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #a8a29e;
  letter-spacing: -0.3px;
`;
export const SiteFooterScheduleBlock = styled.div`
  ${FlexColumn}
  gap: 6px;
`;
export const SiteFooterLocationBtn = styled.button`
  flex: 0.5;
  height: 44px;
  padding: 0 24px;
  border: 1px solid #57534e;
  background: transparent;
  color: #fafaf9;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  border-radius: 12px;
  &:hover {
    background-color: #fafaf9;
    color: #292524;
    border-color: #fafaf9;
  }
  @media (max-width: 1024px) {
    width: 100%;
  }
`;
export const SiteFooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
  }
`;
export const SiteFooterCompany = styled.div`
  ${FlexColumn}
  gap: 8px;
`;
export const SiteFooterCompanyName = styled.h2`
  font-size: 20px;
  font-weight: 800;
  margin: 0 0 10px 0;
  color: #fafaf9;
`;
export const SiteFooterInfoText = styled.p`
  margin: 0;
  font-size: 12px;
  color: #a8a29e;
  line-height: 1.5;
  letter-spacing: -0.2px;
`;
export const SiteFooterBottomRight = styled.div`
  ${FlexColumn}
  align-items: flex-end;
  gap: 16px;

  @media (max-width: 1024px) {
    align-items: flex-start;
    width: 100%;
  }
`;
export const SiteFooterPolicyWrap = styled.div`
  display: flex;
  gap: 8px;
`;
export const SiteFooterPolicyBtn = styled.button`
  background-color: rgba(255, 255, 255, 0.08);
  color: #d6d3d1;
  border: 1px solid #57534e;
  padding: 6px 14px;
  font-size: 12px;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    background-color: #44403c;
    color: #fafaf9;
  }
`;
export const SiteFooterFamilyTitle = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #fafaf9;
  margin-bottom: 12px;
`;
export const SiteFooterFamilyLogos = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
  .logo-placeholder {
    font-size: 11px;
    color: #a8a29e;
    border: 1px solid #57534e;
    padding: 4px 10px;
    border-radius: 12px;
    background: transparent;
  }
`;

//dropdown
export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  flex: 0.5;

  button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  @media (max-width: 1024px) {
    width: 100%;
    flex: none;
  }
`;

export const ArrowIcon = styled.span<{ $isOpen: boolean }>`
  font-size: 10px;
  display: inline-block;
  margin-left: 8px;
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  transform: rotate(${({ $isOpen }) => ($isOpen ? "180deg" : "0deg")});
`;

export const DropdownMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  background-color: #ffffff;
  border: 1px solid #e7e5e4;
  border-radius: 12px;
  z-index: 100;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
  overflow: hidden;

  ${FlexColumn}
  gap: 2px;

  max-height: ${({ $isOpen }) => ($isOpen ? "240px" : "0px")};
  opacity: ${({ $isOpen }) => ($isOpen ? "1" : "0")};
  padding: ${({ $isOpen }) => ($isOpen ? "6px" : "0 6px")};
  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
`;

export const DropdownItem = styled.a`
  display: block;
  width: 100%;
  padding: 8px 12px;
  font-size: 13px;
  color: #57534e;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    background-color: #f5f5f4;
    color: #292524;
  }
`;