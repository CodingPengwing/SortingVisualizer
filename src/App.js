import AppStyles from './styles/App.module.scss';
import './styles/background.css';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';
import {Bar} from './components/NavBar';
import background from './images/bg1.jpg';
import background2 from './images/bg2.jpg';
import background3 from './images/bg3.jpg';
import background4 from './images/bg4.jpg';
import React from 'react';

const backgroundCycleTime = 60000;

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
        document.querySelector(".img4").style.opacity = 0;
        this.order(["-4", "-1", "-2", "-3"], () => { this.backgroundScheduler_2() }, 1000);
    }, backgroundCycleTime);
  }
  
  backgroundScheduler_2() {
    setTimeout(() => {
        document.querySelector(".img1").style.opacity = 0;
        document.querySelector(".img2").style.opacity = 0;
        document.querySelector(".img3").style.opacity = 1;
        document.querySelector(".img4").style.opacity = 1;
        this.order(["-3", "-4", "-1", "-2"], () => { this.backgroundScheduler_3() }, 1000);
    }, backgroundCycleTime);
  }

  backgroundScheduler_3() {
    setTimeout(() => {
        document.querySelector(".img1").style.opacity = 1;
        document.querySelector(".img2").style.opacity = 0;
        document.querySelector(".img3").style.opacity = 0;
        document.querySelector(".img4").style.opacity = 1;
        this.order(["-2", "-3", "-4", "-1"], () => { this.backgroundScheduler_4() }, 1000);
    }, backgroundCycleTime);
  }

  backgroundScheduler_4() {
    setTimeout(() => {
        document.querySelector(".img1").style.opacity = 1;
        document.querySelector(".img2").style.opacity = 1;
        document.querySelector(".img3").style.opacity = 0;
        document.querySelector(".img4").style.opacity = 0;
        this.order(["-1", "-2", "-3", "-4"], () => { this.backgroundScheduler_1() }, 1000);
    }, backgroundCycleTime);
  }

  order(array, callback, time) {
    setTimeout(() => {
        document.querySelector(".img1").style.zIndex = array[0];
        document.querySelector(".img2").style.zIndex = array[1];
        document.querySelector(".img3").style.zIndex = array[2];
        document.querySelector(".img4").style.zIndex = array[3];
        callback();
    }, time);
  }


  componentDidMount(){
    this.backgroundScheduler_1();
  }

  render(){
    return (
      <div className = {AppStyles.App}>
        <div className = "background-container">
          <img className = "background-image img1" src = {background} alt="bg1"/>
          <img className = "background-image img2" src = {background2} alt="bg2"/>
          <img className = "background-image img3" src = {background3} alt="bg3"/>
          <img className = "background-image img4" src = {background4} alt="bg4"/>
        </div>
        <Bar />
        <SortingVisualizer/>
      </div>
    );
  }
}
