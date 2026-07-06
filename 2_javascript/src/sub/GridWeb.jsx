import { useEffect, useState } from "react";
import { Container,Col, Row, Button } from "react-bootstrap";

const GridWeb = ()=> {
    
    return(
        <>
        <div className="wrap">
            <header className="w-header">
                <h1>logo</h1>
            </header>
                <nav className="w-nav">
                    <ul>
                        <li><a href="#">Link1</a></li>
                        <li><a href="#">Link2</a></li>
                        <li><a href="#">Link3</a></li>
                        <li><a href="#">Link4</a></li>
                    </ul>
                </nav>
            

            <main className="w-content">
                <h1>Content area</h1>
                <p>화면 크기를 조절하여 layout을 확인하세요 😍</p>
            </main>

            <aside className="w-sidebar">
                <div className="">Sidebar</div>
            </aside>

            <div className="w-abs">abs</div>

            <footer className="w-footer">the footer</footer>

        </div>
        
        </>
    )
};

export default GridWeb;