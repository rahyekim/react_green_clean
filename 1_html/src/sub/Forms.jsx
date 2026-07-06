
const Forms = () => {
    return(
        <>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="mt-70"> 
                    html <small className="text-secondary">-Forms</small> 
                    </h1>

                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                    <form action="">
                        <label htmlFor="" className="form-label">first name</label><br />
                        <input type="text" name="" id="" placeholder="이름을 적어" className="form-control w-75"/>
                        <br />
                        <label htmlFor="" className="form-label">last name</label><br />
                        <input type="text" name="" id="" placeholder="성을 적어라" className="form-control w-75"/>
                        <br />
                        <div className="d-flex justify-content-end">
                        <input type="submit" value=" 입력 " className="btn btn-outline-primary btn-lg"/>
                        </div>
                    </form>

                </div>
                <div className="col-md-4">
                    <p>성별체크</p>
                    <input type="checkbox" />
                    <label htmlFor="">남</label><br />
                    <input type="checkbox" />
                    <label htmlFor="">녀</label><br />
                    <input type="radio" />
                    <label htmlFor="">기타</label><br />
                </div>
                
                <div className="col-md-4">
                 <p>이메일</p>
                 <input type="text" placeholder="이메일 적어" />
                  @ 
                 <select name="" id="">
                    <option value="">gmail.com</option>
                    <option value="">naver.com</option>
                    <option value="">kakao.com</option>
                 </select>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                     <label className="form-label">패스워드</label>
                    <input type="password" className="form-control mb-2" placeholder="패스워드 입력해" /> <br />
                     <label className="form-label">다시 패스워드 </label>
                    <input type="password" className="form-control" placeholder="패스워드를 다시 입력하세요" />
                </div>
                <div className="col-md-4"></div>
                <div className="col-md-4"></div>
            </div>

            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4"></div>
                <div className="col-md-4"></div>
            </div>

            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4"></div>
                <div className="col-md-4"></div>
            </div>
            
            
            
        </div>

        
        </>
    )
}

export default Forms;
