
const FlexWeb = ()=>{


    return(
        <>
        <div className="banner">
            <h4>Lorem, ipsum dolor sit amet consectetur adipisicing.</h4>
        </div>

        <header className="Header">
            <h1>My website</h1>
            <p>With a <b>felxible</b> layout </p>
        </header>

        <nav className="Navbar">
            <a href="#">Link</a>
            <a href="#">Link</a>
            <a href="#">Link</a>
            <a href="#">Link</a>
        </nav>

        <div className="fluid">
            <aside className="side">
                <h2>About me</h2>
                <h5>Photo of me</h5>
                <div className="fakeimg h-200">Image</div>
                    
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores earum quos hic.</p>
                <h3>More Text</h3>
                <p>Lorem ipsum dolor sit.</p>
                
                <div className="fakeimg h-60">Image</div><br />
                <div className="fakeimg h-60">Image</div><br />
                <div className="fakeimg h-60">Image</div><br />

            </aside>
       
            <main className="main">
                <h2>TITLE HEADING</h2>
                <h5>Title description, Oct 7, 2025</h5>
                <div className="fakeimg h-200">Image</div>
                    <p>some...</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <br />
                    <h2>TITLE HEADING</h2>
                    <h5>Title description, Sep 2, 2025</h5>
                <div className="fakeimg h-200">Image</div>
                    <p>some...text</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus sequi quo necessitatibus.</p>
            </main>
       </div>

        <footer className="Footer">
                <h2>Footer</h2>
            </footer>

        </>
    )
};


export default FlexWeb;