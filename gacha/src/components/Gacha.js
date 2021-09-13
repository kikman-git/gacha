import React from 'react';
import '../styles/Gacha.css';
import gacha from '../resources/gacha_img.png';
import gacha_btn from '../resources/gacha_btn.png';
// import {Container, Wrapper, Row, Column, Link, Title} from './footer';

function Gacha() {

    function RotateHandler() {
        console.log('rotate');
    }
    return (
      <div className="GachaContainer">
         <img src={gacha} 
              alt="gacha" 
              className="Gacha"/>  
         <img src={gacha_btn} 
              alt = "gacha_btn" 
              className="GachaBtn"
              onClick= {RotateHandler}/>    
      </div>
    );
  }
  
  export default Gacha;

 