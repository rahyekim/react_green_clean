/*
😄 JavaScript에서 모듈(파일)을 가져오는 방식이 두 가지😄 

📦 CommonJS (옛날 방식)

✅ require()로 가져온다.
✅ module.exports로 내보낸다.
✅ __dirname, __filename을 사용할 수 있다.
✅ 오래된 Node.js 프로젝트에서 많이 사용된다.

📦 ES Module (최신 표준)

✅ import로 가져온다.
✅ export로 내보낸다.
❌ __dirname이 없다.
✅ 브라우저와 Node.js가 같은 문법을 사용한다.


------------------------------------------------------
🌐 파일경로가 아니라 URL 🌐
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


import.meta.url
        ↓
file:///Users/me/project/app.js   (🌐URL 형태)
        ↓
💡fileURLToPath()
        ↓
/Users/me/project/app.js          (🎉파일 경로)
        ↓
💡path.dirname()
        ↓
/Users/me/project                 (📁__dirname)


🌐 import.meta.url 👉 file:///.../app.js
🎉 fileURLToPath() 👉 실제 파일 경로로 변환
📁 path.dirname() 👉 디렉터리만 추출

(최신) import 쓰면 → __dirname 없음 ❌ → 위 코드로 직접 생성 ✅
(옛날) require 쓰면 → __dirname 자동 제공 ✅

*/

import {fileURLToPath} from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



/*

🎉  
307은 리다이렉션(redirect) 상태 코드😎
307 Temporary Redirect

HTTP 상태 코드는 크게 이렇게 나눠요.

코드	의미
2xx	성공 ✅
3xx	다른 곳으로 이동/변경 안내 🔄
4xx	클라이언트 요청 오류 ❌
5xx	서버 오류 💥
 */


/*😄

사용자 요청
    ↓
http 서버
    ↓
url 파싱
    ↓
crypto traceID 생성
    ↓
assert 검증
    ↓
stream으로 로그 저장
    ↓
os로 상태 확인
    ↓
dns로 네트워크 확인
*/

//⭐url.parse() 는 
// 문자열로 들어온 URL을 분석해서 각각의 부품으로 나누려고 쓰는 거예요. 🧩

req.url === "/users?id=10&name=kim"  //(경로와 데이터가 섞여 있죠. 😵)
const parsedUrl = url.parse(req.url, true);  //node가 분석해줌 

//요즘 Node.js에서는 ⭐WHATWG URL API를 더 많이 씀

const myUrl = new URL(req.url, `http://${req.headers.host}`);

console.log(myUrl.pathname);
console.log(myUrl.searchParams.get("id"));

// 요청: /users?id=10
// 결과:

myUrl.pathname
// "/users"

myUrl.searchParams.get("id")
// "10"


//😎요즘방식 Node.js → new URL() 사용 권장 ✅
const parsed = new URL(req.url, "http://localhost");

parsed.pathname;
parsed.searchParams.get("id");

//옜날방식

const url = require("url");

const parsed = url.parse(req.url, true);

parsed.pathname;
parsed.query.id;