import React,  { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from  "./components/Map/Map";
import { getPlacesData, getWeatherData } from "./api";


const App =() => {

    const [weatherData, setWeatherData] = useState([]);
    const [places, setPlaces] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);

    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState("");

    const [ChildClick, setChildClicked] = useState(null);
    const [ isLoading, setIsLoading] = useState(false);

    const [type, setType] = useState("restaurants");
    const [rating, setRating] = useState("");
    
    useEffect(( ) => {
        navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude } }) => {
            setCoordinates({ lat: latitude, lng: longitude });
        })
    }, []);

    useEffect(() => {
        const filteredPlaces = places.filter((place) => place.rating > rating);
        setFilteredPlaces(filteredPlaces);
    }, [rating]);

    // this useEffect pull the restaurant data from the api index file 
    useEffect(() => {
        setIsLoading(true);
        getWeatherData(coordinates.lat, coordinates.lng)
        .then((data) => setWeatherData(data));
        getPlacesData(type, bounds.ne, bounds.sw)
             .then((data) => {
            setPlaces(data);
            setFilteredPlaces([])
            setIsLoading(false);
        })
    }, [type, coordinates, bounds]);
    return (
    <>
    <CssBaseline />
    <Header setCoordinates={setCoordinates}/>
    <Grid container spacing={3} style={{ width : "100%"}}>
        <Grid item xs={12} md={4}> 
           <List 
             places={filteredPlaces.length ? filteredPlaces : places}
             isLoading={isLoading}
             type={type}
             setType={setType}
             rating ={rating}
             setRating = {setRating}
           />
        </Grid>
        <Grid item xs={12} md={8}> 
           <Map 
              setCoordinates={setCoordinates}
              setBounds = {setBounds}
              coordinates = {coordinates}
              places={filteredPlaces.length ? filteredPlaces : places}
              setChildClicked={setChildClicked}
              weatherData = {weatherData}
           />
        </Grid>
    </Grid>
    </>)
}

export default App;