import React from "react"
import styled from "styled-components"

interface ItemProps{
    id: string;
    children: React.ReactNode;
}

export default function AccordionItem({id, children}:ItemProps){

    
    return(
        <ItemContainer>{children}</ItemContainer>
    )
}


const ItemContainer = styled.div`
border-bottom: 1px solid #e2e8f0;
&:last-child{
    border-bottom:none;
}
`;