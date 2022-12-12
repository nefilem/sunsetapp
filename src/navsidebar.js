import React from "react";
//import {Nav} from "react-bootstrap";
//import { withRouter } from "react-router";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './dashboard.css'

function predictSunset(clouds, wind_speed, humidity) {

    // Humidity — best when humidity is low but not too low. 20 to 50 (35 = 100, either side subtract 6.66 per unit)
    // Cloud coverage — best when between 30 per cent and 70 per cent. Not good if below 30 per cent, and terrible if above 90 per cent.
    // Prior rainfall — 2–6 hours before sunrise or sunset is okay, but not during sunrise or sunset.
    // Visibility — the higher the better.
    // Wind speed — best if the wind speed is low or non-existent.
    // Fog — no fog … this should go without saying.

    // if humidity is less than 20 or greater than 50 then the weight is 0 because the humidity is too great or too low,
    // if its between 20 and 50 though then it should be a good range, using 35 as the mid and therefore best value but 
    // either side the value needs subtracting from 100, 35% is 100.
    var humidity_weight = (humidity < 20 || humidity > 50?0:(humidity - 35<0)?100-((humidity -35)*-1)*6.66:100-(humidity - 35)*6.66)

    // Beauford wind scale
    // 0 --- Calm	less than 1 mph (0 m/s)	Smoke rises vertically
    // 1 --- Light air	1 - 3 mph 0.5-1.5 m/s	Smoke drifts with air, weather vanes inactive
    // 2 --- Light breeze	4 - 7 mph 2-3 m/s	Weather vanes active, wind felt on face, leaves rustle
    // 3 --- Gentle breeze	8 - 12 mph 3.5-5 m/s	Leaves & small twigs move, light flags extend
    // 4 --- Moderate breeze	13 - 18 mph 5.5-8 m/s	Small branches sway, dust & loose paper blows about
    // 5 --- Fresh breeze	19 - 24 mph 8.5-10.5 m/s	Small trees sway, waves break on inland waters
    // 6 --- Strong breeze	25 - 31 mph 11-13.5 m/s	Large branches sway, umbrellas difficult to use
    // 7 --- Moderate gale	32 - 38 mph 14-16.5 m/s	Whole trees sway, difficult to walk against wind
    // 8 --- Fresh gale	39 - 46 mph 17-20 m/s	Twigs broken off trees, walking against wind very difficult
    // 9 --- Strong gale	47 - 54 mph 20.5-23.5 m/s	Slight damage to buildings, shingles blown off roof
    // 10 -- Whole gale	55 - 63 mph 24-27.5 m/s	Trees uprooted, considerable damage to buildings
    // 11 -- Storm	64 - 73 mph 28-31.5 m/s	Widespread damage, very rare occurrence
    // 12 -- Hurricane	over 73 mph over 32 m/s	Violent destruction

    // low to no wind speed best for sunset, so fresh breeze to calm possibly best range, call 3m/s in light breeze 
    // the 100% value, anything under subtract 5 per 1m, over subtract 13.3 per metre. Obviously anything above 10.5 = 0 weight.

    var wind_speed_weight = (wind_speed > 10.5?0:(wind_speed < 3?100 - (((wind_speed - 3)*-1)*5):100 - (wind_speed - 3)*13.3));

    // cloud weight anything between 30 - 70 is good, 50 is the mid therefore assume the best, subtract 5 per point under or over 50, 
    // over 70 or under 30 = 0.
    var clouds_weight = (clouds < 30 || clouds > 70?0:(clouds<50?100-(((clouds - 50)*-1)*5):(100-((clouds - 50)*5))));

    // no clouds = rubbish sunset so instant 0, also if raining during sunset period then no real chance of
    // decent sunset, again 0, need to find out how to check whether predicted to rain at that point.
    var total_weight = clouds_weight < 1?0:Math.round((clouds_weight + wind_speed_weight + humidity_weight)/3);

    //return ( <span>{ humidity } - {humidity_weight}, {wind_speed} - {wind_speed_weight}, {clouds} - {clouds_weight}, {total_weight}</span> );

    // return (
    //     <span style={{backgroundColor: pcToRGB(Math.round(((current.wind_speed < 2?10:current.wind_speed >= 2 && current.wind_speed < 5?5:0) + current.humidity + current.clouds)/2.1)/2)}}>
    //         Sunset predictor: {Math.round(((current.wind_speed < 2?10:current.wind_speed >= 2 && current.wind_speed < 5?5:0) + current.humidity + current.clouds)/2.1)/2 }
    //     </span>
    // );
    return (
        <Col xs={2} md={2} lg={2} className="sunset-predictor text-shadow" style={{backgroundColor: pcToRGB(total_weight)}}>
            &nbsp;{total_weight} &nbsp;
        </Col>
    );
    /*<div style={{height: "100%", width: "100%", backgroundColor: pcToRGB(total_weight)}}>
    &nbsp;{total_weight} &nbsp;
    </div>*/
}

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

