
const Tag = () => {
    return(
        <>
        <div className="container-fluid">

            <div className="row">
                <div className="col-md-12">
                    <h1 className="mt-70"> html 
                        <small className="text-secondary">-tag list</small>
                    </h1>
                </div>
            </div>

            <div className="row">
                <div className="col-md-3">
                    <h1>DIV</h1>
                    <p>
                    - 다른 HTML요소를 담는 컨테이너로 사용
                    - 기본적으로 블록요소이므로 사용가능한 모든 너비를 차지하며 앞뒤에 줄바꿈이 포함된다
                    - 섹션을 그룹화 하는데 자주 사용가능
                    - 현재 웹제작에 조각적인 요소로 사용
                    </p>
                </div>
                <div className="col-md-3">
                    <h1>Semantic elements 의미를 지닌 요소</h1>
                    <p>html5이전에는 모든요소에 이름을 클래스로 만들었는데 이게 불편해서 
                        좀 더 작업할때 편하게 하기위해 직관적인 태그사용</p>
                    <header></header>
                    <nav></nav>
                    <section></section>
                    <aside></aside>
                    <article></article>
                    <footer></footer>
                    <p> header, nav, section, aside, article, footer 이런 방법을 다 갖춰서 하는 것이 표준코딩.</p>
                </div>
                <div className="col-md-3">
                    <h1> XHTML: 엄격
                        e<mark>X</mark>tensible 
                        <mark>H</mark>yper
                        <mark>T</mark>ext 
                        <mark>M</mark>arkup 
                        <mark>L</mark>anguage
                    </h1>
                    <p>xml과 같은 데이터를 상호보완적으로 사용하기 위해...메이븐(xml)? 그래들(xml사용안함)?</p>

                </div>
                <div className="col-md-3">
                    <h1>DOM BOM </h1>
                    <p>Document Object Model: 문서객체모델로 웹페이지의 콘테츠를 제어하는 API </p>
                    <p>Browser Object Model: 웹페이지를 제외한 브라우저창이나 환경자체를 제어하는 API</p>
                    <p> 위에 bom과 dom은 자바스크립트를 사용할때 다루지만 
                        리액트를 사용하면 dom직접 건드리는 방식은 지양하고 
                        리액트의 상태(State)와 Ref(useRef)를 통해서 가상 DOM을 활용하는 방식을 사용하는 것이좋음
                    </p>
                </div>
                

            </div>

            <div className="row">
                <div className="col-md-3">
                    <h1>목록</h1>
                    <p>목록에 순서가 있는 목록, 순서가 없는 목록, 정의 목록</p>
                    <ol reversed type="a">
                        <li>바나나</li>
                        <li>사과</li>
                        <li>오렌지</li>
                    </ol>
                </div>
                <div className="col-md-3">
                    <h1>순서없는 목록</h1>
                    <ul type="square">
                        <li>7</li>
                        <li>10</li>
                        <li>3</li>
                    </ul>
                </div>
                <div className="col-md-3">
                    <h1>정의 목록 Description List</h1>
                    <dl>
                        <dt>Coffee</dt>
                        <dd>- black hot drink</dd>
                        <dt>Mike</dt>
                        <dd>- white cold drink</dd>
                    </dl>
                </div>
                <div className="col-md-3">
                    <h1>블록 및 인라인</h1>
                    <p>인라인 태그는 가로에 허용된 너비만큼 요소가 모일수 있는것(옆으로 나란히 배치)</p>
                    <p>블록태그는 하나만 단독 실행(한줄전체차지 width: 100%, 자동줄바꿈)</p>
                    <button className="d-block">버튼</button>
                    <button>버튼</button>
                    <button>버튼</button>
                    <div className="">나혼자산다</div>
                    <div className="">나혼자산다</div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-3">
                    <h1 className="mt-4 mb-2">스타일</h1>
                    <p style={{color:"red"}}>태그안에 스타일 적용하는 것을 인라인스타일이라 하는데 회사에서 nope</p>
                </div>
                <div className="col-md-3">
                    <h1 className="mt-4 mb-2">텍스트 서식</h1>
                    <p>나가 <sub>나가</sub></p>
                    <p> 어퍼스트로피 에스 <sup>s</sup></p>
                    <p> <del> 강백호 </del> 라고 읽고 <ins> 바보 </ins>라고 했겠다.</p>
                    <b>굵은 글씨</b>
                    <strong> 중요 텍스트</strong>
                    <i> 이탤릭체 텍스트 </i>
                    <em> 강조된 텍스트 </em>
                    <mark>css를 사용하지 않고 유일하게 배경색이 들어가 있는 텍스트</mark>
                    <small> 더작은 글씨 같이쓰는 태그의 80프로 정도의 크기를 가짐</small>
                </div>
                <div className="col-md-3">
                    <h1 className="mt-4 mb-2">
                        인용문
                    </h1>
                    <blockquote cite="http://google.com">
                        세계자연보호기금에서 발췌합니다.
                    </blockquote>
                    <p> 아래는 짧은 <q>인용문</q> 입니다.</p>
                </div>
                <div className="col-md-3">
                    <h1> table: 데이터를 행과 열로 배열합니다.</h1>
                    <table className="table table-striped table-hover">
                        <thead className="table-secondary">
                            <tr>
                                <th>1</th>
                                <th>2</th>
                                <th>3</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>하나</td>
                                <td>둘</td>
                                <td>셋</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>one</td>
                                <td>two</td>
                                <td>three</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>    

            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-2">
                    <h2>2026 디자인 트렌드</h2>
                    <h3>1. AI 디자인 협업과 휴먼인더루프 </h3>
                    - ai 일상화
                    - 휴먼인더루프: 창의적인 생각과 의사 결정은 사람이 함.
                </div>
                <div className="col-md-2">
                    <h3>2. 몰입형 UX</h3>
                    - 스토리 텔링: 사용자가 스크롤을 내리면 자연스럽게 브랜드의 이야기나
                    제품 정보를 따라간다.
                    - 반응형 3D: Spline 이나 React Three Fiber같은 프레임워크를 통해
                    3D요소를 자유롭게 다룸. 단순관람이 아니라 탐험공간으로 만드는 것이 중요해짐.
                </div>
                <div className="col-md-2">
                   <h3>3. 비쥬얼 요소와 레이어드 디자인</h3>
                    - 글래스 모피즘(Glassmorphism): 반투명한 유리효과 블러처리를 통해 레이어의 깊이감을 강조
                    - 다이내믹마이크로애니메이션(dynamic microamination): 버튼 hover효과 페이지전환까지 사용자의 행동에
                    미세하게 반응하여 피드백을 제공하는 애니매이션.
                    - 타이포그래피(Typography): 애니메이션과 결합해 사용자 소통의 매개체이자 인터페이스의 핵심요소로 활용  
                </div>
                <div className="col-md-2">
                    <h3>4. 스타일</h3>
                    - 뉴트로 & Y2K : 2000년대 초반의 복고풍 감성
                    - 브루탈리즘(Brutalism) : 완벽하고 매끈한 디자인에서 벗어나 날것 그대로의 질감, 비대칭 레이아웃, 강렬한 대비
                </div>
                <div className="col-md-2">
                    <h3>5. 레이아웃 </h3>
                    - 리퀴드 레이아웃 : 고정된 그리드를 벗어나 디바이스나 브라우저 환경에 따라 유연하게 변화하는 레이아웃
                </div>
                <div className="col-md-1"></div>
                                  
            </div>


        </div>
        </>
    )
}

export default Tag;
