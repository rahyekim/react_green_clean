import work01 from '../../assets/images/p-images/work01.jpg'
import work02 from '../../assets/images/p-images/work02.jpg'
import work03 from '../../assets/images/p-images/work03.jpg'
import work04 from '../../assets/images/p-images/work04.jpg'
import work05 from '../../assets/images/p-images/work05.jpg'
import work06 from '../../assets/images/p-images/work06.jpg'
import work07 from '../../assets/images/p-images/work07.jpg'
import work08 from '../../assets/images/p-images/work08.jpg'


export default function Work  () {
    
    return(
        <>
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
        </>
    )
}