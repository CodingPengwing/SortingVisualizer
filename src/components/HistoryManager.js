import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../styles/History.module.scss";
import Slider from '@material-ui/core/Slider';
import rewind from '../images/rewind.png';
import dropdown from '../images/down-chevron.png';
import {StyledButton} from "./SortingSelector";
import SlideToggle from "react-slide-toggle";

export const MAX_SORT_CYCLE_VALUE = 1500;
export const HistoryManager = (props) => {
    return (

        <div className = {styles.history}>
            <SlideToggle duration = {500} collapsed
                render = {({toggle, setCollapsibleElement, progress}) => 
                (
                <div>
                    <div className = {styles.header}>
                        <span>Advanced</span>
                        <img onClick = {toggle} width = {20} alt = "dropdown arrow" src = {dropdown}/>
                    </div>
                    <div ref = {setCollapsibleElement}>
                        <Slider
                            onChange = {(e, val) => {props.onChangeSortCycle(val)}}
                            valueLabelDisplay="off"
                            defaultValue={1}
                            value={props.sortCycleValue}
                            // disabled={props.disableSortCycleSlider}
                            step={1}
                            min={1}
                            max={MAX_SORT_CYCLE_VALUE}
                            className = {styles.slider}
                        />
                        <div className = {styles.buttons}>
                            <StyledButton className = {styles.button} onClick={()=>props.stepBackward()}><img src = {rewind} alt = "Backward"/></StyledButton>
                            <StyledButton className = {styles.button} onClick={()=>props.stepForward()}><img className = {styles.forward} src = {rewind} alt = "Forward"/></StyledButton>
                        </div>
                    </div>
                </div>
                )}/>
        </div>
    )
}