import React, { useState, useEffect } from "react";
import axios from 'axios'

import { Layout } from "../../component/layout/Layout";
import * as S from "../css/sub.styled"


interface BlogItem {
    id: number;           //고유식별 번호
    previewUrl: string;  // 화면에 보여줄 이미지 미리보기 주소
    file: File | null;  // 백엔드로 보낼 실제 이미지 파일
    date: string;   // 자동으로 찍힐 작성시간(날짜)
    text: string;  // 관리자가 입력할 블로그 제목 설명글

}
export default function BlogSetting (){

    //블로그를 1줄(3개) 보여줄지, 2줄(6개)보여줄지 결정하는 상태(기본값1)
    const [rowCount, setRowCount] = useState<1 | 2>(1);
    
    const [blogs, setBlogs] = useState<BlogItem[]>(
        Array.from({length:6}).map((_ ,idx)=> ({  // 🌟 여기서 6개짜리 방을 만듭니다!
            id: idx, 
            previewUrl: "", 
            file:null,
            date:"", 
            text:"",
        }))
    );

    useEffect(()=>{

        const fetchBlog = async()=>{

            try{
                const res = await axios.get("http://localhost:5000/api/settings/blog")
                if(res.data){
                    // 🌟 핵심: res.data.rowCount를 Number()로 감싸 숫자로 변환..
                    // 네트워크통신은 무조건 문자열로온다고봐야
                    const row = Number(res.data.rowCount);
                    setRowCount( row === 2? 2:1 );
                    // setRowCount(res.data.rowCount) -> 숫자로 못읽어서 라디오체크도안되고 2줄 다나옴
                    const dbBlogs = res.data.blogs;
                    //DB에서 가져온 데이터를 내 6칸짜리 배열에 맞춤
                    const initialBlogs = Array.from({length:6}).map((_,idx)=>{
                        if(dbBlogs[idx]){
                            return {
                                id: idx,
                                //사진 주소앞에 백엔드주소를 붙여서 사진을 보이게함
                                previewUrl: `http://localhost:5000${dbBlogs[idx].image_url}`,
                                //이미 서버에 있는 사진이므로 진짜 파일은 없음
                                file: null,
                                date: dbBlogs[idx].date_str || '', //날짜넣기
                                text: dbBlogs[idx].text_content || '' //글넣기
                            }
                        }//db에 데이터가 없으면 그냥 빈칸으로 둠
                        return({id: idx, previewUrl:"", file:null, date: "", text:""});
                    }
                    ); //완성된6칸배열을 내 상태에 최종 저장
                    setBlogs(initialBlogs);
                }
            }catch(err){
                console.error("블로그설정 불러오기 에러: ",err)
                alert("블로그 설정 불러오기 실패")
            }
        }
        fetchBlog();
    },[])

    // ---2.날짜 자동생성 함수 -----
    const getTodayDate = ()=>{
        const today = new Date();
        
        // :Intl.DateTimeFormatOptions 안먹혀=> as const 써줌
        const options= {
            year: 'numeric'as const,   // "numeric" 그냥 평범한글자로 취급 
            month: 'short' as const,   // 그래서 의심해서 빨간줄띄움
            day: 'numeric' as const    //👈as const 그 규칙에 딱 맞는 단어구나! 
        };
        return today.toLocaleDateString('en-US', options).toUpperCase();
    }

    //줄 수 변경시 실행되는 함수
    const handleRowCountChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
        setRowCount( Number(e.target.value) as 1 | 2)
    }

    
    //이미지 파일 첨부시 실행되는 함수
    const handleFileChange = (idx:number, e:React.ChangeEvent<HTMLInputElement>)=>{

        const selectedFile = e.target.files?.[0]; //🌟처음꺼!

        if(selectedFile){

            //브라우저용 미리보기 url생성
            const tempUrl = URL.createObjectURL(selectedFile);
            
            const newBlogs = [...blogs]  //기존배열복사

            if(newBlogs[idx].previewUrl){
                URL.revokeObjectURL(newBlogs[idx].previewUrl);
            }

            newBlogs[idx] = {
                ...newBlogs[idx],
                previewUrl: tempUrl,
                file: selectedFile,
                //이미지 올린순간 오늘날짜가 자동으로 쏙 들어감
                date: newBlogs[idx].date || getTodayDate(),
            };
            setBlogs(newBlogs); //변경된 내용 저장

            e.target.value=''; //동일한 파일 재선택 가능
        }
        


    }
    //텍스트 입력시 실행되는 함수
    const handleTextChange = (idx:number , value:string)=>{

        const newBlogs = [...blogs];

        newBlogs[idx].text=value;
        
        //📌 글자를 채우기 시작하는 순간 날짜 자동 생성
        //이미지 안올리고 글부터 썼다면, 이때도 '오늘 날짜'를 자동으로 찍어줌
        if(!newBlogs[idx].date && value.trim() !== ""){
            newBlogs[idx].date = getTodayDate();
        }
        //📌 글도 지우고 첨부된 이미지 파일도 없으면 날짜 초기화
        if(value.trim()==='' && !newBlogs[idx].file && !newBlogs[idx].previewUrl){
            newBlogs[idx].date= "";
        }
        setBlogs(newBlogs);

    }
    
    //항목 삭제시 (초기화) 실행되는 함수
    const handleRemoveBlog = (idx:number)=>{

        const newBlogs = [...blogs];

         //기존 메모리 url해제
        if(newBlogs[idx].previewUrl){
            URL.revokeObjectURL(newBlogs[idx].previewUrl)
        }
        //선택한 칸을 완전히 비운다
        newBlogs[idx] = {
            id: idx,
            previewUrl: '',
            file: null,
            date: '',
            text: '',
        }
        setBlogs(newBlogs);
    }

    //설정 저장 함수
    const handleSave = async()=>{

        //이미지가 포함된 데이터를 보낼 때는 FormData라는 상자를 씁니다
        const formData = new FormData();

        //rows몇줄인지 상자에 담기
        formData.append('rowCount', String(rowCount));
        
        //1줄이면 3개 2줄이면 6개 잘라서 준비
        const blogsToSave = rowCount === 1 ? blogs.slice(0,3) : blogs;

        //준비된 데이터를 상자에 담는다
        blogsToSave.forEach((blog, idx)=>{
            
            //1.기존 이미지 경로 추출(새파일 없고 previewUrl있을떄만 기존경로전송)
            const existingUrl = blog.file 
            ? '' 
            : blog.previewUrl.replace('http://localhost:5000', '');
            //앞에 도메인주소는 지우고 /uploads/a.jpg라는 순수 경로만 남김
            
            formData.append('blogExistingImages', existingUrl);

            //2.새로 선택한 파일이 있는 경우에만 파일 전송
            if(blog.file){
                formData.append('blogImages', blog.file);
                // ⭐ 이 파일이 몇 번째 칸인지 같이 보냄
                formData.append('blogImageIdx', String(idx));
            }
            formData.append('blogTexts', blog.text);
            formData.append('blogDate', blog.date);
        })
        try{
            await axios.post("http://localhost:5000/api/settings/blog", formData,{
                headers: {'Content-Type': 'multipart/form-data'}
            })

            console.log("저장된 줄 수: ", rowCount);
            console.log("저장된 블로그 데이터: ", blogsToSave);
            console.log("업로드된 파일들: ", formData.getAll('blogImages'));
             
            alert("BlOG 설정 성공적으로 저장")
            
        }catch(err){
            console.error("blog 설정 저장실패: ", err)
            alert("blog설정 저장중 오류발생!")
        }
    }

    //화면에 보여줄 칸 수를 계산 ( 1줄 3칸 , 2줄 6칸)
    const visibleBlogs = rowCount === 1? blogs.slice(0,3) : blogs;


    return(
        <>
        <Layout>
            <S.PageWrapper>
                <S.PageTitle>BLOG 섹션 환경설정</S.PageTitle>
                <S.Card>
                    <S.SectionTitle>1.노출 줄 수 선택(1줄당 3개)</S.SectionTitle>
                    <S.FormGroup>
                        <S.RadioGroup>
                            <label>
                                <S.Input
                                type="radio"
                                value={1}
                                checked={rowCount === 1}
                                onChange={handleRowCountChange}
                                /> 1줄 노출(총 3개)
                            </label>
                             <label>
                                <S.Input
                                type="radio"
                                value={2}
                                checked={rowCount === 2}
                                onChange={handleRowCountChange}
                                /> 2줄 노출(총 6개)
                            </label>
                        </S.RadioGroup>
                    </S.FormGroup>
                </S.Card>

                <S.Card>
                    <S.SectionTitle>2. 블로그 항목 등록</S.SectionTitle>
                    <S.GridWrap3>
                        {visibleBlogs.map((blog,idx)=>(
                            <S.BlogKey key={blog.id}>
                                <S.BlogImgWrap>
                                    {blog.previewUrl ? (
                                        <>
                                        <S.BlogImg 
                                        src={blog.previewUrl} 
                                        alt={`블로그이미지 ${idx+1}`} />
                                        <S.Exit
                                        variant="danger"
                                        onClick={()=>handleRemoveBlog(idx)}
                                        >X</S.Exit>
                                        </>
                                    ):(
                                        <S.BottomInfo>
                                            이미지 {idx+1} 첨부
                                        </S.BottomInfo>
                                    )}    
                                    {/*🌟 파일 업로드 */}
                                     <S.CustomFileButton>
                                        <S.FileUpload
                                        style={{display:"none"}}
                                        type="file"
                                        accept="image/*"
                                        onChange={(e)=>handleFileChange(idx,e)}
                                        /> 
                                        {blog.previewUrl? "이미지변경" : "사진 업로드"}
                                    </S.CustomFileButton>
                                </S.BlogImgWrap>     
                                    
                                {/* 🌟 날짜 표시용 인풋 */}
                                <div className="mt-2">
                                    <S.FileUpload
                                    type="text"
                                    value={blog.date}
                                    readOnly
                                    placeholder="*이미지나 글을 올리면 날짜가 자동으로"
                                    />
                                </div>
                                {/* 🌟 텍스트 입력창 */}
                                <S.TextArea
                                    value={blog.text}
                                    onChange={e=>handleTextChange(idx, e.target.value)}
                                    placeholder="블로그 내용 입력"
                                    />
                               
                            </S.BlogKey>
                        ))}
                    </S.GridWrap3>
                </S.Card>

                <S.SaveBtnWrap>
                    <S.ButtonPrimary
                    variant="primary"
                    onClick={handleSave}
                    >
                        설정 저장
                    </S.ButtonPrimary>
                </S.SaveBtnWrap>
                
            </S.PageWrapper>

        </Layout>
        </>
    )
}



