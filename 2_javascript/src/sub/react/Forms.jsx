
import { useState } from "react";
import { Container,Col, Row, Button, Form} from "react-bootstrap";

const Forms = () => {

    const [name, setName] = useState("");

    function handleChange(e){
        setName(e.target.value);
    }

    
    //엔터치면 팝업창으로 이름전송
    const [uname, setUname] = useState("");

    function inputChange(e){
        setUname(e.target.value)
    }

    function formSubmit(e){
        e.preventDefault();
        alert(uname);
    }

    //textarea
    const [mytxt, setMytxt] =useState("");

    function handleTxt(e){
       setMytxt( e.target.value);
    }

    //select email
    const [email, setEmail] = useState("example@gmail.com") 
    const handleInputEmail = (e) => {
        setEmail(e.target.value)
    }


  
        const [selectedFruit, setSelectedFruit] = useState('apple');

        const handleChangeFruit = e=>{
            setSelectedFruit(e.target.value);
        }
        const fruitOptions = [
            { value: 'apple', label: '사과 🍎' },
            { value: 'banana', label: '바나나 🍌' },
            { value: 'orange', label: '오렌지 🍊' },
            { value: 'grape', label: '포도 🍇' }
          ];
    
    
    return(
        <>
        <Container fluid>
            <Row>
                <Col md={3}>
                    <h1>Forms</h1>
                    <form action=""> 
                        <label htmlFor="">Enter your name:</label>
                        <Form.Control value={name} onChange={handleChange}/>
                        <p>current name: {name}</p>
                    </form>
                </Col>
                <Col md={3}>
                    <h1>Submit</h1>
                    <form onSubmit={formSubmit}>
                        <label htmlFor=""> 이름:</label>
                        <Form.Control value={uname} onChange={inputChange}/>
                        <Button type="submit">전송</Button>
                    </form>
                </Col> 
                <Col md={3}>
                <form action="">
                    <h1> 💥 textarea </h1>
                    <p>장문의 글을 쓸때....</p>
                    <textarea name="" id="" value={mytxt} onChange={handleTxt}/>
                    <p>Current value: {mytxt}</p>
                </form>
                </Col>
                <Col md={3}>
                <h1>Select</h1>
                <form action="">
                    <select value={email} name="email" id="" onChange={handleInputEmail}>
                        <option value="">선택하세요</option>
                        <option value="gmail">gmail</option>
                        <option value="kakao">kakao</option>
                        <option value="naver">naver</option>
                    </select>
                </form>
                
                </Col>

                <div style={{padding:'20px'}}>
                    <h1>select</h1>
                    <h2>🍎 좋아하는 과일 골라보세요!</h2>

                    <select value={selectedFruit} onChange={handleChangeFruit}>

                        { fruitOptions.map((fruit)=>(
                            <option key={fruit.value} value={fruit.value}>{fruit.label}</option>
                        ))}
                       
                    </select>

                    <p style={{marginTop: '16px'}}>
                        지금당신이 선택한과일은?
                        <strong>{selectedFruit}</strong>
                    </p>
                </div>
                
            </Row>
        </Container>
        
        </>
    )
};

export default Forms;
