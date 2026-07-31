import promo01 from '../../assets/images/s-images/promo01.png'
import promo02 from '../../assets/images/s-images/promo02.png'
import promo03 from '../../assets/images/s-images/promo03.png'
import promo04 from '../../assets/images/s-images/promo04.png'

import { useState, useEffect } from 'react'
import axios from 'axios'

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

        const fetchMain = async()=>{

            try{
            
                const res = await axios.get('http://localhost:5000/api/settings/weare')
                

            }catch(err){
                console.error("weare설정불러오기중에러",err)
            }
        }
        fetchMain();
    }, [])

    return(
        <>
        <section className="content">
            <section className="display-section">
                <div className="container">
                    <h2 className="sec-tit">
                        WE ATE
                    </h2>
                    <p className="desc">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error impedit aliquam optio excepturi porro eum dicta inventore saepe pariatur hic?
                    </p>
                </div>
            </section>

            <section className="promotion-section">
                <div className="container">
                    <ul className="promo-list">
                        <li>
                            <a href="">
                                <img src={promo01} alt="house icon" />
                                <h3>HOME</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, reprehenderit?</p>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src={promo02} alt="person icon" />
                                <h3>WE ARE</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta, minus.</p>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src={promo03} alt="work icon" />
                                <h3>WORK</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, reprehenderit?</p>

                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src={promo04} alt="blog icon" />
                                <h3>BLOG</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, reprehenderit?</p>
                            </a>
                        </li>
                        
                    </ul>
                </div>
            </section>
        </section>
        </>
    )
}