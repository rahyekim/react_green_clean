
const Media = () => {
    return(
        <>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="mt-70"> html Media </h1>
                    <video width="100%" controls>
                        <source src="/motion/motion.mp4" type="video/mp4"/>
                        너의 컴퓨터는 이 비디오 태그가 지원되지 아니함
                    </video>

                </div>
            </div>
        </div>

        
        </>
    )
}

export default Media;
