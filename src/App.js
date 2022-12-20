import React, { useState, useEffect, useRef, setImageTop }from "react";
import "./App.css";
import axios from 'axios';

function App() {
  const [nasaData, setNasaData] = useState({})
  const imageRef = useRef(null)
  const setImageTop = () => {
    document.documentElement.style.setProperty('--image-top', `${imageRef.current.offsetTop}px`);
  }

  useEffect(() => {
    getPic();
    setImageTop();
  }, []);

  const getPic = () => {    
    axios
      .get("https://api.nasa.gov/planetary/apod?api_key=jmxgN4PiRb1149yWEV1ShOQZiG56kvIHmmSOXlYa")
      .then(res => setNasaData(res.data))
      .catch(err => console.log(err));}

  return (
    <div className="container">
      <h1>NASA Photo of the Day</h1>
      <h3 className="title">-{nasaData.title}-</h3>
      <a href={nasaData.hdurl}><img src={nasaData.url} alt='nasa photo of the day' ref={imageRef}/></a>
      <h3 className="hdurl">Click image for an HD version</h3>
      <div className='explanation'><p>{nasaData.explanation}</p></div>
    </div>
  );
}

export default App;
