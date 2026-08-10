import { useState } from "react"
import axios from 'axios'

export default function Contact  () {

    //상태관리
    const [formData, setFormData]=useState({
        name:'',
        phone: '',
        email: '',
        message: ''
    })

    //입력값 변경 핸들러🌟
    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        const {id, value} =e.target;
        setFormData(prev=> ({
            ...prev,
            [id]:value
        }));

    }
    //문의전송 핸들러
    const handleSubmit = async(e:React.FormEvent)=>{
        e.preventDefault(); //새로고침방지
        
        //빈칸 검사
        if(!formData.message || !formData.email || !formData.name || !formData.phone){
            alert("모든 창을 입력해주세요")
            return;
        }

        try{
            const res = await axios.post(`http://localhost:5000/api/contact/`, formData)
            alert('문의가 성공적으로 접수되엇습니다. 관리자가 확인후 답변드리겠습니다')
            setFormData({name:'', phone:'', email: '', message:''});
        }catch(err){
            console.error("문의접수에러", err)
            alert("문의접수중 에러가 발생, 잠시후 다시시도해주세요")
        }

    }
    //
    
    
    
    
    return(
        <>
        <section className="contact-section">
                <div className="container">
                    <h2 className="sec-tit">CONTACT</h2>
                    <div className="form-box">
                        {/*🌟 form에 onSubmit이벤트를 연결한다 */}
                        <form onSubmit={handleSubmit}>
                            <fieldset className="cfixed">
                                <legend className="blind">CONTACT US</legend>
                                <div className="form">
                                    <label htmlFor="name" className="blind">name</label>
                                    <input 
                                    type="text" 
                                    name="name"
                                    id="name" 
                                    placeholder='Name'
                                    value={formData.name}
                                    onChange={handleChange}
                                    />

                                    <label htmlFor="phone" className="blind">phone</label>
                                    <input 
                                    type="tel" 
                                    id="phone" 
                                    name="phone" 
                                    placeholder='phone'
                                    value={formData.phone}
                                    onChange={handleChange}
                                    />

                                    <label htmlFor="email" className="blind">email</label>
                                    <input 
                                    type="email" 
                                    id="email" 
                                    name="email"
                                    placeholder='email address'
                                    value={formData.email}
                                    onChange={handleChange}
                                    />
                                </div>

                                <div className="textarea">
                                    <label htmlFor="message" className="blind">message</label>
                                    <textarea 
                                    rows={13} 
                                    name="message" 
                                    id="message" 
                                    placeholder='message'
                                    value={formData.message}
                                    onChange={handleChange}
                                    ></textarea>
                                </div>
                            </fieldset>

                            <div className="send-btn">
                                <input type="submit" value={"SEND MESSAGE"} />
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}