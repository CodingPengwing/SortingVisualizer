import React from 'react';
import { DropdownButton, Dropdown} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../styles/Selector.module.scss"
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

import "../styles/custom-dropdown.css"

import { useState } from 'react';
import { styled, Button } from '@material-ui/core';

const StyledButton = styled(Button)({
    marginRight: "5%",
    fontFamily: "monospace",
    fontSize: "17px",
    textAlign: "center",
    textTransform: "uppercase",
    backgroundSize: "200% auto",
    transition: "0.25s ease-in",
    color: "#FFF",
    width: "200px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    cursor: "pointer",
    backgroundImage: "linear-gradient(90deg, #00d2ff 0%, #3a7bd5 0%, #00d2ff 60%)",

    '&:hover':{
        backgroundPosition: "right bottom",
    }
})

const StyledButton2 = styled(StyledButton)({
    backgroundImage: "linear-gradient(90deg, #00d2ff 0%, #3a7bd5 0%, #00d2ff 60%)",
    '&:hover':{
        backgroundPosition: "right bottom",
    }
})

const PauseButton = styled(StyledButton)({
    backgroundImage: "linear-gradient(90deg, #00d2ff 0%, #3a7bd5 0%, #00d2ff 60%)",
    '&:hover':{
        backgroundPosition: "right bottom",
    }
})

const ResumeButton = styled(StyledButton)({
    backgroundImage: "linear-gradient(90deg, #00d2ff 0%, #3a7bd5 0%, #00d2ff 60%)",
    '&:hover':{
        backgroundPosition: "right bottom",
    }
})

// const buttonStyle = {marginBottom: "2%"}

export const Selector = (props) => {

    const [inputType, setInputType] = useState("Steady Random");
    const [sortType, setSortType] = useState("Quick Sort");

    function changeInput(type){
        setInputType(type);
        props.onChangeInput(type);
    };

    function changeSort(type){
        setSortType(type);
        props.onChangeSort(type);
    };

    return(
        <div className = {styles.container}>
            <div className = {styles.sliders}>
                <div className = {styles.sliderDropdown}>
                    <Typography gutterBottom style = {{fontFamily: "monospace", color: "white", marginTop: "1%", marginRight: "4%"}}>
                        Array
                    </Typography>
                    <DropdownButton id="dropdown-basic-button" title={inputType} style = {{width: "53%"}}>
                        <Dropdown.Item onClick = {()=>changeInput("Steady Random")}>Steady Random Array</Dropdown.Item>
                        <Dropdown.Item onClick = {()=>changeInput("Random")}>Random Array</Dropdown.Item>
                        <Dropdown.Item onClick = {()=>changeInput("Sorted")}>Sorted Array</Dropdown.Item>
                        <Dropdown.Item onClick = {()=>changeInput("Reverse Sorted")}>Reverse Sorted Array</Dropdown.Item>
                        <Dropdown.Item onClick = {()=>changeInput("Uniform")}>Uniform Array</Dropdown.Item>
                        <Dropdown.Item onClick = {()=>changeInput("Partial Uniform")}>Partial Uniform Array</Dropdown.Item>
                    </DropdownButton>
                    <Typography gutterBottom style = {{fontFamily: "monospace", color: "white", marginLeft: "4%", marginRight: "3%"} }>
                        Array Size
                    </Typography>
                    <Slider
                        onChange = {(e, val) => {props.onChangeSize(val, inputType)}}
                        defaultValue={(props.disableSlider)? 7 : 100}
                        valueLabelDisplay="auto"
                        disabled = {props.disableSlider}
                        step={1}
                        min={5}
                        max={100}
                    />
                </div>
                <div className = {styles.sliderDropdown}>
                    <Typography gutterBottom style = {{fontFamily: "monospace", color: "white", marginTop: "1%", marginRight: "5%"}}>
                        Sort
                    </Typography>
                    <DropdownButton id="dropdown-basic-button" title={sortType} style = {{width: "61%"}}>
                        <Dropdown.Item onClick = {()=>changeSort("Bogo Sort")}>Bogo Sort</Dropdown.Item>
                        <Dropdown.Item onClick = {()=>changeSort("Bubble Sort")}>Bubble Sort</Dropdown.Item>
                        <Dropdown.Item onClick = {()=>changeSort("Cocktail Shaker Sort")}>Cocktail Sort</Dropdown.Item>
                        <Dropdown.Item onClick = {()=>changeSort("Gnome Sort")}>Gnome Sort</Dropdown.Item>
                        <Dropdown.Item onClick = {()=>changeSort("Heap Sort")}>Heap Sort</Dropdown.Item>
                        <Dropdown.Item onClick = {()=>changeSort("Insertion Sort")}>Insertion Sort</Dropdown.Item>
                        {/* <Dropdown.Item onClick = {()=>changeSort("Intro Sort")}>Intro Sort</Dropdown.Item> */}
                        <Dropdown.Item onClick = {()=>changeSort("Merge Sort")}>Merge Sort</Dropdown.Item>
                        <Dropdown.Item onClick = {()=>changeSort("Quick Sort")}>Quick Sort</Dropdown.Item>
                        <Dropdown.Item onClick = {()=>changeSort("Quick Sort Optimized")}>Quick Sort (Optimized)</Dropdown.Item>
                        <Dropdown.Item onClick = {()=>changeSort("Selection Sort")}>Selection Sort</Dropdown.Item>
                        <Dropdown.Item onClick = {()=>changeSort("Shell Sort")}>Shell Sort</Dropdown.Item>
                        <Dropdown.Item onClick = {()=>changeSort("Tim Sort")}>Tim Sort</Dropdown.Item>
                    </DropdownButton>
                    <Typography gutterBottom style = {{fontFamily: "monospace", color: "white", marginRight: "2%"}}>
                        Sorting Speed
                    </Typography>
                    <Slider
                        onChange = {(e, val) => {props.onChangeSpeed(val)}}
                        defaultValue={100}
                        valueLabelDisplay="auto"
                        step={1}
                        min={1}
                        max={100}
                    />
                </div>
            </div>
            <div className = {styles.buttons}>
                <StyledButton style = {styles.buttonStyle} onClick = {() => {props.pause();props.sort()}}>Run</StyledButton>
                <PauseButton style = {styles.buttonStyle} onClick = {() => props.pause()}>Pause</PauseButton>
                <ResumeButton style = {styles.buttonStyle} onClick = {() => {console.log("")}}>Resume</ResumeButton>              
                <StyledButton2 style = {styles.buttonStyle} onClick = {() => props.reset()}>Reset</StyledButton2>
            </div>
            
        </div>
    )
}
