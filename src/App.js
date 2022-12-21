import React, { useState, useEffect, useRef, setImageTop }from "react";
import "./App.css";
import axios from 'axios';
import styled from 'styled-components'

// styled componenets
const Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;
const Explanation = styled.p`
  position: absolute;
  margin: 20px;
  font-size: 20px;
  top: 132px;
  right: 20px;
  width: 400px;
  min-height: calc(100vh - 80px);
  height: 100%;
  overflow: hidden;
  margin-right: 100px;
`;
const PageTitle = styled.h1`
  font-size: 36px;
  margin-bottom: 30px;
  font-weight: 600;
`;
const NasaTitle = styled.h3`
  font-weight: 600;
  font-size: 18px;
  margin-top: 30px;
`;
const HdReminder = styled.h3`
 margin-top: 10px;
  font-size: 16px;
`;


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
    <Wrapper>
      <PageTitle>NASA Photo of the Day</PageTitle>
      <NasaTitle>-{nasaData.title}-</NasaTitle>
      <a href={nasaData.hdurl}><img src={nasaData.url} alt='nasa photo of the day' ref={imageRef}/></a>
      <HdReminder>Click image for an HD version</HdReminder>
      <div><Explanation>{nasaData.explanation}</Explanation></div>
    </Wrapper>
  );
}

export default App;
