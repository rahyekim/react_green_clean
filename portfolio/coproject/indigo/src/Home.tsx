


import { Weare } from './include/sub/Weare'
import Work from './include/sub/Work'
import Blog from './include/sub/Blog'
import Contact from './include/sub/Contact'

export default function Home  () {

    return(
        <>
        <section className="content">
            <Weare/>
            <hr className='divider'/>
            <Work/>
            <hr className='m-divider'/>
            <Blog/>
            <Contact/>
        </section>
        </>
    )
}
