
import React from "react"
import styled from "styled-components"

interface ItemProps{
    id: string;
    children: React.ReactNode;
}

export default function AccordionTitle({id, children}:ItemProps){

    
    return(
        <Title>{children}</Title>
    )
}


const Title = styled.div`
border-bottom: 1px solid #e2e8f0;
&:last-child{
    border-bottom:none;
}
`;