import React from "react";
//import {Nav} from "react-bootstrap";
//import { withRouter } from "react-router";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './dashboard.css'

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(Math.round(r)) + componentToHex(Math.round(g)) + componentToHex(Math.round(b));
}

const pcToRGB = (percentage) => {
    var green = (percentage > 75 ? 1 - 2 * (percentage - 75) / 100.0 : 1.0) * 255;
    var red = (percentage > 50 ? 1.0 : 2 * percentage / 100.0) * 255;
    var blue = 0.0;
    //console.log(rgbToHex(red, green, blue));
    return rgbToHex(red, green, blue);
}

const dateDisplay = (dateNumeric) => {
    // date is in unix timestamp/utc?
    //return Date(dateNumeric);
    //const dateObj = new Date(dateNumeric * 1000);
    //utcString = dateObj.toUTCString();
    //time = utcString.slice(-11, -4);
    const options = {
        weekday: "long",        
        day:"2-digit",
        month:"long"        
        }
    return (new Date(dateNumeric * 1000)).toLocaleDateString("en-GB", options);
}

const getIconURI = (iconId) => {
    return "http://openweathermap.org/img/wn/" + iconId + "@2x.png";
}

const weatherLinks = (props) => {
    //console.log(weather.daily[0].weather.icon);
    // style={{backgroundImage: `url(${getIconURI(current.weather[0].icon)})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}    
    return props.weather.daily.map((current, index) => (
        <>       
        <Row>
            <Col>           
                    <p className="navDateDisplay">{dateDisplay(current.dt)}</p>
                    <img alt="icon for weather" height={64} width={64} src={`${getIconURI(current.weather[0].icon)}`}></img>        
                    <button onClick={() => props.dispDetailedWeather(index)} className="dailyButton">
                        Min: {current.temp.min}&#8451;&nbsp;
                        Max: {current.temp.max}&#8451;<br />
                        {current.weather[0].description}<br />
                        Wind Speed (Knots): {current.wind_speed}<br />
                        <span style={{backgroundColor: pcToRGB(Math.round(((current.wind_speed < 2?10:current.wind_speed >= 2 && current.wind_speed < 5?5:0) + current.humidity + current.clouds)/2.1)/2)}}>
                                 Sunset predictor: {Math.round(((current.wind_speed < 2?10:current.wind_speed >= 2 && current.wind_speed < 5?5:0) + current.humidity + current.clouds)/2.1)/2 }
                        </span>
                    </button>
                   
            </Col>
        </Row>
        </>
    ));
}

const Sidebar = (props) => {

    if (props.weather === undefined) {
        return (<></>);
    } else {
        return (
            <>
                <Container>                    
                    {weatherLinks(props)}
                </Container>
            
            </>
            );
        }
  };
  //const Sidebar = withRouter(Side);
  export default Sidebar;