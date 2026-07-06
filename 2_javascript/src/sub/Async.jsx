import React, { useState } from "react";
import { Button, Alert, Card, Col, Row, Container} from "react-bootstrap";
import { data } from "react-router-dom";


const Async = () => {

    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); 
    //화면에 🔄로딩 애니메이션을 띄우기 위한 신호탄=> 리액트 비동기통신할 때 무조건 들어가는 필수 공식
    
    //실행 함수
    const fetchWeather = async ()=> {

        setLoading(true); //🚨[스위치 ON] "지금부터 로딩 시작한다!"
                //➡️ 이때 화면에 "로딩 중..." 애니메이션이나 빙글빙글 도는 스피너가 뜸
        setError(null); //🚨깨끗하게 청소(null)하고 시작하자!"

        try{
        const response = await fetch('http://jsonplaceholder.typicode.com/posts/1')
        
        if(!response.ok){
            throw new Error('데이터를 가져오는데 실패')
        }
        
        const data = await response.json()

        setWeather({
            city:'서울',
            temp: Math.floor(Math.random()*30)+1,
            desc: data.title.substring(0,10)  //💡data.title?.substring(0,10) || "정보없음"
        });

        }catch(e){
            setError('네트워크 오류발생!')
            // setError(e.message || '네트워크오류')

        }finally{
            setLoading(false); //🚨[스위치 OFF] 빙글빙글스피너가 사라지고 진짜 날씨 데이터가 화면에 짠!
        }

        
    }
    
    return(
        <>
       <Container>
            <Row>
                <Col>
                <h3>날씨</h3>
                <Button 
                onClick={fetchWeather}
                variant="primary"
                disabled={loading}
                > {loading ? "불러오는중..." : "날씨확인"}</Button>

                {/* 1. 에러가 나면 버튼 밑에 바로 경고창 띄우기 */}
                {error && <Alert variant="danger" className="mt-3">
                    {error}
                    </Alert>}
                
                {/* ⭐ 2. 로딩 중일 때 날씨 카드 자리에서 빙글빙글 돌리기 (여기가 명당!) */}
                { loading && <div className="spinner mt-3 text-center">
                    🔄로딩중....
                    </div>}

                {/* 3. 로딩이 끝나고 데이터가 있을 때만 깔끔하게 카드 보여주기 */}
                
                {/* 이미 데이터가 있는 상태에서 한 번 더 조회(새로고침)할 때
                로딩 애니메이션과 이전 데이터가 화면에 지저분하게 겹쳐서 나오는 것을 방지하기 위해
                🚨!loading🚨 꼭 넣어준다!!
                */}
                
                {!loading && weather && (  //loading 중이면 새로고침전 card 내용은 안보여쥼..
                    <Card className="mt-3">
                        <Card.Body>
                        <Card.Title>{weather.city}</Card.Title>
                        <Card.Text>
                            온도:{weather.temp}
                            상태:{weather.desc}
                        </Card.Text>
                        </Card.Body>
                    </Card>
                )}
                </Col>
            </Row>
       </Container>
        </>
    )
} 
export default Async;

////////////////
/*[에러 창] ➡️ [로딩 창] ➡️ [날씨 카드]


response.ok → "성공했냐 실패했냐"만 확인 // 상태 코드가 200~299인지 확인하는 boolean 값
response.status → "404인지 500인지" 구체적으로 확인
간단한 프로젝트면 ok만 써도 충분

if (response.status === 404) {
  throw new Error('도시를 찾을 수 없습니다.');
}

if (response.status === 500) {
  throw new Error('서버 오류입니다.');
}
if(!response.ok){
    switch (response.status) {
    case 404:
        throw new Error('데이터 없음'); //throw :즉시종료돼서 break생략가능
    case 401:
        throw new Error('인증 필요');
    case 500:
        throw new Error('서버 오류');
    default:
        throw new Error("알수없는 오류")
    }
}

throw를 만나면 코드 실행이 중단되고 *가장 가까운 catch*로 이동
끝까지 못 잡으면 Uncaught Error가 발생



요즘에는 ||보다 ?? (null 병합 연산자) 를
'' || '네트워크 오류' -> '네트워크 오류'

'' ?? '네트워크 오류' -> '' // null 또는 undefined 일때 오른쪽사용

*/

