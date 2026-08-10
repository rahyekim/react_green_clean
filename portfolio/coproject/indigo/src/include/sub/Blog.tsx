import { useState, useEffect } from "react"
import axios from "axios"

import * as S from '../../assets/css/front.styled'

interface BlogItem {
    id: number;
    image_url: string;
    date_str: string;
    text_content: string;
}

//백엔드에서 받아올 전체 데이터 묶음 (줄수+블로그)
interface BlogData{
    rowCount: number;
    blogs: BlogItem[];
}

export default function Blog  () {

    const [blogData, setBlogData]=useState<BlogData>({  //객체가하나라 (그안에 blog아이템들이많은것뿐)
        rowCount: 1, //기본값 1줄
        blogs:[] // 기본값 빈 배열
    })

    //데이터불러오기
    useEffect(()=>{
        const fetchBlogData = async ()=>{
            try{
                const res = await axios.get('http://localhost:5000/api/settings/blog')
                if (res && res.data) {
                    setBlogData({
                        rowCount: res.data.rowCount,
                        blogs: res.data.blogs
                    })
                }
            }catch(err){
                console.error('블로그 데이터 불러오기 실패', err)
            }
        }   
        fetchBlogData();
    }, [])
    
    const itemsToShow = blogData.rowCount === 1 
    ? blogData.blogs.slice(0,3)
    : blogData.blogs.slice(0,6)

    return(
        <>
        <S.BlogSection>
                <div className="container">
                    <S.SectionTitle>BLOG</S.SectionTitle>
                    <S.BlogList>
                    {/* 저장된 데이터가 있을 경우 */}
                    {itemsToShow.length > 0 ? (
                        itemsToShow.map((blog,idx)=>(
                            <li key={blog.id || idx}>
                                <a href="#">
                                    <S.BlogImg
                                    src={blog.image_url ? `http://localhost:5000${blog.image_url}`:''}
                                    alt={`블로그 섬네일 ${idx+1}`}
                                    />
                                    <S.BlogTime dateTime="2026-10-30">
                                        {blog.date_str}
                                    </S.BlogTime>
                                    <S.BlogH3>
                                        {blog.text_content}
                                    </S.BlogH3>
                                </a>
                            </li>
                        ))
                    ): (
                        <li>
                            아직 등록된 블로그 게시물이 없습니다
                        </li>
                    )}

                    </S.BlogList>
                </div>
            </S.BlogSection>
        
        </>
    )
}

/*
import blog01 from '../../assets/images/p-images/blog01.jpg'
import blog02 from '../../assets/images/p-images/blog02.jpg'
import blog03 from '../../assets/images/p-images/blog03.jpg'
 */

/*
 <li>
                            <a href="">
                                <img src={blog01} alt="" />
                                <time dateTime="2026-10-30">
                                    OCT 30 , 2026
                                </time>
                                <h3>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate, repellat?</h3>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src={blog02} alt="" />
                                <time dateTime="2026-10-30">
                                    OCT 30 , 2026
                                </time>
                                <h3>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate, repellat?</h3>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src={blog03} alt="" />
                                <time dateTime="2026-10-30">
                                    OCT 30 , 2026
                                </time>
                                <h3>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate, repellat?</h3>
                            </a>
                        </li>

 */