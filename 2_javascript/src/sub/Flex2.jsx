

const Flex = () => {

    return(
        <>
        <h1>탄생일</h1>
        <p>
            flex: 2009년 
            Grid: 2011년(마이크로소프트)
            2020년경 주로 flex
            우리나라대형기업들은 다른나라와마찬가지로 섞어씀

            웹사이트 큰 틀(header,sidebar,main,footer):grid
            그리드 안 작은 구성요소들(logo,menu button 아이콘배치)
            등은 flex로...

            flex가 한줄을 정리하는데 능숙하다면 
            grid는 전체화면을 바둑판처럼 나누어 위치를 잡는데 최적화된 도구

        </p>
        <h1>float 사용</h1>
        <div className="float">
            <div className="one">1</div>
            <div className="two">2</div>
            <div className="three">3</div>
        </div>
        <hr />
         <h1>Flex 사용</h1>
        <div className="flex">
            <div className="one">1</div>
            <div className="two">2</div>
            <div className="three">3</div>
        </div>
        <hr />
         <h1>Grid 사용</h1>
        <div className="grid">
            <div className="one">1</div>
            <div className="two">2</div>
            <div className="three">3</div>
        </div>
        <hr />


        <code>
           
        </code>
        </>

    )
}

export default Flex;