import * as S from '../../component/topBar/TopBar.styles'
import axios from 'axios'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {Layout} from '../../component/layout/Layout'

export default function SearchResult(){

    //🔍주소창의 쿼리스트링(?q=...)을 읽어오는 훅
    const [searchParams]=useSearchParams();
    const keyword = searchParams.get('q'); //'q'라는 이름의 값을 꺼냄 (예: 철수)

    const [result, setResult]=useState({users:[], blogs:[], contacts:[]});
    const [loading, setLoading]= useState(true);

    useEffect(()=>{
        const fetchResults = async()=>{
            if(!keyword) {
                setLoading(false);
                return;
            }

            try{
                const res = await axios.get(`http://localhost:5000/api/search?q=${keyword}`)
                setResult(res.data);

            }catch(err){
                console.error("검색 불러오기 에러", err)
            }finally{
                setLoading(false)
            }
        }
        fetchResults();
    }, [keyword])

    return(
        
        <Layout>
        {/* 검색결과UI */}
            <S.SearchResultWrap>
                <h3>'{keyword}' 검색 결과 </h3>
                {loading ? (
                    <p> 검색중입니다... </p>
                ) : ( 
                <>
                <S.SearchUserResultWrap>
                    <h5>회원 ({result.users.length}건)</h5>
                    {result.users.length === 0 
                    ? <p>검색된 회원이 없습니다</p>
                    :(
                        <ul>
                            {result.users.map((user:any)=>(
                                <li key={user.id}>
                                    <strong>{user.first_name} {user.last_name}</strong>
                                </li>
                            ))}
                        </ul>
                    )}
                </S.SearchUserResultWrap>
                <S.SearchBlogResultWrap>
                    <h5>블로그 ({result.blogs.length}건)</h5>
                    {result.blogs.length === 0 ? <p>검색된 블로그 글이 없습니다</p>
                    :(
                        <ul>
                            {result.blogs.map((blog:any)=>(
                                <li key={blog.id}>
                                    <S.Datespan>
                                        [{blog.date_str}]
                                    </S.Datespan>
                                    {blog.text_content}
                                </li>
                            ))}
                        </ul>
                    )}
                </S.SearchBlogResultWrap>

                <S.SearchQResultWrap>
                    <h5>문의 내역 ({result.contacts.length}건)</h5>
                    {result.contacts.length===0 ? <p>검색된 문의 내역이 없습니다</p>
                    :(
                        <ul>
                            {result.contacts.map((contact:any)=>(
                                <li key={contact.id}>
                                    <strong>
                                    {contact.name}
                                    </strong>
                                    :{contact.message}
                                </li>
                            ))}
                        </ul>
                    )}
                </S.SearchQResultWrap>
                </>
                )}
            </S.SearchResultWrap>
        </Layout>
    )
}