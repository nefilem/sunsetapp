import Col from 'react-bootstrap/Col';
import './dashboard.css';

const timeDisplay = (dateNumeric) => {
    // date is in unix timestamp/utc?
    const options = {
        hour: "2-digit",
        minute: "2-digit",        
        hour12: false       
        }
    return (new Date(dateNumeric * 1000)).toLocaleTimeString("en-GB", options);
}

const getIconURI = (iconId) => {
    return "http://openweathermap.org/img/wn/" + iconId + "@2x.png";
}


function CurrentWeatherTimeline(props){
    
    if (props.weather === undefined) {
        return (<></>);
    } else {

        const timeLineArr = props.weather.hourly.slice(0,12);

        return timeLineArr.map((current, index) => (
        <> 
            <Col>
                <img alt="" height={64} width={64} src={`${getIconURI(current.weather[0].icon)}`}></img>
                <div className="timelineDiv"> 
                    {timeDisplay(current.dt)}<br/>
                    {current.temp}&#8451;<br/>
                    {current.weather[0].description}<br/>
                    w/s {current.wind_speed} knots
                </div>
            </Col>
        </>));
    }
    // <Card>
    //                 <Card.Header>Weather for {dateDisplay(current.dt)}</Card.Header>
    //                 <Card.Body>
    //                     <Card.Title>Weather</Card.Title>
    //                     <Card.Text>
    //                     The minimum temperature for this day will be {current.temp.min}<br/>
    //                     The maximum temperature for this day will be {current.temp.max}                
    //                     </Card.Text>
    //                     <Button variant="primary">Go somewhere</Button>
    //                 </Card.Body>
    //             </Card>
}

export default CurrentWeatherTimeline;