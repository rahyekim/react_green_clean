axios의 방식 (자동 포장 & 자동 에러 점프)
서버가 400이나 500 같은 에러 코드를 보내면, Axios는 "아, 이거 에러구나!" 하고 알아서 판단해서 곧바로 catch 블록으로 jump 해버립니다.

이때 서버가 보낸 에러 메시지는 catch (err) 안의 err.response.data 라는 곳에 이쁘게 포장되어서 들어옵니다.

2. fetch의 방식 (수동 확인 필요)
서버가 400이나 500 에러를 보내도, fetch는 "일단 통신(네트워크 연결) 자체는 성공했네?" 하고 생각합니다. 그래서 catch로 안 가고 정상적으로 try 블록 안으로 들어옵니다.

대신 res.ok라는 속성이 false로 바뀝니다.

그래서 우리가 직접 코드로 "어? res.ok가 false네? 에러다!" 하고 잡아낸 뒤, await res.json()을 해서 에러 내용을 꺼내야 하는 것입니다.


const errorMessage = err.response?.data?.message || '서버와 통신 중에 오류가 발생했습니다.';