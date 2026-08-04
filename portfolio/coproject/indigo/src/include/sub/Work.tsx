
import { useEffect, useState } from 'react'
import axios from 'axios'

import * as S from '../../assets/css/front.styled'


//백엔드에서 받아올 데이터 형태 정의

interface WorkImgs {
    id: number;
    previewUrl: string;

}

interface WorkData{
    rowCount: number;
    images: WorkImgs[];
}


export default function Work  () {

    const [workData, setWorkData]= useState<WorkData>({
        rowCount: 2,
        images:[]
    })

    useEffect(()=>{
        const fetchWorkData = async()=>{

            try{
               const res= await axios.get('http://localhost:5000/api/settings/work')
               if(res.data){
                   setWorkData({ 
                    rowCount: res.data.rowCount,
                    images: res.data.images
                })
               }
            }catch(err){
                console.error("work데이터 불러오기 에러",err)
            }
        }
        fetchWorkData();
    }, [])
    
    // --화면에 보여줄 이미지 계산 ----

    const imgToshow = workData.rowCount === 1 ? workData.images.slice(0,4) : 
            workData.images.slice(0,8);
                    
    return(
        <>
        <S.WorkSection>
            <S.Container>
                <S.SectionTitle>WORK</S.SectionTitle>
                <S.GridWrap>
                    {imgToshow.length>0 && 
                    imgToshow.map((img,idx)=>(
                        <S.GridItem key={img.id}>
                            <S.WorkImg
                            src={`http://localhost:5000${img.previewUrl}`}
                            alt={`work 포트폴리오 ${idx+1}`}
                            />
                        </S.GridItem>
                    ))}
                    { imgToshow.length === 0 && 
                    <S.EmptyState>
                        등록된 포트폴리오가 없습니다
                    </S.EmptyState>
                    }
                </S.GridWrap>
            </S.Container>
        </S.WorkSection>
        </>
    )
}


/*

  <section className="work-section cfixed">
                <h2 className="sec-tit">WORKS</h2>
                <ul className="work-list">
                    <li>
                        <a href="">
                            <div className='info'>
                                <h3>Running</h3>
                                <span>WEB/PRINT</span>
                            </div>
                            <img src={work01} alt="" />
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <div className='info'>
                                <h3>Rugby</h3>
                                <span>WEB/PRINT</span>
                            </div>
                            <img src={work02} alt="" />
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <div className='info'>
                                <h3>WEIGHT</h3>
                                <span>WEB/PRINT</span>
                            </div>
                            <img src={work03} alt="" />
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <div className='info'>
                                <h3>MARATHON</h3>
                                <span>WEB/PRINT</span>
                            </div>
                            <img src={work04} alt="" />
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <div className='info'>
                                <h3>BOXING</h3>
                                <span>WEB/PRINT</span>
                            </div>
                            <img src={work05} alt="" />
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <div className='info'>
                                <h3>ICE HOCKEY</h3>
                                <span>WEB/PRINT</span>
                            </div>
                            <img src={work06} alt="" />
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <div className='info'>
                                <h3>BOARD</h3>
                                <span>WEB/PRINT</span>
                            </div>
                            <img src={work07} alt="" />
                        </a>
                    </li>
                     <li>
                        <a href="">
                            <div className='info'>
                                <h3>Basketball</h3>
                                <span>WEB/PRINT</span>
                            </div>
                            <img src={work08} alt="" />
                        </a>
                    </li>
                </ul>
            </section>

import work01 from '../../assets/images/p-images/work01.jpg'
import work02 from '../../assets/images/p-images/work02.jpg'
import work03 from '../../assets/images/p-images/work03.jpg'
import work04 from '../../assets/images/p-images/work04.jpg'
import work05 from '../../assets/images/p-images/work05.jpg'
import work06 from '../../assets/images/p-images/work06.jpg'
import work07 from '../../assets/images/p-images/work07.jpg'
import work08 from '../../assets/images/p-images/work08.jpg'

*/