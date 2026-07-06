
export default function Mycars (){

    const cars = ['볼보', '벤츠' , '아우디']

    return (
        <>

        <ul>
            {cars.map((car, i)=> {
                <li key={i}>{car}</li>
            })}
        </ul>
        
        </>
    )
}