
import React, { useState, useEffect } from "react";
import axios from 'axios'

import { Layout } from "../../component/layout/Layout";
import * as S from "../css/sub.styled"

//개별이미지 데이터 형태를 정의
interface WorkImg {
    id: number;
    previewUrl: string;
    file: File | null;
}



export default function WorkSetting (){


    //1. 1줄(4장)노출할지, 2줄(8장)노출할지 결정하는 상태(기본값 2줄)
    const [rowCount, setRowCount]=useState<1 | 2>(2);
    const [imgs, setImgs] = useState<WorkImg[]>(
        Array.from({length:8}).map(( _, idx)=>({
            id: idx, 
            previewUrl: '', 
            file: null
        }))
    )

    useEffect(()=>{
    const fetchSettings = async()=>{
        try{
            const res = await axios.get('http://localhost:5000/api/settings/work')
            setRowCount(res?.data.rowCount);

            const dbImgs = res.data.images;
            const initialImg = Array.from({length:8}).map((_,idx)=>{
                if(dbImgs[idx]){
                    return{
                        id:idx,
                        previewUrl: `http://localhost:5000${dbImgs[idx].previewUrl}`,
                        file:null
                    }
                }
                return {id: idx, previewUrl: '', file:null}
            })
            setImgs(initialImg);

        }catch(err){
            console.error("관리자 설정 불러오기중 에러", err)
        }
    }
    fetchSettings();
    }, [])

    //2. 조작함수 줄수를 바꾸는 라디오 버튼 핸들러

    const handleRowCountChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        //input의 value는 string이므로 숫자로 변환해서 상태에 넣음
        setRowCount(Number(e.target.value) as 1 | 2);

    }

    //3. 파일 선택 업로드시 실행되는 핸들러
    const handleFileChange = (idx: number, e:React.ChangeEvent<HTMLInputElement>)=>{

        //사용자가 선택한 파일을 꺼냄
        const selectedFile = e.target.files?.[0]; //🌟처음꺼!!! 

        if(!selectedFile) return;
        
        if(selectedFile){
            //🌟선택한 파일을 브라우저 화면에 띄울 수 있도록 가짜(임시) url을 만든다
            const tempUrl = URL.createObjectURL(selectedFile);

            //🌟기존 이미지 배열을 복사한 뒤 => ✨내가 클릭한 칸(idx)의 데이터만 덮어씌운다
            const newImgs = [...imgs];  //배열 복사

            if(newImgs[idx].previewUrl){
                URL.revokeObjectURL(newImgs[idx].previewUrl);
            }
            // //페이지를 닫거나 새로고침하기 전까지 메모리에 계속 남음

            newImgs[idx] = {
                ...newImgs[idx],
                previewUrl: tempUrl,
                file: selectedFile
            };
            //변경된 배열을 상태 반영(저장)
            setImgs(newImgs);

            //동일한 파일 재선택 가능하도록 초기화
            e.target.value = "";  //=> 파일명이 안보임 => 파일명을 숨기거나... ref 사용해서 handleRemove 
        }
    };
    /*state상태는 지워졌어도
    HTML <input> 태그 내부에는 여전히 ".jpg"가 입력된 상태 */

    //4.업로드된 이미지를 취소 삭제하는 핸들러
    const handleRemoveImg = (idx:number)=>{

        const newImgs = [...imgs];

        //기존 메모리 url해제
        if(newImgs[idx].previewUrl){
            URL.revokeObjectURL(newImgs[idx].previewUrl)
        }
        
        //다시 빈칸으로 초기화..
        newImgs[idx] = {
            id:idx,
            previewUrl: '',
            file: null
        };
        setImgs(newImgs);
    }

    // ---설정 저장 함수----

    const handleSave = async()=>{
        
        //✅[중요] 진짜 파일(사진)을 보낼 때는 🔥FormData라는 특수한 상자를 써야함✅
        //이미지나 파일(File) 같은 바이너리(Binary) 데이터는 일반 JSON 문자열로 변환해서 보낼 수 없기 때문
        const formData = new FormData ();
        //1.줄 수 데이터를 상자에 담음
        formData.append('rowCount', String(rowCount));

        //2. 만약 1줄(4장) 선택했다면 앞의 4장만, 2줄이면 8장 전체를 잘라냄
        const imgsToSave = rowCount === 1 ? imgs.slice(0,4) : imgs;

        //3.잘라낸 이미지들을 순서대로 상자에 담음

        imgsToSave.forEach((img,idx)=> {
            if(img.file){
                formData.append('workImages', img.file);
            }
        }) 
        
//{headers:{'Content-Type': 'multipart/form-data'}         }
        try{
            await axios.post("http://localhost:5000/api/settings/work", formData)

            console.log('저장될 줄수:', rowCount);
            console.log("업로드된 파일들: ", formData.getAll('workImages'));

            alert("Work설정이 성공적으로 저장")

        }catch(err){
            console.error("저장실패", err);
            alert("설정 저장 중 오류 발생")

        }
    };

    // ---- 4.화면 그리기 -----
    
    const visibleImages= rowCount === 1 ? imgs.slice(0,4) : imgs ;

    return(
        <>
        <Layout>
            <S.PageWrapper>
                <S.PageTitle>WORK 섹션 환경 설정</S.PageTitle>
                <S.Card>
                    <S.SectionTitle>1. 노출 줄(rows)수 선택</S.SectionTitle>
                    <S.FormGroup>
                        <S.RadioGroup>
                            <label>
                                <S.Input
                                type="radio"
                                value={1}
                                checked={rowCount===1}
                                onChange={handleRowCountChange}
                                /> 1줄 노출 ( 총 4장 )
                            </label>

                            <label>
                                <S.Input
                                type="radio"
                                value={2}
                                checked={rowCount===2}
                                onChange={handleRowCountChange}
                                /> 2줄 노출 ( 총 8장 )
                            </label>
                        </S.RadioGroup>
                    </S.FormGroup>
                </S.Card>

                <S.Card>
                    <S.SectionTitle>2.포트폴리오 이미지 업로드</S.SectionTitle>
                    <S.GridWrap>
                        {visibleImages.map((img,idx)=>(
                        <S.DivKey key={img.id}>
{/* 미리보기 이미지가 있으면 보여주고 없으면 회색 빈박스 보여줌 */}
                            {img.previewUrl ? (
                                //  <!-- 📌 기준점이 되는 부모 // X 가 우측상단에 absolut찰싹붙음 -->
                                <S.Relative>
                                    <img src={img.previewUrl} alt={`미리보기 ${idx+1}`}/>
                                    <S.Exit 
                                    variant="danger"
                                    onClick={()=>handleRemoveImg(img.id)}>X</S.Exit>
                                </S.Relative>
                            ) : (
                                <S.NoneImage>
                                    이미지 {idx+1}
                                </S.NoneImage>
                            )}

                            {/* <S.FileUpload
                            type="file"
                            accept="image/*" //이미지만 업로드되게
                            onChange={e=>handleFileChange(idx,e)}
                            /> */}
                        <S.CustomFileButton>
                            <S.FileUpload
                            style={{display:"none"}}
                            type="file"
                            accept="image/*" //이미지만 업로드되게
                            onChange={e=>handleFileChange(idx,e)}
                            />
                            {img.previewUrl? "이미지변경" : "파일 업로드"}
                        </S.CustomFileButton>

                        </S.DivKey>
                        ))}
                    </S.GridWrap>
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


1. 전송 방식(Content-Type)의 차이
일반 JSON 요청 (application/json):
텍스트만 보낼 때 사용하는 방식입니다. 
순수한 글자 데이터만 담을 수 있어서 컴퓨터의 실제 파일(이미지, 동영상 등)은
 이 상자에 담을 수가 없습니다.

2. FormData 요청 (multipart/form-data):
파일을 보낼 때 사용하는 특수한 택배 상자입니다. 
이 상자는 텍스트와 실제 파일(Binary)을 동시에 쪼개서(Multi-part) 
안전하게 실어 나를 수 있는 기능을 가지고 있습니다.

*/

/*
forEach의 한계:
중간에 멈출 수(break) 없고, 끝까지 무조건 다 돈다는 단점

for...of 문: break와 continue를 쓸 수 있어 중간 정지가 가능하며, 코드가 가장 직관적이고 깔끔

some() 메서드: 조건이 맞을 때(true) 즉시 반복을 멈추고 빠져나올 수 있는 최신 고차 함수 방식
특정한 조건을 만족하는 요소가 하나라도 있는지"를 검사(인증/검증)할 때
*/


/*


{
    "rowCount": "1",   //👈백엔드: rowCount:UploadFile  (파일1개)
    "workImgs": [ File1, File2, File3 ]  // 
    // 👈 백엔드가 배열 형태로 수신함! workImgs: List[UploadFile] (배열)
  }


*/

/*
URL.revokeObjectURL: 메모리 등록 해제(삭제)

 */


/*동일한 파일 재선택 가능하도록 초기화 e.target.value= "" 대체방법

state상태는 지워졌어도
    HTML <input> 태그 내부에는 여전히 ".jpg"가 입력된 상태 

// 1. 배열 형태의 ref 생성
const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

// 2. 각 index(0, 1, 2, 3...) 위치에 해당 input을 저장
<input
  type="file"
  accept="image/*"
  ref={(element) => (fileInputRefs.current[idx] = element)}
  onChange={(e) => handleFileChange(idx, e)}
/>

// 해당 칸의 input value 비우기
  if (fileInputRefs.current[idx]) {
    fileInputRefs.current[idx]?.value = "";
  }

 */