/*

//설정 저장 함수
    const handleSave = async()=>{

        //이미지가 포함된 데이터를 보낼 때는 FormData라는 상자를 씁니다
        const formData = new FormData();

        //rows몇줄인지 상자에 담기
        formData.append('rowCount', String(rowCount));
        
        //1줄이면 3개 2줄이면 6개 잘라서 준비
        const blogsToSave = rowCount === 1 ? blogs.slice(0,3) : blogs;

        //준비된 데이터를 상자에 담는다
        blogsToSave.forEach((blog, idx)=>{
            if(blog.file){

                //이미지가잇으면 blogImages라는 이름표를 붙여 상자에 넣는다
                formData.append('blogImages', blog.file);
            }
            //텍스트와 날짜도 짝을 맞추기위해 배열형태로 상자에 넣음
            formData.append('blogTexts', blog.text);
            formData.append('blogDate', blog.date);
        })
        try{
            await axios.post("http://localhost:5000/api/settings/blog", formData,{
                headers: {'Content-Type': 'multipart/form-data'}
            })

            console.log("저장된 줄 수: ", rowCount);
            console.log("저장된 블로그 데이터: ", blogsToSave);

            alert("BlOG 설정 성공적으로 저장")
            
        }catch(err){
            console.error("blog 설정 저장실패: ", err)
            alert("blog설정 저장중 오류발생!")
        }
    }



*/