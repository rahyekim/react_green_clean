'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import * as S from '@/assets/css/CategoryNav.styles'

// const CATEGORY_LIST = [
// { id: 'all', name: '전체', img: '/images/main/cate/cat_all.jpg' },
// { id: 'eye', name: '눈', img: '/images/main/cate/cat_eye.png' },
// { id: 'nose', name: '코', img: '/images/main/cate/cat_nose.png' },
// { id: 'contour', name: '윤곽', img: '/images/main/cate/cat_contour.png' },
// { id: 'breast', name: '가슴', img: '/images/main/cate/cat_breast.png' },
// { id: 'lifting', name: '리프팅', img: '/images/main/cate/cat_lifting.png' },
// { id: 'man', name: '남자', img: '/images/main/cate/cat_man.png' },
// { id: 'body', name: '체형', img: '/images/main/cate/cat_body.png' },
// ];


// DB에서 받아올 카테고리 데이터 타입
interface CategoryData {
    id: number;
    name: string;
    img: string;
    link: string;
}

export default function CategoryNav (){

    const [categories, setCategories] = useState<CategoryData[]>([]);
    const [activeId, setActiveId] = useState<number | null>(null);

    // 💡 백엔드에서 카테고리 데이터 불러오기 (SORT_ORDER 순으로 정렬되어 옴)
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/admin/category");
                if (response.data.success) {
                    const formatted = response.data.data.map((c: any) => ({
                        id: c.CATEGORY_IDX,
                        name: c.TITLE,
                        img: `http://localhost:4000/images/${c.FILE_NAME}`, // 실제 이미지 경로
                        link: c.LINK || "#"
                    }));
                    setCategories(formatted);
                    
                    // 처음 화면이 켜졌을 때 첫 번째 항목을 자동으로 활성화 (선택)
                    if (formatted.length > 0) {
                        setActiveId(formatted[0].id);
                    }
                }
            } catch (error) {
                console.error("카테고리 로드 실패:", error);
            }
        };
        fetchCategories();
    }, []);


    return(
        <>
        <S.NavConatiner>
            {categories.map(cat=>{
                const isActive = activeId === cat.id;

                return(
                <Link 
                href={cat.link}
                key={cat.id}
                style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    <S.CategoryItem 
                    $active={isActive}
                    onClick={()=>setActiveId(cat.id)}
                    >
                        <S.ImgBox $active={isActive}>
                            <img src={cat.img} alt={cat.name}/>
                            {isActive && 
                            <S.ActiveOverlay>
                                <svg 
                                width="32" 
                                height="32" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="#FFD700" /* 노란색 체크*/
                                strokeWidth="4" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                                >
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </S.ActiveOverlay>}
                        </S.ImgBox>
                        <S.CategoryText $active={isActive}>
                            {cat.name}
                        </S.CategoryText>
                    </S.CategoryItem>
                </Link>
)})}
        </S.NavConatiner>
        </>
    )
}




