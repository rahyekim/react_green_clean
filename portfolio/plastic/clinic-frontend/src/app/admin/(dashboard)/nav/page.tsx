'use client';
import { useState , useEffect} from 'react';
import axios from 'axios';
import * as S from '@/assets/css/admin/NavSetting.style'
import usePopup from '@/hooks/usePopup';
import Popup from '@/components/ui/Popup';
import {
    FiSave, FiPlus, FiTrash2, FiImage, FiType,FiUpload,
}from 'react-icons/fi'

interface MenuItem{
    id:number;
    name:string;
    url:string;
}
export default function Nav(){

    const {popupConfig, closePopup, openPopup}=usePopup();
    const [logoType, setLogoType]=useState<'TEXT'|'IMAGE'>('TEXT');
    const [logoText, setLogoText]=useState<string>('성형외과 로고');
    const [logoFileName, setLogoFileName] = useState<string>('');
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [menus, setMenus]=useState<MenuItem[]>([]);
    

    //생명주기
    useEffect(()=>{
        const fetchNavSettings = async()=>{
            try{
            const res = await axios.get('http://localhost:4000/api/admin/nav')
            if(res.data.success){
                const dbData = res.data.data;
                setLogoType(dbData.LOGO_TYPE);
                setLogoText(dbData.LOGO_TEXT);
                setLogoFileName(dbData.LOGO_FILE);
                if(dbData.MENUS && dbData.MENUS !== '[]'){
                    setMenus(JSON.parse(dbData.MENUS))
                }else{
                    //db에 메뉴가 비어있으면 초기 기본값 세팅
                    setMenus([
                        { id: 1, name: "병원소개", url: "/" },
                        { id: 2, name: "눈성형", url: "/" },
                        { id: 3, name: "코성형", url: "/" },
                        { id: 4, name: "동안성형", url: "/" },
                        { id: 5, name: "쁘띠시술", url: "/" },
                        { id: 6, name: "커뮤니티", url: "/" }
                    ])
                }
            }
            }catch(err){
            console.error('네비설정 로드실패:', err);
            }
        }
        fetchNavSettings();
    }, [])
    
    
    //로고 이미지 파일 선택핸들러
    const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files && e.target.files.length > 0){
            setLogoFileName(e.target.files[0].name);
            setLogoFile(e.target.files[0]); //
        }
    }

    const handleAddmenu = ()=>{
        const nextId = 
        menus.length > 0 ? Math.max(...menus.map(m => m.id)) + 1 : 1;
        setMenus(prev=> [
            ...prev,
            { id: nextId, name:'',url:'',}
        ])
    }
    const handleDelete = (id:number)=>{
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
    const handleMenuChange = (id:number, field:keyof MenuItem, value:string)=>{
        setMenus(prev=>(
            prev.map(menu=> (menu.id === id ? {
                ...menu,
                [field]: value
            } : menu
        ))
        ));
    }
    const handleSave = async()=>{

        let finalFileName = logoFileName;
        try{
            if(logoType==='IMAGE' && logoFile){
                const formData = new FormData();
                formData.append('logoImage', logoFile);

                //백엔드 업로드 전용 api전송
                const uploadRes = await axios.post('http://localhost:4000/api/admin/upload',formData,{
                    headers:{'Content-Type':'multipart/form-data'},
                });

                if(uploadRes.data.success){
                    // 🌟 업로드된 새 파일명으로 갱신
                    finalFileName = uploadRes.data.filename;
                }
            }

            const payload ={
                logoType, 
                logoText: logoType === 'TEXT' ? logoText : '',
                logoFileName: logoType==='IMAGE'? finalFileName : null, 
                menus: menus
            };
            const res = await axios.put('http://localhost:4000/api/admin/nav', payload)
            console.log('저장될데이터:', payload);

            if(res.data.success){ 
                openPopup('저장 완료', '네비게이션 설정이 성공적으로 저장되었습니다');
            }

        }catch(err){
            console.error('네비설정 저장실패:', err);
            openPopup('실패 알림', '네비게이션 설정 도중 오류가 발생했습니다')
        }
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