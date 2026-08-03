import blog01 from '../../assets/images/p-images/blog01.jpg'
import blog02 from '../../assets/images/p-images/blog02.jpg'
import blog03 from '../../assets/images/p-images/blog03.jpg'

export default function Blog  () {
    
    return(
        <>
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
        
        </>
    )
}