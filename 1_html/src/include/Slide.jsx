
const Slide = () => {
    return(
        <>
<div className="carousel slide" id="demo" data-bs-ride="carousel">
    <div className="carousel-indicators">
        <button type="button" data-bs-target="#demo" 
        data-bs-slide-to="0" className="active"></button>
        <button type="button" data-bs-target="#demo"
        data-bs-slide-to="1"></button>
        <button type="button" data-bs-target="#demo"
        data-bs-slide-to="2"></button>
    </div>

    <div className="carousel-inner">
        <div className="carousel-item active">
            <img src="/img/la.jpg" alt="Los Angeles" className="w-100 d-block" />
        </div>
        <div className="carousel-item">
            <img src="/img/chicago.jpg" alt="Chicago" className="w-100 d-block" />
        </div>
        <div className="carousel-item">
            <img src="/img/ny.jpg" alt="New york" className="w-100 d-block"/>
        </div>
    </div>

    <button type="button" className="carousel-control-prev"
     data-bs-target="#demo" data-bs-slide="prev">
        <span className="carousel-control-prev-icon"></span>
     </button>
    <button type="button" className="carousel-control-next"
    data-bs-target="#demo" data-bs-slide="next">
        <span className="carousel-control-next-icon"></span>
    </button>
</div>
        
        
        </>
    )
}

export default Slide ;
