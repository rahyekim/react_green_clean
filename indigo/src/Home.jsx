import promo01 from './assets/images/s-images/promo01.png'
import promo02 from './assets/images/s-images/promo02.png'
import promo03 from './assets/images/s-images/promo03.png'
import promo04 from './assets/images/s-images/promo04.png'

import work01 from './assets/images/p-images/work01.jpg'
import work02 from './assets/images/p-images/work02.jpg'
import work03 from './assets/images/p-images/work03.jpg'
import work04 from './assets/images/p-images/work04.jpg'
import work05 from './assets/images/p-images/work05.jpg'
import work06 from './assets/images/p-images/work06.jpg'
import work07 from './assets/images/p-images/work07.jpg'
import work08 from './assets/images/p-images/work08.jpg'

import blog01 from './assets/images/p-images/blog01.jpg'
import blog02 from './assets/images/p-images/blog02.jpg'
import blog03 from './assets/images/p-images/blog03.jpg'

const Home = () => {

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
                                <img src={promo02} alt="house icon" />
                                <h3>WE ARE</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta, minus.</p>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src={promo03} alt="house icon" />
                                <h3>WORK</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, reprehenderit?</p>

                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src={promo04} alt="house icon" />
                                <h3>BLOG</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, reprehenderit?</p>
                            </a>
                        </li>
                        
                    </ul>
                </div>
            </section>

            <hr className='divider'/>

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

            <hr className='m-divider'/>

            <section className="blog-section">
                <div className="container">
                    <h2 className="sec-tit">BLOG</h2>
                    <ul className="blog-list">
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
                    </ul>
                </div>
            </section>

            <section className="contact-section">
                <div className="container">
                    <h2 className="sec-tit">CONTACT</h2>
                    <div className="form-box">
                        <form action="">
                            <fieldset className="cfixed">
                                <legend className="blind">CONTACT US</legend>
                                <div className="form">
                                    <label htmlFor="name" className="blind">name</label>
                                    <input type="text" id="name" placeholder='Name' />

                                    <label htmlFor="phone" className="blind">phone</label>
                                    <input type="tel" id="phone" placeholder='phone' />

                                    <label htmlFor="email" className="blind">email</label>
                                    <input type="email" id="email" placeholder='email address' />
                                </div>

                                <div className="textarea">
                                    <label htmlFor="message" className="blind">message</label>
                                    <textarea name="message" id="message" placeholder='message'></textarea>
                                </div>
                            </fieldset>

                            <div className="send-btn">
                                <input type="submit" value={"SEND MESSAGE"} />
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            
        </section>
        </>
    )
}

export default Home;