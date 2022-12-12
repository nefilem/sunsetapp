import { ApiClient } from "./ApiClient";
import { useState, useEffect, useMemo } from "react";
import WeatherCard from "./WeatherCard";
import CurrentWeatherTimeline from "./CurrentWeatherTimeline";
import { Container, Row, Col, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Sidebar from "./navsidebar";

function App() {
  const [weather, changeWeather] = useState(undefined);
  const [detailWeather, changeDetailWeather] = useState(undefined);
  const [weatherLocation, setLocation] = useState("Sheffield");
  const [previousWeatherLocation, cPreviousWeatherLocation] = useState(undefined);
  const [latLonLocation, setLatLon] = useState(undefined);


  const api = new ApiClient();

  useEffect(() => {
    if (weatherLocation === previousWeatherLocation) {
      console.log("No need to call api");
    } else {
      if (weatherLocation === "Current Location") {
        api
          .getWeatherByCurrentLocation()
          .then((response) => {
            setLatLon([response.coords.latitude, response.coords.longitude]);
          })
          .catch((err) => {
            console.log(err);
            setLocation(previousWeatherLocation);
          });
      } else {
        api.getWeatherByLocation(weatherLocation).then((response) => {
          changeWeather(response.data);
        })
        .catch((err) => {
          console.log(err);
          setLocation(previousWeatherLocation);
        });
      }
    }
    console.log("useEffect: weatherLocation");
  }, [weatherLocation]);

  useEffect(() => {
    if (detailWeather === undefined) {
      console.log("Weather data not received yet.");
    } else {
      console.log("detailWeather Changed");
    }
    console.log("useEffect: detailWeather");
  }, [detailWeather]);

  useEffect(() => {
    if (latLonLocation === undefined) {
      console.log("latLonLocation is undefined");
    } else {
      api.getWeather(latLonLocation[0], latLonLocation[1]).then((response) => {
        changeWeather(response.data);
      });
    }
    console.log("useEffect: latLonLocation");
  }, [latLonLocation]);

  const displayDetailedWeather = (index) => {
    changeDetailWeather(weather.daily[index]);
  };

  const handleLocationChange = (event) => {
    if (event.keyCode == 13) {
      cPreviousWeatherLocation(weatherLocation);
      setLocation(event.target.value);
    }
    return;
  };

  const handleCurrentLocationClick = () => {
    cPreviousWeatherLocation(weatherLocation);
    setLocation("Current Location");    
  };

  return (
    <div className="App">
      <Container className="mainContainer">
        <Row xs={12} md={12} lg={12}>
          <FormControl
            type="text"
            defaultValue="Sheffield"
            onKeyUp={(event) => handleLocationChange(event)}
          />
          <button onClick={() => handleCurrentLocationClick()}>
            Get current location
          </button>
        </Row>
        <Row xs={12} md={12} lg={12}>
          {" "}
          <p className="navDateDisplay">
            Weather Forecast for {weatherLocation}
          </p>
        </Row>
        <Row xs={12} md={12} lg={12}>
          {" "}
          <p className="navDateDisplay">Next 12 Hours</p>
        </Row>
        <Row xs={12} md={12} lg={12}>
          <CurrentWeatherTimeline weather={weather} />
        </Row>
        <br />
        <Row xs={12} md={12} lg={12}>
          <p className="navDateDisplay">8 Day Forecast</p>
        </Row>
        <Row xs={12} md={12} lg={12}>
          {/*<Col xs={4} md={4} lg={4}>*/}
          <Col xs={12} md={12} lg={12}>
            <Container>
              <Row className="navDateDisplay">
              <Col xs={1} md={1} lg={1} style={{margin: "auto"}} classname="align-weather-image align-items-center">
                &nbsp;
              </Col>
              <Col xs={9} md={9} lg={9}>
                  <Row>
                      <Col xs={3} md={3} lg={3} className="align-weather-text align-items-center">
                          Date
                      </Col>
                      <Col xs={2} md={2} lg={2} className="align-weather-text align-items-center">
                          Min
                      </Col>
                      <Col xs={2} md={2} lg={2} className="align-weather-text align-items-center">
                          Max
                      </Col>
                      <Col xs={2} md={2} lg={2} className="align-weather-text align-items-center">
                          Weather
                      </Col>   
                      <Col xs={3} md={3} lg={3} className="align-weather-text align-items-center">
                          Wind speed
                      </Col>
                  </Row>
              </Col>
              <Col xs={2} md={2} lg={2}>
                  Sunset Prediction
              </Col>
          </Row>
              <Sidebar
                weather={weather}
                dispDetailedWeather={(index) => displayDetailedWeather(index)}
              />
            </Container>
          </Col>
          {/* <Col xs={8} md={8} lg={8}>
            <WeatherCard weather={detailWeather} />
          </Col>*/}
        </Row> 
      </Container>
    </div>
  );
}

export default App;
