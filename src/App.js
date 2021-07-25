import AppStyles from './styles/App.module.scss';
import './styles/background.css';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';
import {Bar} from './components/NavBar';
import background from './images/bg1.jpg';
import background2 from './images/bg2.jpg';
import background3 from './images/bg3.jpg';
import background4 from './images/bg4.jpg';
import React, { useState } from 'react';
import { render } from '@testing-library/react';

const backgrounds = [background, background2, background3, background4]
var backgroundIndex = 0;
const opacityVals = [100, 100, 100, 100]

export default class App extends React.Component{
  constructor(props){
    super(props);

    this.backgroundScheduler_1 = this.backgroundScheduler_1.bind(this);
    this.backgroundScheduler_2 = this.backgroundScheduler_2.bind(this);
    this.backgroundScheduler_3 = this.backgroundScheduler_3.bind(this);
    this.order = this.order.bind(this);

  }

  backgroundScheduler_1() {
    console.log(document.querySelector(".img1").style);
    setTimeout(() => {
        document.querySelector(".img1").style.opacity = 0;
        document.querySelector(".img2").style.opacity = 1;
        document.querySelector(".img3").style.opacity = 1;
        this.order(["-3", "-1", "-2"], () => { this.backgroundScheduler_2() }, 1000);
    }, 3000);
  }
  
  backgroundScheduler_2() {
    setTimeout(() => {
        document.querySelector(".img1").style.opacity = 1;
        document.querySelector(".img2").style.opacity = 0;
        document.querySelector(".img3").style.opacity = 1;
        this.order(["-2", "-3", "-1"], () => { this.backgroundScheduler_3() }, 1000);
    }, 3000);
  }

  backgroundScheduler_3() {
    setTimeout(() => {
        document.querySelector(".img1").style.opacity = 1;
        document.querySelector(".img2").style.opacity = 1;
        document.querySelector(".img3").style.opacity = 0;
        this.order(["-1", "-2", "-3"], () => { this.backgroundScheduler_1() }, 1000);
    }, 3000);
  }

  order(array, callback, time) {
    setTimeout(() => {
        document.querySelector(".img1").style.zIndex = array[0];
        document.querySelector(".img2").style.zIndex = array[1];
        document.querySelector(".img3").style.zIndex = array[2];
        callback();
    }, time);
  }


  componentDidMount(){
    this.backgroundScheduler_1();
  }

  render(){
    return (
      <div className = {AppStyles.App}>
        {/* <button onClick = {handleClick}>Click Me!</button> */}
        <div className = "background-container">
          <img className = "background-image img1" src = {background}/>
          <img className = "background-image img2" src = {background2}/>
          <img className = "background-image img3" src = {background3}/>
        </div>
        <Bar/>
        <SortingVisualizer/>
      </div>
    );
  }
}
