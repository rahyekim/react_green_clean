'use client';
import { useState } from 'react';
import * as S from '@/assets/css/admin/NavSetting.style'
import usePopup from '@/hooks/usePopup';
import Popup from '@/components/ui/Popup';
import {
    FiSave, FiPlus, FiTrash2, FiImage, FiType,FiUpload,
}from 'react-icons/fi'

interface MenuItem{
    id:string;
    name:string;
    url:string;
}
export default function Nav(){

    const {popupConfig, closePopup, openPopup}=usePopup();
    const [logoType, setLogoType]=useState<'TEXT'|'IMAGE'>('TEXT');
    const [logoText, setLogoText]=useState<string>('성형외과 로고');
    const [logoFileName, setLogoFileName] = useState<string>('');
    
    const [menus, setMenus]=useState<MenuItem[]>([
        {id:crypto.randomUUID(), name:'병원소개', url:'/'},
        {id:crypto.randomUUID(), name:'눈성형', url:'/'},
        {id:crypto.randomUUID(), name:'코성형', url:'/'},
        {id:crypto.randomUUID(), name:'동안성형', url:'/'},
        {id:crypto.randomUUID(), name:'쁘띠시술', url:'/'},
        {id:crypto.randomUUID(), name:'커뮤니티', url:'/'},
    ])

    //로고 이미지 파일 선택핸들러
    const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files && e.target.files.length > 0){
            setLogoFileName(e.target.files[0].name);
        }
    }

    const handleAddmenu = ()=>{
        setMenus(prev=> [
            ...prev,
            {
                id:crypto.randomUUID(),
                name:'',
                url:'',
            }
        ])
    }
    const handleDelete = (id:string)=>{
        openPopup(
            '알림', 
            '삭제하시겠습니까?',
            ()=>{
                setMenus(prev=>(
                    prev.filter(menu=> menu.id !== id)
                ));
                closePopup();
            }
        );
    };

    const handleMenuChange = (id:string, field:keyof MenuItem, value:string)=>{
        setMenus(prev=>(
            prev.map(menu=> (menu.id === id ? {
                ...menu,
                [field]: value
            } : menu
        ))
        ));
    }

    const handleSave = ()=>{
        const payload ={
            logo:{
                type:logoType,
                text: logoType === 'TEXT' ? logoText :null,
                fileName: logoType==='IMAGE'? logoFileName : null,
            },
            menus: menus
        };
        console.log('저장될데이터:', payload);
        openPopup('저장 완료', '네비게이션 설정이 성공적으로 저장되었습니다')
    };
    
    return(
        <>
        <S.NavContainer>
            <S.PageHeader>
                <S.PageTitle>네비게이션 관리</S.PageTitle>
                <S.SaveButton onClick={handleSave}>
                    <FiSave size={18}/>
                    <span>설정저장하기</span>
                </S.SaveButton>
            </S.PageHeader>

            <S.ContentGrid>
                <S.Card>
                    <S.CardHeader>
                        <S.CardTitle>상단 로고 설정</S.CardTitle>
                    </S.CardHeader>

                    <S.CardBody>
                        <p>웹사이트 최상단에 표시될 로고의 형태를 선택하세요</p>
                        <S.RadioGroup>
                            <S.RadioLabel 
                            $isActive={logoType==='TEXT'}
                            onClick={()=>setLogoType('TEXT')}
                            > 
                                <FiType size={18}/> 
                                <span>텍스트로고</span>

                            </S.RadioLabel>

                            <S.RadioLabel 
                            $isActive={logoType==='IMAGE'}
                            onClick={()=>setLogoType('IMAGE')}
                            > 
                                <FiImage size={18}/> 
                                <span>이미지로고</span>
                            </S.RadioLabel>
                        </S.RadioGroup>

                        <S.NavInputWrapper>
                            {logoType === 'TEXT' ? (
                                <>
                                <S.NavLabel>텍스트입력</S.NavLabel>
                                <S.NavInput
                                type='text'
                                value={logoText}
                                accept='image/*'
                                onChange={e=>setLogoText(e.target.value)}
                                placeholder='예: 안효범성형외과'
                                />
                                </>
                            ): (
                                <>
                                <S.NavLabel>이미지파일등록</S.NavLabel>
                                <S.FileInputWrapper>
                                    <S.FileInput
                                    type='file'
                                    accept='image/*'
                                    onChange={handleFileChange}
                                    id='logo-upload'
                                    />
                                    <S.FileLabel htmlFor='logo-upload'>
                                       <FiUpload size={20}/> 파일선택
                                    </S.FileLabel>
                                    <span className='filename'>{logoFileName || '선택된파일이 없습니다'}</span>
                                </S.FileInputWrapper>
                                </>
                            )}
                        </S.NavInputWrapper>

                    </S.CardBody>
                </S.Card>

                <S.Card>
                    <S.CardHeader>
                        <S.CardTitle>카테고리 및 URL설정</S.CardTitle>
                    </S.CardHeader>
                    <S.CardBody>
                        <p>사용자가 클릭할 내비게이션 메뉴 이름과 이동할 주소를 입력하세요.</p>  
                        <S.MenuList>
                            {menus.map((menu,idx)=>(
                                <S.MenuItem key={menu.id}>
                                    <div className="menu-number">{idx+1}</div>
                                    <S.NavInput
                                    type='text'
                                    placeholder='메뉴명(예:시술안내)'
                                    value={menu.name}
                                    onChange={(e)=>handleMenuChange(menu.id, 'name', e.target.value)}
                                    />
                                     <S.NavInput
                                    type='text'
                                    placeholder='url(예:/treatment)'
                                    value={menu.url}
                                    onChange={(e)=>handleMenuChange(menu.id, 'url', e.target.value)}
                                    />
                                    <S.DeleteButton onClick={()=>handleDelete(menu.id)}>
                                        <FiTrash2 size={18}/>
                                    </S.DeleteButton>
                                </S.MenuItem>
                            ))}
                        </S.MenuList>
                        <S.AddButton onClick={handleAddmenu}>
                            <FiPlus size={18}/>새 카테고리 추가
                        </S.AddButton>
                    </S.CardBody>
                </S.Card>
            </S.ContentGrid>
        </S.NavContainer>
        
        <Popup
        isOpen={popupConfig.isOpen}
        title={popupConfig.title}
        onClose={closePopup}
        onConfirm={popupConfig.onConfirm}
        >{popupConfig.message}</Popup>
        </>
    )
}