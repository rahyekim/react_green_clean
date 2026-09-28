'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaSpinner } from "react-icons/fa";
import * as S from '@/assets/css/newFooter.styles'
import axios from "axios";

//백엔드에서 받아올 데이터 형태(타입)정읭
interface ScheduleData {
  id: number;
  department:string;
  weekday:string;
  night: string;
  weekend: string;
}

interface FamilySiteData {
  id:number;
  name:string;
  url:string;
}

export default function Footer (){

    const [companyInfo, setCompanyInfo]=useState({
        name:'',
        address:'',
        clinicName:'',
        phone:'',
        email:'',
        locationUrl:'',
    })

    const [schedules, setSchedules]=useState<ScheduleData[]>([]);
    const [familySites, setFamilySites]=useState<FamilySiteData[]>([]);
    const [isLoading, setIsLoading]=useState(false);

    useEffect(()=>{
      const fetchFooterdata = async()=>{
        setIsLoading(true);
        try{
          const res= await axios.get('http://localhost:4000/api/admin/footer')
          if(res.data.success && res.data.data){
            const {companyInfo,schedules,familySites} = res.data.data;

            if(companyInfo) setCompanyInfo(companyInfo);
            if(schedules) setSchedules(schedules);
            if(familySites) setFamilySites(familySites);
          }
        }catch(err){
          console.error('푸터 데이터 로드 실패:', err);
        }finally{
          setIsLoading(false);
        }
      } 
      fetchFooterdata();
    },[]);

    if(isLoading){
      return (
      <S.SiteFooterWrapper> 
        <S.SiteFooterInner>
          <S.SpinnerWrapper>
            <FaSpinner size={30}/>
          </S.SpinnerWrapper>
        </S.SiteFooterInner>
      </S.SiteFooterWrapper>)
    }

    return(
        <>
        <S.SiteFooterWrapper>
        <S.SiteFooterInner>
          {/* cs번호 진료시간 오시는길 */}
          <S.SiteFooterTop>
            <S.SiteFooterCs>
              <S.SiteFooterPhone>{companyInfo.phone || '02. 932. 2222'}</S.SiteFooterPhone>
              <S.SiteFooterCsTitle>CS CENTER</S.SiteFooterCsTitle>
            </S.SiteFooterCs>

          {schedules.map(sch=> (
            <>
            <S.SiteFooterScheduleWrap key={sch.id}>
              <S.SiteFooterScheduleBlock>
                <S.SiteFooterScheduleTitle>{sch.department}</S.SiteFooterScheduleTitle>
                <S.SiteFooterScheduleText>평일 : {sch.weekday}</S.SiteFooterScheduleText>
                {/* 야간 빈칸이면 깔끔하게 렌더링안함 */}
                {sch.night &&
                <S.SiteFooterScheduleText>야간 : {sch.night}</S.SiteFooterScheduleText>
                }
                <S.SiteFooterScheduleText>토요일 : {sch.weekend}</S.SiteFooterScheduleText>
              </S.SiteFooterScheduleBlock>
            </S.SiteFooterScheduleWrap>
          </>
        ))}
            <S.SiteFooterLocationBtn onClick={()=>{
              if(companyInfo.locationUrl){
                window.open(companyInfo.locationUrl, '_blank' ) //'_blank':새창으로
              } else{
                window.location.href='/';
              }
            }} >오시는길 바로가기</S.SiteFooterLocationBtn>
          </S.SiteFooterTop>

          <S.SiteFooterBottom>
            <S.SiteFooterCompany>
              <S.SiteFooterCompanyName>{companyInfo.name || '안호범 안스성형외과'}</S.SiteFooterCompanyName>
              <S.SiteFooterInfoText>
                {companyInfo.address || `서울 노원구 노해로 460 (상계동) 2층 201호
                (안호범안스성형외과 건물 주차장 이용)`}
               
              </S.SiteFooterInfoText>

              <S.SiteFooterInfoText>
                의료기관 명칭 : {companyInfo.clinicName||'안호범안스성형외과'}
                <br />
                대표번호 : {companyInfo.phone||'02. 932. 2222'}
                <br />
                E-mail : {companyInfo.email||'test@test.com'}
              </S.SiteFooterInfoText>
            </S.SiteFooterCompany>

            <S.SiteFooterBottomRight>
              <S.SiteFooterPolicyWrap>
                <S.SiteFooterPolicyBtn>실비보험 안내</S.SiteFooterPolicyBtn>
                <S.SiteFooterPolicyBtn>비급여 진료비용 안내</S.SiteFooterPolicyBtn>
              </S.SiteFooterPolicyWrap>

              <div>
                <S.SiteFooterFamilyTitle>Family</S.SiteFooterFamilyTitle>
                <S.SiteFooterFamilyLogos >
                {familySites.map(site=>(
                  <a key={site.id} href={site.url} target="_blank" rel="noopener noreferrer">
                    <div className="logo-placeholder">{site.name||'Breast Surgery Center'}</div>
                    {/* <div className="logo-placeholder">Derm</div>
                    <div className="logo-placeholder">Lifting Center</div> */}
                  </a>
                ))}
                </S.SiteFooterFamilyLogos>
                </div>
            </S.SiteFooterBottomRight>
          </S.SiteFooterBottom>
        </S.SiteFooterInner>

        {/* 우측 하단 플로팅 퀵 메뉴 */}
        <S.FloatingMenuWrapper>
          <S.FloatingMenuItem>
            <S.FloatingMenuIcon $bgColor="#FEE500">TALK</S.FloatingMenuIcon>
            <S.FloatingMenuText>빠른 상담</S.FloatingMenuText>
          </S.FloatingMenuItem>
          
          <S.FloatingMenuItem>
            <S.FloatingMenuIcon $bgColor="#3b82f6">
              <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.25-3.95-6.847-6.847l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"></path>
              </svg>
            </S.FloatingMenuIcon>
            <S.FloatingMenuText>전화 상담</S.FloatingMenuText>
          </S.FloatingMenuItem>
        </S.FloatingMenuWrapper>

      </S.SiteFooterWrapper>
        </>
    )
}


/*
🚀 HTML <a> 태그로 새 창을 열 때: 👉 rel="noopener noreferrer" 필수!
✨(새 탭으로 열기)를 사용할 때 보안과 성능(속도)을 지키기 위해 무조건 함께 세트로 붙여주는 보안 장치

보안 문제 방지 (noopener)
해킹 위협(Reverse Tabnabbing) 차단: "새 창이 열리되, 우리 창에 절대 접근하지 못하게 차단해라!"
noopener: 새 페이지가 기존 페이지를 조작할 수 없도록 막습니다. 
악성 사이트가 window.opener 자바스크립트 속성을 이용해 원래 있던 내 사이트(부모 창)를 
변조하거나 피싱 사이트로 유도하는 탭 내빙(Tabnabbing) 보안 공격을 방지합니다

성능 최적화 (noreferrer)
정보 유출 방지 및 성능 보호:
noreferrer: 링크를 타고 넘어갈 때 브라우저가 HTTP Referrer 정보를 
상대방 사이트에 보내지 않습니다. 즉, 
방문자가 "어느 사이트에서 이 링크를 클릭해서 왔는지" 상대방이 알 수 없도록 프라이버시를 보호

🚀✨
window.open()으로 새 창을 열 때: 👉 그냥 window.open(url, '_blank')만 써도 안전하게 OK!
*/