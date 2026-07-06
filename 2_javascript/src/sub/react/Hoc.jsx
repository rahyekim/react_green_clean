import { useState } from "react";

const withBorder = (WrappedComponent) => {

    return function NewComponent(props){
        return(
        <div style={{ border: '2px solid blue' , padding: '20px'}}>
            <WrappedComponent {...props}/>
        </div>
        )
    }
};

const Greeting = ({name}) => {

    return <h1> hello, {name} ~~~</h1>
}

//조합

const  GreetingWithBorder = withBorder(Greeting)

const Hoc = ()=>{



    return(
        <>
        <h1>higher order components 고차컴포넌트</h1>
        <p>리액트 컴포넌트에 추가기능을 더하는 래퍼와 같다</p>
        
        <Greeting name="john"/>
        <GreetingWithBorder name ='tom'/>

        
        
        </>
    )
};

export default Hoc;
