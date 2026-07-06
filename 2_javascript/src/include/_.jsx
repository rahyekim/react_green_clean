import { Alert } from "bootstrap"
import { Card } from "react-bootstrap"


const async = () => {

    const [weather, setWeather]= useState(null);
    const[error, setError]=useStae(null);
    const [loading, setLoading]= useState(null);

    const handleWeather = async()=>{
        setLoading(true);
        setError(null);

        try{   
            const response = await fetch("")

            if(!response.ok){
                throw new Error('')
            
                const data = await response.json()
            setWeather({
                city: '서울',
                temp:,
                desc: data.title
            })
            }
         }catch(e){ setError('네트워크 오륩말생')
        
        
    }finally{
        setLoading(false);
    }
    return(

        <>
        <button 
            onClick={handleWeather}
            variant='primary'
            disabled={loading}
            >{loading ? '날씨확인중..': '날씨확인하기'}</button>
            {error && <Alert variant='danger'>{error}</Alert>}
        {weather && ( <Card>
            <Card.Body>
                <Card.Title>{weather.city}</Card.Title>
                <Card.Text>
                    온도:{weather.temp}
                    상태: {weather.desc}
                </Card.Text>
            </Card.Body>
        </Card>)}

        </>
    )
}