import Card from 'react-bootstrap/Card';

const dateDisplay = (dateNumeric) => {
    
    return (new Date(dateNumeric * 1000)).toString();
}

const timeDisplay = (dateNumeric) => { 
    const options = {
        hour: "2-digit",
        minute: "2-digit",        
        seconds: "2-digit",
        hour12: false       
        }
    return (new Date(dateNumeric * 1000)).toLocaleTimeString("en-GB", options);
}

function WeatherCard(props){
    console.log(props.weather);
    if (props.weather === undefined) {
        return (<></>);
    } else {
        return (
        <> 
            <Card>
                <Card.Header>Weather for {dateDisplay(props.weather.dt)}</Card.Header>
                <Card.Body>
                    <Card.Title>Weather</Card.Title>
                    <Card.Text>
                        Most likely weather will be {props.weather.weather[0].description}<br/>
                        The minimum temperature for this day will be {props.weather.temp.min}&#8451;<br/>
                        The maximum temperature for this day will be {props.weather.temp.max}&#8451;<br/>
                        Morning temp will be around {props.weather.temp.morn}&#8451;<br/>
                        Day time temp will be around {props.weather.temp.day}&#8451;<br/>
                        Evening temp will be around {props.weather.temp.eve}&#8451;<br/>
                        Night time temp will be around {props.weather.temp.night}&#8451;<br/>                        
                        UV index will be {props.weather.uvi}<br/>                        
                        Humidity will be {props.weather.humidity}<br/>
                        Wind speed will be {props.weather.wind_speed} Knots<br/>
                        Sunrise will be at {timeDisplay(props.weather.sunrise)}<br/>
                        Sunset will be at {timeDisplay(props.weather.sunset)}<br/>
                        Moonrise will be at {timeDisplay(props.weather.moonrise)}<br/>
                        Moonset will be at {timeDisplay(props.weather.moonset)}<br/>
                    </Card.Text>                    
                </Card.Body>
            </Card>
        </>);
    }
    
}

export default WeatherCard;