const tempToRGB = (min, max, temperature) => {
    //const maxTemp = 3;
    //const minTemp = -2;
    const red = 255 / (max - min) * (temperature - min);
    const green = 0;
    const blue = 255 / (max - min) * (max - temperature);

    return rgbToHex(red, green, blue);
  /*<div style={{ backgroundColor : `rgb(${redVal}, 0, ${blueVal})` }}*/
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
    let tmin = 0, tmax = 0, set = 0;
    props.weather.daily.map((current) => {
        if (set === 0) {
            tmin = current.temp.min;
            tmax = current.temp.max;
            set = 1;
        } else {
            if (tmin > current.temp.min) { tmin = current.temp.min; }
            if (tmax < current.temp.max) { tmax = current.temp.max; }
        }
    }) 
    return props.weather.daily.map((current, index) => (
        <>       
        {/*<Row className="navDateDisplay" style={{border: "solid #000", borderWidth: "2px", borderRadius: "5%", padding: "0", margin: "0"}}>*/}
        <Row className="navDateDisplay">
            {/*<Col>           
                    <p className="navDateDisplay">{dateDisplay(current.dt)}</p>
                    <img alt="icon for weather" height={64} width={64} src={`${getIconURI(current.weather[0].icon)}`}></img>        
                    <button onClick={() => props.dispDetailedWeather(index)} className="dailyButton">
                        Min: {current.temp.min}&#8451;&nbsp;
                        Max: {current.temp.max}&#8451;<br />
                        {current.weather[0].description}<br />
                        Wind Speed (Knots): {current.wind_speed}<br />
                        { predictSunset(current.clouds, current.wind_speed, current.humidity) }
                    </button>*/}
                    <Col xs={1} md={1} lg={1} style={{margin: "auto"}} classname="align-weather-image align-items-center">
                        <div className="weather-image responsive-weather-image-size daily-image-left">
                            <img alt={`${"Icon for" + getIconURI(current.weather[0].description)}`} style={{paddingLeft: "0px"}} className="responsive-weather-image-size" src={`${getIconURI(current.weather[0].icon)}`}></img>
                        </div>
                    </Col>
                    <Col xs={9} md={9} lg={9} style={{backgroundImage: "linear-gradient(to right, " + tempToRGB(tmin, tmax, current.temp.min) + ", " + tempToRGB(tmin, tmax, current.temp.max) + ")"}}>
                        <Row>
                            <Col xs={3} md={3} lg={3} className="align-weather-text align-items-center text-shadow">
                                {dateDisplay(current.dt)}
                            </Col>
                            <Col xs={2} md={2} lg={2} className="align-weather-text align-items-center text-shadow">
                                {current.temp.min}&#8451;
                            </Col>
                            <Col xs={2} md={2} lg={2} className="align-weather-text align-items-center text-shadow">
                                {current.temp.max}&#8451;
                            </Col>
                            <Col xs={2} md={2} lg={2} className="align-weather-text align-items-center text-shadow">
                                {current.weather[0].description}
                            </Col>   
                            <Col xs={3} md={3} lg={3} className="align-weather-text align-items-center text-shadow">
                                {current.wind_speed}
                            </Col>
                        </Row>
                    </Col>
                    { predictSunset(current.clouds, current.wind_speed, current.humidity) }
            {/*</Col>*/}
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
                {/*<Container>*/}                    
                    {weatherLinks(props)}
                {/*</Container>*/}
            
            </>
            );
        }
  };
  //const Sidebar = withRouter(Side);
  export default Sidebar;