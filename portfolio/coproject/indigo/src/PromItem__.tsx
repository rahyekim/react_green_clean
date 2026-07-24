interface PromItemProps {
    img: string;
    alt: string;
    title: string,
    description: string,
}
export const PromItem =(props:PromItemProps)=>{
    return(
        <>
        <li>
            <a href="">
                <img src={props.img} alt={props.alt} />
                <h3>{props.title}</h3>
                <p>{props.description}</p>
            </a>
        </li>
        </>
    )
}