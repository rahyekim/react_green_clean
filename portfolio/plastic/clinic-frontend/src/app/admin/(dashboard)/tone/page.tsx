'use client';

import React, {useState} from 'react';
import {
    FiMoon,FiSun,FiCheck,FiSave
}from 'react-icons/fi';

import * as S from '@/assets/css/admin/tone.style'
import usePopup from '@/hooks/usePopup';
import Popup from '@/components/ui/Popup';
export default function Tone(){

    const [selectedTone, setSelectedTone]=useState<"BLUE"|"PINK">('BLUE');
    const [isDarkMode, setIsDarkMode]=useState<boolean>(false);
    
    const {popupConfig, closePopup, openPopup}=usePopup();

    const handleSave = async()=>{
        const payload= {
            primaryTone: selectedTone,
            isDarkMode: isDarkMode ? 'Y' : 'N',
        };
        console.log('DB에 저장될 데이터:', payload);
        openPopup('알림', '톤앤매너 성공하였습니다');
    }

    return(
        <>
        <S.ToneContainer>
            <S.PageHeader>
                <S.PageTitle>톤앤매너관리</S.PageTitle>
                <S.SaveButton
                onClick={handleSave}
                > 
                    <FiSave size={18}/> 설정 저장
                </S.SaveButton>
            </S.PageHeader>

            <S.CardGrid>
                <S.SettingCard>
                    <S.CardHeader>
                        <S.CardTitle>브랜드 메인 컬러(tone)</S.CardTitle>
                    </S.CardHeader>
                    <S.CardBody>
                        <p>웹사이트 전체에 적용될 주요 색상을 선택하세요</p>
                        <S.ColorOptWrapper>
                            <S.ColorBox 
                            $color='#4273df'
                            $isActive={selectedTone === 'BLUE'}
                            onClick={()=>setSelectedTone('BLUE')}
                            >
                                {selectedTone === 'BLUE'&& 
                                    <FiCheck size={30} color='#fff'/>}
                            </S.ColorBox>
                             <S.ColorBox 
                            $color='#e83e8c'
                            $isActive={selectedTone === 'PINK'}
                            onClick={()=>setSelectedTone('PINK')}
                            >
                                {selectedTone === 'PINK' && 
                                    <FiCheck size={30} color='#fff'/>}
                            </S.ColorBox>
                        </S.ColorOptWrapper>
                        <S.SelectedText>
                            현재 선택된 톤 : 
                            <strong> {selectedTone === 'BLUE' ? "트러스트 블루(Blue)" : "러블리 핑크(Pink)"}</strong>
                        </S.SelectedText>
                    </S.CardBody>
                </S.SettingCard>

                {/* 다크모드 설정카드 */}
                <S.SettingCard>
                    <S.CardHeader>
                        <S.CardTitle>다크모드(Dark Mode)</S.CardTitle>
                    </S.CardHeader>
                    <S.CardBody>
                        <p>사용자 화면의 다크모드 기본 상태를 설정합니다</p>
                        <S.ColorOptWrapper>
                            <S.ToggleWrapper>
                                <S.ModeButton 
                                $isActive={!isDarkMode}
                                onClick={()=>setIsDarkMode(false)}
                                >
                                    <FiSun size={20}/>
                                    <span>라이트모드</span>
                                </S.ModeButton>
                                <S.ModeButton 
                                $isActive={isDarkMode}
                                $isDark
                                onClick={()=>setIsDarkMode(true)}
                                >
                                    <FiMoon size={20}/>
                                    <span>다크모드</span>
                                </S.ModeButton>
                            </S.ToggleWrapper>
                        </S.ColorOptWrapper>
                        <S.SelectedText>
                            현재상태 : 
                            <strong> {isDarkMode ? "다크모드 활성화됨" : "라이트모드(기본값)"}</strong>
                        </S.SelectedText>

                        <S.ColorOptWrapper>
                                <S.ToggleSwitch 
                                $isActive={!isDarkMode}
                                onClick={()=>setIsDarkMode(prev=>!prev)}
                                >
                                   <S.SwitchHandle $isActive={isDarkMode} />
                                   <S.SwitchText $isActive={isDarkMode}>
                                        {isDarkMode ? '다크모드' : '라이트모드'}
                                    </S.SwitchText>
                                </S.ToggleSwitch>
                        </S.ColorOptWrapper>
                    </S.CardBody>
                </S.SettingCard>

            </S.CardGrid>
        </S.ToneContainer>

        <Popup
        isOpen={popupConfig.isOpen}
        onClose={closePopup}
        title={popupConfig.title}
        >{popupConfig.message}</Popup>
        </>
    )
}