


const Grid = () => {

    return(
        <>
        <div className="grid-container">
            <header className="grid-header">
                Header/ company logo
            </header>
            <nav className="grid-nav">
                <ul>
                    <li><a href="#">Link1</a></li>
                    <li><a href="#">Link2</a></li>
                    <li><a href="#">Link3</a></li>
                </ul>
            </nav>

            <div className="grid-content">
                <h1>content area</h1>
                <p>567pixels</p>
                <p>then 576 and 767pixels wide</p>
                <p>767pixels wide</p>
                <p>responsive effect</p>
            </div>
            <div className="sidebar">Sidebar</div>
            <aside className="ads">Ads</aside>
            <footer className="grid-footer">the Footer</footer>
            
        </div>
        
        </>
    )
};

export default Grid;