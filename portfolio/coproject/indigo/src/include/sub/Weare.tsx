

import { useState, useEffect } from 'react'
import axios from 'axios'

// import * as S from "../css/sub.styled"


interface FeatureItem{
    id: number,
    icon: string,
    title: string,
    description: string
}

export const Weare = ()=>{

    const [mainTitle, setMainTitle]=useState('WE ARE');
    const [mainDescription, setMainDescription] =useState('')
    const [feature, setFeature]=useState<FeatureItem[]>([]);
    
    useEffect(()=>{

        const fetchWeareData = async()=>{

            try{
            
                const res = await axios.get('http://localhost:5000/api/settings/weare')
                
                //받아온 데이터 상태에 넣기
                setMainTitle(res.data.mainTitle);
                setMainDescription(res.data.mainDescription);
                setFeature(res.data.feature)

            }catch(err){
                console.error("weare설정불러오기중에러",err)
                alert("we are 설정 불러오기 실패")
            }
        }
        fetchWeareData();
    }, [])

    return(
            <>
            <section className="display-section">
                <div className="container">
                    <h2 className="sec-tit">
                        {mainTitle || 'WE ARE'}
                    </h2>
                    <p className="desc">
                        {mainDescription || '관리자 페이지에서 메인 설명글을 등록해주세요'}
                    </p>
                </div>
            </section>

            <section className="promotion-section">
                <div className="container">
                    <ul className="promo-list">
                        {feature && feature.length > 0 ?(
                            feature.map(ft => (
                                <li key={ft.id}>
                                    <a href="#">
                                        <i className={ft.icon} />
                                        {/* <img src={ft.icon} alt={ft.title} /> */}
                                        <h3>{ft.title}</h3>
                                        <p>{ft.description}</p>
                                    </a>
                                </li>
                            ))
                        ): (
                        //등록된 화면이 하나도 없을때 보여줄 화면 
                        <li>
                            <p style={{padding:'50px 0', color:'#999'}}>
                                등록된 promotion 항목이 없습니다
                            </p>
                        </li>
                        )}
                    </ul>
                </div>
            </section>
        </>
    )
}


/*

import promo01 from '../../assets/images/s-images/promo01.png'
import promo02 from '../../assets/images/s-images/promo02.png'
import promo03 from '../../assets/images/s-images/promo03.png'
import promo04 from '../../assets/images/s-images/promo04.png'
 */