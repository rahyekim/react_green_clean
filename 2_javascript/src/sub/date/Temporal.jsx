import { useState , useEffect} from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Temporal } from "@js-temporal/polyfill";

const Temp = ()=> {

    //현재날짜가져오기(시간제외 순수날짜만) // 기존에 date는 시분초와 타임존
    const today = Temporal.Now.plainDateISO();
    //상태관리
    const [ addDays,  setAddDays]= useState(100);
    //며칠뒤를 계산할지 숫자를 저장 .. 기본값은 100일 D-100 크리스마스 ✨🎁🎅
    const [ targetDateStr, setTargetDateStr] = useState(`${today.year}-12-25`)
    //D-day를 계산할 목표 날짜를 문자열 ( 예 "2026-12-25 ")로 저장...
    const futureDate = today.add({days: addDays}); 
    //날짜에 일수를 더한 값만큼 입력하면 끝난다... Date는 ms 계산해서 지지고볶아야함....
    const targetDate = Temporal.PlainDate.from(targetDateStr);
    //✨ .from() : 사용자가 달력에서 선택한 글자를 Temproal이 계산할수 있게 날짜 데이터로 바꿔준다

    const daysUntil= today.until(targetDate, { largestUnit : 'days'}).days ;
    // ✨ .until() 오늘부터 목표 날짜까지와의 차이(기간) 구함...
    // ✨ largestUnit : 'days' 3개월 10일로 쪼개질것을 이 옵션 덕분에 100일 사용할수있음 
    // ✨ .days() 순수하게 숫자 일수만 쏙 뽑아옴


    return(
        <>
        <Container>
            <Row>
                <Col>
                    <h2>차세대 날짜</h2>
                    <div className="text-success mt-4 mb-2">
                        <h3> 오늘날짜: {today.toString()} </h3>
                    </div>
                    <div className="">
                        <h3>기념일 계싼기</h3>
                        <p>오늘 부터 
                            <input type="number" placeholder="기념일" value={addDays} onChange={(e)=> setAddDays(Number(e.target.value))} />
                            일 뒤는? <br/> { futureDate.toString()}
                        </p>
                    </div>
                    <div className="">
                        <h3> D-day 계싼기</h3>
                        <p> 목표날자 
                            <input type="date" value={targetDateStr} onChange={(e)=> setTargetDateStr(e.target.value)} />
                            <br /> {daysUntil > 0 ? `D-${daysUntil}` : daysUntil === 0 ? "d-day 오늘입니다" : `D+${Math.abs(daysUntil)} (지남)` }
                        </p>
                    </div>
                
                
                </Col>

                
                
                <Col>
                <h1>기존 Date의 문제점</h1>
                <p>
                    (1) 1월이 0부터 시작하는 기괴함 temporal= 1~12
                    (2) 원본데이터가 변하는 문제해결
                    기준날짜에 3을 더하면 원래 있던 기준 날짜 객체 자체의 값이
                    3일뒤로 덮어 씌워진다... 원본훼손... 파이썬 copy
                    불변성 원본은 그대로 둔채 3일이 더해진 새로운 결과물
                    (3) 객체에 짬뽕 시간, 날짜, 타임존
                    <code>Temporal.PlainDate </code>
                    (4) 울며 겨자먹기에 무거운 라이브러리
                    Moment.js, Day.js , date-fns 
                </p>
                </Col>
            </Row>
        </Container>
        </>
    )
};

export default Temp ;

/*

✔ 1. immutable (안 바뀜) -> 원본 안 바뀜
✔ 2. 날짜 타입이 분리됨

Date 하나로 다 하던 걸 분리함:

Temporal.PlainDate → 날짜만 (2026-06-23)
Temporal.PlainTime → 시간만
Temporal.PlainDateTime → 날짜+시간
Temporal.ZonedDateTime → 시간대 포함
Temporal.Instant → 절대 시간 (UTC 기반)

👉 이게 진짜 핵심 개선


//immutable 아님 (바뀜) - 원본이 변함 (사이드이펙트)
const d = new Date()
d.setDate(d.getDate() + 1)
 */
