import React, {Component} from 'react';
import '../styles/Gacha.css';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import gacha from '../resources/gacha_img.png';
import gacha_ball from '../resources/gacha_ball.png';
import gacha_btn from '../resources/gacha_btn.png';

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
function CouponGenerator(){
    let valueChoices = [null, '10%', '100y', '200y', '500y', '1000y', '10000y'];
    let valueIndex = getRandomInt(7);
    if (valueIndex !== 0)
    {
        return(
            {
            "genre" : "GEN",
            "user" : JSON.parse(window.localStorage.getItem("data"))["user_id"], 
            "expire_date" : "2021-10-10", 
            "value" : valueChoices[valueIndex], 
            "status" : true
            }
        )
    }
    
}

async function addPost(event) {
    event.preventDefault();
    const config = {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization' : `Token ${JSON.parse(window.localStorage.getItem("data"))["token"] }`
              }
            }

    try {
        const response = await axios.post('http://127.0.0.1:8000/coupons/create/', 
                            JSON.stringify(CouponGenerator())
                            , config);
    } catch (err) {
        console.log(err);
    }
    

    
    
}

class Gacha extends Component  {

    constructor(props) {
        super(props);
        
        this.state = {
            active: false,
            couponActive: false
        };

        this.AnimaHandler = this.AnimaHandler.bind(this);
        this.CouponHandler = this.CouponHandler.bind(this); 
    }

    AnimaHandler() {
         console.log(JSON.stringify(CouponGenerator()));
        const currentState = this.state.active;
        this.setState({ active: !currentState });
    }

    CouponHandler() {
        
        const currentState = this.state;
        this.setState({ couponActive: !currentState.couponActive });
        console.log(currentState.couponActive);
        addPost(); // Post to backend server
    }

    render() {
        if(this.state.couponActive) {
            return  <Redirect to="/Award"/>;
        }
        return (
            <div className="GachaContainer">
                <img src={gacha} 
                    alt="gacha" 
                    className="Gacha"/>  
                <img src={gacha_btn} 
                    alt = "gacha_btn" 
                    className={this.state.active ? "GachaBtn GachaBtn-rotate" : "GachaBtn" }
                    onClick={this.AnimaHandler}/>
                <img src={gacha_ball} 
                    alt="gacha_ball" 
                    className={this.state.active ? "GachaBall GachaBall-anima" : "GachaBall" }
                    onClick={this.CouponHandler}/> 
                <button className ="playBtn"
                    onClick= {this.AnimaHandler}> Play </button>    
            </div>
          );
    }
    
  }
  
  export default Gacha;

 